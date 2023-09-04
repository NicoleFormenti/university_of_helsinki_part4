const info = (...params) => { //info prints all normal log messages
    console.log(...params)
  }
  
  const error = (...params) => { //error prints all error messages
    console.error(...params)
  }
  
  module.exports = {
    info, error
  }