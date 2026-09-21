import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

export interface UserProfile {
    nombre: string;
    email: string;
    telefono: string;
    avatarUri?: string | null;
}

interface ProfileContextData {
    profile: UserProfile;
    updateProfile: (newData: Partial<UserProfile>) => Promise<void>;
    isLoading: boolean;
}

const defaultProfile: UserProfile = {
    nombre: 'Usuario Invitado',
    email: 'usuario@ejemplo.com',
    telefono: '',
};

const ProfileContext = createContext<ProfileContextData | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
    const [profile, setProfile] = useState<UserProfile>(defaultProfile);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const storedProfile = await AsyncStorage.getItem('@user_profile');
            if (storedProfile) {
                setProfile(JSON.parse(storedProfile));
            }
        } catch (error) {
            console.error('Error cargando el perfil:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const updateProfile = async (newData: Partial<UserProfile>) => {
        try {
            const updated = { ...profile, ...newData };
            setProfile(updated);
            await AsyncStorage.setItem('@user_profile', JSON.stringify(updated));
        } catch (error) {
            console.error('Error guardando el perfil:', error);
        }
    };

    return (
        <ProfileContext.Provider value={{ profile, updateProfile, isLoading }}>
            {children}
        </ProfileContext.Provider>
    );
}

export function useProfile() {
    const context = useContext(ProfileContext);
    if (!context) throw new Error('useProfile debe usarse dentro de ProfileProvider');
    return context;
}