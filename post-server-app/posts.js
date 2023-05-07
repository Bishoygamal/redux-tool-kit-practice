const { createStore, applyMiddleware } = require('redux')
const loggerMiddleware = require('redux-logger').createLogger()
const thunk = require('redux-thunk').default
const axios = require('axios')

const REQUEST_STARTED = 'REQUEST_STARTED'
const FETCH_SUCCESS = 'FETCH_SUCCESS'
const FETCH_Failed = 'FETCH_Failed'
//custom middleware
// const customLogger = () => {
//     return (next) => {
//         return (action) => {
//             console.log('Action fired', action)
//             next(action)
//         }
//     }
// }
//initial state

const initialState = {
    posts: [],
    error: '',
    loading: false
}

//actions
const fetchPostRequest = () => {
    return {
        type: REQUEST_STARTED
    }
}

const fetchPostSuccess = (posts) => {
    return {

        type: FETCH_SUCCESS,
        payload: posts
    }
}

const fetchPostFailed = (err) => {
    return {

        type: FETCH_Failed,
        payload: err
    }
}

//action to make a request
const fetchPost = () => {
    return async (dispatch) => {
        try {
            dispatch(fetchPostRequest())
            const data = await axios.get('https://jsonplaceholder.typicode.com/posts')
            dispatch(fetchPostSuccess(data))
        } catch (err) {
            dispatch(fetchPostFailed(err.message))
        }
    }
}

//reducers
const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_STARTED:
            return {
                ...state,
                loading: true
            }
        case FETCH_SUCCESS:
            return {
                ...state,
                posts: action.payload,
                loading: false
            }

        case FETCH_Failed:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
    }
}
//store
const store = createStore(postReducer, applyMiddleware(thunk))

//subscribe
store.subscribe(() => {
    const data = store.getState()
    console.log(data)
})
//dispatch
store.dispatch(fetchPost())