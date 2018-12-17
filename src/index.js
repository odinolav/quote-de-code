import React from 'react';
import ReactDOM from 'react-dom';
import './styles/reset.css';
import './styles/styles.styl.css';
import Layout from "./js/pages/Layout"
import * as serviceWorker from './serviceWorker';

const root = document.getElementById('root');

ReactDOM.render(
    <Layout></Layout>
, root);

serviceWorker.unregister();
