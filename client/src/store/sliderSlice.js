import {createSlice} from "@reduxjs/toolkit";

const sliderSlice = createSlice({
        name: 'slider',
        initialState: {
            sliders: [],
        },

        reducers: {
            setSliders: (state, action) => {
                state.sliders = action.payload;
            },
        }
    }
);

export const {setSliders} = sliderSlice.actions;
export default sliderSlice.reducer;