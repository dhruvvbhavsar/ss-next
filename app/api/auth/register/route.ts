// app/api/signup/route.ts
import { auth } from "@/lib/lucia";
import * as context from "next/headers";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
    let {email, passwordHash, firstName, lastName, caste, other_caste,url, gender, country, state, city, timeOfBirth, dateOfBirth, maritalStatus, mobileNumber} = await request.json()

	try {
		const user = await auth.createUser({
			key: {
				providerId: "email", // auth method
				providerUserId: email,
				password: passwordHash // hashed by Lucia
			},
			attributes: {
				firstName,
                lastName,
                email,
                caste: caste === "others" ? other_caste : caste,
                gender,
                country,
                state,
                city,
                maritalStatus,
                timeOfBirth,
                dateOfBirth: new Date(dateOfBirth),
                mobileNumber,
                isPaid: false,
                isProfileComplete: false,
				pfpArray: [url]
			}
		});
		const session = await auth.createSession({
			userId: user.userId,
			attributes: {}
		});
		const authRequest = auth.handleRequest(request.method, context);
		authRequest.setSession(session);
		return NextResponse.json(null, {
			status: 200,
			headers: {
				Location: "/" // redirect to profile page
			}
		});
	} catch (e) {
        console.log(e)
		return NextResponse.json(
			{
				error: "An unknown error occurred"
			},
			{
				status: 500
			}
		);
	}
};