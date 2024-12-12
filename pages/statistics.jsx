import EventStatsBlock from "@/components/pages/statistics/EventStatsBlock";
import PopulationBlock from "@/components/pages/statistics/PopulationBlock";

export default function Statistics() {
  return (
    <div className="container">
      <div className="p-[20px] shadow-[0px_0px_10px_0px_#00000080] rounded-[15px]">
        <div className="grid gap-[30px] grid-cols-3">
          <div className="col-span-1 relative z-[2000]">
            <PopulationBlock />
          </div>
          <div className="col-span-2">
            <EventStatsBlock />
          </div>
        </div>
      </div>
    </div>
  );
}
