import React from 'react';
import ReactDOM from 'react-dom';
import FilterContainer from './components/FilterContainer';
import * as serviceWorker from './serviceWorker';

let mount = document.createElement('div');
mount.id = "_locloc-mount";
document.documentElement.appendChild(mount)
ReactDOM.render(<FilterContainer />, mount);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
