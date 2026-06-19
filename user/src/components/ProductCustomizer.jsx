import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateSession, set3DMode } from "../store/customizerSlice";
import { FaCube, FaTimes, FaExpandAlt } from "react-icons/fa";

import ClockPreview from "./previews/ClockPreview";
import MugPreview from "./previews/MugPreview";
import PenPreview from "./previews/PenPreview";
import PlatePreview from "./previews/PlatePreview";
import FramePreview from "./previews/FramePreview";
import LetterheadPreview from "./previews/LetterheadPreview";

import ClockSidebar from "./sidebars/ClockSidebar";
import MugSidebar from "./sidebars/MugSidebar";
import PenSidebar from "./sidebars/PenSidebar";
import PlateSidebar from "./sidebars/PlateSidebar";
import FrameSidebar from "./sidebars/FrameSidebar";
import LetterheadSidebar from "./sidebars/LetterheadSidebar";

import Product3DPreview from "./Product3DPreview";

const PRODUCT_LABELS = {
  clock: "Wall Clock",
  mug: "Coffee Mug",
  pen: "Pen",
  plate: "Name Plate",
  frame: "Photo Frame",
  letterhead: "Letterhead",
};

export default function ProductCustomizer({ productId }) {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const is3D = useSelector((state) => state.customizer.is3D[productId]);
  const frameSession = useSelector((state) => state.customizer.sessions.frame);
  const mugSession = useSelector((state) => state.customizer.sessions.mug);

  useEffect(() => {
    if (is3D) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [is3D]);

  const open3D = () => dispatch(set3DMode({ productId, value: true }));
  const close3D = () => dispatch(set3DMode({ productId, value: false }));

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (productId === "clock") {
        dispatch(updateSession({
          productId: "clock",
          fields: { image: url }
        }));
      } else if (productId === "mug") {
        if (mugSession.mugDesign === "heart-dual") {
          const slotIdx = mugSession.activeMugSlot;
          dispatch(updateSession({
            productId: "mug",
            fields: {
              mugImages: {
                ...mugSession.mugImages,
                [slotIdx]: { url, zoom: 1.0, xOffset: 0, yOffset: 0, rotation: 0 }
              }
            }
          }));
        } else {
          dispatch(updateSession({
            productId: "mug",
            fields: {
              mugImage: { url, zoom: 1.0, xOffset: 0, yOffset: 0, rotation: 0 }
            }
          }));
        }
      } else if (productId === "pen") {
        dispatch(updateSession({
          productId: "pen",
          fields: {
            penImage: { url, zoom: 1.0, xOffset: 0, yOffset: 0, rotation: 0 }
          }
        }));
      } else if (productId === "letterhead") {
        dispatch(updateSession({
          productId: "letterhead",
          fields: {
            letterheadImage: { url, zoom: 1.0, xOffset: 0, yOffset: 0, rotation: 0 }
          }
        }));
      } else if (productId === "frame") {
        const slotIdx = frameSession.activeFrameSlot;
        dispatch(updateSession({
          productId: "frame",
          fields: {
            frameImages: {
              ...frameSession.frameImages,
              [slotIdx]: { url, zoom: 1.0, xOffset: 0, yOffset: 0, rotation: 0 }
            }
          }
        }));
      }
      e.target.value = "";
    }
  };

  const handleClearPhoto = () => {
    if (productId === "clock") {
      dispatch(updateSession({
        productId: "clock",
        fields: { image: null, zoom: 1.0, xOffset: 0, yOffset: 0, rotation: 0 }
      }));
    } else if (productId === "mug") {
      if (mugSession.mugDesign === "heart-dual") {
        const slotIdx = mugSession.activeMugSlot;
        dispatch(updateSession({
          productId: "mug",
          fields: {
            mugImages: {
              ...mugSession.mugImages,
              [slotIdx]: { url: null, zoom: 1.0, xOffset: 0, yOffset: 0, rotation: 0 }
            }
          }
        }));
      } else {
        dispatch(updateSession({
          productId: "mug",
          fields: {
            mugImage: { url: null, zoom: 1.0, xOffset: 0, yOffset: 0, rotation: 0 }
          }
        }));
      }
    } else if (productId === "pen") {
      dispatch(updateSession({
        productId: "pen",
        fields: {
          penImage: { url: null, zoom: 1.0, xOffset: 0, yOffset: 0, rotation: 0 }
        }
      }));
    } else if (productId === "letterhead") {
      dispatch(updateSession({
        productId: "letterhead",
        fields: {
          letterheadImage: { url: null, zoom: 1.0, xOffset: 0, yOffset: 0, rotation: 0 }
        }
      }));
    } else if (productId === "frame") {
      const slotIdx = frameSession.activeFrameSlot;
      dispatch(updateSession({
        productId: "frame",
        fields: {
          frameImages: {
            ...frameSession.frameImages,
            [slotIdx]: { url: null, zoom: 1.0, xOffset: 0, yOffset: 0, rotation: 0 }
          }
        }
      }));
    }
  };

  return (
    <>
      {is3D && productId !== "letterhead" && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(5, 8, 22, 0.88)", backdropFilter: "blur(12px)" }}
          onClick={close3D}
        >
          <div
            className="relative flex flex-col items-center"
            style={{
              width: "min(92vw, 820px)",
              maxHeight: "92vh",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="w-full rounded-3xl overflow-hidden shadow-2xl"
              style={{
                background: "linear-gradient(145deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
                border: "1px solid rgba(99,102,241,0.35)",
                boxShadow: "0 0 80px rgba(99,102,241,0.25), 0 40px 80px rgba(0,0,0,0.6)",
              }}
            >
              <div
                className="flex items-center justify-between px-6 py-4"
                style={{
                  background: "linear-gradient(90deg, rgba(99,102,241,0.18) 0%, rgba(139,92,246,0.12) 100%)",
                  borderBottom: "1px solid rgba(99,102,241,0.2)",
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                      boxShadow: "0 0 20px rgba(99,102,241,0.5)",
                    }}
                  >
                    <FaCube className="text-white text-sm" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm leading-tight">
                      3D Preview
                    </p>
                    <p className="text-indigo-300 text-xs font-medium">
                      {PRODUCT_LABELS[productId] || productId} · Drag to rotate
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={close3D}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer"
                  style={{
                    background: "rgba(239,68,68,0.15)",
                    border: "1px solid rgba(239,68,68,0.3)",
                    color: "#f87171",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(239,68,68,0.35)";
                    e.currentTarget.style.color = "#ffffff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(239,68,68,0.15)";
                    e.currentTarget.style.color = "#f87171";
                  }}
                >
                  <FaTimes className="text-sm" />
                </button>
              </div>

              <div
                className="flex items-center justify-center p-6"
              >
                <div
                  style={{
                    width: "min(100%, 660px)",
                    height: "min(60vh, 660px)",
                  }}
                >
                  <Product3DPreview productId={productId} />
                </div>
              </div>

              <div
                className="px-6 py-3 flex items-center justify-center gap-2"
                style={{
                  borderTop: "1px solid rgba(99,102,241,0.15)",
                  background: "rgba(0,0,0,0.2)",
                }}
              >
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                  <span className="text-indigo-300 text-xs font-medium">
                    Click &amp; drag to rotate 
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-1 py-1 fade-in-up">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7 bg-[#f8fafc] rounded-3xl border border-slate-200/60 shadow-md p-5 flex flex-col items-center justify-center h-full min-h-[540px] relative overflow-hidden">
            {productId !== "letterhead" && (
              <button
                type="button"
                onClick={open3D}
                className="absolute top-4 right-4 z-10 py-1.5 px-3 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all shadow-xs border flex items-center gap-1.5 cursor-pointer bg-white border-slate-200 text-slate-600 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600"
              >
                <FaExpandAlt />
                <span>View in 3D</span>
              </button>
            )}

            <div className="w-full h-full flex-1 flex items-center justify-center">
              <div className="w-full max-w-[520px] flex items-center justify-center">
                {productId === "clock" && (
                  <ClockPreview
                    onSelectPhoto={triggerFileSelect}
                    onRemovePhoto={handleClearPhoto}
                  />
                )}
                {productId === "mug" && (
                  <MugPreview onSelectPhoto={triggerFileSelect} />
                )}
                {productId === "pen" && <PenPreview />}
                {productId === "plate" && <PlatePreview />}
                {productId === "frame" && (
                  <FramePreview onSelectPhoto={triggerFileSelect} />
                )}
                {productId === "letterhead" && (
                  <LetterheadPreview onSelectPhoto={triggerFileSelect} />
                )}
              </div>
            </div>
          </div>

          {productId === "clock" && <ClockSidebar />}
          {productId === "mug" && <MugSidebar />}
          {productId === "pen" && (
            <PenSidebar
              onSelectPhoto={triggerFileSelect}
              onClearPhoto={handleClearPhoto}
            />
          )}
          {productId === "plate" && <PlateSidebar />}
          {productId === "frame" && (
            <FrameSidebar
              onSelectPhoto={triggerFileSelect}
              onClearPhoto={handleClearPhoto}
            />
          )}
          {productId === "letterhead" && (
            <LetterheadSidebar
              onSelectPhoto={triggerFileSelect}
              onClearPhoto={handleClearPhoto}
            />
          )}
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>
    </>
  );
}
