import axios from "axios"

const axiosInstance = axios.create()

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL

const sendRequest = (
  method,
  endPoint,
  body,
  headers,
  isURLExternal = false
) => {
  const url = isURLExternal ? endPoint : baseURL + endPoint

  const config = {
    method,
    url,
    headers,
  }

  if (method === "GET") {
    config.params = body
  } else {
    config.data = body
  }

  console.log({ config })

  return axiosInstance(config)
}

export const get = (endPoint, params, headers = {}, isURLExternal) => {
  return sendRequest("GET", endPoint, params, headers, isURLExternal)
}

export const post = (endPoint, body, headers = {}, isURLExternal) => {
  return sendRequest("POST", endPoint, body, headers, isURLExternal)
}

export const put = (endPoint, body, headers = {}, isURLExternal) => {
  return sendRequest("PUT", endPoint, body, headers, isURLExternal)
}

export const del = (endPoint, headers = {}, isURLExternal) => {
  return sendRequest("DELETE", endPoint, null, headers, isURLExternal)
}
