require('antd/dist/antd.less');
require('./admin.less');

import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../componenets/admin.jsx';

ReactDOM.render(<App />,
  document.getElementById('app'));
