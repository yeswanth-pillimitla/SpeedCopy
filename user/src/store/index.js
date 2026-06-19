import { configureStore } from "@reduxjs/toolkit";
import customizerReducer from "./customizerSlice";

export const store = configureStore({
  reducer: {
    customizer: customizerReducer,
  },
});
