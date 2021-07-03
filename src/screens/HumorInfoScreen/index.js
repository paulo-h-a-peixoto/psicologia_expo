import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';
import C from './style';
import Timeline from 'react-native-timeline-flatlist';
import Icon from 'react-native-vector-icons/FontAwesome';

import { View, Text, StyleSheet } from 'react-native';

import { useStateValue } from '../../contexts/StateContext';
import api from '../../services/api';

import SuperFeliz from '../../assets/superfeliz.svg';
import Voltar from '../../assets/back.svg';
import Nota from '../../assets/nota.svg';
import Camera from '../../assets/camera.svg';
import Doente from '../../assets/doente.svg';



import ReservationItem from '../../components/ReservationItem';

export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);

    const [data, setData] = useState(
        [
            {
              "time": "13\/05\/2021 11:25",
              "title": "Radiante",
              "description": "Hoje estou me sentindo bem!"
            },
            {
                "time": "13\/05\/2021 11:25",
                "title": "Radiante",
                "description": "Hoje estou me sentindo bem!"
              }
        ]
    );

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
      };
      const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
      };
    
      const showDatepicker = () => {
        showMode('date');
      };
    
      const showTimepicker = () => {
        showMode('time');
      };

    useEffect(()=>{
      
        getReservations();
    }, []);

    const getReservations = async () => {
        setList([]);
        setLoading(true);
        const result = await api.getReservations();
        setLoading(false);
        if(result.error === '') {
            setList(result.list);
        } else {
            alert(result.error);
        }
    }

    const onHumorPress = () => {
        navigation.navigate('HumorInfoScreen');
    }

    var styles = StyleSheet.create({
        linearGradient: {
          width: 300,
          paddingLeft: 15,
          paddingRight: 15,
          borderRadius: 5
        },
        buttonText: {
          fontSize: 18,
          textAlign: 'center',
          margin: 10,
          color: '#ffffff',
          backgroundColor: 'transparent',
        },
      });

    return (
        <C.Container>
            <Timeline
            innerCircle={'icon'}
            data={data}
            circleSize={20}
            circleColor='rgb(45,156,219)'
            lineColor='rgb(45,156,219)'
            timeContainerStyle={{minWidth:52, marginTop: 5}}
            timeStyle={{textAlign: 'center', backgroundColor:'#71a2ea', color:'white', padding:5, borderRadius:13}}
            descriptionStyle={{color:'gray'}}
            options={{
                style:{paddingTop:5}
            }}
            />
        </C.Container>
    );
}