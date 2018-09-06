// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import { actionChannel } from '../../node_modules/redux-saga/effects';

// our "constructor"
const create = (baseURL = 'http://172.16.10.112:8000/') => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    // headers: {
    //   'Cache-Control': 'no-cache'
    // },
    // 10 second timeout...
    timeout: 10000
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const login = (username, password) => api.post('/signInJson', {
    "username": username,
    "password": password
  }, { headers: { 'Content-Type': 'application/json' } })

  const getWorkOrders = token => api.get('/api/workorder', {}, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })

  const getWorkOrderById = (token, workOrderId) => api.get(`/api/workorder/${workOrderId}`, {}, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })

  const putWooperationlog = (token, data, Id) => api.put('/api/wooperationlog', {
    'Id': Id,
    'data': { ...data },
  }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })

  const postWooperationlog = (token, data) => api.post('/api/wooperationlog', {
    'data': { ...data },
  }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })

  const postFirstPO = (token, data) => api.post('/api/firstpassoff', {
    'data': { ...data },
  }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })

  const putReworkWooperationlog = (token, data, Id) => api.put('/api/reworkserials', {
    'Id': Id,
    'data': { ...data },
  }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })

  const searchWooperationlog = (token, filter) => api.post('/api/wooperationlog/search', {
    'sort': `Id desc`,
    'pageNum': `1`,
    'pageSize': `100`,
    'filter': {
      ...filter,
      'Active': true
    }
  }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })

  const searchFirstPOWooperationlog = (token, filter) => api.post('/api/firstpassoff/search', {
    'sort': `Id desc`,
    'pageNum': `1`,
    'pageSize': `10`,
    'filter': {
      ...filter,
    }
  }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })

  const searchReworkWooperationlog = (token, WOOLogId) => api.post('/api/reworkserials/search', {
    'sort': `Id desc`,
    'pageNum': `1`,
    'pageSize': `1`,
    'filter': {
      'WOOLogId': `${WOOLogId}`,
    }
  }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })

  const getActiveOperators = (token) => api.get(`/api/operators/Active/true`, {}, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })

  const getQAUsers = (token) => api.post(`/api/user/search`, {
    'sort': `Id desc`,
    'pageNum': 1,
    'pageSize': 100,
    'filter': {
      'RoleId': 5,
      'Active': true,
    }
  }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })

  const getRoot = () => api.get('')
  const getRate = () => api.get('rate_limit')
  const getUser = (username) => api.get('search/users', { q: username })

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    login,

    getRoot,
    getRate,
    getUser,
    getQAUsers,
    getWorkOrders,
    getWorkOrderById,
    getActiveOperators,

    putWooperationlog,
    postWooperationlog,
    searchWooperationlog,

    putReworkWooperationlog,
    searchReworkWooperationlog,

    postFirstPO,
    searchFirstPOWooperationlog
  }
}

// let's return back our create method as the default.
export default {
  create
}
