import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/home.tsx";
import CadastrarColaborador from "./pages/cadastrarColaborador.tsx";
import CadastrarCargos from "./pages/cadastrarCargos";
import Cargos from "./pages/cargos.tsx";
import Qrcode from "./pages/qrcode.tsx";
import QRCodeImagem from "./components/QRCodeImagem.tsx";
import Login from "./pages/login.tsx";
import PedidosCozinha from "./pages/pedidosCozinha.tsx";
import PedidosGarcom from "./pages/pedidosGarcom.tsx";
import SolicitacaoCompra from "./pages/SolicitacaoCompra.tsx";

export function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="Home" element={<Home/>}></Route>
                <Route path="cadastrar-colaborador" element={<CadastrarColaborador/>}></Route>
                <Route path="cadastrar-cargos" element={<CadastrarCargos/>}></Route>
                <Route path="cargos" element={<Cargos/>}></Route>
                <Route path="qrcode" element={<Qrcode/>}></Route>
                <Route path="qrcode-gerado" element={<QRCodeImagem/>}></Route>
                <Route path="pedidos-cozinha" element={<PedidosCozinha/>}></Route>
                <Route path="pedidos-garcom" element={<PedidosGarcom/>}></Route>
                <Route path="compras" element={<SolicitacaoCompra/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
