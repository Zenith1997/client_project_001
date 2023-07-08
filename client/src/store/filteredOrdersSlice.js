import {createSlice} from "@reduxjs/toolkit";

const filteredOrderSlice = createSlice({
        name: 'filteredOrders',
        initialState: {
            filteredOrders: [],
        },

        reducers: {
            setFilteredOrders: (state, action) => {
                state.loading = true;
                state.filteredOrders = action.payload;
            },
            setFilteredOrdersforSearch: (state, action) => {
                state.loading = true;
                state.filteredOrders.orders = action.payload
            }
        }
    }
);

export const {setFilteredOrders, setFilteredOrdersforSearch} = filteredOrderSlice.actions;
export const FilteredOrderReducer = filteredOrderSlice.reducer;