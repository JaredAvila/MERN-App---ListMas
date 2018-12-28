import axios from "axios";
import { GET_PROFILE, PROFILE_LOADING } from "./types";

// Get profile by handle
export const getFriendProfile = handle => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/profile/handle/${handle}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};

// Check off list item
export const checkOffItem = (item_id, profile_id, friend_id) => dispatch => {
  axios
    .post(`listItem/check/${profile_id}/${item_id}/${friend_id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};

// Check off list item
export const unCheckOffItem = (item_id, profile_id, friend_id) => dispatch => {
  axios
    .post(`listItem/unCheck/${profile_id}/${item_id}/${friend_id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};

//Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};
