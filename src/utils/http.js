"use strict"

const axios = require("axios")

const http = async ({
  url,
  method,
  baseURL,
  params,
}) => {
  const option = method === 'GET' ? {
    params
  } : {
    data: params
  }
  const { data } = await axios({
    method,
    baseURL,
    url,
    ...option
  });
  return data;
}


module.exports = http;
