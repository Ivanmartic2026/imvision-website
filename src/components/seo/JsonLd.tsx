/**
 * Renders a JSON-LD <script> for structured data. Server component — the JSON is
 * inlined into the static HTML at build time (no client JS, no hydration cost).
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is trusted, build-time content.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
