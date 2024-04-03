import logo from "@/public/logo.png";
import Bookmarks from "../dashboard/Bookmarks";
import { getPageSession } from "@/lib/lucia";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let session = await getPageSession();
  if (!session) {
    redirect("/");
  }
  return (
    <Suspense fallback={<p>loading...</p>}>
      <nav className="flex h-20 flex-row justify-between items-center bg-red-900">
        <div className="my-auto pl-8">
          <img src={logo.src} width="60px" alt="" />
        </div>
        <p className="text-white text-center text-xs sm:text-xl">
          Welcome back, {session.user.firstName}!
        </p>
        <div className="items-center flex h-3/5 flex-row gap-6 text-white">
          <Bookmarks />
          <div className="my-auto h-10 w-10 rounded-full bg-white">
            <img
              className="h-full w-full rounded-full object-cover"
              src={session.user.pfpArray[0]}
              alt=""
            />
          </div>
          <form method="post" action="/api/auth/logout">
            <button
              type="submit"
              className="mb-2 mr-2 rounded-full bg-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300"
            >
              Sign out
            </button>
          </form>
        </div>
      </nav>
      {children}
    </Suspense>
  );
}
