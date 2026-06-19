import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useSelector } from "react-redux";

const drawClockShapePath = (ctx, shape) => {
  ctx.beginPath();
  if (shape === "circle") {
    ctx.arc(512, 512, 460, 0, Math.PI * 2);
  } else if (shape === "square") {
    ctx.moveTo(104, 64);
    ctx.lineTo(920, 64);
    ctx.arcTo(960, 64, 960, 104, 40);
    ctx.lineTo(960, 920);
    ctx.arcTo(960, 960, 920, 960, 40);
    ctx.lineTo(104, 960);
    ctx.arcTo(64, 960, 64, 920, 40);
    ctx.lineTo(64, 104);
    ctx.arcTo(64, 64, 104, 64, 40);
    ctx.closePath();
  } else if (shape === "squircle") {
    ctx.moveTo(307, 64);
    ctx.lineTo(717, 64);
    ctx.bezierCurveTo(883, 64, 960, 141, 960, 307);
    ctx.lineTo(960, 717);
    ctx.bezierCurveTo(960, 883, 883, 960, 717, 960);
    ctx.lineTo(307, 960);
    ctx.bezierCurveTo(141, 960, 64, 883, 64, 717);
    ctx.lineTo(64, 307);
    ctx.bezierCurveTo(64, 141, 141, 64, 307, 64);
  } else if (shape === "curved-edges") {
    ctx.moveTo(307, 64);
    ctx.lineTo(960, 64);
    ctx.lineTo(960, 717);
    ctx.bezierCurveTo(960, 883, 883, 960, 717, 960);
    ctx.lineTo(64, 960);
    ctx.lineTo(64, 307);
    ctx.bezierCurveTo(64, 141, 141, 64, 307, 64);
  } else if (shape === "heart") {
    ctx.moveTo(512, 243);
    ctx.bezierCurveTo(512, 243, 691, 51, 858, 192);
    ctx.bezierCurveTo(1024, 333, 998, 576, 512, 934);
    ctx.bezierCurveTo(26, 576, 0, 333, 166, 192);
    ctx.bezierCurveTo(333, 51, 512, 243, 512, 243);
  } else if (shape === "oval") {
    ctx.ellipse(512, 512, 346, 448, 0, 0, Math.PI * 2);
  } else if (shape === "wavy") {
    ctx.moveTo(256, 77);
    ctx.quadraticCurveTo(384, 38, 512, 77);
    ctx.quadraticCurveTo(640, 38, 768, 77);
    ctx.quadraticCurveTo(909, 128, 947, 256);
    ctx.quadraticCurveTo(986, 384, 947, 512);
    ctx.quadraticCurveTo(986, 640, 947, 768);
    ctx.quadraticCurveTo(909, 896, 768, 947);
    ctx.quadraticCurveTo(640, 986, 512, 947);
    ctx.quadraticCurveTo(384, 986, 256, 947);
    ctx.quadraticCurveTo(115, 896, 77, 768);
    ctx.quadraticCurveTo(38, 640, 77, 512);
    ctx.quadraticCurveTo(38, 384, 77, 256);
    ctx.quadraticCurveTo(115, 128, 256, 77);
  } else if (shape === "star") {
    ctx.moveTo(512, 64);
    ctx.quadraticCurveTo(602, 154, 704, 64);
    ctx.quadraticCurveTo(806, 154, 858, 256);
    ctx.quadraticCurveTo(960, 307, 960, 410);
    ctx.quadraticCurveTo(960, 512, 858, 563);
    ctx.quadraticCurveTo(909, 666, 806, 768);
    ctx.quadraticCurveTo(704, 858, 602, 960);
    ctx.quadraticCurveTo(512, 870, 422, 960);
    ctx.quadraticCurveTo(320, 858, 218, 768);
    ctx.quadraticCurveTo(115, 666, 166, 563);
    ctx.quadraticCurveTo(64, 512, 64, 410);
    ctx.quadraticCurveTo(64, 307, 166, 256);
    ctx.quadraticCurveTo(218, 154, 320, 64);
    ctx.quadraticCurveTo(422, 154, 512, 64);
  } else {
    ctx.moveTo(115, 115);
    ctx.quadraticCurveTo(512, 218, 909, 115);
    ctx.quadraticCurveTo(806, 512, 909, 909);
    ctx.quadraticCurveTo(512, 806, 115, 909);
    ctx.quadraticCurveTo(218, 512, 115, 115);
  }
  ctx.closePath();
};

