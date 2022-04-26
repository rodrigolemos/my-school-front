import React, { ReactText, ReactNode } from 'react';
import Link from 'next/link';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link as ChakraLink,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Heading
} from '@chakra-ui/react';
import {
  FiHome,
  FiList,
  FiCompass,
  FiTv,
  FiSettings,
  FiUsers,
  FiMenu,
  FiChevronDown
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import { NavbarLogoAuth } from '../navbar';
import { useAuth } from '../../hooks/auth';
import AuthTaskbar from '../auth-taskbar';

interface LinkItemProps {
  isAdmin: boolean;
  href: string;
  name: string;
  icon: IconType;
}

const LinkItems: Array<LinkItemProps> = [
  { isAdmin: false, href: '/', name: 'Explorar', icon: FiCompass },
  { isAdmin: false, href: '/dashboard', name: 'Home', icon: FiHome },
  { isAdmin: false, href: '/classes', name: 'Aulas', icon: FiTv },
  { isAdmin: true, href: '/courses-new', name: 'Cursos', icon: FiList },
  { isAdmin: true, href: '/users', name: 'Usuários', icon: FiUsers },
  { isAdmin: true, href: '/enrollments', name: 'Matrículas', icon: FiSettings }
];

interface AuthLayoutProps {
  children: ReactNode;
  userName: string;
  isAdmin: boolean;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, userName, isAdmin }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        isAdmin={isAdmin}
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent isAdmin={isAdmin} onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} userName={userName} isAdmin={isAdmin} />
      <Box ml={{ base: 0, md: 60 }}>
        <SimpleGrid columns={{ base: 1, md: 2 }} templateColumns={{ base: '100%', md: '70% 30%' }}>
          <Flex bg="gray.50" minH="92vh" p={4} overflowY="auto">
            <VStack spacing={4} align="flex-start" w="full">
              <AuthGreeting name={userName} />
              {children}
            </VStack>
          </Flex>
          <AuthTaskbar isAdmin={isAdmin} />
        </SimpleGrid>
      </Box>
    </Box>
  );
};

interface SidebarProps extends BoxProps {
  onClose: () => void;
  isAdmin: boolean;
}

const SidebarContent = ({ onClose, isAdmin, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('primary.100', 'primary.100')}
      color={useColorModeValue('gray.200', 'gray.200')}
      borderRight="1px"
      borderRightColor={useColorModeValue('primary.100', 'primary.100')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <NavbarLogoAuth />
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map(
        (link) =>
          !(link.isAdmin && !isAdmin) && (
            <NavItem key={link.name} icon={link.icon} href={link.href}>
              {link.name}
            </NavItem>
          )
      )}
    </Box>
  );
};

interface AuthGreetingProps {
  name: string;
}

const AuthGreeting = ({ name }: AuthGreetingProps) => {
  return (
    <>
      <Heading>Bem vindo novamente, {name}!</Heading>
      <Text color="gray.500" fontSize="2xl">
        Essa é sua área logada. Pronto(a) para sua próxima tarefa?
      </Text>
    </>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  href: string;
  children: ReactText;
}

const NavItem = ({ icon, href, children, ...rest }: NavItemProps) => {
  return (
    <Link href={href}>
      <ChakraLink style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: 'orange.500',
            color: 'white'
          }}
          {...rest}>
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: 'white'
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </ChakraLink>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
  userName?: string;
  isAdmin?: boolean;
}

const MobileNav = ({ onOpen, userName, isAdmin, ...rest }: MobileProps) => {
  const { logOut } = useAuth();

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height={{ base: '10vh', md: '8vh' }}
      alignItems="center"
      bg={useColorModeValue('primary.100', 'gray.900')}
      color={useColorModeValue('gray.200', 'gray.200')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Flex display={{ base: 'flex', md: 'none' }}>
        <NavbarLogoAuth />
      </Flex>

      <HStack spacing={{ base: '0', md: '6' }}>
        <Flex alignItems="center">
          <Menu>
            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
              <HStack spacing={6}>
                <Avatar size="sm" name={userName} bg="orange.500" color="white" />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm" color={useColorModeValue('white', 'white')}>
                    {userName}
                  </Text>
                  {isAdmin && (
                    <Text fontSize="xs" color={useColorModeValue('gray.300', 'gray.300')}>
                      Admin
                    </Text>
                  )}
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <Icon as={FiChevronDown} color={useColorModeValue('gray.300', 'gray.300')} />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              color={useColorModeValue('primary.100', 'primary.100')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}>
              <MenuItem>Configurações</MenuItem>
              <MenuItem onClick={logOut}>Sair</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
