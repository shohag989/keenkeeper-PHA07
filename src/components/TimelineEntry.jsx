function formatLongDate(isoDate) {
  const d = new Date(isoDate);
  // Figma shows e.g. "March 29, 2026"
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function getEntryMeta(type) {
  switch (type) {
    case "meetup":
      return { iconSrc: "/figma/friend-details/bell.svg", label: "meetup" };
    case "text":
      return {
        iconSrc: "/figma/friend-details/chatdots.svg",
        label: "text",
      };
    case "video":
      return {
        iconSrc: "/figma/friend-details/videocamera.svg",
        label: "video",
      };
    case "call":
      return {
        iconSrc: "/figma/friend-details/phonecall.svg",
        label: "call",
      };
    default:
      return { iconSrc: null, label: String(type ?? "text") };
  }
}

export default function TimelineEntry({ entry }) {
  const meta = getEntryMeta(entry.type);

  return (
    <div className="w-full rounded-[8px] bg-white border border-[#E9E9E9] px-4 py-4 flex items-center gap-4">
      <div className="w-10 h-10 shrink-0 flex items-center justify-center">
        {meta.iconSrc ? (
          <img src={meta.iconSrc} alt="" className="w-8 h-8" aria-hidden="true" />
        ) : (
          <div className="w-8 h-8 rounded-full bg-[#F8FAFC] border border-[#E9E9E9]" />
        )}
      </div>

      <div className="flex-1 flex flex-col items-stretch gap-1">
        <div className="w-full flex items-center gap-2">
          <div className="text-[20px] leading-[1.3] font-medium text-[#244D3F]">
            {meta.label}
          </div>
          <div className="text-[18px] leading-[1.3] font-normal text-[#64748B]">
            with {entry.friendName}
          </div>
        </div>

        <div className="text-[16px] leading-[1.3] font-medium text-[#64748B]">
          {formatLongDate(entry.date)}
        </div>
      </div>
    </div>
  );
}