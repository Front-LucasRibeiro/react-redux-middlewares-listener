import instance from 'common/config/api';

const categoriasService = {
  buscar: async () => {
    const resposta = await instance.get('/categorias');

    return resposta.data;
  },
  searchOneCategory: async (nameCategory) => {
    const response = await instance.get(`/categorias/${nameCategory}`)
    return response.data
  }
}

export default categoriasService;