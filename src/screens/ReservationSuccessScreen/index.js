import React, { useEffect, useState, useRef } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import CalendarPicker from 'react-native-calendar-picker';
import C from './style';
import { Alert, Linking } from 'react-native';
import LottieView from 'lottie-react-native';

import { useStateValue } from '../../contexts/StateContext';

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
                headerTitle: `BOLETO SENDO GERADO ...`
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

    const removeReservation = async () => {
        const result = await api.setReservation(
            route.params.infoGeral.data.id,
            route.params.infoGeral.selectedDate,
            route.params.infoGeral.selectedTime
        );
        if(result.error === '') {
            navigation.navigate('ReservationMyScreen');
        } else {
            alert(result.error);
        }
       
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

    const handleBoletoClick = async () => {
        const supported = await Linking.canOpenURL(route.params.infoGeral.boleto[0].boleto.boleto_url);
        if(supported) {
            await Linking.openURL(route.params.infoGeral.boleto[0].boleto.boleto_url);
        }
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
            <C.Scroller ref={scroll} contentContainerStyle={{paddingBottom: 40}}>
            <C.ContainerHorizontal style={{borderBottomWidth:1, borderColor:"#c6c6c6", justifyContent: 'center'}}>
            <LottieView
                autoPlay
                loop
                style={{
                    width: 200,
                    height: 200,
                    backgroundColor: '#fff',
                }}
                source={require('../../assets/payment.json')}
                />
            </C.ContainerHorizontal>

            <C.ContainerVertical >
                <C.Line style={{padding:8, justifyContent: 'center', alignItems: 'center', flex:1}}>
                    <C.Text style={{fontSize:21, fontWeight:'bold'}} >
                        Parabéns
                    </C.Text>
                </C.Line>

                <C.Line style={{padding:8, justifyContent: 'center', alignItems: 'center', flex:1}}>
                    <C.Text style={{fontSize:19, textAlign: 'justify'}} >
                        O boleto está sendo gerado e será enviado para o E-Mail {context.user.user.email}.
                    </C.Text>
                </C.Line>

                <C.Line style={{padding:8, justifyContent: 'center', alignItems: 'center', flex:1}}>
                    <C.Text style={{fontSize:17, textAlign: 'justify'}} >
                        O agendamento está com o status ( Gerando Boleto ), assim que o boleto for gerado o agendamento estará com o status ( Aguardando Pagamento ), e será enviado o boleto para o seu e-mail, assim que ele for pago, automaticamente o agendamento será confirmado pelo nosso sistema e você será avisado!
                    </C.Text>
                </C.Line>

                <C.Line style={{padding:8, justifyContent: 'center', alignItems: 'center', flex:1}}>
                    <C.Text style={{fontSize:17, textAlign: 'justify'}} >
                        Se preferir por PIX envie o comprovante do pagamento para o nosso whatzapp (61) 9 9999-9898.
                    </C.Text>
                </C.Line>

                <C.Line style={{padding:8, justifyContent: 'center', alignItems: 'center', flex:1}}>
                        <C.Text style={{fontSize:17, textAlign: 'justify', color: '#f00'}} >
                            Quando o boleto for gerado, nesta tela vai ficar disponível um botão para enviar o comprovante.
                        </C.Text>
                </C.Line>

                
                <C.CoverImage source={require('../../assets/QRCODE.png')} resizeMode="contain" />

                <C.Line style={{padding:8, justifyContent: 'center', alignItems: 'center', flex:1}}>
                    <C.Text style={{fontSize:21, fontWeight:'bold'}} >
                        Chave PIX
                    </C.Text>
                </C.Line>

                <C.Line style={{padding:8, justifyContent: 'center', alignItems: 'center', flex:1}}>
                    <C.Text style={{fontSize:18, textAlign: 'center'}} >
                    XXXXX.XXXXX XXXXX.XXXXX XXXXX.XXXXXX X XXXXXXXXXXXXXX
                    </C.Text>
                </C.Line>

                
                
            </C.ContainerVertical>

            </C.Scroller>
        </C.Container>
    );
}