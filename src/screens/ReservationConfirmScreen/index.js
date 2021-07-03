import React, { useEffect, useState, useRef } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import CalendarPicker from 'react-native-calendar-picker';
import C from './style';
import { Alert } from 'react-native';

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
                headerTitle: `Confirmação do agendamento `
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
            route.params.infoGeral.selectedTime,
            route.params.infoGeral.onButton
        );
        if(result.error === '') {
            var infoGeral = {
                'data': route.params.infoGeral.data,
                'selectedDate': route.params.infoGeral.selectedDate,
                'selectedTime': route.params.infoGeral.selectedTime,
                'boleto': result.list
            };
            navigation.navigate('ReservationSuccessScreen', {infoGeral});
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
            <C.ContainerHorizontal style={{borderBottomWidth:1, borderColor:"#c6c6c6"}}>
                <C.Row>
                    <C.CoverImage source={require('../../assets/avatardemo.png')} resizeMode="cover" />
                </C.Row>
                <C.Row style={{flex:1}}>
                    <C.ContainerVertical>
                        <C.Line style={{justifyContent: 'center', flex:1}}>
                            <C.Text style={{fontSize:22, fontWeight:'bold'}} >{route.params.infoGeral.data.nome}</C.Text>
                            <C.Text>Psicólogo</C.Text>
                        </C.Line>
                    </C.ContainerVertical>
                </C.Row>
            </C.ContainerHorizontal>

            <C.ContainerVertical style={{borderBottomWidth:1, borderColor:"#c6c6c6"}} >
                <C.Line style={{padding:8}}>
                <C.Text style={{fontSize:20, fontWeight:'bold'}} >
                        Informações Gerais
                    </C.Text>
                </C.Line>

                <C.Line style={{padding:8}}>
                    <C.Text style={{fontSize:18, fontWeight:'bold', marginBottom: 5}} >
                        Data e hora do agendamento
                    </C.Text>
                    <C.Text style={{marginLeft:5, marginBottom: 10}}>{showTextDate(route.params.infoGeral.selectedDate, route.params.infoGeral.selectedTime)}</C.Text>
                </C.Line>

                <C.Line style={{padding:8}}>
                    <C.Text style={{fontSize:20, fontWeight:'bold', marginBottom: 5}} >
                        Paciente
                    </C.Text>
                    <C.Text style={{marginLeft:5, marginBottom: 5}}>{context.user.user.nome}</C.Text>
                    {/* <C.Text style={{marginLeft:5, marginBottom: 5}}>{context.user.user.nascimento}</C.Text> */}
                    <C.Text style={{marginLeft:5, marginBottom: 5}}>{context.user.user.email}</C.Text>
                </C.Line>
            </C.ContainerVertical>

            <C.ContainerVertical >
                <C.Line style={{padding:16}}>
                <C.Text style={{fontSize:20, fontWeight:'bold'}} >
                        Pagamento
                    </C.Text>
                </C.Line>
                {route.params.infoGeral.onButton == 0 &&
                <>
                    <C.Line style={{padding:16}}>
                            <C.Text style={{fontSize:18, fontWeight:'bold'}} >
                                Valor
                            </C.Text>
                        <C.Row style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                        <C.Text style={{marginLeft:5, color: '#4fa040', fontWeight: 'bold'}}>R$ 39,90 x 1 Sessão</C.Text>
                        <C.Text style={{marginLeft:5, color: '#4fa040', fontWeight: 'bold'}}>R$ 39,90</C.Text>
                        </C.Row>
                    </C.Line>
                </>
                }
                {route.params.infoGeral.onButton == 1 &&
                <>
                <C.Line style={{padding:16}}>
                        <C.Text style={{fontSize:18, fontWeight:'bold'}} >
                            Valor
                        </C.Text>
                    <C.Row style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                    <C.Text style={{marginLeft:5, marginTop:10, color: '#4fa040', fontWeight: 'bold'}}>R$ 39,90 x 4 Sessão</C.Text>
                    <C.Text style={{marginLeft:5, marginTop:10, color: '#4fa040', fontWeight: 'bold'}}>R$ 159,60</C.Text>
                    </C.Row>

                </C.Line>
                <C.Line style={{padding:16}}>
                        <C.Text style={{fontSize:18, fontWeight:'bold'}} >
                            Desconto
                        </C.Text>
                    <C.Row style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                    <C.Text style={{marginLeft:5, marginTop:10, color: '#4fa040', fontWeight: 'bold'}}>R$ 159,60 - 45,21</C.Text>
                    <C.Text style={{marginLeft:5, marginTop:10, color: '#4fa040', fontWeight: 'bold'}}>R$ 114,39</C.Text>
                    </C.Row>
                    
                </C.Line>
                </>
                }

                <C.Line style={{padding:16}}>
                        <C.Text style={{fontSize:18, fontWeight:'bold'}} >
                            Método de pagamento ( Boleto )
                        </C.Text>
                    <C.Row style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                    </C.Row>
                </C.Line>

                <C.Line style={{padding:16}}>
                       
                    <C.Row style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                    <C.Text style={{fontSize:18, fontWeight:'bold'}} >
                            Total (BRL)
                        </C.Text>
                    {route.params.infoGeral.onButton == 1 &&
                    <C.Text style={{fontSize:22, marginLeft:5, marginBottom: 10, color: '#4fa040', fontWeight: 'bold'}}>R$ 114,39</C.Text>
                    }
                    {route.params.infoGeral.onButton == 0 &&
                    <C.Text style={{fontSize:22, marginLeft:5, marginBottom: 10, color: '#4fa040', fontWeight: 'bold'}}>R$ 39,90</C.Text>
                    }
                    </C.Row>
                </C.Line>

                <C.ButtonArea onPress={handleConfirmAgendamento}>
                    <C.ButtonText>CONFIRMAR AGENDAMENTO</C.ButtonText>
                </C.ButtonArea>
            </C.ContainerVertical>

            </C.Scroller>
            {!loading &&
                <C.ButtonArea >
                    <C.ButtonText>CONFIRMAR AGENDAMENTO</C.ButtonText>
                </C.ButtonArea>
            }
        </C.Container>
    );
}