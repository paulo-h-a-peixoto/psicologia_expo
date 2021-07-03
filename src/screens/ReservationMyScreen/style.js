import styled from 'styled-components/native';

export default {
    Container: styled.SafeAreaView`
        flex: 1;
        background-color: #F5F6FA;
        padding-bottom:20px;
    `,
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
        padding: 0px 20px 20px 20px;
    `,
    Painel: styled.View`
        background-color: #FFF;
        border-width: 2px;
        border-color: #E8E9ED;
        border-radius: 15px;
        margin-bottom: 15px;
        flex-direction: row;
        align-items: center;
        padding:10px;
        margin:20px;
    `,
    Itens: styled.View``,
    Picker: styled.Picker`
        margin-left:30px;
        width: 280px;
        border-width: 2px;
        border-color: #ccc;
    `,
};