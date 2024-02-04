export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <section className="bg-red-900 container  py-4">
        <article className="text-white  space-y-4">
          {children}
        </article>
      </section>
    );
  }
  