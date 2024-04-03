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
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
const Page = async () => {
  const session = await getPageSession();
  if (!session) redirect("/auth/login");
  let user = session.user;
  let users = await prisma.authUser.findMany({
    where: {
      NOT: {
        id: user.userId,
      },
    },
  });
  return (
    <Suspense fallback={<p>loading...</p>}>
      <AlertDial isPaid={user.isPaid} />
      <AlertComplete
        isPaid={user.isPaid}
        isProfileComplete={user.isProfileComplete}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-3">
        {users.map((u, i) => {
          return <Profile key={i} user={u} />;
        })}
      </div>
    </Suspense>
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
          <AlertDialogAction asChild>
            <Link href="/pricing">
              <Button>Get Premium</Button>
            </Link>
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
          <AlertDialogAction asChild>
            <Link href="/dashboard/plus-form">
              <Button>Complete Profile</Button>
            </Link>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
