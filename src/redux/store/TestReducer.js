import { createAction, createReducer } from "@reduxjs/toolkit";

import { FETCH_CUR_TEST, TAKE_NUMBER_OF_QUESTIONS } from "./actions";

export const fetchCurTest = createAction(FETCH_CUR_TEST)
export const takeNumberOfQuestions = createAction(TAKE_NUMBER_OF_QUESTIONS)

const defaultState = {
    tests: [],
    numberOfQuestions: [],
    ourQuestions:[]
}
//Reducer 
export const testReducer = createReducer(defaultState, {

    [fetchCurTest]: function (state, { payload }) {
        const { results } = payload;
        
        results.forEach(it => {
            const{incorrect_answers,correct_answer} = it
            incorrect_answers.push(correct_answer)
            const randomQuestions = incorrect_answers
                .flat()
                .sort(() => (Math.random() > 0.5 ? 1 : -1));
                state.ourQuestions.push([randomQuestions])
        })

        state.tests.push(results.flat())

    },
    [takeNumberOfQuestions]: function (state, { payload }) {


        state.numberOfQuestions.push(Number(payload))

    },

})