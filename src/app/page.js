import friends from "@/data/friends.json";
import FriendCard from "@/components/FriendCard";
import StatCard from "@/components/StatCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const totalFriends = friends.length;
  const onTrack = friends.filter((f) => f.status === "active").length;
  const needAttention = friends.filter(
    (f) => f.status === "overdue" || f.status === "due_soon",
  ).length;

  return (
    <div className="flex-1 w-full bg-[#F8FAFC]">
      <main className="mx-auto w-full max-w-[1600px] px-5 sm:px-10 lg:px-[245px] py-20 flex flex-col items-center gap-10">
        <div className="w-full flex flex-col items-center gap-8">
          <div className="w-full flex flex-col items-center gap-4">
            <h1 className="w-full text-center text-[36px] sm:text-[48px] leading-[1.3] font-bold text-[#1F2937]">
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
            <StatCard value={totalFriends} label="Total Friends" />
            <StatCard value={onTrack} label="On Track" />
            <StatCard value={needAttention} label="Need Attention" />
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
      </main>
    </div>
  );
}
