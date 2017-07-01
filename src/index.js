import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from "react-router-dom";

import './index.css';

import Beasts from "./js/pages/Beasts"
import Bones from "./js/pages/Bones"
import Layout from "./js/pages/Layout"

const root = document.getElementById('root')

ReactDOM.render(
  <HashRouter>
    <Layout>
      <div>
        <Route exact path="/" component={Beasts} />
        <Route path="/beasts" component={Beasts} />
        <Route path="/bones" component={Bones} />
      </div>
    </Layout>
  </HashRouter>

, root);
