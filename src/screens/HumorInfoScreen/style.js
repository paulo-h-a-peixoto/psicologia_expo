import styled from 'styled-components/native';

export default {
    Container: styled.SafeAreaView`
        flex: 1;
        padding: 20px;
        
    `,
    Header: styled.View`
        flex-direction: row;
        padding-left:15px;
        width:100%;
    `,
    Conteudo: styled.View`
    width: 100%;

    justify-content:center;
    align-items: center;
    `,
    Title: styled.Text`
        font-weight:bold;
        margin-bottom: 20px;
        font-size: 22px;
    `,
    CampoData: styled.View`
        width:100%;
        flex-direction: row;
        justify-content:space-evenly; 
    `,
    Humor: styled.View`
        margin-top:100px;
        flex-direction: row;
        justify-content:space-evenly; 
    `,
    HumorBotao: styled.TouchableOpacity``,
    Data: styled.TouchableOpacity`
    flex-direction: row;
    `,
    DataText: styled.Text`
        text-decoration: underline;
        margin-left: 10px;
        margin-right: 10px;
        padding-bottom: 1px;
        color: #3795d2;
    `,
    Campo: styled.View`
        width: 100%;
        padding-left:15px;
        padding-right:15px;
        margin-bottom:20px;
        
    `,
    Info: styled.View`
        flex-direction: row;
       align-items:center;
    `,
    InfoText: styled.Text`
        margin-left: 5px;
        color: #3795d2;
    `,
    Input: styled.TextInput`
        background-color: #f2f2f2;
        border-radius: 50px;
        color: #000;
        font-size: 15px;
        padding-top:2px;
        padding-left: 20px;
        padding-bottom: 2px;
        margin-top: 15px;
    `,
    CampoFoto: styled.View`
        border-width: 1px;
        border-radius: 5px;
        border-color: #ccc;
        margin-top:10px;
        padding:10px;
        justify-content:center;
        align-items:center;
    `,
    CampoFotoText: styled.Text`
        color: #000;
        font-size: 15px;
        `,
    Button: styled.TouchableOpacity``,
};