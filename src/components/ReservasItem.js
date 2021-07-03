import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { useNavigation } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text';

import { View } from 'react-native';

import api from '../services/api';
import { useSafeArea } from 'react-native-safe-area-context';
import { CheckBox, Button, Overlay } from 'react-native-elements';

import Pendente from '../assets/pendente.svg';
import Concluido from '../assets/concluido.svg';


const Box = styled.View`
    background-color: #FFF;
    border-radius: 5px;
    margin-bottom: 10px;
`;

const HeaderArea = styled.View`
    flex-direction: row;
    align-items: center;
`;
const InfoArea = styled.View`
    flex: 1;
    flex-direction:row;
`;
const Title = styled.Text`
    font-size: 17px;
    font-weight: bold;
    color: #000;
`;
const Date = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: #9C9DB9;
`;

const Body = styled.Text`
    font-size: 15px;
    color: #000;
    margin: 15px 0;
`;

const InfoAreaBox = styled.View`
    padding:15px;
    border-bottom-width:1px;
    border-color: #ccc;
`;

const FooterArea = styled.View`
    flex-direction: row;
    align-items: center;
`;
const LikeButton = styled.TouchableOpacity`
    width: 20px;
    height: 20px;
    justify-content: center;
    align-items: center;
`;
const LikeText = styled.Text`
    margin-left: 5px;
    font-size: 13px;
    color: #9C9DB9;
`;

const ButtonMostrarMais = styled.TouchableOpacity`
    flex:1;
    justify-content:center;
    align-items:center;
    border-top-width:1px;
    border-color: #ccc;
    padding:10px;

`;

const CoverImage = styled.Image`
    background-color: #fff;
    height: 50px;
    width: 50px;
    border-radius: 15px;
`;
const Picker = styled.Picker``;

const MostrarBox = styled.View`
    padding:15px;
    flex-direction:row;
    justify-content: space-between;
`;

const ButtonArea = styled.TouchableOpacity`
        background-color: #3795d2;
        padding: 12px;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        margin-top: 15px;
        margin-bottom: 15px;
`;
const ButtonText = styled.Text`
        color: #FFF;
        font-size: 15px;
        font-weight: bold;
`;

const MostrarBoxItem = styled.View`

`;

const MostrarBoxItemText = styled.Text`

