import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '../utils/Colors';
import { client } from '../utils/KindeConfig';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

export default function Header() {
    const [user, setUser] = useState();
    const router = useRouter();

    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = async () => {
        const user = await client.getUserDetails();
        setUser(user);
    };

    const handleLogout = async () => {
        const loggedOut = await client.logout();
        if (loggedOut) {
            router.replace('/login'); // Chuyển về màn hình login sau khi logout
        }
    };

    return (
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 8,
            alignItems: 'center'
        }}>
            <Image
                source={{ uri: user?.picture || 'https://via.placeholder.com/50' }} // Link ảnh mặc định nếu user?.picture trống
                style={{
                    width: 50,
                    height: 50,
                    borderRadius: 99
                }}
            />
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '85%'
            }}>
                <View>
                    <Text style={{ color: Colors.WHITE, fontSize: 16, fontFamily: 'outfit' }}>Welcome,</Text>
                    <Text style={{ color: Colors.WHITE, fontSize: 20, fontFamily: 'outfit-bold' }}>{user?.given_name || 'Guest'}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <Ionicons name="notifications" size={24} color="white" />
                    <TouchableOpacity onPress={handleLogout}>
                        <Ionicons name="log-out-outline" size={24} color="white" />
                    </TouchableOpacity>       
                </View>
            </View>
        </View>
    );
}
