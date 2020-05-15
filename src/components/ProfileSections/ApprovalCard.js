import React from "react";

export default function ApprovalCard({ children, onReject }) {
  return (
    <div className=" border-double border-4 border-gray-600 h-auto p-6 w-64">
      <div className="font-semibold">{children}</div>
      <div className="flex justify-around mt-10">
        <input
          type="submit"
          className=" px-4 py-2 rounded bg-green-600 cursor-pointer"
          value="Publish"
        />
        <div
          className=" px-4 py-2 rounded bg-red-600 cursor-pointer"
          onClick={() => {
            onReject();
          }}>
          Reject
        </div>
      </div>
    </div>
  );
}
