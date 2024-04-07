import { useState } from "react"
import { Text, View, ScrollView, TouchableOpacity, Alert, Modal, Share } from "react-native"
import { MotiView } from 'moti'

import { FontAwesome } from "@expo/vector-icons"
import * as ImagePicker from 'expo-image-picker'
import { Redirect } from 'expo-router'

import { Header } from "@/components/header"
import { Credential } from "@/components/credential"
import { colors } from "@/styles/colors"
import { Button } from "@/components/button"
import { QRCode } from "@/components/qrcode"

import { useBadgeStore } from '@/store/badge-store'

export default function Ticket() {
    const [expandQRCode, setExpandQRCode] = useState(false)

    const badgeStore = useBadgeStore()

    async function handleShare() {
        try {
            if(badgeStore.data?.checkInURL) {
                await Share.share({
                    message: badgeStore.data.checkInURL
                })
            }
        } catch (error) {
            console.log(error)
            Alert.alert('Compartilhar', 'Não foi possível compartilhar seu código.')
        }
        
    }

    async function handleSelectImage(){
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 4]
            })

            if (result.canceled) return

            if (result.assets) {
                badgeStore.updateAvatar(result.assets[0].uri)


            }

        } catch(error) {
            console.log(error)
            Alert.alert('Foto', 'Não foi possível selecionar a imagem.')
        }
    }

    if (!badgeStore.data?.checkInURL) return <Redirect href='/' />

    return (
        <View className="flex-1 bg-green-500">
            <Header title="Minha Credencial" />
            <ScrollView className="-mt-28 -z-10" contentContainerClassName="px-8 pb-8" showsVerticalScrollIndicator={false}>
                <Credential data={badgeStore.data} onChangeAvatar={handleSelectImage} onExpandQRCode={() => setExpandQRCode(true)} />

                <MotiView
                from={{ translateY: 0 }}
                animate={{ translateY: 10 }}
                transition={{ loop: true, type: "timing", duration: 700 }}>
                    <FontAwesome name="angle-double-down" size={24} color={colors.gray[300]} className="self-center my-6" />
                </MotiView>
                
                <Text className="text-white text-center font-bold text-2xl mt-4">Compartilhar credencial</Text>
                <Text className="text-white text-center font-regular text-base mt-1 mb-6">Mostre ao mundo que você vai participar do evento {badgeStore.data.eventTitle}!</Text>

                <Button title="Compartilhar" onPress={handleShare} />

                <TouchableOpacity onPress={(() => badgeStore.remove())} activeOpacity={0.7} className="mt-10">
                    <Text className="text-base text-white font-bold text-center">Remover ingresso</Text>
                </TouchableOpacity>
            </ScrollView>

            <Modal visible={expandQRCode} statusBarTranslucent transparent={true} animationType="fade">
                <View className="flex-1 bg-green-500/95 items-center justify-center">
                    <View className="mt-auto mb-auto">
                        <QRCode value="teste" size={300} />
                    </View>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => setExpandQRCode(false)}
                    className="w-1/2 h-14 align-bottom bg-orange-500 items-center justify-center rounded-lg mb-24">
                        <Text className="text-green-500 text-base font-bold uppercase">Fechar</Text>
                    </TouchableOpacity>
                </View>

            </Modal>
        </View>
    )
}