import React, { ReactElement } from 'react';
import { Box, SimpleGrid } from '@chakra-ui/react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';

interface IPublicLayout {
  children: ReactElement | ReactElement[];
}

const PublicLayout: React.FC<IPublicLayout> = ({ children }): ReactElement => {
  return (
    <SimpleGrid columns={1} w="full">
      <Navbar />
      <Box as="main" pt="10vh">
        {children}
      </Box>
      <Footer />
    </SimpleGrid>
  );
};

export default PublicLayout;
