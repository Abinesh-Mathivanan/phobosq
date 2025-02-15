import React, { useEffect, useState } from "react";

const ChatGPTMultiLineAnimation: React.FC = () => {
  const userPrompt =
    "Analyse the product sales from our inventory since last year and derive insights";

  const systemResponse =
    "Product X increased sales by 25% mid-year due to seasonal promotions and is projected to reach 30% growth by Q4. Product A grew by 5%, while Product B remained stable.";

  const [typedUser, setTypedUser] = useState("");
  const [typedSystem, setTypedSystem] = useState("");
  const [showChart, setShowChart] = useState(false);
  const [promptComplete, setPromptComplete] = useState(false);
  const [containerStyle, setContainerStyle] = useState({ width: "800px", height: "430px" });

  useEffect(() => {
    let userIndex = 0;
    const userInterval = setInterval(() => {
      setTypedUser(userPrompt.slice(0, userIndex + 1));
      userIndex++;
      if (userIndex === userPrompt.length) {
        clearInterval(userInterval);
        setPromptComplete(true);
        setTimeout(() => {
          let systemIndex = 0;
          const systemInterval = setInterval(() => {
            setTypedSystem(systemResponse.slice(0, systemIndex + 1));
            systemIndex++;
            if (systemIndex === systemResponse.length) {
              clearInterval(systemInterval);
              setTimeout(() => setShowChart(true), 1500);
            }
          }, 40);
        }, 600);
      }
    }, 40);

    return () => clearInterval(userInterval);
  }, []);

  useEffect(() => {
    const updateContainerStyle = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setContainerStyle({ width: "800px", height: "600px" });
      } else if (width < 1024) {
        setContainerStyle({ width: "800px", height: "500px" });
      } else {
        setContainerStyle({ width: "800px", height: "430px" });
      }
    };

    updateContainerStyle();
    window.addEventListener("resize", updateContainerStyle);
    return () => window.removeEventListener("resize", updateContainerStyle);
  }, []);

  return (
    <>
      <style>{`
        .animation-container {
          border: 2px solid #ccc;
          border-radius: 8px;
          padding: 1rem;
          background: transparent;
          font-family: sans-serif;
          margin: 0 auto;
        }
        .bubble-wrapper {
          display: flex;
          margin-bottom: 1rem;
        }
        .user-bubble, .system-bubble {
          max-width: 80%;
          border-radius: 6px;
          padding: 0.75rem;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.3);
        }
        .user-bubble {
          align-self: flex-start;
        }
        .system-bubble {
          align-self: flex-end;
          margin-left: auto;
        }
        .chart-container {
          margin-top: 1rem;
          width: 100%;
          height: 310px;
          background: transparent;
          border-radius: 6px;
          padding: 0.5rem;
          color: #000;
        }
        .chart-line {
          stroke-dasharray: 300;
          stroke-dashoffset: 300;
          animation: drawLine 2s ease forwards;
        }
        @keyframes drawLine {
          to { stroke-dashoffset: 0; }
        }
        .axis-label {
          fill: #666;
          font-size: 10px;
        }
        .legend {
          font-size: 10px;
          fill: #333;
        }
      `}</style>

      <div className="animation-container" style={containerStyle}>
        <div className="bubble-wrapper">
          <div className="user-bubble">
            {typedUser || <span style={{ opacity: 0.5 }}>Typing...</span>}
          </div>
        </div>
        <div className="bubble-wrapper" style={{ justifyContent: "flex-end" }}>
          <div className="system-bubble">
            {typedSystem || (promptComplete ? <span style={{ opacity: 0.5 }}>Thinking...</span> : null)}
            {showChart && (
              <div className="chart-container">
                <svg width="100%" height="100%" viewBox="0 0 300 250">
                  {[0, 25, 50, 75, 100].map((val, i) => {
                    const yPos = 150 - (val * 130) / 100;
                    return (
                      <line
                        key={`h-${i}`}
                        x1="30"
                        y1={yPos}
                        x2="280"
                        y2={yPos}
                        stroke="#eee"
                        strokeWidth="0.5"
                      />
                    );
                  })}
                  {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m, i) => {
                    const xPos = 30 + i * 50;
                    return (
                      <line
                        key={`v-${i}`}
                        x1={xPos}
                        y1="20"
                        x2={xPos}
                        y2="150"
                        stroke="#eee"
                        strokeWidth="0.5"
                      />
                    );
                  })}
                  <line x1="30" y1="150" x2="280" y2="150" stroke="#ccc" strokeWidth="1" />
                  <line x1="30" y1="150" x2="30" y2="20" stroke="#ccc" strokeWidth="2" />
                  {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m, i) => {
                    const xPos = 30 + i * 50;
                    return (
                      <text key={`x-${i}`} x={xPos} y="165" className="axis-label" textAnchor="middle">
                        {m}
                      </text>
                    );
                  })}
                  {[0, 25, 50, 75, 100].map((val, i) => {
                    const yPos = 150 - (val * 130) / 100;
                    return (
                      <text key={`y-${i}`} x="20" y={yPos + 3} className="axis-label" textAnchor="end">
                        {val}
                      </text>
                    );
                  })}
                  <path
                    d="M30 120 L80 95 L130 80 L180 65 L230 60 L280 50"
                    stroke="#F87171"
                    strokeWidth="2.5"
                    fill="none"
                    className="chart-line"
                  />
                  <path
                    d="M30 130 L80 115 L130 105 L180 90 L230 85 L280 70"
                    stroke="#34D399"
                    strokeWidth="2.5"
                    fill="none"
                    className="chart-line"
                  />
                  <path
                    d="M30 110 L80 100 L130 90 L180 75 L230 70 L280 55"
                    stroke="#60A5FA"
                    strokeWidth="2.5"
                    fill="none"
                    className="chart-line"
                  />
                  <rect x="35" y="5" width="10" height="10" fill="#F87171" />
                  <text x="50" y="14" className="legend">Product A</text>
                  <rect x="120" y="5" width="10" height="10" fill="#34D399" />
                  <text x="135" y="14" className="legend">Product B</text>
                  <rect x="205" y="5" width="10" height="10" fill="#60A5FA" />
                  <text x="220" y="14" className="legend">Product X</text>
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatGPTMultiLineAnimation;
