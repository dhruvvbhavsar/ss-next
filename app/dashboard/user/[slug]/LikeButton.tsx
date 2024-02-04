"use client"
import { HeartIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Like({id, status, sender, receiver}: {id: string, status: boolean, sender: string, receiver: string}) {
    let {refresh} = useRouter()
    async function handleLike() {
        let body = {
            id, status, sender, receiver
        }

        let res = await fetch('/api/bookmark', {
            method: "POST",
            body: JSON.stringify(body)
        })

        if(res.ok) {
            toast("Done")
            refresh()
        }
    }
    return (
        <HeartIcon
                onClick={handleLike}
                className={`text-red-600 w-10 h-10 cursor-pointer ${
                  status ? "fill-red-600" : ""
                }`}
              />
    )
}