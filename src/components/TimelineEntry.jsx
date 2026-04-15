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
      return { emoji: "🤝", label: "meetup" };
    case "text":
      return { emoji: "💬", label: "text" };
    case "video":
      return { emoji: "📹", label: "video" };
    case "call":
      return { emoji: "📞", label: "Call" };
    default:
      return { emoji: "💬", label: String(type ?? "text") };
  }
}

export default function TimelineEntry({ entry }) {
  const meta = getEntryMeta(entry.type);

  return (
    <div className="w-full rounded-[8px] bg-white border border-[#E9E9E9] px-4 py-4 flex items-center gap-4">
      <div className="text-[40px] leading-[1.3] font-medium text-[#244D3F]">
        {meta.emoji}
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