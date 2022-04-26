import React, { ReactElement } from 'react';
import { Flex, Heading, SlideFade, ListIcon, ListItem, List, VStack } from '@chakra-ui/react';
import { BiCheckCircle } from 'react-icons/bi';

type DashboardCardProps = {
  title: string;
  listItems: {
    icon?: string;
    text: string;
  }[];
};

const DashboardCard: React.FC<DashboardCardProps> = ({ title, listItems }): ReactElement => {
  return (
    <VStack align="flex-start" h="full" p={{ base: 0, lg: 4 }}>
      <Flex
        bg="gray.50"
        w="full"
        h="full"
        borderRadius="xl"
        px={{ base: 0, lg: 10 }}
        py={{ base: 10, lg: 4 }}>
        <SlideFade in={true} offsetX="-24px" offsetY="0px">
          <VStack spacing={8} align="flex-start">
            <Heading fontSize="3xl" color="primary.100">
              {title}
            </Heading>
            <SlideFade in={true} offsetX="-24px" offsetY="0px">
              <List spacing={4} fontSize="xl">
                {listItems.map((item) => (
                  <Flex key={item.text} alignItems="center">
                    <ListIcon as={BiCheckCircle} color="orange.500" />
                    <ListItem>{item.text}</ListItem>
                  </Flex>
                ))}
              </List>
            </SlideFade>
          </VStack>
        </SlideFade>
      </Flex>
    </VStack>
  );
};

export default DashboardCard;
