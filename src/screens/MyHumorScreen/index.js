import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import C from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useStateValue } from '../../contexts/StateContext';
import api from '../../services/api';

import MyHumorItem from '../../components/MyHumorItem';

export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);

    useEffect(()=>{
        navigation.setOptions({
            headerTitle: 'Humor',
            headerRight: () => (
                <C.AddButton onPress={()=>navigation.navigate('HumorScreen')}>
                    <Icon name="plus" size={24} color="#000" />
                </C.AddButton>
            )
        });
        getList();
    }, []);

    useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', () => {
            getList();
        });
        return unsubscribe;
    }, [navigation]);

    const getList = async () => {
        setList([]);
        setLoading(true);
        const result = await api.getMyHumor();
        setLoading(false);
        if(result.error === '') {
            setList(result.list);
        } else {
            alert(result.error);
        }
    }

    return (
        <C.Container>
            {!loading && list.length === 0 &&
                <C.NoListArea>
                    <C.NoListText>Não há Humor cadastrado.</C.NoListText>
                </C.NoListArea>
            }
            <C.List
                data={list}
                onRefresh={getList}
                refreshing={loading}
                renderItem={({item})=><MyHumorItem data={item} refreshFunction={getList} />}
                keyExtractor={(item)=>item.id.toString()}
            />
        </C.Container>
    );
}