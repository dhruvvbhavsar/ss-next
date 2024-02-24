"use server";

import { getPageSession } from "@/lib/lucia";
import prisma from "@/lib/prisma";

export async function updateDetails(detailType: string, values: any) {
  console.log("detailType", detailType);
  const session = await getPageSession();
  const userId = session.user.userId;
  const x = await prisma.details.findMany({
    where: {
      userId: userId,
    },
  });

  const updateData = { [detailType]: values };

  if (!x.length) {
    await prisma.details.create({
      data: {
        userId: userId,
        ...updateData,
      },
    });
  } else {
    await prisma.details.update({
      where: {
        userId: userId,
      },
      data: updateData,
    });
  }

  return true;
}

export async function markProfileComplete() {
  const session = await getPageSession();
  const userId = session.user.userId;
  await prisma.authUser.update({
    where: {
      id: userId,
    },
    data: {
      isProfileComplete: true,
    },
  });
}
