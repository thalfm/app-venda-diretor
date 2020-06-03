const api = {

    productsFake: [
        {
            id: 1,
            descricao: 'Cimento',
            valor: '10',
            quantidade: 1,
            isOperaDecimal: false
        },
        {
            id: 2,
            descricao: 'Arruela',
            valor: '10',
            quantidade: 1,
            isOperaDecimal: true
        },
        {
            id: 3,
            descricao: 'Arruela',
            valor: '10',
            quantidade: 1,
            isOperaDecimal: true
        },
        {
            id: 4,
            descricao: 'Arruela',
            valor: '10',
            quantidade: 1,
            isOperaDecimal: true
        },
        {
            id: 5,
            descricao: 'Arruela',
            valor: '10',
            quantidade: 1,
            isOperaDecimal: true
        },
        {
            id: 6,
            descricao: 'Arruela',
            valor: '10',
            quantidade: 1,
            isOperaDecimal: true
        },
        {
            id: 7,
            descricao: 'Arruela',
            valor: '10',
            quantidade: 1,
            isOperaDecimal: true
        }
    ],

    getProducts: async ({codigoMercadoria, descricao, qualquerParte, atacado, promocao}) => {
        return {
            data: api.productsFake
        };
    },
    efetuarPedido: async (products) => {
        return {
            data: {
                message: 'Pedido efetuado com sucesso!'
            }
        };
    },
    efetuarLogin: async(usuario, senha) => {   
        return {
            data:  {
                usuario: {
                    nome: 'Thales'
                },
                token: '123456',
                message: 'Login efetuado com sucesso!'
            }
        };
    }

}

export default api;