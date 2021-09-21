import React, { useEffect } from 'react'
import Header from '../Header/Header'
import CheckResult from '../Check Result/CheckResult'
import './Home.scss'
import Scanning from '../scanning/Scanning'
import Landing from '../Landing/Landing';
import Form from '../Form/Form'
import { Route,BrowserRouter as Router, Switch } from 'react-router-dom'

export default function Home() {
    return (
        <div className="home">
            <Router>
                <Header/> 
                <Switch>
                    <Route exact path="/scanning">
                        <Scanning/>
                    </Route>

                    <Route path="/result">
                        <CheckResult/> 
                    </Route>

                    <Route exact path="/">
                        <Landing/>
                        <Form/>
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}
