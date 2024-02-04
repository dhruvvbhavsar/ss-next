import prisma from "@/lib/prisma"

export async function POST(request: Request) {
    const {id, status, sender, receiver} = await request.json()

    if(!status) {
        await prisma.connection.create({
            data: {
                receiverId: receiver,
                senderId: sender,
            }
        })
    } else {
        await prisma.connection.delete({
            where: {
                id
            }
        })
    }
    return Response.json({message: "done"})
}