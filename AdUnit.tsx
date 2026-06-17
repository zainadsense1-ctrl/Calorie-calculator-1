import { useEffect, useRef } from "react";
import { ADSENSE_CLIENT } from "@/config/adsense";

interface AdUnitProps {
  slot: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  className?: string;
  label?: string;
}

declare global {
  interface Window {
    adsbygoogle: object[];
  }
}

/**
 * Renders a responsive Google AdSense ad unit.
 * In development (no real AdSense account), a placeholder is shown instead.
 * Replace ADSENSE_CLIENT and slot IDs in src/config/adsense.ts before deploying.
 */
export default function AdUnit({ slot, format = "auto", className = "", label = "Advertisement" }: AdUnitProps) {
  const ref = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  const isConfigured = !ADSENSE_CLIENT.includes("0000000000000000");

  useEffect(() => {
    if (!isConfigured || pushed.current) return;
    if (!ref.current) return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      /* AdSense not yet loaded; will retry on next render */
    }
  }, [isConfigured]);

  return (
    <div
      className={`adsense-unit my-6 w-full overflow-hidden ${className}`}
      aria-label={label}
      data-testid={`ad-unit-${slot}`}
    >
      <p className="text-[10px] text-muted-foreground uppercase tracking-widest text-center mb-1 select-none">
        {label}
      </p>

      {isConfigured ? (
        <ins
          ref={ref}
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      ) : (
        /* Development placeholder — replaced by real ads in production */
        <div className="flex items-center justify-center bg-muted/60 border border-dashed border-border rounded-lg text-muted-foreground text-xs py-6 px-4 min-h-[90px]">
          <span>
            Ad unit · slot <code className="font-mono">{slot}</code> · Configure publisher ID in{" "}
            <code className="font-mono">src/config/adsense.ts</code>
          </span>
        </div>
      )}
    </div>
  );
}
