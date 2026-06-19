import { useSelector } from "react-redux";

export default function PlatePreview() {
  const session = useSelector((state) => state.customizer.sessions.plate);

  const {
    plateDesign = "rectangle",
    plateSize = '12" x 6"',
    plateMounts = "#d4af37",
    plateTitle = "Dr. Olivia Bennett",
    plateSubtitle = "Chief Medical Officer",
    plateTitleColor = "#1e293b",
    plateSubtitleColor = "#64748b",
  } = session;

  const getPlateScale = () => {
    if (plateSize === '12" x 6"') return "scale-90";
    if (plateSize === '20" x 10"') return "scale-110";
    return "scale-100";
  };

  return (
    <div className="w-full flex justify-center">
      <div className={`w-full max-w-[320px] transition-transform duration-500 ease-out transform ${getPlateScale()}`}>
        <svg viewBox="0 0 400 400" className="w-full">
          {plateDesign === "rectangle" && (
            <rect x="30" y="120" width="340" height="160" rx="8" fill="#f8fafc" fillOpacity="0.8" stroke="#cbd5e1" strokeWidth="4" />
          )}

          {plateDesign === "oval" && (
            <ellipse cx="200" cy="200" rx="170" ry="80" fill="#f8fafc" fillOpacity="0.8" stroke="#cbd5e1" strokeWidth="4" />
          )}

          {plateDesign === "bevel" && (
            <path d="M 50,120 L 350,120 L 370,160 L 370,240 L 350,280 L 50,280 L 30,240 L 30,160 Z" fill="#f8fafc" fillOpacity="0.8" stroke="#cbd5e1" strokeWidth="4" />
          )}

          <circle cx="50" cy="140" r="10" fill={plateMounts} stroke="#cbd5e1" strokeWidth="2" />
          <circle cx="350" cy="140" r="10" fill={plateMounts} stroke="#cbd5e1" strokeWidth="2" />
          <circle cx="50" cy="260" r="10" fill={plateMounts} stroke="#cbd5e1" strokeWidth="2" />
          <circle cx="350" cy="260" r="10" fill={plateMounts} stroke="#cbd5e1" strokeWidth="2" />

          {plateTitle && (
            <text x="200" y="185" textAnchor="middle" fill={plateTitleColor} className="font-heading font-bold text-lg">
              {plateTitle}
            </text>
          )}
          {plateSubtitle && (
            <text x="200" y="220" textAnchor="middle" fill={plateSubtitleColor} className="font-sans text-xs font-semibold uppercase tracking-wider">
              {plateSubtitle}
            </text>
          )}
        </svg>
      </div>
    </div>
  );
}
