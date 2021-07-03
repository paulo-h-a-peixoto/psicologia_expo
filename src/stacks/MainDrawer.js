import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import WallScreen from '../screens/WallScreen';
import DocumentScreen from '../screens/DocumentScreen';
import BilletScreen from '../screens/BilletScreen';
import WarningScreen from '../screens/WarningScreen';
import WarningAddScreen from '../screens/WarningAddScreen';
import ReservationScreen from '../screens/ReservationScreen';
import ReservationAddScreen from '../screens/ReservationAddScreen';
import ReservationMyScreen from '../screens/ReservationMyScreen';
import FoundAndLostScreen from '../screens/FoundAndLostScreen';
import FoundAndLostAddScreen from '../screens/FoundAndLostAddScreen';
import UnitScreen from '../screens/UnitScreen';
import FilaDeEsperaScreen from '../screens/FilaDeEsperaScreen';
import FilaDeEsperaClienteScreen from '../screens/FilaDeEsperaClienteScreen';
import FinanceiroScreen from '../screens/FinanceiroScreen';
import FinanceiroClienteScreen from '../screens/FinanceiroClienteScreen';
import SelectScreen from '../screens/SelectScreen';
import HumorScreen from '../screens/HumorScreen';
import HumorInfoScreen from '../screens/HumorInfoScreen';
import MyHumorScreen from '../screens/MyHumorScreen';
import ListHumorScreen from '../screens/ListHumorScreen';
import ListHumorClienteScreen from '../screens/ListHumorClienteScreen';
import ReservationConfirmScreen from '../screens/ReservationConfirmScreen';
import ReservationSuccessScreen from '../screens/ReservationSuccessScreen';
import ReservationInfoScreen from '../screens/ReservationInfoScreen';
import ReservationSelectScreen from '../screens/ReservationSelectScreen';

import DrawerCustom from '../components/DrawerCustom';

const Drawer = createDrawerNavigator();

export default () => {
    return (
        <Drawer.Navigator
            drawerContent={(props)=><DrawerCustom {...props} />}
            screenOptions={{
                headerShown: true,
                headerTitle: '',
                headerStyle: {
                    backgroundColor: '#fff',
                    shadowOpacity: 0,
                    elevation: 0
                }
            }}
        >
            {/* <Drawer.Screen
                name="WallScreen"
                component={WallScreen}
            />
            <Drawer.Screen
                name="DocumentScreen"
                component={DocumentScreen}
            />
            <Drawer.Screen
                name="BilletScreen"
                component={BilletScreen}
            />
            <Drawer.Screen
                name="WarningScreen"
                component={WarningScreen}
            />
            */}
            <Drawer.Screen
                name="SelectScreen"
                component={SelectScreen}
            />
            
            <Drawer.Screen
                name="HumorScreen"
                component={HumorScreen}
            />

            <Drawer.Screen
                name="ListHumorClienteScreen"
                component={ListHumorClienteScreen}
            />
            <Drawer.Screen
                name="ListHumorScreen"
                component={ListHumorScreen}
            />
            <Drawer.Screen
                name="MyHumorScreen"
                component={MyHumorScreen}
            />
            <Drawer.Screen
                name="HumorInfoScreen"
                component={HumorInfoScreen}
            />
            <Drawer.Screen
                name="ReservationScreen"
                component={ReservationScreen}
            />
            <Drawer.Screen
                name="ReservationInfoScreen"
                component={ReservationInfoScreen}
            />
            <Drawer.Screen
                name="ReservationSelectScreen"
                component={ReservationSelectScreen}
            />
            <Drawer.Screen
                name="ReservationAddScreen"
                component={ReservationAddScreen}
            />
            <Drawer.Screen
                name="ReservationConfirmScreen"
                component={ReservationConfirmScreen}
            />
            <Drawer.Screen
                name="ReservationSuccessScreen"
                component={ReservationSuccessScreen}
            />
            <Drawer.Screen
                name="ReservationMyScreen"
                component={ReservationMyScreen}
            />
            <Drawer.Screen
                name="FoundAndLostScreen"
                component={FoundAndLostScreen}
            />
            <Drawer.Screen
                name="FoundAndLostAddScreen"
                component={FoundAndLostAddScreen}
            />
            <Drawer.Screen
                name="UnitScreen"
                component={UnitScreen}
            />
            <Drawer.Screen
                name="FilaDeEsperaScreen"
                component={FilaDeEsperaScreen}
            />
            <Drawer.Screen
                name="FilaDeEsperaClienteScreen"
                component={FilaDeEsperaClienteScreen}
            />
            <Drawer.Screen
                name="FinanceiroScreen"
                component={FinanceiroScreen}
            />
            <Drawer.Screen
                name="FinanceiroClienteScreen"
                component={FinanceiroClienteScreen}
            />
        </Drawer.Navigator>
    );
}