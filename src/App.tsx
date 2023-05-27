import HeaderEmpresa from "./components/HeaderEmpresa.tsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/home.tsx";
import CadastrarColaborador from "./pages/cadastrarColaborador.tsx";
import CadastrarCargos from "./pages/cadastrarCargos";
import Cargos from "./pages/cargos.tsx";
import Qrcode from "./pages/qrcode.tsx";
import QRCodeImagem from "./components/QRCodeImagem.tsx";
export function App() {

    return (
        <BrowserRouter>
            <HeaderEmpresa/>
            <Routes>
                <Route index element={<Home />} />
                <Route path="cadastrar-colaborador" element={<CadastrarColaborador/>}></Route>
                <Route path="cadastrar-cargos" element={<CadastrarCargos/>}></Route>
                <Route path="cargos" element={<Cargos/>}></Route>
                <Route path="qrcode" element={<Qrcode/>}></Route>
                <Route path="qrcode-gerado" element={<QRCodeImagem/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}
