import Profile from "@/components/Profile";
import { getPageSession } from "@/lib/lucia";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import prisma from "@/lib/prisma";
import logo from "@/public/logo.png";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Bookmark } from "lucide-react";
import Bookmarks from "./Bookmarks";
const Page = async () => {
  const session = await getPageSession();
  if (!session) redirect("/auth/login");
  let user = session.user;
  let users = await prisma.authUser.findMany({
    // where: {
    //   NOT: {
    //     id: user.userId,
    //   },
    // },
  });
  return (
    <div>
      <AlertDial isPaid={user.isPaid} />
      <AlertComplete
        isPaid={user.isPaid}
        isProfileComplete={user.isProfileComplete}
      />
      <nav className="flex h-20 flex-row justify-between items-center bg-red-900">
        <div className="my-auto pl-8">
          <img src={logo.src} width="60px" alt="" />
        </div>
        <p className="text-white text-center text-xs sm:text-xl">Welcome back, {user.firstName}!</p>
        <div className="items-center flex h-3/5 flex-row gap-6 text-white">
          <Bookmarks />
          <div className="my-auto h-10 w-10 rounded-full bg-white">
            <a href={`/dashboard/user/${user.userId}`}>
              <img
                className="h-full w-full rounded-full object-cover"
                src={user.profilePictureUrl}
                alt=""
              />
            </a>
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

      <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-3">
        {users.map((u, i) => {
          return <Profile key={i} user={u} />;
        })}
      </div>
    </div>
  );
};

export default Page;

const AlertDial = ({ isPaid }: { isPaid: boolean }) => {
  return (
    <AlertDialog defaultOpen={!isPaid}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Let's get you a premium membership...
          </AlertDialogTitle>
          <AlertDialogDescription>
            Get personalized matches, unlimited enquiries and more!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Skip</AlertDialogCancel>
          <AlertDialogAction>
            <Link href="/pricing">Okay</Link>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const AlertComplete = ({
  isPaid,
  isProfileComplete,
}: {
  isPaid: boolean;
  isProfileComplete: boolean;
}) => {
  return (
    <AlertDialog defaultOpen={isPaid && !isProfileComplete}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Woah!</AlertDialogTitle>
          <AlertDialogDescription>
            We see that you have purchased a premium membership. But haven't
            completed your profile yet.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Skip</AlertDialogCancel>
          <AlertDialogAction>
            <Link href="/dashboard/plus-form">Okay</Link>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
