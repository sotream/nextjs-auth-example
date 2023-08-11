import React from 'react';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'classnames';

export interface INavLinkProps extends LinkProps {
  children: React.ReactElement | string;
  activeClassName: string;
  href: string;
}

export const NavLink = ({ children, href, activeClassName }: INavLinkProps) => {
  const router = useRouter();

  return (
    <Link 
      href = { href }
      className={clsx({ [ activeClassName ]: router.pathname === href })}
    >
      { children }
    </Link>
  );
};
