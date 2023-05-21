export const jsonToQueryParams = (json) => {
  return Object.keys(json)
    .map((key) => key + "=" + encodeURIComponent(json[key]))
    .join("&")
}

export const copyTextToClipboard = async (text) => {
  if ("clipboard" in navigator) {
    return await navigator.clipboard.writeText(text)
  } else {
    return document.execCommand("copy", true, text)
  }
}

export const hasAtLeastOneTop = (tops) => {
  return Object.keys(tops).some((key) => tops[key])
}

export const snakeToTitleCase = (snakeCaseString) => {
  const words = snakeCaseString.split("_")
  const titleCaseWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  )
  const titleCaseString = titleCaseWords.join(" ")

  return titleCaseString
}
