import prisma from "@/lib/prisma";

import AWS from 'aws-sdk';

async function deleteFile(fileKey: string) {
    const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
        signatureVersion: 'v4'
    });

    const params = {
        Bucket: process.env.S3_BUCKET_NAME || '', // Ensure process.env.S3_BUCKET_NAME is defined and not undefined
        Key: fileKey
    };

    try {
        await s3.deleteObject(params).promise();
        console.log(`File with key ${fileKey} deleted successfully.`);
    } catch (error) {
        console.error(`Error occurred while deleting file with key ${fileKey}. Error: ${error}`);
        throw error;
    }
}


export const POST = async (request: Request) => {
  const { url, userId, key } = await request.json();
  const urls = (
    await prisma.authUser.findMany({
      where: {
        id: userId,
      },
      select: {
        pfpArray: true,
      },
    })
  )[0];
  try {
    await prisma.authUser.update({
      where: {
        id: userId,
      },
      data: {
        pfpArray: {
          set: urls.pfpArray.filter((a) => a !== url),
        },
      },
    });
    return Response.json({ message: "success" });
  } catch (error) {
    return Response.json({ message: "error" }, { status: 500 });
  }
};
