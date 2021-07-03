import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StateProvider } from './src/contexts/StateContext';

import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import * as Notifications from 'expo-notifications';

import AuthStack from './src/stacks/AuthStack';

import api from './src/services/api';
Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
//fff69af1-576b-431e-8270-7694b35213e4
export default function App() {
    const [expoPushToken, setExpoPushToken] = useState(null);
    const [notification, setNotification] = useState(false);
  
    /**
     * Referências aos objetos "ouvintes" (listeners)
     */
    const notificationListener = useRef();
    const responseListener = useRef();

    // const schedulePushNotification = async () => {
    //     await Notifications.scheduleNotificationAsync({
    //       //O que enviar junto com a notificação? título, mensagem (body), etc.
    //       content: {
    //         title: "Paulo tem uma nova mensagem! 📬",
    //         body: "O Tiago Assunção acabou de realizar um agendamento!",
    //         data: { data: "goes here" },
    //       },
    //       trigger: { seconds: 2 }, //quanto tempo esperar antes de lançar a notificação?
    //     });
    //   }

    // const registerForPushNotificationsAsync = async () => {
    //     if (Constants.isDevice) {
    //       const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    //       let finalStatus = existingStatus;
    //       if (existingStatus !== 'granted') {
    //         const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    //         finalStatus = status;
    //       }
    //       if (finalStatus !== 'granted') {
    //         alert('Failed to get push token for push notification!');
    //         return;
    //       }
    //       const token = await Notifications.getExpoPushTokenAsync();
    //       setExpoPushToken(token.data);
    //     } else {
    //       alert('Must use physical device for Push Notifications');
    //     }
      
        
    //     };

    // const sendToken = async () => {
    //     if(expoPushToken != null){
    //         const result = await api.sendToken(expoPushToken);
    //         if(result.error != '') {
    //             alert(result.error);
    //         }
    //     }
    // }

 

    // useEffect(()=>{
    //     sendToken();
    // },[ expoPushToken ])

    // useEffect(()=>{

    //     registerForPushNotificationsAsync();
    //     schedulePushNotification();
    // },[]);

 

    return (
        <StateProvider>
            <NavigationContainer>
                <AuthStack />
            </NavigationContainer>
        </StateProvider>
    );
}


