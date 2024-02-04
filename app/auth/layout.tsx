import { getPageSession } from "@/lib/lucia";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  let session = await getPageSession();
  if (session) throw redirect("/dashboard");
  return <main>{children}</main>;
}
