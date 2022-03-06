import React, { ReactElement } from 'react';
import Link from 'next/link';
import { AiOutlineClose } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';
import { GoMortarBoard } from 'react-icons/go';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Heading,
  HStack,
  Icon,
  IconButton,
  VStack,
  useDisclosure
} from '@chakra-ui/react';
import { MobileFullNavProps, NavbarLinkProps } from './types';

const navbarStyles = {
  hover: {
    color: 'orange.500',
    transition: 'color 0.1s ease-in-out'
  }
};

const NavbarLink: React.FC<NavbarLinkProps> = ({ href, text }): ReactElement => {
  return (
    <Link href={href}>
      <Heading fontSize="xl" fontWeight="medium" cursor="pointer" _hover={navbarStyles.hover}>
        {text}
      </Heading>
    </Link>
  );
};

const NavbarLinks: React.FC = () => {
  return (
    <>
      <NavbarLink href="/course-list" text="Cursos" />
      <NavbarLink href="/create-profile" text="Criar Perfil" />
      <NavbarLink href="/login" text="Login" />
    </>
  );
};

const NavbarLogo: React.FC = (): ReactElement => {
  return (
    <Link href="/">
      <HStack alignItems="center" fontSize="3xl" cursor="pointer" _hover={navbarStyles.hover}>
        <>
          <Icon as={GoMortarBoard} mr={2} />
          <Heading as="h1" fontSize="3xl">
            My School
          </Heading>
        </>
      </HStack>
    </Link>
  );
};

const OpenMobileNavButton: React.FC<MobileFullNavProps> = ({ isOpen, onToggle }): ReactElement => {
  return (
    <HStack display={['flex', 'flex', 'none']}>
      <IconButton
        onClick={onToggle}
        icon={isOpen ? <Icon as={AiOutlineClose} /> : <Icon as={GiHamburgerMenu} />}
        variant="unstyled"
        pt={1}
        aria-label="Toggle Navigation"
      />
    </HStack>
  );
};

const DesktopNav: React.FC = (): ReactElement => {
  return (
    <HStack spacing={10} display={{ base: 'none', md: 'flex' }}>
      <NavbarLinks />
    </HStack>
  );
};

const MobileFullNav: React.FC<MobileFullNavProps> = ({ isOpen, onToggle }): ReactElement => {
  return (
    <Drawer placement="right" isOpen={isOpen} onClose={onToggle}>
      <DrawerOverlay />
      <DrawerContent bg="primary.100" color="gray.200">
        <DrawerHeader>
          <NavbarLogo />
        </DrawerHeader>
        <DrawerBody>
          <VStack spacing={4} align="flex-start">
            <NavbarLinks />
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

const Navbar: React.FC = (): ReactElement => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <HStack
      as="nav"
      justify="center"
      minH="10vh"
      w="full"
      zIndex="10"
      position="fixed"
      bg="primary.100"
      color="gray.200">
      <HStack
        w={{ base: 'full', md: '90%', lg: '70%' }}
        h="full"
        justify="space-between"
        px={[4, 4, 0]}>
        <NavbarLogo />
        <DesktopNav />
        <OpenMobileNavButton isOpen={isOpen} onToggle={onToggle} />
        <MobileFullNav isOpen={isOpen} onToggle={onToggle} />
      </HStack>
    </HStack>
  );
};

export default Navbar;
