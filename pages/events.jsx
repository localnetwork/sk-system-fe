import Stamp from "@/components/icons/Stamp";
import Image from "next/image";
import { useState } from "react";
import persistentStore from "@/lib/store/persistentStore";
import EventsMember from "@/components/pages/events/EventsMember";
import EventsAdmin from "@/components/pages/events/EventsAdmin";
import globalState from "@/lib/store/globalState";
export default function Events() {
  const profile = persistentStore((state) => state.profile);
  const ready = globalState((state) => state.ready);

  const role = profile?.role;

  return (
    <div className="container">
      {ready && role == 1 && <EventsAdmin />}
      {ready && role == 2 && <EventsMember />}
    </div>
  );
}
