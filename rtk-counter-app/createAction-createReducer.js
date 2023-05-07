const { createAction, nanoid, createReducer, configureStore } = require('@reduxjs/toolkit')
const logger = require('redux-logger').createLogger()
// Initial State
const initialState = {
    counter: 0,
}
//Action Creator - Action
const increment = createAction('INCREMENT')
const decrement = createAction('DECREMENT')
const resetCounter = createAction('RESET')

//Customize createAction
const incrementBy = createAction('INCREMENT_BY', (amount, user) => {
    return {
        payload: {
            amount, user, id: nanoid()
        }
    }
})

//Reducer
//1. Builder Callback notation
//2. map object notation


// Builder Callback notation
const counterSlice = createReducer(initialState, (builder) => {
    builder.addCase(increment, (state) => {
        state.counter += 1
    })
    builder.addCase(decrement, (state) => {
        state.counter -= 1
    })
    builder.addCase(resetCounter, (state) => {
        state.counter = 0;
    })
    builder.addCase(incrementBy, (state, action) => {
        state.counter += action.payload.amount
    })
})


//map object notation
const counterSlice2 = createAction(initialState, {
    [increment]: (state) => {
        state.counter += 1
    },
    [decrement]: (state) => {
        state.counter -= 1
    },
    [resetCounter]: (state) => {
        state.counter = 0;
    },
    [incrementBy]: (state, action) => {
        state.counter += action.payload.amount
    }
})



//store
const store = configureStore({
    reducer: counterSlice,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})

//dispatch
store.dispatch(increment())
store.dispatch(increment())
store.dispatch(increment())
store.dispatch(decrement())
store.dispatch(incrementBy(20, "Bishoy"))
console.log(store.getState())