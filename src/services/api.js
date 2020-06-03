import axios from 'axios';

const apiAxios = axios.create({
    baseURL: 'http://localhost:8080'
});

const api = {

    getProducts: ({codigoMercadoria, descricao, qualquerParte, atacado, promocao}) => {
        return apiAxios.get('venda/orcamento/pesquisa-mercadorias', {
            token: 'venda-diretor',
            codigoMercadoria: codigoMercadoria,
            descricaoMercadoria: descricao,
            qualquerParte: qualquerParte,
            itensAtacado: atacado,
            itensPromocao: promocao,
            comImagem: true
            
        });
    },
    efetuarPedido: async (products) => {
        return {
            data: {
                message: 'Pedido efetuado com sucesso!'
            }
        };
    },
    efetuarLogin: async(usuario, senha) => {   
        return apiAxios.post('mobile/autenticacao/login', {
            usuario: usuario,
            senha: senha,
            token: 'venda-diretor'
        })
    }

}

export default api;