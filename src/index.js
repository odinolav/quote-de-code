import React from 'react';
import ReactDOM from 'react-dom';
//import { HashRouter, Route } from "react-router-dom";

import './index.css';

import Layout from "./js/pages/Layout"

const root = document.getElementById('root');

ReactDOM.render(
  //<HashRouter>
    <Layout></Layout>
  //</HashRouter>

, root);
