// usando createListenerMiddleware

import { configureStore } from '@reduxjs/toolkit';
import buscaSlice from './reducers/busca';
import carrinhoSlice from './reducers/carrinho';
import categoriasSlice from './reducers/categorias';
import itensSlice from './reducers/itens';
import { listener } from './middlewares/categorias';



const store = configureStore({
  reducer: {
    categorias: categoriasSlice,
    itens: itensSlice,
    carrinho: carrinhoSlice,
    busca: buscaSlice,
  },
  // pegando middlewares default e adicionando um novo middleware
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(listener.middleware),
});

export default store;