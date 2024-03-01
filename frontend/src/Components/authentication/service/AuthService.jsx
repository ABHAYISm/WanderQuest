import axios from 'axios';
import React, { createContext, useContext, useReducer } from 'react';
const BASE_URL='http://localhost:5000/auth/'
const initialState = {
  user: null,
  token: localStorage.getItem('Token'),
  message:null,
  loading: false,
  error: null,
  isLoggedin:false,
  isUser:null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SIGNUP_REQUEST':
      return { ...state, loading: true, error: null,token:null,message:null,user:null,isLoggedin:false,isUser:null };
    case 'LOGIN_REQUEST':
      return { ...state, loading: true, error: null,token:null,message:null,user:null ,isLoggedin:false,isUser:null};
    case 'AUTH_SUCCESS':
      return { ...state, user:action.payload.user ,token: action.payload.token,message:action.payload.message,isLoggedin:action.payload.isLoggedin,isUser:action.payload.isUser,loading: false, error: null, };
    case 'AUTH_ERROR':
      return { ...state, loading: false, error: action.payload,isLoggedin:action.payload.isLoggedin };
    default:
      return state;
  }
};

const AuthContext = createContext();

class SignupService {
  static async signup(name, email, password,endpoint,isuser) {
    try {
      const response = await axios.post(BASE_URL+endpoint, {
        name,
        email,
        password,
      });

      const {user,message} = response.data;
      return { user,message};
    } catch (error) {
      throw new Error('Signup failed. Please try again.');
    }
  }
}

class LoginService {
  static async login(email, password,endpoint,isUser) {
    try {
      const response = await axios.post(BASE_URL+endpoint, {
        email,
        password,
      });

      const {user,token,message}= response.data;
      localStorage.setItem('Token',token)
      return {user,token,message};
    } catch (error) {
      throw new Error('Login failed. Please try again.');
    }
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const signup = async (name, email, password,endpoint,isuser) => {
    dispatch({ type: 'SIGNUP_REQUEST' });

    try {
      const {user,message} = await SignupService.signup(name, email, password,endpoint,isuser);
      dispatch({ type: 'AUTH_SUCCESS', payload: {user,token:null,message,isLoggedin:false,isUser:isuser} });
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR', payload: {message,isLoggedin:false} });
    }
  };

  const login = async (email, password,endpoint,isuser) => {
    dispatch({ type: 'LOGIN_REQUEST' });

    try {
      const {user,token,message}  = await LoginService.login(email, password,endpoint,isuser);
      localStorage.setItem('isLoggedin',true)
      localStorage.setItem('isUser',isuser)
      dispatch({ type: 'AUTH_SUCCESS', payload:  {user,token,message,isLoggedin:true,isUser:isuser}  });
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR', payload: {message,isLoggedin:false} });
    }
  };

  const logout = () => {
    //TODO
    localStorage.setItem('Token',null)
    localStorage.setItem('isLoggedin',isLoggedin)
    localStorage.setItem('isUser',null)
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        token: state.token,
        loading: state.loading,
        error: state.error,
        message:state.message,
        isLoggedin:state.isLoggedin,
        isUser:state.isUser,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};