"use client";

export default function StatCard({ value, label }) {
  return (
    <div className="flex flex-col items-center gap-2 p-8 rounded-[8px] bg-white shadow-[0px_1px_6px_0px_rgba(0,0,0,0.08)]">
      <div className="text-[32px] leading-[1.3] font-semibold text-[#244D3F]">
        {value}
      </div>
      <div className="text-[18px] leading-[1.3] font-normal text-[#64748B] text-center">
        {label}
      </div>
    </div>
  );
}
