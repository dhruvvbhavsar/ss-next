import { getPageSession } from "@/lib/lucia";
import prisma from "@/lib/prisma";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";

export const POST = async (request: Request) => {
  const body = await request.text();
  let session = await getPageSession();
  if (!session) {
    return Response.json({ message: "no session found" }, { status: 404 });
  }
  const userId: string = session.user.userId;
  const params = new URLSearchParams(body);
  const paymentId = params.get("razorpay_payment_id") ?? "";
  const orderId = params.get("razorpay_order_id") ?? "";
  const signature = params.get("razorpay_signature") ?? "";

  let res = validatePaymentVerification(
    { order_id: orderId, payment_id: paymentId },
    signature,
    "w6lG8BfDdrFBIVf94tueMJhf"
  );

  if (!res) {
    return Response.json({ message: "Signature Invalid." }, { status: 404 });
  }

  await prisma.authUser.update({
    data: {
      isPaid: true,
      expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    },
    where: {
      id: userId,
    },
  });

  await prisma.payments.create({
    data: {
      id: paymentId,
      amount: 500,
      userId,
      orderId,
      signature,
    },
  });

  return Response.json(
    { message: "Redirecting..." },
    {
      headers: { Location: "/dashboard" },
      status: 302,
    }
  );
};
