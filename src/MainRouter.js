import React from 'react'
import {
    Routes, // instead of "Switch"
    Route,
} from "react-router-dom";

import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';

const MainRouter = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </>
    )
}

export default MainRouter;