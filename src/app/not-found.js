import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#F8FAFC] px-5 py-20">
      <main className="w-full max-w-[900px] rounded-[24px] bg-white border border-[#E9E9E9] shadow-[0px_20px_60px_rgba(15,23,42,0.08)] px-6 py-12 sm:px-12 sm:py-16">
        <div className="flex flex-col items-center text-center gap-8">
          <div className="flex h-[180px] w-[180px] items-center justify-center rounded-full bg-[#F1F5F9] border border-[#E2E8F0]">
            <div className="text-[84px] font-black tracking-[-0.06em] text-[#1F2937]">404</div>
          </div>

          <div className="space-y-4">
            <div className="text-[40px] leading-[1.05] font-bold text-[#111827]">
              Error 404
            </div>
            <p className="max-w-[600px] text-[18px] leading-[1.8] font-normal text-[#475569]">
              The page you are looking for was moved, removed or might never existed.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center rounded-[10px] bg-[#244D3F] px-8 text-[16px] font-semibold text-white transition hover:bg-[#1e3a32]"
          >
            Back to homepage
          </Link>
        </div>
      </main>
    </div>
  );
}