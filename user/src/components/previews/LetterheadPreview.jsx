import { useSelector } from "react-redux";

export default function LetterheadPreview({ onSelectPhoto }) {
  const session = useSelector((state) => state.customizer.sessions.letterhead);

  const {
    letterheadDesign = "modern",
    letterheadSize = "A4",
    letterheadName = "Acme Corporation",
    letterheadAddress = "123 Innovation Way, Tech Park",
    letterheadImage = { url: null, zoom: 1.0, xOffset: 0, yOffset: 0, rotation: 0 },
  } = session;

  const getMaxWidth = () => {
    if (letterheadSize === "A5 Compact") return "260px";
    if (letterheadSize === "US Letter") return "340px";
    return "320px";
  };

  const accentColor =
    letterheadDesign === "corporate"
      ? "#b45309"
      : letterheadDesign === "sidebar"
      ? "#2563eb"
      : "#0f172a";

  return (
    <div className="w-full flex justify-center">
      <div
        className="w-full aspect-[1/1.414] bg-white shadow-xl flex flex-col justify-between text-left transition-all duration-500 ease-out"
        style={{
          maxWidth: getMaxWidth(),
          border: `1px solid #e2e8f0`,
          borderTop: `4px solid ${accentColor}`,
        }}
      >
        <div>
          <div
            className="flex items-start justify-between px-5 pt-4 pb-3"
            style={{ borderBottom: `1px solid ${accentColor}20` }}
          >
            <div className={letterheadDesign === "sidebar" ? "flex gap-3 items-start w-full" : ""}>
              {letterheadDesign === "sidebar" && (
                <div
                  className="flex-shrink-0 flex flex-col gap-1 pr-3"
                  style={{ borderRight: `2px solid ${accentColor}30` }}
                >
                  <div className="h-1.5 w-10 rounded-full bg-blue-200" />
                  <div className="h-1.5 w-8 rounded-full bg-slate-200" />
                  <div className="h-1.5 w-9 rounded-full bg-slate-200" />
                </div>
              )}
              <div className="flex-1">
                {letterheadDesign === "corporate" && (
                  <div className="text-[6px] text-amber-700 font-black uppercase tracking-widest mb-1 text-center">
                    Official Executive Document
                  </div>
                )}
                <h4
                  className="font-black leading-tight"
                  style={{ fontSize: "10px", color: accentColor }}
                >
                  {letterheadName}
                </h4>
                <p className="text-[7px] text-slate-400 mt-0.5 leading-normal">
                  {letterheadAddress}
                </p>
              </div>
            </div>

            <div
              className="relative flex-shrink-0 overflow-hidden flex items-center justify-center cursor-pointer ml-3"
              style={{ width: "36px", height: "36px", border: "1px solid #e2e8f0", borderRadius: "6px", background: "#f8fafc" }}
              onClick={onSelectPhoto}
            >
              {letterheadImage.url ? (
                <img
                  src={letterheadImage.url}
                  style={{
                    transform: `translate(${letterheadImage.xOffset}px, ${letterheadImage.yOffset}px) scale(${letterheadImage.zoom}) rotate(${letterheadImage.rotation}deg)`,
                    transformOrigin: "center",
                  }}
                  className="w-full h-full object-cover pointer-events-none"
                />
              ) : (
                <div className="text-[6px] text-slate-400 font-bold uppercase pointer-events-none text-center leading-tight">
                  Logo
                </div>
              )}
            </div>
          </div>

          <div className="px-5 pt-4 space-y-2">
            <div className="h-2 w-1/2 rounded-full" style={{ background: `${accentColor}20` }} />
            <div className="h-1.5 w-full rounded-full bg-slate-100" />
            <div className="h-1.5 w-full rounded-full bg-slate-100" />
            <div className="h-1.5 w-5/6 rounded-full bg-slate-100" />
            <div className="h-1.5 w-full rounded-full bg-slate-100" />
            <div className="h-1.5 w-4/5 rounded-full bg-slate-100" />
            <div className="mt-3 h-1.5 w-full rounded-full bg-slate-50" />
            <div className="h-1.5 w-full rounded-full bg-slate-50" />
            <div className="h-1.5 w-3/4 rounded-full bg-slate-50" />
          </div>
        </div>

        <div
          className="px-5 py-2 flex items-center justify-between"
          style={{ borderTop: `1px solid ${accentColor}20` }}
        >
          <div className="h-1 w-12 rounded-full" style={{ background: `${accentColor}30` }} />
          <span className="text-[5px] text-slate-400 font-bold uppercase tracking-widest">
            Confidential
          </span>
          <div className="h-1 w-12 rounded-full" style={{ background: `${accentColor}30` }} />
        </div>
      </div>
    </div>
  );
}
