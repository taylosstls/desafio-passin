import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { View, Image } from 'react-native';

import { Link } from 'expo-router';

import { Input } from '@/components/input';
import { Button } from '@/components/button';

import { colors } from '@/styles/colors';

export default function Home() {
  return (
    <View className="flex-1 bg-green-500 items-center justify-center">
      <Image source={require('@/assets/logo.png')} className='h-16' resizeMode='contain' />

      <View className='w-full mt-12 gap-3'>
        <Input>
          <MaterialCommunityIcons name='ticket-confirmation-outline' size={20} color={colors.green[200]} />
          <Input.Field placeholder='Código do ingresso' />
        </Input>

        <Button title='Acessar credencial' onPress={() => {}} />

        <Link href='/register' className='text-gray-100 text-base font-bold text-center mt-8'>Ainda não possui ingresso?</Link>
      </View>

    </View>
  );
}