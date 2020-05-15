import React, { useState } from "react";

export default function ProgressBar(props) {
  const [HideProgressBar, setHideProgressBar] = useState("");
  if (props.percentage === 100) {
    setTimeout(() => {
      setHideProgressBar("hidden");
    }, 1500);
  }
  //   const [progressBarDisplay, setProgressBarDisplay] = useState(null);

  //Hide progressBar after the the download is complete
  //   const removeProgressBar = () => {
  //     if (props.percentage === 100) {
  //       setTimeout(() => {
  //         setProgressBarDisplay("hidden");
  //       }, 1500);
  //     }
  //     if (progressBarDisplay) {
  //       return progressBarDisplay;
  //     } else {
  //       return props.show;
  //     }
  //   };

  return (
    <div
      className={`bg-gray-300 w-full text-center text-white font-semibold rounded ${props.show} ${HideProgressBar}`}>
      <div
        className="bg-green-400"
        style={{ height: "24px", width: `${props.percentage}%` }}>
        {props.percentage === 100
          ? "File uploaded successfully"
          : `${props.percentage}%`}
      </div>
    </div>
  );
}
