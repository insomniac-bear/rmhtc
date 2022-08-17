import { useRouter } from 'next/router';
import Link from 'next/link';
import { FC } from 'react';
import { INavLink } from './NavLink.props';

export const NavLink: FC<INavLink> = ({
  href, exact = 'false', children, className, activeClass, ...props
}) => {
  const { pathname } = useRouter();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link href={href} passHref>
      <a
        className={isActive ? `${className} ${activeClass}` : `${className}`}
        {...props}
      >
        {children}
      </a>
    </Link>
  );
};
