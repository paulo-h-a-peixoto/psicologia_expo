import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';
import C from './style';


import { View, Button, Text, StyleSheet, Linking } from 'react-native';

import { useStateValue } from '../../contexts/StateContext';
import api from '../../services/api';

import SuperFeliz from '../../assets/superfeliz.svg';
import Feliz from '../../assets/feliz.svg';
import Normal from '../../assets/normal.svg';
import Triste from '../../assets/triste.svg';
import Doente from '../../assets/doente.svg';
import Nota from '../../assets/nota.svg';
import Chorando from '../../assets/chorando.svg';

import SuperFeliz2 from '../../assets/superfeliz2.svg';
import Feliz2 from '../../assets/feliz2.svg';
import Normal2 from '../../assets/normal2.svg';
import Triste2 from '../../assets/triste2.svg';
import Doente2 from '../../assets/doente2.svg';



import ReservationItem from '../../components/ReservationItem';

export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);

    const [humorSelect, setHumorSelect] = useState(0);

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const [descricao, setDescricao] = useState('');

    const ajuda = () => {
        Linking.openURL('https://wa.me/+5561985889798?text=Preciso%20de%20ajuda!');
    };

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

    const onSalvarHandle = async () => {
        if(humorSelect != 0) {
            const result = await api.saveHumor(
                humorSelect,
                descricao
            );
            if(result.error === '') {
                alert('Seu Humor foi armazenado com sucesso!');
                navigation.navigate('ReservationMyScreen');
            } else {
                alert(result.error);
            }
        } else {
            alert("Selecione pelo menos o humor.");
        }
    }

    const onHumorPress = (id) => {
        setHumorSelect(id);
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

      var styles2 = StyleSheet.create({
        linearGradient: {
          width: 300,
          
          paddingLeft: 15,
          paddingRight: 15,
          borderRadius: 5,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20
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
            <C.Conteudo>
                <C.Title>Como você está?</C.Title>
                
                <C.Humor>
                    {humorSelect != 1 && 
                    <C.HumorBotao onPress={() => onHumorPress(1)}>
                        <SuperFeliz width="60" height="60" fill='#8BC34A'/>
                        <C.HumorBotaoText style={{color: '#8BC34A'}}>radiante</C.HumorBotaoText>
                    </C.HumorBotao>
                    }
                    {humorSelect == 1 && 
                    <C.HumorBotao onPress={() => onHumorPress(1)}>
                        <SuperFeliz2 width="63" height="63" fill='#8BC34A'/>
                        <C.HumorBotaoText style={{color: '#8BC34A'}}>radiante</C.HumorBotaoText>
                    </C.HumorBotao>
                    }
                    {humorSelect != 2 && 
                    <C.HumorBotao onPress={() => onHumorPress(2)}>
                        <Feliz width="60" height="60" fill='#AED581'/>
                        <C.HumorBotaoText style={{color: '#AED581'}}>bem</C.HumorBotaoText>
                    </C.HumorBotao>
                    }
                    {humorSelect == 2 && 
                    <C.HumorBotao onPress={() => onHumorPress(2)}>
                        <Feliz2 width="63" height="63" fill='#AED581'/>
                        <C.HumorBotaoText style={{color: '#AED581'}}>bem</C.HumorBotaoText>
                    </C.HumorBotao>
                    }
                    {humorSelect != 3 && 
                    <C.HumorBotao onPress={() => onHumorPress(3)}>
                        <Normal width="60" height="60" fill='#00BCD4'/>
                        <C.HumorBotaoText style={{width: 60, textAlign: 'center', color: '#00BCD4'}}>mais ou menos</C.HumorBotaoText>
                    </C.HumorBotao>
                    }
                    {humorSelect == 3 && 
                    <C.HumorBotao onPress={() => onHumorPress(3)}>
                        <Normal2 width="63" height="63" fill='#00BCD4'/>
                        <C.HumorBotaoText style={{width: 60, textAlign: 'center', color: '#00BCD4'}}>mais ou menos</C.HumorBotaoText>
                    </C.HumorBotao>
                    }
                    {humorSelect != 4 && 
                    <C.HumorBotao onPress={() => onHumorPress(4)}>
                        <Triste width="60" height="60" fill='#A1887F'/>
                        <C.HumorBotaoText style={{color: '#A1887F'}}>mal</C.HumorBotaoText>
                    </C.HumorBotao>
                    }
                    {humorSelect == 4 && 
                    <C.HumorBotao onPress={() => onHumorPress(4)}>
                        <Triste2 width="63" height="63" fill='#A1887F'/>
                        <C.HumorBotaoText style={{color: '#A1887F'}}>mal</C.HumorBotaoText>
                    </C.HumorBotao>
                    }
                    {humorSelect != 5 &&
                    <C.HumorBotao onPress={() => onHumorPress(5)}>
                        <Doente width="60" height="60" fill='#424242'/>
                        <C.HumorBotaoText style={{color: '#424242'}}>horrível</C.HumorBotaoText>
                    </C.HumorBotao>
                    }
                    {humorSelect == 5 &&
                    <C.HumorBotao onPress={() => onHumorPress(5)}>
                        <Doente2 width="63" height="63" fill='#424242'/>
                        <C.HumorBotaoText style={{color: '#424242'}}>horrível</C.HumorBotaoText>
                    </C.HumorBotao>
                    }
                </C.Humor>
                <C.Conteudo>
                <C.Campo>
                    <C.Info>
                        <Nota width="30" height="30" fill='#3795d2'/>
                        <C.InfoText>Me conte como você está se sentindo neste exato momento </C.InfoText>
                    </C.Info>
                    <C.Input 
                        placeholder="Digite aqui ..."
                        value={descricao}
                        onChangeText={t=>setDescricao(t)}
                    />
                </C.Campo>
                </C.Conteudo>
            
            
            </C.Conteudo>
            <C.Conteudo style={{flex:1, justifyContent:'space-between', paddingBottom: 20}}>
            
                <C.Ajuda onPress={ajuda}>
                    <Chorando width="60" height="60" fill='#eac31a'/>
                    <C.AjudaBox>
                        <C.AjudaText>
                            Preciso de ajuda!
                        </C.AjudaText>
                        <C.AjudaText>
                            Não estou aguentando mais!
                        </C.AjudaText>
                    </C.AjudaBox>
                </C.Ajuda>
         
                <C.Button onPress={onSalvarHandle}>
                    <LinearGradient colors={['#4eaf6c', '#2cb557', '#1a803a']} style={styles.linearGradient}>
                        <Text style={styles.buttonText}>
                            Salvar
                        </Text>
                    </LinearGradient>
                </C.Button>
                </C.Conteudo>
            {show && (
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    />
                )}
        </C.Container>
    );
}