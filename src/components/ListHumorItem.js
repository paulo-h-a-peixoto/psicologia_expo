import React, { useState } from 'react';
import { Modal } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ListItem, Avatar } from 'react-native-elements'
import ThemedAvatar from 'react-native-elements/dist/avatar/Avatar';
import { useNavigation } from '@react-navigation/native';

const Box = styled.View`
    background-color: #FFF;
    border-width: 2px;
    border-color: #E8E9ED;
    border-radius: 15px;
    padding: 15px;
    margin-bottom: 10px;
`;
const Date = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: #9C9DB9;
    margin-bottom: 10px;
`;
const Title = styled.Text`
    font-size: 15px;
    color: #000;
`;
const StatusArea = styled.View`
    flex-direction: row;
    align-items: center;
    margin: 10px 0;
`;
const StatusText = styled.Text`
    font-size: 14px;
    color: #9C9DB9;
    margin-left: 10px;
`;

const PhotosArea = styled.View`
    flex-direction: row;
`;
const PhotoItem = styled.TouchableOpacity`
    margin-right: 10px;
`;
const PhotoImage = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 10px;
`;

const ModalArea = styled.View`
    flex: 1;
    background-color: #000;
`;
const ModalImage = styled.Image`
    flex: 1;
`;
const ModalCloseButton = styled.TouchableOpacity`
    width: 30px;
    height: 30px;
    position: absolute;
    top: 15px;
    right: 10px;
`;

export default ({data}) => {
    const navigation = useNavigation();
    const [showModal, setShowModal] = useState(false);
    const [modalImage, setModalImage] = useState('');
    const openModal = (img) => {
        setModalImage(img);
        setShowModal(true);
    }

    const handleClienteButton = () => {
        navigation.navigate('ListHumorClienteScreen', {data});
    }

    return (
        <ListItem bottomDivider onPress={handleClienteButton}>
        <Avatar source={{uri: data.image}} />
        <ListItem.Content>
          <ListItem.Title>{data.nome}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    );
}