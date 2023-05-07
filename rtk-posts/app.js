const { createAsyncThunk, createSlice, configureStore } = require('@reduxjs/toolkit')
const axios = require('axios')
const API = 'https://jsonplaceholder.typicode.com/posts'
const initialState = {
    posts: [],
    loading: false,
    error: null
}

const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const data = await axios.get(API)
    return data.data
})

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    extraReducers: (builder) => {
        //Handle LifeCucle --pending-success- rejected
        builder.addCase(fetchPosts.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.posts = action.payload
            state.loading = false
        })
        builder.addCase(fetchPosts.rejected, (state, action) => {
            state.posts = []
            state.loading = false
            state.error = action.payload
        })
    }
})

//generate reducer
const postReducer = postsSlice.reducer;
const store = configureStore({
    reducer: postReducer
})

//dispatch 
store.subscribe(() => {
    console.log(store.getState())
})
store.dispatch(fetchPosts())