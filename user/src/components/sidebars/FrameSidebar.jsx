import { useSelector, useDispatch } from "react-redux";
import { updateSession, resetSession } from "../../store/customizerSlice";
import { FaShapes, FaRulerCombined, FaUpload } from "react-icons/fa";

const FRAME_DESIGNS = [
  { id: "oak", label: "Golden Oak" },
  { id: "ebony", label: "Ebony Black" },
  { id: "mahogany", label: "Mahogany" }
];

export default function FrameSidebar({ onSelectPhoto, onClearPhoto }) {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.customizer.sessions.frame);

  const {
    frameDesign,
    frameSize,
    frameGrid,
    frameImages,
    activeFrameSlot,
  } = session;

  const updateFields = (fields) => {
    dispatch(updateSession({ productId: "frame", fields }));
  };

  const getSlotCount = (grid) => {
    if (grid === "2x2") return 4;
    if (grid === "3x2") return 6;
    if (grid === "3x3") return 9;
    return 5;
  };

  const slotCount = getSlotCount(frameGrid);
  const slots = Array.from({ length: slotCount }, (_, i) => i);
  const activeImage = frameImages[activeFrameSlot] || { url: null, zoom: 1.0, xOffset: 0, yOffset: 0, rotation: 0 };

  const handleFrameImageUpdate = (fields) => {
    updateFields({
      frameImages: {
        ...frameImages,
        [activeFrameSlot]: { ...activeImage, ...fields }
      }
    });
  };

  return (
    <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/60 shadow-md p-5 flex flex-col gap-4 h-full">
      <div>
        <h2 className="font-heading font-black text-xl text-slate-900 leading-tight">
          Collage Frame Studio
        </h2>
        <p className="text-[11px] text-slate-500 mt-0.5">Customize your executive personalized gear in real-time.</p>
      </div>

      <hr className="border-slate-100" />

      <div className="space-y-1.5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <FaShapes className="text-slate-500" />
          <span>Select Wood Frame Style</span>
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {FRAME_DESIGNS.map((des) => (
            <button
              key={des.id}
              type="button"
              onClick={() => updateFields({ frameDesign: des.id })}
              className={`py-1.5 px-2 border rounded-lg text-xs font-bold text-center transition-all cursor-pointer truncate ${
                frameDesign === des.id ? "border-blue-600 bg-blue-50/20 text-blue-700" : "border-slate-200 bg-white"
              }`}
            >
              {des.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <FaShapes className="text-slate-500" />
          <span>Collage Format</span>
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {["2x2", "3x2", "3x3", "mosaic", "heart"].map((grid) => (
            <button
              key={grid}
              type="button"
              onClick={() => {
                const count = getSlotCount(grid);
                let nextSlot = activeFrameSlot;
                if (activeFrameSlot >= count) {
                  nextSlot = 0;
                }
                updateFields({
                  frameGrid: grid,
                  activeFrameSlot: nextSlot
                });
              }}
              className={`py-1.5 px-3 border rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                frameGrid === grid ? "border-blue-600 bg-blue-50/20 text-blue-700" : "border-slate-200 bg-white"
              }`}
            >
              {grid}
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
          {['12" x 12"', '16" x 16"', '24" x 24"'].map((sz) => (
            <button
              key={sz}
              type="button"
              onClick={() => updateFields({ frameSize: sz })}
              className={`py-1.5 px-2 border rounded-lg text-xs font-bold text-center transition-all cursor-pointer ${
                frameSize === sz ? "border-blue-600 bg-blue-50/20 text-blue-700" : "border-slate-200 bg-white"
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
          <span className="text-xs font-bold text-slate-400 block uppercase">Select Active Photo Slot</span>
          <div className="grid grid-cols-5 gap-2">
            {slots.map((idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => updateFields({ activeFrameSlot: idx })}
                className={`py-1.5 px-1 border rounded-lg text-xs font-bold text-center transition-all cursor-pointer ${
                  activeFrameSlot === idx ? "border-blue-600 bg-blue-50/20 text-blue-700" : "border-slate-200 bg-white"
                }`}
              >
                Slot {idx + 1}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5 bg-slate-50/50 p-3 rounded-xl border border-slate-200/50 space-y-3">
          <span className="text-xs font-bold text-slate-400 block uppercase border-b border-slate-200/60 pb-1">
            Slot {activeFrameSlot + 1} Image Options
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onSelectPhoto}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded-lg text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <FaUpload />
              <span>Upload Photo</span>
            </button>
            {activeImage.url && (
              <button
                type="button"
                onClick={onClearPhoto}
                className="bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 font-bold py-2 px-3 rounded-lg text-xs transition-colors cursor-pointer"
              >
                Remove
              </button>
            )}
          </div>

          {activeImage.url && (
            <div className="space-y-2.5 text-xs pt-1">
              <div>
                <div className="flex justify-between font-bold text-slate-500 mb-0.5">
                  <span>Photo Zoom</span>
                  <span>{activeImage.zoom.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="5.0"
                  step="0.1"
                  value={activeImage.zoom}
                  onChange={(e) => handleFrameImageUpdate({ zoom: parseFloat(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between font-bold text-slate-500 mb-0.5">
                  <span>Horizontal Shift</span>
                  <span>{activeImage.xOffset}px</span>
                </div>
                <input
                  type="range"
                  min="-100"
                  max="100"
                  value={activeImage.xOffset}
                  onChange={(e) => handleFrameImageUpdate({ xOffset: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between font-bold text-slate-500 mb-0.5">
                  <span>Vertical Shift</span>
                  <span>{activeImage.yOffset}px</span>
                </div>
                <input
                  type="range"
                  min="-100"
                  max="100"
                  value={activeImage.yOffset}
                  onChange={(e) => handleFrameImageUpdate({ yOffset: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between font-bold text-slate-500 mb-0.5">
                  <span>Rotation</span>
                  <span>{activeImage.rotation}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={activeImage.rotation}
                  onChange={(e) => handleFrameImageUpdate({ rotation: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="pt-1">
        <button
          type="button"
          onClick={() => dispatch(resetSession({ productId: "frame" }))}
          className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-2.5 px-4 rounded-xl text-xs transition-all cursor-pointer border border-slate-200/60"
        >
          Reset All Settings
        </button>
      </div>
    </div>
  );
}

