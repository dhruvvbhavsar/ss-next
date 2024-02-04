import about from "@/public/about.jpg"
const About = () => {
    return (
        <section className="container bg-red-900 px-6 py-8 mx-auto lg:py-16" id="about">
        <div className="lg:flex lg:items-center lg:-mx-4">
            <div className="lg:w-1/2 lg:px-4">
                <h3 className="text-xl font-medium text-white md:text-2xl lg:text-3xl">About Us</h3>
    
                <p className="mt-6 text-white">
                    Welcome to ShubhSambandh, where we bring together individuals who share the same values and
                    beliefs. Our mission is <span className="text-xl italic font-bold">Uniting Hearts in Love </span>
                    and creating long-lasting, meaningful relationships. At our marriage website, we stand out because
                    we focus on sincere connections based on shared values and beliefs, and we provide a supportive
                    community for individuals to connect and grow together. Our advanced search features and quality
                    profiles ensure that users are matched with compatible partners who share their goals and interests.
                    Additionally, we prioritize the safety and privacy of our users and offer a secure platform.
                </p>
            </div>
    
            <div className="mt-8 lg:w-1/2 lg:px-4 lg:mt-0">
                <img
                    className="object-cover w-full rounded-xl h-96"
                    src={about.src}
                    alt="Video thumbnail"
                />
            </div>
        </div>
    </section>
    
    );
  };
  
  export default About;