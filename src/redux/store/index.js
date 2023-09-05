import { combineReducers, configureStore } from "@reduxjs/toolkit"

import { testReducer } from './TestReducer'

const RootReducer = combineReducers({
    toolkit: testReducer
})

export const store = configureStore({
    reducer: RootReducer,

})
