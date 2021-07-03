import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import C from './style';
import { useStateValue } from '../../contexts/StateContext';
import { CheckBox, Button, Overlay } from 'react-native-elements';
import { TextInputMask } from 'react-native-masked-text';
import {Text} from 'react-native';
import api from '../../services/api';

import UnitPeopleSection from '../../components/UnitPeopleSection';
import UnitVehicleSection from '../../components/UnitVehicleSection';
import UnitPetSection from '../../components/UnitPetSection';

import UnitModalAddPerson from '../../components/UnitModalAddPerson';
import UnitModalAddVehicle from '../../components/UnitModalAddVehicle';
import UnitModalAddPet from '../../components/UnitModalAddPet';

export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const [loading, setLoading] = useState(false);
    const [peopleList, setPeopleList] = useState([]);
    const [vehicleList, setVehicleList] = useState([]);
    const [petList, setPetList] = useState([]);

    const [dias, setDias] = useState('');

    const [domingo, setDomingo] = useState(false);
    const [segunda, setSegunda] = useState(false);
    const [terca, setTerca] = useState(false);
    const [quarta, setQuarta] = useState(false);
    const [quinta, setQuinta] = useState(false);
    const [sexta, setSexta] = useState(false);
    const [sabado, setSabado] = useState(false);
    const [dtInicio, setDtInicio] = useState('');
    const [dtFinal, setDtFinal] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');

    useEffect(()=>{
        navigation.setOptions({
            headerTitle: `Dados do ${context.user.user.nome}`
        });
        getUnitInfo();
    }, []);

    const getUnitInfo = async () => {
        // setLoading(true);
        // const result = await api.getUnitInfo();
        // setLoading(false);
        // if(result.error === '') {
        //     setPeopleList(result.peoples);
        //     setVehicleList(result.vehicles);
        //     setPetList(result.pets);
        // } else {
        //     alert(result.error);
        // }
    }

    const handleAdd = (type) => {
        setModalType(type);
        setShowModal(true);
    }

    const handleSaveButton = () => {

    }

    return (
        <C.Container>
            <C.Scroller>
                {loading &&
                    <C.LoadingIcon color="#8B63E7" size="large" />
                }

            <CheckBox
                title='Domingo'
                checked={domingo}
                onPress={()=>setDomingo(!domingo)}
                containerStyle={{borderWidth: 0, width: 250}}
                />
            <CheckBox
            title='Segunda-Feira'
            checked={segunda}
            onPress={()=>setSegunda(!segunda)}
            containerStyle={{borderWidth: 0, width: 250}}
            />
            <CheckBox
            title='Terça-Feira'
            checked={terca}
            onPress={()=>setTerca(!terca)}
            containerStyle={{borderWidth: 0, width: 250}}
            />
            <CheckBox
            title='Quarta-Feira'
            checked={quarta}
            onPress={()=>setQuarta(!quarta)}
            containerStyle={{borderWidth: 0, width: 250}}
            />
            <CheckBox
            title='Quinta-Feira'
            checked={quinta}
            onPress={()=>setQuinta(!quinta)}
            containerStyle={{borderWidth: 0, width: 250}}
            />
            <CheckBox
            title='Sexta-Feira'
            checked={sexta}
            onPress={()=>setSexta(!sexta)}
            containerStyle={{borderWidth: 0, width: 250}}
            />
            <CheckBox
            title='Sabado'
            checked={sabado}
            onPress={()=>setSabado(!sabado)}
            containerStyle={{borderWidth: 0, width: 250}}
            />
                <Text style={{marginTop:10}}>Digite o horário que inicia os atendimentos</Text>

            <C.FieldCampo>
            <TextInputMask
            type={'datetime'}
            options={{
                format: 'HH:mm'
            }}
            color='#000'
            placeholder='Exemplo 08:00'
            placeholderTextColor="black"
            value={dtInicio}
            onChangeText={(t)=>setDtInicio(t)}
            />
            </C.FieldCampo>
            <Text style={{marginTop:10}}>Digite o horário que acaba os atendimentos</Text>

            <C.FieldCampo>
            <TextInputMask
            type={'datetime'}
            options={{
                format: 'HH:mm'
            }}
            color='#000'
            placeholder='Exemplo 18:00'
            placeholderTextColor="black"
            value={dtFinal}
            onChangeText={(t)=>setDtFinal(t)}
            />
            </C.FieldCampo>
            
            <C.ButtonArea style={{marginBottom: 50}} onPress={handleSaveButton}>
                <C.ButtonText>Salvar</C.ButtonText>
            </C.ButtonArea>
            </C.Scroller>
        </C.Container>
    );
}