import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { useNavigation } from '@react-navigation/native';

import api from '../services/api';


const Box = styled.View`
    background-color: #FFF;
    border-width: 2px;
    border-color: #E8E9ED;
    border-radius: 20px;
    padding: 15px;
    margin-bottom: 10px;
`;

const HeaderArea = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
`;
const InfoArea = styled.View`
    margin-left: 15px;
    flex: 1;
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

const CoverImage = styled.Image`
    background-color: #fff;
    height: 50px;
    width: 50px;
    border-radius: 15px;
`;

export default ({data}) => {
    const navigation = useNavigation();

    const [likeCount, setLikeCount] = useState(data.likes);
    const [liked, setLiked] = useState(data.liked);

    const [list, setList] = useState([]);

    useEffect(()=>{
        getInfoGeral();
    },[]);

    const getInfoGeral = async () => {

        const result = await api.getInfoGeral(data.id);
        if(result.error === '') {
            setList(result.list);
        } else {
            alert(result.error);
        }
        
    }

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
    const handleClienteButton = () => {
        navigation.navigate('FinanceiroClienteScreen', {data});
    }

    return (
        <Box>
            <HeaderArea onPress={handleClienteButton}>
                <CoverImage source={{uri: data.image}} resizeMode="cover" />
                <InfoArea>

                    <Title>{data.nome}</Title>
                    <Date>{data.nascimento}</Date>
                </InfoArea>
            </HeaderArea>
            
           
        </Box>
    );
}