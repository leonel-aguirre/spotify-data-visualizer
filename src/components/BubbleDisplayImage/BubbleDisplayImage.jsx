/* eslint-disable @next/next/no-img-element */
import "./BubbleDisplayImage.scss"

import { useState } from "react"

const BubbleDisplayImage = ({
  userImageURL,
  userName,
  hasBorder = true,
  className = "",
  size = BubbleDisplayImage.MEDIUM,
}) => {
  const [hasErrorOccurred, setHasErrorOccurred] = useState(false)

  return (
    <div
      className={`bubble-display-image ${
        hasBorder ? "has-border" : ""
      } is-${size}`}
    >
      {hasErrorOccurred || !userImageURL ? (
        <div className={`bubble-display-image__user-image-bubble ${className}`}>
          {userName?.charAt(0)}
        </div>
      ) : (
        <img
          className={`bubble-display-image__user-image-bubble ${className}`}
          src={userImageURL}
          onError={() => setHasErrorOccurred(true)}
          alt=""
        />
      )}
    </div>
  )
}

BubbleDisplayImage.SMALL = "small"
BubbleDisplayImage.MEDIUM = "medium"
BubbleDisplayImage.LARGE = "large"

export default BubbleDisplayImage
