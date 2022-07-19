import { useEffect, useState } from 'react';
import { httpClient } from "../../../util/Api";

export const useProvideAuth = () => {
  const [authUser, setAuthUser] = useState(null);
  const [error, setError] = useState('');
  const [isLoadingUser, setLoadingUser] = useState(true);
  const [isLoading, setLoading] = useState(false);

  const fetchStart = () => {
    setLoading(true);
    setError('');
  };

  const fetchSuccess = () => {
    setLoading(false);
    setError('');
  };

  const fetchError = (error) => {
    setLoading(false);
    setError(error);
  };

  const userLogin = (user, callbackFun) => {
    fetchStart();
    httpClient
      .post('http://localhost:5000/auth/login', user)
      .then(({ data }) => {
        if (data) {
          fetchSuccess();
          httpClient.defaults.headers.common['Authorization'] = 'Bearer ' + data.access_token;
          localStorage.setItem('token', data.access_token);
          getAuthUser();
          if (callbackFun) callbackFun();
        } else {
          fetchError(data.error);
        }
      })
      .catch(() => {

      })

  };

  const userSignup = (user, callbackFun) => {

  };

  const sendPasswordResetEmail = (email, callbackFun) => {
    fetchStart();

    setTimeout(() => {
      fetchSuccess();
      if (callbackFun) callbackFun();
    }, 300);
  };

  const confirmPasswordReset = (code, password, callbackFun) => {
    fetchStart();

    setTimeout(() => {
      fetchSuccess();
      if (callbackFun) callbackFun();
    }, 300);
  };

  const renderSocialMediaLogin = () => null;

  const userSignOut = (callbackFun) => {
    httpClient.defaults.headers.common['Authorization'] = '';
    localStorage.removeItem('token');
    setAuthUser(null);
    callbackFun();
  };

  const getAuthUser = () => {
    fetchStart();
    httpClient
      .get('http://localhost:5000/auth/user-information', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      })
      .then(({ data }) => {
        if (data) {
          console.log(data)
          fetchSuccess();
          setAuthUser(data);
        } else {
          fetchError(data.error);
        }
      })
      .catch(() => {

      })
  };
  console.log('vao: ', authUser)
  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      httpClient.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }

    httpClient
      .get('http://localhost:5000/auth/user-information', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      })
      .then(({ data }) => {
        if (data) {
          setAuthUser(data);
        }
        setLoadingUser(false);
      })
      .catch(() => {
        localStorage.removeItem('token');
        httpClient.defaults.headers.common['Authorization'] = '';
        setLoadingUser(false);
      })

  }, []);

  // Return the user object and auth methods
  return {
    isLoadingUser,
    isLoading,
    authUser,
    error,
    setError,
    setAuthUser,
    getAuthUser,
    userLogin,
    userSignup,
    userSignOut,
    renderSocialMediaLogin,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
};