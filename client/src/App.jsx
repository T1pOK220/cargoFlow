import { Routes,Route } from "react-router-dom";
import Home from "./pages/Home";
import './App.css';
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Cargos from "./pages/Cargos";
import Create from "./pages/Create";
import Profile from "./pages/Profile";
import { AuthProvider } from "./context/AuthContext.jsx";
import CargoInfo from "./pages/CargoInfo.jsx";
import Vehicles from "./pages/Vehicles.jsx";
import CarInfo from "./pages/CarInfo.jsx";
import Test from "./pages/Test.jsx";
function App() {
    return (
    <AuthProvider>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/cargos" element={<Cargos />} />
            <Route path="/cargos/create" element={<Create />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cargos/:id" element={<CargoInfo />} />
            <Route path="/vehicles" element={<Vehicles />} />
                <Route path="/vehicles/:id" element={<CarInfo />} />
                <Route path="/test" element={<Test/>}/>
        </Routes>
     </AuthProvider>
        )
}
export default App;