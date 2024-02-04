import prisma from "@/lib/prisma"

export async function POST(request: Request) {
    const {id, status, sender, receiver} = await request.json()

    if(!status) {
        await prisma.bookmark.create({
            data: {
                bookmarkedUserId: receiver,
                userId: sender
            }
        })
    } else {
        await prisma.bookmark.delete({
            where: {
                id
            }
        })
    }
    return Response.json({message: "done"})
}