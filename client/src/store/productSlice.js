import {createSlice} from "@reduxjs/toolkit";

const productSlice = createSlice({
        name: 'product',
        initialState: {
            products: [],
            loading: false,
            error: null,
        },

        reducers: {
            setProducts: (state, action) => {
                state.loading = true;
                state.products = action.payload;
                state.error = null;
                state.loading = false;
            },

            setErrors: (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }
            
        }
    }
);

export const {setProducts, setErrors} = productSlice.actions;
export const ProductReducer = productSlice.reducer;