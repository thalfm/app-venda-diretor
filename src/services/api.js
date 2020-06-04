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
        }).then(response => { 
            return response.data;
        })
        .catch(error => {
            console.log(error)
        });

        return response || {};
    },
    efetuarPedido: async (products) => {
        return {
            data: {
                message: 'Pedido efetuado com sucesso!'
            }
        };
    },
    efetuarLogin: async (usuario, senha) => {   
        const response = await apiAxios.post('mobile/autenticacao/login', {
            usuario: usuario,
            senha: senha,
            token: TOKEN_DISPOSITIVO
        }).then(response => { 
            return response.data;
        })
        .catch(error => {
            console.log(error)
        });;

        return response || {};
    },
    efetuarLogout: async() => {
        const response = await apiAxios.post('mobile/autenticacao/logout', {
            token: TOKEN_DISPOSITIVO
        }).then(response => { 
            return response.data;
        })
        .catch(error => {
            console.log(error)
        });;

        return response || {};
    }

}

export default api;