import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import '../static/tailwind.css'
import {toString } from "./background.js"

function App() {
  //  the state updates performed using useState hooks will not persist across browser extension restarts. 
  // The state is stored in memory within the React component and will be reset to
  // its initial values when the extension is reopened or the component is unmounted.
  const [mentorText, setMentorText] = useState("");
  const [mapCleanedText, setMapCleanedText] = useState("");
  const [error, setError] = useState("");
  const [timeTracker, setTimeTracker] = useState(null);
  const [port, setPort] = useState(null);

  useEffect(() => {
    const backgroundPort = chrome.runtime.connect();
    setPort(backgroundPort);
    const listener = (msg) => {
      setTimeTracker(null);
      setMapCleanedText("");
      if (msg.mentorOutput) {
        setMentorText(msg.mentorOutput);
      } else if (msg.timeTracker) {
        setTimeTracker(msg.timeTracker);
      } else if (msg.mapCleanedText) {
        setMapCleanedText(msg.mapCleanedText);
      } else if (msg.error) {
        setError(msg.error);
      }
    };
    backgroundPort.onMessage.addListener(listener);
    return () => {
      backgroundPort.onMessage.removeListener(listener);
      backgroundPort.disconnect();
    };
  }, []);

  return (
    <>
      <div className="w-96 flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-6xl font-bold text-center text-blue-500 mb-6 mt-2">
          <span className="text-cyan-500">Daily</span>{" "}
          <span className="text-blue-500">Guru</span>
        </h1>
        <Buttons port={port} />
        <div> 
        <ContentWindow 
          mentorText={mentorText}
          mapCleanedText={mapCleanedText}
          error={error}
          timeTracker={timeTracker}
        />
        </div>
      </div>
    </>
  );
};

function ContentWindow(props) {
  const {
    mentorText,
    mapCleanedText,
    error,
    timeTracker,
  } = props;

  if (mentorText) {
    return <div className="text-center text-gray-700 text-lg" >{mentorText}</div>;
  }

  if (timeTracker) {
    return (
      timeTracker.length === 0 ? (
        <p className="text-center text-gray-700 text-lg">No tab recorded</p>
      ) : (
        <ul className="list-disc list-inside text-center text-sm font-medium text-white">
          {timeTracker.map(([tab, time]) => (
            <li className="bg-gradient-to-r from-cyan-500 to-blue-500 m-2 rounded-lg p-1" key={tab}>
              {tab} - {time} seconds
            </li>
          ))}
        </ul>
      )
    );
  }  

  if (mapCleanedText) {
    return (
      <div className="text-center text-gray-700 text-lg">
        {mapCleanedText}
    </div>

    )
  }

  if (error === 'UNAUTHORIZED' || error === 'CLOUDFLARE') {
    return (
      <div className="text-center text-gray-700 text-lg">
         <p>
        Please login and pass Cloudflare check at{' '}
        <a className="font-bold underline text-cyan-500" href="https://chat.openai.com" target="_blank" rel="noreferrer">
          chat.openai.com
        </a>
        </p>
    </div>
    )
  }

  return (
    <div className="text-center text-gray-700 text-lg">
      Waiting for input....
    </div>
  );
}

function Buttons(props) {
  const port = props.port;
  const handlePrint = () => {
    port.postMessage({ action: "print map" });
  };

  const handleClean = () => {
    port.postMessage({ action: "clean time tracker", minTime: 10 });
  };

  const handleGenerate = () => {
    port.postMessage({ action: "generate" });
  };

  return (
    <>
      <button
        onClick={handlePrint}
        className="w-[50%] px-6 py-3 mb-4 text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg"
      >
        Print Website Usages
      </button>
      <button
        onClick={handleClean}
        className="w-[50%] px-6 py-3 mb-4 text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg"
      >
        Only count tabs you stayed more than 10 seconds on
      </button>
      <button
        onClick={handleGenerate}
        className="w-[50%] px-6 py-3 mb-4 text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg"
      >
        Generate Report
      </button>
    </>
  );
}

document.addEventListener("DOMContentLoaded", function () {
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<App />);
});