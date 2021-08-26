// export const apiDomain = 'https://api.haluga.com/public'
// export const apiUrl = 'https://api.haluga.com/public/api/'

export const apiDomain = 'http://localhost:8000'
export const apiUrl = 'http://localhost:8000/api/'

export const getHeader = function () {
  return {
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + window.localStorage.getItem('authUser')
  }
}

export const logout = function () {
  window.localStorage.clear();
  window.location = '/'
}

export const getHeaderFile = function () {
  return {
    'Accept': 'application/json, image/*, file/*, .avi, video/*, application/octet-stream, application/*, .zip, .rar, .csv',
    'Authorization': 'Bearer ' + window.localStorage.getItem('authUser')
  }
}