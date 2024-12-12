import EventCalendarAdmin from "@/components/icons/EventCalendarAdmin";
import EventCalendarMember from "@/components/icons/EventCalendarMember";
import PopulationIcon from "@/components/icons/PopulationIcon";
import ProgressMember from "@/components/icons/ProgressMember";
import Stats from "@/components/icons/Stats";
import UsersIcon from "@/components/icons/UsersIcon";
// const {
//   default: EventCalendarMember,
// } = require("@/components/icons/EventCalendarMember");
// const {
//   default: ProgressMember,
// } = require("@/components/icons/ProgressMember");

const menuNavOptions = [
  {
    name: "Events",
    icon: <EventCalendarMember />,
    roles: [2],
    link: "/events",
  },
  {
    name: "My Progress",
    icon: <ProgressMember />,
    roles: [2],
    link: "/my-progress",
  },
  {
    name: "Population",
    icon: <PopulationIcon />,
    roles: [1],
    link: "/population",
  },
  {
    name: "Manage users",
    icon: <UsersIcon />,
    roles: [1],
    link: "/users",
  },

  {
    name: "Events",
    icon: <EventCalendarAdmin />,
    roles: [1],
    link: "/events",
  },
  {
    name: "Statistics",
    icon: <Stats />,
    roles: [1],
    link: "/statistics",
  },
];

export default menuNavOptions;
