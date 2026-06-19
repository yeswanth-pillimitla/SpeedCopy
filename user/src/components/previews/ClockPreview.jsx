import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateSession } from "../../store/customizerSlice";

export default function ClockPreview({ onSelectPhoto, onRemovePhoto, customSession }) {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.customizer.sessions.clock);

  const [time, setTime] = useState(new Date());
  const svgRef = useRef(null);
  const dragStart = useRef(null);

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

  const activeSession = customSession || session;
  const isCustomizer = !customSession;

  const {
    shape = "circle",
    size = '12" x 12"',
    image = null,
    zoom = 1.0,
    xOffset = 0,
    yOffset = 0,
    rotation = 0,
    dialType = "numbers",
    numberColor = "#000000",
    numberFont = "Inter",
    handColor = "#d4af37",
    handMovement = "sweep",
    text = "",
    textColor = "#000000",
    textFont = "Inter",
    textSize = 20,
    textPosition = 70,
  } = activeSession;

  useEffect(() => {
    let animId;
    const update = () => {
      setTime(new Date());
      animId = requestAnimationFrame(update);
    };
    if (handMovement !== "static") {
      animId = requestAnimationFrame(update);
    }
    return () => cancelAnimationFrame(animId);
  }, [handMovement]);

  const numbers = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const romanNumerals = ["XII", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI"];

  const getNumberCoords = (index, radiusOverride) => {
    let rx = 138;
    let ry = 138;

    if (shape === "oval") {
      rx = 100;
      ry = 138;
    } else if (shape === "heart") {
      rx = 105;
      ry = 105;
    } else if (shape === "star") {
      rx = 112;
      ry = 112;
    } else if (shape === "inward-square") {
      rx = 120;
      ry = 120;
    } else if (shape === "curved-edges") {
      rx = 132;
      ry = 132;
    } else if (shape === "wavy") {
      rx = 128;
      ry = 128;
    } else {
      rx = 138;
      ry = 138;
    }

    if (radiusOverride !== undefined) {
      const factor = radiusOverride / 138;
      rx *= factor;
      ry *= factor;
    }

    const angle = ((index * 30 - 90) * Math.PI) / 180;
    let x = 200 + rx * Math.cos(angle);
    let y = 200 + ry * Math.sin(angle);

    if (shape === "heart") {
      if (index === 0) {
        y += 18;
      } else if (index === 1 || index === 11) {
        y += 12;
      } else if (index === 5 || index === 7) {
        y -= 10;
      } else if (index === 6) {
        y -= 25;
      }
    }

    return { x, y };
  };

  const getHandAngles = () => {
    if (handMovement === "static") {
      return { hour: 305, minute: 60, second: 180 };
    }
    const hrs = time.getHours();
    const mins = time.getMinutes();
    const secs = time.getSeconds();
    const ms = time.getMilliseconds();

    const secondAngle = handMovement === "sweep"
      ? (secs * 6) + (ms * 0.006)
      : secs * 6;
    const minuteAngle = (mins * 6) + (secs * 0.1);
    const hourAngle = ((hrs % 12) * 30) + (mins * 0.5);

    return { hour: hourAngle, minute: minuteAngle, second: secondAngle };
  };

  const angles = getHandAngles();

  const handleMoveStart = (e) => {
    if (!isCustomizer || !image) return;
    e.preventDefault();
    e.stopPropagation();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    dragStart.current = {
      type: "move",
      startX: clientX,
      startY: clientY,
      startOffsetX: xOffset,
      startOffsetY: yOffset,
    };
  };

  const handleScaleStart = (e) => {
    if (!isCustomizer || !image) return;
    e.preventDefault();
    e.stopPropagation();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const rect = svgRef.current.getBoundingClientRect();
    const centerClientX = rect.left + (200 + xOffset) * (rect.width / 400);
    const centerClientY = rect.top + (200 + yOffset) * (rect.height / 400);
    const initialDist = Math.sqrt((clientX - centerClientX) ** 2 + (clientY - centerClientY) ** 2);

    dragStart.current = {
      type: "scale",
      initialZoom: zoom,
      centerClientX,
      centerClientY,
      initialDist,
    };
  };

  const handleRotateStart = (e) => {
    if (!isCustomizer || !image) return;
    e.preventDefault();
    e.stopPropagation();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const rect = svgRef.current.getBoundingClientRect();
    const centerClientX = rect.left + (200 + xOffset) * (rect.width / 400);
    const centerClientY = rect.top + (200 + yOffset) * (rect.height / 400);
    const initialAngle = Math.atan2(clientY - centerClientY, clientX - centerClientX) * (180 / Math.PI);

    dragStart.current = {
      type: "rotate",
      initialRotation: rotation,
      centerClientX,
      centerClientY,
      initialAngle,
    };
  };

  const handleGlobalDragMove = (e) => {
    if (!dragStart.current) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    if (dragStart.current.type === "move") {
      const dx = clientX - dragStart.current.startX;
      const dy = clientY - dragStart.current.startY;
      const rect = svgRef.current.getBoundingClientRect();
      const scaleFactor = 400 / rect.width;
      dispatch(updateSession({
        productId: "clock",
        fields: {
          xOffset: dragStart.current.startOffsetX + dx * scaleFactor,
          yOffset: dragStart.current.startOffsetY + dy * scaleFactor
        }
      }));
    } else if (dragStart.current.type === "scale") {
      const dist = Math.sqrt((clientX - dragStart.current.centerClientX) ** 2 + (clientY - dragStart.current.centerClientY) ** 2);
      const ratio = dist / dragStart.current.initialDist;
      dispatch(updateSession({
        productId: "clock",
        fields: {
          zoom: Math.max(0.05, dragStart.current.initialZoom * ratio)
        }
      }));
    } else if (dragStart.current.type === "rotate") {
      const angle = Math.atan2(clientY - dragStart.current.centerClientY, clientX - dragStart.current.centerClientX) * (180 / Math.PI);
      const deltaAngle = angle - dragStart.current.initialAngle;
      dispatch(updateSession({
        productId: "clock",
        fields: {
          rotation: (dragStart.current.initialRotation + deltaAngle + 360) % 360
        }
      }));
    }
  };

  const handleGlobalDragEnd = () => {
    dragStart.current = null;
  };

  const getWatermark = () => {
    if (image) return null;
    return (
      <g className="pointer-events-none select-none" pointerEvents="none">
        <path
          d="M 175,160 L 225,160 L 225,200 L 175,200 Z M 180,170 L 195,185 L 205,175 L 220,190 L 180,190 Z"
          className="fill-slate-300 stroke-slate-400 stroke-2"
        />
        <circle cx="212" cy="172" r="4" className="fill-slate-400" />
        <text
          x="200"
          y="235"
          textAnchor="middle"
          className="fill-slate-400 font-sans text-[11px] font-bold tracking-widest uppercase"
        >
          Select Photo
        </text>
      </g>
    );
  };

  const getVisualScale = () => {
    if (size === '8" x 8"') return "scale-75";
    if (size === '12" x 12"') return "scale-90";
    return "scale-100";
  };

  const imageWidth = 360 * zoom;
  const imageHeight = 360 * zoom;
  const left = 200 - imageWidth / 2;
  const right = 200 + imageWidth / 2;
  const top = 200 - imageHeight / 2;
  const bottom = 200 + imageHeight / 2;

  return (
    <div className="relative aspect-square w-full flex items-center justify-center p-4 select-none">
      <svg
        ref={svgRef}
        viewBox="0 0 400 400"
        className={`w-full h-full ${getVisualScale()}`}
      >
          <defs>
            <clipPath id="shape-circle">
              <circle cx="200" cy="200" r="180" />
            </clipPath>
            <clipPath id="shape-square">
              <rect x="25" y="25" width="350" height="350" rx="16" ry="16" />
            </clipPath>
            <clipPath id="shape-squircle">
              <path d="M 120 25 L 280 25 C 345 25, 375 55, 375 120 L 375 280 C 375 345, 345 375, 280 375 L 120 375 C 55 375, 25 345, 25 280 L 25 120 C 25 55, 55 25, 120 25 Z" />
            </clipPath>
            <clipPath id="shape-curved-edges">
              <path d="M 120 25 L 375 25 L 375 280 C 375 345, 345 375, 280 375 L 25 375 L 25 120 C 25 55, 55 25, 120 25 Z" />
            </clipPath>
            <clipPath id="shape-heart">
              <path d="M 200,95 C 200,95 270,20 335,75 C 400,130, 390,225, 200,365 C 10,225, 0,130, 65,75 C 130,20, 200,95, 200,95 Z" />
            </clipPath>
            <clipPath id="shape-oval">
              <ellipse cx="200" cy="200" rx="135" ry="175" />
            </clipPath>
            <clipPath id="shape-wavy">
              <path d="M 100,30 Q 150,15 200,30 Q 250,15 300,30 Q 355,50 370,100 Q 385,150 370,200 Q 385,250 370,300 Q 355,350 300,370 Q 250,385 200,370 Q 150,385 100,370 Q 45,350 30,300 Q 15,250 30,200 Q 15,150 30,100 Q 45,50 100,30 Z" />
            </clipPath>
            <clipPath id="shape-star">
              <path d="M 200,25 Q 235,60 275,25 Q 315,60 335,100 Q 375,120 375,160 Q 375,200 335,220 Q 355,260 315,300 Q 275,335 235,375 Q 200,340 165,375 Q 125,335 85,300 Q 45,260 65,220 Q 25,200 25,160 Q 25,120 65,100 Q 85,60 125,25 Q 165,60 200,25 Z" />
            </clipPath>
            <clipPath id="shape-inward-square">
              <path d="M 45,45 Q 200,85 355,45 Q 315,200 355,355 Q 200,315 45,355 Q 85,200 45,45 Z" />
            </clipPath>
          </defs>

          {shape === "circle" && (
            <circle cx="200" cy="200" r="180" fill="#f1f5f9" pointerEvents="none" />
          )}
          {shape === "square" && (
            <rect x="25" y="25" width="350" height="350" rx="16" ry="16" fill="#f1f5f9" pointerEvents="none" />
          )}
          {shape === "squircle" && (
            <path d="M 120 25 L 280 25 C 345 25, 375 55, 375 120 L 375 280 C 375 345, 345 375, 280 375 L 120 375 C 55 375, 25 345, 25 280 L 25 120 C 25 55, 55 25, 120 25 Z" fill="#f1f5f9" pointerEvents="none" />
          )}
          {shape === "curved-edges" && (
            <path d="M 120 25 L 375 25 L 375 280 C 375 345, 345 375, 280 375 L 25 375 L 25 120 C 25 55, 55 25, 120 25 Z" fill="#f1f5f9" pointerEvents="none" />
          )}
          {shape === "heart" && (
            <path d="M 200,95 C 200,95 270,20 335,75 C 400,130, 390,225, 200,365 C 10,225, 0,130, 65,75 C 130,20, 200,95, 200,95 Z" fill="#f1f5f9" pointerEvents="none" />
          )}
          {shape === "oval" && (
            <ellipse cx="200" cy="200" rx="135" ry="175" fill="#f1f5f9" pointerEvents="none" />
          )}
          {shape === "wavy" && (
            <path d="M 100,30 Q 150,15 200,30 Q 250,15 300,30 Q 355,50 370,100 Q 385,150 370,200 Q 385,250 370,300 Q 355,350 300,370 Q 250,385 200,370 Q 150,385 100,370 Q 45,350 30,300 Q 15,250 30,200 Q 15,150 30,100 Q 45,50 100,30 Z" fill="#f1f5f9" pointerEvents="none" />
          )}
          {shape === "star" && (
            <path d="M 200,25 Q 235,60 275,25 Q 315,60 335,100 Q 375,120 375,160 Q 375,200 335,220 Q 355,260 315,300 Q 275,335 235,375 Q 200,340 165,375 Q 125,335 85,300 Q 45,260 65,220 Q 25,200 25,160 Q 25,120 65,100 Q 85,60 125,25 Q 165,60 200,25 Z" fill="#f1f5f9" pointerEvents="none" />
          )}
          {shape === "inward-square" && (
            <path d="M 45,45 Q 200,85 355,45 Q 315,200 355,355 Q 200,315 45,355 Q 85,200 45,45 Z" fill="#f1f5f9" pointerEvents="none" />
          )}

          <g clipPath={`url(#shape-${shape})`} pointerEvents="none">
            {!image && (
              <>
                <rect x="0" y="0" width="400" height="400" className="fill-slate-50/50" pointerEvents="none" />
                <line x1="200" y1="20" x2="200" y2="380" className="stroke-slate-100" strokeDasharray="4,4" pointerEvents="none" />
                <line x1="20" y1="200" x2="380" y2="200" className="stroke-slate-100" strokeDasharray="4,4" pointerEvents="none" />
              </>
            )}

            {image && (
              <image
                href={image}
                x={left}
                y={top}
                width={imageWidth}
                height={imageHeight}
                transform={`translate(${xOffset}, ${yOffset}) rotate(${rotation} 200 200)`}
                className="pointer-events-none"
                pointerEvents="none"
              />
            )}

            {getWatermark()}
          </g>

          {shape === "circle" && (
            <circle cx="200" cy="200" r="180" fill="none" stroke="#94a3b8" strokeWidth="3" pointerEvents="none" />
          )}
          {shape === "square" && (
            <rect x="25" y="25" width="350" height="350" rx="16" ry="16" fill="none" stroke="#94a3b8" strokeWidth="3" pointerEvents="none" />
          )}
          {shape === "squircle" && (
            <path d="M 120 25 L 280 25 C 345 25, 375 55, 375 120 L 375 280 C 375 345, 345 375, 280 375 L 120 375 C 55 375, 25 345, 25 280 L 25 120 C 25 55, 55 25, 120 25 Z" fill="none" stroke="#94a3b8" strokeWidth="3" pointerEvents="none" />
          )}
          {shape === "curved-edges" && (
            <path d="M 120 25 L 375 25 L 375 280 C 375 345, 345 375, 280 375 L 25 375 L 25 120 C 25 55, 55 25, 120 25 Z" fill="none" stroke="#94a3b8" strokeWidth="3" pointerEvents="none" />
          )}
          {shape === "heart" && (
            <path d="M 200,95 C 200,95 270,20 335,75 C 400,130, 390,225, 200,365 C 10,225, 0,130, 65,75 C 130,20, 200,95, 200,95 Z" fill="none" stroke="#94a3b8" strokeWidth="3" pointerEvents="none" />
          )}
          {shape === "oval" && (
            <ellipse cx="200" cy="200" rx="135" ry="175" fill="none" stroke="#94a3b8" strokeWidth="3" pointerEvents="none" />
          )}
          {shape === "wavy" && (
            <path d="M 100,30 Q 150,15 200,30 Q 250,15 300,30 Q 355,50 370,100 Q 385,150 370,200 Q 385,250 370,300 Q 355,350 300,370 Q 250,385 200,370 Q 150,385 100,370 Q 45,350 30,300 Q 15,250 30,200 Q 15,150 30,100 Q 45,50 100,30 Z" fill="none" stroke="#94a3b8" strokeWidth="3" pointerEvents="none" />
          )}
          {shape === "star" && (
            <path d="M 200,25 Q 235,60 275,25 Q 315,60 335,100 Q 375,120 375,160 Q 375,200 335,220 Q 355,260 315,300 Q 275,335 235,375 Q 200,340 165,375 Q 125,335 85,300 Q 45,260 65,220 Q 25,200 25,160 Q 25,120 65,100 Q 85,60 125,25 Q 165,60 200,25 Z" fill="none" stroke="#94a3b8" strokeWidth="3" pointerEvents="none" />
          )}
          {shape === "inward-square" && (
            <path d="M 45,45 Q 200,85 355,45 Q 315,200 355,355 Q 200,315 45,355 Q 85,200 45,45 Z" fill="none" stroke="#94a3b8" strokeWidth="3" pointerEvents="none" />
          )}

          {isCustomizer && image && (
            <g transform={`translate(${xOffset}, ${yOffset}) rotate(${rotation}, 200, 200)`}>
              <rect
                x={left}
                y={top}
                width={imageWidth}
                height={imageHeight}
                fill="transparent"
                stroke="#3b82f6"
                strokeWidth="1.5"
                strokeDasharray="4,4"
                className="cursor-move pointer-events-auto"
                onMouseDown={handleMoveStart}
                onTouchStart={handleMoveStart}
              />
              <rect x={left - 6} y={top - 6} width="12" height="12" fill="#ffffff" stroke="#3b82f6" strokeWidth="1.5" className="cursor-nwse-resize pointer-events-auto" onMouseDown={handleScaleStart} onTouchStart={handleScaleStart} />
              <rect x={right - 6} y={top - 6} width="12" height="12" fill="#ffffff" stroke="#3b82f6" strokeWidth="1.5" className="cursor-nesw-resize pointer-events-auto" onMouseDown={handleScaleStart} onTouchStart={handleScaleStart} />
              <rect x={left - 6} y={bottom - 6} width="12" height="12" fill="#ffffff" stroke="#3b82f6" strokeWidth="1.5" className="cursor-nesw-resize pointer-events-auto" onMouseDown={handleScaleStart} onTouchStart={handleScaleStart} />
              <rect x={right - 6} y={bottom - 6} width="12" height="12" fill="#ffffff" stroke="#3b82f6" strokeWidth="1.5" className="cursor-nwse-resize pointer-events-auto" onMouseDown={handleScaleStart} onTouchStart={handleScaleStart} />
              <line x1="200" y1={top} x2="200" y2={top - 30} stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="2,2" />
              <circle cx="200" cy={top - 30} r="6" fill="#ffffff" stroke="#3b82f6" strokeWidth="1.5" className="cursor-alias pointer-events-auto" onMouseDown={handleRotateStart} onTouchStart={handleRotateStart} />
              <g
                className="cursor-pointer pointer-events-auto"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onRemovePhoto();
                }}
              >
                <circle cx={right + 12} cy={top - 12} r="10" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
                <path d={`M ${right + 7} ${top - 17} L ${right + 17} ${top - 7} M ${right + 17} ${top - 17} L ${right + 7} ${top - 7}`} stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
              </g>
            </g>
          )}

          <g className="pointer-events-none select-none" pointerEvents="none">
            {dialType === "numbers" && numbers.map((num, i) => {
              const { x, y } = getNumberCoords(i);
              return (
                <text
                  key={num}
                  x={x}
                  y={y + 6}
                  textAnchor="middle"
                  fill={numberColor}
                  style={{ fontFamily: numberFont }}
                  className="font-bold text-[22px] tracking-tight drop-shadow-[0_1.5px_2px_rgba(255,255,255,0.75)]"
                  pointerEvents="none"
                >
                  {num}
                </text>
              );
            })}

            {dialType === "roman" && romanNumerals.map((num, i) => {
              const { x, y } = getNumberCoords(i);
              return (
                <text
                  key={num}
                  x={x}
                  y={y + 5}
                  textAnchor="middle"
                  fill={numberColor}
                  style={{ fontFamily: numberFont }}
                  className="font-bold text-[18px] tracking-wide drop-shadow-[0_1.5px_2px_rgba(255,255,255,0.75)]"
                  pointerEvents="none"
                >
                  {num}
                </text>
              );
            })}

            {dialType === "ticks" && numbers.map((_, i) => {
              const { x: x1, y: y1 } = getNumberCoords(i, 148);
              const { x: x2, y: y2 } = getNumberCoords(i, 160);
              const isQuarter = i % 3 === 0;
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={numberColor}
                  strokeWidth={isQuarter ? 4 : 2}
                  className="opacity-85 drop-shadow-[0_1px_1px_rgba(255,255,255,0.75)]"
                  pointerEvents="none"
                />
              );
            })}
          </g>

          {text && (
            <text
              x="200"
              y={200 + (textPosition - 50) * 3}
              textAnchor="middle"
              fill={textColor}
              style={{
                fontFamily: textFont,
                fontSize: `${textSize}px`,
                letterSpacing: textFont === "Pacifico" ? "normal" : "0.05em"
              }}
              className="font-medium pointer-events-none select-none drop-shadow-[0_1.5px_2px_rgba(255,255,255,0.85)]"
              pointerEvents="none"
            >
              {text}
            </text>
          )}

          <g className="pointer-events-none select-none filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.35)]" pointerEvents="none">
            <line x1="200" y1="200" x2="200" y2="120" stroke={handColor} strokeWidth="7" strokeLinecap="round" transform={`rotate(${angles.hour} 200 200)`} pointerEvents="none" />
            <line x1="200" y1="200" x2="200" y2="75" stroke={handColor} strokeWidth="4.5" strokeLinecap="round" transform={`rotate(${angles.minute} 200 200)`} pointerEvents="none" />
            {handMovement !== "static" && (
              <>
                <line x1="200" y1="200" x2="200" y2="225" stroke={handColor === "#d4af37" ? "#b22222" : handColor} strokeWidth="1.5" strokeLinecap="round" transform={`rotate(${angles.second} 200 200)`} pointerEvents="none" />
                <line x1="200" y1="200" x2="200" y2="55" stroke={handColor === "#d4af37" ? "#b22222" : handColor} strokeWidth="1.5" strokeLinecap="round" transform={`rotate(${angles.second} 200 200)`} pointerEvents="none" />
              </>
            )}
            <circle cx="200" cy="200" r="8" fill={handColor} stroke="#ffffff" strokeWidth="1" pointerEvents="none" />
            <circle cx="200" cy="200" r="3" fill="#ffffff" pointerEvents="none" />
          </g>

          {isCustomizer && !image && (
            <rect
              x="20"
              y="20"
              width="360"
              height="360"
              fill="transparent"
              className="cursor-pointer pointer-events-auto"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onSelectPhoto();
              }}
            />
          )}
        </svg>
    </div>
  );
}
