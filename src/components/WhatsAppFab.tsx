import { MessageCircle, Instagram } from "lucide-react";
import { WHATSAPP_URL, INSTAGRAM_URL } from "@/lib/constants";

export function WhatsAppFab() {
  return (
    <div
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-3"
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Follow on Instagram"
        className="h-12 w-12 rounded-full flex items-center justify-center text-white violet-glow"
        style={{
          background:
            "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
        }}
      >
        <Instagram className="h-5 w-5" />
      </a>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="h-14 w-14 rounded-full flex items-center justify-center text-white violet-glow animate-pulse-glow"
        style={{ background: "var(--whatsapp)" }}
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
}