const drawClockTexture = (
  canvas,
  shape,
  loadedImage,
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
  zoom,
  xOffset,
  yOffset,
  rotation
) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, 1024, 1024);

  ctx.save();
  drawClockShapePath(ctx, shape);
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  ctx.restore();

  if (loadedImage) {
    ctx.save();
    drawClockShapePath(ctx, shape);
    ctx.clip();
    ctx.translate(512 + xOffset * 2.56, 512 + yOffset * 2.56);
    ctx.rotate((rotation * Math.PI) / 180);
    const drawW = 922 * zoom;
    const drawH = 922 * zoom;
    ctx.drawImage(loadedImage, -drawW / 2, -drawH / 2, drawW, drawH);
    ctx.restore();
  } else {
    ctx.save();
    ctx.fillStyle = "#cbd5e1";
    ctx.strokeStyle = "#94a3b8";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.rect(175 * 2.56, 160 * 2.56, 50 * 2.56, 40 * 2.56);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#94a3b8";
    ctx.beginPath();
    ctx.moveTo(180 * 2.56, 190 * 2.56);
    ctx.lineTo(195 * 2.56, 175 * 2.56);
    ctx.lineTo(210 * 2.56, 190 * 2.56);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(200 * 2.56, 190 * 2.56);
    ctx.lineTo(212 * 2.56, 172 * 2.56);
    ctx.lineTo(220 * 2.56, 190 * 2.56);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(192 * 2.56, 170 * 2.56, 4 * 2.56, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#94a3b8";
    ctx.font = "bold 26px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("SELECT PHOTO", 512, 235 * 2.56);
    ctx.restore();
  }

  ctx.save();
  drawClockShapePath(ctx, shape);
  ctx.strokeStyle = "rgba(226, 232, 240, 0.8)";
  ctx.lineWidth = 6;
  ctx.stroke();
  ctx.restore();

  const getNumberCoords = (index, radiusOverride) => {
    let rx = 353;
    let ry = 353;

    if (shape === "oval") {
      rx = 256;
      ry = 353;
    } else if (shape === "heart") {
      rx = 269;
      ry = 269;
    } else if (shape === "star") {
      rx = 287;
      ry = 287;
    } else if (shape === "inward-square") {
      rx = 307;
      ry = 307;
    } else if (shape === "curved-edges") {
      rx = 338;
      ry = 338;
    } else if (shape === "wavy") {
      rx = 328;
      ry = 328;
    } else {
      rx = 353;
      ry = 353;
    }

    if (radiusOverride !== undefined) {
      const factor = radiusOverride / 353.28;
      rx *= factor;
      ry *= factor;
    }

    const angle = ((index * 30 - 90) * Math.PI) / 180;
    let x = 512 + rx * Math.cos(angle);
    let y = 512 + ry * Math.sin(angle);

    if (shape === "heart") {
      if (index === 0) {
        y += 46;
      } else if (index === 1 || index === 11) {
        y += 31;
      } else if (index === 5 || index === 7) {
        y -= 26;
      } else if (index === 6) {
        y -= 64;
      }
    }

    return { x, y };
  };

  ctx.save();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = numberColor;
  ctx.font = `bold 56px ${numberFont}`;

  if (dialType === "numbers") {
    const nums = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    nums.forEach((num, i) => {
      const { x, y } = getNumberCoords(i);
      ctx.fillText(num.toString(), x, y + 15);
    });
  } else if (dialType === "roman") {
    const romans = ["XII", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI"];
    romans.forEach((num, i) => {
      const { x, y } = getNumberCoords(i);
      ctx.fillText(num, x, y + 12);
    });
  } else if (dialType === "ticks") {
    ctx.strokeStyle = numberColor;
    for (let i = 0; i < 12; i++) {
      const { x: x1, y: y1 } = getNumberCoords(i, 148 * 2.56);
      const { x: x2, y: y2 } = getNumberCoords(i, 160 * 2.56);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.lineWidth = i % 3 === 0 ? 10 : 5;
      ctx.stroke();
    }
  }
  ctx.restore();

  if (text) {
    ctx.save();
    ctx.fillStyle = textColor;
    ctx.font = `500 ${textSize * 2.56}px ${textFont}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, 512, 512 + (textPosition - 50) * 3 * 2.56);
    ctx.restore();
  }
};

const drawMugTexture = (canvas, mugDesign, mugImage, mugText, mugTextColor, bodyColor, innerColor, handleColor, loadedImage, mugImages = {}, loadedMugImagesMap = {}) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.fillStyle = bodyColor;
  ctx.fillRect(0, 0, 1024, 512);

  const scaleX = 2.8444;
  const scaleY = 2.56;

  const getCanvasX = (svgX) => 256 + (svgX - 100) * scaleX;
  const getCanvasY = (svgY) => (svgY - 100) * scaleY;

  const drawRoundRect = (x, y, w, h, r) => {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.arcTo(x + w, y, x + w, y + r, r);
    ctx.lineTo(x + w, y + h - r);
    ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
    ctx.lineTo(x + r, y + h);
    ctx.arcTo(x, y + h, x, y + h - r, r);
    ctx.lineTo(x, y + r);
    ctx.arcTo(x, y, x + r, y, r);
    ctx.closePath();
  };

  const drawUserImage = (cx, cy, w, h, zoom, xOffset, yOffset, rotation, imgToUse) => {
    const activeImg = imgToUse || loadedImage;
    if (!activeImg) {
      ctx.fillStyle = "rgba(248, 250, 252, 0.4)";
      ctx.fill();
      ctx.fillStyle = bodyColor === "#1e293b" ? "#ffffff" : "#64748b";
      ctx.font = "bold 20px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Upload Photo", cx, cy);
      return;
    }
    ctx.save();
    ctx.translate(cx + xOffset * scaleX, cy + yOffset * scaleY);
    ctx.rotate(rotation * Math.PI / 180);
    const drawW = w * zoom;
    const drawH = h * zoom;
    ctx.drawImage(activeImg, -drawW / 2, -drawH / 2, drawW, drawH);
    ctx.restore();
  };

  if (mugDesign === "standard" || mugDesign === "inner-pink" || mugDesign === "black-mug") {
    const x = getCanvasX(120);
    const y = getCanvasY(115);
    const w = 140 * scaleX;
    const h = 130 * scaleY;
    const r = 8 * scaleX;

    drawRoundRect(x, y, w, h, r);
    ctx.save();
    ctx.clip();
    drawUserImage(512, 205, w, h, mugImage.zoom, mugImage.xOffset, mugImage.yOffset, mugImage.rotation);
    ctx.restore();

    if (mugDesign === "standard") {
      ctx.strokeStyle = "#cbd5e1";
      ctx.lineWidth = 3 * scaleX;
      drawRoundRect(x, y, w, h, r);
      ctx.stroke();
    } else if (mugDesign === "inner-pink") {
      ctx.strokeStyle = "#f472b6";
      ctx.lineWidth = 4 * scaleX;
      drawRoundRect(x, y, w, h, r);
      ctx.stroke();
    } else if (mugDesign === "black-mug") {
      ctx.strokeStyle = "#d4af37";
      ctx.lineWidth = 4 * scaleX;
      drawRoundRect(x, y, w, h, r);
      ctx.stroke();
    }
  } else if (mugDesign === "anniversary") {
    const cx = 512;
    const cy = getCanvasY(165);
    const rx = 65 * scaleX;
    const ry = 55 * scaleY;

    ctx.save();
    ctx.fillStyle = "#faf5ff";
    ctx.fillRect(getCanvasX(100), getCanvasY(100), 180 * scaleX, 200 * scaleY);
    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    ctx.clip();
    drawUserImage(cx, cy, 130 * scaleX, 110 * scaleY, mugImage.zoom, mugImage.xOffset, mugImage.yOffset, mugImage.rotation);
    ctx.restore();

    ctx.strokeStyle = "#d4af37";
    ctx.lineWidth = 3 * scaleX;
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    ctx.stroke();

    const ringY = getCanvasY(235);
    ctx.strokeStyle = "rgba(212, 175, 55, 0.6)";
    ctx.lineWidth = 2.5 * scaleX;
    ctx.beginPath();
    ctx.arc(getCanvasX(175), ringY, 16 * scaleX, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(getCanvasX(205), ringY, 16 * scaleX, 0, Math.PI * 2);
    ctx.stroke();
  } else if (mugDesign === "heart-dual") {
    ctx.save();
    ctx.fillStyle = "#fff1f2";
    ctx.fillRect(getCanvasX(100), getCanvasY(100), 180 * scaleX, 200 * scaleY);
    ctx.restore();

    const leftImg = mugImages[0] || {};
    const rightImg = mugImages[1] || {};

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(384, 179.2);
    ctx.bezierCurveTo(384, 179.2, 426.7, 115.2, 469.3, 153.6);
    ctx.bezierCurveTo(512, 192, 483.6, 256, 384, 332.8);
    ctx.bezierCurveTo(284.4, 256, 256, 192, 298.7, 153.6);
    ctx.bezierCurveTo(341.3, 115.2, 384, 179.2, 384, 179.2);
    ctx.closePath();
    ctx.clip();
    drawUserImage(
      384,
      218,
      70 * scaleX,
      85 * scaleY,
      leftImg.zoom ?? 1.0,
      leftImg.xOffset ?? 0,
      leftImg.yOffset ?? 0,
      leftImg.rotation ?? 0,
      loadedMugImagesMap[0]
    );
    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(639.9, 153.6);
    ctx.bezierCurveTo(639.9, 153.6, 682.7, 89.6, 725.3, 128);
    ctx.bezierCurveTo(768, 166.4, 739.5, 230.4, 639.9, 307.2);
    ctx.bezierCurveTo(540.3, 230.4, 512, 166.4, 554.7, 128);
    ctx.bezierCurveTo(597.3, 89.6, 639.9, 153.6, 639.9, 153.6);
    ctx.closePath();
    ctx.clip();
    drawUserImage(
      640,
      192,
      70 * scaleX,
      85 * scaleY,
      rightImg.zoom ?? 1.0,
      rightImg.xOffset ?? 0,
      rightImg.yOffset ?? 0,
      rightImg.rotation ?? 0,
      loadedMugImagesMap[1]
    );
    ctx.restore();

    ctx.strokeStyle = "#f43f5e";
    ctx.lineWidth = 3 * scaleX;
    ctx.beginPath();
    ctx.moveTo(384, 179.2);
    ctx.bezierCurveTo(384, 179.2, 426.7, 115.2, 469.3, 153.6);
    ctx.bezierCurveTo(512, 192, 483.6, 256, 384, 332.8);
    ctx.bezierCurveTo(284.4, 256, 256, 192, 298.7, 153.6);
    ctx.bezierCurveTo(341.3, 115.2, 384, 179.2, 384, 179.2);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(639.9, 153.6);
    ctx.bezierCurveTo(639.9, 153.6, 682.7, 89.6, 725.3, 128);
    ctx.bezierCurveTo(768, 166.4, 739.5, 230.4, 639.9, 307.2);
    ctx.bezierCurveTo(540.3, 230.4, 512, 166.4, 554.7, 128);
    ctx.bezierCurveTo(597.3, 89.6, 639.9, 153.6, 639.9, 153.6);
    ctx.closePath();
    ctx.stroke();
  } else if (mugDesign === "birthday") {
    ctx.save();
    ctx.fillStyle = "#f0f9ff";
    ctx.fillRect(getCanvasX(100), getCanvasY(100), 180 * scaleX, 200 * scaleY);
    ctx.restore();

    ctx.fillStyle = "#f43f5e";
    ctx.beginPath();
    ctx.ellipse(getCanvasX(120), getCanvasY(140), 10 * scaleX, 14 * scaleY, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#3b82f6";
    ctx.beginPath();
    ctx.ellipse(getCanvasX(260), getCanvasY(130), 10 * scaleX, 14 * scaleY, 0, 0, Math.PI * 2);
    ctx.fill();

    const cx = 512;
    const cy = getCanvasY(165);
    const r = 55 * scaleX;

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.clip();
    drawUserImage(cx, cy, 110 * scaleX, 110 * scaleY, mugImage.zoom, mugImage.xOffset, mugImage.yOffset, mugImage.rotation);
    ctx.restore();

    ctx.strokeStyle = "#3b82f6";
    ctx.lineWidth = 4 * scaleX;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  } else if (mugDesign === "floral") {
    ctx.save();
    ctx.fillStyle = "#fafaf9";
    ctx.fillRect(getCanvasX(100), getCanvasY(100), 180 * scaleX, 200 * scaleY);
    ctx.restore();

    const x = getCanvasX(120);
    const y = getCanvasY(115);
    const w = 140 * scaleX;
    const h = 120 * scaleY;
    const r = 4 * scaleX;

    ctx.save();
    drawRoundRect(x, y, w, h, r);
    ctx.clip();
    drawUserImage(512, 192, w, h, mugImage.zoom, mugImage.xOffset, mugImage.yOffset, mugImage.rotation);
    ctx.restore();

    ctx.strokeStyle = "#be185d";
    ctx.lineWidth = 3 * scaleX;
    drawRoundRect(x, y, w, h, r);
    ctx.stroke();

    ctx.fillStyle = "#f472b6";
    ctx.beginPath();
    ctx.arc(getCanvasX(120), getCanvasY(115), 8 * scaleX, 0, Math.PI * 2);
    ctx.arc(getCanvasX(260), getCanvasY(235), 8 * scaleX, 0, Math.PI * 2);
    ctx.fill();
  } else if (mugDesign === "balance") {
    ctx.save();
    ctx.fillStyle = "#f8fafc";
    ctx.fillRect(getCanvasX(100), getCanvasY(100), 180 * scaleX, 200 * scaleY);
    ctx.restore();

    const x = getCanvasX(175);
    const y = getCanvasY(120);
    const w = 85 * scaleX;
    const h = 90 * scaleY;

    ctx.save();
    ctx.rect(x, y, w, h);
    ctx.clip();
    drawUserImage(getCanvasX(217.5), getCanvasY(165), w, h, mugImage.zoom, mugImage.xOffset, mugImage.yOffset, mugImage.rotation);
    ctx.restore();

    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 1.5 * scaleX;
    ctx.strokeRect(x, y, w, h);

    ctx.strokeStyle = "#64748b";
    ctx.lineWidth = 2 * scaleX;
    ctx.beginPath();
    ctx.arc(getCanvasX(120), getCanvasY(205), 14 * scaleX, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(getCanvasX(150), getCanvasY(205), 14 * scaleX, 0, Math.PI * 2);
    ctx.stroke();
  } else if (mugDesign === "yellow-smile") {
    ctx.save();
    ctx.fillStyle = "#fef08a";
    ctx.fillRect(getCanvasX(100), getCanvasY(100), 180 * scaleX, 200 * scaleY);
    ctx.restore();

    ctx.fillStyle = "#eab308";
    ctx.beginPath();
    ctx.arc(getCanvasX(120), getCanvasY(130), 10 * scaleX, 0, Math.PI * 2);
    ctx.arc(getCanvasX(260), getCanvasY(130), 10 * scaleX, 0, Math.PI * 2);
    ctx.fill();

    const cx = 512;
    const cy = getCanvasY(165);
    const r = 55 * scaleX;

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.clip();
    drawUserImage(cx, cy, 110 * scaleX, 110 * scaleY, mugImage.zoom, mugImage.xOffset, mugImage.yOffset, mugImage.rotation);
    ctx.restore();

    ctx.strokeStyle = "#ca8a04";
    ctx.lineWidth = 4 * scaleX;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  } else if (mugDesign === "quote-block") {
    ctx.save();
    ctx.fillStyle = "#fafaf9";
    ctx.fillRect(getCanvasX(100), getCanvasY(100), 180 * scaleX, 200 * scaleY);
    ctx.restore();

    const x = getCanvasX(125);
    const y = getCanvasY(110);
    const w = 130 * scaleX;
    const h = 120 * scaleY;
    const r = 15 * scaleX;

    ctx.save();
    drawRoundRect(x, y, w, h, r);
    ctx.clip();
    drawUserImage(512, getCanvasY(170), w, h, mugImage.zoom, mugImage.xOffset, mugImage.yOffset, mugImage.rotation);
    ctx.restore();

    ctx.strokeStyle = "#44403c";
    ctx.lineWidth = 3 * scaleX;
    drawRoundRect(x, y, w, h, r);
    ctx.stroke();
  } else if (mugDesign === "valentine") {
    ctx.save();
    ctx.fillStyle = "#fff1f2";
    ctx.fillRect(getCanvasX(100), getCanvasY(100), 180 * scaleX, 200 * scaleY);
    ctx.restore();

    const cx = 512;
    const cy = getCanvasY(195);
    const w = 120 * scaleX;
    const h = 110 * scaleY;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(512, 192);
    ctx.bezierCurveTo(512, 192, 568.9, 102.4, 625.8, 153.6);
    ctx.bezierCurveTo(682.7, 204.8, 654.2, 294.4, 512, 384);
    ctx.bezierCurveTo(369.8, 294.4, 341.3, 204.8, 398.2, 153.6);
    ctx.bezierCurveTo(455.1, 102.4, 512, 192, 512, 192);
    ctx.closePath();
    ctx.clip();
    drawUserImage(cx, cy, w, h, mugImage.zoom, mugImage.xOffset, mugImage.yOffset, mugImage.rotation);
    ctx.restore();

    ctx.strokeStyle = "#e11d48";
    ctx.lineWidth = 4 * scaleX;
    ctx.beginPath();
    ctx.moveTo(512, 192);
    ctx.bezierCurveTo(512, 192, 568.9, 102.4, 625.8, 153.6);
    ctx.bezierCurveTo(682.7, 204.8, 654.2, 294.4, 512, 384);
    ctx.bezierCurveTo(369.8, 294.4, 341.3, 204.8, 398.2, 153.6);
    ctx.bezierCurveTo(455.1, 102.4, 512, 192, 512, 192);
    ctx.closePath();
    ctx.stroke();
  } else {
    const x = getCanvasX(100);
    const y = getCanvasY(100);
    const w = 180 * scaleX;
    const h = 200 * scaleY;

    ctx.save();
    ctx.rect(x, y, w, h);
    ctx.clip();
    drawUserImage(512, 256, w, h, mugImage.zoom, mugImage.xOffset, mugImage.yOffset, mugImage.rotation);
    ctx.restore();
  }

  if (mugText) {
    ctx.save();
    ctx.fillStyle = mugTextColor;
    ctx.font = "bold 26px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = "rgba(255,255,255,0.8)";
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 2;
    ctx.fillText(mugText, 512, getCanvasY(270));
    ctx.restore();
  }
};

const drawPenTexture = (canvas, penColor, penTrim, penText, penTextColor, penImage, loadedImage) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.fillStyle = penColor;
  ctx.fillRect(0, 0, 512, 256);

  ctx.fillStyle = penTrim;
  ctx.fillRect(0, 0, 40, 256);
  ctx.fillRect(472, 0, 40, 256);

  if (loadedImage) {
    ctx.save();
    ctx.translate(256 + penImage.xOffset * 2.0, 128 + penImage.yOffset * 1.5);
    ctx.rotate((penImage.rotation * Math.PI) / 180);
    const drawW = 120 * penImage.zoom;
    const drawH = 30 * penImage.zoom;
    ctx.drawImage(loadedImage, -drawW / 2, -drawH / 2, drawW, drawH);
    ctx.restore();
  }

  if (penText) {
    ctx.save();
    ctx.fillStyle = penTextColor;
    ctx.font = "italic bold 18px serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(penText, 256, 128);
    ctx.restore();
  }
};

const drawPlateTexture = (canvas, plateDesign, plateTitle, plateSubtitle, plateTitleColor, plateSubtitleColor, plateMounts) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, 1024, 512);

  ctx.save();
  ctx.shadowColor = "rgba(15, 23, 42, 0.15)";
  ctx.shadowBlur = 15;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 10;

  ctx.fillStyle = "rgba(255, 255, 255, 0.92)";

  if (plateDesign === "rectangle") {
    ctx.beginPath();
    ctx.moveTo(125, 50);
    ctx.lineTo(899, 50);
    ctx.arcTo(924, 50, 924, 75, 25);
    ctx.lineTo(924, 437);
    ctx.arcTo(924, 462, 899, 462, 25);
    ctx.lineTo(125, 462);
    ctx.arcTo(100, 462, 100, 437, 25);
    ctx.lineTo(100, 75);
    ctx.arcTo(100, 50, 125, 50, 25);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 10;
    ctx.stroke();
  } else if (plateDesign === "oval") {
    ctx.beginPath();
    ctx.ellipse(512, 256, 412, 206, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 10;
    ctx.stroke();
  } else {
    ctx.beginPath();
    ctx.moveTo(150, 50);
    ctx.lineTo(874, 50);
    ctx.lineTo(924, 150);
    ctx.lineTo(924, 362);
    ctx.lineTo(874, 462);
    ctx.lineTo(150, 462);
    ctx.lineTo(100, 362);
    ctx.lineTo(100, 150);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 10;
    ctx.stroke();
  }
  ctx.restore();

  ctx.fillStyle = plateMounts;
  const mountRadius = 16;
  const drawMount = (mx, my) => {
    ctx.beginPath();
    ctx.arc(mx, my, mountRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 4;
    ctx.stroke();
  };

  if (plateDesign === "rectangle" || plateDesign === "bevel") {
    drawMount(150, 100);
    drawMount(874, 100);
    drawMount(150, 412);
    drawMount(874, 412);
  } else {
    drawMount(200, 256);
    drawMount(824, 256);
  }

  if (plateTitle) {
    ctx.save();
    ctx.fillStyle = plateTitleColor;
    ctx.font = "bold 44px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(plateTitle, 512, 220);
    ctx.restore();
  }

  if (plateSubtitle) {
    ctx.save();
    ctx.fillStyle = plateSubtitleColor;
    ctx.font = "bold 20px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(plateSubtitle.toUpperCase(), 512, 300);
    ctx.restore();
  }
};

const drawFrameTexture = (canvas, frameDesign, frameImages, frameLayout, loadedImagesMap) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const woodColor = frameDesign === "oak" ? "#b45309" : frameDesign === "mahogany" ? "#7c2d12" : "#1e293b";

  ctx.fillStyle = woodColor;
  ctx.fillRect(0, 0, 1024, 1024);

  ctx.fillStyle = "#f8fafc";
  ctx.fillRect(50, 50, 924, 924);

  const getSlotsConfig = () => {
    if (frameLayout === "2x2") {
      return [
        { x: 123, y: 123, w: 374, h: 374, cx: 310, cy: 310 },
        { x: 527, y: 123, w: 374, h: 374, cx: 714, cy: 310 },
        { x: 123, y: 527, w: 374, h: 374, cx: 310, cy: 714 },
        { x: 527, y: 527, w: 374, h: 374, cx: 714, cy: 714 },
      ];
    } else if (frameLayout === "3x2") {
      return [
        { x: 123, y: 123, w: 240, h: 374, cx: 243, cy: 310 },
        { x: 392, y: 123, w: 240, h: 374, cx: 512, cy: 310 },
        { x: 661, y: 123, w: 240, h: 374, cx: 781, cy: 310 },
        { x: 123, y: 527, w: 240, h: 374, cx: 243, cy: 714 },
        { x: 392, y: 527, w: 240, h: 374, cx: 512, cy: 714 },
        { x: 661, y: 527, w: 240, h: 374, cx: 781, cy: 714 },
      ];
    } else if (frameLayout === "3x3") {
      return [
        { x: 123, y: 123, w: 240, h: 240, cx: 243, cy: 243 },
        { x: 392, y: 123, w: 240, h: 240, cx: 512, cy: 243 },
        { x: 661, y: 123, w: 240, h: 240, cx: 781, cy: 243 },
        { x: 123, y: 392, w: 240, h: 240, cx: 243, cy: 512 },
        { x: 392, y: 392, w: 240, h: 240, cx: 512, cy: 512 },
        { x: 661, y: 392, w: 240, h: 240, cx: 781, cy: 512 },
        { x: 123, y: 661, w: 240, h: 240, cx: 243, cy: 781 },
        { x: 392, y: 661, w: 240, h: 240, cx: 512, cy: 781 },
        { x: 661, y: 661, w: 240, h: 240, cx: 781, cy: 781 },
      ];
    } else if (frameLayout === "mosaic") {
      return [
        { x: 123, y: 123, w: 240, h: 240, cx: 243, cy: 243 },
        { x: 661, y: 123, w: 240, h: 240, cx: 781, cy: 243 },
        { x: 310, y: 310, w: 404, h: 404, cx: 512, cy: 512 },
        { x: 123, y: 661, w: 240, h: 240, cx: 243, cy: 781 },
        { x: 661, y: 661, w: 240, h: 240, cx: 781, cy: 781 },
      ];
    } else {
      return [
        { x: 123, y: 123, w: 240, h: 240, cx: 243, cy: 243, isHeart: false },
        { x: 661, y: 123, w: 240, h: 240, cx: 781, cy: 243, isHeart: false },
        { x: 310, y: 310, w: 404, h: 404, cx: 512, cy: 512, isHeart: true },
        { x: 123, y: 661, w: 240, h: 240, cx: 243, cy: 781, isHeart: false },
        { x: 661, y: 661, w: 240, h: 240, cx: 781, cy: 781, isHeart: false },
      ];
    }
  };

  const slots = getSlotsConfig();

  slots.forEach((slot, idx) => {
    const data = frameImages[idx] || { url: null, zoom: 1.0, xOffset: 0, yOffset: 0, rotation: 0 };
    const img = loadedImagesMap[idx];

    ctx.save();
    ctx.beginPath();
    if (slot.isHeart) {
      ctx.moveTo(512, 370);
      ctx.bezierCurveTo(512, 370, 560, 270, 610, 320);
      ctx.bezierCurveTo(660, 370, 630, 450, 512, 530);
      ctx.bezierCurveTo(394, 450, 364, 370, 414, 320);
      ctx.bezierCurveTo(464, 270, 512, 370, 512, 370);
      ctx.closePath();
    } else {
      ctx.rect(slot.x, slot.y, slot.w, slot.h);
    }
    ctx.clip();

    if (img) {
      ctx.save();
      ctx.translate(slot.cx + data.xOffset * 2.56, slot.cy + data.yOffset * 2.56);
      ctx.rotate((data.rotation * Math.PI) / 180);
      const drawW = slot.w * data.zoom;
      const drawH = slot.h * data.zoom;
      ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
      ctx.restore();
    } else {
      ctx.fillStyle = "rgba(226, 232, 240, 0.6)";
      ctx.fillRect(slot.x, slot.y, slot.w, slot.h);
      ctx.fillStyle = "#94a3b8";
      ctx.font = "bold 16px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Photo Slot", slot.cx, slot.cy);
    }
    ctx.restore();

    ctx.save();
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 4;
    ctx.beginPath();
    if (slot.isHeart) {
      ctx.moveTo(512, 370);
      ctx.bezierCurveTo(512, 370, 560, 270, 610, 320);
      ctx.bezierCurveTo(660, 370, 630, 450, 512, 530);
      ctx.bezierCurveTo(394, 450, 364, 370, 414, 320);
      ctx.bezierCurveTo(464, 270, 512, 370, 512, 370);
      ctx.closePath();
    } else {
      ctx.rect(slot.x, slot.y, slot.w, slot.h);
    }
    ctx.stroke();
    ctx.restore();
  });
};

const drawLetterheadTexture = (canvas, letterheadName, letterheadAddress, letterheadDesign, loadedImage, letterheadImage) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, 512, 724);

  const designColor = letterheadDesign === "corporate" ? "#b45309" : letterheadDesign === "sidebar" ? "#0f766e" : "#2563eb";

  ctx.fillStyle = designColor;
  ctx.fillRect(0, 0, 512, 12);

  if (letterheadDesign === "sidebar") {
    ctx.fillStyle = "#f8fafc";
    ctx.fillRect(0, 0, 140, 724);
    ctx.fillStyle = "#e2e8f0";
    ctx.fillRect(139, 0, 1, 724);
  }

  if (loadedImage) {
    ctx.save();
    if (letterheadDesign === "sidebar") {
      ctx.translate(70 + letterheadImage.xOffset * 1.28, 80 + letterheadImage.yOffset * 1.28);
    } else {
      ctx.translate(430 + letterheadImage.xOffset * 1.28, 70 + letterheadImage.yOffset * 1.28);
    }
    ctx.rotate((letterheadImage.rotation * Math.PI) / 180);
    const drawSize = 45 * letterheadImage.zoom;
    ctx.drawImage(loadedImage, -drawSize / 2, -drawSize / 2, drawSize, drawSize);
    ctx.restore();
  }

  ctx.save();
  ctx.fillStyle = "#1e293b";
  ctx.font = "bold 20px sans-serif";
  ctx.textAlign = letterheadDesign === "sidebar" ? "left" : "left";
  const titleX = letterheadDesign === "sidebar" ? 18 : 30;
  ctx.fillText(letterheadName, titleX, 75);

  ctx.fillStyle = "#64748b";
  ctx.font = "8px sans-serif";
  ctx.fillText(letterheadAddress, titleX, 95);
  ctx.restore();

  ctx.fillStyle = "#e2e8f0";
  let lineY = 160;
  while (lineY < 640) {
    ctx.fillRect(letterheadDesign === "sidebar" ? 160 : 40, lineY, letterheadDesign === "sidebar" ? 310 : 432, 2);
    lineY += 28;
  }
};

export default function Product3DPreview({ productId }) {
  const session = useSelector((state) => state.customizer.sessions[productId]) || {};

  const mugDesign = session.mugDesign;
  const mugImage = session.mugImage || {};
  const mugImages = session.mugImages || {};
  const mugText = session.mugText;
  const mugTextColor = session.mugTextColor;
  const currentMugBodyColor = session.mugColor;
  const currentMugInnerColor = session.mugInnerColor;
  const currentMugHandleColor = session.mugHandleColor;

  const penColor = session.penColor;
  const penTrim = session.penTrim;
  const penText = session.penText;
  const penTextColor = session.penTextColor;
  const penImage = session.penImage || {};

  const plateDesign = session.plateDesign;
  const plateTitle = session.plateTitle;
  const plateSubtitle = session.plateSubtitle;
  const plateTitleColor = session.plateTitleColor;
  const plateSubtitleColor = session.plateSubtitleColor;
  const plateMounts = session.plateMounts;

  const frameDesign = session.frameDesign;
  const frameImages = session.frameImages || {};
  const frameLayout = session.frameGrid;

  const letterheadName = session.letterheadName;
  const letterheadAddress = session.letterheadAddress;
  const letterheadDesign = session.letterheadDesign;
  const letterheadImage = session.letterheadImage || {};

  const clockShape = session.shape;
  const clockImage = session.image;
  const clockDialType = session.dialType;
  const clockNumberColor = session.numberColor;
  const clockNumberFont = session.numberFont;
  const clockHandColor = session.handColor;
  const clockHandMovement = session.handMovement;
  const clockText = session.text;
  const clockTextColor = session.textColor;
  const clockTextFont = session.textFont;
  const clockTextSize = session.textSize;
  const clockTextPosition = session.textPosition;
  const clockZoom = session.zoom;
  const clockXOffset = session.xOffset;
  const clockYOffset = session.yOffset;
  const clockRotation = session.rotation;
  const containerRef = useRef(null);
  const canvas3DRef = useRef(null);
  const textureCanvasRef = useRef(null);
  const [webglSupported, setWebglSupported] = useState(true);

  const [loadedImage, setLoadedImage] = useState(null);
  const [loadedImagesMap, setLoadedImagesMap] = useState({});
  const [loadedMugImagesMap, setLoadedMugImagesMap] = useState({});

  const isDraggingRef = useRef(false);
  const previousMousePosRef = useRef({ x: 0, y: 0 });
  const modelGroupRef = useRef(null);

  const hourGroupRef = useRef(null);
  const minGroupRef = useRef(null);
  const secGroupRef = useRef(null);

  useEffect(() => {
    if (productId === "mug") {
      // Preload single mug image
      if (mugImage.url) {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => setLoadedImage(img);
        img.src = mugImage.url;
      } else {
        setLoadedImage(null);
      }

      // Preload multi-slot mug images
      const newMugImagesMap = {};
      const slots = ["0", "1"];
      const keysWithUrl = slots.filter((k) => mugImages[k]?.url);
      if (keysWithUrl.length === 0) {
        setLoadedMugImagesMap({});
      } else {
        let loadedCount = 0;
        keysWithUrl.forEach((key) => {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.onload = () => {
            newMugImagesMap[key] = img;
            loadedCount++;
            if (loadedCount === keysWithUrl.length) {
              setLoadedMugImagesMap(newMugImagesMap);
            }
          };
          img.src = mugImages[key].url;
        });
      }
    } else if (productId === "pen") {
      if (!penImage.url) {
        setLoadedImage(null);
        return;
      }
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => setLoadedImage(img);
      img.src = penImage.url;
    } else if (productId === "letterhead") {
      if (!letterheadImage.url) {
        setLoadedImage(null);
        return;
      }
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => setLoadedImage(img);
      img.src = letterheadImage.url;
    } else if (productId === "clock") {
      if (!clockImage) {
        setLoadedImage(null);
        return;
      }
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => setLoadedImage(img);
      img.src = clockImage;
    }
  }, [productId, mugImage?.url, mugImages, penImage?.url, letterheadImage?.url, clockImage]);

  useEffect(() => {
    if (productId !== "frame") return;
    const newImagesMap = {};
    const slotsKeys = Object.keys(frameImages);
    const keysWithUrl = slotsKeys.filter((k) => frameImages[k]?.url);

    if (keysWithUrl.length === 0) {
      setLoadedImagesMap({});
      return;
    }

    let loadedCount = 0;
    keysWithUrl.forEach((key) => {
      const slotData = frameImages[key];
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        newImagesMap[key] = img;
        loadedCount++;
        if (loadedCount === keysWithUrl.length) {
          setLoadedImagesMap(newImagesMap);
        }
      };
      img.src = slotData.url;
    });
  }, [productId, frameImages]);

  useEffect(() => {
    const texCanvas = textureCanvasRef.current;
    if (!texCanvas) return;

    if (productId === "mug") {
      drawMugTexture(
        texCanvas,
        mugDesign,
        mugImage,
        mugText,
        mugTextColor,
        currentMugBodyColor,
        currentMugInnerColor,
        currentMugHandleColor,
        loadedImage,
        mugImages,
        loadedMugImagesMap
      );
    } else if (productId === "pen") {
      drawPenTexture(
        texCanvas,
        penColor,
        penTrim,
        penText,
        penTextColor,
        penImage,
        loadedImage
      );
    } else if (productId === "plate") {
      drawPlateTexture(
        texCanvas,
        plateDesign,
        plateTitle,
        plateSubtitle,
        plateTitleColor,
        plateSubtitleColor,
        plateMounts
      );
    } else if (productId === "frame") {
      drawFrameTexture(
        texCanvas,
        frameDesign,
        frameLayout,
        frameImages,
        loadedImagesMap
      );
    } else if (productId === "letterhead") {
      drawLetterheadTexture(
        texCanvas,
        letterheadName,
        letterheadAddress,
        letterheadDesign,
        loadedImage,
        letterheadImage
      );
    } else if (productId === "clock") {
      drawClockTexture(
        texCanvas,
        clockShape,
        loadedImage,
        clockDialType,
        clockNumberColor,
        clockNumberFont,
        clockHandColor,
        clockHandMovement,
        clockText,
        clockTextColor,
        clockTextFont,
        clockTextSize,
        clockTextPosition,
        clockZoom,
        clockXOffset,
        clockYOffset,
        clockRotation
      );
    }
  }, [
    productId,
    mugDesign,
    mugImage,
    mugImages,
    mugText,
    mugTextColor,
    currentMugBodyColor,
    currentMugInnerColor,
    currentMugHandleColor,
    loadedMugImagesMap,
    penColor,
    penTrim,
    penText,
    penTextColor,
    penImage,
    loadedImage,
    plateDesign,
    plateTitle,
    plateSubtitle,
    plateTitleColor,
    plateSubtitleColor,
    plateMounts,
    frameDesign,
    frameImages,
    frameLayout,
    loadedImagesMap,
    letterheadName,
    letterheadAddress,
    letterheadDesign,
    letterheadImage,
    clockShape,
    clockDialType,
    clockNumberColor,
    clockNumberFont,
    clockHandColor,
    clockHandMovement,
    clockText,
    clockTextColor,
    clockTextFont,
    clockTextSize,
    clockTextPosition,
    clockZoom,
    clockXOffset,
    clockYOffset,
    clockRotation,
  ]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas3D = canvas3DRef.current;
    const texCanvas = textureCanvasRef.current;
    if (!container || !canvas3D || !texCanvas) return;

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.5);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: canvas3D,
        antialias: true,
        alpha: true,
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    } catch (err) {
      console.warn(err);
      setWebglSupported(false);
      return;
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.85);
    dirLight1.position.set(5, 7, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.3);
    dirLight2.position.set(-5, 3, -5);
    scene.add(dirLight2);

    const modelGroup = new THREE.Group();
    modelGroupRef.current = modelGroup;
    scene.add(modelGroup);

    const texture = new THREE.CanvasTexture(texCanvas);
    texture.colorSpace = THREE.SRGBColorSpace;

    const geometriesToDispose = [];
    const materialsToDispose = [];
    const texturesToDispose = [texture];

    if (productId === "mug") {
      modelGroup.rotation.y = -Math.PI * 0.25;

      const outerGeom = new THREE.CylinderGeometry(1.6, 1.6, 3.6, 64, 1, true);
      const outerMat = new THREE.MeshStandardMaterial({
        map: texture,
        side: THREE.DoubleSide,
        roughness: 0.12,
        metalness: 0.05,
      });
      const outerMesh = new THREE.Mesh(outerGeom, outerMat);
      outerMesh.rotation.y = Math.PI;
      modelGroup.add(outerMesh);
      geometriesToDispose.push(outerGeom);
      materialsToDispose.push(outerMat);

      const innerGeom = new THREE.CylinderGeometry(1.54, 1.54, 3.52, 64, 1, true);
      const innerMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(currentMugInnerColor),
        roughness: 0.08,
        metalness: 0.05,
      });
      const innerMesh = new THREE.Mesh(innerGeom, innerMat);
      innerMesh.position.y = 0.04;
      modelGroup.add(innerMesh);
      geometriesToDispose.push(innerGeom);
      materialsToDispose.push(innerMat);

      const rimGeom = new THREE.TorusGeometry(1.57, 0.03, 16, 64);
      const rimMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(currentMugBodyColor),
        roughness: 0.12,
        metalness: 0.05,
      });
      const rimMesh = new THREE.Mesh(rimGeom, rimMat);
      rimMesh.rotation.x = Math.PI / 2;
      rimMesh.position.y = 1.8;
      modelGroup.add(rimMesh);
      geometriesToDispose.push(rimGeom);
      materialsToDispose.push(rimMat);

      const bottomGeom = new THREE.CircleGeometry(1.6, 64);
      const bottomMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(currentMugBodyColor),
        roughness: 0.12,
        metalness: 0.05,
        side: THREE.DoubleSide,
      });
      const bottomMesh = new THREE.Mesh(bottomGeom, bottomMat);
      bottomMesh.rotation.x = Math.PI / 2;
      bottomMesh.position.y = -1.8;
      modelGroup.add(bottomMesh);
      geometriesToDispose.push(bottomGeom);
      materialsToDispose.push(bottomMat);

      const innerBottomGeom = new THREE.CircleGeometry(1.54, 64);
      const innerBottomMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(currentMugInnerColor),
        roughness: 0.08,
        metalness: 0.05,
        side: THREE.DoubleSide,
      });
      const innerBottomMesh = new THREE.Mesh(innerBottomGeom, innerBottomMat);
      innerBottomMesh.rotation.x = Math.PI / 2;
      innerBottomMesh.position.y = -1.72;
      modelGroup.add(innerBottomMesh);
      geometriesToDispose.push(innerBottomGeom);
      materialsToDispose.push(innerBottomMat);

      const handleGeom = new THREE.TorusGeometry(0.85, 0.15, 16, 64, Math.PI * 1.1);
      const handleMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(currentMugHandleColor),
        roughness: 0.12,
        metalness: 0.05,
      });
      const handleMesh = new THREE.Mesh(handleGeom, handleMat);
      handleMesh.position.set(0, 0, -1.4);
      handleMesh.rotation.y = Math.PI / 2;
      handleMesh.rotation.z = -Math.PI * 0.55;
      modelGroup.add(handleMesh);
      geometriesToDispose.push(handleGeom);
      materialsToDispose.push(handleMat);
    } else if (productId === "pen") {
      modelGroup.rotation.z = Math.PI * 0.1;

      const barrelGeom = new THREE.CylinderGeometry(0.12, 0.12, 3.8, 32);
      const barrelMat = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.15,
        metalness: 0.1,
      });
      const barrelMesh = new THREE.Mesh(barrelGeom, barrelMat);
      modelGroup.add(barrelMesh);
      geometriesToDispose.push(barrelGeom);
      materialsToDispose.push(barrelMat);

      const tipGeom = new THREE.ConeGeometry(0.12, 0.5, 32);
      const trimMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(penTrim),
        roughness: 0.1,
        metalness: 0.8,
      });
      const tipMesh = new THREE.Mesh(tipGeom, trimMat);
      tipMesh.position.y = -2.15;
      tipMesh.rotation.x = Math.PI;
      modelGroup.add(tipMesh);
      geometriesToDispose.push(tipGeom);
      materialsToDispose.push(trimMat);

      const capGeom = new THREE.CylinderGeometry(0.13, 0.13, 1.2, 32);
      const capMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(penColor),
        roughness: 0.15,
        metalness: 0.1,
      });
      const capMesh = new THREE.Mesh(capGeom, capMat);
      capMesh.position.y = 2.0;
      modelGroup.add(capMesh);
      geometriesToDispose.push(capGeom);
      materialsToDispose.push(capMat);

      const clipGeom = new THREE.BoxGeometry(0.04, 0.8, 0.2);
      const clipMesh = new THREE.Mesh(clipGeom, trimMat);
      clipMesh.position.set(0, 2.0, 0.2);
      modelGroup.add(clipMesh);
      geometriesToDispose.push(clipGeom);

      const ringGeom = new THREE.TorusGeometry(0.13, 0.015, 8, 32);
      const ringMesh = new THREE.Mesh(ringGeom, trimMat);
      ringMesh.rotation.x = Math.PI / 2;
      ringMesh.position.y = 1.4;
      modelGroup.add(ringMesh);
      geometriesToDispose.push(ringGeom);
    } else if (productId === "plate") {
      modelGroup.rotation.y = -Math.PI * 0.08;

      const plateGeom = new THREE.BoxGeometry(4.8, 2.4, 0.08);
      const frontMat = new THREE.MeshPhysicalMaterial({
        map: texture,
        transparent: true,
        roughness: 0.05,
        transmission: 0.9,
        thickness: 0.1,
      });
      const clearMat = new THREE.MeshPhysicalMaterial({
        transparent: true,
        roughness: 0.05,
        transmission: 0.9,
        thickness: 0.1,
      });
      const plateMesh = new THREE.Mesh(plateGeom, [clearMat, clearMat, clearMat, clearMat, frontMat, clearMat]);
      modelGroup.add(plateMesh);
      geometriesToDispose.push(plateGeom);
      materialsToDispose.push(frontMat, clearMat);

      const screwGeom = new THREE.CylinderGeometry(0.08, 0.08, 0.16, 16);
      const screwMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(plateMounts),
        roughness: 0.1,
        metalness: 0.8,
      });

      const drawScrew = (sx, sy) => {
        const screw = new THREE.Mesh(screwGeom, screwMat);
        screw.rotation.x = Math.PI / 2;
        screw.position.set(sx, sy, 0.04);
        modelGroup.add(screw);
      };

      if (plateDesign === "rectangle" || plateDesign === "bevel") {
        drawScrew(-2.1, 0.9);
        drawScrew(2.1, 0.9);
        drawScrew(-2.1, -0.9);
        drawScrew(2.1, -0.9);
      } else {
        drawScrew(-2.1, 0);
        drawScrew(2.1, 0);
      }
      geometriesToDispose.push(screwGeom);
      materialsToDispose.push(screwMat);
    } else if (productId === "frame") {
      modelGroup.rotation.y = -Math.PI * 0.05;

      const frameGeom = new THREE.BoxGeometry(4.0, 4.0, 0.15);
      const woodColorHex = frameDesign === "oak" ? "#b45309" : frameDesign === "mahogany" ? "#7c2d12" : "#1e293b";
      const frontMat = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.35,
        metalness: 0.05,
      });
      const woodMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(woodColorHex),
        roughness: 0.5,
        metalness: 0.05,
      });
      const backMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(woodColorHex),
        roughness: 0.7,
        metalness: 0.05,
      });
      const frameMesh = new THREE.Mesh(frameGeom, [woodMat, woodMat, woodMat, woodMat, frontMat, backMat]);
      modelGroup.add(frameMesh);
      geometriesToDispose.push(frameGeom);
      materialsToDispose.push(frontMat, woodMat, backMat);
    } else if (productId === "letterhead") {
      modelGroup.rotation.x = Math.PI * 0.1;
      modelGroup.rotation.y = -Math.PI * 0.05;

      const sheetGeom = new THREE.PlaneGeometry(3.6, 5.1);
      const sheetMat = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.8,
        metalness: 0.0,
        side: THREE.DoubleSide,
      });
      const sheetMesh = new THREE.Mesh(sheetGeom, sheetMat);
      modelGroup.add(sheetMesh);
      geometriesToDispose.push(sheetGeom);
      materialsToDispose.push(sheetMat);
    } else if (productId === "clock") {
      modelGroup.rotation.x = Math.PI * 0.15;

      const dialGeom = clockShape === "oval"
        ? new THREE.PlaneGeometry(2.7, 3.6)
        : new THREE.PlaneGeometry(3.6, 3.6);
      const dialMat = new THREE.MeshStandardMaterial({
        map: texture,
        transparent: true,
        roughness: 0.15,
        metalness: 0.05,
        side: THREE.FrontSide,
      });
      const dialMesh = new THREE.Mesh(dialGeom, dialMat);
      dialMesh.position.z = 0.01;
      modelGroup.add(dialMesh);
      geometriesToDispose.push(dialGeom);
      materialsToDispose.push(dialMat);

      const backCanvas = document.createElement("canvas");
      backCanvas.width = 1024;
      backCanvas.height = 1024;
      const backCtx = backCanvas.getContext("2d");
      if (backCtx) {
        backCtx.clearRect(0, 0, 1024, 1024);
        drawClockShapePath(backCtx, clockShape);
        backCtx.fillStyle = "#ffffff";
        backCtx.fill();
        backCtx.strokeStyle = "rgba(226, 232, 240, 0.8)";
        backCtx.lineWidth = 6;
        backCtx.stroke();
      }
      const backTexture = new THREE.CanvasTexture(backCanvas);
      texturesToDispose.push(backTexture);

      const backPlateMat = new THREE.MeshStandardMaterial({
        map: backTexture,
        transparent: true,
        roughness: 0.5,
        metalness: 0.05,
        side: THREE.BackSide,
      });
      const backPlateMesh = new THREE.Mesh(dialGeom, backPlateMat);
      backPlateMesh.position.z = 0.0;
      modelGroup.add(backPlateMesh);
      materialsToDispose.push(backPlateMat);

      const caseGeom = new THREE.BoxGeometry(1.2, 1.2, 0.4);
      const caseMat = new THREE.MeshStandardMaterial({
        color: 0x111111,
        roughness: 0.8,
      });
      const caseMesh = new THREE.Mesh(caseGeom, caseMat);
      caseMesh.position.z = -0.2;
      modelGroup.add(caseMesh);
      geometriesToDispose.push(caseGeom);
      materialsToDispose.push(caseMat);

      let hourLength = 0.9;
      let minLength = 1.25;
      let secLength = 1.45;

      if (clockShape === "oval" || clockShape === "heart") {
        hourLength = 0.65;
        minLength = 0.95;
        secLength = 1.1;
      }

      const pinGeom = new THREE.CylinderGeometry(0.03, 0.03, 0.06, 16);
      const pinMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(clockHandColor),
        roughness: 0.2,
        metalness: 0.8,
      });
      const pinMesh = new THREE.Mesh(pinGeom, pinMat);
      pinMesh.rotation.x = Math.PI / 2;
      pinMesh.position.z = 0.026;
      modelGroup.add(pinMesh);
      geometriesToDispose.push(pinGeom);
      materialsToDispose.push(pinMat);

      const hourGeom = new THREE.BoxGeometry(0.05, hourLength, 0.01);
      const hourMat = new THREE.MeshStandardMaterial({
        color: 0x111111,
        roughness: 0.5,
      });
      const hourMesh = new THREE.Mesh(hourGeom, hourMat);
      hourMesh.position.set(0, hourLength / 2, 0.0);
      const hourGroup = new THREE.Group();
      hourGroup.add(hourMesh);
      hourGroup.position.z = 0.015;
      modelGroup.add(hourGroup);
      hourGroupRef.current = hourGroup;
      geometriesToDispose.push(hourGeom);
      materialsToDispose.push(hourMat);

      const minGeom = new THREE.BoxGeometry(0.04, minLength, 0.01);
      const minMat = new THREE.MeshStandardMaterial({
        color: 0x111111,
        roughness: 0.5,
      });
      const minMesh = new THREE.Mesh(minGeom, minMat);
      minMesh.position.set(0, minLength / 2, 0.0);
      const minGroup = new THREE.Group();
      minGroup.add(minMesh);
      minGroup.position.z = 0.020;
      modelGroup.add(minGroup);
      minGroupRef.current = minGroup;
      geometriesToDispose.push(minGeom);
      materialsToDispose.push(minMat);

      const secGeom = new THREE.BoxGeometry(0.02, secLength, 0.01);
      const secMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(clockHandColor),
        roughness: 0.2,
        metalness: 0.5,
      });
      const secMesh = new THREE.Mesh(secGeom, secMat);
      secMesh.position.set(0, secLength / 2, 0.0);
      const secGroup = new THREE.Group();
      secGroup.add(secMesh);
      secGroup.position.z = 0.025;
      modelGroup.add(secGroup);
      secGroupRef.current = secGroup;
      geometriesToDispose.push(secGeom);
      materialsToDispose.push(secMat);
    }

    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (texture) {
        texture.needsUpdate = true;
      }

      if (!isDraggingRef.current && productId !== "letterhead") {
        modelGroup.rotation.y += 0.005;
      }

      const hourGroup = hourGroupRef.current;
      const minGroup = minGroupRef.current;
      const secGroup = secGroupRef.current;
      if (hourGroup && minGroup && secGroup) {
        const getHandAngles = () => {
          if (clockHandMovement === "static") {
            return { hour: 305, minute: 60, second: 180 };
          }
          const t = new Date();
          const hrs = t.getHours();
          const mins = t.getMinutes();
          const secs = t.getSeconds();
          const ms = t.getMilliseconds();
          const secondAngle = clockHandMovement === "sweep" 
            ? (secs * 6) + (ms * 0.006) 
            : secs * 6;
          const minuteAngle = (mins * 6) + (secs * 0.1);
          const hourAngle = ((hrs % 12) * 30) + (mins * 0.5);
          return { hour: hourAngle, minute: minuteAngle, second: secondAngle };
        };
        const angles = getHandAngles();
        hourGroup.rotation.z = -angles.hour * Math.PI / 180;
        minGroup.rotation.z = -angles.minute * Math.PI / 180;
        secGroup.rotation.z = -angles.second * Math.PI / 180;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container || !canvas3D) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();
      if (renderer) {
        renderer.dispose();
      }
      geometriesToDispose.forEach((g) => g.dispose());
      materialsToDispose.forEach((m) => m.dispose());
      texturesToDispose.forEach((t) => t.dispose());
    };
  }, [
    productId,
    currentMugBodyColor,
    currentMugInnerColor,
    currentMugHandleColor,
    penColor,
    penTrim,
    plateDesign,
    plateMounts,
    frameDesign,
    frameLayout,
    clockHandColor,
    clockHandMovement,
    clockShape,
  ]);

  const onMouseDown = (e) => {
    isDraggingRef.current = true;
    previousMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseMove = (e) => {
    if (!isDraggingRef.current || !modelGroupRef.current) return;
    const deltaX = e.clientX - previousMousePosRef.current.x;
    const deltaY = e.clientY - previousMousePosRef.current.y;
    modelGroupRef.current.rotation.y += deltaX * 0.007;
    modelGroupRef.current.rotation.x += deltaY * 0.007;
    previousMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseUp = () => {
    isDraggingRef.current = false;
  };

  const onTouchStart = (e) => {
    if (e.touches.length !== 1) return;
    isDraggingRef.current = true;
    previousMousePosRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const onTouchMove = (e) => {
    if (!isDraggingRef.current || !modelGroupRef.current || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - previousMousePosRef.current.x;
    const deltaY = e.touches[0].clientY - previousMousePosRef.current.y;
    modelGroupRef.current.rotation.y += deltaX * 0.007;
    modelGroupRef.current.rotation.x += deltaY * 0.007;
    previousMousePosRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const onTouchEnd = () => {
    isDraggingRef.current = false;
  };

  if (!webglSupported) {
    return (
      <div className="w-full h-full min-h-[300px] flex flex-col items-center justify-center text-center p-5 bg-slate-100/50 rounded-2xl border border-slate-200">
        <span className="text-sm font-bold text-slate-500">3D Preview Unavailable</span>
        <span className="text-xs text-slate-400 mt-1">WebGL is not supported in this browser or device.</span>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[300px] flex items-center justify-center relative select-none cursor-grab active:cursor-grabbing"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <canvas ref={canvas3DRef} className="w-full h-full block" />
      <canvas
        ref={textureCanvasRef}
        width={productId === "frame" || productId === "clock" ? "1024" : productId === "letterhead" ? "512" : "1024"}
        height={productId === "frame" || productId === "clock" ? "1024" : productId === "letterhead" ? "724" : "512"}
        className="hidden"
      />
    </div>
  );
}
