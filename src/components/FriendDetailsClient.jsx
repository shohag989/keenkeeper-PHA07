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
      <main className="mx-auto w-full max-w-[1600px] px-5 sm:px-10 lg:px-[245px] py-20">
        <div className="w-full flex items-start gap-6">
          {/* Left column (350px): profile + stacked actions */}
          <section className="w-[350px] flex flex-col items-stretch gap-4">
            <div className="w-full rounded-[8px] bg-white shadow-[0px_3px_6px_0px_rgba(0,0,0,0.08)] p-6 flex flex-col items-center gap-3">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-[#D9D9D9]">
                <img
                  src={friend.picture}
                  alt={friend.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-full flex flex-col items-center gap-2">
                <div className="w-full text-center text-[20px] leading-[1.3] font-semibold text-[#1F2937]">
                  {friend.name}
                </div>

                <div className="flex flex-wrap justify-center items-center gap-2">
                  <StatusPill status={friend.status} />
                  {primaryTag ? <TagPill tag={primaryTag} /> : null}
                </div>
              </div>

              <div
                className="text-center text-[16px] leading-none font-medium text-[#64748B]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {displayBio}
              </div>

              <div className="text-center text-[14px] leading-none font-normal text-[#64748B]">
                {email ? email : "No email on file"}
              </div>
            </div>

            <div className="w-full flex flex-col items-stretch gap-4">
              <button
                onClick={() => {
                  const updated = addDaysIso(nextDue, 14);
                  setNextDue(updated);
                  toast.success("Snoozed for 2 weeks");
                }}
                className="w-full rounded-[4px] bg-white border border-[#E9E9E9] px-4 py-4 inline-flex items-center justify-center gap-2 text-[#1F2937]"
              >
                <FontAwesomeIcon icon={faBell} className="w-5 h-5" />
                <span className="text-[16px] leading-[1.3] font-medium">
                  Snooze 2 weeks
                </span>
              </button>

              <button
                onClick={() => {
                  toast.success("Archived");
                  router.push("/");
                }}
                className="w-full rounded-[4px] bg-white border border-[#E9E9E9] px-4 py-4 inline-flex items-center justify-center gap-2 text-[#1F2937]"
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
                className="w-full rounded-[4px] bg-white border border-[#E9E9E9] px-4 py-4 inline-flex items-center justify-center gap-2 text-[#EF4444]"
              >
                <FontAwesomeIcon icon={faTrash} className="w-5 h-5" />
                <span className="text-[16px] leading-[1.3] font-medium">
                  Delete
                </span>
              </button>
            </div>
          </section>

          {/* Right column (736px) */}
          <section className="w-[736px] flex flex-col items-stretch gap-6">

            {/* Metric cards row */}
            <div className="w-full flex items-stretch gap-6">
              <div className="flex-1 rounded-[8px] bg-white shadow-[0px_1px_6px_0px_rgba(0,0,0,0.08)] px-4 py-8 flex flex-col items-center gap-2">
                <div className="text-[30px] leading-[1.3] font-semibold text-[#244D3F]">
                  {friend.days_since_contact}
                </div>
                <div className="w-full text-center text-[18px] leading-[1.3] font-normal text-[#64748B]">
                  Days Since Contact
                </div>
              </div>

              <div className="flex-1 rounded-[8px] bg-white shadow-[0px_1px_6px_0px_rgba(0,0,0,0.08)] px-4 py-8 flex flex-col items-center gap-2">
                <div className="text-[30px] leading-[1.3] font-semibold text-[#244D3F]">
                  {friend.goal}
                </div>
                <div className="w-full text-center text-[18px] leading-[1.3] font-normal text-[#64748B]">
                  Goal (Days)
                </div>
              </div>

              <div className="flex-1 rounded-[8px] bg-white shadow-[0px_1px_6px_0px_rgba(0,0,0,0.08)] px-4 py-8 flex flex-col items-center gap-2">
                <div className="w-full text-center text-[30px] leading-[1.3] font-semibold text-[#244D3F]">
                  {formatShortDate(nextDue)}
                </div>
                <div className="w-full text-center text-[18px] leading-[1.3] font-normal text-[#64748B]">
                  Next Due
                </div>
              </div>
            </div>

            {/* Relationship goal */}
            <div className="w-full rounded-[8px] bg-white shadow-[0px_1px_6px_0px_rgba(0,0,0,0.08)] p-6 flex flex-col items-stretch gap-4">
              <div className="w-full flex items-center justify-between gap-4">
                <div className="text-[20px] leading-[1.3] font-medium text-[#244D3F]">
                  Relationship Goal
                </div>
                <button className="w-[60px] rounded-[4px] bg-[#F8FAFC] border border-[#E9E9E9] p-2 inline-flex items-center justify-center">
                  <span className="text-[14px] leading-[1.3] font-medium text-[#1F2937]">
                    Edit
                  </span>
                </button>
              </div>
              <div className="text-[18px] leading-[1.3] font-normal text-[#64748B]">
                Connect every {friend.goal} days
              </div>
            </div>

            {/* Quick Check-In */}
            <div className="w-full rounded-[8px] bg-white shadow-[0px_1px_6px_0px_rgba(0,0,0,0.08)] p-6 flex flex-col items-stretch gap-4">
              <div className="text-[20px] leading-[1.3] font-medium text-[#244D3F]">
                Quick Check-In
              </div>

              <div className="w-full flex items-stretch gap-4">
                <button
                  onClick={() => {
                    addEntry(friend.name, "call");
                    toast.success("Added to timeline");
                  }}
                  className="flex-1 rounded-[8px] bg-[#F8FAFC] border border-[#E9E9E9] p-4 flex flex-col items-center gap-2"
                >
                  <FontAwesomeIcon icon={faPhoneVolume} className="w-8 h-8" />
                  <span className="text-[18px] leading-[1.3] font-normal text-[#1F2937]">
                    Call
                  </span>
                </button>
                <button
                  onClick={() => {
                    addEntry(friend.name, "text");
                    toast.success("Added to timeline");
                  }}
                  className="flex-1 rounded-[8px] bg-[#F8FAFC] border border-[#E9E9E9] p-4 flex flex-col items-center gap-2"
                >
                  <FontAwesomeIcon icon={faCommentDots} className="w-8 h-8" />
                  <span className="text-[18px] leading-[1.3] font-normal text-[#1F2937]">
                    Text
                  </span>
                </button>
                <button
                  onClick={() => {
                    addEntry(friend.name, "video");
                    toast.success("Added to timeline");
                  }}
                  className="flex-1 rounded-[8px] bg-[#F8FAFC] border border-[#E9E9E9] p-4 flex flex-col items-center gap-2"
                >
                  <FontAwesomeIcon icon={faVideo} className="w-8 h-8" />
                  <span className="text-[18px] leading-[1.3] font-normal text-[#1F2937]">
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

