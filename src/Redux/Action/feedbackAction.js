import axios from "axios"
import { FEEDBACKFAILED, FEEDBACKFETCHED, FEEDBACKSUCCESS } from "../constance"

export const submitFeedback = ( imageId, name, comment) => dispatch => {
    let data = null;
    let userId = localStorage.getItem('userId-gallery');
    data = {
        imageId: imageId,
        name: name,
        comment: comment,
        userId: userId,
        date: new Date(),
    }
    let token = localStorage.getItem('token-gallery');
    axios.post('https://photo-gallery-1405a-default-rtdb.firebaseio.com/feedback.json?auth='+token, data)
    .then(response => {
        dispatch(feedBackDone(true))
    }).catch(error => {
        dispatch(setError("Feedback is not submitted"))
    })
}

export const feedBackDone = (tf) => {
    return {
        type: FEEDBACKSUCCESS,
        payload: tf,
    }
}

export const getFeedback = (imageId) => dispatch => {
    axios.get('https://photo-gallery-1405a-default-rtdb.firebaseio.com/feedback.json?orderBy="imageId"&equalTo="'+imageId+'"')
    .then(response => {
        dispatch(setFeedback(response.data))
    }).catch(error => {
        dispatch(setError(error.response.data.error))
    })
}

export const setFeedback = (response) => {
    return {
        type: FEEDBACKFETCHED,
        payload: response,
    }
}
export const setError = (err) => {
    return {
        type: FEEDBACKFAILED,
        payload: err,
    }
}