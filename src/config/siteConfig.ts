import {
  Home,
  Search,
  Bell,
  Mail,
  ClipboardList,
  Bookmark,
  LucideIcon,
} from "lucide-react";

export const navList: { title: string; icon: LucideIcon; link: string }[] = [
  {
    title: "Home",
    icon: Home,
    link: `/`,
  },
  {
    title: "Explore",
    icon: Search,
    link: "/explore",
  },
  {
    title: "Notifications",
    icon: Bell,
    link: "/",
  },
  {
    title: "Messages",
    icon: Mail,
    link: "/",
  },
  {
    title: "Lists",
    icon: ClipboardList,
    link: "/",
  },
  {
    title: "Bookmarks",
    icon: Bookmark,
    link: "/",
  },
];

export const QueryKeys = {
  all: (name: string) => [name],
  byId: (name: string, id: string) => [name, id],
};
