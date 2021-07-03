import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker'
import C from './style';

import Timeline from 'react-native-timeline-flatlist';

import { TextInputMask } from 'react-native-masked-text';
import { LinearGradient } from 'expo-linear-gradient';

import { Text, View, StyleSheet } from 'react-native';

import { useStateValue } from '../../contexts/StateContext';
import api from '../../services/api';

import WarningItem from '../../components/WarningItem';
import styled from 'styled-components';
import { min } from 'moment';

export default ({data}) => {
    const navigation = useNavigation();
    const route = useRoute();
    const [context, dispatch] = useStateValue();

    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);
    const [sessao, setSessao] = useState(1);
    const [valor, setValor] = useState('');
    const [time, setTime] = useState('');
    const [vencimento, setVencimento] = useState('');
    const [atendimento, setAtendimento] = useState(false);
    const [complemento, setComplemento] = useState('');
    const [clearContagem, setClearContagem] = useState(false);

    const [mostrarHumor, setMostrarHumor] = useState(false);
    const [humor, setHumor] = useState([]);

    const getWarnings = async () => {
        setList([]);
        setLoading(true);
        const result = await api.getWarnings();
        setLoading(false);
        if(result.error === '') {
            setList(result.list);
        } else {
            alert(result.error);
        }
    }
    

    let hh = 0;
    let mm = 0;
    let ss = 0;
    
    var tempo = 1000;//Quantos milésimos valem 1 segundo?
    var cron;

    const functeste = () => {
        ss++; //Incrementa +1 na variável ss

        if (ss == 59) { //Verifica se deu 59 segundos
            ss = 0; //Volta os segundos para 0
            mm++; //Adiciona +1 na variável mm

            if (mm == 59) { //Verifica se deu 59 minutos
                mm = 0;//Volta os minutos para 0
                hh++;//Adiciona +1 na variável hora
            }
        }

        //Cria uma variável com o valor tratado HH:MM:SS
        var format = (hh < 10 ? '0' + hh : hh) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss);
        
        //Insere o valor tratado no elemento counter
        setTime(format);

        //Retorna o valor tratado
        return format;
    }

    const handleIniciarAtendimento = () => {
        
        setAtendimento(true);
        const teste = setInterval(functeste, 1000);
          
           
    }
    useEffect(()=>{
        handleMostrarHistorico();
    },[]);

    const handleMostrarHistorico = async () => {
        setLoading(true);
        if(!mostrarHumor){
            const result = await api.getHumorClient(route.params.data.id);
            setMostrarHumor(!mostrarHumor);
            if(result.error === '') {
                setHumor(result.list);
            } else {
                alert(result.error);
            }
        }else{
            setMostrarHumor(!mostrarHumor);
        }
        setLoading(false);
        
    }

    const handleFinalizarAtendimento = async () => {
       
        
        if(vencimento && sessao && valor) {
            const result = await api.finalizarClient(
                route.params.data.id,
                time,
                vencimento,
                sessao,
                valor,
                complemento

            );
            if(result.error === '') {
                navigation.reset({
                    routes:[{name: 'FilaDeEsperaScreen'}]
                });
            } else {
                alert(result.error);
            }
        } else {
            alert("Preencha todos os campos obrigatórios");
        }
       
   }

    var styles = StyleSheet.create({
        linearGradient: {
          flex: 1,
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
           <C.Conjunto> 
                <Text style={{color: '#435a7c', fontSize:22, fontWeight: 'bold'}}>Histórico de Humor do Terapeutizando</Text>
                {humor.length == 0 &&
                    <Text>Terapeutizando ainda não tem humor cadastrado</Text>
                }
                {humor.length > 0 &&
                <Timeline
                    innerCircle={'icon'}
                    data={humor}
                    circleSize={20}
                    circleColor='rgb(45,156,219)'
                    lineColor='rgb(45,156,219)'
                    timeContainerStyle={{minWidth:52, marginTop: 5, marginBottom: 20}}
                    timeStyle={{textAlign: 'center', backgroundColor:'#71a2ea', color:'white', padding:5, borderRadius:13, marginBottom:20}}
                    descriptionStyle={{color:'gray'}}
                    options={{
                        style:{paddingTop:5}
                    }}
                    />
                }
           </C.Conjunto>
           

        </C.Container>
    );
}