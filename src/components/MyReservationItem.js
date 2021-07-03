import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Alert } from 'react-native';
import api from '../services/api';
import style from '../screens/ReservationSuccessScreen/style';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';

const Box = styled.View`
    background-color: #FFF;
    border-width: 2px;
    border-color: #E8E9ED;
    border-radius: 15px;
    margin-bottom: 15px;
    flex-direction: row;
    align-items: center;
    padding:16px;
`;
const CoverImage = styled.Image`
    width: 80px;
    height: 80px;
    border-radius: 15px;
`;
const InfoArea = styled.View`
    flex: 1;
    margin-left: 10px;
`;
const Title = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #000;
    margin-bottom: 5px;
`;
const InfoText = styled.Text`
    color: #9C9DB9;
`;
const DateText = styled.Text`
    color: #000;
`;
const ButtonItem = styled.TouchableOpacity`
`;
const ButtonItemInfo = styled.TouchableOpacity`
    border-radius:5px;
    background-color: #3795d2;
    justify-content:center;
    align-items:center;
    padding:8px;
    margin-top:3px;
`;
const ButtonText = styled.Text`
    color:#fff;
    font-size:16px;
    font-weight: bold;
`;

export default ({data, refreshFunction, showSelected}) => {
    const navigation = useNavigation();
    const handleRemoveButton = () => {
        Alert.alert(
            'Confirmação',
            'Tem certeza que deseja cancelar o agendamento?',
            [
                {text: 'Sim, tenho certeza', onPress: removeReservation},
                {text: 'Cancelar', onPress: null, style: 'cancel'}
            ]
        );
    }

    const removeReservation = async () => {
        const result = await api.removeReservation(data.id);
        if(result.error === '') {
            refreshFunction();
        } else {
            alert(result.error);
        }
    }

    const handleInfoButton = () => {
        navigation.navigate('ReservationInfoScreen', {data});
    }

    return (
        
        <Box>
           
            <CoverImage source={{uri: data.image}} resizeMode="cover" />
            <InfoArea >
                <Title>{data.title}</Title>
                <InfoText>Horário reservado:</InfoText>
                <DateText>{data.datereserved}</DateText>
                <InfoArea style={{flexDirection:'row'}}>
                    {data.status == '0' && 
                    <DateText style={{color:'#5078ca'}}>Gerando Boleto</DateText>
                    }
                    {data.status == '1' && 
                    <DateText style={{color:'#dcb45b'}}>Aguardando Pagamento</DateText>
                    }
                    {data.status == '2' && showSelected == '4' &&
                    <DateText style={{color:'#5cb85c'}}>Pagamento realizado</DateText>
                    }
                    {data.status == '2' && showSelected == '1' &&
                    <DateText style={{color:'#5cb85c'}}>Pagamento realizado</DateText>
                    }
                    {data.status == '2' && showSelected == '5' && data.sessao == '0' &&
                    <DateText style={{color:'#5cb85c'}}>Consulta Pendente</DateText>
                    }
                    {data.status == '2' && showSelected == '6' && data.sessao == '3' &&
                    <DateText style={{color:'#5cb85c'}}>Consulta Realizada</DateText>
                    }
                    {data.status == '2' && showSelected == '7' && data.sessao == '4' &&
                    <DateText style={{color:'#5cb85c'}}>Consultas Não comparecidas</DateText>
                    }
                </InfoArea>
                {data.status != 2 && 
                    <ButtonItemInfo onPress={handleInfoButton}>
                        <ButtonText>Mais informação</ButtonText>
                    </ButtonItemInfo>
                }
            </InfoArea>
            {data.status != 2 && 
                <ButtonItem onPress={handleRemoveButton}>
                    <Icon name="remove" size={25} color="#FF0000" />
                </ButtonItem>
            }
            
        </Box>
    );
}