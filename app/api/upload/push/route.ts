import prisma from "@/lib/prisma";

export const POST = async (request: Request) => {
  const { urls, userId } = await request.json();
  try {
    await prisma.authUser.update({
      where: {
        id: userId,
      },
      data: {
        pfpArray: {
          set: urls
        },
      },
    });
    return Response.json({ message: "success" });
  } catch (error) {
    return Response.json({ message: "error" }, { status: 500 });
  }
};
