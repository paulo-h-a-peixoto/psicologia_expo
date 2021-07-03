import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import C from './style';

import { useStateValue } from '../../contexts/StateContext';
import api from '../../services/api';

import MyReservationItem from '../../components/MyReservationItem';

export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const [loading, setLoading] = useState(true);
    const [listOrig, setListOrig] = useState([]);
    const [list, setList] = useState([]);
    const [pagamentoSelect, setPagamentoSelect] = useState('');
    const [showSelected, setShowSelected] = useState('0');
    const [selecionado, setSelecionado] = useState(false);

    useEffect(()=>{
        navigation.setOptions({
            headerTitle: 'Meus Agendamentos'
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
        
        const result = await api.getMyReservations();
        setLoading(false);
        if(result.error === '') {
            setListOrig(result.list);
            setList(result.list);
        } else {
            alert(result.error);
        }
    }

    const selectedPagamento = (item) => {
        setSelecionado(true);
        let novoList = [];
        
        let itensSelect = [
            'Selecione o tipo de registro',
            'Todos os registros',
            'Gerando Boleto',
            'Aguardando Pagamento',
            'Pagamento Realizado',
            'Consultas Pendentes',
            'Consultas Realizadas',
            'Consultas Não comparecidas'
        ];
        if(item == '1'){
            setList(listOrig);
        }else if(item == '2'){
            for(let i = 0; i < listOrig.length; i++){
                
                if(listOrig[i]['status'] == '0'){
                    novoList.push(listOrig[i]);
                }
            }
            setList(novoList);
        }else if(item == '3'){
            for(let i = 0; i < listOrig.length; i++){
                
                if(listOrig[i]['status'] == '1'){
                    novoList.push(listOrig[i]);
                }
            }
            setList(novoList);
        }else if(item == '4'){
            for(let i = 0; i < listOrig.length; i++){
                
                if(listOrig[i]['status'] == '2'){
                    novoList.push(listOrig[i]);
                }
            }
            setList(novoList);
        }else if(item == '5'){
            for(let i = 0; i < listOrig.length; i++){
                
                if(listOrig[i]['status'] == '2' && listOrig[i]['sessao'] == '0'){
                    novoList.push(listOrig[i]);
                }
            }
            setList(novoList);
        }else if(item == '6'){
            for(let i = 0; i < listOrig.length; i++){
                
                if(listOrig[i]['status'] == '2' && listOrig[i]['sessao'] == '3'){
                    novoList.push(listOrig[i]);
                }
            }
            setList(novoList);
        }else if(item == '7'){
            for(let i = 0; i < listOrig.length; i++){
                
                if(listOrig[i]['status'] == '2' && listOrig[i]['sessao'] == '4'){
                    novoList.push(listOrig[i]);
                }
            }
            setList(novoList);
        }
        setPagamentoSelect(item);
        setShowSelected(item);
    }


    return (
        <C.Container>
            
            <C.Painel>
                <C.Itens>
                    <C.Picker 
                    onValueChange={(itemValue, itemIndex) => selectedPagamento(itemValue)}
                    selectedValue={pagamentoSelect}
                    >
                        <C.Picker.Item label="Selecione o tipo de registro" value="0" />
                        <C.Picker.Item label="Todos os registros" value="1" />
                        <C.Picker.Item label="Gerando Boleto" value='2' />
                        <C.Picker.Item label="Aguardando Pagamento" value='3' />
                        <C.Picker.Item label="Pagamento Realizado" value='4' />
                        <C.Picker.Item label="Consultas Pendentes" value='5' />
                        <C.Picker.Item label="Consultas Realizadas" value='6' />
                        <C.Picker.Item label="Consultas Não comparecidas" value='7' />
                    
                    
                        
                        
                    </C.Picker>
                </C.Itens>
            </C.Painel>
            {!loading && list.length === 0 &&
                <C.NoListArea>
                    <C.NoListText>Não há agendamento.</C.NoListText>
                </C.NoListArea>
            }
            {selecionado && 
            <>
            <C.List
                data={list}
                onRefresh={getList}
                refreshing={loading}
                renderItem={({item})=><MyReservationItem data={item} refreshFunction={getList} showSelected={showSelected} />}
                keyExtractor={(item)=>item.id.toString()}
            />
            </>
            }
        </C.Container>
    );
}