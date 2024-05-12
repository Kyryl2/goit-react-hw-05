import clsx from "clsx";

export const buildLinkClass = ({ isActive }) => {
  return clsx(_, isActive && _);
};
