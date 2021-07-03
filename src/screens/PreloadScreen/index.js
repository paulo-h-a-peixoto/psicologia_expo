import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import C from './style';


import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import * as Notifications from 'expo-notifications';

import { useStateValue } from '../../contexts/StateContext';
import api from '../../services/api';

export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();


    useEffect(()=>{
        const checkLogin = async () => {
            let token = await api.getToken();
            if(token) {
                let result = await api.validateToken();
                if(result.error === '') {
                    dispatch({
                        type: 'setUser',
                        payload: {
                            user: result.user
                        }
                    });
                    

                    if (Constants.isDevice) {
                        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
                        let finalStatus = existingStatus;
                        if (existingStatus !== 'granted') {
                          const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
                          finalStatus = status;
                        }
                        if (finalStatus !== 'granted') {
                          alert('Failed to get push token for push notification!');
                          return;
                        }
                        const token2 = await Notifications.getExpoPushTokenAsync();
                        const result2 = await api.sendToken(token2.data, result.user.id, result.user.tipoUsuario);
                    } else {
                        alert('Deve usar dispositivo físico para notificações push');
                    }

                    navigation.reset({
                        index: 1,
                        routes:[{name: 'MainDrawer'}]
                    });
                } else {
                    alert(result.error);
                    dispatch({type:'setToken', payload: {token: ''}});
                    navigation.reset({
                        index: 1,
                        routes:[{name: 'LoginScreen'}]
                    });
                }
            } else {
                navigation.reset({
                    index: 1,
                    routes:[{name: 'LoginScreen'}]
                });
            }
        }

        checkLogin();
    }, []);

    return (
        <C.Container>
            <C.LoadingIcon color="#3795d2" size="large" />
        </C.Container>
    );
}