import "./Button.scss"

const Button = ({
  children,
  type = Button.DEFAULT,
  isSmall = false,
  className = "",
  ...rest
}) => {
  return (
    <button
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
