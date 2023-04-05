import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  data: [],
  loading: false,
  error: null
};

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    fetchDataStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchDataFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } = apiSlice.actions;

export const fetchData = () => {
  return dispatch => {
    dispatch(fetchDataStart());
    axios.get('http://localhost:3000/data')
      .then(response => {
        dispatch(fetchDataSuccess(response.data));
      })
      .catch(error => {
        dispatch(fetchDataFailure(error.message));
      });
  };
};

export default apiSlice.reducer;
