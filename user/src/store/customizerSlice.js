import { createSlice } from "@reduxjs/toolkit";

const initialStates = {
  clock: {
    shape: "circle",
    roomBackground: "living-room",
    image: null,
    zoom: 1.0,
    xOffset: 0,
    yOffset: 0,
    rotation: 0,
    dialType: "numbers",
    numberColor: "#000000",
    numberFont: "Inter",
    handColor: "#d4af37",
    handMovement: "sweep",
    text: "",
    textFont: "Inter",
    textColor: "#000000",
    textSize: 20,
    textPosition: 70,
    size: '12" x 12"',
  },
  mug: {
    mugDesign: "standard",
    mugColor: "#ffffff",
    mugInnerColor: "#ffffff",
    mugHandleColor: "#ffffff",
    mugTextColor: "#1e293b",
    mugSize: "11 Oz",
    mugText: "Upload Your Photo",
    mugImage: { url: null, zoom: 1.0, xOffset: 0, yOffset: 0, rotation: 0 },
    mugImages: {
      0: { url: null, zoom: 1.0, xOffset: 0, yOffset: 0, rotation: 0 },
      1: { url: null, zoom: 1.0, xOffset: 0, yOffset: 0, rotation: 0 },
    },
    activeMugSlot: 0,
  },
  pen: {
    penDesign: "classic",
    penSize: "Standard",
    penColor: "#1e293b",
    penTrim: "#d4af37",
    penText: "Alex Mercer",
    penTextColor: "#ffffff",
    penImage: { url: null, zoom: 1.0, xOffset: 0, yOffset: 0, rotation: 0 },
  },
  plate: {
    plateDesign: "rectangle",
    plateSize: '12" x 6"',
    plateMounts: "#d4af37",
    plateTitle: "Dr. Olivia Bennett",
    plateSubtitle: "Chief Medical Officer",
    plateTitleColor: "#1e293b",
    plateSubtitleColor: "#64748b",
  },
  frame: {
    frameDesign: "oak",
    frameSize: '16" x 16"',
    frameGrid: "2x2",
    frameImages: {
      0: { url: null, zoom: 1.0, xOffset: 0, yOffset: 0, rotation: 0 },
      1: { url: null, zoom: 1.0, xOffset: 0, yOffset: 0, rotation: 0 },
      2: { url: null, zoom: 1.0, xOffset: 0, yOffset: 0, rotation: 0 },
      3: { url: null, zoom: 1.0, xOffset: 0, yOffset: 0, rotation: 0 },
      4: { url: null, zoom: 1.0, xOffset: 0, yOffset: 0, rotation: 0 },
      5: { url: null, zoom: 1.0, xOffset: 0, yOffset: 0, rotation: 0 },
      6: { url: null, zoom: 1.0, xOffset: 0, yOffset: 0, rotation: 0 },
      7: { url: null, zoom: 1.0, xOffset: 0, yOffset: 0, rotation: 0 },
      8: { url: null, zoom: 1.0, xOffset: 0, yOffset: 0, rotation: 0 },
    },
    activeFrameSlot: 0,
  },
  letterhead: {
    letterheadDesign: "modern",
    letterheadSize: "A4",
    letterheadName: "Acme Corporation",
    letterheadAddress: "123 Innovation Way, Tech Park",
    letterheadImage: { url: null, zoom: 1.0, xOffset: 0, yOffset: 0, rotation: 0 },
  },
};

const customizerSlice = createSlice({
  name: "customizer",
  initialState: {
    sessions: { ...initialStates },
    is3D: {
      clock: false,
      mug: false,
      pen: false,
      plate: false,
      frame: false,
      letterhead: false,
    },
  },
  reducers: {
    updateSession: (state, action) => {
      const { productId, fields } = action.payload;
      state.sessions[productId] = { ...state.sessions[productId], ...fields };
    },
    resetSession: (state, action) => {
      const { productId } = action.payload;
      state.sessions[productId] = { ...initialStates[productId] };
    },
    set3DMode: (state, action) => {
      const { productId, value } = action.payload;
      state.is3D[productId] = value;
    },
  },
});

export const { updateSession, resetSession, set3DMode } = customizerSlice.actions;
export default customizerSlice.reducer;
