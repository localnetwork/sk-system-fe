import EventCalendarAdmin from "@/components/icons/EventCalendarAdmin";
import EventCalendarMember from "@/components/icons/EventCalendarMember";
import ProgressMember from "@/components/icons/ProgressMember";
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
    name: "Events",
    icon: <EventCalendarAdmin />,
    roles: [1],
    link: "/events",
  },
  {
    name: "My Progress",
    icon: <ProgressMember />,
    roles: [2],
    link: "/my-progress",
  },
];

export default menuNavOptions;
