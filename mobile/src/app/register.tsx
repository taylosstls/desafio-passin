import React, { useState } from 'react';
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import { View, Image, Alert } from 'react-native';

import { Link, router } from 'expo-router';

import { Input } from '@/components/input';
import { Button } from '@/components/button';

import { colors } from '@/styles/colors';

export default function Register() {
  const [ name, setName ] = useState('')
  const [ email, setEmail ] = useState('')

  function handleRegister() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if(!name.trim() || !email.trim()) {
      return Alert.alert('Inscrição', 'Preencha todos os campos!')
    } else if (!emailRegex.test(email.trim())) {
      return Alert.alert('Inscrição', 'Por favor, insira um email válido.');
    }

    router.push('/ticket')
  }

  return (
    <View className="flex-1 bg-green-500 items-center justify-center">
      <Image source={require('@/assets/logo.png')} className='h-16' resizeMode='contain' />

      <View className='w-3/4 mt-12 gap-3'>
        <Input>
          <FontAwesome6 name='user-circle' size={20} color={colors.green[200]} />
          <Input.Field placeholder='Nome completo' onChangeText={setName} />
        </Input>
        
        <Input>
          <MaterialIcons name='alternate-email' size={20} color={colors.green[200]} />
          <Input.Field placeholder='E-mail' keyboardType='email-address' onChangeText={setEmail} />
        </Input>

        <Button title='Realizar inscrição' onPress={handleRegister} />

        <Link href='/' className='text-gray-100 text-base font-bold text-center mt-8'>Já possui ingresso?</Link>
      </View>

    </View>
  );
}