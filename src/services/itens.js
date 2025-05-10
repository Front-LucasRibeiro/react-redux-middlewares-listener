import instance from 'common/config/api';

const itensService = {
  buscar: async () => {
    const resposta = await instance.get('/itens');

    return resposta.data;
  },
  searchByCategories: async (nameCategory) => {
    const response = await instance.get(`/itens?categoria=${nameCategory}`)
    return response.data
  }
}

export default itensService;