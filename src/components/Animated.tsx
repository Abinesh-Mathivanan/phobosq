import React, { useState, useRef, useEffect } from "react";
import {
  SiGooglesheets,
  SiRedis,
  SiGrafana,
  SiAmazon,
  SiApachekafka,
  SiTableau,
  SiPowers,
  SiGoogleanalytics,
  SiKibana,
} from "react-icons/si";

const nodes = [
  {
    id: 1,
    label: "Public Data\nGoogle Sheets",
    x: 40,
    y: 50,
    icons: [<SiGooglesheets size={24} color="#34A853" />],
  },
  {
    id: 2,
    label: "Unstructured Data\nRedis, Kafka",
    x: 40,
    y: 150,
    icons: [<SiRedis size={24} color="#DC382D" />],
  },
  {
    id: 3,
    label: "System Data\nAWS, SQL Server",
    x: 40,
    y: 250,
    icons: [<SiAmazon size={24} color="#FF9900" />],
  },
  { id: "center", label: "SIRUS\nIntegrated with Q-Engine", x: 240, y: 150, icons: [] },
  {
    id: 4,
    label: "Predictive Analytics\nGrafana",
    x: 440,
    y: 25,
    icons: [<SiGrafana size={24} color="#F46800" />],
  },
  {
    id: 5,
    label: "Strategy Engine\nTableau",
    x: 440,
    y: 125,
    icons: [<SiTableau size={24} color="#E2231A" />],
  },
  {
    id: 6,
    label: "Smart Dashboards\nPower BI, Kibana",
    x: 440,
    y: 225,
    icons: [<SiKibana size={24} color="#00BFB3" />],
  },
  {
    id: 7,
    label: "AI Assistant\nGoogle Analytics",
    x: 440,
    y: 325,
    icons: [<SiGoogleanalytics size={24} color="#E37400" />],
  },
];

const connections = [
  { from: 1, to: "center" },
  { from: 2, to: "center" },
  { from: 3, to: "center" },
  { from: "center", to: 4 },
  { from: "center", to: 5 },
  { from: "center", to: 6 },
  { from: "center", to: 7 },
];

function getPath(fromNode: typeof nodes[number], toNode: typeof nodes[number]) {
  const nodeWidth = 176;
  const nodeHeight = 60;
  const x1 = fromNode.x + nodeWidth;
  const y1 = fromNode.y + nodeHeight / 2;
  const x2 = toNode.x;
  const y2 = toNode.y + nodeHeight / 2;
  const controlPointOffset = 20;
  return `M ${x1} ${y1} C ${x1 + controlPointOffset} ${y1}, ${x2 - controlPointOffset} ${y2}, ${x2} ${y2}`;
}

const SirusFlowchart: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const baseWidth = 500;
  const baseHeight = 400;

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        let newScale = containerWidth / baseWidth;
        if (containerWidth >= 769 && newScale < 1.8) {
          newScale = 1.8;
        }
        setScale(newScale);
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [baseWidth]);

  return (
    <div ref={containerRef} className="w-full" style={{ height: baseHeight * scale }}>
      <div
        className="relative bg-white rounded-lg transition-transform duration-500 ease-in-out"
        style={{
          width: baseWidth,
          height: baseHeight,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {connections.map((conn, idx) => {
            const fromNode = nodes.find((n) => n.id === conn.from);
            const toNode = nodes.find((n) => n.id === conn.to);
            if (!fromNode || !toNode) return null;
            return (
              <g key={`conn-${idx}`}>
                <path d={getPath(fromNode, toNode)} stroke="#ccc" strokeWidth="3" fill="none" />
                <path
                  d={getPath(fromNode, toNode)}
                  stroke="#007BFF"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="6,6"
                  style={{ animation: "flowDash 2s linear infinite" }}
                />
              </g>
            );
          })}
        </svg>

        {nodes.map((node) => (
          <div
            key={node.id}
            style={{ left: node.x, top: node.y, position: "absolute" }}
            className="w-44 min-h-[60px] px-4 py-3 bg-white text-gray-800 border-2 rounded-lg cursor-pointer transition-all duration-200 flex flex-col items-center justify-center border-gray-300"
          >
            <div className="flex justify-center space-x-2 mb-1">{node.icons}</div>
            <div className="text-center">
              {node.label.split("\n").map((line, i) => (
                <div key={i} className="text-sm leading-tight">
                  {line}
                </div>
              ))}
            </div>
          </div>
        ))}

        <style>{`
          @keyframes flowDash {
            to {
              stroke-dashoffset: -24;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default SirusFlowchart;
