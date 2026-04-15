"use client";

import { useEffect, useMemo, useState } from "react";
import FriendCard from "@/components/FriendCard";
import StatCard from "@/components/StatCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function Spinner() {
  return (
    <div className="w-full flex items-center justify-center py-20">
      <div className="w-10 h-10 rounded-full border-4 border-[#E9E9E9] border-t-[#244D3F] animate-spin" />
    </div>
  );
}

export default function HomeClient() {
  const [friends, setFriends] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setError("");
        const res = await fetch("/api/friends", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to load friends");
        const data = await res.json();
        if (!cancelled) setFriends(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!cancelled) setError(e?.message || "Failed to load friends");
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const stats = useMemo(() => {
    const list = Array.isArray(friends) ? friends : [];
    const total = list.length;
    const onTrack = list.filter((f) => f?.status === "on-track").length;
    const needAttention = list.filter(
      (f) => f?.status === "overdue" || f?.status === "almost due",
    ).length;
    return { total, onTrack, needAttention };
  }, [friends]);

  if (!friends) {
    return error ? (
      <div className="w-full rounded-[8px] bg-white border border-[#E9E9E9] p-6 text-center text-[16px] leading-[1.3] text-[#64748B]">
        {error}
      </div>
    ) : (
      <Spinner />
    );
  }

  return (
    <>
      <div className="w-full flex flex-col items-center gap-8">
        <div className="w-full flex flex-col items-center gap-4">
          <h1 className="w-full text-center text-[48px] leading-[1.3] font-bold text-[#1F2937]">
            Friends to keep close in your life
          </h1>
          <p className="w-full text-center text-[16px] leading-[1.3] font-normal text-[#64748B]">
            Your personal shelf of meaningful connections. Browse, tend, and
            nurture the
            <br />
            relationships that matter most.
          </p>
        </div>

        <button className="h-11 px-4 rounded-[4px] bg-[#244D3F] text-white inline-flex items-center justify-center gap-1">
          <FontAwesomeIcon icon={faPlus} className="w-4 h-4 text-white" />
          <span className="text-[16px] leading-[1.3] font-semibold">
            Add a Friend
          </span>
        </button>
      </div>

      <section className="w-full flex flex-col items-stretch gap-10">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard value={stats.total} label="Total Friends" />
          <StatCard value={stats.onTrack} label="On Track" />
          <StatCard value={stats.needAttention} label="Need Attention" />
          <StatCard value={12} label="Interactions This Month" />
        </div>

        <div className="h-px w-full bg-[#E9E9E9]" />

        <div className="w-full flex flex-col items-stretch gap-6">
          <h2 className="text-[24px] leading-[1.3] font-semibold text-[#1F2937]">
            Your Friends
          </h2>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {friends.map((friend) => (
              <FriendCard key={friend.id} friend={friend} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

