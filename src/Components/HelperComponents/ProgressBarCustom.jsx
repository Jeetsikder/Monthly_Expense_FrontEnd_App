import React, { useEffect, useState } from "react";

export default function ProgressBarCustom({ percentage }) {
  const [progressBarWidth, setProgressBarWidth] = useState(percentage);

  useEffect(() => {
    setProgressBarWidth(percentage);
  }, [percentage]);

  return (
    <>
      {percentage ? (
        <div className="bg-gray-600 h-2 w-64 my-1 rounded-full">
          <div
            className="bg-[#ffa200d7] h-full rounded-full ease-in-out duration-500"
            style={{ width: progressBarWidth + "%" }}
          ></div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
