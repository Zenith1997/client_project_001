import {createSlice} from "@reduxjs/toolkit";

const filteredProductSlice = createSlice({
        name: 'filteredProducts',
        initialState: {
            filteredProducts: [],
        },

        reducers: {
            setFilteredProducts: (state, action) => {
                state.loading = true;
                state.filteredProducts = action.payload;
            }
        }
    }
);

export const {setFilteredProducts} = filteredProductSlice.actions;
export const FilteredProductReducer = filteredProductSlice.reducer;