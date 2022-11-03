import { Heading, HStack, VStack, Text } from "native-base";
import { UserPhoto } from "./UserPhoto";

export function HomeHeader() {
  return (
    <HStack
      bg='gray.600'
      pt={16}
      pb={5}
      px={8}
      alignItems='center'
    >
      <UserPhoto
        source={{ uri: 'https://github.com/PVGusmao.png' }}
        alt='Imagem do usupario'
        size={16}
        
      />

      <VStack>
        <Text color='gray.100' fontSize='md'>
          Olá
        </Text>

        <Heading color='gray.100'  fontSize='md'>
          Paulo
        </Heading>
      </VStack>
    </HStack>
  )
}