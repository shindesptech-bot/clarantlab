"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import Script from "next/script";
import { RECAPTCHA_SITE_KEY } from "@/lib/salesforceLead";

export type RecaptchaHandle = {
  getResponse: () => string;
  reset: () => void;
};

declare global {
  interface Window {
    grecaptcha?: {
      render: (
        el: HTMLElement,
        opts: { sitekey: string; theme?: "dark" | "light" }
      ) => number;
      getResponse: (id?: number) => string;
      reset: (id?: number) => void;
    };
  }
}

// One self-contained reCAPTCHA v2 checkbox. `render=explicit` + an owned widget
// id means two boxes on the same page never read each other's response, and
// getResponse/reset only ever touch this form's widget.
export const RecaptchaBox = forwardRef<RecaptchaHandle, { style?: React.CSSProperties }>(
  function RecaptchaBox({ style }, ref) {
    const boxRef = useRef<HTMLDivElement>(null);
    const widgetId = useRef<number | null>(null);
    const [loaded, setLoaded] = useState(false);

    useImperativeHandle(ref, () => ({
      getResponse: () =>
        window.grecaptcha && widgetId.current !== null ? window.grecaptcha.getResponse(widgetId.current) : "",
      reset: () => {
        if (window.grecaptcha && widgetId.current !== null) window.grecaptcha.reset(widgetId.current);
      },
    }));

    // Covers the case where the script was already loaded before this mounted.
    useEffect(() => {
      if (window.grecaptcha?.render) setLoaded(true);
    }, []);

    useEffect(() => {
      const el = boxRef.current;
      // Guard against double-render (StrictMode / re-mount) — grecaptcha throws
      // if the same element is rendered twice.
      if (!loaded || !el || widgetId.current !== null || el.childElementCount > 0 || !window.grecaptcha?.render) return;

      widgetId.current = window.grecaptcha.render(el, { sitekey: RECAPTCHA_SITE_KEY, theme: "dark" });
    }, [loaded]);

    return (
      <>
        <Script
          src="https://www.google.com/recaptcha/api.js?render=explicit"
          strategy="afterInteractive"
          onLoad={() => setLoaded(true)}
        />
        <div ref={boxRef} style={style} />
      </>
    );
  }
);
