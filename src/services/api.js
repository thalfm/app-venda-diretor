import axios from 'axios';
import TOKEN_DISPOSITIVO from './tokenApi';

const apiAxios = axios.create({
    baseURL: 'http://10.0.1.216:8080'
});

const api = {

    getProducts: async({codigoMercadoria, descricao, qualquerParte, atacado, promocao}) => {
        const response = await apiAxios.get('venda/orcamento/pesquisar-mercadorias', {
            params: {
                token: TOKEN_DISPOSITIVO,
                codigoMercadoria: codigoMercadoria,
                descricaoMercadoria: descricao,
                qualquerParte: qualquerParte,
                itensAtacado: atacado,
                itensPromocao: promocao,
                comImagem: true
            }
        })
        .then(response => response.data)
        .catch(error =>error.response.data);
        return response || {};
    },
    efetuarPedido: async (products, usuario) => {
        const response = await apiAxios.post('venda/diretor', {
            codigoLoja: usuario.idLoja,
            codigoCliente: usuario.idTerceiro,
            itens: products,
            token: TOKEN_DISPOSITIVO
        })
        .then(response => response.data)
        .catch(error =>error.response.data);

        return response || {};
    },
    efetuarLogin: async (usuario, senha) => {   
        const response = await apiAxios.post('mobile/autenticacao/login', {
            usuario: usuario,
            senha: senha,
            token: TOKEN_DISPOSITIVO
        })
        .then(response => response.data)
        .catch(error =>error.response.data);

        return response || {};
    },
    efetuarLogout: async() => {
        const response = await apiAxios.post('mobile/autenticacao/logout', {
            token: TOKEN_DISPOSITIVO
        })
        .then(response => response.data)
        .catch(error =>error.response.data);

        return response || {};
    },
    checkLogin: async () => {
        const response = await apiAxios.get('mobile/autenticacao/get-dados-login-por-token-dispositivo', {
            params: {
                token: TOKEN_DISPOSITIVO
            }
        })
        .then(response => response.data)
        .catch(error =>error.response.data);

        return response;
    }

}

export default api;