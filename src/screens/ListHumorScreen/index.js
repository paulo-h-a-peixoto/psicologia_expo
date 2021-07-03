import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import C from './style';

import { useStateValue } from '../../contexts/StateContext';
import api from '../../services/api';

import ListHumorItem from '../../components/ListHumorItem';

export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);

    useEffect(()=>{
        navigation.setOptions({
            headerTitle: 'Terapeutizando',
           
        });
        getClientes();
    }, []);

    const getClientes = async () => {
        setList([]);
        setLoading(true);
        const result = await api.getClientesHumor();
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
                    <C.NoListText>Não há Terapeutizando cadastrado.</C.NoListText>
                </C.NoListArea>
            }
            <C.List
                data={list}
                onRefresh={getClientes}
                refreshing={loading}
                renderItem={({item})=><ListHumorItem data={item} />}
                keyExtractor={(item)=>item.id.toString()}
            />
        </C.Container>
    );
}