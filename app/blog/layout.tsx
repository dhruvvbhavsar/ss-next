export default function MdxLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-red-900 py-12">
      <article className="text-white flex flex-col text-center justify-center items-center">
        {children}
      </article>
    </section>
  );
}
