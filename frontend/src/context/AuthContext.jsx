import { useState, useEffect } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import api from '../api/client';
import AuthContext from './auth-context';

export const AuthProvider = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [backendUser, setBackendUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileCompleted, setProfileCompleted] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      
      if (user) {
        try {
          const token = await user.getIdToken();
          const response = await api.post('/auth/register-or-login/', { token });
          
          setBackendUser(response.data.user);
          setProfileCompleted(response.data.profileCompleted);
        } catch (error) {
          console.error('Backend auth error:', error);
        }
      } else {
        setBackendUser(null);
        setProfileCompleted(false);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();
      
      const response = await api.post('/auth/register-or-login/', { token });
      
      setBackendUser(response.data.user);
      setProfileCompleted(response.data.profileCompleted);
      
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const completeProfile = async (profileData) => {
    try {
      const token = await firebaseUser.getIdToken();
      const response = await api.post('/auth/register-or-login/', { token, ...profileData });
      
      setBackendUser(response.data.user);
      setProfileCompleted(true);
      
      return response.data;
    } catch (error) {
      console.error('Profile completion error:', error);
      throw error;
    }
  };

  const logout = async () => {
    await signOut(auth);
    setFirebaseUser(null);
    setBackendUser(null);
    setProfileCompleted(false);
  };

  const getAuthToken = async () => {
    if (firebaseUser) {
      return await firebaseUser.getIdToken();
    }
    return null;
  };

  const value = {
    firebaseUser,
    backendUser,
    loading,
    profileCompleted,
    loginWithGoogle,
    completeProfile,
    logout,
    getAuthToken
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
