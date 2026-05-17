import React from "react";

export default function DetectOffline() {
  return (
    <div className="fixed inset-0 bg-slate-900/85 text-white z-50 flex justify-center items-center ">
      <h1 className="font-bold text-4xl">🛑you are offline...!</h1>
    </div>
  );
}