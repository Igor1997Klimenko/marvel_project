import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

const signUp = createAsyncThunk('auth/register', async credentials => { 
  try {
    const {data} = await axios.post('/users/signup', credentials);
    token.set(data.token);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
})

const signIn = createAsyncThunk('auth/login', async credentials => { 
  try {
    const {data} = await axios.post('/users/login', credentials);
    token.set(data.token);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
})

const logOut = createAsyncThunk('auth/logout', async () => { 
  try {
    await axios.post('/users/logout');
    token.unset();
  } catch (error) {
    throw new Error(error.message);
  }
})

export const authOperations = {
  signUp,
  signIn,
  logOut
}