import { createSlice } from "@reduxjs/toolkit";


let initialState = {
    currencyValue: "$"
}

const currencySlice = createSlice({
    name: "currency",
    initialState,
    reducers: {
        setCurrency(state, action) {
           state.currencyValue = action.payload
        }
    }
})


export const currencySliceActions = currencySlice.actions

export default currencySlice.reducer