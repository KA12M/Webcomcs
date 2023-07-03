import React from "react";

const AvatarPlaceholder = ({
  label,
  className,
}: {
  label: string;
  className?: string;
}) => {
  return (
    <div
      className={`avatar-initials w-10 h-10 rounded-full flex items-center justify-center bg-gray-500 text-lg text-white font-bold ${className}`}
    >
      {label && label.charAt(0)}
    </div>
  );
};

export default AvatarPlaceholder;
