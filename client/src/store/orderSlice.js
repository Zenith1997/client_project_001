import {createSlice} from "@reduxjs/toolkit";

const orderSlice = createSlice({
        name: 'order',
        initialState: {
            orders: [],
            loading: false,
            error: false,
        },

        reducers: {
            setOrders: (state, action) => {
                state.loading = true;
                state.orders = action.payload;
                state.error = false;
                state.loading = false;
            },

            setErrors: (state, action) => {
                state.loading = true;
                state.error = action.payload;
            }
        }
    }
);

export const {setOrders, setErrors} = orderSlice.actions;
export const OrderSlice = orderSlice.reducer;