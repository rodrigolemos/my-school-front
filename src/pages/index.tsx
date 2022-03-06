import React, { ReactElement } from 'react';
import { FaUserGraduate, FaUsersCog, FaUserTie } from 'react-icons/fa';
import { Button, Flex, Heading, Icon, SimpleGrid, SlideFade, Text, VStack } from '@chakra-ui/react';
import PublicLayout from '../components/public-layout';
import HomeFeatures from '../components/home-features';

type SectionProps = {
  children: ReactElement | ReactElement[];
};

const Section: React.FC<SectionProps> = ({ children }) => {
  return (
    <VStack
      align="flex-start"
      justify="center"
      p={[8, 8, 0]}
      w={{ base: 'full', md: '90%', lg: '70%' }}
      minH="90vh">
      {children}
    </VStack>
  );
};

interface FeatureProps {
  title: string;
  text: string;
  icon: ReactElement;
}

const Feature = ({ title, text, icon }: FeatureProps) => {
  return (
    <VStack spacing={6}>
      <Flex
        w={20}
        h={20}
        align="center"
        justify="center"
        color="white"
        rounded="full"
        bg="orange.500">
        {icon}
      </Flex>
      <Text fontSize="2xl" fontWeight="bold">
        {title}
      </Text>
      <Text fontSize="lg" color="gray.600">
        {text}
      </Text>
    </VStack>
  );
};

export default function Home(): ReactElement {
  return (
    <PublicLayout>
      <Flex
        w="full"
        justify="center"
        bgGradient="linear-gradient(rgba(0, 0, 0, 0.61), rgba(0, 0, 0, 0.61)), url('images/bookshelf-1.jpg')"
        backgroundSize="cover">
        <Section>
          <SlideFade in={true} offsetY="-24px">
            <VStack align="flex-start" spacing={8} color="white">
              <VStack align="flex-start" spacing={3}>
                <Heading fontSize={['5xl', '7xl']}>My School</Heading>
                <Text fontSize={['2xl', '4xl']}>Compartilhe seu conhecimento com o mundo.</Text>
              </VStack>
              <Button variant="outline" size="lg" _hover={{ color: 'orange.500', bg: 'white' }}>
                Saiba mais
              </Button>
            </VStack>
          </SlideFade>
        </Section>
      </Flex>
      <Section>
        <HomeFeatures />
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={12} mt={16}>
          <Feature
            icon={<Icon as={FaUserGraduate} w={10} h={10} />}
            title={'Lifetime Support'}
            text={
              'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
            }
          />
          <Feature
            icon={<Icon as={FaUsersCog} w={10} h={10} />}
            title={'Lifetime Support'}
            text={
              'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
            }
          />
          <Feature
            icon={<Icon as={FaUserTie} w={10} h={10} />}
            title={'Lifetime Support'}
            text={
              'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
            }
          />
        </SimpleGrid>
      </Section>
      {/* <Motivation>
        <a id="motivation" className="navigation" />
        <SectionName>Uma proposta simples</SectionName>
        <ContentWrapper>
          <Card>
            <div className="image">
              <FaUserGraduate />
            </div>
            <div className="content">
              <div className="title">PARA ALUNOS</div>
              <p>
                Faça seu cadastro e matricule-se nos cursos ofertados, assista as aulas disponíveis
                na plataforma e contribua para a comunidade.
              </p>
            </div>
          </Card>
          <Card>
            <div className="image">
              <FaUserTie />
            </div>
            <div className="content">
              <div className="title">PARA PROFESSORES</div>
              <p>
                Crie aulas e questionários, proponha temas de discussão, avalie seus alunos e
                colabore com o crescimento da plataforma.
              </p>
            </div>
          </Card>
          <Card>
            <div className="image">
              <FaUsersCog />
            </div>
            <div className="content">
              <div className="title">PARA ADMINISTRADORES</div>
              <p>
                Gerencie os recursos da plataforma. Inclua, altere ou exclua cursos, alunos,
                professores e matrículas; Revise e aprove solicitações.
              </p>
            </div>
          </Card>
        </ContentWrapper>
        <SectionAdditional>De quem desenvolve para quem se desenvolve.</SectionAdditional>
      </Motivation> */}
    </PublicLayout>
  );
}
