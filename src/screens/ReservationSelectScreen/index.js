import React, { useEffect, useState, useRef } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import CalendarPicker from 'react-native-calendar-picker';
import C from './style';
import { Alert } from 'react-native';

import { useStateValue } from '../../contexts/StateContext';

import LottieView from 'lottie-react-native';

import api from '../../services/api';

export default () => {
    const scroll = useRef();
    const navigation = useNavigation();
    const route = useRoute();
    const [context, dispatch] = useStateValue();

    const [loading, setLoading] = useState(true);
    const [disabledDates, setDisabledDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [timeList, setTimeList] = useState([]);
    const [selectedTime, setSelectedTime] = useState(null);
    useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', () => {
            navigation.setOptions({
                headerTitle: `Oque deseja? `
            });
        });
        return unsubscribe;
    }, [navigation, route]);

    

    const handleAvancarClick = () => {
        var infoGeral = {
            'data': route.params.data,
            'selectedDate': selectedDate,
            'selectedTime': selectedTime
        };
        navigation.navigate('ReservationConfirmScreen', {infoGeral});
    }

    const umaSessao = async () => {
        
            var infoGeral = {
                'data': route.params.infoGeral.data,
                'selectedDate': route.params.infoGeral.selectedDate,
                'selectedTime': route.params.infoGeral.selectedTime,
                'boleto': '',
                'onButton': 0
            };
            navigation.navigate('ReservationConfirmScreen', {infoGeral});
       
       
    }

    const quatroSessoes = async () => {
        
        var infoGeral = {
            'data': route.params.infoGeral.data,
            'selectedDate': route.params.infoGeral.selectedDate,
            'selectedTime': route.params.infoGeral.selectedTime,
            'boleto': '',
            'onButton': 1
        };
        navigation.navigate('ReservationConfirmScreen', {infoGeral});
   
   
}

    const handleConfirmAgendamento = () => {
        Alert.alert(
            'Confirmação',
            'Tem certeza que deseja confirmar o agendamento?',
            [
                {text: 'Sim, tenho certeza', onPress: removeReservation},
                {text: 'Cancelar', onPress: null, style: 'cancel'}
            ]
        );
    }

    const showTextDate = (date, hora) => {
        let dateEl = new Date(date);
        let year = dateEl.getFullYear();
        let month = dateEl.getMonth() + 1;
        let day = dateEl.getDate();

        month = month < 10 ? '0'+month : month;
        day = day < 10 ? '0'+day : day;
        return `${day}/${month}/${year} às ${hora.substr(0, 5)}`;
    }

    

    return (
        <C.Container>
            <C.Scroller ref={scroll} contentContainerStyle={{justifyContent:'center', alignItems: 'center'}}>
            <C.Box>
                <C.BoxIn onPress={quatroSessoes}>
                    <C.BoxInText>REALIZAR QUATRO SESSÕES R$ 114,39</C.BoxInText>
                </C.BoxIn>
                <C.BoxIn onPress={umaSessao}>
                    <C.BoxInText>REALIZAR UMA SESSÃO R$ 39,90</C.BoxInText>
                </C.BoxIn>
            </C.Box>
            <LottieView
                    autoPlay
                    loop
                    style={{
                        width: 300,
                        height: 300,
                        backgroundColor: '#F00',
                    }}
                    source={require('../../assets/ideia.json')}
                    />
            </C.Scroller>
        </C.Container>
    );
}