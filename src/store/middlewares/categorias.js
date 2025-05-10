import { createListenerMiddleware } from "@reduxjs/toolkit";
import categoriasService from "services/categorias";
import { addAllCategories, addOneCategory, carregarCategorias, loadOneCategory } from "store/reducers/categorias";
import createTask from "./utils/createTask";

export const listener = createListenerMiddleware()

listener.startListening({
  actionCreator: carregarCategorias,
  effect: async (action, { dispatch, fork, unsubscribe }) => {
    const response = await createTask({
      fork,
      dispatch,
      action: addAllCategories,
      search: categoriasService.buscar,
      textLoading: 'Carregando categorias',
      textSuccess: 'Categorias carregadas com sucesso!',
      textError: 'Erro na busca de categorias'
    })

    if (response.status === 'ok') {
      // unsubscribe do listener, para não ficar rechamando algo que ja obtivemos
      // se entrarmos na pag de uma categoria e voltar para home não rechama o listener
      unsubscribe()
    }

  }
});

// criando um novo listener para um novo objetivo 
listener.startListening({
  actionCreator: loadOneCategory,
  effect: async (action, { fork, dispatch, getState, unsubscribe }) => {
    // pegando as categorias que existem no redux, para evitar carregar novamente as categorias se já foram carregadas
    const { categories } = getState()

    const nameCategory = action.payload
    const categoryLoad = categories.some(category => category.id === nameCategory)

    if(categoryLoad) return
    if(categories.length === 5) return unsubscribe()

    await createTask({
      fork,
      dispatch,
      action: addOneCategory,
      search: () => categoriasService.searchOneCategory(nameCategory),
      textLoading: `Carregando categoria ${nameCategory}`,
      textSuccess: `Categoria ${nameCategory} carregada com sucesso!`,
      textError: `Erro na busca de categoria ${nameCategory}`
    })
  }
})