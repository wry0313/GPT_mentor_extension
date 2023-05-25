import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import '../static/tailwind.css'

function App() {
  const [mentorText, setMentorText] = useState("");
  const [mapCleanedText, setMapCleanedText] = useState("");
  const [error, setError] = useState("");
  const [showUsage, setShowUsage] = useState(false);
  const [port, setPort] = useState(null);

  useEffect(() => {
    const backgroundPort = chrome.runtime.connect();
    setPort(backgroundPort);
    const listener = (msg) => {
      if (msg.mentorOutput) {
        setMentorText(msg.mentorOutput);
      } else if (msg.error) {
        setError(msg.error);
      } else if (msg.timeTracker) {
        setShowUsage(true);
      } else if (msg.mapCleanedText) {
        setMapCleanedText(msg.mapCleanedText);
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
      <div className="w-96 flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-6xl font-bold text-center text-blue-500 mb-10">
          <span className="text-cyan-500">Daily</span>{" "}
          <span className="text-blue-500">Guru</span>
        </h1>
        <Buttons port={port} />
        <ContentWindow
          mentorText={mentorText}
          mapCleanedText={mapCleanedText}
          error={error}
          showUsage={showUsage}
        />
      </div>
    </>
  );
};

function ContentWindow(props) {
  const {
    mentorText,
    mapCleanedText,
    error,
    status,
    showUsage
  } = props;

  if (mentorText) {
    return <>{props.mentorText}</>;
  }

  return (
    <div id="messageContainer" className="text-center text-gray-700 text-lg">
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
        className="px-6 py-3 mb-4 text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg"
      >
        Print Website Usages
      </button>
      <button
        onClick={handleGenerate}
        className="px-6 py-3 mb-4 text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg"
      >
        Generate Report
      </button>
      <button
        onClick={handleClean}
        className="px-6 py-3 mb-4 text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg"
      >
        Record only 10 sec
      </button>
    </>
  );
}

document.addEventListener("DOMContentLoaded", function () {
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<App />);
});

// port.onMessage.addListener(function (msg) {
//   if (msg.action === 'printPopup') {
//     if (messageContainer && msg.text) {
//       messageContainer.innerHTML = '';
//       const lines = msg.text.split('\n');
//       lines.forEach(line => {
//         if (line.trim() !== '') {
//           const listItem = document.createElement('li'); // Create <li> element
//           listItem.textContent = line; // Set the line text as the content of the <li>
//           messageContainer.appendChild(listItem); // Append the <li> to the container
//         } else {
//           const lineBreak = document.createElement('br'); // Create <br> element
//           messageContainer.appendChild(lineBreak); // Append the <br> to the container
//         }
//       });

//     }
//   }
// })




