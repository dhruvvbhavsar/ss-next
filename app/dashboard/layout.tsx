import logo from "@/public/logo.png";
import Bookmarks from "../dashboard/Bookmarks";
import { getPageSession } from "@/lib/lucia";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let session = await getPageSession();
  if (!session) {
    redirect("/");
  }
  const isPaid = session.user.isPaid;
  return (
    <Suspense fallback={<p>loading...</p>}>
      <main className="relative min-h-screen">
        <nav className="flex h-20 flex-row justify-between items-center bg-red-900">
          <div className="my-auto pl-8 flex items-center gap-4">
            <img src={logo.src} width="60px" alt="" />
            <a href="/" className="text-white">
              Home
            </a>
          </div>
          <div className="items-center flex h-3/5 flex-row gap-6 text-white">
            <Bookmarks />
            <div className="my-auto h-10 w-10 rounded-full bg-white">
              <img
                className="h-full w-full rounded-full object-cover"
                src={session.user.pfpArray[0]}
                alt=""
              />
            </div>
            <Settingss id={session.user.userId} />
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
        {!isPaid && (
          <Button asChild className="absolute top-24 right-4">
            <Link href="/pricing">Get Shubh Sambandh Plus</Link>
          </Button>
        )}
      </main>
    </Suspense>
  );
}

const Settingss = ({ id }: { id: string }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Settings className="h-6 w-6" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={`/dashboard/user/${id}`}>My Profile</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
