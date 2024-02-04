"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Connect({
  id,
  status,
  sender,
  receiver,
}: {
  id: string;
  status: boolean;
  sender: string;
  receiver: string;
}) {
  let { refresh } = useRouter();
  async function handleConnect() {
    let body = {
      id,
      status,
      sender,
      receiver,
    };

    let res = await fetch("/api/connect", {
      method: "POST",
      body: JSON.stringify(body),
    });

    if (res.ok) {
      toast("Done");
      refresh();
    }
  }
  return (
    <Button onClick={handleConnect} className={status ? 'bg-gray-500' : ''}>
      {status ? "Request Sent" : "Connect"}
    </Button>
  );
}
