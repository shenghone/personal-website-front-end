import { createStore } from "redux";

const initialState = {
  authenticated: false
};

export const store = createStore(reducer, initialState);

function reducer(state, action) {
  switch (action.type) {
    case "SIGN_IN":
      return {
        ...state,
        authenticated: action.payload
      };
    case "SIGN_OUT":
      return {
        ...state,
        authenticated: action.payload
      };
    default:
      return state;
  }
}

export const signInAction = () => ({
  type: "SIGN_IN",
  payload: true
});

export const signOutAction = () => ({
  type: "SIGN_OUT",
  payload: false
});
