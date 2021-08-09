import React from 'react';
import Layout from "./component/Layout";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import Home from "./pages/Home";
import BlogDetails from "./pages/BlogDetails";
import ScrollToTop from './config/ScrollToTop';

function App() {
    return (
        <>
            <Router>
                <Layout>
                    <ScrollToTop />
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route exact path={`/blog/:id`}>
                            <BlogDetails />
                        </Route>
                    </Switch>
                </Layout>
            </Router>
        </>
    )
}

export default App
