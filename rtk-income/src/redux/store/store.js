import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "../slice/accounts/accountsSlice";
import transactionReducer from "../slice/transcations/transactionSlice";
import userReducer from "../slice/users/usersSlice";

//store
const store = configureStore({
    reducer: {
        users: userReducer,
        accounts: accountReducer,
        transactions: transactionReducer
    }
})

export default store;