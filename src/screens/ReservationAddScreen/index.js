import React, { useEffect, useState, useRef } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import CalendarPicker from 'react-native-calendar-picker';
import C from './style';

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

    const [temSessaoDisponivel, setTemSessaoDisponivel] = useState(false);
    const [qtSessaoDisponivel, setQtSessaoDisponivel] = useState(0);
    useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', () => {
            navigation.setOptions({
                headerTitle: `Agendar com ${route.params.data.nome}`
            });
            getDisabledDates();
        });
        return unsubscribe;
    }, [navigation, route]);

    useEffect(()=>{
        getTimes();
    }, [selectedDate]);

    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);

    const getTimes = async () => {
        if(selectedDate) {
            const result = await api.getReservationTimes(
                route.params.data.id,
                selectedDate
            );
            if(result.error === '') {
                setSelectedTime(null);
                setTimeList(result.list);
                if(result.sessaoDisponivel > 0){
                    setTemSessaoDisponivel(true);
                    setQtSessaoDisponivel(result.sessaoDisponivel);
                } 
                setTimeout(()=>{
                    scroll.current.scrollToEnd();
                }, 500);
            } else {
                alert(result.error);
            }
        }
    }

    const getDisabledDates = async () => {
        setDisabledDates([]);
        setTimeList([]);
        setSelectedDate(null);
        setSelectedTime(null);
        setLoading(true);
        const result = await api.getDisabledDates(route.params.data.id);
        setLoading(false);
        if(result.error === '') {
            let dateList = [];
            for(let i in result.list) {
                var tomorrow =  new Date(result.list[i]);
                tomorrow.setDate(tomorrow.getDate() + 1);
                dateList.push( tomorrow );
            }
            setDisabledDates(dateList);
        } else {
            alert(result.error);
        }
    }

    const handleDateChange = (date) => {
        let dateEl = new Date(date);
        let year = dateEl.getFullYear();
        let month = dateEl.getMonth() + 1;
        let day = dateEl.getDate();

        month = month < 10 ? '0'+month : month;
        day = day < 10 ? '0'+day : day;
        setSelectedDate(`${year}-${month}-${day}`);
    }

    const showTextDate = (date) => {
        let dateEl = new Date(date);
        let year = dateEl.getFullYear();
        let month = dateEl.getMonth() + 1;
        let day = dateEl.getDate();

        month = month < 10 ? '0'+month : month;
        day = day < 10 ? '0'+day : day;
        return `${day}/${month}/${year}`;
    }

    const handleAvancarClick = () => {
        if(selectedDate && selectedTime) {
            var infoGeral = {
                'data': route.params.data,
                'selectedDate': selectedDate,
                'selectedTime': selectedTime
            };
            // navigation.navigate('ReservationConfirmScreen', {infoGeral});
            navigation.navigate('ReservationSelectScreen', {infoGeral});
        } else {
            alert("Selecione DATA e HORÁRIO.");
        }
    }

    const handleAvancarSessaoClick = async () => {
        if(selectedDate && selectedTime) {
            const result = await api.setReservationSessao(
                route.params.data.id,
                selectedDate,
                selectedTime,
                0
            );
            if(result.error === '') {
                let qtSessao = qtSessaoDisponivel - 1;
                alert(`Seu agendamento foi realizado com sucesso, agora você tem ${qtSessao} sessões disponíveis! `);
                navigation.navigate('ReservationMyScreen');
            } else {
                alert(result.error);
            }

        } else {
            alert("Selecione DATA e HORÁRIO.");
        }
    }

    

    return (
        <C.Container>
            <C.Scroller ref={scroll} contentContainerStyle={{paddingBottom: 40}}>
            <C.CoverImage source={require('../../assets/avatardemo.png')} resizeMode="cover" />

                {loading &&
                    <C.LoadingIcon size="large" color="#3795d2" />
                }

                {!loading &&
                    <C.CalendarArea>
                        <CalendarPicker
                            onDateChange={handleDateChange}
                            disabledDates={disabledDates}
                            minDate={minDate}
                            maxDate={maxDate}
                            weekdays={['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']}
                            months={['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']}
                            previousTitle="Anterior"
                            nextTitle="Próximo"
                            selectedDayColor="#3795d2"
                            selectedDayTextColor="#FFFFFF"
                            todayBackgroundColor="transparent"
                            todayTextStyle="#000000"
                        />
                    </C.CalendarArea>
                }

                {!loading && selectedDate &&
                    <>
                        <C.Title>Horários disponíveis em {showTextDate(selectedDate)}:</C.Title>

                        <C.TimeListArea>
                            {timeList.map((item, index)=>(
                                <C.TimeItem
                                    key={index}
                                    onPress={()=>setSelectedTime(item.id)}
                                    active={selectedTime === item.id}
                                >
                                    <C.TimeItemText
                                        active={selectedTime === item.id}
                                    >{item.title}</C.TimeItemText>
                                </C.TimeItem>
                            ))}
                        </C.TimeListArea>
                    </>
                }
            </C.Scroller>
            {!loading && !temSessaoDisponivel &&
                <C.ButtonArea onPress={handleAvancarClick}>
                    <C.ButtonText>Avançar</C.ButtonText>
                </C.ButtonArea>
            }

            {!loading && temSessaoDisponivel &&
                <C.ButtonArea onPress={handleAvancarSessaoClick}>
                    <C.ButtonText>Reservar</C.ButtonText>
                </C.ButtonArea>
            }
        </C.Container>
    );
}