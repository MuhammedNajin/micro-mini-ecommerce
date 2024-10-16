// src/features/auth/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';


// Define the types for the state and action payloads
interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null | string;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

interface Credentials {
  email: string;
  password: string;
}

interface SignupPayload extends Credentials {
  name: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

// Example API URL
const API_URL = 'http://localhost:4000/api/v1/auth';


// Async thunk for login
export const login = createAsyncThunk<AuthResponse, Credentials, { rejectValue: string }>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
        console.log('credentials', credentials);
        
      const response = await axios.post(`${API_URL}/login`, credentials);
      if(response.status === 200) {
        console.log('responce', response.data);
        
        return response.data;
      } 
      
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data as string);
      }
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for signup
export const signup = createAsyncThunk<AuthResponse, SignupPayload, { rejectValue: string }>(
  'auth/signup',
  async (credentials, { rejectWithValue }) => {
    try {
        console.log(credentials)
      const response = await axios.post(`${API_URL}/signup`, credentials);
      if(response.status === 201) {
        return response.data;
      } 
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data as string);
      }
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for logout
export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(`${API_URL}/logout`);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data as string);
      }
      return rejectWithValue(error.message);
    }
  }
);

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
};

const user = localStorage.getItem('user') as string;
const userdoc = JSON.parse(user || '{}');
 initialState.user = user ? userdoc : null;
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Optional: Add any synchronous reducers here
  },
  extraReducers: (builder) => {
    // Handle login
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('user', JSON.stringify(action.payload.user))

      })
      .addCase(login.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to login';
      });

    // Handle signup
    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(signup.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to signup';
      });

    // Handle logout
    builder
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
      })
      .addCase(logout.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to logout';
      });
  },
});

export default authSlice.reducer;
