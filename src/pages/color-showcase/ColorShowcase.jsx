import "./ColorShowcase.scss"

import React from "react"

const COLORS = [
  {
    name: "Raisin Black",
    id: "raisin-black",
  },
  {
    name: "Ghost White",
    id: "ghost-white",
  },
  {
    name: "Folly Red",
    id: "folly-red",
  },
  {
    name: "Azure Blue",
    id: "azure-blue",
  },
  {
    name: "Spring Green",
    id: "spring-green",
  },
]

const ColorShowcase = () => {
  const renderColorSwatch = (color, className) => {
    return (
      <div
        key={`${color}-${className}`}
        className={`showcase-colors__color-swatch is-${className}`}
      ></div>
    )
  }

  return (
    <div className="color-showcase">
      {COLORS.map((color) => {
        return (
          <div
            key={color.id}
            className={`${"color-showcase__swatch-wrapper"} ${`is-${color.id}`}`}
          >
            {[3, 2, 1].map((level) =>
              renderColorSwatch(color, `lighten-${level}`)
            )}
            {renderColorSwatch(color, "natural")}
            {[1, 2, 3].map((level) =>
              renderColorSwatch(color, `darken-${level}`)
            )}
          </div>
        )
      })}
    </div>
  )
}

export default ColorShowcase
