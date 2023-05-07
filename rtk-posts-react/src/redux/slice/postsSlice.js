import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import apiUrl from '../utils/apiUrl'
import axios from 'axios'
const initialState = {
    posts: [],
    loading: false,
    error: ""
}

//actions
export const fetchPosts = createAsyncThunk('posts/fetch', async () => {
    const res = await axios.get(apiUrl)
    return res.data
})

export const searchPost = createAsyncThunk(
    "posts/search",
    async (id, { rejectWithValue, getState, dispatch }) => {
        try {
            const res = await axios.get(`${apiUrl}/${id}`)
            return res.data
        } catch (error) {
            return rejectWithValue(error.response.staus)
        }
    }
)
//slice
const postsSlice = createSlice({
    name: 'posts',
    initialState,
    extraReducers: (builder) => {
        //handle actions
        //pending
        builder.addCase(fetchPosts.pending, (state, action) => {
            state.loading = true
        })
        //fullfield
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.loading = false;
            state.posts = action.payload
        })
        //error
        builder.addCase(fetchPosts.rejected, (state, action) => {
            state.loading = false;
            state.posts = []
            state.error = action.payload
        })

        //search posts
        builder.addCase(searchPost.pending, (state, action) => {
            state.loading = true
        })

        builder.addCase(searchPost.fulfilled, (state, action) => {
            state.loading = false;
            state.posts = [action.payload]
        })

        builder.addCase(searchPost.rejected, (state, action) => {
            state.loading = false
            state.posts = []
            state.error = action.payload
        })
    }
})

//generate reducers
const postsReducer = postsSlice.reducer;
export default postsReducer