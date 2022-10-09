import React from "react";
import HeaderLink from "./HeaderLink";

const HeaderLinksList: React.FC = () => {
  return (
    <ul className="flex h-full items-stretch">
      <HeaderLink title="Problems" href="/problems" />
    </ul>
  );
};

export default HeaderLinksList;
