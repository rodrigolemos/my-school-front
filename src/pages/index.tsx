import React, { ReactElement, useRef } from 'react';
import { Button, Flex, Heading, SlideFade, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import PublicLayout from '../components/public-layout';
import AppIntroduction from '../components/site/app-introduction';
import AppFeatures from '../components/site/app-features';

type SectionProps = {
  children: ReactElement | ReactElement[];
  id?: string;
};

const Section: React.FC<SectionProps> = ({ children, id }) => {
  return (
    <VStack
      id={id}
      align="flex-start"
      justify="center"
      p={[8, 8, 0]}
      w={{ base: 'full', md: '90%', lg: '70%' }}
      minH="90vh"
      spacing={20}>
      {children}
    </VStack>
  );
};

export default function Home(): ReactElement {
  const featuresRef = useRef<HTMLDivElement>(null);
  const scrollToFeatures = () => {
    featuresRef.current.scrollIntoView({
      block: 'nearest',
      behavior: 'smooth'
    });
  };

  return (
    <PublicLayout>
      <Flex
        w="full"
        justify="center"
        bgGradient="linear-gradient(rgba(0, 0, 0, 0.61), rgba(0, 0, 0, 0.61)), url('images/bookshelf-1.jpg')"
        backgroundSize="cover">
        <Section>
          <SlideFade in={true} offsetX="-24px" offsetY="0px">
            <VStack align="flex-start" spacing={8} color="white">
              <VStack align="flex-start" spacing={3}>
                <Heading fontSize={['5xl', '7xl']}>My School</Heading>
                <Text fontSize={['2xl', '4xl']}>Compartilhe seu conhecimento com o mundo.</Text>
              </VStack>
              <Button
                onClick={scrollToFeatures}
                variant="outline"
                size="lg"
                _hover={{ color: 'orange.500', bg: 'white' }}>
                Saiba mais
              </Button>
            </VStack>
          </SlideFade>
        </Section>
      </Flex>
      <Section>
        <AppIntroduction linkRef={featuresRef} />
        <AppFeatures />
        <Link href="/course-list">
          <Button variant="solid" size="lg" colorScheme="orange" alignSelf="center">
            Conheça nossos cursos
          </Button>
        </Link>
      </Section>
    </PublicLayout>
  );
}
