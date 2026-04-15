"use client";

import Link from "next/link";

function StatusPill({ status }) {
  const map = {
    "on-track": { label: "On-Track", bg: "#244D3F" },
    "almost due": { label: "Almost Due", bg: "#EFAD44" },
    overdue: { label: "Overdue", bg: "#EF4444" },
  };

  const meta = map[status] ?? map["on-track"];

  return (
    <span
      className="h-6 px-2 rounded-[100px] inline-flex items-center justify-center text-[12px] leading-none font-medium text-white"
      style={{ backgroundColor: meta.bg }}
    >
      {meta.label}
    </span>
  );
}

function TagPill({ tag }) {
  return (
    <span className="h-6 px-2 rounded-[100px] inline-flex items-center justify-center bg-[#CBFADB] text-[#244D3F] text-[12px] leading-none font-medium uppercase">
      {tag}
    </span>
  );
}

export default function FriendCard({ friend }) {
  const tags = Array.isArray(friend.tags) ? friend.tags.slice(0, 2) : [];

  return (
    <Link
      href={`/friends/${friend.id}`}
      className="group w-full rounded-[8px] bg-white shadow-[0px_3px_6px_0px_rgba(0,0,0,0.08)] p-6 flex flex-col items-center gap-3 hover:shadow-[0px_6px_18px_0px_rgba(0,0,0,0.10)] transition-shadow"
    >
      <div className="w-20 h-20 rounded-full overflow-hidden bg-[#D9D9D9]">
        <img
          src={friend.picture}
          alt={friend.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full flex flex-col items-center gap-2">
        <div className="w-full flex flex-col items-stretch gap-2">
          <div className="text-[20px] leading-[1.3] font-semibold text-[#1F2937] text-center">
            {friend.name}
          </div>
          <div className="text-[12px] leading-[1.3] font-normal text-[#64748B] text-center">
            {friend.days_since_contact}d ago
          </div>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-2">
          {tags.map((t) => (
            <TagPill key={t} tag={t} />
          ))}
          <StatusPill status={friend.status} />
        </div>
      </div>
    </Link>
  );
}