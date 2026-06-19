import { useState, useEffect } from 'react';

// ── 1. CLOCK PREVIEW RENDERER ──
export function ClockPreviewRender({ shape = "circle", dialType = "numbers", handMovement = "sweep" }) {
  const [time, setTime] = useState(new Date());
  const numberColor = "#0F172A";
  const numberFont = "Inter";
  const handColor = "#0F172A";
  const secondHandColor = "#EF4444";

  useEffect(() => {
    let animId;
    const update = () => {
      setTime(new Date());
      animId = requestAnimationFrame(update);
    };
    if (handMovement !== "static") {
      animId = requestAnimationFrame(update);
    } else {
      setTime(new Date(2026, 5, 19, 10, 10, 30)); // static time
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
      if (index === 0) y += 18;
      else if (index === 1 || index === 11) y += 12;
      else if (index === 5 || index === 7) y -= 10;
      else if (index === 6) y -= 25;
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
    const secondAngle = handMovement === "sweep" ? (secs * 6) + (ms * 0.006) : secs * 6;
    const minuteAngle = (mins * 6) + (secs * 0.1);
    const hourAngle = ((hrs % 12) * 30) + (mins * 0.5);
    return { hour: hourAngle, minute: minuteAngle, second: secondAngle };
  };

  const angles = getHandAngles();

  return (
    <div className="w-full flex justify-center items-center py-4 bg-slate-50 rounded-2xl min-h-[360px]">
      <div className="w-full max-w-[320px] drop-shadow-xl">
        <svg viewBox="0 0 400 400" className="w-full">
          <defs>
            <clipPath id="shape-circle"><circle cx="200" cy="200" r="180" /></clipPath>
            <clipPath id="shape-square"><rect x="25" y="25" width="350" height="350" rx="16" ry="16" /></clipPath>
            <clipPath id="shape-squircle"><path d="M 120 25 L 280 25 C 345 25, 375 55, 375 120 L 375 280 C 375 345, 345 375, 280 375 L 120 375 C 55 375, 25 345, 25 280 L 25 120 C 25 55, 55 25, 120 25 Z" /></clipPath>
            <clipPath id="shape-curved-edges"><path d="M 120 25 L 375 25 L 375 280 C 375 345, 345 375, 280 375 L 25 375 L 25 120 C 25 55, 55 25, 120 25 Z" /></clipPath>
            <clipPath id="shape-heart"><path d="M 200,95 C 200,95 270,20 335,75 C 400,130, 390,225, 200,365 C 10,225, 0,130, 65,75 C 130,20, 200,95, 200,95 Z" /></clipPath>
            <clipPath id="shape-oval"><ellipse cx="200" cy="200" rx="135" ry="175" /></clipPath>
            <clipPath id="shape-wavy"><path d="M 100,30 Q 150,15 200,30 Q 250,15 300,30 Q 355,50 370,100 Q 385,150 370,200 Q 385,250 370,300 Q 355,350 300,370 Q 250,385 200,370 Q 150,385 100,370 Q 45,350 30,300 Q 15,250 30,200 Q 15,150 30,100 Q 45,50 100,30 Z" /></clipPath>
            <clipPath id="shape-star"><path d="M 200,25 Q 235,60 275,25 Q 315,60 335,100 Q 375,120 375,160 Q 375,200 335,220 Q 355,260 315,300 Q 275,335 235,375 Q 200,340 165,375 Q 125,335 85,300 Q 45,260 65,220 Q 25,200 25,160 Q 25,120 65,100 Q 85,60 125,25 Q 165,60 200,25 Z" /></clipPath>
            <clipPath id="shape-inward-square"><path d="M 45,45 Q 200,85 355,45 Q 315,200 355,355 Q 200,315 45,355 Q 85,200 45,45 Z" /></clipPath>
          </defs>

          {/* Clock Face Fill */}
          {shape === "circle" && <circle cx="200" cy="200" r="180" fill="#ffffff" />}
          {shape === "square" && <rect x="25" y="25" width="350" height="350" rx="16" ry="16" fill="#ffffff" />}
          {shape === "squircle" && <path d="M 120 25 L 280 25 C 345 25, 375 55, 375 120 L 375 280 C 375 345, 345 375, 280 375 L 120 375 C 55 375, 25 345, 25 280 L 25 120 C 25 55, 55 25, 120 25 Z" fill="#ffffff" />}
          {shape === "curved-edges" && <path d="M 120 25 L 375 25 L 375 280 C 375 345, 345 375, 280 375 L 25 375 L 25 120 C 25 55, 55 25, 120 25 Z" fill="#ffffff" />}
          {shape === "heart" && <path d="M 200,95 C 200,95 270,20 335,75 C 400,130, 390,225, 200,365 C 10,225, 0,130, 65,75 C 130,20, 200,95, 200,95 Z" fill="#ffffff" />}
          {shape === "oval" && <ellipse cx="200" cy="200" rx="135" ry="175" fill="#ffffff" />}
          {shape === "wavy" && <path d="M 100,30 Q 150,15 200,30 Q 250,15 300,30 Q 355,50 370,100 Q 385,150 370,200 Q 385,250 370,300 Q 355,350 300,370 Q 250,385 200,370 Q 150,385 100,370 Q 45,350 30,300 Q 15,250 30,200 Q 15,150 30,100 Q 45,50 100,30 Z" fill="#ffffff" />}
          {shape === "star" && <path d="M 200,25 Q 235,60 275,25 Q 315,60 335,100 Q 375,120 375,160 Q 375,200 335,220 Q 355,260 315,300 Q 275,335 235,375 Q 200,340 165,375 Q 125,335 85,300 Q 45,260 65,220 Q 25,200 25,160 Q 25,120 65,100 Q 85,60 125,25 Q 165,60 200,25 Z" fill="#ffffff" />}
          {shape === "inward-square" && <path d="M 45,45 Q 200,85 355,45 Q 315,200 355,355 Q 200,315 45,355 Q 85,200 45,45 Z" fill="#ffffff" />}

          {/* Grid lines inside shape */}
          <g clipPath={`url(#shape-${shape})`}>
            <rect x="0" y="0" width="400" height="400" fill="transparent" />
            <line x1="200" y1="20" x2="200" y2="380" stroke="#F1F5F9" strokeWidth="2" strokeDasharray="6,6" />
            <line x1="20" y1="200" x2="380" y2="200" stroke="#F1F5F9" strokeWidth="2" strokeDasharray="6,6" />
          </g>

          {/* Clock Outlines */}
          {shape === "circle" && <circle cx="200" cy="200" r="180" fill="none" stroke="#0F172A" strokeWidth="6" />}
          {shape === "square" && <rect x="25" y="25" width="350" height="350" rx="16" ry="16" fill="none" stroke="#0F172A" strokeWidth="6" />}
          {shape === "squircle" && <path d="M 120 25 L 280 25 C 345 25, 375 55, 375 120 L 375 280 C 375 345, 345 375, 280 375 L 120 375 C 55 375, 25 345, 25 280 L 25 120 C 25 55, 55 25, 120 25 Z" fill="none" stroke="#0F172A" strokeWidth="6" />}
          {shape === "curved-edges" && <path d="M 120 25 L 375 25 L 375 280 C 375 345, 345 375, 280 375 L 25 375 L 25 120 C 25 55, 55 25, 120 25 Z" fill="none" stroke="#0F172A" strokeWidth="6" />}
          {shape === "heart" && <path d="M 200,95 C 200,95 270,20 335,75 C 400,130, 390,225, 200,365 C 10,225, 0,130, 65,75 C 130,20, 200,95, 200,95 Z" fill="none" stroke="#0F172A" strokeWidth="6" />}
          {shape === "oval" && <ellipse cx="200" cy="200" rx="135" ry="175" fill="none" stroke="#0F172A" strokeWidth="6" />}
          {shape === "wavy" && <path d="M 100,30 Q 150,15 200,30 Q 250,15 300,30 Q 355,50 370,100 Q 385,150 370,200 Q 385,250 370,300 Q 355,350 300,370 Q 250,385 200,370 Q 150,385 100,370 Q 45,350 30,300 Q 15,250 30,200 Q 15,150 30,100 Q 45,50 100,30 Z" fill="none" stroke="#0F172A" strokeWidth="6" />}
          {shape === "star" && <path d="M 200,25 Q 235,60 275,25 Q 315,60 335,100 Q 375,120 375,160 Q 375,200 335,220 Q 355,260 315,300 Q 275,335 235,375 Q 200,340 165,375 Q 125,335 85,300 Q 45,260 65,220 Q 25,200 25,160 Q 25,120 65,100 Q 85,60 125,25 Q 165,60 200,25 Z" fill="none" stroke="#0F172A" strokeWidth="6" />}
          {shape === "inward-square" && <path d="M 45,45 Q 200,85 355,45 Q 315,200 355,355 Q 200,315 45,355 Q 85,200 45,45 Z" fill="none" stroke="#0F172A" strokeWidth="6" />}

          {/* Numbers / Dial ticks */}
          <g className="pointer-events-none select-none">
            {dialType === "numbers" && numbers.map((num, i) => {
              const { x, y } = getNumberCoords(i);
              return (
                <text key={num} x={x} y={y + 7} textAnchor="middle" fill={numberColor} style={{ fontFamily: numberFont }} className="font-bold text-[24px] tracking-tight">
                  {num}
                </text>
              );
            })}
            {dialType === "roman" && romanNumerals.map((num, i) => {
              const { x, y } = getNumberCoords(i);
              return (
                <text key={num} x={x} y={y + 6} textAnchor="middle" fill={numberColor} style={{ fontFamily: numberFont }} className="font-bold text-[20px] tracking-wide">
                  {num}
                </text>
              );
            })}
            {dialType === "ticks" && numbers.map((_, i) => {
              const { x: x1, y: y1 } = getNumberCoords(i, 148);
              const { x: x2, y: y2 } = getNumberCoords(i, 162);
              const isQuarter = i % 3 === 0;
              return (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={numberColor} strokeWidth={isQuarter ? 5 : 2.5} className="opacity-90" />
              );
            })}
          </g>

          {/* Clock Hands */}
          <g className="pointer-events-none select-none filter drop-shadow-md">
            {/* Hour hand */}
            <line x1="200" y1="200" x2="200" y2="120" stroke={handColor} strokeWidth="8" strokeLinecap="round" transform={`rotate(${angles.hour} 200 200)`} />
            {/* Minute hand */}
            <line x1="200" y1="200" x2="200" y2="70" stroke={handColor} strokeWidth="5.5" strokeLinecap="round" transform={`rotate(${angles.minute} 200 200)`} />
            {/* Second hand */}
            {handMovement !== "static" && (
              <>
                <line x1="200" y1="200" x2="200" y2="225" stroke={secondHandColor} strokeWidth="2" strokeLinecap="round" transform={`rotate(${angles.second} 200 200)`} />
                <line x1="200" y1="200" x2="200" y2="50" stroke={secondHandColor} strokeWidth="2" strokeLinecap="round" transform={`rotate(${angles.second} 200 200)`} />
              </>
            )}
            {/* Center Cap */}
            <circle cx="200" cy="200" r="9" fill={handColor} stroke="#ffffff" strokeWidth="1.5" />
            <circle cx="200" cy="200" r="3.5" fill="#ffffff" />
          </g>
        </svg>
      </div>
    </div>
  );
}

// ── 2. FRAME PREVIEW RENDERER ──
export function FramePreviewRender({ design = "oak", grid = "single" }) {
  // design: oak, ebony, mahogany
  // grid: single, 2x2, 3x2
  const borderColors = {
    oak: "#854D0E",
    ebony: "#1E293B",
    mahogany: "#7C2D12"
  };
  const borderColor = borderColors[design] || borderColors.oak;

  return (
    <div className="w-full flex justify-center items-center py-4 bg-slate-50 rounded-2xl min-h-[360px]">
      <div className="w-full max-w-[320px] drop-shadow-xl">
        <svg viewBox="0 0 400 400" className="w-full">
          {/* Outer wood border */}
          <rect x="40" y="60" width="320" height="280" fill="#FCFBF9" stroke={borderColor} strokeWidth="18" rx="8" />

          {/* Canvas slots based on grid */}
          {grid === "single" && (
            <g>
              <rect x="65" y="85" width="270" height="230" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" rx="4" />
              <rect x="110" y="125" width="180" height="150" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="1.5" strokeDasharray="4,4" rx="4" />
              <text x="200" y="205" textAnchor="middle" fill="#64748B" className="font-bold text-xs font-sans">
                Photo Frame - {design.toUpperCase()}
              </text>
            </g>
          )}

          {grid === "2x2" && (
            <g>
              {/* Top-Left */}
              <rect x="65" y="85" width="125" height="105" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" rx="4" />
              <text x="127" y="142" textAnchor="middle" fill="#94A3B8" className="font-bold text-[9px] font-sans">Photo 1</text>
              
              {/* Top-Right */}
              <rect x="210" y="85" width="125" height="105" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" rx="4" />
              <text x="272" y="142" textAnchor="middle" fill="#94A3B8" className="font-bold text-[9px] font-sans">Photo 2</text>
              
              {/* Bottom-Left */}
              <rect x="65" y="210" width="125" height="105" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" rx="4" />
              <text x="127" y="267" textAnchor="middle" fill="#94A3B8" className="font-bold text-[9px] font-sans">Photo 3</text>
              
              {/* Bottom-Right */}
              <rect x="210" y="210" width="125" height="105" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" rx="4" />
              <text x="272" y="267" textAnchor="middle" fill="#94A3B8" className="font-bold text-[9px] font-sans">Photo 4</text>
            </g>
          )}

          {grid === "3x2" && (
            <g>
              {/* 6 Grid Slots */}
              {[[65, 85], [155, 85], [245, 85], [65, 210], [155, 210], [245, 210]].map(([x, y], i) => (
                <g key={i}>
                  <rect x={x} y={y} width="90" height="105" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" rx="4" />
                  <text x={x + 45} y={y + 58} textAnchor="middle" fill="#94A3B8" className="font-bold text-[8px] font-sans">Photo {i+1}</text>
                </g>
              ))}
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}

// ── 3. LETTERHEAD PREVIEW RENDERER ──
export function LetterheadPreviewRender({ design = "modern", name = "Acme Corporation", address = "123 Corporate Blvd" }) {
  const accentColor =
    design === "corporate"
      ? "#B45309"
      : design === "sidebar"
      ? "#2563EB"
      : "#0F172A";

  return (
    <div className="w-full flex justify-center items-center py-4 bg-slate-50 rounded-2xl min-h-[360px]">
      <div
        className="w-full aspect-[1/1.414] bg-white shadow-xl flex flex-col justify-between text-left transition-all duration-500 ease-out border border-[#E2E8F0] rounded-lg"
        style={{
          maxWidth: "240px",
          borderTop: `4px solid ${accentColor}`,
        }}
      >
        <div>
          {/* Header section */}
          <div className="flex items-start justify-between px-4 pt-3 pb-2" style={{ borderBottom: `1px solid ${accentColor}20` }}>
            <div className={design === "sidebar" ? "flex gap-2 items-start w-full" : ""}>
              {design === "sidebar" && (
                <div className="flex-shrink-0 flex flex-col gap-0.5 pr-2 border-r border-slate-200">
                  <div className="h-1.5 w-6 rounded bg-blue-100" />
                  <div className="h-1 w-5 rounded bg-slate-200" />
                  <div className="h-1 w-5 rounded bg-slate-200" />
                </div>
              )}
              <div className="flex-1">
                {design === "corporate" && (
                  <div className="text-[5px] text-amber-700 font-extrabold uppercase tracking-widest mb-0.5 text-center">
                    Official Executive Document
                  </div>
                )}
                <h4 className="font-black leading-tight font-sans text-[8px]" style={{ color: accentColor }}>
                  {name || "Acme Corporation"}
                </h4>
                <p className="text-[5.5px] text-slate-400 mt-0.5 leading-normal font-sans">
                  {address || "123 Business St, Innovation Center"}
                </p>
              </div>
            </div>
            {/* Logo Slot */}
            <div className="w-6 h-6 border border-[#E2E8F0] rounded bg-[#F8FAFC] flex items-center justify-center flex-shrink-0">
              <span className="text-[5px] font-bold text-slate-400 font-sans">LOGO</span>
            </div>
          </div>

          {/* Letter Body Lines Placeholder */}
          <div className="px-4 pt-4 space-y-1.5">
            <div className="h-1.5 w-1/3 rounded" style={{ background: `${accentColor}20` }} />
            <div className="h-1 w-full rounded bg-slate-100" />
            <div className="h-1 w-full rounded bg-slate-100" />
            <div className="h-1 w-5/6 rounded bg-slate-100" />
            <div className="h-1 w-full rounded bg-slate-100" />
            <div className="h-1 w-2/3 rounded bg-slate-100" />
          </div>
        </div>

        {/* Footer section */}
        <div className="px-4 py-2 flex items-center justify-between border-t border-slate-100">
          <div className="h-0.5 w-8 rounded" style={{ background: `${accentColor}30` }} />
          <span className="text-[4px] text-slate-400 font-bold uppercase tracking-wider font-sans">
            Confidential
          </span>
          <div className="h-0.5 w-8 rounded" style={{ background: `${accentColor}30` }} />
        </div>
      </div>
    </div>
  );
}

// ── 4. MUG PREVIEW RENDERER ──
export function MugPreviewRender({ design = "standard" }) {
  // design: standard, inner-pink, black-mug, valentine, birthday, floral, balance, yellow-smile
  const innerColors = {
    standard: "#FFFFFF",
    "inner-pink": "#F472B6",
    "black-mug": "#1E293B",
    valentine: "#FFE4E6",
    birthday: "#FEF08A",
    floral: "#F0FDF4"
  };
  const outerColors = {
    standard: "#FFFFFF",
    "inner-pink": "#FFFFFF",
    "black-mug": "#1E293B",
    valentine: "#FFFFFF",
    birthday: "#FFFFFF",
    floral: "#FFFFFF"
  };

  const innerColor = innerColors[design] || "#FFFFFF";
  const outerColor = outerColors[design] || "#FFFFFF";

  return (
    <div className="w-full flex justify-center items-center py-4 bg-slate-50 rounded-2xl min-h-[360px]">
      <div className="w-full max-w-[280px] drop-shadow-xl">
        <svg viewBox="0 0 380 380" className="w-full">
          <defs>
            <linearGradient id="mug-shading-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(0,0,0,0.12)" />
              <stop offset="12%" stopColor="rgba(255,255,255,0.12)" />
              <stop offset="80%" stopColor="rgba(255,255,255,0)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.22)" />
            </linearGradient>
          </defs>

          {/* Handle */}
          <path
            d="M 100,140 C 30,140 30,260 100,260 C 120,280 110,260 100,260 C 50,260 50,160 100,160 C 110,160 120,140 100,140 Z"
            fill={outerColor}
            stroke="#CBD5E1"
            strokeWidth="2"
          />

          {/* Body */}
          <path
            d="M 100,100 L 280,100 C 280,100 290,260 270,290 C 250,310 130,310 110,290 C 90,260 100,100 100,100 Z"
            fill={outerColor}
            stroke="#CBD5E1"
            strokeWidth="2"
          />

          {/* Inner Cup Shading */}
          <ellipse cx="190" cy="100" rx="90" ry="12" fill={innerColor} stroke="#CBD5E1" strokeWidth="1" />

          {/* Shading overlay */}
          <path
            d="M 100,100 L 280,100 C 280,100 290,260 270,290 C 250,310 130,310 110,290 C 90,260 100,100 100,100 Z"
            fill="url(#mug-shading-grad)"
            pointerEvents="none"
          />

          {/* Preset Designs */}
          {design === "inner-pink" && (
            <ellipse cx="190" cy="185" rx="45" ry="38" fill="#FCE7F3" stroke="#F472B6" strokeWidth="2.5" />
          )}
          {design === "black-mug" && (
            <ellipse cx="190" cy="185" rx="45" ry="38" fill="none" stroke="#D4AF37" strokeWidth="4" />
          )}
          {design === "valentine" && (
            <path d="M 190,195 C 190,195 205,170 220,185 C 235,200 220,225 190,250 C 160,225 145,200 160,185 C 175,170 190,195 190,195 Z" fill="#FECDD3" stroke="#F43F5E" strokeWidth="2" />
          )}
          {design === "birthday" && (
            <g>
              <ellipse cx="190" cy="185" rx="40" ry="35" fill="#FEF08A" stroke="#CA8A04" strokeWidth="2" />
              <text x="190" y="188" textAnchor="middle" fill="#854D0E" className="text-[7px] font-black font-sans uppercase">HBD!</text>
            </g>
          )}
          {design === "standard" && (
            <ellipse cx="190" cy="185" rx="45" ry="38" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" />
          )}

          <text x="190" y="150" textAnchor="middle" fill="#94A3B8" className="text-[9px] font-extrabold font-sans uppercase tracking-wider">
            Custom Mug
          </text>
        </svg>
      </div>
    </div>
  );
}

// ── 5. PEN PREVIEW RENDERER ──
export function PenPreviewRender({ design = "classic", text = "Premium Pen" }) {
  // design: classic, executive, fountain
  const penColor = "#0F172A";
  const penTrim = "#D4AF37";
  const penTextColor = "#FFFFFF";

  return (
    <div className="w-full flex justify-center items-center py-4 bg-slate-50 rounded-2xl min-h-[360px]">
      <div className="w-full max-w-[280px] drop-shadow-xl transform rotate-12">
        <svg viewBox="0 0 400 400" className="w-full">
          {design === "classic" && (
            <g>
              <rect x="60" y="185" width="260" height="20" rx="3" fill={penColor} />
              <polygon points="320,185 350,195 320,205" fill="#E2E8F0" />
              <path d="M 80,185 L 120,185 L 120,205 L 80,205 Z" fill={penTrim} />
              <path d="M 270,185 L 280,185 L 280,205 L 270,205 Z" fill={penTrim} />
              <rect x="70" y="178" width="50" height="4" rx="1" fill={penTrim} />
            </g>
          )}

          {design === "executive" && (
            <g>
              <rect x="50" y="188" width="280" height="14" rx="2" fill={penColor} />
              <polygon points="330,188 360,195 330,202" fill="#94A3B8" />
              <line x1="190" y1="188" x2="190" y2="202" stroke={penTrim} strokeWidth="3" />
              <path d="M 70,188 L 100,188 L 100,202 L 70,202 Z" fill={penTrim} />
              <rect x="65" y="182" width="40" height="3" rx="1" fill={penTrim} />
            </g>
          )}

          {design === "fountain" && (
            <g>
              <rect x="70" y="180" width="130" height="30" rx="4" fill={penColor} />
              <rect x="200" y="183" width="100" height="24" fill={penColor} opacity="0.95" />
              <polygon points="300,183 330,195 300,207" fill="#CBD5E1" stroke={penTrim} strokeWidth="1" />
              <rect x="200" y="180" width="10" height="30" fill={penTrim} />
              <path d="M 90,180 L 100,180 L 100,210 L 90,210 Z" fill={penTrim} />
              <rect x="80" y="172" width="60" height="5" rx="2" fill={penTrim} />
            </g>
          )}

          {text && (
            <text x="170" y="198" textAnchor="middle" fill={penTextColor} className="font-serif italic font-extrabold text-[10px]">
              {text}
            </text>
          )}
        </svg>
      </div>
    </div>
  );
}

// ── 6. PLATE PREVIEW RENDERER ──
export function PlatePreviewRender({ design = "rectangle", title = "Olivia Bennett", subtitle = "Chief Executive" }) {
  // design: rectangle, oval, bevel
  const plateMounts = "#D4AF37";
  const plateTitleColor = "#0F172A";
  const plateSubtitleColor = "#64748B";

  return (
    <div className="w-full flex justify-center items-center py-4 bg-slate-50 rounded-2xl min-h-[360px]">
      <div className="w-full max-w-[280px] drop-shadow-xl">
        <svg viewBox="0 0 400 400" className="w-full">
          {design === "rectangle" && (
            <rect x="30" y="120" width="340" height="160" rx="8" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="4" />
          )}

          {design === "oval" && (
            <ellipse cx="200" cy="200" rx="170" ry="80" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="4" />
          )}

          {design === "bevel" && (
            <path d="M 50,120 L 350,120 L 370,160 L 370,240 L 350,280 L 50,280 L 30,240 L 30,160 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="4" />
          )}

          {/* Mount circles/screws */}
          <circle cx="50" cy="140" r="8" fill={plateMounts} stroke="#CBD5E1" strokeWidth="1.5" />
          <circle cx="350" cy="140" r="8" fill={plateMounts} stroke="#CBD5E1" strokeWidth="1.5" />
          <circle cx="50" cy="260" r="8" fill={plateMounts} stroke="#CBD5E1" strokeWidth="1.5" />
          <circle cx="350" cy="260" r="8" fill={plateMounts} stroke="#CBD5E1" strokeWidth="1.5" />

          {title && (
            <text x="200" y="185" textAnchor="middle" fill={plateTitleColor} className="font-extrabold text-[17px] font-sans">
              {title}
            </text>
          )}

          {subtitle && (
            <text x="200" y="215" textAnchor="middle" fill={plateSubtitleColor} className="font-sans text-[10px] font-extrabold uppercase tracking-wider">
              {subtitle}
            </text>
          )}
        </svg>
      </div>
    </div>
  );
}

// ── COMPOSITE PREVIEW SELECTOR ──
export default function CanvasPreviewRender({ canvasName, shape, dialType, handMovement, design, grid, text, title, subtitle }) {
  switch (canvasName) {
    case 'Clock':
      return <ClockPreviewRender shape={shape} dialType={dialType} handMovement={handMovement} />;
    case 'Frame':
      return <FramePreviewRender design={design} grid={grid} />;
    case 'Letterhead':
      return <LetterheadPreviewRender design={design} name={text} address={subtitle} />;
    case 'Mug':
      return <MugPreviewRender design={design} />;
    case 'Pen':
      return <PenPreviewRender design={design} text={text} />;
    case 'Plate':
      return <PlatePreviewRender design={design} title={title} subtitle={subtitle} />;
    default:
      return (
        <div className="w-full min-h-[300px] flex items-center justify-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <span className="text-slate-400 font-semibold text-sm">No Preview Available</span>
        </div>
      );
  }
}
