import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ESTADO from "../recursos/estado";

const urlBase = "https://backend-bcc-2-b.vercel.app/mensagem";

export const buscarMensagens = createAsyncThunk('buscarMensagem', async () => {
    try {
        const resposta = await fetch(urlBase, { method: "GET" });
        const dados = await resposta.json();
        if (dados.status) {
            const mensagensFormatadas = dados.listaMensagens.map(mensagem => {
                return {
                    id: mensagem.id,
                    dataHora: mensagem.dataHora,
                    lida: mensagem.lida,
                    mensagem: mensagem.mensagem,
                    usuario: {
                        id: mensagem.usuario.id,
                        nickname: mensagem.usuario.nickname,
                        urlAvatar: mensagem.usuario.urlAvatar,
                        dataIngresso: mensagem.usuario.dataIngresso,
                        mensagens: mensagem.usuario.mensagens
                    }
                };
            });

            return {
                status: dados.status,
                mensagem: "",
                listaMensagens: mensagensFormatadas
            };
        } else {
            return {
                status: dados.status,
                mensagem: dados.mensagem,
                listaMensagens: []
            };
        }
    } catch (erro) {
        return {
            status: false,
            mensagem: "Erro ao recuperar mensagem: " + erro.message,
            listaMensagens: []
        };
    }
});

export const incluirMsg = createAsyncThunk('incluirMsg', async ({ mensagem, usuarioId }) => {
    try {
        const resposta = await fetch(urlBase, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                mensagem,
                usuario: {
                    id: usuarioId
                }
            })
        });
        const dados = await resposta.json();
        if (dados.status) {
            return {
                status: dados.status,
                mensagem: { id: dados.id, mensagem, lida: false, usuario: { id: usuarioId } },
                mensagem: dados.mensagem
            };
        } else {
            return {
                status: dados.status,
                mensagem: dados.mensagem
            };
        }
    } catch (erro) {
        return {
            status: false,
            mensagem: "Não foi possível cadastrar mensagem " + erro.message
        };
    }
});

export const atualizarMsg = createAsyncThunk('atualizarMsg', async ({ id, lida }) => {
    try {
        const resposta = await fetch(urlBase, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id,
                lida
            })
        });
        const dados = await resposta.json();
        if (dados.status) {
            return {
                status: dados.status,
                mensagem: dados.mensagem,
                mensagem: { id, lida }
            };
        } else {
            return {
                status: dados.status,
                mensagem: dados.mensagem
            };
        }
    } catch (erro) {
        return {
            status: false,
            mensagem: "Não foi possível atualizar mensagem " + erro.message
        };
    }
});

export const excluirMsg = createAsyncThunk('excluirMsg', async (id) => {
    try {
        const resposta = await fetch(urlBase, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id
            })
        });
        const dados = await resposta.json();
        if (dados.status) {
            return {
                status: dados.status,
                mensagem: dados.mensagem,
                mensagem: { id }
            };
        } else {
            return {
                status: dados.status,
                mensagem: dados.mensagem
            };
        }
    } catch (erro) {
        return {
            status: false,
            mensagem: "Não foi possível excluir mensagem " + erro.message
        };
    }
});


const estadoInicial = {
    estado: ESTADO.OCIOSO,
    mensagem: "",
    mensagens: []
}

const mensagemSlice = createSlice({
    name: 'mensagem',
    initialState: estadoInicial,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(buscarMensagens.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = 'Buscando mensagens';
            })
            .addCase(buscarMensagens.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = "Mensagens recuperadas do backend!";
                    state.mensagens = action.payload.listaMensagens;
                }
                else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                    state.mensagens = [];
                }
            })
            .addCase(buscarMensagens.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
                state.mensagens = [];
            })
            .addCase(incluirMsg.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = 'Processando a requisição...'
            })
            .addCase(incluirMsg.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.mensagens.push(action.payload.mensagem);
                }
                else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(incluirMsg.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })
            .addCase(atualizarMsg.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = 'Processando a requisição...'
            })
            .addCase(atualizarMsg.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    const indice = state.mensagens.findIndex((mensagem) => mensagem.id === action.payload.mensagem.id);
                    state.mensagens[indice] = action.payload.mensagem;
                }
                else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(atualizarMsg.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })
            .addCase(excluirMsg.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = 'Processando a requisição...'
            })
            .addCase(excluirMsg.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.mensagens = state.mensagens.filter((mensagem) => mensagem.id !== action.payload.mensagem.id);
                }
                else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(excluirMsg.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })
    }
});

export default mensagemSlice.reducer;