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
    link: "/",
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
