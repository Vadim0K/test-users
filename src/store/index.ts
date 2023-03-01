import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import mainSlice from "./reducer";

export const store = configureStore({
  reducer: {
    main: mainSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
