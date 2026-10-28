import React, { createContext, useCallback, useContext } from 'react';
import { useAsyncStorageState } from '../hooks/useAsyncStorageState';
import { STORAGE_KEYS } from '../services/storage';

export interface UserProfile {
  nombre: string;
  email: string;
  telefono: string;
  avatarUri?: string | null;
}

interface ProfileContextData {
  profile: UserProfile;
  user: UserProfile; // Alias semántico explícito para Usuarios
  updateProfile: (newData: Partial<UserProfile>) => Promise<void>;
  isLoading: boolean;
}

const DEFAULT_PROFILE: UserProfile = {
  nombre: 'Usuario Invitado',
  email: 'usuario@ejemplo.com',
  telefono: '',
  avatarUri: null,
};

const ProfileContext = createContext<ProfileContextData | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const {
    state: profile,
    setPersistentState: setProfile,
    isLoading,
  } = useAsyncStorageState<UserProfile>(STORAGE_KEYS.PROFILE, DEFAULT_PROFILE);

  const updateProfile = useCallback(
    async (newData: Partial<UserProfile>) => {
      await setProfile((prev) => ({ ...prev, ...newData }));
    },
    [setProfile]
  );

  return (
    <ProfileContext.Provider
      value={{
        profile,
        user: profile,
        updateProfile,
        isLoading,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile debe usarse dentro de ProfileProvider');
  }
  return context;
}

export const useUser = useProfile;
