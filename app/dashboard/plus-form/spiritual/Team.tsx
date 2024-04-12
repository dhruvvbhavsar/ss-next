import Image from "next/image";

type Team = {
  name: string;
  role: string;
  image: string;
};

interface TeamProps {
  team: Team[];
}

export default function Team({ team }: TeamProps) {
  return (
    <section id="team" className="container rounded-lg bg-white py-4">
      <h1 className="text-4xl font-bold">Our Team</h1>
      <p className="max-w-[65ch]">
        We're a dynamic group of individuals who are passionate about what we do
        and dedicated to delivering the best results for our clients.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        {team.map((member, index) => (
          <div key={index} className="text-center">
            <Image
              height={150}
              width={150}
              src={member.image}
              className="mx-auto rounded-lg aspect-square object-cover object-top shadow-lg"
              alt={member.name}
            />

            <div className="mt-2">
              <h1 className="font-semibold text-xl">{member.name}</h1>
              <p className="text-sm ">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
