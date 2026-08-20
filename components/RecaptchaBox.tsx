"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import Script from "next/script";
import { RECAPTCHA_SITE_KEY } from "@/lib/salesforceLead";

export type RecaptchaHandle = {
  // Runs the invisible challenge and resolves with the token (or "" on error).
  execute: () => Promise<string>;
  reset: () => void;
};

declare global {
  interface Window {
    grecaptcha?: {
      render: (
        el: HTMLElement,
        opts: {
          sitekey: string;
          size?: "invisible";
          callback?: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
        }
      ) => number;
      execute: (id?: number) => void;
      reset: (id?: number) => void;
    };
  }
}

// One self-contained Invisible reCAPTCHA. No checkbox, no user interaction —
// execute() triggers the challenge and resolves with the token via the render
// callback. `render=explicit` + an owned widget id means multiple forms on one
// page never touch each other's widget.
export const RecaptchaBox = forwardRef<RecaptchaHandle, { style?: React.CSSProperties }>(
  function RecaptchaBox({ style }, ref) {
    const boxRef = useRef<HTMLDivElement>(null);
    const widgetId = useRef<number | null>(null);
    const resolveRef = useRef<((token: string) => void) | null>(null);
    const [loaded, setLoaded] = useState(false);

    useImperativeHandle(ref, () => ({
      execute: () =>
        new Promise<string>((resolve) => {
          if (!window.grecaptcha || widgetId.current === null) return resolve("");
          resolveRef.current = resolve;
          window.grecaptcha.execute(widgetId.current);
        }),
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

      widgetId.current = window.grecaptcha.render(el, {
        sitekey: RECAPTCHA_SITE_KEY,
        size: "invisible",
        callback: (token) => {
          resolveRef.current?.(token);
          resolveRef.current = null;
        },
        "error-callback": () => {
          resolveRef.current?.("");
          resolveRef.current = null;
        },
        "expired-callback": () => {
          resolveRef.current?.("");
          resolveRef.current = null;
        },
      });
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
