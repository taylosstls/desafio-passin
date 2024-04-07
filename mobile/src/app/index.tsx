import React, { useState, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Image, Alert } from 'react-native';

import { Link } from 'expo-router';

import { Input } from '@/components/input';
import { Button } from '@/components/button';

import { colors } from '@/styles/colors';

export default function Home() {
  const [code, setCode] = useState('');
  const [codeValid, setCodeValid] = useState(true);
  const [codeTouched, setCodeTouched] = useState(false);

  useEffect(() => {
    setCodeValid(codeTouched && !code.trim() ? false : true);
  }, [code, codeTouched]);
  

  function handleAccessCredential() {
    if (!code.trim()) {
      setCodeValid(false);
      return Alert.alert('Credencial', "Informe o código do ingresso!");
    }
    setCodeValid(true);
  }

  return (
    <View className="flex-1 bg-green-500 items-center justify-center">
      <Image source={require('@/assets/logo.png')} className='h-16' resizeMode='contain' />

      <View className='w-3/4 mt-12 gap-3'>
        <Input valid={codeValid}>
          <MaterialCommunityIcons name='ticket-confirmation-outline' size={20} color={colors.green[200]} />
          <Input.Field
            placeholder='Código do ingresso'
            onChangeText={(text) => {
              setCode(text)
              setCodeTouched(true)
            }}
          />
        </Input>

        <Button title='Acessar credencial' onPress={handleAccessCredential} />

        <Link href='/register' className='text-gray-100 text-base font-bold text-center mt-8'>Ainda não possui ingresso?</Link>
      </View>
    </View>
  );
}
