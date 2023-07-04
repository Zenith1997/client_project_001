import {createSlice} from "@reduxjs/toolkit";

const filteredSliderSlice = createSlice({
        name: 'filteredSliders',
        initialState: {
            filteredSliders: [],
        },

        reducers: {
            setFilteredSliders: (state, action) => {
                state.loading = true;
                state.filteredSliders = action.payload;
            },
        }
    }
);

export const { setFilteredSliders } = filteredSliderSlice.actions;
export const FilteredSliderReducer = filteredSliderSlice.reducer;