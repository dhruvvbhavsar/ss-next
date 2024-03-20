import { lucia } from "lucia";
import { nextjs_future } from "lucia/middleware";
import { prisma } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";

import * as context from "next/headers";
import { cache } from "react";

const client = new PrismaClient();

export const auth = lucia({
  env: "DEV", // "PROD" if deployed to HTTPS
  middleware: nextjs_future(),
  sessionCookie: {
    expires: false,
  },

  adapter: prisma(client, {
    user: "authUser",
    key: "authKey",
    session: "authSession",
  }),

  getUserAttributes: (data) => {
    return {
      email: data.email,
      profilePictureUrl: data.profilePictureUrl,
      firstName: data.firstName,
      lastName: data.lastName,
      mobile: data.mobileNumber,
      isPaid: data.isPaid,
      isProfileComplete: data.isProfileComplete
    };
  },
});

export const getPageSession = cache(() => {
  const authRequest = auth.handleRequest("GET", context);
  return authRequest.validate();
});
