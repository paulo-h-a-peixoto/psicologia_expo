import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker'
import C from './style';

import { TextInputMask } from 'react-native-masked-text';
import { LinearGradient } from 'expo-linear-gradient';

import { Text, View, StyleSheet } from 'react-native';

import { useStateValue } from '../../contexts/StateContext';
import api from '../../services/api';

import ReservasItem from '../../components/ReservasItem';
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
    useEffect(()=>{
        getInfoGeral();
    },[]);

    const getInfoGeral = async () => {
        setLoading(true);
        const result = await api.getInfoGeral(route.params.data.id);
        if(result.error === '') {
            setList(result.list);
        } else {
            alert(result.error);
        }
        setLoading(false);
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
            {loading &&
                    <C.LoadingIcon size="large" color="#8863E6" />
                }
            {!loading && 
            <>
           <Text style={{color: '#435a7c', fontSize:22, fontWeight: 'bold', marginBottom:5, marginTop:5}}>Informações do Cliente</Text>

           <C.Conjunto> 
                <C.Psc>
                    <C.PscText>{list.cliente.nome}</C.PscText>
                </C.Psc>
                <C.Psc>
                    <C.PscText>Nascimento: {list.cliente.nascimento}</C.PscText>
                </C.Psc>
                <C.Psc>
                    <C.PscText>Endereço: {list.cliente.endereco}</C.PscText>
                </C.Psc>
                <C.Psc>
                    <C.PscText>Telefone: {list.cliente.telefone}</C.PscText>
                </C.Psc>
           </C.Conjunto>
                <Text style={{color: '#435a7c', fontSize:22, fontWeight: 'bold', marginBottom:5, marginTop:10}}>Histórico</Text>
                 <C.List
                data={list.reservas}
                onRefresh={getInfoGeral}
                refreshing={loading}
                renderItem={({item})=><ReservasItem data={item} thisRefresh={getInfoGeral}/>}
                keyExtractor={(item)=>item.id.toString()}
                />
           </>
           }
        </C.Container>
    );
}