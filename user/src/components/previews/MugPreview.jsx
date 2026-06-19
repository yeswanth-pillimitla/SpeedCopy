import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateSession } from "../../store/customizerSlice";

export default function MugPreview({ onSelectPhoto }) {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.customizer.sessions.mug);
  const svgRef = useRef(null);
  const dragStart = useRef(null);

  const mugImage = session.mugImage || { url: null, zoom: 1.0, xOffset: 0, yOffset: 0, rotation: 0 };
  const mugImages = session.mugImages || {
    0: { url: null, zoom: 1.0, xOffset: 0, yOffset: 0, rotation: 0 },
    1: { url: null, zoom: 1.0, xOffset: 0, yOffset: 0, rotation: 0 },
  };
  const activeMugSlot = session.activeMugSlot ?? 0;

  const mugImageRef = useRef(mugImage);
  const mugImagesRef = useRef(mugImages);
  const activeMugSlotRef = useRef(activeMugSlot);
  const mugDesignRef = useRef(session.mugDesign);

  useEffect(() => {
    mugImageRef.current = mugImage;
  }, [mugImage]);

  useEffect(() => {
    mugImagesRef.current = mugImages;
  }, [mugImages]);

  useEffect(() => {
    activeMugSlotRef.current = activeMugSlot;
  }, [activeMugSlot]);

  useEffect(() => {
    mugDesignRef.current = session.mugDesign;
  }, [session.mugDesign]);

  useEffect(() => {
    const handleWindowMouseMove = (e) => {
      if (dragStart.current) {
        handleGlobalDragMove(e);
      }
    };
    const handleWindowMouseUp = () => {
      if (dragStart.current) {
        handleGlobalDragEnd();
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
    mugDesign = "standard",
    mugColor = "#ffffff",
    mugInnerColor = "#ffffff",
    mugHandleColor = "#ffffff",
    mugTextColor = "#1e293b",
    mugSize = "11 Oz",
    mugText = "Upload Your Photo",
  } = session;

  const currentMugBodyColor = mugColor;
  const currentMugInnerColor = mugInnerColor;
  const currentMugHandleColor = mugHandleColor;

  const getMugSlotInfo = (design) => {
    if (design === "standard" || design === "inner-pink" || design === "black-mug") {
      return { x: 120, y: 115, width: 140, height: 130, cx: 190, cy: 180 };
    }
    if (design === "anniversary") {
      return { x: 125, y: 110, width: 130, height: 110, cx: 190, cy: 165 };
    }
    if (design === "heart-dual") {
      return { x: 110, y: 145, width: 70, height: 85, cx: 145, cy: 185 };
    }
    if (design === "birthday" || design === "yellow-smile") {
      return { x: 135, y: 110, width: 110, height: 110, cx: 190, cy: 165 };
    }
    if (design === "floral") {
      return { x: 120, y: 115, width: 140, height: 120, cx: 190, cy: 175 };
    }
    if (design === "balance") {
      return { x: 175, y: 120, width: 85, height: 90, cx: 217, cy: 165 };
    }
    if (design === "quote-block") {
      return { x: 125, y: 110, width: 130, height: 120, cx: 190, cy: 170 };
    }
    if (design === "valentine") {
      return { x: 130, y: 140, width: 120, height: 110, cx: 190, cy: 195 };
    }
    return { x: 100, y: 100, width: 180, height: 200, cx: 190, cy: 200 };
  };

  const getMugSlotInfoEx = (design, slotIdx) => {
    if (design === "heart-dual") {
      if (slotIdx === 0) {
        return { x: 110, y: 145, width: 70, height: 85, cx: 145, cy: 185 };
      } else {
        return { x: 200, y: 135, width: 70, height: 85, cx: 235, cy: 175 };
      }
    }
    return getMugSlotInfo(design);
  };

  const clearImage = () => {
    if (mugDesignRef.current === "heart-dual") {
      const slotIdx = activeMugSlotRef.current;
      dispatch(updateSession({
        productId: "mug",
        fields: {
          mugImages: {
            ...mugImagesRef.current,
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
  };

  const handleMugMoveStart = (e) => {
    const isHeartDual = mugDesignRef.current === "heart-dual";
    const imgState = isHeartDual
      ? mugImagesRef.current[activeMugSlotRef.current]
      : mugImageRef.current;

    if (!imgState.url) return;
    e.preventDefault();
    e.stopPropagation();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    dragStart.current = {
      type: "mug-move",
      startX: clientX,
      startY: clientY,
      startOffsetX: imgState.xOffset,
      startOffsetY: imgState.yOffset,
    };
  };

  const handleMugScaleStart = (e) => {
    const isHeartDual = mugDesignRef.current === "heart-dual";
    const imgState = isHeartDual
      ? mugImagesRef.current[activeMugSlotRef.current]
      : mugImageRef.current;

    if (!imgState.url) return;
    e.preventDefault();
    e.stopPropagation();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const rect = svgRef.current.getBoundingClientRect();
    const slotInfo = getMugSlotInfoEx(mugDesignRef.current, isHeartDual ? activeMugSlotRef.current : 0);
    const centerClientX = rect.left + (slotInfo.cx + imgState.xOffset) * (rect.width / 400);
    const centerClientY = rect.top + (slotInfo.cy + imgState.yOffset) * (rect.height / 400);
    const initialDist = Math.sqrt((clientX - centerClientX) ** 2 + (clientY - centerClientY) ** 2);
    dragStart.current = {
      type: "mug-scale",
      initialZoom: imgState.zoom,
      centerClientX,
      centerClientY,
      initialDist: initialDist || 1,
    };
  };

  const handleMugRotateStart = (e) => {
    const isHeartDual = mugDesignRef.current === "heart-dual";
    const imgState = isHeartDual
      ? mugImagesRef.current[activeMugSlotRef.current]
      : mugImageRef.current;

    if (!imgState.url) return;
    e.preventDefault();
    e.stopPropagation();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const rect = svgRef.current.getBoundingClientRect();
    const slotInfo = getMugSlotInfoEx(mugDesignRef.current, isHeartDual ? activeMugSlotRef.current : 0);
    const centerClientX = rect.left + (slotInfo.cx + imgState.xOffset) * (rect.width / 400);
    const centerClientY = rect.top + (slotInfo.cy + imgState.yOffset) * (rect.height / 400);
    const initialAngle = Math.atan2(clientY - centerClientY, clientX - centerClientX) * (180 / Math.PI);
    dragStart.current = {
      type: "mug-rotate",
      initialRotation: imgState.rotation,
      centerClientX,
      centerClientY,
      initialAngle,
    };
  };

  const handleGlobalDragMove = (e) => {
    if (!dragStart.current) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const { type } = dragStart.current;

    const isHeartDual = mugDesignRef.current === "heart-dual";
    const slotIdx = activeMugSlotRef.current;

    if (type === "mug-move") {
      const dx = clientX - dragStart.current.startX;
      const dy = clientY - dragStart.current.startY;
      const rect = svgRef.current.getBoundingClientRect();
      const scaleFactor = 400 / rect.width;

      if (isHeartDual) {
        dispatch(updateSession({
          productId: "mug",
          fields: {
            mugImages: {
              ...mugImagesRef.current,
              [slotIdx]: {
                ...mugImagesRef.current[slotIdx],
                xOffset: dragStart.current.startOffsetX + dx * scaleFactor,
                yOffset: dragStart.current.startOffsetY + dy * scaleFactor
              }
            }
          }
        }));
      } else {
        dispatch(updateSession({
          productId: "mug",
          fields: {
            mugImage: {
              ...mugImageRef.current,
              xOffset: dragStart.current.startOffsetX + dx * scaleFactor,
              yOffset: dragStart.current.startOffsetY + dy * scaleFactor
            }
          }
        }));
      }
    } else if (type === "mug-scale") {
      const dist = Math.sqrt((clientX - dragStart.current.centerClientX) ** 2 + (clientY - dragStart.current.centerClientY) ** 2);
      const ratio = dist / dragStart.current.initialDist;

      if (isHeartDual) {
        dispatch(updateSession({
          productId: "mug",
          fields: {
            mugImages: {
              ...mugImagesRef.current,
              [slotIdx]: {
                ...mugImagesRef.current[slotIdx],
                zoom: Math.max(0.05, dragStart.current.initialZoom * ratio)
              }
            }
          }
        }));
      } else {
        dispatch(updateSession({
          productId: "mug",
          fields: {
            mugImage: {
              ...mugImageRef.current,
              zoom: Math.max(0.05, dragStart.current.initialZoom * ratio)
            }
          }
        }));
      }
    } else if (type === "mug-rotate") {
      const angle = Math.atan2(clientY - dragStart.current.centerClientY, clientX - dragStart.current.centerClientX) * (180 / Math.PI);
      const deltaAngle = angle - dragStart.current.initialAngle;

      if (isHeartDual) {
        dispatch(updateSession({
          productId: "mug",
          fields: {
            mugImages: {
              ...mugImagesRef.current,
              [slotIdx]: {
                ...mugImagesRef.current[slotIdx],
                rotation: (dragStart.current.initialRotation + deltaAngle + 360) % 360
              }
            }
          }
        }));
      } else {
        dispatch(updateSession({
          productId: "mug",
          fields: {
            mugImage: {
              ...mugImageRef.current,
              rotation: (dragStart.current.initialRotation + deltaAngle + 360) % 360
            }
          }
        }));
      }
    }
  };

  const handleGlobalDragEnd = () => {
    dragStart.current = null;
  };

  const renderMugHandles = () => {
    const isHeartDual = mugDesign === "heart-dual";
    const imgState = isHeartDual
      ? mugImages[activeMugSlot] || { url: null, zoom: 1.0, xOffset: 0, yOffset: 0, rotation: 0 }
      : mugImage;

    if (!imgState.url) return null;
    const slotInfo = getMugSlotInfoEx(mugDesign, isHeartDual ? activeMugSlot : 0);
    const { width, height, cx, cy } = slotInfo;
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
          onMouseDown={handleMugMoveStart}
          onTouchStart={handleMugMoveStart}
        />
        <rect x={cx - (width * imgState.zoom) / 2 - 4} y={cy - (height * imgState.zoom) / 2 - 4} width="8" height="8" fill="#ffffff" stroke="#3b82f6" strokeWidth="1.2" className="cursor-nwse-resize pointer-events-auto" onMouseDown={handleMugScaleStart} onTouchStart={handleMugScaleStart} />
        <rect x={cx + (width * imgState.zoom) / 2 - 4} y={cy - (height * imgState.zoom) / 2 - 4} width="8" height="8" fill="#ffffff" stroke="#3b82f6" strokeWidth="1.2" className="cursor-nesw-resize pointer-events-auto" onMouseDown={handleMugScaleStart} onTouchStart={handleMugScaleStart} />
        <rect x={cx - (width * imgState.zoom) / 2 - 4} y={cy + (height * imgState.zoom) / 2 - 4} width="8" height="8" fill="#ffffff" stroke="#3b82f6" strokeWidth="1.2" className="cursor-nesw-resize pointer-events-auto" onMouseDown={handleMugScaleStart} onTouchStart={handleMugScaleStart} />
        <rect x={cx + (width * imgState.zoom) / 2 - 4} y={cy + (height * imgState.zoom) / 2 - 4} width="8" height="8" fill="#ffffff" stroke="#3b82f6" strokeWidth="1.2" className="cursor-nwse-resize pointer-events-auto" onMouseDown={handleMugScaleStart} onTouchStart={handleMugScaleStart} />
        <line x1={cx} y1={cy - (height * imgState.zoom) / 2} x2={cx} y2={cy - (height * imgState.zoom) / 2 - 20} stroke="#3b82f6" strokeWidth="1.2" strokeDasharray="2,2" />
        <circle cx={cx} cy={cy - (height * imgState.zoom) / 2 - 20} r="5" fill="#ffffff" stroke="#3b82f6" strokeWidth="1.2" className="cursor-alias pointer-events-auto" onMouseDown={handleMugRotateStart} onTouchStart={handleMugRotateStart} />
        <g
          className="cursor-pointer pointer-events-auto"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            clearImage();
          }}
        >
          <circle cx={cx + (width * imgState.zoom) / 2 + 8} cy={cy - (height * imgState.zoom) / 2 - 8} r="8" fill="#ef4444" stroke="#ffffff" strokeWidth="1.2" />
          <path d={`M ${cx + (width * imgState.zoom) / 2 + 5} ${cy - (height * imgState.zoom) / 2 - 11} L ${cx + (width * imgState.zoom) / 2 + 11} ${cy - (height * imgState.zoom) / 2 - 5} M ${cx + (width * imgState.zoom) / 2 + 11} ${cy - (height * imgState.zoom) / 2 - 11} L ${cx + (width * imgState.zoom) / 2 + 5} ${cy - (height * imgState.zoom) / 2 - 5}`} stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      </g>
    );
  };

  const getMugScale = () => {
    if (mugSize === "11 Oz") return "scale-92";
    return "scale-100";
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className={`w-full max-w-[340px] transition-transform duration-500 ease-out transform ${getMugScale()}`}>
        <svg
          ref={svgRef}
          viewBox="0 0 400 400"
          className="w-full"
        >
          <defs>
            <linearGradient id="mug-shading" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#000000" stopOpacity="0.32" />
              <stop offset="3%" stopColor="#000000" stopOpacity="0.22" />
              <stop offset="12%" stopColor="#ffffff" stopOpacity="0.35" />
              <stop offset="20%" stopColor="#ffffff" stopOpacity="0.48" />
              <stop offset="32%" stopColor="#ffffff" stopOpacity="0.08" />
              <stop offset="55%" stopColor="#000000" stopOpacity="0.0" />
              <stop offset="85%" stopColor="#000000" stopOpacity="0.08" />
              <stop offset="96%" stopColor="#000000" stopOpacity="0.24" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.42" />
            </linearGradient>

            <linearGradient id="handle-shading" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
              <stop offset="40%" stopColor="#000000" stopOpacity="0.0" />
              <stop offset="80%" stopColor="#000000" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.32" />
            </linearGradient>

            <radialGradient id="inner-shadow" cx="50%" cy="30%" r="50%">
              <stop offset="0%" stopColor="#000000" stopOpacity="0.65" />
              <stop offset="70%" stopColor="#000000" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.0" />
            </radialGradient>

            <filter id="shadow-blur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" />
            </filter>

            <clipPath id="mug-clip-rect">
              <path d="M 100,100 A 90,12 0 0,0 280,100 L 280,290 A 90,15 0 0,1 100,290 Z" />
            </clipPath>
            <clipPath id="mug-clip-poly">
              <polygon points="102,102 278,102 248,298 132,298" />
            </clipPath>
            <clipPath id="mug-photo-standard">
              <rect x="120" y="115" width="140" height="130" rx="8" />
            </clipPath>
            <clipPath id="mug-photo-anniversary">
              <ellipse cx="190" cy="165" rx="65" ry="55" />
            </clipPath>
            <clipPath id="mug-photo-heart-left">
              <path d="M 145,170 C 145,170 160,145 175,160 C 190,175 180,200 145,230 C 110,200 100,175 115,160 C 130,145 145,170 145,170 Z" />
            </clipPath>
            <clipPath id="mug-photo-heart-right">
              <path d="M 235,160 C 235,160 250,135 265,150 C 280,165 270,190 235,220 C 200,190 190,165 205,150 C 220,135 235,160 235,160 Z" />
            </clipPath>
            <clipPath id="mug-photo-circle">
              <circle cx="190" cy="165" r="55" />
            </clipPath>
            <clipPath id="mug-photo-floral">
              <rect x="120" y="115" width="140" height="120" rx="4" />
            </clipPath>
            <clipPath id="mug-photo-balance">
              <rect x="175" y="120" width="85" height="90" />
            </clipPath>
            <clipPath id="mug-photo-quote">
              <rect x="125" y="110" width="130" height="120" rx="15" />
            </clipPath>
            <clipPath id="mug-photo-valentine">
              <path d="M 190,175 C 190,175 210,140 230,160 C 250,180 240,215 190,250 C 140,215 130,180 150,160 C 170,140 190,175 190,175 Z" />
            </clipPath>
          </defs>

          {/* Base Mug soft drop shadow */}
          <ellipse cx="190" cy="308" rx="85" ry="10" fill="rgba(15,23,42,0.12)" filter="url(#shadow-blur)" pointerEvents="none" />

          {/* 3D Tubular Handle */}
          <g pointerEvents="none">
            {/* Handle shadow on background */}
            <path
              d="M 275,145 C 320,145 340,170 340,200 C 340,230 320,255 275,255"
              fill="none"
              stroke="rgba(15,23,42,0.15)"
              strokeWidth="20"
              strokeLinecap="round"
              filter="url(#shadow-blur)"
            />
            {/* Handle base color */}
            <path
              d="M 280,140 C 330,140 350,170 350,200 C 350,230 330,260 280,260"
              fill="none"
              stroke={currentMugHandleColor}
              strokeWidth="22"
              strokeLinecap="round"
            />
            {/* Handle 3D gradient shading */}
            <path
              d="M 280,140 C 330,140 350,170 350,200 C 350,230 330,260 280,260"
              fill="none"
              stroke="url(#handle-shading)"
              strokeWidth="22"
              strokeLinecap="round"
            />
            {/* Handle glossy specular highlight */}
            <path
              d="M 282,143 C 325,143 342,170 342,200 C 342,230 325,257 282,257"
              fill="none"
              stroke="rgba(255,255,255,0.45)"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </g>

          {/* Base Mug Body */}
          <path
            d="M 100,100 A 90,12 0 0,0 280,100 L 280,290 A 90,15 0 0,1 100,290 Z"
            fill={currentMugBodyColor}
          />

          {/* Inner Hollow Cavity */}
          <ellipse cx="190" cy="100" rx="90" ry="12" fill={currentMugInnerColor} />
          {/* Inner depth shading shadow */}
          <ellipse cx="190" cy="100" rx="90" ry="12" fill="url(#inner-shadow)" opacity="0.5" pointerEvents="none" />
          {/* Inner rim border highlight */}
          <ellipse cx="190" cy="100" rx="90" ry="12" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" pointerEvents="none" />

          <g clipPath={mugDesign === "vshape" ? "url(#mug-clip-poly)" : "url(#mug-clip-rect)"}>
            {(mugDesign === "standard" || mugDesign === "inner-pink" || mugDesign === "black-mug") && (
              <>
                {mugImage.url ? (
                  <g clipPath="url(#mug-photo-standard)">
                    <image
                      href={mugImage.url}
                      x={120 - (140 * (mugImage.zoom - 1)) / 2}
                      y={115 - (130 * (mugImage.zoom - 1)) / 2}
                      width={140 * mugImage.zoom}
                      height={130 * mugImage.zoom}
                      transform={`translate(${mugImage.xOffset}, ${mugImage.yOffset}) rotate(${mugImage.rotation} 190 180)`}
                      preserveAspectRatio="xMidYMid slice"
                    />
                  </g>
                ) : (
                  <g className="cursor-pointer" onClick={onSelectPhoto}>
                    <rect x="120" y="115" width="140" height="130" rx="8" fill="#f8fafc" opacity="0.4" />
                    <text x="190" y="185" textAnchor="middle" fill="#64748b" className="text-[10px] font-bold">Click to Upload</text>
                  </g>
                )}
                {mugDesign === "standard" && (
                  <rect x="120" y="115" width="140" height="130" rx="8" fill="none" stroke="#cbd5e1" strokeWidth="3" />
                )}
                {mugDesign === "inner-pink" && (
                  <>
                    <rect x="120" y="115" width="140" height="130" rx="8" fill="none" stroke="#f472b6" strokeWidth="4" />
                    <path d="M 110,130 C 110,130 113,124 116,127 C 119,130 116,136 110,142 C 104,136 101,130 104,127 C 107,124 110,130 110,130 Z" fill="#f472b6" />
                    <path d="M 270,130 C 270,130 273,124 276,127 C 279,130 276,136 270,142 C 264,136 261,130 264,127 C 267,124 270,130 270,130 Z" fill="#f472b6" />
                  </>
                )}
                {mugDesign === "black-mug" && (
                  <rect x="120" y="115" width="140" height="130" rx="8" fill="none" stroke="#d4af37" strokeWidth="4" />
                )}
              </>
            )}

            {mugDesign === "anniversary" && (
              <>
                <rect x="100" y="100" width="180" height="200" fill="#faf5ff" />
                <circle cx="175" cy="235" r="16" fill="none" stroke="#d4af37" strokeWidth="2.5" opacity="0.6" />
                <circle cx="205" cy="235" r="16" fill="none" stroke="#d4af37" strokeWidth="2.5" opacity="0.6" />
                {mugImage.url ? (
                  <g clipPath="url(#mug-photo-anniversary)">
                    <image
                      href={mugImage.url}
                      x={125 - (130 * (mugImage.zoom - 1)) / 2}
                      y={110 - (110 * (mugImage.zoom - 1)) / 2}
                      width={130 * mugImage.zoom}
                      height={110 * mugImage.zoom}
                      transform={`translate(${mugImage.xOffset}, ${mugImage.yOffset}) rotate(${mugImage.rotation} 190 165)`}
                      preserveAspectRatio="xMidYMid slice"
                    />
                  </g>
                ) : (
                  <g className="cursor-pointer" onClick={onSelectPhoto}>
                    <ellipse cx="190" cy="165" rx="65" ry="55" fill="#f3e8ff" opacity="0.6" />
                    <text x="190" y="170" textAnchor="middle" fill="#701a75" className="text-[10px] font-bold">Click to Upload</text>
                  </g>
                )}
                <ellipse cx="190" cy="165" rx="65" ry="55" fill="none" stroke="#d4af37" strokeWidth="3" />
              </>
            )}

            {mugDesign === "heart-dual" && (
              <>
                <rect x="100" y="100" width="180" height="200" fill="#fff1f2" />
                <path d="M 110,130 C 110,130 113,124 116,127 C 119,130 116,136 110,142 C 104,136 101,130 104,127 C 107,124 110,130 110,130 Z" fill="#fda4af" />
                <path d="M 270,130 C 270,130 273,124 276,127 C 279,130 276,136 270,142 C 264,136 261,130 264,127 C 267,124 270,130 270,130 Z" fill="#fda4af" />

                {/* Left Heart Slot */}
                {mugImages[0] && mugImages[0].url ? (
                  <g clipPath="url(#mug-photo-heart-left)">
                    <image
                      href={mugImages[0].url}
                      x={110 - (70 * (mugImages[0].zoom - 1)) / 2}
                      y={145 - (85 * (mugImages[0].zoom - 1)) / 2}
                      width={70 * mugImages[0].zoom}
                      height={85 * mugImages[0].zoom}
                      transform={`translate(${mugImages[0].xOffset}, ${mugImages[0].yOffset}) rotate(${mugImages[0].rotation} 145 185)`}
                      preserveAspectRatio="xMidYMid slice"
                    />
                  </g>
                ) : (
                  <g className="cursor-pointer" onClick={() => {
                    dispatch(updateSession({ productId: "mug", fields: { activeMugSlot: 0 } }));
                    setTimeout(() => onSelectPhoto(), 50);
                  }}>
                    <path d="M 145,170 C 145,170 160,145 175,160 C 190,175 180,200 145,230 C 110,200 100,175 115,160 C 130,145 145,170 145,170 Z" fill="#ffe4e6" />
                    <text x="145" y="190" textAnchor="middle" fill="#be185d" className="text-[7px] font-bold pointer-events-none">Upload 1</text>
                  </g>
                )}

                {/* Right Heart Slot */}
                {mugImages[1] && mugImages[1].url ? (
                  <g clipPath="url(#mug-photo-heart-right)">
                    <image
                      href={mugImages[1].url}
                      x={200 - (70 * (mugImages[1].zoom - 1)) / 2}
                      y={135 - (85 * (mugImages[1].zoom - 1)) / 2}
                      width={70 * mugImages[1].zoom}
                      height={85 * mugImages[1].zoom}
                      transform={`translate(${mugImages[1].xOffset}, ${mugImages[1].yOffset}) rotate(${mugImages[1].rotation} 235 175)`}
                      preserveAspectRatio="xMidYMid slice"
                    />
                  </g>
                ) : (
                  <g className="cursor-pointer" onClick={() => {
                    dispatch(updateSession({ productId: "mug", fields: { activeMugSlot: 1 } }));
                    setTimeout(() => onSelectPhoto(), 50);
                  }}>
                    <path d="M 235,160 C 235,160 250,135 265,150 C 280,165 270,190 235,220 C 200,190 190,165 205,150 C 220,135 235,160 235,160 Z" fill="#ffe4e6" />
                    <text x="235" y="180" textAnchor="middle" fill="#be185d" className="text-[7px] font-bold pointer-events-none">Upload 2</text>
                  </g>
                )}

                {/* Border outlines with active selection styles */}
                 <path
                  d="M 145,170 C 145,170 160,145 175,160 C 190,175 180,200 145,230 C 110,200 100,175 115,160 C 130,145 145,170 145,170 Z"
                  fill="transparent"
                  stroke={activeMugSlot === 0 ? "#3b82f6" : "#f43f5e"}
                  strokeWidth={activeMugSlot === 0 ? "3.5" : "2"}
                  className="cursor-pointer"
                  onClick={() => {
                    dispatch(updateSession({ productId: "mug", fields: { activeMugSlot: 0 } }));
                    const hasImg = mugImages[0] && mugImages[0].url;
                    if (!hasImg) {
                      setTimeout(() => onSelectPhoto(), 50);
                    }
                  }}
                />
                <path
                  d="M 235,160 C 235,160 250,135 265,150 C 280,165 270,190 235,220 C 200,190 190,165 205,150 C 220,135 235,160 235,160 Z"
                  fill="transparent"
                  stroke={activeMugSlot === 1 ? "#3b82f6" : "#f43f5e"}
                  strokeWidth={activeMugSlot === 1 ? "3.5" : "2"}
                  className="cursor-pointer"
                  onClick={() => {
                    dispatch(updateSession({ productId: "mug", fields: { activeMugSlot: 1 } }));
                    const hasImg = mugImages[1] && mugImages[1].url;
                    if (!hasImg) {
                      setTimeout(() => onSelectPhoto(), 50);
                    }
                  }}
                />
              </>
            )}

            {mugDesign === "birthday" && (
              <>
                <rect x="100" y="100" width="180" height="200" fill="#f0f9ff" />
                <ellipse cx="120" cy="140" rx="10" ry="14" fill="#f43f5e" />
                <path d="M 120,154 Q 115,170 120,180" fill="none" stroke="#94a3b8" strokeWidth="1" />
                <ellipse cx="260" cy="130" rx="10" ry="14" fill="#3b82f6" />
                <path d="M 260,144 Q 265,160 260,170" fill="none" stroke="#94a3b8" strokeWidth="1" />
                <circle cx="110" cy="115" r="3" fill="#fbbf24" />
                <circle cx="270" cy="110" r="4" fill="#34d399" />
                <circle cx="140" cy="220" r="2.5" fill="#f472b6" />
                {mugImage.url ? (
                  <g clipPath="url(#mug-photo-circle)">
                    <image
                      href={mugImage.url}
                      x={135 - (110 * (mugImage.zoom - 1)) / 2}
                      y={110 - (110 * (mugImage.zoom - 1)) / 2}
                      width={110 * mugImage.zoom}
                      height={110 * mugImage.zoom}
                      transform={`translate(${mugImage.xOffset}, ${mugImage.yOffset}) rotate(${mugImage.rotation} 190 165)`}
                      preserveAspectRatio="xMidYMid slice"
                    />
                  </g>
                ) : (
                  <g className="cursor-pointer" onClick={onSelectPhoto}>
                    <circle cx="190" cy="165" r="55" fill="#e0f2fe" opacity="0.6" />
                    <text x="190" y="170" textAnchor="middle" fill="#0369a1" className="text-[10px] font-bold">Click to Upload</text>
                  </g>
                )}
                <circle cx="190" cy="165" r="55" fill="none" stroke="#3b82f6" strokeWidth="4" />
              </>
            )}

            {mugDesign === "floral" && (
              <>
                <rect x="100" y="100" width="180" height="200" fill="#fafaf9" />
                <circle cx="120" cy="115" r="8" fill="#f472b6" opacity="0.9" />
                <circle cx="120" cy="115" r="4" fill="#fef08a" />
                <circle cx="260" cy="235" r="8" fill="#f472b6" opacity="0.9" />
                <circle cx="260" cy="235" r="4" fill="#fef08a" />
                <ellipse cx="110" cy="120" rx="3" ry="6" fill="#86efac" transform="rotate(-30 110 120)" />
                <ellipse cx="270" cy="230" rx="3" ry="6" fill="#86efac" transform="rotate(30 270 230)" />
                {mugImage.url ? (
                  <g clipPath="url(#mug-photo-floral)">
                    <image
                      href={mugImage.url}
                      x={120 - (140 * (mugImage.zoom - 1)) / 2}
                      y={115 - (120 * (mugImage.zoom - 1)) / 2}
                      width={140 * mugImage.zoom}
                      height={120 * mugImage.zoom}
                      transform={`translate(${mugImage.xOffset}, ${mugImage.yOffset}) rotate(${mugImage.rotation} 190 175)`}
                      preserveAspectRatio="xMidYMid slice"
                    />
                  </g>
                ) : (
                  <g className="cursor-pointer" onClick={onSelectPhoto}>
                    <rect x="120" y="115" width="140" height="120" rx="4" fill="#f5f5f4" opacity="0.6" />
                    <text x="190" y="180" textAnchor="middle" fill="#9d174d" className="text-[10px] font-bold">Click to Upload</text>
                  </g>
                )}
                <rect x="120" y="115" width="140" height="120" rx="4" fill="none" stroke="#be185d" strokeWidth="3" />
              </>
            )}

            {mugDesign === "balance" && (
              <>
                <rect x="100" y="100" width="180" height="200" fill="#f8fafc" />
                <circle cx="120" cy="205" r="14" fill="none" stroke="#64748b" strokeWidth="2" />
                <circle cx="150" cy="205" r="14" fill="none" stroke="#64748b" strokeWidth="2" />
                <line x1="120" y1="205" x2="135" y2="190" stroke="#64748b" strokeWidth="2" />
                <line x1="135" y1="190" x2="150" y2="205" stroke="#64748b" strokeWidth="2" />
                <line x1="135" y1="190" x2="132" y2="178" stroke="#64748b" strokeWidth="2" />
                <line x1="130" y1="178" x2="138" y2="178" stroke="#64748b" strokeWidth="3" />
                <line x1="150" y1="205" x2="146" y2="182" stroke="#64748b" strokeWidth="2" />
                <line x1="142" y1="182" x2="150" y2="182" stroke="#64748b" strokeWidth="3" />
                <rect x="171" y="116" width="93" height="110" rx="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
                {mugImage.url ? (
                  <g clipPath="url(#mug-photo-balance)">
                    <image
                      href={mugImage.url}
                      x={175 - (85 * (mugImage.zoom - 1)) / 2}
                      y={120 - (90 * (mugImage.zoom - 1)) / 2}
                      width={85 * mugImage.zoom}
                      height={90 * mugImage.zoom}
                      transform={`translate(${mugImage.xOffset}, ${mugImage.yOffset}) rotate(${mugImage.rotation} 217 165)`}
                      preserveAspectRatio="xMidYMid slice"
                    />
                  </g>
                ) : (
                  <g className="cursor-pointer" onClick={onSelectPhoto}>
                    <rect x="175" y="120" width="85" height="90" fill="#f1f5f9" />
                    <text x="217" y="170" textAnchor="middle" fill="#475569" className="text-[8px] font-bold">Upload</text>
                  </g>
                )}
                <rect x="175" y="120" width="85" height="90" fill="none" stroke="#e2e8f0" strokeWidth="1.5" />
              </>
            )}

            {mugDesign === "yellow-smile" && (
              <>
                <rect x="100" y="100" width="180" height="200" fill="#fef08a" />
                <circle cx="120" cy="130" r="10" fill="#eab308" />
                <circle cx="117" cy="128" r="1.5" fill="#000000" />
                <circle cx="123" cy="128" r="1.5" fill="#000000" />
                <path d="M 116,132 Q 120,136 124,132" fill="none" stroke="#000000" strokeWidth="1" />
                <circle cx="260" cy="130" r="10" fill="#eab308" />
                <circle cx="257" cy="128" r="1.5" fill="#000000" />
                <circle cx="263" cy="128" r="1.5" fill="#000000" />
                <path d="M 256,132 Q 260,136 264,132" fill="none" stroke="#000000" strokeWidth="1" />
                {mugImage.url ? (
                  <g clipPath="url(#mug-photo-circle)">
                    <image
                      href={mugImage.url}
                      x={135 - (110 * (mugImage.zoom - 1)) / 2}
                      y={110 - (110 * (mugImage.zoom - 1)) / 2}
                      width={110 * mugImage.zoom}
                      height={110 * mugImage.zoom}
                      transform={`translate(${mugImage.xOffset}, ${mugImage.yOffset}) rotate(${mugImage.rotation} 190 165)`}
                      preserveAspectRatio="xMidYMid slice"
                    />
                  </g>
                ) : (
                  <g className="cursor-pointer" onClick={onSelectPhoto}>
                    <circle cx="190" cy="165" r="55" fill="#fef9c3" opacity="0.6" />
                    <text x="190" y="170" textAnchor="middle" fill="#854d0e" className="text-[10px] font-bold">Click to Upload</text>
                  </g>
                )}
                <circle cx="190" cy="165" r="55" fill="none" stroke="#ca8a04" strokeWidth="4" />
              </>
            )}

            {mugDesign === "quote-block" && (
              <>
                <rect x="100" y="100" width="180" height="200" fill="#fafaf9" />
                <path d="M 110,120 L 110,110 L 120,110" fill="none" stroke="#44403c" strokeWidth="2" />
                <path d="M 270,200 L 270,210 L 260,210" fill="none" stroke="#44403c" strokeWidth="2" />
                {mugImage.url ? (
                  <g clipPath="url(#mug-photo-quote)">
                    <image
                      href={mugImage.url}
                      x={125 - (130 * (mugImage.zoom - 1)) / 2}
                      y={110 - (120 * (mugImage.zoom - 1)) / 2}
                      width={130 * mugImage.zoom}
                      height={120 * mugImage.zoom}
                      transform={`translate(${mugImage.xOffset}, ${mugImage.yOffset}) rotate(${mugImage.rotation} 190 170)`}
                      preserveAspectRatio="xMidYMid slice"
                    />
                  </g>
                ) : (
                  <g className="cursor-pointer" onClick={onSelectPhoto}>
                    <rect x="125" y="110" width="130" height="120" rx="15" fill="#f5f5f4" opacity="0.6" />
                    <text x="190" y="175" textAnchor="middle" fill="#44403c" className="text-[10px] font-bold">Click to Upload</text>
                  </g>
                )}
                <rect x="125" y="110" width="130" height="120" rx="15" fill="none" stroke="#44403c" strokeWidth="3" />
              </>
            )}

            {mugDesign === "valentine" && (
              <>
                <rect x="100" y="100" width="180" height="200" fill="#fff1f2" />
                <path d="M 120,140 C 120,140 125,130 130,135 C 135,140 130,150 120,160 C 110,150 105,140 110,135 C 115,130 120,140 120,140 Z" fill="#f43f5e" opacity="0.6" />
                <path d="M 260,140 C 260,140 265,130 270,135 C 275,140 270,150 260,160 C 250,150 245,140 250,135 C 255,130 260,140 260,140 Z" fill="#f43f5e" opacity="0.6" />
                {mugImage.url ? (
                  <g clipPath="url(#mug-photo-valentine)">
                    <image
                      href={mugImage.url}
                      x={130 - (120 * (mugImage.zoom - 1)) / 2}
                      y={140 - (110 * (mugImage.zoom - 1)) / 2}
                      width={120 * mugImage.zoom}
                      height={110 * mugImage.zoom}
                      transform={`translate(${mugImage.xOffset}, ${mugImage.yOffset}) rotate(${mugImage.rotation} 190 195)`}
                      preserveAspectRatio="xMidYMid slice"
                    />
                  </g>
                ) : (
                  <g className="cursor-pointer" onClick={onSelectPhoto}>
                    <path d="M 190,175 C 190,175 210,140 230,160 C 250,180 240,215 190,250 C 140,215 130,180 150,160 C 170,140 190,175 190,175 Z" fill="#ffe4e6" />
                    <text x="190" y="195" textAnchor="middle" fill="#e11d48" className="text-[10px] font-bold">Click to Upload</text>
                  </g>
                )}
                <path d="M 190,175 C 190,175 210,140 230,160 C 250,180 240,215 190,250 C 140,215 130,180 150,160 C 170,140 190,175 190,175 Z" fill="none" stroke="#e11d48" strokeWidth="4" />
              </>
            )}

            {!(["standard", "inner-pink", "black-mug", "anniversary", "heart-dual", "birthday", "floral", "balance", "yellow-smile", "quote-block", "valentine"].includes(mugDesign)) && (
              <>
                {mugImage.url ? (
                  <image
                    href={mugImage.url}
                    x={100 - (180 * (mugImage.zoom - 1)) / 2}
                    y={100 - (200 * (mugImage.zoom - 1)) / 2}
                    width={180 * mugImage.zoom}
                    height={200 * mugImage.zoom}
                    transform={`translate(${mugImage.xOffset}, ${mugImage.yOffset}) rotate(${mugImage.rotation} 190 200)`}
                    preserveAspectRatio="xMidYMid slice"
                  />
                ) : (
                  <g className="cursor-pointer" onClick={onSelectPhoto}>
                    <rect x="100" y="100" width="180" height="200" fill="#f8fafc" opacity="0.15" />
                  </g>
                )}
              </>
            )}
          </g>

          {/* Cylindrical 3D Lighting & Reflection overlay */}
          <path
            d="M 100,100 A 90,12 0 0,0 280,100 L 280,290 A 90,15 0 0,1 100,290 Z"
            fill="url(#mug-shading)"
            pointerEvents="none"
          />

          {/* Rim lip highlight outline */}
          <path
            d="M 100,100 A 90,12 0 0,0 280,100"
            fill="none"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="1.5"
            pointerEvents="none"
          />
          {/* Thin outer edge contact shadow outline */}
          <path
            d="M 100,100 A 90,12 0 0,0 280,100 L 280,290 A 90,15 0 0,1 100,290 Z"
            fill="none"
            stroke="rgba(15,23,42,0.15)"
            strokeWidth="1.2"
            pointerEvents="none"
          />

          {mugText && (
            <text x="190" y="270" textAnchor="middle" fill={mugTextColor} className="font-heading font-black text-xs drop-shadow-[0_1px_1.5px_rgba(255,255,255,0.8)]">
              {mugText}
            </text>
          )}
          {renderMugHandles()}
        </svg>
      </div>
    </div>
  );
}
