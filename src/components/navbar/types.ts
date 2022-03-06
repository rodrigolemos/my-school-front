import { LinkProps } from 'next/link';

export type MobileFullNavProps = {
  isOpen: boolean;
  onToggle: () => void;
};

export type NavbarLinkProps = LinkProps & {
  text: string;
};
