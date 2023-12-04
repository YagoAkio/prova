import Tela404 from "./telasCadastro/Tela404";
import TelaMenu from "./telasCadastro/TelaMenu";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import TelaBataPapo from "./telasCadastro/TelaBatePapo";
import TelaCadastroUsuario from "./telasCadastro/TelaCadastroUsuario";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            {
            }
            <Route path="/batepapo" element={<TelaBataPapo />} />
            <Route path="/usuario" element={< TelaCadastroUsuario/>} />
            <Route path="/" element={<TelaMenu />} />
            {
            }
            <Route path="*" element={<Tela404 />} />
          </Routes>
        </BrowserRouter>
      </Provider>
      <ToastContainer/>
    </div>
  );
}

export default App;
