import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import C from './style';

import { View } from 'react-native';


import { useStateValue } from '../../contexts/StateContext';
import api from '../../services/api';

import FinanceiroItem from '../../components/FinanceiroItem';


export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);

    useEffect(()=>{
        navigation.setOptions({
            headerTitle: 'Financeiro',
            
        });
        getClientes();
    }, []);

    const getClientes = async () => {
        setLoading(true);
        const result = await api.getClientesFinanceiro();
        setLoading(false);
        if(result.error === '') {
            setList(result.list);
        } else {
            alert(result.error);
        }
    }

    const handleClienteButton = () => {
        navigation.navigate('FinanceiroClienteScreen');
    }


    return (
        <C.Container>
           <C.Header>
             
               {/* <C.InputView>
                    <C.BuscaInput 
                        placeholder="Busca"
                        
                    />
                    <Icon
                            name='search'
                            size={20}
                            color='#3795d2'
                        /> 
               </C.InputView> */}
               
               
           </C.Header>
           
           <C.List
                data={list}
                onRefresh={getClientes}
                refreshing={loading}
                renderItem={({item})=><FinanceiroItem data={item} />}
                keyExtractor={(item)=>item.id.toString()}
                />
        </C.Container>
    );
}