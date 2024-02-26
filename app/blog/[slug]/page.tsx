import { MDXRemote } from "next-mdx-remote/rsc";
import matter from "gray-matter";
import { readFileSync } from "fs";

export default async function RemoteMdxPage({
  params,
}: {
  params: { slug: string };
}) {
  const res = readFileSync(`data/posts/${params.slug}.md`, "utf8");
  const { data, content } = matter(res);
  return (
    <>
      <h1 className="text-4xl underline underline-offset-4 text-center">
        {data.title}
      </h1>
      <section className="max-w-[75ch] mt-8 space-y-4 mx-4">
        <MDXRemote source={content} />
        <div className="flex flex-col gap-4 items-center mt-4 text-white">
        <img
          src="http://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhwzd4A5Gpq86ILfb8yKs7TXehUHkvjPYFcIHG0qlX3aecmEaSmMMFvsCBRoMT7iVc3q2X8yuRXu5tzgNHIix0XgNcNUb1cdBpifbz4sqd8Dpyp5mUPP67zMlkVgkuN0p8/s113/Passport+Size.jpg"
          alt="posted by"
        />
        <p className="text-2xl">Sunil Thakur</p>
        <p>
          I believe that the root cause of any problem currently exist is
          misdirected mind. There is a great need of purification of our
          consciousness. Until we work on root cause any effort would be on
          superficial level only. Our vedic literatures have enormous potentials
          to reform the misdirected civilization today.
        </p>
      </div>
      </section>
    </>
  );
}
