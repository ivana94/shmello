import React from 'react';
import axios from './axios';
import { HashRouter, Route, Link } from "react-router-dom";
import Register from "./register";
import Login from "./login";


export default function Welcome() {






        return (
          <div className = "welcome-container">
            <h1>Welcome to Trello</h1>

              <HashRouter>
                  <div>
                      <Route exact path = "/" component = { Register } />
                      <Route path = "/login" component = { Login } />
                  </div>
              </HashRouter>


          </div>
        )





}
