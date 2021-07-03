import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

import { useStateValue } from '../contexts/StateContext';
import api from '../services/api';

const DrawerArea = styled.View`
    flex: 1;
    background-color: #FFF;
`;
const DrawerLogoArea = styled.View`
    flex-direction:row;
    padding: 10px 20px;
    margin-top:30px;
    justify-content:flex-start;
    align-items: center;

    border-bottom-width: 1px;
    border-bottom-color: #EEE;
`;
const DrawerLogo = styled.Image`
    width: 40px;
    height: 40px;
`;
const DrawerScroller = styled.ScrollView`
    flex: 1;
    margin: 20px 0;
`;
const ChangeUnitArea = styled.View`
    margin: 10px;
`;
const ChangeUnitButton = styled.TouchableOpacity`
    background-color: #3795d2;
    padding: 12px;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
`;
const ChangeUnitButtonText = styled.Text`
    color: #FFF;
    font-size: 15px;
    font-weight: bold;
`;
const FooterArea = styled.View`
    padding: 20px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;
const FooterInfo = styled.View``;
const FooterProfile = styled.Text`
    font-size: 15px;
    color: #000;
`;
const FooterUnitText = styled.Text`
    font-size: 15px;
    color: #666E78;
`;
const FooterUnitButton = styled.TouchableOpacity``;

const MenuButton = styled.TouchableOpacity`
    flex-direction: row;
    margin-bottom: 5px;
    border-radius: 5px;
    align-items: center;
`;
const MenuSquare = styled.View`
    width: 5px;
    height: 35px;
    margin-right: 20px;
    background-color: ${props=>props.active ? '#3795d2' : 'transparent'};
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
`;
const MenuButtonText = styled.Text`
    font-size: 15px;
    margin-left: 10px;
    color: ${props=>props.active ? '#3795d2' : '#666E78'};
