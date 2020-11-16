import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import * as auth from '../services/auth';
import api from '../services/api';

interface User {
  name: string;
  email: string;
}

interface ResponseProp {
  token: string;
  user: {
    name: string;
    email: string;
  };
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  signIn(data: ResponseProp): void;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const storagedUser = await AsyncStorage.getItem('@medapp:user');
      const storagedToken = await AsyncStorage.getItem('@medapp:token');

      if (storagedUser && storagedToken) {
        api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
        setUser(JSON.parse(storagedUser));
      }

      setLoading(false);
    }

    loadStorageData();
    //signOut();
  }, []);

  async function signIn(res: ResponseProp) {
    console.log('valor de res --->', res);

    setUser(res.user);

    api.defaults.headers.Authorization = `Bearer ${res.token}`;

    await AsyncStorage.setItem('@medapp:user', JSON.stringify(res.user));
    await AsyncStorage.setItem('@medapp:token', res.token);
  }

  async function signOut() {
    await AsyncStorage.removeItem('@medapp:user');
    await AsyncStorage.removeItem('@medapp:token');

    api.defaults.headers.Authorization = '';

    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        loading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
