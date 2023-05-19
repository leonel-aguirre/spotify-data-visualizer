import "./ClipboardCopy.scss"

import React, { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import {
  faClipboard,
  faClipboardCheck,
} from "@fortawesome/free-solid-svg-icons"
import { copyTextToClipboard } from "@/utils"

const ClipboardCopy = ({
  text,
  className = "",
  type = ClipboardCopy.DEFAULT,
}) => {
  const [isCopied, setIsCopied] = useState(false)

  const handleButtonClick = () => {
    if (!isCopied) {
      copyTextToClipboard(text)
      setIsCopied(true)
    }
  }

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false)
      }, 5000)
    }
  }, [isCopied])

  return (
    <div className={`clipboard-copy ${className} is-${type}`}>
      <p className="clipboard-copy__text-container">{text}</p>
      <button className="clipboard-copy__button" onClick={handleButtonClick}>
        {isCopied ? "Copied!" : "Copy to Clipboard"}
        <FontAwesomeIcon
          className="clipboard-copy__icon"
          icon={isCopied ? faClipboardCheck : faClipboard}
        />
      </button>
    </div>
  )
}

ClipboardCopy.DEFAULT = "default"
ClipboardCopy.SUCCESS = "success"
ClipboardCopy.WARNING = "warning"
ClipboardCopy.DANGER = "danger"

export default ClipboardCopy
