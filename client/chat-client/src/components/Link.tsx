import React from "react";
import { Link as RouterLink, LinkProps } from "react-router-dom";

const Link = ({ children, className, ...rest }: LinkProps) => {
  return (
    <RouterLink
      {...rest}
      className={`test-blue-500 underline underline-offset-2 ${className}`}
    >
      {children}
    </RouterLink>
  );
};

export default Link;
