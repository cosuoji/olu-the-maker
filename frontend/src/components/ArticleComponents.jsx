import { Link } from "react-router-dom";

/**
 * FeatureArticle: Used for "Sidebar" or "Quick Read" lists.
 * Sharp, minimal, and typography-focused.
 */
export const FeatureArticle = ({ date, title, imgSrc, slug }) => (
  <Link to={`/journal/${slug}`} className="group block">
    <div className="flex gap-6 py-4 border-b border-atelier-ink/10 items-center">
      <div className="w-20 h-20 flex-shrink-0 overflow-hidden">
        <img
          src={imgSrc}
          alt={title}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-[9px] tracking-[0.3em] uppercase font-sans text-atelier-tan mb-2">
          {new Date(date).toLocaleDateString("en-GB", {
            month: "short",
            year: "numeric",
          })}
        </span>
        <h4 className="text-md font-serif italic text-atelier-ink leading-tight group-hover:text-atelier-tan transition-colors">
          {title}
        </h4>
      </div>
    </div>
  </Link>
);

/**
 * Article: The main grid card.
 * Modeled after luxury print layouts (Sharp corners, Serif titles).
 */
export const Article = ({
  headerImage: imgSrc,
  title: headline,
  author,
  category,
  publishedAt,
  slug,
}) => (
  <Link to={`/journal/${slug}`} className="group block">
    <div className="flex flex-col h-full group cursor-pointer">
      {/* 1. Header Image - No rounded corners, aspect-ratio for consistency */}
      <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-atelier-ink/5">
        <img
          src={imgSrc}
          alt={headline}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
        />
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-atelier-ink/0 group-hover:bg-atelier-ink/5 transition-colors duration-700" />
      </div>

      {/* 2. Metadata Section */}
      <div className="flex flex-col flex-grow">
        {category && (
          <span className="text-[10px] tracking-[0.4em] uppercase font-sans font-bold text-atelier-tan mb-3">
            {category.replace("-", " ")}
          </span>
        )}

        <h3 className="text-2xl md:text-3xl font-serif italic text-atelier-ink leading-[1.2] mb-4 group-hover:underline decoration-atelier-tan/30 underline-offset-4">
          {headline}
        </h3>

        <div className="mt-auto pt-4 border-t border-atelier-ink/5 flex justify-between items-end">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-atelier-ink/40 font-sans">
              Words by
            </span>
            <span className="text-sm font-serif italic text-atelier-ink/80">
              {author}
            </span>
          </div>

          <span className="text-[10px] tracking-widest text-atelier-ink/30 font-sans uppercase">
            {new Date(publishedAt).getFullYear()}
          </span>
        </div>
      </div>
    </div>
  </Link>
);
