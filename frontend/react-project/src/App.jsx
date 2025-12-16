import { useEffect, useState } from "react";
import MainPage from "./components/Main/MainPage.jsx";
import "./App.css";
import { Header, Footer, Login, Signup, Info, Mypage } from "./components";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import useAuth from "./hooks/useAuth.js";

function App() {
    const location = useLocation();
    const { auth, refreshAuth } = useAuth();

    // header/footer 제외할 경로
    const noLayoutRoutes = ["/login", "/signup", "/board", "/mypage"];

    const hideLayout = noLayoutRoutes.includes(location.pathname);

    if (auth.isLoading) {
        return <div>로딩중...</div>;
    }

    return (
        <>
            {!hideLayout && <Header auth={auth} refreshAuth={refreshAuth} />}
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/main" element={<Navigate to="/" replace />} />
                <Route
                    path="/login"
                    element={auth.isLoggedIn ? <Navigate to="/" replace /> : <Login refreshAuth={refreshAuth} />}
                />
                <Route path="/signup" element={<Signup />} />
                <Route path="/info" element={<Info />} />
                <Route
                    path="/mypage"
                    element={auth.isLoggedIn ? <Mypage auth={auth} /> : <Navigate to="/login" replace />}
                />
            </Routes>
            {!hideLayout && <Footer />}
        </>
    );
}

export default App;
