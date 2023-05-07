import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import baseURL from "../../../utils/baseURL"


const initialState = {
    transactions: [],
    transaction: [],
    loading: false,
    error: null,
    isAdded: false,
    isUpdated: false

}

export const createTransactionAction = createAsyncThunk('transaction/create', async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
        const { account, name, transactionType, amount, category, notes } = payload
        const token = getState()?.users?.userAuth?.userInfo?.token;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        //make a request
        const { data } = await axios.post(`${baseURL}/transactions`,
            { account, name, transactionType, amount, category, notes, account: payload.id }, config)
        return data
    } catch (error) {
        return rejectWithValue(error?.response?.data)
    }
})

const transactionSlice = createSlice({
    name: 'transactions',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(createTransactionAction.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(createTransactionAction.fulfilled, (state, action) => {
            state.loading = false
            state.isAdded = true
            state.transaction = action.payload
        })
        builder.addCase(createTransactionAction.rejected, (state, action) => {
            state.loading = false
            state.isAdded = false
            state.transaction = null
            state.error = action.payload
        })

    }
})

const transactionReducer = transactionSlice.reducer;
export default transactionReducer