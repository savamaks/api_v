import { configureStore } from "@reduxjs/toolkit";
import appSlicer from "./appSlice";
import slicerProduct from "./slicerProduct";

export const store = configureStore({
    reducer: {
        appSlicer: appSlicer,
        slicerProduct: slicerProduct,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
