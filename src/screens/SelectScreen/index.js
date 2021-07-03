import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import C from './style';

import { useStateValue } from '../../contexts/StateContext';
import api from '../../services/api';

export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    useEffect(()=>{
        if(context.user.user.tipoUsuario == 1){
            navigation.navigate('HumorScreen');
        }else if(context.user.user.tipoUsuario == 2) {
            navigation.navigate('FinanceiroScreen');
        }else{
            navigation.navigate('FilaDeEsperaScreen');

        }

    }, []);

    return (
        <C.Container>
            <C.LoadingIcon color="#3795d2" size="large" />
        </C.Container>
    );
}