import TimelineEntry from "@/components/TimelineEntry";
import timeline from "@/data/timeline.json";

const FILTERS = [
  { value: "all", label: "Filter timeline" },
  { value: "meetup", label: "Meetup" },
  { value: "text", label: "Text" },
  { value: "video", label: "Video" },
  { value: "call", label: "Call" },
];

function normalizeType(type) {
  return String(type ?? "").trim().toLowerCase();
}

export default function Page() {
  // Figma shows only the control; keeping it dynamic without changing visuals:
  // default "all" maps to placeholder label "Filter timeline".
  const filter = "all";

  const items = timeline
    .map((e) => ({ ...e, type: normalizeType(e.type) }))
    .filter((e) => (filter === "all" ? true : e.type === filter));

  return (
    <div className="flex-1 w-full bg-[#F8FAFC]">
      <main className="mx-auto w-full max-w-[1600px] px-5 sm:px-10 lg:px-[245px] py-20 flex flex-col items-stretch gap-6">
        <div className="w-full flex flex-col items-stretch gap-6">
          <div className="w-full flex items-start justify-between">
            <h1 className="text-[48px] leading-[1.3] font-bold text-[#1F2937]">
              Timeline
            </h1>

            <div className="w-full max-w-[347px] rounded-[8px] bg-white border border-[#E9E9E9] shadow-[0px_1px_6px_0px_rgba(0,0,0,0.08)] px-4 py-4 flex items-center gap-2">
              <span className="flex-1 text-[18px] leading-[1.3] font-normal text-[#64748B]">
                Filter timeline
              </span>
              <span
                aria-hidden="true"
                className="w-4 h-4 text-[#64748B] inline-flex items-center justify-center"
              >
                ▾
              </span>
            </div>
          </div>
        </div>

        <section className="w-full flex flex-col items-stretch gap-3">
          {items.map((entry) => (
            <TimelineEntry key={entry.id} entry={entry} />
          ))}
        </section>
      </main>
    </div>
  );
}