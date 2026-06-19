import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateSession, resetSession } from "../../store/customizerSlice";
import { FaShapes, FaRulerCombined } from "react-icons/fa";

const MUG_DESIGNS = [
  { id: "standard", label: "Classic White" },
  { id: "inner-pink", label: "Inner Pink & Handle" },
  { id: "black-mug", label: "Ebony Black Mug" },
  { id: "anniversary", label: "Anniversary Memoir" },
  { id: "heart-dual", label: "Dual Heart Collage" },
  { id: "birthday", label: "Birthday Emblem" },
  { id: "floral", label: "Pink Floral Border" },
  { id: "balance", label: "Bicycle Balance" },
  { id: "yellow-smile", label: "Sunny Yellow Smile" },
  { id: "quote-block", label: "Classic Quote Block" },
  { id: "valentine", label: "Valentine Splash" }
];

export default function MugSidebar() {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.customizer.sessions.mug);
  const [showAllMugDesigns, setShowAllMugDesigns] = useState(false);

  const {
    mugDesign,
    mugColor,
    mugInnerColor,
    mugHandleColor,
    mugTextColor,
    mugSize,
    mugText,
    activeMugSlot = 0,
  } = session;

  const updateFields = (fields) => {
    dispatch(updateSession({ productId: "mug", fields }));
  };

  const handleMugDesignChange = (designId) => {
    let fields = { mugDesign: designId };
    if (designId === "black-mug") {
      fields.mugText = "Happy Birthday My Friend";
      fields.mugColor = "#1e293b";
      fields.mugInnerColor = "#1e293b";
      fields.mugHandleColor = "#1e293b";
      fields.mugTextColor = "#ffffff";
    } else if (designId === "inner-pink") {
      fields.mugText = "Upload Your Photo";
      fields.mugColor = "#ffffff";
      fields.mugInnerColor = "#f472b6";
      fields.mugHandleColor = "#f472b6";
      fields.mugTextColor = "#1e293b";
    } else {
      fields.mugColor = "#ffffff";
      fields.mugInnerColor = "#ffffff";
      fields.mugHandleColor = "#ffffff";
      fields.mugTextColor = "#1e293b";
      if (designId === "anniversary") {
        fields.mugText = "4th Wedding Anniversary";
      } else if (designId === "birthday") {
        fields.mugText = "Happy Birthday Daddy";
      } else if (designId === "balance") {
        fields.mugText = "LIFE is all about BALANCE";
      } else if (designId === "yellow-smile") {
        fields.mugText = "DON'T FORGET TO SMILE";
      } else if (designId === "quote-block") {
        fields.mugText = "Today's best builds tomorrow";
      } else if (designId === "valentine") {
        fields.mugText = "Valentine Day";
      } else {
        fields.mugText = "Upload Your Photo";
      }
    }
    updateFields(fields);
  };

  return (
    <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/60 shadow-md p-5 flex flex-col gap-4 h-full">
      <div>
        <h2 className="font-heading font-black text-xl text-slate-900 leading-tight">
          Custom Mug Studio
        </h2>
        <p className="text-[11px] text-slate-500 mt-0.5">Customize your executive personalized gear in real-time.</p>
      </div>

      <hr className="border-slate-100" />

      <div className="space-y-1.5">
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <FaShapes className="text-slate-500" />
            <span>Select Design Template</span>
          </h3>
          <button
            type="button"
            onClick={() => setShowAllMugDesigns(!showAllMugDesigns)}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
          >
            {showAllMugDesigns ? "Show less" : "View all"}
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {(showAllMugDesigns ? MUG_DESIGNS : MUG_DESIGNS.slice(0, 3)).map((des) => (
            <button
              key={des.id}
              type="button"
              onClick={() => handleMugDesignChange(des.id)}
              className={`py-1.5 px-2 border rounded-lg text-xs font-bold text-center transition-all cursor-pointer truncate ${
                mugDesign === des.id ? "border-blue-600 bg-blue-50/20 text-blue-700" : "border-slate-200 bg-white"
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
          {["11 Oz", "15 Oz"].map((sz) => (
            <button
              key={sz}
              type="button"
              onClick={() => updateFields({ mugSize: sz })}
              className={`py-1.5 px-2 border rounded-lg text-xs font-bold text-center transition-all cursor-pointer ${
                mugSize === sz ? "border-blue-600 bg-blue-50/20 text-blue-700" : "border-slate-200 bg-white"
              }`}
            >
              {sz}
            </button>
          ))}
        </div>
      </div>

      <hr className="border-slate-100" />

      <div className="space-y-3">
        {mugDesign === "heart-dual" && (
          <div className="space-y-1.5 pb-1">
            <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Select Active Photo Slot</span>
            <div className="grid grid-cols-2 gap-2">
              {[0, 1].map((idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => updateFields({ activeMugSlot: idx })}
                  className={`py-1.5 px-2 border rounded-lg text-xs font-bold text-center transition-all cursor-pointer ${
                    activeMugSlot === idx ? "border-blue-600 bg-blue-50/20 text-blue-700" : "border-slate-200 bg-white"
                  }`}
                >
                  Heart {idx + 1}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-1.5">
          <span className="text-xs font-bold text-slate-400 block uppercase">Custom Printed Text</span>
          <input
            type="text"
            value={mugText}
            onChange={(e) => updateFields({ mugText: e.target.value })}
            placeholder="Type mug text"
            className="w-full text-xs font-semibold border border-slate-200 rounded-lg p-2 outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <span className="text-xs font-bold text-slate-400 block uppercase">Mug Colors</span>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
            <div>
              <span className="block font-bold text-slate-500 mb-1">Base Color</span>
              <div className="flex gap-1.5 items-center">
                <input
                  type="color"
                  value={mugColor}
                  onChange={(e) => updateFields({ mugColor: e.target.value })}
                  className="w-8 h-8 rounded border border-slate-200 cursor-pointer"
                />
                <div className="flex gap-1">
                  {["#ffffff", "#1e293b", "#b22222"].map((col) => (
                    <button
                      key={col}
                      type="button"
                      onClick={() => updateFields({ mugColor: col })}
                      style={{ backgroundColor: col }}
                      className="w-5 h-5 rounded-full border border-slate-200 cursor-pointer"
                    />
                  ))}
                </div>
              </div>
            </div>

            <div>
              <span className="block font-bold text-slate-500 mb-1">Inner Color</span>
              <div className="flex gap-1.5 items-center">
                <input
                  type="color"
                  value={mugInnerColor}
                  onChange={(e) => updateFields({ mugInnerColor: e.target.value })}
                  className="w-8 h-8 rounded border border-slate-200 cursor-pointer"
                />
                <div className="flex gap-1">
                  {["#ffffff", "#f472b6", "#f1f5f9"].map((col) => (
                    <button
                      key={col}
                      type="button"
                      onClick={() => updateFields({ mugInnerColor: col })}
                      style={{ backgroundColor: col }}
                      className="w-5 h-5 rounded-full border border-slate-200 cursor-pointer"
                    />
                  ))}
                </div>
              </div>
            </div>

            <div>
              <span className="block font-bold text-slate-500 mb-1">Handle Color</span>
              <div className="flex gap-1.5 items-center">
                <input
                  type="color"
                  value={mugHandleColor}
                  onChange={(e) => updateFields({ mugHandleColor: e.target.value })}
                  className="w-8 h-8 rounded border border-slate-200 cursor-pointer"
                />
                <div className="flex gap-1">
                  {["#ffffff", "#cbd5e1", "#f472b6"].map((col) => (
                    <button
                      key={col}
                      type="button"
                      onClick={() => updateFields({ mugHandleColor: col })}
                      style={{ backgroundColor: col }}
                      className="w-5 h-5 rounded-full border border-slate-200 cursor-pointer"
                    />
                  ))}
                </div>
              </div>
            </div>

            <div>
              <span className="block font-bold text-slate-500 mb-1">Text Color</span>
              <div className="flex gap-1.5 items-center">
                <input
                  type="color"
                  value={mugTextColor}
                  onChange={(e) => updateFields({ mugTextColor: e.target.value })}
                  className="w-8 h-8 rounded border border-slate-200 cursor-pointer"
                />
                <div className="flex gap-1">
                  {["#1e293b", "#ffffff", "#b22222", "#d4af37"].map((col) => (
                    <button
                      key={col}
                      type="button"
                      onClick={() => updateFields({ mugTextColor: col })}
                      style={{ backgroundColor: col }}
                      className="w-5 h-5 rounded-full border border-slate-200 cursor-pointer"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-1">
        <button
          type="button"
          onClick={() => dispatch(resetSession({ productId: "mug" }))}
          className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-2.5 px-4 rounded-xl text-xs transition-all cursor-pointer border border-slate-200/60"
        >
          Reset All Settings
        </button>
      </div>
    </div>
  );
}

