import { AUTHFAIELD, AUTHLOADING, AUTHLOGOUT, AUTHSUCCESS, LOGINPAGE } from "../constance";

const initialState = {
  userId: null,
  token: null,
  error: null,
  isLoading: false,
  loginPage: false,
  warnMessage: null,
};

export const loginSignupReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHSUCCESS:
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
        loginPage: false,
        warnMessage: null,
      };
    case AUTHLOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case AUTHFAIELD:
      return {
        ...state,
        error: action.payload,
        warnMessage: action.payload,
      };
    case LOGINPAGE:
      return {
        ...state,
        loginPage: action.payload,
        warnMessage: action.warn
      };
    case AUTHLOGOUT:
      return {
        ...state,
        error: null,
        token: null,
        userId: null,
      };
    default:
      return state;
  }
};
