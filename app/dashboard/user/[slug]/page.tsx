import { getPageSession } from "@/lib/lucia";
import prisma from "@/lib/prisma";
import Like from "./LikeButton";
import Connect from "./ConnectButton";
export default async function Page({ params }: { params: { slug: string } }) {
  let session = await getPageSession();
  let myId = session.user.userId;
  let user = await prisma.authUser.findFirst({
    where: {
      id: params.slug,
    },
  });
  if (!user) return <p>Not found</p>;
  let bookmark = await prisma.bookmark.findFirst({
    where: {
      userId: myId,
      bookmarkedUserId: user.id,
    },
  });

  let connect = await prisma.connection.findFirst({
    where: {
      senderId: myId,
      receiverId: user.id,
    },
  });

  let isLiked = bookmark ? true : false;
  let isConnected = connect ? true : false;

  return (
    <main className="flex flex-col sm:flex-row">
      <section className="relative flex h-screen w-full flex-col items-center justify-center bg-white">
        <div className="relative flex h-48 w-48 items-center justify-center rounded-2xl bg-gray-300">
          <div
            className={`absolute -right-4 -top-4 rounded-full ${
              user.isPaid ? "bg-amber-600" : "bg-red-900"
            } px-2 py-1 text-xs text-white`}
          >
            {user.isPaid ? "Plus+" : "Basic"}
          </div>
          <img
            className="w-full h-full object-cover rounded-2xl object-center"
            src={user.profilePictureUrl}
            alt=""
          />
        </div>

        <div className="relative mt-1">
          <h2 className="mt-2 text-center text-2xl font-semibold text-gray-700">
            {user.firstName + " " + user.lastName}
          </h2>
        </div>

        <div className="mt-8 flex gap-4 items-center">
          <Connect
            id={connect?.id ?? ""}
            sender={myId}
            receiver={user.id}
            status={isConnected}
          />
          <Like
            id={bookmark?.id ?? ""}
            receiver={user.id}
            sender={myId}
            status={isLiked}
          />
        </div>
      </section>
      <section className="h-screen w-full bg-gray-200 p-8">
        <div className="mb-4 text-2xl font-semibold text-gray-700">
          Basic Information
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <span className="text-gray-600">First Name</span>
            <span>{user.firstName}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-600">Last Name</span>
            <span>{user.lastName}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-600">Gender</span>
            <span>{user.gender}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-600">Caste</span>
            <span>{user.caste}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-600">Date of Birth</span>
            <span>{user.dateOfBirth.toDateString()}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-600">Time of Birth</span>
            <span>{user.timeOfBirth}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-600">Marital Status</span>
            <span>{user.maritalStatus}</span>
          </div>
          {/* <div className="flex flex-col">
            <span className="text-gray-600">Mobile Number</span>
            <span className="select-none blur-sm">{user.mobileNumber}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-600">Email</span>
            <span className="select-none blur-sm">{user.email}</span>
          </div> */}
        </div>
      </section>
    </main>
  );
}


