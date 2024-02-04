import AWS from 'aws-sdk';
import { NextRequest, NextResponse } from 'next/server';

async function generateUploadURL() {
	const s3 = new AWS.S3({
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
		region: process.env.AWS_REGION,
		signatureVersion: 'v4'
	});
	const imageName = `${Date.now()}.jpg`;
	const params = {
		Bucket: process.env.S3_BUCKET_NAME,
		Key: imageName,
		Expires: 60 * 5
	};

	const uploadUrl = await s3.getSignedUrlPromise('putObject', params)
    console.log(uploadUrl)
	return uploadUrl;
}

export const POST = async (req: NextRequest) => {
    const uploadUrl = await generateUploadURL();
	const body = await req.formData();
	const file = body.get('file') as File;

    const response = await fetch(uploadUrl, {
		method: 'PUT',
		body: file,
	});

	return NextResponse.json({ url: response.url.split('?')[0] });
}