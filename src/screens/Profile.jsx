import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import { Center, ScrollView, Text, VStack, Skeleton, Heading, useToast } from 'native-base';

import { ScreenHeader } from '@components/ScreenHeader';
import { UserPhoto } from '@components/UserPhoto';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

const PHOTO_SIZE = 33;

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState('https://github.com/PVGusmao.png');

  const toast = useToast();

  async function handleUserPhotoSelect() {
      setPhotoIsLoading(true)
      try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if(photoSelected.cancelled) {
        return;
      }

      if (photoSelected.uri) {
        const photoInfo = await FileSystem.getInfoAsync(photoSelected.uri);

        if (photoInfo.size && photoInfo.size / 1024 / 1024 > 3) {
          return toast.show({
            title: 'Essa imagem é muito grande. Escolha uma de atpe 3MB.',
            placement: 'top',
            bgColor: 'red.500',
          });
        }
        setUserPhoto(photoSelected.uri);
      }
  
    } catch(error) {
      throw error;
    } finally {
      setPhotoIsLoading(false)
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil"/>

      <ScrollView>
        <Center mt={6} px={10}>
          { photoIsLoading ?
            <Skeleton
            speed={2}
            w={PHOTO_SIZE}
            h={PHOTO_SIZE}
            rounded='full'
            startColor='gray.500'
            endColor='gray.400'
          /> :
          <UserPhoto
            source={{ uri: userPhoto }}
            alt='Imagem de Perfil'
            size={PHOTO_SIZE}
          />}

          <TouchableOpacity
            onPress={handleUserPhotoSelect}
          >
            <Text
              color='green.500'
              fontWeight='bold'
              fontSize='md'
              mt={2}
              mb={8}
            >
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Input
            bg='gray.600'
            placeholder='Nome'
          />

          <Input
            bg='gray.600'
            placeholder='E-mail'
            isDisabled
          />
        </Center>

        <VStack px={10} mt={12} mb={9}>
          <Heading fontFamily='heading' color='gray.200' fontSize='md' mb={2}>
            Alterar Senha
          </Heading>

          <Input
            bg='gray.600'
            placeholder='Senha antiga'
            secureTextEntry
          />

          <Input
            bg='gray.600'
            placeholder='Nova Senha'
            secureTextEntry
          />

          <Input
            bg='gray.600'
            placeholder='Confirme Nova Senha'
            secureTextEntry
          />

          <Button
            title='Atualizar'
            mt={4}
          />
        </VStack>
      </ScrollView>
    </VStack>
  );
}