import styled from 'styled-components/native';

export default {
    Container: styled.SafeAreaView`
        padding-top:16px;
        flex: 1;
        background-color: #fff;
    `,
    ContainerVertical: styled.SafeAreaView`
        flex: 1;
        padding:0px 16px 0px 16px;

        background-color: #fff;
    `,
    ContainerHorizontal: styled.SafeAreaView`
        flex: 1;
        flex-direction:row;
        padding:16px;
        background-color: #fff;
    `,
    Row: styled.View`
    `,
    Line: styled.View`
    `,
    Text: styled.Text`
        color: #40454a;
    `,
    Scroller: styled.ScrollView`
        flex: 1;
    `,
    CoverImage: styled.Image`
        height: 100px;
        width: 100px;
        margin: 0 auto;
    `,
    LoadingIcon: styled.ActivityIndicator`
        margin-top: 20px;
    `,
    ButtonArea: styled.TouchableOpacity`
        background-color: #3795d2;
        padding: 15px;
        justify-content: center;
        align-items: center;
    `,
    ButtonText: styled.Text`
        color: #FFF;
        font-size: 15px;
        font-weight: bold;
    `,
    Box: styled.View`
        flex:1;
    `,
    BoxIn: styled.TouchableOpacity`
        flex:1;
        margin:5px;
        margin-top:15px;
        margin-bottom:15px;
        padding:30px 20px;
        border-width: 1px;
        border-radius: 5px;
        border-color: #5b80ff;
        justify-content:center;
        align-items:center;

    `,
    BoxInText: styled.Text`
        text-align:center;
        font-weight: bold;
        color: #5b80ff;
        font-size: 18px;
    `,


   
};