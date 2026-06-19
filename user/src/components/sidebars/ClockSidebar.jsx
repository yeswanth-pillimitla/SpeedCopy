import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateSession, resetSession } from "../../store/customizerSlice";
import { FaShapes, FaRulerCombined, FaPalette, FaClock, FaFont } from "react-icons/fa";

const PRESET_COLORS = [
  { name: "Gold", value: "#d4af37" },
  { name: "Black", value: "#000000" },
  { name: "White", value: "#ffffff" },
  { name: "Silver", value: "#c0c0c0" },
  { name: "Crimson", value: "#b22222" },
  { name: "Royal Blue", value: "#1e3a8a" },
  { name: "Emerald", value: "#065f46" },
];

const FONTS = [
  { name: "Modern Sans", value: "Inter" },
  { name: "Elegant Serif", value: "Playfair Display" },
  { name: "Typewriter", value: "Courier New" },
  { name: "Cursive Script", value: "Pacifico" },
];

const SHAPES = [
  { id: "circle", label: "Classic Circle" },
  { id: "square", label: "Square" },
  { id: "squircle", label: "Squircle" },
  { id: "curved-edges", label: "Curved Edges" },
  { id: "heart", label: "Romantic Heart" },
  { id: "oval", label: "Elegant Oval" },
  { id: "wavy", label: "Wavy Scallop" },
  { id: "inward-square", label: "Inward Square" },
];

const SIZE_OPTIONS = [
  { id: '8" x 8"', label: '8" (Compact Desk)' },
  { id: '12" x 12"', label: '12" (Standard Wall)' },
  { id: '18" x 18"', label: '18" (Jumbo Premium)' },
];

