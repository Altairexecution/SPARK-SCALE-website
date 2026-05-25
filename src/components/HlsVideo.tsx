import { useEffect, useRef } from "react";

interface Props {
  src: string;
  poster?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Lightweight HLS video player. Uses native HLS where supported (Safari/iOS),
 * lazy-loads hls.js elsewhere. Always muted/looped/playsInline for backgrounds.
 */
export function HlsVideo({ src, poster, className, style }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    let hls: { destroy: () => void } | null = null;

    const canNative = video.canPlayType("application/vnd.apple.mpegurl");
    if (canNative) {
      video.src = src;
      video.play().catch(() => {});
    } else {
      let cancelled = false;
      import("hls.js").then(({ default: Hls }) => {
        if (cancelled || !video) return;
        if (Hls.isSupported()) {
          const instance = new Hls({ lowLatencyMode: true, enableWorker: true });
          instance.loadSource(src);
          instance.attachMedia(video);
          instance.on(Hls.Events.MANIFEST_PARSED, () => {
            video.play().catch(() => {});
          });
          hls = instance;
        } else {
          video.src = src;
          video.play().catch(() => {});
        }
      });
      return () => {
        cancelled = true;
        hls?.destroy();
      };
    }
  }, [src]);

  return (
    <video
      ref={ref}
      poster={poster}
      autoPlay
      muted
      playsInline
      loop
      preload="auto"
      className={className}
      style={style}
    />
  );
}
