import React from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { CYBER_THEME } from '../../constants/theme';

export interface Modulo {
    id: string;
    nombre: string;
    categoria: string;
    estado: 'ACTIVO' | 'STANDBY' | 'INACTIVO';
    nivel: string;
}

interface ModuleCardProps {
    item: Modulo;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ item }) => {
    return (
        <Pressable
            onPress={() =>
                Alert.alert('DIAGNÓSTICO', `Módulo: ${item.nombre}\nNivel: ${item.nivel}`)
            }
            style={({ pressed }) => [s.card, pressed && s.cardPresionada]}
        >
            <View style={s.cardHeader}>
                <Text style={s.cardTitle}>{item.nombre}</Text>
                <Text
                    style={[
                        s.badgeStatus,
                        item.estado === 'ACTIVO' && s.statusActivo,
                        item.estado === 'STANDBY' && s.statusStandby,
                    ]}
                >
                    {item.estado}
                </Text>
            </View>
            <View style={s.cardFooter}>
                <Text style={s.cardMeta}>CAT // {item.categoria}</Text>
                <Text style={s.cardMeta}>CAPACIDAD: {item.nivel}</Text>
            </View>
        </Pressable>
    );
};

const s = StyleSheet.create({
    card: {
        backgroundColor: CYBER_THEME.colors.cardBg,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: CYBER_THEME.colors.border,
        padding: 16,
        marginBottom: 12,
    },
    cardPresionada: {
        borderColor: CYBER_THEME.colors.cyanNeon,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    cardTitle: {
        color: CYBER_THEME.colors.textPrimary,
        fontSize: 15,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    badgeStatus: {
        fontSize: 10,
        fontWeight: 'bold',
        paddingVertical: 2,
        paddingHorizontal: 6,
        borderRadius: 2,
        color: CYBER_THEME.colors.redNeon,
        borderWidth: 1,
        borderColor: CYBER_THEME.colors.redNeon,
    },
    statusActivo: {
        color: CYBER_THEME.colors.greenNeon,
        borderColor: CYBER_THEME.colors.greenNeon,
    },
    statusStandby: {
        color: CYBER_THEME.colors.yellowNeon,
        borderColor: CYBER_THEME.colors.yellowNeon,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#1A2130',
        paddingTop: 8,
    },
    cardMeta: {
        color: CYBER_THEME.colors.textMuted,
        fontSize: 11,
        fontWeight: '600',
    },
});