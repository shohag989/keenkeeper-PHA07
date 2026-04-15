import HomeClient from "@/components/HomeClient";

export default function Home() {
  return (
    <div className="flex-1 w-full bg-[#F8FAFC]">
      <main className="mx-auto w-full max-w-[1600px] px-5 sm:px-10 lg:px-[245px] py-20 flex flex-col items-center gap-10">
        <HomeClient />
      </main>
    </div>
  );
}
