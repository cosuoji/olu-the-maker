import React from "react";

export const BlogImage = ({
  src,
  alt,
  layout = "default",
  caption,
  leftCaption,
  pairWith,
}) => {
  // Enhanced Cloudinary optimization
  const optimizeUrl = (url, width = 1200) => {
    if (!url || !url.includes("cloudinary.com")) return url;
    // Dynamically inject format, quality, and width
    return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width},c_limit/`);
  };

  const Caption = ({ text, className = "" }) => (
    <figcaption
      className={`mt-4 text-[10px] tracking-[0.2em] uppercase font-sans text-atelier-ink/50 text-center px-6 ${className}`}
    >
      {text}
    </figcaption>
  );

  if (layout === "sideBySide" && pairWith) {
    return (
      <figure className="my-16 flex flex-col md:flex-row gap-4 md:gap-8 w-full px-4 md:px-12">
        <div className="flex-1 group">
          <div className="overflow-hidden bg-atelier-ink/5">
            <img
              src={optimizeUrl(src, 800)} // Smaller width for split screen
              alt={alt}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
            />
          </div>
          {leftCaption && <Caption text={leftCaption} />}
        </div>

        <div className="flex-1 group">
          <div className="overflow-hidden bg-atelier-ink/5">
            <img
              src={optimizeUrl(pairWith.src, 800)}
              alt={pairWith.alt}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
            />
          </div>
          {pairWith.caption && <Caption text={pairWith.caption} />}
        </div>
      </figure>
    );
  }

  const layoutClasses = {
    default: "max-w-3xl mx-auto my-16 px-6",
    wide: "max-w-6xl mx-auto my-20 px-6",
    // Uses the breakout technique to span the full viewport
    fullBleed:
      "w-screen relative left-[50%] right-[50%] ml-[-50vw] mr-[-50vw] my-24",
  };

  // Determine width based on layout
  const imgWidth =
    layout === "fullBleed" ? 2000 : layout === "wide" ? 1400 : 1000;

  return (
    <figure className={`${layoutClasses[layout]} group`}>
      <div className="overflow-hidden bg-atelier-ink/5">
        <img
          src={optimizeUrl(src, imgWidth)}
          alt={alt}
          className={`w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-1000 ${layout === "fullBleed" ? "aspect-[21/9] object-cover" : ""}`}
        />
      </div>
      {caption && <Caption text={caption} />}
    </figure>
  );
};
