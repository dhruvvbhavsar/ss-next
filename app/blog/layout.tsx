export default function MdxLayout({ children }: { children: React.ReactNode }) {
  const getFilename = () => {
    const filePath = __dirname;
    const parts = filePath.split('/');
    const filenameWithExtension = parts[parts.length - 1];
    const filename = filenameWithExtension.split('.')[0];
    return filename;
  };

  return (
      <article className="flex flex-col justify-center items-center">
        <div className="max-w-[75ch] mt-8 space-y-4 mx-4">
          <p className="font-bold text-2xl underline">{getFilename()}</p>
          {children}
          <div className="flex flex-col gap-4 items-center my-4 ">
            <img
              src="http://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhwzd4A5Gpq86ILfb8yKs7TXehUHkvjPYFcIHG0qlX3aecmEaSmMMFvsCBRoMT7iVc3q2X8yuRXu5tzgNHIix0XgNcNUb1cdBpifbz4sqd8Dpyp5mUPP67zMlkVgkuN0p8/s113/Passport+Size.jpg"
              alt="posted by"
            />
            <p className="text-2xl">Sunil Thakur</p>
            <p>
              I believe that the root cause of any problem currently exist is
              misdirected mind. There is a great need of purification of our
              consciousness. Until we work on root cause any effort would be on
              superficial level only. Our vedic literatures have enormous
              potentials to reform the misdirected civilization today.
            </p>
          </div>
        </div>
      </article>
  );
}
