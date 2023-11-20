import axios from "axios"

import { fetchCurTest } from '../redux/store/TestReducer'

export const fetchCurTests = (url) => {

    return (dispatch) => {
        axios.get(url)
            .then(resp => {
                dispatch(fetchCurTest(resp.data))
            })
            .catch(e => {
                console.error(e)
            })
    }



}