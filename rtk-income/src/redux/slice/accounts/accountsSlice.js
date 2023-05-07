
//initialState

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import baseURL from "../../../utils/baseURL";

const initialState = {
    account: {},
    accounts: [],
    error: null,
    loading: false,
    success: false,
    isUpdated: false
}

//action to create account/project
export const createAccountAction = createAsyncThunk('account/create', async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
        const { name, initialBalance, accountType, notes } = payload
        const token = getState()?.users?.userAuth?.userInfo?.token;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        //make a request
        const { data } = await axios.post(`${baseURL}/accounts`, { name, initialBalance, accountType, notes }, config)
        return data
    } catch (error) {
        return rejectWithValue(error?.response?.data)
    }
})

//get single action
export const getSingleAccountAction = createAsyncThunk('account/get-details', async (id, { rejectWithValue, getState, dispatch }) => {
    try {

        const token = getState()?.users?.userAuth?.userInfo?.token;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        //make a request
        const { data } = await axios.get(`${baseURL}/accounts/${id}`, config)
        return data
    } catch (error) {
        return rejectWithValue(error?.response?.data)
    }
})

//create slice
const accountSlice = createSlice({
    name: 'accounts',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(createAccountAction.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(createAccountAction.fulfilled, (state, action) => {
            state.loading = false
            state.success = true
            state.account = action.payload
        })
        builder.addCase(createAccountAction.rejected, (state, action) => {
            state.loading = false
            state.success = false
            state.account = null
            state.error = action.payload
        })

        //details
        builder.addCase(getSingleAccountAction.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getSingleAccountAction.fulfilled, (state, action) => {
            state.loading = false
            state.success = true
            state.account = action.payload
        })
        builder.addCase(getSingleAccountAction.rejected, (state, action) => {
            state.loading = false
            state.success = false
            state.account = null
            state.error = action.payload
        })
    }
})

//Generate Reducers
const accountReducer = accountSlice.reducer;
export default accountReducer