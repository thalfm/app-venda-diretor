import styled from 'styled-components';

export const PageView = styled.SafeAreaView`
    background-color: #ffffff;
    flex: 1;
    justify-content: center;
`;

export const ViewLogo = styled.View`
    position: absolute;
    left: 17%;
    top: 58px;
    width: 273px;
    align-items: center;
`;

export const Quadrado = styled.View`
    width:${props => props.largura};
    height:${props => props.altura};
    background-color:${props => props.cor};
    position:absolute;
`;

export const CardView = styled.View`
    z-index: 100;
    padding: 15px;
    background-color: ${props => props.cor};
    width:${props => props.largura};
    height:${props => props.altura};
    align-self: center;
    position: absolute;
    border: 1px solid #D8D8D8;

    shadow-color: #000;
    shadow-opacity: 0.25;
    shadow-radius: 3.84px;
    elevation: 5;
`;

export const KeyboardArea = styled.KeyboardAvoidingView`
    width:100%;
    flex: 1;
    justify-content: center;
    align-items: center;
`;