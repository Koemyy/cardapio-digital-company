import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/home.tsx";
import CadastrarColaborador from "./pages/cadastrarColaborador.tsx";
import CadastrarCargos from "./pages/cadastrarCargos";
import Cargos from "./pages/cargos.tsx";
import Qrcode from "./pages/qrcode.tsx";
import QRCodeImagem from "./components/QRCodeImagem.tsx";
import Login from "./pages/login.tsx";

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
            </Routes>
        </BrowserRouter>
    )
}

export default App;