`;

const FieldCampo = styled.View`
        background-color: #f2f2f2;
        border-radius: 50px;
        color: #000;
        font-size: 15px;
        padding-left: 19px;
        padding-right: 19px

        
        margin-top: 5px;
    `;

export default ({data, thisRefresh}) => {
    const navigation = useNavigation();

    const [likeCount, setLikeCount] = useState(data.likes);
    const [liked, setLiked] = useState(data.liked);
    const [mostrar, setMostrar] = useState(false);
    const [list, setList] = useState([]);

    const [pago, setPago] = useState(false);
    const [naoPago, setNaoPago] = useState(false);

    const [dataPagamento, setDataPagamento] = useState('');
   

    const handleMostrar = () => {
        setMostrar(!mostrar);
    }

    useEffect(()=>{
        if(data.pagamento == '1'){
            setPago(true);
            setDataPagamento(data.dt_pagamento);

        }else if(data.pagamento == '2'){
            setNaoPago(true);
        }
        
    },[]);

    const handleLike = async () => {
        setLiked(!liked);
        const result = await api.likeWallPost(data.id);
        if(result.error === '') {
            setLikeCount( result.likes );
            setLiked( result.liked );
        } else {
            alert(result.error);
        }
    }
    const handlePagamentoButton = async () => {
        
        if(pago || naoPago){
            if(pago && dataPagamento === ''){
                alert('Digite a data do pagamento');
                return false;
            }
                var isPago = '';
                if(pago){
                    isPago = '1';
                }else{
                    isPago = '2';
                }
                const result = await api.setPagamentoCliente(data.id, isPago, dataPagamento);
                if(result.error === '') {
                    alert('Pagamento atualizado com Sucesso!');
                    thisRefresh();
                } else {
                    alert(result.error);
                }
        }else{
            alert('Selecione se foi pago ou Não');
        }
        
    }
    
    const setPagamento = (item) => {
        if(item == '1'){
            setPago(true);
            setNaoPago(false);
        }else{
            setNaoPago(true);
            setPago(false);
        }
    }



    return (
        <Box
            style={mostrar === true ? {height:380} : {height:110}}
        >
            <HeaderArea>
                <InfoArea>
                    <InfoAreaBox style={{flex:1}}>
                        <Title>{data.psicologo.nome}</Title>
                        <Date>{data.reservation_date}</Date>
                    </InfoAreaBox>
                    <InfoAreaBox style={{width:120, alignItems: 'flex-end'}}>
                        {data.pagamento == '0' && 
                        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <Pendente width="15" height="15" fill='#c82333'/>
                            <Date style={{marginLeft: 5, color: '#c82333'}}>Pendente</Date>
                        </View>
                        }
                        {data.pagamento != '0' && 
                        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <Concluido width="15" height="15" fill='#5cb85c'/>
                            <Date style={{marginLeft: 5, color: '#5cb85c'}}>Concluido</Date>
                        </View>
                        }
                    </InfoAreaBox>
                    {/* <Date>Duração:{data.duracao}</Date>
                    <Picker 
                    
                    >
                        <Picker.Item label="Pago?" value="" />
                    
                        <Picker.Item label="Sim" value="Sim" />
                        <Picker.Item label="Não" value="Não" />
                    
                        
                    
                    </Picker> */}

                </InfoArea>

            </HeaderArea>
            {mostrar && 
                <MostrarBox>

                    <MostrarBoxItem>
                    <MostrarBoxItemText>Valor:</MostrarBoxItemText>
                    <MostrarBoxItemText>Status:</MostrarBoxItemText>
                    </MostrarBoxItem>

                    <MostrarBoxItem style={{alignItems: 'flex-end'}}>
                        <MostrarBoxItemText>R$ {data.valor}</MostrarBoxItemText>
                        {data.pagamento != '0' && 
                        <MostrarBoxItemText>{data.pagamento == '1' ? 'Pago' : 'Não Pago'}</MostrarBoxItemText>
                        }
                        {data.pagamento == '0' && 
                        <MostrarBoxItemText>Pendente</MostrarBoxItemText>
                        }
                       
                        <View style={{flexDirection: 'row'}}>
                        <CheckBox
                        title='Pago'
                        checked={pago}
                        onPress={()=>setPagamento('1')}
                        containerStyle={{borderWidth: 0}}
                        />
                        <CheckBox
                        title='Não Pago'
                        checked={naoPago}
                        onPress={()=>setPagamento('2')}
                        containerStyle={{borderWidth: 0}}
                        />
                        </View>
                        <FieldCampo>
                        <TextInputMask
                            type={'datetime'}
                            options={{
                              format: 'DD/MM/YYYY'
                            }}
                            color='#000'
                            placeholder='Data do pagamento'
                            placeholderTextColor="black"

                            value={dataPagamento}
                            onChangeText={(t)=>setDataPagamento(t)}
                            />
                        </FieldCampo>
                        <ButtonArea style={{width: 200}} onPress={handlePagamentoButton}>
                        <ButtonText>Salvar</ButtonText>
                        </ButtonArea>
                        
                    </MostrarBoxItem>
                    
                </MostrarBox>
            }
            <ButtonMostrarMais onPress={handleMostrar}>
                {!mostrar &&     
                    <Icon name="angle-double-down" size={20} color="#000" />
                }
                {mostrar &&     
                    <Icon name="angle-double-up" size={20} color="#000" />
                }
            </ButtonMostrarMais>
            
           
        </Box>
    );
}