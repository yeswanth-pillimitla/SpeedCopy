import { useSelector } from "react-redux";

export default function PenPreview() {
  const session = useSelector((state) => state.customizer.sessions.pen);

  const {
    penDesign = "classic",
    penSize = "Standard",
    penColor = "#1e293b",
    penTrim = "#d4af37",
    penText = "Alex Mercer",
    penTextColor = "#ffffff",
    penImage = { url: null, zoom: 1.0, xOffset: 0, yOffset: 0, rotation: 0 },
  } = session;

  const getPenScale = () => {
    if (penSize === "Slimline") return "scale-y-75 scale-x-90";
    if (penSize === "Chunky Corporate") return "scale-y-110 scale-x-100";
    return "scale-95";
  };

  return (
    <div className="w-full flex justify-center">
      <div className={`w-full max-w-[320px] transition-transform duration-500 ease-out transform rotate-12 ${getPenScale()}`}>
        <svg viewBox="0 0 400 400" className="w-full">
          <defs>
            <clipPath id="pen-clip">
              <rect x="110" y="180" width="120" height="30" />
            </clipPath>
          </defs>

          {penDesign === "classic" && (
            <g>
              <rect x="60" y="185" width="260" height="20" rx="3" fill={penColor} />
              <polygon points="320,185 350,195 320,205" fill="#cbd5e1" />
              <path d="M 80,185 L 120,185 L 120,205 L 80,205 Z" fill={penTrim} />
              <path d="M 270,185 L 280,185 L 280,205 L 270,205 Z" fill={penTrim} />
              <rect x="70" y="178" width="50" height="4" rx="1" fill={penTrim} />
            </g>
          )}

          {penDesign === "executive" && (
            <g>
              <rect x="50" y="188" width="280" height="14" rx="2" fill={penColor} />
              <polygon points="330,188 360,195 330,202" fill="#94a3b8" />
              <line x1="190" y1="188" x2="190" y2="202" stroke={penTrim} strokeWidth="3" />
              <path d="M 70,188 L 100,188 L 100,202 L 70,202 Z" fill={penTrim} />
              <rect x="65" y="182" width="40" height="3" rx="1" fill={penTrim} />
            </g>
          )}

          {penDesign === "fountain" && (
            <g>
              <rect x="70" y="180" width="130" height="30" rx="4" fill={penColor} />
              <rect x="200" y="183" width="100" height="24" fill={penColor} opacity="0.9" />
              <polygon points="300,183 330,195 300,207" fill="#cbd5e1" stroke={penTrim} strokeWidth="1" />
              <rect x="200" y="180" width="10" height="30" fill={penTrim} />
              <path d="M 90,180 L 100,180 L 100,210 L 90,210 Z" fill={penTrim} />
              <rect x="80" y="172" width="60" height="5" rx="2" fill={penTrim} />
            </g>
          )}

          <g clipPath="url(#pen-clip)">
            {penImage.url && (
              <image
                href={penImage.url}
                x={110 - (120 * (penImage.zoom - 1)) / 2}
                y={180 - (30 * (penImage.zoom - 1)) / 2}
                width={120 * penImage.zoom}
                height={30 * penImage.zoom}
                transform={`translate(${penImage.xOffset}, ${penImage.yOffset}) rotate(${penImage.rotation} 170 195)`}
                preserveAspectRatio="xMidYMid slice"
              />
            )}
          </g>

          {penText && (
            <text x="170" y="198" textAnchor="middle" fill={penTextColor} className="font-serif italic font-bold text-[9px] drop-shadow-[0_0.5px_1px_rgba(0,0,0,0.5)]">
              {penText}
            </text>
          )}
        </svg>
      </div>
    </div>
  );
}
