import React, { ReactElement } from 'react';
import Link from 'next/link';
import { Flex, Heading, HStack, Icon, SimpleGrid, Text } from '@chakra-ui/react';
import { AiFillLinkedin, AiFillGithub } from 'react-icons/ai';
import { GoMortarBoard } from 'react-icons/go';

const footerStyles = {
  hover: {
    color: 'orange.500',
    transition: 'color 0.1s ease-in-out'
  }
};

const FooterLogo: React.FC = (): ReactElement => {
  return (
    <Link href="/">
      <HStack alignItems="center" fontSize="3xl" cursor="pointer" _hover={footerStyles.hover}>
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

const FooterSocialMedia: React.FC = (): ReactElement => {
  return (
    <HStack cursor="pointer" fontSize="3xl" spacing={8}>
      <a href="https://www.linkedin.com/in/rodrigolemosrl">
        <Icon as={AiFillLinkedin} _hover={footerStyles.hover} />
      </a>
      <a href="https://github.com/rodrigolemos">
        <Icon as={AiFillGithub} _hover={footerStyles.hover} />
      </a>
    </HStack>
  );
};

const Footer: React.FC = () => {
  return (
    <HStack
      as="footer"
      align="flex-start"
      justify="center"
      w="full"
      minH="30vh"
      bg="primary.100"
      color="gray.200">
      <SimpleGrid
        py={8}
        px={[4, 4, 0]}
        w={{ base: 'full', md: '90%', lg: '70%' }}
        columns={{ base: 1, md: 3 }}
        spacing={14}>
        <Flex align="center" justify={{ base: 'center', md: 'flex-start' }}>
          <FooterLogo />
        </Flex>
        <Flex align="center" justify="center">
          <Text>&copy; 2022 Todos os direitos reservados</Text>
        </Flex>
        <Flex align="center" justify={{ base: 'center', md: 'flex-end' }}>
          <FooterSocialMedia />
        </Flex>
      </SimpleGrid>
    </HStack>
  );
};

export default Footer;
