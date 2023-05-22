import "./Button.scss"

const Button = ({
  children,
  type = Button.DEFAULT,
  isSmall = false,
  isDisabled = false,
  className = "",
  ...rest
}) => {
  return (
    <button
      disabled={isDisabled}
      className={`button is-${type} is-${
        isSmall ? "small" : "large"
      } ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

Button.DEFAULT = "default"
Button.SUCCESS = "success"
Button.WARNING = "warning"
Button.DANGER = "danger"

export default Button
