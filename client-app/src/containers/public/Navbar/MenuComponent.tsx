import React from "react";
import { observer } from "mobx-react-lite";
import { router } from "../../../routes/Routes";

export interface MenuComponentProps {
  label?: string;
  route?: string | null;
  onClick?: () => void;
  children?: any;
}

const MenuComponent = ({
  label,
  route,
  children,
  ...rest
}: MenuComponentProps) => {
  return (
    <li
      onClick={() => route && router.navigate(route!)}
      {...rest}
      className={
        "block py-2 pl-3 text-base pr-4 text-gray-700 rounded hover:bg-gray-200 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 cursor-pointer"
      }
    >
      {label}
      {children}
    </li>
  );
};

export default observer(MenuComponent);
