import type { CaseStudyImage } from "../data/projects";

/* empty image placeholder — swap `image.src` for a real asset later */
export default function ImageSlot({
  image,
  className = "",
  fit = "cover",
}: {
  image: CaseStudyImage;
  className?: string;
  fit?: "cover" | "contain";
}) {
  if (image.src) {
    return (
      <img
        src={image.src}
        alt={image.alt}
        className={`w-full h-full ${fit === "contain" ? "object-contain" : "object-cover"} ${className}`}
      />
    );
  }
  return (
    <div
      className={`w-full h-full flex items-center justify-center text-center px-5 border border-dashed rounded-[inherit] ${className}`}
      style={{ borderColor: "rgba(53,48,44,0.18)", background: "rgba(255,255,255,0.4)" }}
    >
      <span className="font-body text-xs italic" style={{ color: "#7C736C" }}>
        {image.alt}
      </span>
    </div>
  );
}
