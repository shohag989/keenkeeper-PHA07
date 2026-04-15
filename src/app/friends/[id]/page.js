import friends from "@/data/friends.json";
import FriendDetailsClient from "@/components/FriendDetailsClient";

export default async function Page({ params }) {
  const resolvedParams = await params;
  const rawParam = String(resolvedParams?.id ?? "");
  const rawId = (() => {
    try {
      return decodeURIComponent(rawParam).trim();
    } catch {
      return rawParam.trim();
    }
  })();

  const digitsOnly = rawId.replace(/[^\d]/g, "");
  const numericId = Number.parseInt(digitsOnly || rawId, 10);

  const friend = friends.find((f) => {
    const fid = f?.id;
    const fidStr = String(fid ?? "").trim();
    if (fidStr === rawId) return true;
    if (digitsOnly && fidStr === digitsOnly) return true;
    if (
      !Number.isNaN(numericId) &&
      Number.parseInt(fidStr.replace(/[^\d]/g, ""), 10) === numericId
    )
      return true;
    return false;
  });

  if (!friend) {
    return (
      <div className="flex-1 w-full bg-[#F8FAFC]">
        <main className="mx-auto w-full max-w-[1600px] px-5 sm:px-10 lg:px-[245px] py-20">
          <h1 className="text-[48px] leading-[1.3] font-bold text-[#1F2937]">
            Friend not found
          </h1>
        </main>
      </div>
    );
  }

  return <FriendDetailsClient friend={friend} />;
}