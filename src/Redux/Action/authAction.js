import axios from "axios";
import {
  AUTHSUCCESS,
  AUTHFAIELD,
  AUTHLOGOUT,
  AUTHLOADING,
  LOGINPAGE,
} from "../constance";

export const loginSignup = (email, password, type) => (dispatch) => {
  dispatch(authLoading(true));
  let loginDate = {
    email: email,
    password: password,
    returnSecureToken: true,
  };
  let url = null;
  if (type === "sign-up") {
    url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
  } else {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
  }
  let api_key = "AIzaSyDYi1ckHVmYyUtoOZbOOR24tS_exIze-lE";
  axios
    .post(url + api_key, loginDate)
    .then((res) => {
      dispatch(authLoading(false));
      dispatch(isauthenticated(res.data.idToken, res.data.localId));
      localStorage.setItem("userId-gallery", res.data.localId);
      localStorage.setItem("token-gallery", res.data.idToken);
      localStorage.setItem(
        "expires-gallery",
        JSON.stringify(new Date().getTime() + parseInt(res.data.expiresIn)*1000)
      );
    })
    .catch((err) => {
      dispatch(authLoading(false));
      dispatch(authError(err.response.data.error.message));
      console.log(err.response.data.error.message);
    });
};

export const authCheck = () => dispatch => {
    const token = localStorage.getItem('token-gallery')
    if (!token) {
        dispatch(logout())
    }else {
        const expires = JSON.parse(localStorage.getItem('expires-gallery'))
        if (new Date(expires) <= new Date()) {
            dispatch(logout())
        }else {
            const userId = localStorage.getItem('userId-gallery')
            dispatch(isauthenticated(token, userId))
        }
    }
}

export const isauthenticated = (token, userId) => {
  return {
    type: AUTHSUCCESS,
    payload: {
      token: token,
      userId: userId,
    },
  };
};

export const authLoading = (isLoading) => {
  return {
    type: AUTHLOADING,
    payload: isLoading,
  };
};
export const authError = (msg) => {
  return {
    type: AUTHFAIELD,
    payload: msg,
  };
};
export const loginPage = (tf, warn=null) => {
  return {
    type: LOGINPAGE,
    payload: tf,
    warn: warn,
  };
};

export const logout = () => {
  localStorage.removeItem("token-gallery");
  localStorage.removeItem("userId-gallery");
  localStorage.removeItem("expires-gallery");
  return {
    type: AUTHLOGOUT,
  };
};
