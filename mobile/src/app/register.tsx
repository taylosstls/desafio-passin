import React, { useState, useEffect } from 'react'
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons'
import { View, Image, Alert } from 'react-native'

import { Link, router } from 'expo-router'
import { api } from '@/server/api'
import axios from 'axios'

import { Input } from '@/components/input'
import { Button } from '@/components/button'

import { colors } from '@/styles/colors'
import { useBadgeStore } from '@/store/badge-store'

const EVENT_ID = '9e9bd979-9d10-4915-b339-3786b1634f33'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [nameValid, setNameValid] = useState(true)
  const [emailValid, setEmailValid] = useState(true)
  const [emailTouched, setEmailTouched] = useState(false)
  const [nameTouched, setNameTouched] = useState(false)

  const badgeStore = useBadgeStore()

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const nameRegex = /^[A-Za-zÀ-ú]+\s([A-Za-zÀ-ú]+\s?){1,}$/

  useEffect(() => {
    setNameValid(nameTouched && !name.trim() ? false : true)
  }, [name, nameTouched])
  
  useEffect(() => {
    setEmailValid(emailTouched && !email.trim() ? false : true)
  }, [email, emailTouched])
  

  async function handleRegister() {
    try {
      if (!name.trim() && !email.trim()) {
        setNameValid(false)
        setEmailValid(false)
        return Alert.alert('Inscrição', 'Preencha todos os campos!')
      }
    
      if ((!name.trim() || !nameRegex.test(name.trim())) && (!email.trim() || !emailRegex.test(email.trim()))) {
        setNameValid(false)
        setEmailValid(false)
        return Alert.alert('Inscrição', 'Por favor, insira um nome e um e-mail válidos.')
      }
    
      if ((!name.trim() || !nameRegex.test(name.trim())) && (email.trim() && emailRegex.test(email.trim()))) {
        setNameValid(false)
        setEmailValid(true)
        return Alert.alert('Inscrição', 'Por favor, insira um nome válido.')
      }
    
      if ((name.trim() && nameRegex.test(name.trim())) && (!email.trim() || !emailRegex.test(email.trim()))) {
        setNameValid(true)
        setEmailValid(false)
        return Alert.alert('Inscrição', 'Por favor, insira um e-mail válido.')
      }

      setNameValid(true)
      setEmailValid(true)

      setIsLoading(true)

      const registerResponse = await api.post(`/events/${EVENT_ID}/attendees`, { name: name, email: name })

      if(registerResponse.data.attendeeId) {
        const badgeResponse = await api.get(`/attendees/${registerResponse.data.attendeeId}/badge`)

        badgeStore.save(badgeResponse.data.badge)

        Alert.alert('Inscrição', 'Inscrição realizada com sucesso!', [
          { text: 'OK', onPress: () => router.push('/ticket') }
        ])
      }
    } catch(error) {
      console.log(error)

      if(axios.isAxiosError(error)) {
        if(String(error.response?.data.message).includes('already registered')) {
          return Alert.alert('Ops!', 'Você já está inscrito com este e-mail.')
        }
      }

      Alert.alert('Ops!', 'Não foi possível realizar sua inscrição.')
    } finally {
      setIsLoading(false)
    }
  }  

  return (
    <View className="flex-1 bg-green-500 items-center justify-center">
      <Image source={require('@/assets/logo.png')} className='h-16' resizeMode='contain' />

      <View className='w-3/4 mt-12 gap-3'>
        <Input valid={nameValid}>
          <FontAwesome6 name='user-circle' size={20} color={colors.green[200]} />
          <Input.Field
            placeholder='Nome completo'
            onChangeText={(text) => {
              setName(text)
              setNameTouched(true)
            }}
          />
        </Input>

        <Input valid={emailValid}>
          <MaterialIcons name='alternate-email' size={20} color={colors.green[200]} />
          <Input.Field
            placeholder='E-mail'
            keyboardType='email-address'
            onChangeText={(text) => {
              setEmail(text)
              setEmailTouched(true)
            }}
          />
        </Input>

        <Button title='Realizar inscrição' onPress={handleRegister} isLoading={isLoading}  />

        <Link href='/' className='text-gray-100 text-base font-bold text-center mt-8'>Já possui ingresso?</Link>
      </View>
    </View>
  )
}
