import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "./components/sidebar-nav";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const sidebarNavItems = [
  {
    title: "Personal",
    href: "/dashboard/plus-form",
  },
  {
    title: "Medical",
    href: "/dashboard/plus-form/medical",
  },
  {
    title: "Spiritual",
    href: "/dashboard/plus-form/spiritual",
  },
  {
    title: "Lifestyle",
    href: "/dashboard/plus-form/lifestyle",
  },
  {
    title: "Professional",
    href: "/dashboard/plus-form/professional",
  },
  {
    title: "Education",
    href: "/dashboard/plus-form/education",
  },
  {
    title: "Family",
    href: "/dashboard/plus-form/family",
  },
  {
    title: "Partner Preferences",
    href: "/dashboard/plus-form/preferences",
  },
  {
    title: "Astrology",
    href: "/dashboard/plus-form/astrology",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="space-y-6 p-10 pb-16 md:block">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Premium Form</h2>
        <p className="text-muted-foreground">
          Complete your detailed profile to unlock extra features
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </div>
  );
}
