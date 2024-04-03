import { MapPin } from "lucide-react";

function calculateAge(dateOfBirthString: string | number | Date) {
  const dateOfBirth = new Date(dateOfBirthString);
  const now = new Date();

  const yearsDiff = now.getFullYear() - dateOfBirth.getFullYear();
  const monthsDiff = now.getMonth() - dateOfBirth.getMonth();
  const daysDiff = now.getDate() - dateOfBirth.getDate();

  if (monthsDiff < 0 || (monthsDiff === 0 && daysDiff < 0)) {
    return yearsDiff - 1;
  }

  return yearsDiff;
}

export default function Profile({ user }: { user: any }) {
  return (
    <a
      href={`/dashboard/user/${user.id}`}
      className="overflow-hidden rounded-lg bg-red-300 p-4 shadow-lg"
    >
      <img className="object-cover object-center max-h-60 w-full" src={user.pfpArray[0]} />

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm sm:text-lg font-medium">
          {user.firstName}, {calculateAge(user.dateOfBirth)}
        </div>
        <div className="flex items-center gap-1">
          <MapPin size={16} />
          <div className="text-sm text-gray-600">
            {user.city}, {user.country}
          </div>
        </div>
      </div>
    </a>
  );
}
