import React from 'react'
import {
    Routes, // instead of "Switch"
    Route,
} from "react-router-dom";

import Home from './pages/Home';

const MainRouter = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </>
    )
}

export default MainRouter;