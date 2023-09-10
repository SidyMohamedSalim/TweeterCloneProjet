"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const FilterTweets = ({ etats = "all" }: { etats: string }) => {
  const router = useRouter();
  const [etat, setEtat] = useState("all");
  const classeNameBase =
    "hover:border-b-2 font-extrabold text-center border-sky-500 w-full py-2 transition-all ";
  const classeNameBaseSelected =
    "hover:border-b-2  font-extrabold  text-center border-sky-500 w-full py-2 border-b-2 transition-all ";

  return (
    <div
      id="filter"
      className=" flex justify-evenly my-2  items-center bg-gray-900"
    >
      <button
        onClick={(e) => {
          e.preventDefault();
          setEtat(e.currentTarget.dataset.filter?.toString() ?? "");
          console.log(etat);
          etats = etat;
          router.refresh();
        }}
        data-filter="all"
        className={etat === "all" ? classeNameBaseSelected : classeNameBase}
      >
        Recommandations
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          setEtat(e.currentTarget.dataset.filter?.toString() ?? "");
          console.log(etat);
          etats = etat;
          router.refresh();
        }}
        data-filter="follow"
        className={etat === "follow" ? classeNameBaseSelected : classeNameBase}
      >
        Abonnements
      </button>
    </div>
  );
};

export default FilterTweets;
