require('antd/dist/antd.less');
require('./error.less');

import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/error.jsx';

ReactDOM.render(<App />,
document.getElementById("app"));
