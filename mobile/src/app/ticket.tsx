import { useEffect, useState } from "react";
import { Text, View, ScrollView, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';

import { Header } from "@/components/header";
import { Credential } from "@/components/credential";
import { colors } from "@/styles/colors";
import { Button } from "@/components/button";


export default function Ticket() {
    const [image, setImage] = useState('')

    async function handleSelectImage(){
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 4]
            })

            if (result.canceled) return

            if (result.assets) {
                const selectedImageUri = result.assets[0].uri
                setImage(selectedImageUri)
                await AsyncStorage.setItem('selectedImageUri', selectedImageUri)
            }

        } catch(error) {
            console.log(error)
            Alert.alert('Foto', 'Não foi possível selecionar a imagem.')
        }
    }

    useEffect(() => {
        const retrieveImage = async () => {
          try {
            const storedImageUri = await AsyncStorage.getItem('selectedImageUri');
            if (storedImageUri) setImage(storedImageUri)
          } catch (error) {
            console.log(error)
            Alert.alert('Erro', 'Não foi possível carregar a imagem previamente selecionada.')
          }
        }
    
        retrieveImage()
      }, []);

    return (
        <View className="flex-1 bg-green-500">
            <Header title="Minha Credencial" />
            <ScrollView className="-mt-28 -z-10" contentContainerClassName="px-8 pb-8" showsVerticalScrollIndicator={false}>
                <Credential image={image} onChangeAvatar={handleSelectImage} />

                <FontAwesome name="angle-double-down" size={24} color={colors.gray[300]} className="self-center my-6" />
                
                <Text className="text-white text-center font-bold text-2xl mt-4">Compartilhar credencial</Text>
                <Text className="text-white text-center font-regular text-base mt-1 mb-6">Mostre ao mundo que você vai participar do Unite Summit!</Text>

                <Button title="Compartilhar" />

                <TouchableOpacity activeOpacity={0.7} className="mt-10">
                    <Text className="text-base text-white font-bold text-center">Remover ingresso</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}