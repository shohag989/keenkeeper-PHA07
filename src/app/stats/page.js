import InteractionPieChart from "@/components/InteractionPieChart";
import timeline from "@/data/timeline.json";

function countByType(entries) {
  const counts = { text: 0, call: 0, video: 0 };
  for (const e of entries) {
    const t = String(e?.type ?? "").toLowerCase();
    if (t in counts) counts[t] += 1;
  }
  return counts;
}

export default function Page() {
  const counts = countByType(timeline);

  const chartData = [
    { key: "text", name: "Text", value: counts.text },
    { key: "call", name: "Call", value: counts.call },
    { key: "video", name: "Video", value: counts.video },
  ];

  return (
    <div className="flex-1 w-full bg-[#F8FAFC]">
      <main className="mx-auto w-full max-w-[1600px] px-5 sm:px-10 lg:px-[245px] py-20 flex flex-col items-center gap-6">
        <div className="w-full flex flex-col items-stretch gap-6">
          <h1 className="w-full text-[48px] leading-[1.3] font-bold text-[#1F2937]">
            Friendship Analytics
          </h1>
        </div>

        <section className="w-full max-w-[1110px] rounded-[8px] bg-white border border-white shadow-[0px_1px_6px_0px_rgba(0,0,0,0.08)] p-8 flex flex-col items-center gap-6">
          <div className="w-full text-[20px] leading-[1.3] font-medium text-[#244D3F]">
            By Interaction Type
          </div>

          <InteractionPieChart data={chartData} />

          <div className="w-full flex items-center justify-center gap-6">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#7E35E1]" />
              <span className="text-[14px] leading-[1.4285714286] font-normal text-[#64748B]">
                Text
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#244D3F]" />
              <span className="text-[14px] leading-[1.4285714286] font-normal text-[#64748B]">
                Call
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#37A163]" />
              <span className="text-[14px] leading-[1.4285714286] font-normal text-[#64748B]">
                Video
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}