import React from "react";

export default function Labels({ data }) {
  return (
    <div>
      {data.map((item, index) => (
        <div key={index} className="grid grid-cols-2 ">
          <div className="flex items-center gap-2">
            {/* Colored Dot */}
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            ></span>
            {/* Label */}
            <span className="text-gray-700 font-medium">{item.type}</span>
          </div>
          <span className="font-bold">Rs {item.amount}</span>
        </div>
      ))}
    </div>
  );
}
