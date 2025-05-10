import { createListenerMiddleware } from "@reduxjs/toolkit"
import itensService from "services/itens"
import { loadOneCategory } from "store/reducers/categorias"
import { addItems } from "store/reducers/itens"
import createTask from "./utils/createTask"

export const itensListener = createListenerMiddleware()

itensListener.startListening({
  actionCreator: loadOneCategory,
  effect: async (action, { fork, dispatch, unsubscribe, getState }) => {
    const { itens } = getState()

    // se todos itens de todas categorias ja foram buscados unsubscribe
    if (itens.length === 25) return unsubscribe()

    const nameCategory = action.payload
    
    // condição para não buscar novamente itens que ja foram carregados
    const itemsLoad = itens.some(item => item.categoria === nameCategory)
    if (itemsLoad) return

    await createTask({
      fork,
      dispatch,
      action: addItems,
      search: () => itensService.searchByCategories(nameCategory),
      textLoading: `Carregando itens da categoria ${nameCategory}`,
      textSuccess: `Itens da categoria ${nameCategory} carregados com sucesso!`,
      textError: 'Erro na busca de itens'
    })
  }
})