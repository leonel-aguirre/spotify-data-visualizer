export const jsonToQueryParams = (json) => {
  return Object.keys(json)
    .map((key) => key + "=" + encodeURIComponent(json[key]))
    .join("&")
}
