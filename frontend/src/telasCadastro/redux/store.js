import {configureStore} from '@reduxjs/toolkit';
import usuarioSlice from './usuarioReducer';
import mensagensSlice from './mensagemReducer';

const store = configureStore({
    reducer:{
        usuarioSlice: usuarioSlice,
        mensagens: mensagensSlice,
    }
});

export default store;
