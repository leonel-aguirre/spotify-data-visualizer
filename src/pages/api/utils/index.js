export const topGenresFromList = (list) => {
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

  console.log({ genreData, genreSums, genrePercentages, sumTotal })

  return genrePercentages
}

export const filterArtistsFromList = (list) => {
  return list.map((artist) => artist.name)
}
