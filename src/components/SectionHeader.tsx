import React from "react";

interface SectionHeaderProps {
  badge?: string;
  badgeColor?: "teal" | "sand" | "peach" | "mint" | "lime" | "coral";
  title: string;
  titleHighlight?: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  badgeColor = "teal",
  title,
  titleHighlight,
  description,
  align = "center",
  className = "",
}) => {
  const isCenter = align === "center";

  // Normalize legacy color tokens to authentic 5-color palette
  const normalizedColor =
    badgeColor === "lime"
      ? "teal"
      : badgeColor === "coral"
        ? "sand"
        : badgeColor;

  const getBadgeStyles = () => {
    switch (normalizedColor) {
      case "sand":
        return "bg-[#c6af87]/15 text-[#c6af87] border-[#c6af87]/35";
      case "peach":
        return "bg-[#e7d7b8]/15 text-[#e7d7b8] border-[#e7d7b8]/35";
      case "mint":
        return "bg-[#dce3e7]/15 text-[#dce3e7] border-[#dce3e7]/35";
      case "teal":
      default:
        return "bg-[#756247]/20 text-[#dce3e7] border-[#756247]/40";
    }
  };

  const getDotStyles = () => {
    switch (normalizedColor) {
      case "sand":
        return "bg-[#c6af87]";
      case "peach":
        return "bg-[#e7d7b8]";
      case "mint":
        return "bg-[#dce3e7]";
      case "teal":
      default:
        return "bg-[#756247]";
    }
  };

  return (
    <div
      className={`max-w-3xl ${
        isCenter ? "mx-auto text-center" : "text-left"
      } ${className}`}
    >
      {badge && (
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border backdrop-blur-md ${getBadgeStyles()}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${getDotStyles()}`} />
          <span>{badge}</span>
        </div>
      )}

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#f6f4ef] leading-tight">
        {title}{" "}
        {titleHighlight && (
          <span className="text-[#c6af87] font-serif italic">
            {titleHighlight}
          </span>
        )}
      </h2>

      {description && (
        <p className="mt-4 text-base sm:text-lg text-[#a3adb7] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};
