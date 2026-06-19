import { useSelector, useDispatch } from "react-redux";
import { updateSession, resetSession } from "../../store/customizerSlice";
import { FaShapes, FaRulerCombined, FaUpload } from "react-icons/fa";

const PEN_DESIGNS = [
  { id: "classic", label: "Ballpoint" },
  { id: "executive", label: "Slim Exec" },
  { id: "fountain", label: "Fountain Pen" }
];

export default function PenSidebar({ onSelectPhoto, onClearPhoto }) {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.customizer.sessions.pen);

  const {
    penDesign,
    penSize,
    penColor,
    penTrim,
    penText,
    penTextColor,
    penImage,
  } = session;

  const updateFields = (fields) => {
    dispatch(updateSession({ productId: "pen", fields }));
  };

  const handlePenImageUpdate = (fields) => {
    updateFields({
      penImage: { ...penImage, ...fields }
    });
  };

  return (
    <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/60 shadow-md p-5 flex flex-col gap-4 h-full">
      <div>
        <h2 className="font-heading font-black text-xl text-slate-900 leading-tight">
          Engraved Pen Studio
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
          {PEN_DESIGNS.map((des) => (
            <button
              key={des.id}
              type="button"
              onClick={() => updateFields({ penDesign: des.id })}
              className={`py-1.5 px-2 border rounded-lg text-xs font-bold text-center transition-all cursor-pointer truncate ${
                penDesign === des.id ? "border-blue-600 bg-blue-50/20 text-blue-700" : "border-slate-200 bg-white"
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
          {["Standard", "Slimline", "Chunky Corporate"].map((sz) => (
            <button
              key={sz}
              type="button"
              onClick={() => updateFields({ penSize: sz })}
              className={`py-1.5 px-2 border rounded-lg text-xs font-bold text-center transition-all cursor-pointer ${
                penSize === sz ? "border-blue-600 bg-blue-50/20 text-blue-700" : "border-slate-200 bg-white"
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
          <span className="text-xs font-bold text-slate-400 block uppercase">Pen Barrel Colors</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div>
              <span className="block font-bold text-slate-500 mb-1">Base Color</span>
              <div className="flex gap-1.5 items-center">
                <input
                  type="color"
                  value={penColor}
                  onChange={(e) => updateFields({ penColor: e.target.value })}
                  className="w-8 h-8 rounded border border-slate-200 cursor-pointer"
                />
                <div className="flex gap-1">
                  {["#1e293b", "#b22222", "#065f46"].map((col) => (
                    <button
                      key={col}
                      type="button"
                      onClick={() => updateFields({ penColor: col })}
                      style={{ backgroundColor: col }}
                      className="w-5 h-5 rounded-full border border-slate-200 cursor-pointer"
                    />
                  ))}
                </div>
              </div>
            </div>

            <div>
              <span className="block font-bold text-slate-500 mb-1">Metallic Trim Accent</span>
              <div className="flex gap-1.5 items-center">
                <input
                  type="color"
                  value={penTrim}
                  onChange={(e) => updateFields({ penTrim: e.target.value })}
                  className="w-8 h-8 rounded border border-slate-200 cursor-pointer"
                />
                <div className="flex gap-1">
                  {["#d4af37", "#c0c0c0", "#1e293b"].map((col) => (
                    <button
                      key={col}
                      type="button"
                      onClick={() => updateFields({ penTrim: col })}
                      style={{ backgroundColor: col }}
                      className="w-5 h-5 rounded-full border border-slate-200 cursor-pointer"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <span className="text-xs font-bold text-slate-400 block uppercase">Pen Custom Logo Graphic</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onSelectPhoto}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded-lg text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <FaUpload />
              <span>Upload Logo Graphic</span>
            </button>
            {penImage.url && (
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

        {penImage.url && (
          <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-200/50 space-y-2.5 text-xs">
            <div>
              <div className="flex justify-between font-bold text-slate-500 mb-0.5">
                <span>Logo Zoom</span>
                <span>{penImage.zoom.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="5.0"
                step="0.1"
                value={penImage.zoom}
                onChange={(e) => handlePenImageUpdate({ zoom: parseFloat(e.target.value) })}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex justify-between font-bold text-slate-500 mb-0.5">
                <span>Horizontal Shift</span>
                <span>{penImage.xOffset}px</span>
              </div>
              <input
                type="range"
                min="-100"
                max="100"
                value={penImage.xOffset}
                onChange={(e) => handlePenImageUpdate({ xOffset: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex justify-between font-bold text-slate-500 mb-0.5">
                <span>Vertical Shift</span>
                <span>{penImage.yOffset}px</span>
              </div>
              <input
                type="range"
                min="-100"
                max="100"
                value={penImage.yOffset}
                onChange={(e) => handlePenImageUpdate({ yOffset: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex justify-between font-bold text-slate-500 mb-0.5">
                <span>Rotation</span>
                <span>{penImage.rotation}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                value={penImage.rotation}
                onChange={(e) => handlePenImageUpdate({ rotation: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>
        )}

        <div className="space-y-1.5">
          <span className="text-xs font-bold text-slate-400 block uppercase">Engraving Text Settings</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <input
              type="text"
              value={penText}
              onChange={(e) => updateFields({ penText: e.target.value })}
              maxLength={20}
              placeholder="Type engraving name"
              className="text-xs font-semibold border border-slate-200 rounded-lg p-2 outline-none w-full"
            />
            <div className="flex gap-1.5 items-center justify-end">
              <span className="text-[10px] font-bold text-slate-400">Color:</span>
              <input
                type="color"
                value={penTextColor}
                onChange={(e) => updateFields({ penTextColor: e.target.value })}
                className="w-8 h-8 rounded border border-slate-200 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-1">
        <button
          type="button"
          onClick={() => dispatch(resetSession({ productId: "pen" }))}
          className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-2.5 px-4 rounded-xl text-xs transition-all cursor-pointer border border-slate-200/60"
        >
          Reset All Settings
        </button>
      </div>
    </div>
  );
}

