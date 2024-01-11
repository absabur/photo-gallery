import { FEEDBACKFAILED, FEEDBACKFETCHED, FEEDBACKSUCCESS } from "../constance"

const initialState = {
    feedback: [],
    feedBackSubmitted: false,
    error: "",
}

export const feedBackReducer = (state=initialState, action) => {
    switch (action.type) {
        case FEEDBACKFETCHED:
            let feedback = [];
            for (let key in action.payload) {
                feedback.push({...action.payload[key], "key": key})
            }
            return {
             ...state,
                feedback: feedback,
            }
        case FEEDBACKSUCCESS:
            return {
             ...state,
                feedBackSubmitted: action.payload,
                error: "",
            }
        case FEEDBACKFAILED:
            return {
             ...state,
             error: action.payload,
            }
        default:
            return state
    }
}