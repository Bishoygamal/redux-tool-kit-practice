const { createStore, combineReducers } = require('redux')
//action types

const ADD_POST = 'ADD_POST'
const REMOVE_POST = 'REMOVE_POST'
const ADD_USER = 'ADD_USER'
//initial state
const initialState = {
    posts: []
}

//users
const userInitialState = {
    users: []
}
//Action(action,action creator)
// *add post
const addPostAction = (post) => {
    return {
        type: ADD_POST,
        payload: post
    }
}
// *add user
const adduSERAction = (user) => {
    return {
        type: ADD_USER,
        payload: user
    }
}
//*remove post
const removePostAction = (id) => {
    return {
        type: REMOVE_POST,
        id
    }
}
//reducer
//*post reducer
const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                posts: [...state.posts, action.payload]
            }
        case REMOVE_POST:
            return {
                posts: state.posts.filter((post) => {
                    return post.id !== action.id
                })
            }

        default:
            return state
    }

    // if (action.type === ADD_POST) {
    //     return {
    //         posts: [...state.posts, action.payload]
    //     }
    // }
    // else if (action.type === REMOVE_POST) {
    //     return {
    //         posts: state.posts.filter((post) => {
    //             return post.id !== action.id
    //         })
    //     }
    // } else {
    //     return state
    // }
}



//user reducer

const userReducer = (state = userInitialState, action) => {
    switch (action.type) {
        case ADD_USER:
            return {
                users: [...state.users, action.payload]
            }


        default:
            return state
    }


}

//store
const rootReducers = combineReducers({
    posts: postReducer,
    users: userReducer

})
const store = createStore(rootReducers)

//subscribe
store.subscribe(() => {
    const data = store.getState()
    console.log(data.posts)
    console.log(data.users)
})
//dispatch

store.dispatch(addPostAction({
    id: 1,
    titlle: 'post1'
}))
store.dispatch(addPostAction({
    id: 2,
    titlle: 'post2'
}))

store.dispatch(adduSERAction({
    id: 1,
    name: 'bishoy',
    email: 'bishoy@gmail,com'
}))

store.dispatch(removePostAction(2))