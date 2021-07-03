import styled from 'styled-components/native';

export default {
    Container: styled.SafeAreaView`
        flex: 1;
        background-color: #f0f5fb;
        padding: 20px;
    `,
    LoadingIcon: styled.ActivityIndicator``,

    Header: styled.View``,
    BuscaMsg: styled.Text`
        color: #5598f9;
        width:230px;
        font-size: 19px;
        
    `,
    InputView: styled.View`
        margin-top: 15px;
        margin-bottom: 15px;
        padding-right: 20px;
        padding-left:10px;
        background-color: #fff;
        width:100%;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        border-radius: 8px;
        border-color: #ccc;
        border-width: 1px;
    `,

    BuscaInput: styled.TextInput`
    flex:1;
    `,

    ClienteView: styled.TouchableOpacity`
        background-color: #fff;
        padding: 10px 15px 10px 15px;
        border-radius: 8px;
        border-color: #ccc;
        border-width: 1px;
        margin-bottom: 15px;
        shadow-color: #000;
        shadow-opacity: 0.10;
        shadow-radius: 2px;
        elevation: 5;

    `,
    ClienteTitle: styled.Text`
        color: #4fc7ff;
        font-size: 17px;
        font-weight: bold;
        margin-bottom: 4px;
    `,
    ClienteInfo: styled.View`
        flex-direction: row;
        align-items: center;
        margin-top: 3px;
        margin-bottom: 3px;
    `,
    ClienteInfoText: styled.Text`
        color: #000;
        margin-left: 8px;
    `,
    ClienteIcon: styled.View`
        align-items: flex-end;
        flex:1;
    `,
    ClienteIconCircle: styled.View`
        background-color: #01bfe3;
        padding: 5px;
        border-radius: 50px;

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
    `,
    AddButton: styled.TouchableOpacity`
        margin-right: 15px;
    `
};