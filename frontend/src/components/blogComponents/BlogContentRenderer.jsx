import { BlogImage } from "./BlogImage";
import { PullQuote } from "./PullQuote";

const BlogContentRenderer = ({ contentBlocks }) => {
  if (!contentBlocks || contentBlocks.length === 0) {
    return (
      <div className="text-atelier-ink/40 font-sans text-xs uppercase tracking-widest py-20 text-center">
        End of Archive
      </div>
    );
  }

  return (
    <div className="blog-content w-full">
      {contentBlocks.map((block, index) => {
        // Shared wrapper for text-based content to keep the 3xl width
        const TextWrapper = ({ children }) => (
          <div className="max-w-3xl mx-auto px-6 mb-12">{children}</div>
        );

        switch (block.type) {
          case "text":
            return (
              <TextWrapper key={index}>
                <div
                  className="prose prose-atelier max-w-none font-serif text-lg leading-relaxed text-atelier-ink/90"
                  dangerouslySetInnerHTML={{
                    // Note: Use a proper library like DOMPurify if users can edit this
                    __html: (block.content || "").replace(/\n/g, "<br />"),
                  }}
                />
              </TextWrapper>
            );

          case "image":
            return (
              <BlogImage
                key={index}
                src={block.src}
                alt={block.alt || ""}
                layout={block.layout || "default"} // handles 'default', 'wide', 'fullBleed'
                caption={block.caption}
              />
            );

          case "pull-quote":
            return <PullQuote key={index} text={block.content || ""} />;

          case "side-by-side-images":
            return (
              <div className="max-w-6xl mx-auto px-4">
                <BlogImage
                  key={index}
                  layout="sideBySide"
                  src={block.images[0].src}
                  alt={block.images[0].alt}
                  leftCaption={block.images[0].caption}
                  pairWith={{
                    src: block.images[1].src,
                    alt: block.images[1].alt,
                    caption: block.images[1].caption,
                  }}
                />
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
};

export default BlogContentRenderer;
