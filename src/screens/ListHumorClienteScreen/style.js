import styled from 'styled-components/native';

export default {
    Container: styled.SafeAreaView`
        flex: 1;
        background-color: #f0f5fb;
        padding: 0px 20px;
    `,
    LoadingIcon: styled.ActivityIndicator``,

    


    NoListArea: styled.View`
        justify-content: center;
        align-items: center;
        padding: 30px;
    `,
    NoListText: styled.Text`
        font-size: 15px;
        color: #000;
    `,
    List: styled.FlatList`
        flex: 1;
    `,
    AddButton: styled.TouchableOpacity`
        margin-right: 15px;
    `,
    Conjunto: styled.ScrollView`
        margin:5px;
        border-radius: 8px;
        background-color: #fff;
        padding-right:10px;
        padding-left: 10px;
        padding-bottom:20px;
    `,
    Box: styled.View`
        margin: 10px; 0px 20px 0px;
        flex-direction: row;
    `,
    BoxIn: styled.View`
        flex:1;
        flex-direction: row;
        align-items:center;
    `,
    BoxInText: styled.Text`
        margin-left: 6px;
        color: #3795d2;
    `,
    Psc: styled.View`
        flex-direction: row;
        padding: 10px;
        border-bottom-width: 1px;
        border-color: #ccc;

    `,
    PscText: styled.Text`
        margin-left: 12px;
        color: #99a6c8;
        font-size: 15px;
        font-weight: bold;
    `,
    InfoGer: styled.View`
        margin-top: 15px;
        margin-bottom: 25px;
    `,
    InfoGerText: styled.Text`
        margin-left: 10px;
        color: #99a6c8;
        font-weight: bold;
        margin-bottom: 10px;
    `,
    InfoGerInput: styled.TextInput`
        border-width: 2px;
        border-color: #3795d2;
        border-radius: 5px;
        width: 100%;
        padding: 15px;
        color: #000;
        
    `,
    Button: styled.TouchableOpacity`
        
    `,
    Sessoes: styled.View`
        margin-top: 10px;
        
    `,
    SessoesTitle: styled.Text`
        color: #99a6c8;
        font-weight: bold;
        margin-bottom: 10px;
    `,
    SessoesCampos: styled.View`
        flex-direction: row;
    `,
    SessoesBox: styled.View`
        border-width:1px;
        border-color: #99a6c8;
        margin-right: 15px;
        border-radius: 5px;
    `,
    SessoesValores: styled.TextInput`
        font-size: 15px;
    `,
    
    Picker: styled.Picker`
        margin-left:30px;
        width: 280px;
        border-width: 2px;
        border-color: #ccc;
    `,
    NascimentoBox: styled.View`
        margin-top: 5px;
        margin-bottom: 5px;
    `,
    NascimentoBoxTitle: styled.Text`
        color: #99a6c8;
        font-weight: bold;
    `,

};