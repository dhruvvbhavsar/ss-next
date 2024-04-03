import { redirect } from "next/navigation";
import PictureComponent from "./Pictures";
import { getPageSession } from "@/lib/lucia";

export default async function Page() {
  const session = await getPageSession();
  if (!session) redirect("/auth/login");
  return (
    <>
      <PictureComponent urls={session.user.pfpArray} userId={session.user.userId} />
    </>
  );
}
