"use server"

import prisma from "./prisma"

export async function like(formData: FormData) {
    let s = formData.get("sender") as string
    let r = formData.get("receiver") as string
    await prisma.bookmark.create({
        data: {
            userId: s,
            bookmarkedUserId: r
        }
    })
}