import DOMPurify from "isomorphic-dompurify";

// Server-side sanitizer for blog HTML, applied at save time. Adapted from the
// PublicSite reference: code blocks are preserved verbatim (their entity-encoded
// contents must survive), everything else is scrubbed. iframes are allow-listed
// so embedded videos keep working.
export function sanitizeHtml(html: string): string {
  if (!html) return "";
  return DOMPurify.sanitize(html, {
    ADD_TAGS: ["iframe"],
    ADD_ATTR: [
      "allow",
      "allowfullscreen",
      "frameborder",
      "scrolling",
      "target",
      "loading",
    ],
    // Keep <pre>/<code> content intact; DOMPurify already leaves text nodes alone.
    FORBID_TAGS: ["script", "style"],
  });
}