`;

export default (props) => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    // STATE ATIVO: props.state.index
    // props.state.routes[props.state.index].name


    const menus = [
        // {title: 'Mural de Avisos', icon: 'inbox', screen: 'WallScreen'},
        //{title: 'Documentos', icon: 'file-text', screen: 'DocumentScreen'},
        {title: 'Agendamentos', icon: 'calendar', screen: 'ReservationScreen'},
        {title: 'Humor', icon: 'user', screen: 'MyHumorScreen'},
        //{title: 'Livro de Ocorrências', icon: 'bug', screen: 'WarningScreen'},
        //{title: 'Achados e Perdidos', icon: 'search', screen: 'FoundAndLostScreen'},
        // {title: 'Boletos', icon: 'wpforms', screen: 'BilletScreen'},
        // {title: 'Perfil', icon: 'user', screen: 'ProfileScreen'}
    ];

    const gestor = [
        {title: 'Financeiro', icon: 'user', screen: 'FinanceiroScreen'},
        {title: 'Terapeutizando Humor', icon: 'user', screen: 'ListHumorScreen'}
    ];

    const psicologo = [
        // {title: 'Mural de Avisos', icon: 'inbox', screen: 'WallScreen'},
        // {title: 'Documentos', icon: 'file-text', screen: 'DocumentScreen'},
        {title: 'Fila de espera', icon: 'user', screen: 'FilaDeEsperaScreen'},
        {title: 'Terapeutizando Humor', icon: 'user', screen: 'ListHumorScreen'}
        // {title: 'Livro de Ocorrências', icon: 'bug', screen: 'WarningScreen'},
        // {title: 'Achados e Perdidos', icon: 'search', screen: 'FoundAndLostScreen'},
        // {title: 'Boletos', icon: 'wpforms', screen: 'BilletScreen'},
        // {title: 'Perfil', icon: 'user', screen: 'ProfileScreen'}
    ];
    



    const handleChangeUnit = async () => {
        await AsyncStorage.removeItem('property');
        navigation.reset({
            index: 1,
            routes:[{name: 'ChoosePropertyScreen'}]
        });
    }

    const handleLogoutButton = async () => {
        await api.logout();
        navigation.reset({
            index: 1,
            routes:[{name: 'LoginScreen'}]
        });
    }

    

    return (
        <DrawerArea>
            <DrawerLogoArea>
                <DrawerLogo source={require('../assets/iconeclinica.png')} resizeMode="contain" />
                
                <FooterProfile>Olá {context.user.user.nome}</FooterProfile>
            </DrawerLogoArea>
            <DrawerScroller>
                {context.user.user.tipoUsuario == 1 && 
                    <>
                        <MenuButton style={{backgroundColor: '#3795d26b', marginBottom: 15, marginTop:15}}>
                            <MenuSquare style={{backgroundColor:'#3795d2', marginRight:20, width:5}}></MenuSquare>
                            {/* <Icon
                                name={item.icon}
                                size={20}
                                color={props.state.routes[props.state.index].name === item.screen ? '#3795d2' : '#666E78'}
                            /> */}
                            <MenuButtonText
                                style={{color:'#fff', fontWeight:'bold'}}
                            >Terapeutizando</MenuButtonText>
                        </MenuButton>
                        {menus.map((item, index)=>(
                            <MenuButton key={index} onPress={()=>navigation.reset({routes:[{name: item.screen}]})}>
                                <MenuSquare
                                    active={props.state.routes[props.state.index].name === item.screen}
                                ></MenuSquare>
                                <Icon
                                    name={item.icon}
                                    size={20}
                                    color={props.state.routes[props.state.index].name === item.screen ? '#3795d2' : '#666E78'}
                                />
                                <MenuButtonText
                                    active={props.state.routes[props.state.index].name === item.screen}
                                >{item.title}</MenuButtonText>
                            </MenuButton>
                        ))}
                    </>
                }
                {context.user.user.tipoUsuario == 2 && 
                   <>
                  {gestor.length > 0 && 
                 
                    <MenuButton style={{backgroundColor: '#3795d26b', marginBottom: 15}}>
                        <MenuSquare style={{backgroundColor:'#3795d2', marginRight:20, width:5}}></MenuSquare>
                        {/* <Icon
                            name={item.icon}
                            size={20}
                            color={props.state.routes[props.state.index].name === item.screen ? '#3795d2' : '#666E78'}
                        /> */}
                      
                        <MenuButtonText
                            style={{color:'#fff', fontWeight:'bold'}}
                        >Gestor</MenuButtonText>
                      
                    </MenuButton>
                    }
                        
                        {gestor.map((item, index)=>(
                        <MenuButton key={index} onPress={()=>navigation.reset({routes:[{name: item.screen}]})}>
                            <MenuSquare
                                active={props.state.routes[props.state.index].name === item.screen}
                            ></MenuSquare>
                            <Icon
                                name={item.icon}
                                size={20}
                                color={props.state.routes[props.state.index].name === item.screen ? '#3795d2' : '#666E78'}
                            />
                            <MenuButtonText
                                active={props.state.routes[props.state.index].name === item.screen}
                            >{item.title}</MenuButtonText>
                        </MenuButton>
                        ))}
                    </>
                }
                 {context.user.user.tipoUsuario == 3 && 
                     <>
                        <MenuButton style={{backgroundColor: '#3795d26b', marginBottom: 15}}>
                            <MenuSquare style={{backgroundColor:'#3795d2', marginRight:20, width:5}}></MenuSquare>
                            {/* <Icon
                                name={item.icon}
                                size={20}
                                color={props.state.routes[props.state.index].name === item.screen ? '#3795d2' : '#666E78'}
                            /> */}
                            <MenuButtonText
                                style={{color:'#fff', fontWeight:'bold'}}
                            >Psicólogo</MenuButtonText>
                        </MenuButton>
                        {psicologo.map((item, index)=>(
                        <MenuButton key={index} onPress={()=>navigation.reset({routes:[{name: item.screen}]})}>
                            
                            <MenuSquare
                                active={props.state.routes[props.state.index].name === item.screen}
                            ></MenuSquare>
                            <Icon
                                name={item.icon}
                                size={20}
                                color={props.state.routes[props.state.index].name === item.screen ? '#3795d2' : '#666E78'}
                            />
                            <MenuButtonText
                                active={props.state.routes[props.state.index].name === item.screen}
                            >{item.title}</MenuButtonText>
                        </MenuButton>
                        ))}
                </>
                }
                {/* <MenuButton onPress={handleLogoutButton}>
                    <MenuSquare></MenuSquare>
                    <Icon name="toggle-left" size={20} color={'#3795d2'} />
                    <MenuButtonText>Sair</MenuButtonText>
                </MenuButton> */}
            </DrawerScroller>
            <ChangeUnitArea>
                <ChangeUnitButton onPress={handleLogoutButton}>
                    <ChangeUnitButtonText>Sair</ChangeUnitButtonText>
                </ChangeUnitButton>
            </ChangeUnitArea>
            <FooterArea>
                <FooterInfo>
                    {context.user.user.tipoUsuario == 1 && <FooterUnitText>Perfil: Terapeutizando</FooterUnitText> }
                    {context.user.user.tipoUsuario == 2 && <FooterUnitText>Perfil: Gestor</FooterUnitText> }
                    {context.user.user.tipoUsuario == 3 && <FooterUnitText>Perfil: Psicólogo</FooterUnitText> }
                    
                </FooterInfo>
                <FooterUnitButton onPress={()=>navigation.navigate('UnitScreen')}>
                    <Icon name="gear" size={24} color="#3795d2" />
                </FooterUnitButton>
            </FooterArea>
        </DrawerArea>
    );
}