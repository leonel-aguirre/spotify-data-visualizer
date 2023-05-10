import "./Button.scss"

const Button = ({
  children,
  onClick,
  type = Button.DEFAULT,
  isSmall = false,
  className = "",
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={`button is-${type} is-${
        isSmall ? "small" : "large"
      } ${className}`}
      onClick={onClick}
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
