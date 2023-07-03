import React from "react";
import { Link } from "react-router-dom";
import { RoutePath } from "../../../constants/RoutePath";

interface Props {
  logo: string;
  web: string;
}

const FooterHeader = ({ logo, web }: Props) => {
  return (
    <div className="mb-6 md:mb-0">
      <Link to={RoutePath.home} className="flex items-center">
        <img src={logo} className="h-8 mr-3" alt="logo" />
        <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
          {web || ""}
        </span>
      </Link>
    </div>
  );
};

export default FooterHeader;