export default function ClockSidebar() {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.customizer.sessions.clock);
  const [showAllShapes, setShowAllShapes] = useState(false);

  const {
    shape,
    dialType,
    numberColor,
    numberFont,
    handColor,
    handMovement,
    text,
    textColor,
    textFont,
    textSize,
    textPosition,
    size,
  } = session;

  const updateFields = (fields) => {
    dispatch(updateSession({ productId: "clock", fields }));
  };

  return (
    <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/60 shadow-md p-5 flex flex-col gap-4 h-full">
      <div>
        <h2 className="font-heading font-black text-xl text-slate-900 leading-tight">
          Clock Customizer Studio
        </h2>
        <p className="text-[11px] text-slate-500 mt-0.5">Design and customize your premium ticking wall clock.</p>
      </div>

      <hr className="border-slate-100" />

      <div className="space-y-1.5">
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <FaShapes className="text-slate-500" />
            <span>1. Select Clock Shape</span>
          </h3>
          <button
            type="button"
            onClick={() => setShowAllShapes(!showAllShapes)}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
          >
            {showAllShapes ? "Show less" : "View all"}
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {(showAllShapes ? SHAPES : SHAPES.slice(0, 3)).map((sh) => (
            <button
              key={sh.id}
              type="button"
              onClick={() => updateFields({ shape: sh.id })}
              className={`py-1.5 px-2 border rounded-lg text-xs font-bold text-center transition-all cursor-pointer truncate ${
                shape === sh.id
                  ? "border-blue-600 bg-blue-50/20 text-blue-700 ring-2 ring-blue-500/5"
                  : "border-slate-200 hover:border-slate-300 bg-white text-slate-600"
              }`}
            >
              {sh.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <FaRulerCombined className="text-slate-500" />
          <span>Adjust Clock Size</span>
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {SIZE_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => updateFields({ size: opt.id })}
              className={`py-1.5 px-1.5 border rounded-lg text-xs font-bold text-center transition-all cursor-pointer ${
                size === opt.id
                  ? "border-blue-600 bg-blue-50/20 text-blue-700 ring-2 ring-blue-500/5"
                  : "border-slate-200 hover:border-slate-300 bg-white text-slate-600"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <hr className="border-slate-100" />

      <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-200/50 space-y-3">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5 border-b border-slate-200/60 pb-1.5">
          <FaPalette className="text-slate-500" />
          <span>Dial Markings Settings</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <span className="block font-bold text-slate-600 mb-1">Dial Style</span>
            <select
              value={dialType}
              onChange={(e) => updateFields({ dialType: e.target.value })}
              className="w-full font-semibold border border-slate-200 rounded-lg p-1.5 bg-white outline-none"
            >
              <option value="numbers">Classic Numbers</option>
              <option value="roman">Roman Numerals</option>
              <option value="ticks">Ticks Only</option>
              <option value="none">None</option>
            </select>
          </div>

          {dialType !== "none" && dialType !== "ticks" && (
            <div>
              <span className="block font-bold text-slate-600 mb-1">Numbers Font</span>
              <select
                value={numberFont}
                onChange={(e) => updateFields({ numberFont: e.target.value })}
                className="w-full font-semibold border border-slate-200 rounded-lg p-1.5 bg-white outline-none"
              >
                {FONTS.map((f) => (
                  <option key={f.value} value={f.value}>{f.name}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {dialType !== "none" && (
          <div>
            <span className="block text-xs font-bold text-slate-600 mb-1">Markings Color</span>
            <div className="flex gap-2 flex-wrap">
              {PRESET_COLORS.map((col) => (
                <button
                  key={col.value}
                  type="button"
                  onClick={() => updateFields({ numberColor: col.value })}
                  style={{ backgroundColor: col.value === "#ffffff" ? "#f1f5f9" : col.value }}
                  className={`w-6 h-6 rounded-full border transition-transform hover:scale-105 cursor-pointer ${
                    numberColor === col.value ? "border-blue-500 ring-2 ring-blue-500/20" : "border-slate-200"
                  }`}
                  title={col.name}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-200/50 space-y-3">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5 border-b border-slate-200/60 pb-1.5">
          <FaClock className="text-slate-500" />
          <span>Clock Hands Settings</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <span className="block font-bold text-slate-600 mb-1">Hands Color</span>
            <div className="flex gap-2 flex-wrap">
              {["#d4af37", "#000000", "#ffffff", "#b22222", "#1e3a8a"].map((col) => {
                const label = col === "#d4af37" ? "Gold" : col === "#000000" ? "Black" : col === "#ffffff" ? "White" : col === "#b22222" ? "Crimson" : "Blue";
                return (
                  <button
                    key={col}
                    type="button"
                    onClick={() => updateFields({ handColor: col })}
                    style={{ backgroundColor: col === "#ffffff" ? "#f1f5f9" : col }}
                    className={`w-6 h-6 rounded-full border transition-transform hover:scale-105 cursor-pointer ${
                      handColor === col ? "border-blue-500 ring-2 ring-blue-500/20" : "border-slate-200"
                    }`}
                    title={label}
                  />
                );
              })}
            </div>
          </div>

          <div>
            <span className="block font-bold text-slate-600 mb-1">Hands Movement</span>
            <select
              value={handMovement}
              onChange={(e) => updateFields({ handMovement: e.target.value })}
              className="w-full font-semibold border border-slate-200 rounded-lg p-1.5 bg-white outline-none"
            >
              <option value="sweep">Smooth Sweep</option>
              <option value="tick">Ticking Clock</option>
              <option value="static">Static (Aesthetic)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-200/50 space-y-3">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5 border-b border-slate-200/60 pb-1.5">
          <FaFont className="text-slate-500" />
          <span>Inscriptive Text Overlay</span>
        </h3>

        <div className="space-y-3 text-xs">
          <div>
            <span className="block font-bold text-slate-600 mb-1">Enter Text</span>
            <input
              type="text"
              value={text}
              onChange={(e) => updateFields({ text: e.target.value })}
              placeholder="e.g. Love, Family, Quotes, Dates"
              className="w-full font-semibold border border-slate-200 rounded-lg p-2 bg-white outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>

          {text && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="block font-bold text-slate-500 mb-1">Text Font</span>
                  <select
                    value={textFont}
                    onChange={(e) => updateFields({ textFont: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg p-1.5 bg-white"
                  >
                    {FONTS.map((f) => (
                      <option key={f.value} value={f.value}>{f.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <span className="block font-bold text-slate-500 mb-1">Text Color</span>
                  <select
                    value={textColor}
                    onChange={(e) => updateFields({ textColor: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg p-1.5 bg-white"
                  >
                    {PRESET_COLORS.map((c) => (
                      <option key={c.value} value={c.value}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-0.5">
                <div>
                  <div className="flex justify-between font-bold text-slate-500 mb-0.5">
                    <span>Font Size</span>
                    <span>{textSize}px</span>
                  </div>
                  <input
                    type="range"
                    min="12"
                    max="40"
                    value={textSize}
                    onChange={(e) => updateFields({ textSize: parseInt(e.target.value) })}
                  />
                </div>

                <div>
                  <div className="flex justify-between font-bold text-slate-500 mb-0.5">
                    <span>Vertical Position</span>
                    <span>{textPosition}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="80"
                    value={textPosition}
                    onChange={(e) => updateFields({ textPosition: parseInt(e.target.value) })}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="pt-1">
        <button
          onClick={() => dispatch(resetSession({ productId: "clock" }))}
          className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-2.5 px-4 rounded-xl text-xs transition-all cursor-pointer border border-slate-200/60"
        >
          Reset All Settings
        </button>
      </div>
    </div>
  );
}

