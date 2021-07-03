import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import DatePicker from 'react-native-datepicker'
import { CheckBox, Button, Overlay } from 'react-native-elements';
import { TextInputMask } from 'react-native-masked-text';
import C from './style';

import { useStateValue } from '../../contexts/StateContext';
import api from '../../services/api';
import { useSafeArea } from 'react-native-safe-area-context';
import { Alert } from 'react-native';

export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const [terapeutizando, setTerapeutizando] = useState(false);
    const [gestor, setGestor] = useState(false);
    const [psicologo, setPsicologo] = useState(false);
    const [meuPsicologo, setMeuPsicologo] = useState(0);
    const [crp, setCrp] = useState('');

    const [temPsicologo, setTemPsicologo] = useState(false);

    const [photo, setPhoto] = useState({});

    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [nascimento, setNascimento] = useState('');
    const [cep, setCep] = useState('');
    const [endereco, setEndereco] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const [minhaAbordagem, setMinhaAbordagem] = useState('');

    const [list, setList] = useState([]);

    const [visible, setVisible] = useState(false);

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    

    const abordagem = [
        {id: 1, 'nome': 'TCC'},
        {id: 2, 'nome': 'Comportamental'}
    ]

    useEffect(()=>{
        navigation.setOptions({
            headerTitle: 'Fazer cadastro'
        });
        getAllPsicologos();
    }, []);

    useEffect(()=>{
        if(!temPsicologo){
            setMeuPsicologo(0);
        }
    }, [temPsicologo]);

    useEffect(()=>{
        setTemPsicologo();
    }, [gestor, psicologo]);

    const handleAddPhoto = async () => {
        let permission = await ImagePicker.requestCameraPermissionsAsync();
        if(permission.granted === false){
            toggleOverlay();
            return;
        }
        let picker = await ImagePicker.launchCameraAsync();
        if(picker.cancelled === true){
            toggleOverlay();
            return;
        }
        setPhoto(picker);
        toggleOverlay();


       
    }

    const handleSelectPhoto = async () => {
        let permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if(permission.granted === false){
            toggleOverlay();
            return;
        }
        let picker = await ImagePicker.launchImageLibraryAsync();
        if(picker.cancelled === true){
            toggleOverlay();
            return;

        }
        setPhoto(picker);
        toggleOverlay();


        
    }

        

        const getAllPsicologos = async () => {
            setList([]);
            const result = await api.getPsicologos();
            if(result.error === '') {
                setList(result.list);
            } else {
                alert(result.error);
            }
        }
   

    const selectTipoUsuario = (item) => {
        if(item == '1'){
            setTerapeutizando(true);
            setGestor(false);
            setPsicologo(false);
        }else if(item == '2'){
            setTerapeutizando(false);
            setGestor(true);
            setPsicologo(false);
        }else{
            setTerapeutizando(false);
            setGestor(false);
            setPsicologo(true);
        }
    }

    const handleRegisterButton = async () => {
        if(!terapeutizando && !gestor && !psicologo){
            Alert.alert('Atenção!', 'É necessário selecionar ou Terapeutizando ou Psicólogo', [
                {text: 'Fechar'}
            ]);
            return false;
        }
        if(!name || !email || !cpf || !password || !passwordConfirm || !telefone || !cep || !endereco) {
            Alert.alert('Atenção!', 'Preencha todos os campos', [
                {text: 'Fechar'}
            ]);
            return false;
        }
        if(temPsicologo && meuPsicologo == '0'){
            Alert.alert('Atenção!', 'O campo ( já tem um Psicólogo? ) foi marcado, agora é necessário selecionar um psicólogo!', [
                {text: 'Fechar'}
            ]);
            return false;
        }

        if(psicologo && !crp || psicologo && !minhaAbordagem){
            Alert.alert('Atenção!', 'Preencha todos os campos', [
                {text: 'Fechar'}
            ]);
            return false;
        }
        
        var meuPerfil = '';
        if(terapeutizando){
            meuPerfil = '1';
        }else if(gestor){
            meuPerfil = '2';
        }else{
            meuPerfil = '3';
        }
        
        let result = await api.register2(name, email, cpf, password, passwordConfirm, telefone, cep, endereco, meuPerfil, crp, photo, meuPsicologo, minhaAbordagem, nascimento);
        if(result.error === '') {
            
            dispatch({type: 'setToken', payload: {token: result.token}});
            dispatch({type: 'setUser', payload: {user: result.user}});
            navigation.reset({
                index: 1,
                routes:[{name: 'MainDrawer'}]
            });
        } else {
            Alert.alert('Atenção!', `${result.error}`, [
                {text: 'Fechar'}
            ]);
        }
        
    }

    return (
        <C.Container>
            <Overlay 
                isVisible={visible} 
                onBackdropPress={toggleOverlay} 
                overlayStyle={{width:300}}
            >
                <>
                <C.ButtonArea onPress={handleAddPhoto}>
                    <C.BotaoCameraText>Usar a camera</C.BotaoCameraText>
                </C.ButtonArea>
                <C.ButtonArea onPress={handleSelectPhoto}>
                    <C.BotaoCameraText>Usar a galeria</C.BotaoCameraText>
                </C.ButtonArea>
                </>
            </Overlay>
            <C.PhotoArea>
                {!photo.uri &&
                    <C.ButtonAreaFoto onPress={toggleOverlay}>
                        <C.ButtonTextFoto>Tirar uma foto</C.ButtonTextFoto>
                    </C.ButtonAreaFoto>
                }
                {photo.uri &&
                    <>
                        <C.ButtonAreaFotoImage onPress={toggleOverlay}>
                        <C.PhotoItem source={{uri: photo.uri}} resizeMode="cover" />
                        </C.ButtonAreaFotoImage>
                        <C.ButtonTextFoto style={{color: '#3795d2'}}>Aperte na imagem para tirar outra foto</C.ButtonTextFoto>
                    </>
                }
            </C.PhotoArea>
            <C.CheckBoxArea>
                <CheckBox
                title='Terapeutizando'
                checked={terapeutizando}
                onPress={()=>selectTipoUsuario('1')}
                containerStyle={{borderWidth: 0, width: 150}}
                />
                {/* <CheckBox
                title='Gestor'
                checked={gestor}
                onPress={()=>selectTipoUsuario('2')}
                containerStyle={{ borderWidth: 0, width: 90}}
                /> */}

                <CheckBox
                title='Psicólogo'
                checked={psicologo}
                onPress={()=>selectTipoUsuario('3')}
                containerStyle={{borderWidth: 0, width: 118}}
                />
            </C.CheckBoxArea>
            <C.Field
                placeholder="Digite seu Nome Completo"
                placeholderTextColor="black"
                value={name}
                onChangeText={t=>setName(t)}
            />
            <C.Field
                placeholder="Digite seu CPF"
                placeholderTextColor="black"
                keyboardType="numeric"
                value={cpf}
                onChangeText={t=>setCpf(t)}
            />
            <C.Field
                placeholder="Digite seu E-mail"
                placeholderTextColor="black"
                value={email}
                onChangeText={t=>setEmail(t)}
            />
            <C.Field
                placeholder="Telefone"
                placeholderTextColor="black"
                value={telefone}
                onChangeText={t=>setTelefone(t)}
            />
            <C.Field
                placeholder="CEP"
                placeholderTextColor="black"
                value={cep}
                onChangeText={t=>setCep(t)}
            />
            <C.Field
                placeholder="Endereço"
                placeholderTextColor="black"
                value={endereco}
                onChangeText={t=>setEndereco(t)}
            />
            {psicologo && 
               <C.Field
               placeholder="CRP"
               placeholderTextColor="black"
               value={crp}
               onChangeText={t=>setCrp(t)}
           /> 
            }

            {psicologo && 
                <C.Picker 
                onValueChange={(itemValue, itemIndex) => setMinhaAbordagem(itemValue)}
                >
                    <C.Picker.Item label="Selecione uma Abordagem" value="Selecione uma Abordagem" />
                
                    {abordagem.map((item, index) => (  
                        <C.Picker.Item key={index} label={item.nome} value={item.id} />
                    ))}  
                
                    
                    
                </C.Picker>
            }
            
               
                
                            
            <C.FieldCampo>
            <TextInputMask
                            type={'datetime'}
                            options={{
                              format: 'DD/MM/YYYY'
                            }}
                            color='#000'
                            placeholder='Nascimento'
                            placeholderTextColor="black"

                            value={nascimento}
                            onChangeText={(t)=>setNascimento(t)}
                            />
            </C.FieldCampo>
            <C.Field
                placeholder="Digite sua Senha"
                secureTextEntry={true}
                placeholderTextColor="black"
                value={password}
                onChangeText={t=>setPassword(t)}
            />
            <C.Field
                placeholder="Digite sua Senha novamente"
                secureTextEntry={true}
                placeholderTextColor="black"
                value={passwordConfirm}
                onChangeText={t=>setPasswordConfirm(t)}
            />

            {terapeutizando && list.length > 0 &&
                <CheckBox
                    title='Já tem um Psicólogo?'
                    checked={temPsicologo}
                    onPress={()=>setTemPsicologo(!temPsicologo)}
                    containerStyle={{backgroundColor: 'transparent', borderWidth: 0, width: 220}}
                />
            }
            
           
            {temPsicologo && 
                <C.Picker 
                onValueChange={(itemValue, itemIndex) => setMeuPsicologo(itemValue)}
                >
                    <C.Picker.Item label="Selecione um Psicólogo" value="0" />
                
                    {list.map((item, index) => (  
                        <C.Picker.Item key={index} label={item.nome} value={item.id} />
                    ))}  
                
                    
                    
                </C.Picker>
            }
            

            <C.ButtonArea style={{marginBottom: 50}} onPress={handleRegisterButton}>
                <C.ButtonText>CADASTRAR-SE</C.ButtonText>
            </C.ButtonArea>
        </C.Container>
    );
}