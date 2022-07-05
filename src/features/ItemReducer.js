import { createSlice } from "@reduxjs/toolkit"

const itemSlice = createSlice({
    name: "item",
    initialState: { value: { items: "hii", isLoading: false, currentPage: 1 } },
    reducers: {
        itemReducer: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { itemReducer } = itemSlice.actions
export default itemSlice.reducer