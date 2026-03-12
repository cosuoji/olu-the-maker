export const PullQuote = ({ text }) => (
  <aside className="my-24 py-12 border-y border-atelier-ink/10 max-w-4xl mx-auto text-center px-6">
    <blockquote className="text-3xl md:text-5xl font-serif italic text-atelier-ink leading-[1.1] tracking-tight">
      &ldquo;{text}&rdquo;
    </blockquote>
    {/* Optional: Add a small decorative element or attribution line here if needed */}
    <div className="mt-8 flex justify-center">
      <div className="w-12 h-[1px] bg-atelier-tan/40" />
    </div>
  </aside>
);
