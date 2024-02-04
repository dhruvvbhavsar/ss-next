import { readFile } from "fs/promises";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";

export default async function RemoteMdxPage({
  params,
}: {
  params: { slug: string };
}) {
  const res = await readFile(`./public/links/${params.slug}.mdx`, "utf8");
  const { data, content } = matter(res);
  return (
    <>
      <h1 className="text-4xl underline underline-offset-4">
        {data.title}
      </h1>
      <MDXRemote source={content} />
    </>
  );
}
