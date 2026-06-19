import { useSelector, useDispatch } from "react-redux";
import { updateSession, resetSession } from "../../store/customizerSlice";
import { FaShapes, FaRulerCombined, FaUpload } from "react-icons/fa";

const LETTERHEAD_DESIGNS = [
  { id: "modern", label: "Modern Minimal" },
  { id: "corporate", label: "Classic Corp" },
  { id: "sidebar", label: "Sidebar Info" }
];

export default function LetterheadSidebar({ onSelectPhoto, onClearPhoto }) {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.customizer.sessions.letterhead);

  const {
    letterheadDesign,
    letterheadSize,
    letterheadName,
    letterheadAddress,
    letterheadImage,
  } = session;

  const updateFields = (fields) => {
    dispatch(updateSession({ productId: "letterhead", fields }));
  };

  const handleLetterheadImageUpdate = (fields) => {
    updateFields({
      letterheadImage: { ...letterheadImage, ...fields }
    });
  };

  return (
    <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/60 shadow-md p-5 flex flex-col gap-4 h-full">
      <div>
        <h2 className="font-heading font-black text-xl text-slate-900 leading-tight">
          Letterhead Designer
        </h2>
        <p className="text-[11px] text-slate-500 mt-0.5">Customize your executive personalized gear in real-time.</p>
      </div>

      <hr className="border-slate-100" />

      <div className="space-y-1.5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <FaShapes className="text-slate-500" />
          <span>Select Design Template</span>
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {LETTERHEAD_DESIGNS.map((des) => (
            <button
              key={des.id}
              type="button"
              onClick={() => updateFields({ letterheadDesign: des.id })}
              className={`py-1.5 px-2 border rounded-lg text-xs font-bold text-center transition-all cursor-pointer truncate ${
                letterheadDesign === des.id ? "border-blue-600 bg-blue-50/20 text-blue-700" : "border-slate-200 bg-white"
              }`}
            >
              {des.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <FaRulerCombined className="text-slate-500" />
          <span>Adjust Size Dimensions</span>
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {["A4", "US Letter", "A5 Compact"].map((sz) => (
            <button
              key={sz}
              type="button"
              onClick={() => updateFields({ letterheadSize: sz })}
              className={`py-1.5 px-2 border rounded-lg text-xs font-bold text-center transition-all cursor-pointer ${
                letterheadSize === sz ? "border-blue-600 bg-blue-50/20 text-blue-700" : "border-slate-200 bg-white"
              }`}
            >
              {sz}
            </button>
          ))}
        </div>
      </div>

      <hr className="border-slate-100" />

      <div className="space-y-3">
        <div className="space-y-1.5">
          <span className="text-xs font-bold text-slate-400 block uppercase">Letterhead Custom Logo</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onSelectPhoto}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded-lg text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <FaUpload />
              <span>Upload Logo Graphic</span>
            </button>
            {letterheadImage.url && (
              <button
                type="button"
                onClick={onClearPhoto}
                className="bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 font-bold py-2 px-3 rounded-lg text-xs transition-colors cursor-pointer"
              >
                Remove
              </button>
            )}
          </div>
        </div>

        {letterheadImage.url && (
          <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-200/50 space-y-2.5 text-xs">
            <div>
              <div className="flex justify-between font-bold text-slate-500 mb-0.5">
                <span>Logo Zoom</span>
                <span>{letterheadImage.zoom.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="5.0"
                step="0.1"
                value={letterheadImage.zoom}
                onChange={(e) => handleLetterheadImageUpdate({ zoom: parseFloat(e.target.value) })}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex justify-between font-bold text-slate-500 mb-0.5">
                <span>Horizontal Shift</span>
                <span>{letterheadImage.xOffset}px</span>
              </div>
              <input
                type="range"
                min="-50"
                max="50"
                value={letterheadImage.xOffset}
                onChange={(e) => handleLetterheadImageUpdate({ xOffset: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex justify-between font-bold text-slate-500 mb-0.5">
                <span>Vertical Shift</span>
                <span>{letterheadImage.yOffset}px</span>
              </div>
              <input
                type="range"
                min="-50"
                max="50"
                value={letterheadImage.yOffset}
                onChange={(e) => handleLetterheadImageUpdate({ yOffset: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex justify-between font-bold text-slate-500 mb-0.5">
                <span>Rotation</span>
                <span>{letterheadImage.rotation}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                value={letterheadImage.rotation}
                onChange={(e) => handleLetterheadImageUpdate({ rotation: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>
        )}

        <div className="space-y-1.5">
          <span className="text-xs font-bold text-slate-400 block uppercase">Company Business Name</span>
          <input
            type="text"
            value={letterheadName}
            onChange={(e) => updateFields({ letterheadName: e.target.value })}
            placeholder="Type name"
            className="w-full text-xs font-semibold border border-slate-200 rounded-lg p-2 outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <span className="text-xs font-bold text-slate-400 block uppercase">Contact Details</span>
          <input
            type="text"
            value={letterheadAddress}
            onChange={(e) => updateFields({ letterheadAddress: e.target.value })}
            placeholder="Type address & phone"
            className="w-full text-xs font-semibold border border-slate-200 rounded-lg p-2 outline-none"
          />
        </div>
      </div>

      <div className="pt-1">
        <button
          type="button"
          onClick={() => dispatch(resetSession({ productId: "letterhead" }))}
          className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-2.5 px-4 rounded-xl text-xs transition-all cursor-pointer border border-slate-200/60"
        >
          Reset All Settings
        </button>
      </div>

      <div className="mt-auto pt-2">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Live Card Preview</p>
        <div
          className="w-full rounded-xl overflow-hidden shadow-sm"
          style={{ border: "1px solid #e2e8f0", borderTop: `3px solid ${letterheadDesign === "corporate" ? "#b45309" : letterheadDesign === "sidebar" ? "#2563eb" : "#0f172a"}` }}
        >
          <div className="bg-white px-4 py-3 flex items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black text-slate-800 leading-tight truncate">{letterheadName || "Company Name"}</p>
              <p className="text-[10px] text-slate-400 mt-0.5 leading-normal truncate">{letterheadAddress || "Address & Contact"}</p>
            </div>
            {letterheadImage.url ? (
              <img src={letterheadImage.url} className="w-8 h-8 object-cover rounded border border-slate-200 flex-shrink-0" />
            ) : (
              <div className="w-8 h-8 rounded border border-dashed border-slate-300 bg-slate-50 flex items-center justify-center flex-shrink-0">
                <span className="text-[7px] text-slate-400 font-bold">LOGO</span>
              </div>
            )}
          </div>
          <div className="bg-slate-50 px-4 py-1.5">
            <div className="flex gap-1.5">
              <div className="h-1 flex-1 rounded-full bg-slate-200" />
              <div className="h-1 flex-1 rounded-full bg-slate-100" />
              <div className="h-1 w-8 rounded-full bg-slate-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

