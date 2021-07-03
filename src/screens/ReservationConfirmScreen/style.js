import styled from 'styled-components/native';

export default {
    Container: styled.SafeAreaView`
        border-top-width:1px;
        padding-top:16px;
        border-color: #ccc;
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
    `
   
};