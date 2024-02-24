import couple from '@/public/happy-couple.jpeg'

const Blog = () => {
  return (
    <section className="bg-red-900" id="blogs">
      <div className="container px-6 py-10 mx-auto">
        <h1 className="text-2xl font-semibold capitalize lg:text-3xl text-white">
          From the blog
        </h1>

        <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2">
          <div className="lg:flex">
            <img
              className="object-cover w-full h-56 rounded-lg lg:w-64"
              src={couple.src}
            />

            <div className="flex flex-col gap-2 py-6 lg:mx-6">
              <a
                href="/blog/secrets-part-1"
                className="font-semibold hover:underline text-white"
              >
                Secret of Happy Married Life, Part - I
              </a>

              <span className="text-sm text-gray-300">
                On: 4<sup>th</sup> April 2019
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
