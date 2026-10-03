import { Link } from "react-router-dom";

export default function Button({
  as,
  to,
  href,
  variant = "primary",
  pill = false,
  className = "",
  children,
  ...props
}) {
  const Component = to ? Link : as || (href ? "a" : "button");
  const destinationProps = to ? { to } : href ? { href } : {};
  const classes = [
    "ui-button",
    `ui-button-${variant}`,
    pill ? "ui-button-pill" : "",
    className,
  ].filter(Boolean).join(" ");

  return (
    <Component className={classes} {...destinationProps} {...props}>
      {children}
    </Component>
  );
}