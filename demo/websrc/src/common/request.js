import 'whatwg-fetch';

function getParams(options) {
  if (!options) {
    return;
  }
  let _url = options.url || '';
  let _data = options.data || {};
  let _type = options.type;
  let fetchParams = {
    credentials: 'include',
  };
  let urlParams = [];
  for(let key in _data) {
    let _paramStr = '';
    if ( typeof _data[key] === 'object' ) {
      _paramStr = `${key}=${JSON.stringify(_data[key])}`;
    } else {
      _paramStr = `${key}=${_data[key]}`;
    }
    urlParams.push(_paramStr)
  }
  if ( _url.indexOf('?') >= 0 ) {
    _url = `${_url}&${urlParams.join('&')}`
  } else {
    _url = `${_url}?${urlParams.join('&')}`
  }
  return {
    _url,
    params: {
      ...fetchParams,
      ...{
        headers: new Headers()
      }
    }
  }
}

function postParams(options) {
  if (!options) {
    return;
  }
  let _url = options.url || '';
  let _data = options.data || {};
  let _type = options.type;
  const fetchParams = {
    credentials: 'include',
    method: _type,
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(_data)
  }
  return  {
    _url,
    params: {
      ...fetchParams,
      ...{
        method: _type,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(_data)
      }
    }
  }
}

function fetchEvent(options) {
  let _url, params;
  if (options.type == 'GET') {
   _url = getParams(options)._url;
   params = getParams(options).params;
  } else {
    _url = postParams(options)._url;
    params = postParams(options).params;
  }
  return new Promise((resolve, reject) => {
    window.fetch(_url, params).then((response) => {
      return response.json();
    }).then((result) => {
      resolve(result);
    }).catch((err) => {
      reject(err);
    })
  });
}

const request = {
  get(options) {
    if (typeof options !== 'object') {
      return;
    }
    options.type = 'GET';
    return fetchEvent(options);
  },
  post(options) {
    if (typeof options !== 'object') {
      return;
    }
    options.type = 'POST';
    return fetchEvent(options);
  },
  // 表单提交
  form(options) {
    if ( typeof options !== 'object') {
      return;
    }
    let _url = options.url || '';
    let _data = options.data || {};
    let _form = document.createElement('form');
    _form.method = 'POST';
    _form.action = _url;
    for (let key in _data) {
      let _input = document.createElement('input');
      _input.type = 'hidden';
      _input.name = key;
      let _value = _data[key];
      if ( typeof _value === 'object') {
        _value = window.JSON.stringify(_value);
      }
      _input.value = _value;
      _form.appendChild(_input);
    }
    document.body.appendChild(_form);
    _form.submit();
  }
}

export default request;
