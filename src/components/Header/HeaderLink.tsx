import React from "react";
import Link from "next/link";

export interface HeaderLinkProps {
  title: string;
  href: string;
}

const HeaderLink: React.FC<HeaderLinkProps> = ({ title, href }) => {
  return (
    <li className="flex items-stretch px-2 text-neutral-100">
      <Link href={href}>
        <a className="flex items-center">{title}</a>
      </Link>
    </li>
  );
};

export default HeaderLink;
