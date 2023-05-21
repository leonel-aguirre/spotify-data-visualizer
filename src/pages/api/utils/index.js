export const topGenresFromArtistsList = (list) => {
  const genres = list.map((item) => item.genres)

  let genreData = {}
  let genreSums = {}
  let genrePercentages = {}
  let sumTotal = 0

  genres.forEach((genreArray) => {
    genreArray.forEach((genre) => {
      const genreKey = genre.replaceAll(" ", "-")

      if (Object.keys(genreData).includes(genreKey)) {
        genreData[genreKey] += 1
      } else {
        genreData[genreKey] = 1
      }
    })
  })

  Object.keys(genreData).forEach((genreKey) => {
    let genreValue = genreData[genreKey]

    if (genreValue >= 5) {
      genreSums[genreKey] = genreValue
      sumTotal += genreValue
    }
  })

  Object.keys(genreSums).forEach((genreKey) => {
    genrePercentages[genreKey] =
      Math.round((genreSums[genreKey] / sumTotal) * 100 * 10) / 10
  })

  return Object.keys(genrePercentages).map((key) => {
    return {
      genre: kebabToTitleCase(key),
      value: genrePercentages[key],
    }
  })
}

export const filterArtistsFromList = (list) => {
  return list.map((artist) => artist.name)
}

export const kebabToTitleCase = (kebabCaseString) => {
  const words = kebabCaseString.split("-")
  const titleCaseWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  )
  const titleCaseString = titleCaseWords.join(" ")

  return titleCaseString
}

export const getAffinityPercentage = (topA, topB) => {
  const commonElements = topA.filter((item) => topB.includes(item))

  const affinityPercentage =
    commonElements.length / new Set(topA.concat(topB)).size

  return Math.round(affinityPercentage * 100) / 100
}
