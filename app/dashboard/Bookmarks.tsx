import { getPageSession } from "@/lib/lucia";
import prisma from "@/lib/prisma";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Bookmark } from "lucide-react";
import Profile from "@/components/Profile";
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function Bookmarks() {
  const session = await getPageSession();
  let id = session.user.userId;
  const bookmarks = await prisma.bookmark.findMany({
    where: {
      userId: id,
    },
    select: {
      bookmarkedUserId: true,
    },
  });
  const bookmarkedUserIds = bookmarks.map(
    (bookmark) => bookmark.bookmarkedUserId
  );
  const bookmarkedUsers = await prisma.authUser.findMany({
    where: {
      id: {
        in: bookmarkedUserIds,
      },
    },
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Bookmark size={24} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-6xl">
        <DialogHeader>
          <DialogTitle>My Bookmarks</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-full">
          <div className="grid w-full grid-cols-1 sm:grid-cols-3 gap-3 p-3">
            {bookmarkedUsers.map((u, i) => {
              return <Profile key={i} user={u} />;
            })}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
