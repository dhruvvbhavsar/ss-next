import prisma from "@/lib/prisma";

export const GET = async () => {
  const users = await prisma.authUser.findMany();

  for (const user of users) {
    if (user.profilePictureUrl) {
      await prisma.authUser.update({
        where: { id: user.id },
        data: {
          pfpArray: [user.profilePictureUrl],
          profilePictureUrl: "", // Set profilePictureUrl to null
        },
      });
    }
  }

  return Response.json({
    message: "Successfully migrated profile pictures to pfpArray field.",
  });
};
