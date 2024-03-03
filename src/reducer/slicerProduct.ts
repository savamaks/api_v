import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { getItems } from "../api/getItems";

interface appState {
    ids: Array<string>;
    entities: any;
    loading: boolean;
    error: boolean;
}
interface IProduct {
    id: string;
}
const itemsAdapter = createEntityAdapter({
    selectId: (product: IProduct) => product.id,
});

const initialState: appState = itemsAdapter.getInitialState({
    loading: false,
    error: false,
});

export const slicerProduct = createSlice({
    name: "slicerProduct",
    initialState,
    reducers: {
        removeAll: itemsAdapter.removeAll,
    },

    extraReducers(builder) {
        builder.addCase(getItems.pending, (state) => {
            state.loading = true;
        }),
            builder.addCase(getItems.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                if (action.payload.error) {
                    state.error = true;
                } else if (action.payload.result) {
                    itemsAdapter.removeAll(state);
                    itemsAdapter.addMany(state, action.payload.result);
                }
            }),
            builder.addCase(getItems.rejected, (state) => {
                state.loading = false;
                state.error = true;
            });
    },
});

export const { removeAll } = slicerProduct.actions;

export const selectors = itemsAdapter.getSelectors((state: appState) => state);

export default slicerProduct.reducer;
