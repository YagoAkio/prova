import { Button, Container, Spinner, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ESTADO from "../../recursos/estado";
import { buscarUsuarios, removerUsuario } from "../../redux/usuarioReducer";
export default function TabelaUsuarios(props) {
    const { estado, mensagem, usuarios } = useSelector((state) => state.usuario);
    const dispatch = useDispatch();
    
    function editarUsuario(usuario) {
        props.setUsuarioParaEdicao(usuario);
        props.setModoEdicao(true);
        props.exibirFormulario(true);

    }
    useEffect(() => {
        dispatch(buscarUsuarios());
    }, [dispatch]);

    function apagarMensagens() {
        setTimeout(() => {
            toast.dismiss();
        }, 2000)
        return null;
    }

    return (
        <Container>
            {estado === ESTADO.ERRO ?
                toast.error(({ closeToast }) =>
                    <div>
                        <p>{mensagem}</p>

                    </div>
                    , { toastId: estado })
                :
                null
            }
            {
                estado === ESTADO.PENDENTE ?
                    toast(({ closeToast }) =>
                        <div>
                            <Spinner animation="border" role="status"></Spinner>
                            <p>Processando a requisição...</p>
                        </div>
                        , { toastId: estado })
                    :
                    null
            }

            {
            
            estado === ESTADO.OCIOSO ?
            apagarMensagens()
            :
            null
            }
            <Button type="button" onClick={() => {
                props.exibirFormulario(true);
            }}>Novo Usuario</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>nickname</th>
                        <th>urlAvatar</th>
                        <th>dataIngresso</th>
                        <th>mensagens</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        usuarios.map((usuario) => {
                            return (<tr key={usuario.id}>
                                <td>{usuario.nickname}</td>
                                <td>{usuario.urlAvatar}</td>
                                <td>{usuario.dataIngresso}</td>
                                <td>{usuario.mensagens}</td>
                                <td>
                                    <Button onClick={ ()=>{
                                        editarUsuario(usuario);
                                    }

                                    } variant="warning">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            className="bi bi-pencil-square"
                                            viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </Button>
                                </td>
                            </tr>)
                        })
                    }
                </tbody>
            </Table>
        </Container>
    );
}