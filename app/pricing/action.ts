import prisma from "@/lib/prisma";

export const paymentSuccess = async (id: string) => {
  try {
    await prisma.authUser.update({
      data: {
        isPaid: true,
      },
      where: {
        id,
      },
    });
    return true;
  } catch (error) {
    return false;
  }
};
