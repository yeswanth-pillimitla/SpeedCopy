import { useSelector, useDispatch } from "react-redux";
import { updateSession, resetSession } from "../../store/customizerSlice";
import { FaShapes, FaRulerCombined } from "react-icons/fa";

const PLATE_DESIGNS = [
  { id: "rectangle", label: "Rectangular" },
  { id: "oval", label: "Classic Oval" },
  { id: "bevel", label: "Beveled Shield" }
];

export default function PlateSidebar() {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.customizer.sessions.plate);

  const {
    plateDesign,
    plateSize,
    plateMounts,
    plateTitle,
    plateSubtitle,
    plateTitleColor,
    plateSubtitleColor,
  } = session;

  const updateFields = (fields) => {
    dispatch(updateSession({ productId: "plate", fields }));
  };

  return (
    <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/60 shadow-md p-5 flex flex-col gap-4 h-full">
      <div>
        <h2 className="font-heading font-black text-xl text-slate-900 leading-tight">
          Acrylic Name Plate Studio
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
          {PLATE_DESIGNS.map((des) => (
            <button
              key={des.id}
              type="button"
              onClick={() => updateFields({ plateDesign: des.id })}
              className={`py-1.5 px-2 border rounded-lg text-xs font-bold text-center transition-all cursor-pointer truncate ${
                plateDesign === des.id ? "border-blue-600 bg-blue-50/20 text-blue-700" : "border-slate-200 bg-white"
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
          {['12" x 6"', '16" x 8"', '20" x 10"'].map((sz) => (
            <button
              key={sz}
              type="button"
              onClick={() => updateFields({ plateSize: sz })}
              className={`py-1.5 px-2 border rounded-lg text-xs font-bold text-center transition-all cursor-pointer ${
                plateSize === sz ? "border-blue-600 bg-blue-50/20 text-blue-700" : "border-slate-200 bg-white"
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
          <span className="text-xs font-bold text-slate-400 block uppercase">Mount Standoff Studs</span>
          <div className="flex gap-2">
            {[
              { val: "#d4af37", name: "Gold" },
              { val: "#c0c0c0", name: "Silver" },
              { val: "#000000", name: "Black" },
            ].map((stud) => (
              <button
                key={stud.val}
                type="button"
                onClick={() => updateFields({ plateMounts: stud.val })}
                className={`py-1 px-3 border rounded-lg text-xs font-bold flex-1 ${
                  plateMounts === stud.val ? "border-blue-600 bg-blue-50/20 text-blue-700" : "border-slate-200 bg-white"
                }`}
              >
                {stud.name}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5 bg-slate-50/50 p-3 rounded-xl border border-slate-200/50 space-y-3">
          <span className="text-xs font-bold text-slate-400 block uppercase border-b border-slate-200/60 pb-1">Input Text Fields</span>

          <div className="space-y-2">
            <span className="block text-[10px] font-bold text-slate-500">Line 1: Name Title</span>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
              <input
                type="text"
                value={plateTitle}
                onChange={(e) => updateFields({ plateTitle: e.target.value })}
                placeholder="Type name title"
                className="sm:col-span-9 text-xs font-semibold border border-slate-200 rounded-lg p-2 bg-white outline-none"
              />
              <div className="sm:col-span-3 flex justify-end items-center gap-1">
                <span className="text-[10px] font-bold text-slate-400">Color:</span>
                <input
                  type="color"
                  value={plateTitleColor}
                  onChange={(e) => updateFields({ plateTitleColor: e.target.value })}
                  className="w-8 h-8 rounded border border-slate-200 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <span className="block text-[10px] font-bold text-slate-500">Line 2: Designation</span>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
              <input
                type="text"
                value={plateSubtitle}
                onChange={(e) => updateFields({ plateSubtitle: e.target.value })}
                placeholder="Type designation"
                className="sm:col-span-9 text-xs font-semibold border border-slate-200 rounded-lg p-2 bg-white outline-none"
              />
              <div className="sm:col-span-3 flex justify-end items-center gap-1">
                <span className="text-[10px] font-bold text-slate-400">Color:</span>
                <input
                  type="color"
                  value={plateSubtitleColor}
                  onChange={(e) => updateFields({ plateSubtitleColor: e.target.value })}
                  className="w-8 h-8 rounded border border-slate-200 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-1">
        <button
          type="button"
          onClick={() => dispatch(resetSession({ productId: "plate" }))}
          className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-2.5 px-4 rounded-xl text-xs transition-all cursor-pointer border border-slate-200/60"
        >
          Reset All Settings
        </button>
      </div>
    </div>
  );
}

