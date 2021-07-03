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

    const handleMostrarHistorico = async () => {
        if(!mostrarHumor){
            const result = await api.getHumorClient(route.params.data.id_usuario);
            setMostrarHumor(!mostrarHumor);
            if(result.error === '') {
                setHumor(result.list);
            } else {
                alert(result.error);
            }
        }else{
            setMostrarHumor(!mostrarHumor);
        }
        
    }

    const handleFinalizarAtendimento = async () => {
       
        
        const result = await api.finalizarClient(
            route.params.data.id,
            time,
            complemento

        );
        if(result.error === '') {
            navigation.reset({
                routes:[{name: 'FilaDeEsperaScreen'}]
            });
        } else {
            alert(result.error);
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
                <Text style={{color: '#435a7c', fontSize:22, fontWeight: 'bold'}}>Dados do Cliente</Text>
                
                
                <C.Box>
                    <C.BoxIn>
                        <Icon
                            name='calendar'
                            size={20}
                            color='#435a7c'
                        />
                        <C.BoxInText>{route.params.data.datereserved}</C.BoxInText>
                    </C.BoxIn>
                    
                </C.Box>
               
                <C.Psc>
                    <Icon
                        name='stethoscope'
                        size={20}
                        color='#435a7c'
                    />
                    <C.PscText>Terapeutizando</C.PscText>
                </C.Psc>
                <C.Psc>
                    <Icon
                        name='user'
                        size={20}
                        color='#435a7c'
                    />
                    <C.PscText>{route.params.data.title}</C.PscText>
                </C.Psc>
                {atendimento &&
                <>
                <C.NascimentoBox>
                {/* <C.NascimentoBoxTitle style={{color:'#f00'}}>Tempo do Atendimento {time}</C.NascimentoBoxTitle> */}
               
            </C.NascimentoBox>
                {/* <C.Sessoes>
                    <C.SessoesTitle>Qtd de sessões</C.SessoesTitle>
                        <C.SessoesCampos>
                            <C.SessoesBox>
                            <TextInputMask
                                type={'only-numbers'}
                                value={sessao}
                placeholderTextColor="black"

                                color='#000'
                                onChangeText={(t)=>setSessao(t)}
                                placeholder='1'
                                />
                            </C.SessoesBox>
                            <C.SessoesBox style={{paddingLeft: 10, paddingRight:10}}>
                            <TextInputMask
                            type={'money'}
                            color='#000'
                            placeholder='Digite o valor'
                placeholderTextColor="black"

                            value={valor}
                            onChangeText={(t)=>setValor(t)}
                            />
                            </C.SessoesBox>
                        </C.SessoesCampos>
                </C.Sessoes> */}
                

                <C.InfoGer>
                    <C.InfoGerText>Informações complementares (opcional)</C.InfoGerText>
                    <C.InfoGerInput 
                        value={complemento}
                placeholderTextColor="black"

                        onChangeText={(t)=>setComplemento(t)}
                    />
                </C.InfoGer>
                </>
                }
                {!atendimento && 
                <C.Button onPress={handleIniciarAtendimento}>
                    <LinearGradient colors={['#3795d2', '#0f89d8', '#006eb5']} style={styles.linearGradient}>
                        <Text style={styles.buttonText}>
                            Iniciar atendimento
                        </Text>
                    </LinearGradient>
                </C.Button>
                }
                {atendimento && 
                <C.Button onPress={handleFinalizarAtendimento}>
                    <LinearGradient colors={['#d23737', '#d21515', '#a90505']} style={styles.linearGradient}>
                        <Text style={styles.buttonText}>
                           Encerrar atendimento
                        </Text>
                    </LinearGradient>
                </C.Button>
                }

                <C.Button onPress={handleMostrarHistorico} style={{marginTop:10, marginBottom: 20}}>
                    <LinearGradient colors={['#5cb85c', '#36cc36', '#259c25']} style={styles.linearGradient}>
                        <Text style={styles.buttonText}>
                            {mostrarHumor === false ? 'Mostrar histórico de humor' : 'Ocultar histórico de humor'}
                            
                        </Text>
                    </LinearGradient>
                </C.Button>
                {mostrarHumor && humor.length == 0 &&
                    <Text>Terapeutizando ainda não tem humor cadastrado</Text>
                }
                {mostrarHumor && humor.length > 0 &&
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