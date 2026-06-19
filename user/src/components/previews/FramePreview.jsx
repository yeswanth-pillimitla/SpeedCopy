import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateSession } from "../../store/customizerSlice";

export default function FramePreview({ onSelectPhoto }) {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.customizer.sessions.frame);
  const svgRef = useRef(null);
  const dragStart = useRef(null);
  const frameImagesRef = useRef({});

  useEffect(() => {
    const handleWindowMouseMove = (e) => {
      if (dragStart.current) {
        handleFrameGlobalDragMove(e);
      }
    };
    const handleWindowMouseUp = () => {
      if (dragStart.current) {
        handleFrameGlobalDragEnd();
      }
    };
    window.addEventListener("mousemove", handleWindowMouseMove);
    window.addEventListener("mouseup", handleWindowMouseUp);
    window.addEventListener("touchmove", handleWindowMouseMove, { passive: false });
    window.addEventListener("touchend", handleWindowMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove);
      window.removeEventListener("mouseup", handleWindowMouseUp);
      window.removeEventListener("touchmove", handleWindowMouseMove);
      window.removeEventListener("touchend", handleWindowMouseUp);
    };
  }, []);

  const {
    frameDesign = "oak",
    frameSize = '16" x 16"',
    frameGrid = "2x2",
    frameImages = {},
    activeFrameSlot = 0,
  } = session;

  useEffect(() => {
    frameImagesRef.current = frameImages;
  }, [frameImages]);

  const getSlotInfo = (grid, idx) => {
    if (grid === "2x2") {
      const x = idx % 2 === 0 ? 65 : 215;
      const y = idx < 2 ? 85 : 215;
      return { x, y, width: 120, height: 100, cx: x + 60, cy: y + 50 };
    }
    if (grid === "3x2") {
      const col = idx % 3;
      const row = Math.floor(idx / 3);
      const x = col === 0 ? 65 : col === 1 ? 162 : 260;
      const y = row === 0 ? 85 : 215;
      return { x, y, width: 75, height: 100, cx: x + 37.5, cy: y + 50 };
    }
    if (grid === "3x3") {
      const col = idx % 3;
      const row = Math.floor(idx / 3);
      const x = col === 0 ? 65 : col === 1 ? 155 : 245;
      const y = row === 0 ? 85 : row === 1 ? 165 : 245;
      return { x, y, width: 80, height: 70, cx: x + 40, cy: y + 35 };
    }
    if (grid === "mosaic") {
      if (idx === 0) return { x: 140, y: 140, width: 120, height: 120, cx: 200, cy: 200 };
      const x = idx === 1 || idx === 3 ? 65 : 270;
      const y = idx === 1 || idx === 2 ? 85 : 250;
      return { x, y, width: 65, height: 65, cx: x + 32.5, cy: y + 32.5 };
    }
    if (grid === "heart") {
      if (idx === 0) return { x: 140, y: 140, width: 120, height: 120, cx: 200, cy: 190 };
      const x = idx === 1 || idx === 3 ? 65 : 270;
      const y = idx === 1 || idx === 2 ? 85 : 250;
      return { x, y, width: 65, height: 65, cx: x + 32.5, cy: y + 32.5 };
    }
    return { x: 0, y: 0, width: 100, height: 100, cx: 50, cy: 50 };
  };

  const handleFrameSlotClick = (slotIdx) => {
    dispatch(updateSession({
      productId: "frame",
      fields: { activeFrameSlot: slotIdx }
    }));
  };

  const handleFrameImageUpdate = (slotIdx, fields) => {
    const latestImages = frameImagesRef.current;
    dispatch(updateSession({
      productId: "frame",
      fields: {
        frameImages: {
          ...latestImages,
          [slotIdx]: {
            ...latestImages[slotIdx],
            ...fields
          }
        }
      }
    }));
  };

  const handleFrameMoveStart = (e, idx) => {
    const imgState = frameImages[idx];
    if (!imgState.url) return;
    e.preventDefault();
    e.stopPropagation();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    dragStart.current = {
      type: "move",
      slotIdx: idx,
      startX: clientX,
      startY: clientY,
      startOffsetX: imgState.xOffset,
      startOffsetY: imgState.yOffset,
    };
  };

  const handleFrameScaleStart = (e, idx) => {
    const imgState = frameImages[idx];
    if (!imgState.url) return;
    e.preventDefault();
    e.stopPropagation();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const rect = svgRef.current.getBoundingClientRect();
    const slotInfo = getSlotInfo(frameGrid, idx);
    const centerClientX = rect.left + (slotInfo.cx + imgState.xOffset) * (rect.width / 400);
    const centerClientY = rect.top + (slotInfo.cy + imgState.yOffset) * (rect.height / 400);
    const initialDist = Math.sqrt((clientX - centerClientX) ** 2 + (clientY - centerClientY) ** 2);
    dragStart.current = {
      type: "scale",
      slotIdx: idx,
      initialZoom: imgState.zoom,
      centerClientX,
      centerClientY,
      initialDist,
    };
  };

  const handleFrameRotateStart = (e, idx) => {
    const imgState = frameImages[idx];
    if (!imgState.url) return;
    e.preventDefault();
    e.stopPropagation();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const rect = svgRef.current.getBoundingClientRect();
    const slotInfo = getSlotInfo(frameGrid, idx);
    const centerClientX = rect.left + (slotInfo.cx + imgState.xOffset) * (rect.width / 400);
    const centerClientY = rect.top + (slotInfo.cy + imgState.yOffset) * (rect.height / 400);
    const initialAngle = Math.atan2(clientY - centerClientY, clientX - centerClientX) * (180 / Math.PI);
    dragStart.current = {
      type: "rotate",
      slotIdx: idx,
      initialRotation: imgState.rotation,
      centerClientX,
      centerClientY,
      initialAngle,
    };
  };

  const handleFrameGlobalDragMove = (e) => {
    if (!dragStart.current) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const { type, slotIdx } = dragStart.current;

    const rect = svgRef.current.getBoundingClientRect();
    const scaleFactor = 400 / rect.width;

    if (type === "move") {
      const dx = clientX - dragStart.current.startX;
      const dy = clientY - dragStart.current.startY;
      handleFrameImageUpdate(slotIdx, {
        xOffset: dragStart.current.startOffsetX + dx * scaleFactor,
        yOffset: dragStart.current.startOffsetY + dy * scaleFactor
      });
    } else if (type === "scale") {
      const dist = Math.sqrt((clientX - dragStart.current.centerClientX) ** 2 + (clientY - dragStart.current.centerClientY) ** 2);
      const ratio = dist / dragStart.current.initialDist;
      handleFrameImageUpdate(slotIdx, {
        zoom: Math.max(0.05, dragStart.current.initialZoom * ratio)
      });
    } else if (type === "rotate") {
      const angle = Math.atan2(clientY - dragStart.current.centerClientY, clientX - dragStart.current.centerClientX) * (180 / Math.PI);
      const deltaAngle = angle - dragStart.current.initialAngle;
      handleFrameImageUpdate(slotIdx, {
        rotation: (dragStart.current.initialRotation + deltaAngle + 360) % 360
      });
    }
  };

  const handleFrameGlobalDragEnd = () => {
    dragStart.current = null;
  };

  const renderFrameHandles = (idx, width, height, cx, cy) => {
    const imgState = frameImages[idx];
    if (activeFrameSlot !== idx || !imgState || !imgState.url) return null;
    return (
      <g transform={`translate(${imgState.xOffset}, ${imgState.yOffset}) rotate(${imgState.rotation}, ${cx}, ${cy})`}>
        <rect
          x={cx - (width * imgState.zoom) / 2}
          y={cy - (height * imgState.zoom) / 2}
          width={width * imgState.zoom}
          height={height * imgState.zoom}
          fill="transparent"
          stroke="#3b82f6"
          strokeWidth="1.5"
          strokeDasharray="4,4"
          className="cursor-move pointer-events-auto"
          onMouseDown={(e) => handleFrameMoveStart(e, idx)}
          onTouchStart={(e) => handleFrameMoveStart(e, idx)}
        />
        <rect x={cx - (width * imgState.zoom) / 2 - 4} y={cy - (height * imgState.zoom) / 2 - 4} width="8" height="8" fill="#ffffff" stroke="#3b82f6" strokeWidth="1.2" className="cursor-nwse-resize pointer-events-auto" onMouseDown={(e) => handleFrameScaleStart(e, idx)} onTouchStart={(e) => handleFrameScaleStart(e, idx)} />
        <rect x={cx + (width * imgState.zoom) / 2 - 4} y={cy - (height * imgState.zoom) / 2 - 4} width="8" height="8" fill="#ffffff" stroke="#3b82f6" strokeWidth="1.2" className="cursor-nesw-resize pointer-events-auto" onMouseDown={(e) => handleFrameScaleStart(e, idx)} onTouchStart={(e) => handleFrameScaleStart(e, idx)} />
        <rect x={cx - (width * imgState.zoom) / 2 - 4} y={cy + (height * imgState.zoom) / 2 - 4} width="8" height="8" fill="#ffffff" stroke="#3b82f6" strokeWidth="1.2" className="cursor-nesw-resize pointer-events-auto" onMouseDown={(e) => handleFrameScaleStart(e, idx)} onTouchStart={(e) => handleFrameScaleStart(e, idx)} />
        <rect x={cx + (width * imgState.zoom) / 2 - 4} y={cy + (height * imgState.zoom) / 2 - 4} width="8" height="8" fill="#ffffff" stroke="#3b82f6" strokeWidth="1.2" className="cursor-nwse-resize pointer-events-auto" onMouseDown={(e) => handleFrameScaleStart(e, idx)} onTouchStart={(e) => handleFrameScaleStart(e, idx)} />
        <line x1={cx} y1={cy - (height * imgState.zoom) / 2} x2={cx} y2={cy - (height * imgState.zoom) / 2 - 20} stroke="#3b82f6" strokeWidth="1.2" strokeDasharray="2,2" />
        <circle cx={cx} cy={cy - (height * imgState.zoom) / 2 - 20} r="5" fill="#ffffff" stroke="#3b82f6" strokeWidth="1.2" className="cursor-alias pointer-events-auto" onMouseDown={(e) => handleFrameRotateStart(e, idx)} onTouchStart={(e) => handleFrameRotateStart(e, idx)} />
        <g
          className="cursor-pointer pointer-events-auto"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleFrameImageUpdate(idx, { url: null, zoom: 1.0, xOffset: 0, yOffset: 0, rotation: 0 });
          }}
        >
          <circle cx={cx + (width * imgState.zoom) / 2 + 8} cy={cy - (height * imgState.zoom) / 2 - 8} r="8" fill="#ef4444" stroke="#ffffff" strokeWidth="1.2" />
          <path d={`M ${cx + (width * imgState.zoom) / 2 + 5} ${cy - (height * imgState.zoom) / 2 - 11} L ${cx + (width * imgState.zoom) / 2 + 11} ${cy - (height * imgState.zoom) / 2 - 5} M ${cx + (width * imgState.zoom) / 2 + 11} ${cy - (height * imgState.zoom) / 2 - 11} L ${cx + (width * imgState.zoom) / 2 + 5} ${cy - (height * imgState.zoom) / 2 - 5}`} stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      </g>
    );
  };

  const renderSlotPlaceholder = (idx, x, y, width, height, cx, cy, label) => {
    return (
      <g className="cursor-pointer" onClick={() => {
        handleFrameSlotClick(idx);
        setTimeout(() => onSelectPhoto(), 50);
      }}>
        {label === "Heart Slot" ? (
          <path d="M 200,165 C 200,165 212,142 228,155 C 244,168 236,192 200,222 C 164,192 156,168 172,155 C 188,142 200,165 200,165 Z" fill="transparent" />
        ) : (
          <rect x={x} y={y} width={width} height={height} fill="transparent" />
        )}
        <text x={cx} y={cy + 4} textAnchor="middle" className="fill-slate-400 font-bold text-[8px] pointer-events-none">{label}</text>
      </g>
    );
  };

  const getFrameMaxWidth = () => {
    if (frameSize === '12" x 12"') return "280px";
    if (frameSize === '16" x 16"') return "380px";
    return "480px";
  };

  return (
    <div className="w-full flex justify-center">
      <div
        className="transition-all duration-500 ease-out"
        style={{ width: "100%", maxWidth: getFrameMaxWidth() }}
      >
        <svg
          ref={svgRef}
          viewBox="0 0 400 400"
          className="w-full"
        >
          <defs>
            <clipPath id="frame-clip-2x2-0"><rect x="65" y="85" width="120" height="100" rx="4" /></clipPath>
            <clipPath id="frame-clip-2x2-1"><rect x="215" y="85" width="120" height="100" rx="4" /></clipPath>
            <clipPath id="frame-clip-2x2-2"><rect x="65" y="215" width="120" height="100" rx="4" /></clipPath>
            <clipPath id="frame-clip-2x2-3"><rect x="215" y="215" width="120" height="100" rx="4" /></clipPath>

            <clipPath id="frame-clip-3x2-0"><rect x="65" y="85" width="75" height="100" rx="4" /></clipPath>
            <clipPath id="frame-clip-3x2-1"><rect x="162" y="85" width="75" height="100" rx="4" /></clipPath>
            <clipPath id="frame-clip-3x2-2"><rect x="260" y="85" width="75" height="100" rx="4" /></clipPath>
            <clipPath id="frame-clip-3x2-3"><rect x="65" y="215" width="75" height="100" rx="4" /></clipPath>
            <clipPath id="frame-clip-3x2-4"><rect x="162" y="215" width="75" height="100" rx="4" /></clipPath>
            <clipPath id="frame-clip-3x2-5"><rect x="260" y="215" width="75" height="100" rx="4" /></clipPath>

            <clipPath id="frame-clip-3x3-0"><rect x="65" y="85" width="80" height="70" rx="4" /></clipPath>
            <clipPath id="frame-clip-3x3-1"><rect x="155" y="85" width="80" height="70" rx="4" /></clipPath>
            <clipPath id="frame-clip-3x3-2"><rect x="245" y="85" width="80" height="70" rx="4" /></clipPath>
            <clipPath id="frame-clip-3x3-3"><rect x="65" y="165" width="80" height="70" rx="4" /></clipPath>
            <clipPath id="frame-clip-3x3-4"><rect x="155" y="165" width="80" height="70" rx="4" /></clipPath>
            <clipPath id="frame-clip-3x3-5"><rect x="245" y="165" width="80" height="70" rx="4" /></clipPath>
            <clipPath id="frame-clip-3x3-6"><rect x="65" y="245" width="80" height="70" rx="4" /></clipPath>
            <clipPath id="frame-clip-3x3-7"><rect x="155" y="245" width="80" height="70" rx="4" /></clipPath>
            <clipPath id="frame-clip-3x3-8"><rect x="245" y="245" width="80" height="70" rx="4" /></clipPath>

            <clipPath id="frame-clip-mosaic-0"><rect x="140" y="140" width="120" height="120" rx="4" /></clipPath>
            <clipPath id="frame-clip-mosaic-1"><rect x="65" y="85" width="65" height="65" rx="4" /></clipPath>
            <clipPath id="frame-clip-mosaic-2"><rect x="270" y="85" width="65" height="65" rx="4" /></clipPath>
            <clipPath id="frame-clip-mosaic-3"><rect x="65" y="250" width="65" height="65" rx="4" /></clipPath>
            <clipPath id="frame-clip-mosaic-4"><rect x="270" y="250" width="65" height="65" rx="4" /></clipPath>

            <clipPath id="frame-clip-heart-0">
              <path d="M 200,165 C 200,165 212,142 228,155 C 244,168 236,192 200,222 C 164,192 156,168 172,155 C 188,142 200,165 200,165 Z" />
            </clipPath>
          </defs>

          <rect
            x="40"
            y="60"
            width="320"
            height="280"
            fill="#f8fafc"
            stroke={frameDesign === "oak" ? "#854d0e" : frameDesign === "ebony" ? "#1e293b" : "#7c2d12"}
            strokeWidth="18"
            rx="8"
          />

          {frameGrid === "2x2" && (
            <>
              <rect x="65" y="85" width="120" height="100" fill="#e2e8f0" rx="4" />
              <rect x="215" y="85" width="120" height="100" fill="#e2e8f0" rx="4" />
              <rect x="65" y="215" width="120" height="100" fill="#e2e8f0" rx="4" />
              <rect x="215" y="215" width="120" height="100" fill="#e2e8f0" rx="4" />

              {[0, 1, 2, 3].map((idx) => {
                const x = idx % 2 === 0 ? 65 : 215;
                const y = idx < 2 ? 85 : 215;
                const cx = x + 60;
                const cy = y + 50;
                const imgState = frameImages[idx];
                return (
                  <g key={idx}>
                    <g clipPath={`url(#frame-clip-2x2-${idx})`}>
                      {imgState && imgState.url ? (
                        <image
                          href={imgState.url}
                          x={x - (120 * (imgState.zoom - 1)) / 2}
                          y={y - (100 * (imgState.zoom - 1)) / 2}
                          width={120 * imgState.zoom}
                          height={100 * imgState.zoom}
                          transform={`translate(${imgState.xOffset}, ${imgState.yOffset}) rotate(${imgState.rotation} ${cx} ${cy})`}
                          preserveAspectRatio="xMidYMid slice"
                          className="pointer-events-none"
                        />
                      ) : (
                        renderSlotPlaceholder(idx, x, y, 120, 100, cx, cy, `Slot ${idx + 1}`)
                      )}
                    </g>
                    <rect
                      x={x}
                      y={y}
                      width="120"
                      height="100"
                      fill="transparent"
                      stroke={activeFrameSlot === idx ? "#3b82f6" : "transparent"}
                      strokeWidth="2.5"
                      rx="4"
                      className="cursor-pointer"
                      onClick={() => {
                        handleFrameSlotClick(idx);
                        if (!imgState || !imgState.url) {
                          setTimeout(() => onSelectPhoto(), 50);
                        }
                      }}
                    />
                    {renderFrameHandles(idx, 120, 100, cx, cy)}
                  </g>
                );
              })}
            </>
          )}

          {frameGrid === "3x2" && (
            <>
              <rect x="65" y="85" width="75" height="100" fill="#e2e8f0" rx="4" />
              <rect x="162" y="85" width="75" height="100" fill="#e2e8f0" rx="4" />
              <rect x="260" y="85" width="75" height="100" fill="#e2e8f0" rx="4" />
              <rect x="65" y="215" width="75" height="100" fill="#e2e8f0" rx="4" />
              <rect x="162" y="215" width="75" height="100" fill="#e2e8f0" rx="4" />
              <rect x="260" y="215" width="75" height="100" fill="#e2e8f0" rx="4" />

              {[0, 1, 2, 3, 4, 5].map((idx) => {
                const col = idx % 3;
                const row = Math.floor(idx / 3);
                const x = col === 0 ? 65 : col === 1 ? 162 : 260;
                const y = row === 0 ? 85 : 215;
                const cx = x + 37.5;
                const cy = y + 50;
                const imgState = frameImages[idx];
                return (
                  <g key={idx}>
                    <g clipPath={`url(#frame-clip-3x2-${idx})`}>
                      {imgState && imgState.url ? (
                        <image
                          href={imgState.url}
                          x={x - (75 * (imgState.zoom - 1)) / 2}
                          y={y - (100 * (imgState.zoom - 1)) / 2}
                          width={75 * imgState.zoom}
                          height={100 * imgState.zoom}
                          transform={`translate(${imgState.xOffset}, ${imgState.yOffset}) rotate(${imgState.rotation} ${cx} ${cy})`}
                          preserveAspectRatio="xMidYMid slice"
                          className="pointer-events-none"
                        />
                      ) : (
                        renderSlotPlaceholder(idx, x, y, 75, 100, cx, cy, `Slot ${idx + 1}`)
                      )}
                    </g>
                    <rect
                      x={x}
                      y={y}
                      width="75"
                      height="100"
                      fill="transparent"
                      stroke={activeFrameSlot === idx ? "#3b82f6" : "transparent"}
                      strokeWidth="2.5"
                      rx="4"
                      className="cursor-pointer"
                      onClick={() => {
                        handleFrameSlotClick(idx);
                        if (!imgState || !imgState.url) {
                          setTimeout(() => onSelectPhoto(), 50);
                        }
                      }}
                    />
                    {renderFrameHandles(idx, 75, 100, cx, cy)}
                  </g>
                );
              })}
            </>
          )}

          {frameGrid === "3x3" && (
            <>
              <rect x="65" y="85" width="80" height="70" fill="#e2e8f0" rx="4" />
              <rect x="155" y="85" width="80" height="70" fill="#e2e8f0" rx="4" />
              <rect x="245" y="85" width="80" height="70" fill="#e2e8f0" rx="4" />
              <rect x="65" y="165" width="80" height="70" fill="#e2e8f0" rx="4" />
              <rect x="155" y="165" width="80" height="70" fill="#e2e8f0" rx="4" />
              <rect x="245" y="165" width="80" height="70" fill="#e2e8f0" rx="4" />
              <rect x="65" y="245" width="80" height="70" fill="#e2e8f0" rx="4" />
              <rect x="155" y="245" width="80" height="70" fill="#e2e8f0" rx="4" />
              <rect x="245" y="245" width="80" height="70" fill="#e2e8f0" rx="4" />

              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => {
                const col = idx % 3;
                const row = Math.floor(idx / 3);
                const x = col === 0 ? 65 : col === 1 ? 155 : 245;
                const y = row === 0 ? 85 : row === 1 ? 165 : 245;
                const cx = x + 40;
                const cy = y + 35;
                const imgState = frameImages[idx];
                return (
                  <g key={idx}>
                    <g clipPath={`url(#frame-clip-3x3-${idx})`}>
                      {imgState && imgState.url ? (
                        <image
                          href={imgState.url}
                          x={x - (80 * (imgState.zoom - 1)) / 2}
                          y={y - (70 * (imgState.zoom - 1)) / 2}
                          width={80 * imgState.zoom}
                          height={70 * imgState.zoom}
                          transform={`translate(${imgState.xOffset}, ${imgState.yOffset}) rotate(${imgState.rotation} ${cx} ${cy})`}
                          preserveAspectRatio="xMidYMid slice"
                          className="pointer-events-none"
                        />
                      ) : (
                        renderSlotPlaceholder(idx, x, y, 80, 70, cx, cy, `Slot ${idx + 1}`)
                      )}
                    </g>
                    <rect
                      x={x}
                      y={y}
                      width="80"
                      height="70"
                      fill="transparent"
                      stroke={activeFrameSlot === idx ? "#3b82f6" : "transparent"}
                      strokeWidth="2.5"
                      rx="4"
                      className="cursor-pointer"
                      onClick={() => {
                        handleFrameSlotClick(idx);
                        if (!imgState || !imgState.url) {
                          setTimeout(() => onSelectPhoto(), 50);
                        }
                      }}
                    />
                    {renderFrameHandles(idx, 80, 70, cx, cy)}
                  </g>
                );
              })}
            </>
          )}

          {frameGrid === "mosaic" && (
            <>
              <rect x="140" y="140" width="120" height="120" fill="#e2e8f0" rx="4" />
              <rect x="65" y="85" width="65" height="65" fill="#e2e8f0" rx="4" />
              <rect x="270" y="85" width="65" height="65" fill="#e2e8f0" rx="4" />
              <rect x="65" y="250" width="65" height="65" fill="#e2e8f0" rx="4" />
              <rect x="270" y="250" width="65" height="65" fill="#e2e8f0" rx="4" />

              {[0, 1, 2, 3, 4].map((idx) => {
                const x = idx === 0 ? 140 : idx === 1 ? 65 : idx === 2 ? 270 : idx === 3 ? 65 : 270;
                const y = idx === 0 ? 140 : idx === 1 ? 85 : idx === 2 ? 85 : idx === 3 ? 250 : 250;
                const size = idx === 0 ? 120 : 65;
                const cx = x + size / 2;
                const cy = y + size / 2;
                const imgState = frameImages[idx];
                return (
                  <g key={idx}>
                    <g clipPath={`url(#frame-clip-mosaic-${idx})`}>
                      {imgState && imgState.url ? (
                        <image
                          href={imgState.url}
                          x={x - (size * (imgState.zoom - 1)) / 2}
                          y={y - (size * (imgState.zoom - 1)) / 2}
                          width={size * imgState.zoom}
                          height={size * imgState.zoom}
                          transform={`translate(${imgState.xOffset}, ${imgState.yOffset}) rotate(${imgState.rotation} ${cx} ${cy})`}
                          preserveAspectRatio="xMidYMid slice"
                          className="pointer-events-none"
                        />
                      ) : (
                        renderSlotPlaceholder(idx, x, y, size, size, cx, cy, `Slot ${idx + 1}`)
                      )}
                    </g>
                    <rect
                      x={x}
                      y={y}
                      width={size}
                      height={size}
                      fill="transparent"
                      stroke={activeFrameSlot === idx ? "#3b82f6" : "transparent"}
                      strokeWidth="2.5"
                      rx="4"
                      className="cursor-pointer"
                      onClick={() => {
                        handleFrameSlotClick(idx);
                        if (!imgState || !imgState.url) {
                          setTimeout(() => onSelectPhoto(), 50);
                        }
                      }}
                    />
                    {renderFrameHandles(idx, size, size, cx, cy)}
                  </g>
                );
              })}
            </>
          )}

          {frameGrid === "heart" && (
            <>
              <path d="M 200,165 C 200,165 212,142 228,155 C 244,168 236,192 200,222 C 164,192 156,168 172,155 C 188,142 200,165 200,165 Z" fill="#e2e8f0" />
              <rect x="65" y="85" width="65" height="65" fill="#e2e8f0" rx="4" />
              <rect x="270" y="85" width="65" height="65" fill="#e2e8f0" rx="4" />
              <rect x="65" y="250" width="65" height="65" fill="#e2e8f0" rx="4" />
              <rect x="270" y="250" width="65" height="65" fill="#e2e8f0" rx="4" />

              {[0, 1, 2, 3, 4].map((idx) => {
                const x = idx === 0 ? 140 : idx === 1 ? 65 : idx === 2 ? 270 : idx === 3 ? 65 : 270;
                const y = idx === 0 ? 140 : idx === 1 ? 85 : idx === 2 ? 85 : idx === 3 ? 250 : 250;
                const size = idx === 0 ? 120 : 65;
                const cx = idx === 0 ? 200 : x + size / 2;
                const cy = idx === 0 ? 190 : y + size / 2;
                const imgState = frameImages[idx];
                return (
                  <g key={idx}>
                    <g clipPath={idx === 0 ? "url(#frame-clip-heart-0)" : `url(#frame-clip-mosaic-${idx})`}>
                      {imgState && imgState.url ? (
                        <image
                          href={imgState.url}
                          x={x - (size * (imgState.zoom - 1)) / 2}
                          y={y - (size * (imgState.zoom - 1)) / 2}
                          width={size * imgState.zoom}
                          height={size * imgState.zoom}
                          transform={`translate(${imgState.xOffset}, ${imgState.yOffset}) rotate(${imgState.rotation} ${cx} ${cy})`}
                          preserveAspectRatio="xMidYMid slice"
                          className="pointer-events-none"
                        />
                      ) : (
                        renderSlotPlaceholder(idx, x, y, size, size, cx, cy, idx === 0 ? "Heart Slot" : `Slot ${idx + 1}`)
                      )}
                    </g>
                    {idx === 0 ? (
                      <path
                        d="M 200,165 C 200,165 212,142 228,155 C 244,168 236,192 200,222 C 164,192 156,168 172,155 C 188,142 200,165 200,165 Z"
                        fill="transparent"
                        stroke={activeFrameSlot === idx ? "#3b82f6" : "transparent"}
                        strokeWidth="2.5"
                        className="cursor-pointer"
                        onClick={() => {
                          handleFrameSlotClick(idx);
                          if (!imgState || !imgState.url) {
                            setTimeout(() => onSelectPhoto(), 50);
                          }
                        }}
                      />
                    ) : (
                      <rect
                        x={x}
                        y={y}
                        width={size}
                        height={size}
                        fill="transparent"
                        stroke={activeFrameSlot === idx ? "#3b82f6" : "transparent"}
                        strokeWidth="2.5"
                        rx="4"
                        className="cursor-pointer"
                        onClick={() => {
                          handleFrameSlotClick(idx);
                          if (!imgState || !imgState.url) {
                            setTimeout(() => onSelectPhoto(), 50);
                          }
                        }}
                      />
                    )}
                    {renderFrameHandles(idx, size, size, cx, cy)}
                  </g>
                );
              })}
            </>
          )}
        </svg>
      </div>
    </div>
  );
}
