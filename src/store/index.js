// usando createListenerMiddleware

import { configureStore } from '@reduxjs/toolkit';
import { categoriesListener } from './middlewares/categorias';
import buscaSlice from './reducers/busca';
import carrinhoSlice from './reducers/carrinho';
import categoriasSlice from './reducers/categorias';
import itensSlice from './reducers/itens';
import { itensListener } from './middlewares/itens';



const store = configureStore({
  reducer: {
    categorias: categoriasSlice,
    itens: itensSlice,
    carrinho: carrinhoSlice,
    busca: buscaSlice,
  },
  // pegando middlewares default e adicionando novos middlewares
  middleware: getDefaultMiddleware => 
    getDefaultMiddleware().prepend(
      categoriesListener.middleware,
      itensListener.middleware
    ),
});

export default store;