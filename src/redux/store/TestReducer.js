import { createAction, createReducer } from "@reduxjs/toolkit";

import { FETCH_CUR_TEST } from "./actions";

export const fetchCurTest = createAction(FETCH_CUR_TEST)

const defaultState = {
    tests: [],
}
//Reducer 
export const testReducer = createReducer(defaultState, {

    [fetchCurTest]: function (state, { payload }) {
        const {results} = payload;
       
        
        state.tests.push(results.flat())

    },
    
})