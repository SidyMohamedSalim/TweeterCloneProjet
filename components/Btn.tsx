"use client";

import React from "react";
import { useRouter } from "next/navigation";

const Btn = ({
  type,
  text,
  onClick,
}: {
  type: "primary" | "secondary";
  text: string;
  onClick?: () => void;
}) => {
  return type === "primary" ? (
    <button
      onClick={(e) => {
        e.preventDefault();
        if (onClick) {
          onClick();
        }
      }}
      className="text-black hover:bg-opacity-90 px-3 py-1 rounded-2xl bg-white"
    >
      <span>{text}</span>
    </button>
  ) : (
    <button
      onClick={(e) => {
        e.preventDefault();
        if (onClick) {
          onClick();
        }
      }}
      className="px-3 hover:bg-gray-800 py-1 rounded-2xl border border-1"
    >
      <span>{text}</span>
    </button>
  );
};

export default Btn;
