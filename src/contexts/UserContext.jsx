import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchUserProfile } from '../utils/apiClient';
import { isLoggedIn } from '../utils/auth';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Fetch user profile when a token is available. Guarded by isLoggedIn()
  // so we don't fire a 401 on the /login screen (which previously caused
  // a redirect loop in production).
  const refreshUser = useCallback(async () => {
    if (!isLoggedIn()) return;
    try {
      const data = await fetchUserProfile();
      if (data) setUser(data);
    } catch (err) {
      console.error('Failed to load user profile:', err);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  return (
    <UserContext.Provider value={{ user, setUser, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
