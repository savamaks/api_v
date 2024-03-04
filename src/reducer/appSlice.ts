import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { getIds } from "../api/getIds";
import { getBrend } from "../api/getBrend";

interface appState {
    ids: Array<string>;
    entities: Record<string, IIds>;
    loading: boolean;
    error: boolean;
    loadingFilterBrand: boolean;
    errorFilterBrand: boolean;
    page: number;
    amountPage: number;
    paginator: number;
    dataRequest: {
        action: string;
        params: { offset?: number; ids?: number };
    };
    filterBrend: Array<string | any>;
    selectBrend: string;
}
interface IIds {
    id: string;
}
const appAdapter = createEntityAdapter({
    selectId: (product: IIds) => product.id,
});

const initialState: appState = appAdapter.getInitialState({
    loading: false,
    error: false,
    loadingFilterBrand: false,
    errorFilterBrand: false,
    page: 1, //первая страница
    amountPage: 0, //количество страниц
    paginator: 7, //количество отображаемы конопок страниц
    dataRequest: {
        action: "",
        params: {},
    },
    filterBrend: [],
    selectBrend: "All",
});

export const appSlicer = createSlice({
    name: "appSlicer",
    initialState,
    reducers: {
        changePage(state, action) {
            state.page = action.payload;
        },
        changeAmountPage(state, action) {
            state.amountPage = action.payload;
        },
        changeDataRequest(state, action) {
            state.dataRequest = action.payload;
        },
        changeFilter(state, action) {
            state.filterBrend = action.payload;
        },
        changeSelectBrend(state, action) {
            state.selectBrend = action.payload;
        },
    },

    extraReducers(builder) {
        builder.addCase(getIds.pending, (state) => {
            state.loading = true;
            appAdapter.removeAll(state);
        }),
            builder.addCase(getIds.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                if (action.payload.error) {
                    state.error = true;
                } else if (action.payload.result) {
                    action.payload.result.map((el: string) => {
                        appAdapter.addOne(state, { id: el });
                    });
                }
            }),
            builder.addCase(getIds.rejected, (state) => {
                state.loading = false;
                state.error = true;
            });

        //getFilter
        builder.addCase(getBrend.pending, (state) => {
            state.loadingFilterBrand = true;
        }),
            builder.addCase(getBrend.fulfilled, (state, action) => {
                state.loadingFilterBrand = false;
                state.errorFilterBrand = false;

                if (action.payload.error) {
                    state.errorFilterBrand = true;
                } else if (action.payload.result) {
                    const set = new Set();
                    action.payload.result.map((el: string | null) => {
                        if (el === null) return;
                        set.add(el);
                    });
                    const array: Array<string | any> = Array.from(set);
                    state.filterBrend = array;
                }
            }),
            builder.addCase(getBrend.rejected, (state) => {
                state.loadingFilterBrand = false;
                state.errorFilterBrand = true;
            });
    },
});

export const { changeSelectBrend, changeFilter, changeDataRequest, changePage, changeAmountPage } = appSlicer.actions;

export const selectors = appAdapter.getSelectors((state: appState) => state);

export default appSlicer.reducer;
