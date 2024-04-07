import { colors } from '@/styles/colors'
import React, { ReactNode } from 'react'
import { TextInput, View, TextInputProps } from 'react-native'

interface InputProps {
  children: ReactNode,
  valid: boolean
}

function Input({ children, valid }: InputProps) {
  return (
    <View
      className={`w-full h-14 flex-row items-center gap-3 p-3 rounded-lg border transition-all ${
        valid ? 'border-green-400' : 'border-red-500'
      }`}>
      {children}
    </View>
  )
}

function Field({ ...rest }: TextInputProps) {
  return (
    <TextInput
      className="flex-1 text-white text-base font-regular"
      placeholderTextColor={colors.gray[200]}
      {...rest}
    />
  )
}

Input.Field = Field

export { Input }