"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faBoxArchive,
  faTrash,
  faPhoneVolume,
  faCommentDots,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { useTimeline } from "@/context/TimelineContext";
import toast from "react-hot-toast";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

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

function formatShortDate(isoDate) {
  const d = new Date(isoDate);
  if (Number.isNaN(d.getTime())) return isoDate;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function addDaysIso(isoDate, days) {
  const d = new Date(isoDate);
  if (Number.isNaN(d.getTime())) return isoDate;
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export default function FriendDetailsClient({ friend }) {
  const { addEntry } = useTimeline();
  const router = useRouter();
  const [nextDue, setNextDue] = useState(friend.next_due_date);

  const primaryTag = Array.isArray(friend.tags) ? friend.tags[0] : null;
  const email = friend.email ? String(friend.email) : null;

  const displayBio = useMemo(() => {
    if (friend.bio) return `"${friend.bio}"`;
    return '"Former colleague, great mentor"';
  }, [friend.bio]);

  return (
    <div className="flex-1 w-full bg-[#F8FAFC]">
      <main className="mx-auto w-full max-w-[1600px] px-5 sm:px-10 lg:px-20 py-10 lg:py-20">
        <div className="w-full flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
          {/* Left column: profile + stacked actions */}
          <section className="w-full lg:w-[350px] flex flex-col items-stretch gap-4">
            <div className="w-full rounded-[8px] bg-white shadow-[0px_3px_6px_0px_rgba(0,0,0,0.08)] p-6 lg:p-8 flex flex-col items-center gap-4">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-[#D9D9D9] border-2 border-white shadow-sm">
                <img
                  src={friend.picture}
                  alt={friend.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-full flex flex-col items-center gap-2">
                <div className="w-full text-center text-[22px] lg:text-[24px] leading-[1.3] font-semibold text-[#1F2937]">
                  {friend.name}
                </div>

                <div className="flex flex-wrap justify-center items-center gap-2">
                  <StatusPill status={friend.status} />
                  {primaryTag ? <TagPill tag={primaryTag} /> : null}
                </div>
              </div>

              <div
                className="text-center text-[16px] leading-relaxed font-medium text-[#64748B] italic px-2"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {displayBio}
              </div>

              <div className="text-center text-[14px] leading-none font-normal text-[#64748B]">
                {email ? email : "No email on file"}
              </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 lg:flex lg:flex-col items-stretch gap-3 lg:gap-4">
              <button
                onClick={() => {
                  const updated = addDaysIso(nextDue, 14);
                  setNextDue(updated);
                  toast.success("Snoozed for 2 weeks");
                }}
                className="w-full rounded-[4px] bg-white border border-[#E9E9E9] px-4 py-4 inline-flex items-center justify-center gap-2 text-[#1F2937] hover:bg-[#F8FAFC] transition-colors shadow-sm"
              >
                <FontAwesomeIcon icon={faBell} className="w-5 h-5" />
                <span className="text-[16px] leading-[1.3] font-medium">
                  Snooze
                </span>
              </button>

              <button
                onClick={() => {
                  toast.success("Archived");
                  router.push("/");
                }}
                className="w-full rounded-[4px] bg-white border border-[#E9E9E9] px-4 py-4 inline-flex items-center justify-center gap-2 text-[#1F2937] hover:bg-[#F8FAFC] transition-colors shadow-sm"
              >
                <FontAwesomeIcon icon={faBoxArchive} className="w-5 h-5" />
                <span className="text-[16px] leading-[1.3] font-medium">
                  Archive
                </span>
              </button>

              <button
                onClick={() => {
                  toast.success("Deleted");
                  router.push("/");
                }}
                className="w-full rounded-[4px] bg-white border border-[#E9E9E9] px-4 py-4 inline-flex items-center justify-center gap-2 text-[#EF4444] hover:bg-red-50 transition-colors shadow-sm"
              >
                <FontAwesomeIcon icon={faTrash} className="w-5 h-5" />
                <span className="text-[16px] leading-[1.3] font-medium">
                  Delete
                </span>
              </button>
            </div>
          </section>

          {/* Right column */}
          <section className="w-full lg:flex-1 flex flex-col items-stretch gap-8">
            {/* Metric cards row */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 items-stretch gap-4 lg:gap-6">
              <div className="rounded-[8px] bg-white shadow-[0px_1px_6px_0px_rgba(0,0,0,0.08)] px-4 py-8 flex flex-col items-center gap-2">
                <div className="text-[30px] lg:text-[36px] leading-[1.3] font-bold text-[#244D3F]">
                  {friend.days_since_contact}
                </div>
                <div className="w-full text-center text-[16px] lg:text-[18px] leading-[1.3] font-normal text-[#64748B]">
                  Days Since Contact
                </div>
              </div>

              <div className="rounded-[8px] bg-white shadow-[0px_1px_6px_0px_rgba(0,0,0,0.08)] px-4 py-8 flex flex-col items-center gap-2">
                <div className="text-[30px] lg:text-[36px] leading-[1.3] font-bold text-[#244D3F]">
                  {friend.goal}
                </div>
                <div className="w-full text-center text-[16px] lg:text-[18px] leading-[1.3] font-normal text-[#64748B]">
                  Goal (Days)
                </div>
              </div>

              <div className="rounded-[8px] bg-white shadow-[0px_1px_6px_0px_rgba(0,0,0,0.08)] px-4 py-8 flex flex-col items-center gap-2">
                <div className="w-full text-center text-[24px] lg:text-[30px] leading-[1.3] font-bold text-[#244D3F]">
                  {formatShortDate(nextDue)}
                </div>
                <div className="w-full text-center text-[16px] lg:text-[18px] leading-[1.3] font-normal text-[#64748B]">
                  Next Due
                </div>
              </div>
            </div>

            {/* Relationship goal */}
            <div className="w-full rounded-[8px] bg-white shadow-[0px_1px_6px_0px_rgba(0,0,0,0.08)] p-6 lg:p-8 flex flex-col items-stretch gap-4">
              <div className="w-full flex items-center justify-between gap-4">
                <div className="text-[20px] lg:text-[22px] leading-[1.3] font-medium text-[#244D3F]">
                  Relationship Goal
                </div>
                <button className="rounded-[4px] bg-[#F8FAFC] border border-[#E9E9E9] px-4 py-2 inline-flex items-center justify-center hover:bg-[#E9E9E9] transition-colors">
                  <span className="text-[14px] leading-[1.3] font-medium text-[#1F2937]">
                    Edit
                  </span>
                </button>
              </div>
              <div className="text-[16px] lg:text-[18px] leading-[1.3] font-normal text-[#64748B]">
                Connect every {friend.goal} days
              </div>
            </div>

            {/* Quick Check-In */}
            <div className="w-full rounded-[8px] bg-white shadow-[0px_1px_6px_0px_rgba(0,0,0,0.08)] p-6 lg:p-8 flex flex-col items-stretch gap-4">
              <div className="text-[20px] lg:text-[22px] leading-[1.3] font-medium text-[#244D3F]">
                Quick Check-In
              </div>

              <div className="w-full grid grid-cols-1 sm:grid-cols-3 items-stretch gap-4">
                <button
                  onClick={() => {
                    addEntry(friend.name, "call");
                    toast.success("Added to timeline");
                  }}
                  className="rounded-[8px] bg-[#F8FAFC] border border-[#E9E9E9] p-6 flex flex-col items-center gap-3 hover:bg-[#244D3F] hover:text-white group transition-all"
                >
                  <FontAwesomeIcon icon={faPhoneVolume} className="w-8 h-8 text-black group-hover:text-white transition-colors" />
                  <span className="text-[18px] leading-[1.3] font-medium">
                    Call
                  </span>
                </button>
                <button
                  onClick={() => {
                    addEntry(friend.name, "text");
                    toast.success("Added to timeline");
                  }}
                  className="rounded-[8px] bg-[#F8FAFC] border border-[#E9E9E9] p-6 flex flex-col items-center gap-3 hover:bg-[#244D3F] hover:text-white group transition-all"
                >
                  <FontAwesomeIcon icon={faCommentDots} className="w-8 h-8 text-black group-hover:text-white transition-colors" />
                  <span className="text-[18px] leading-[1.3] font-medium">
                    Text
                  </span>
                </button>
                <button
                  onClick={() => {
                    addEntry(friend.name, "video");
                    toast.success("Added to timeline");
                  }}
                  className="rounded-[8px] bg-[#F8FAFC] border border-[#E9E9E9] p-6 flex flex-col items-center gap-3 hover:bg-[#244D3F] hover:text-white group transition-all"
                >
                  <FontAwesomeIcon icon={faVideo} className="w-8 h-8 text-black group-hover:text-white transition-colors" />
                  <span className="text-[18px] leading-[1.3] font-medium">
                    Video
                  </span>
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

