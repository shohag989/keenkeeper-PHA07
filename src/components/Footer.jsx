import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="w-full bg-[#244D3F] text-white">
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-10 lg:px-[245px] pt-20 pb-[30px] flex flex-col gap-10">
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-4 w-full">
            <div className="text-[32px] leading-[1.3] font-semibold">
              KeenKeeper
            </div>
            <p className="max-w-[700px] text-center text-[16px] leading-normal opacity-80">
              Your personal shelf of meaningful connections. Browse, tend, and
              nurture the relationships that matter most.
            </p>
          </div>

          <div className="w-[220px] flex flex-col items-center gap-4">
            <div className="text-[20px] leading-[1.4] font-medium">
              Social Links
            </div>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="p-[10px] rounded-[10px] bg-white/10 hover:bg-white/15 transition-colors"
                aria-label="Facebook"
              >
                <span className="sr-only">Facebook</span>
                <FontAwesomeIcon icon={faFacebookF} className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-[10px] rounded-[10px] bg-white/10 hover:bg-white/15 transition-colors"
                aria-label="Instagram"
              >
                <span className="sr-only">Instagram</span>
                <FontAwesomeIcon icon={faInstagram} className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-[10px] rounded-[10px] bg-white/10 hover:bg-white/15 transition-colors"
                aria-label="X (Twitter)"
              >
                <span className="sr-only">X (Twitter)</span>
                <FontAwesomeIcon icon={faXTwitter} className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[30px]">
          <div className="h-px w-full bg-[#1A8862] opacity-20" />
          <div className="flex flex-col sm:flex-row sm:items-end gap-[30px] justify-between">
            <div className="text-[16px] leading-normal opacity-50 text-[#FAFAFA]">
              © 2026 KeenKeeper. All rights reserved.
            </div>
            <div className="text-[16px] leading-normal opacity-50 text-[#FAFAFA] whitespace-pre-wrap">
              Privacy Policy           Terms of Service           Cookies
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}