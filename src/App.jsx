import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/(csd)/DashboardPage";
import SDOfficePage from "./pages/(csd)/SDOfficePage";
import InstrumentsPage from "./pages/(csd)/InstrumentPage";
import AddInstrumentPage from "./pages/(csd)/AddInstrumentPage";
import ViewInstrumentPage from "./pages/(csd)/ViewInstrumentPage";
import SDDashboardPage from "./pages/(sd)/SDDashboardPage";
import SDRecordPage from "./pages/(sd)/SDRecordPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/csd/impact-ranking" element={<DashboardPage />} />
                <Route path="/csd/sd-office" element={<SDOfficePage />} />

                <Route path="/csd/instruments" element={<InstrumentsPage />} />
                <Route
                    path="/csd/view-instrument/:instrument_id"
                    element={<ViewInstrumentPage />}
                />
                <Route
                    path="/csd/add-instrument/"
                    element={<AddInstrumentPage />}
                />
                <Route path="/" element={<Navigate to="/login" />} />
                <Route
                    path="/sd/impact-ranking"
                    element={<SDDashboardPage />}
                />
                <Route path="/sd/record" element={<SDRecordPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
