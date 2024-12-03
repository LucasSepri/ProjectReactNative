import * as ImagePicker from 'expo-image-picker';
import React, { useState, useEffect, useCallback, useContext } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    RefreshControl,
    Button,
    ImageBackground,
    ImageStyle
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { api } from '../../../services/api';
import styles from './style';
import ColorPicker, { HueCircular, Panel1, Swatches, OpacitySlider, HueSlider, PreviewText, colorKit } from 'reanimated-color-picker';
import { useFocusEffect } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text';
import { ThemeContext } from 'styled-components';
import { useAddress } from '../../../context/AddressContext';
import Animated from 'react-native-reanimated';
import { DefaultLogoImage } from '../../../components/Logo';
import socket from '../../../services/socket';

import { NavigationProp } from '@react-navigation/native';

const StoreSettingsScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
    const theme = useContext(ThemeContext);
    const { address, setAddress } = useAddress();


    const [errorImagem, setErrorImage] = useState({ logo: false, background: false });
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [isPickerVisible, setPickerVisible] = useState({ open: false, close: false });
    const [selectedDay, setSelectedDay] = useState(null);
    const [timeType, setTimeType] = useState(null);
    const [isPrimary, setIsPrimary] = useState(true);
    const [storeSettings, setStoreSettings] = useState({
        storeName: '',
        phone: '',
        address: '',
        latitude: 0,
        longitude: 0,
        logo: null,
        background: null,
        colors: { primary: '#003bae', secondary: '#1c1542' },
        openingHours: {
            monday: { open: '', close: '' },
            tuesday: { open: '', close: '' },
            wednesday: { open: '', close: '' },
            thursday: { open: '', close: '' },
            friday: { open: '', close: '' },
            saturday: { open: '', close: '' },
            sunday: { open: '', close: '' },
        },
    });
    const [selectedLogo, setSelectedLogo] = useState(`${api.defaults.baseURL}/uploads/${storeSettings.logo}`);
    const [selectedBackground, setSelectedBackground] = useState(`${api.defaults.baseURL}/uploads/${storeSettings.background}`);
    const [hasShownAlert, setHasShownAlert] = useState(false);

    useEffect(() => {
        if (!hasShownAlert && !storeSettings) {
            Alert.alert(
                'Bem-vindo!',
                'Parece que você ainda não configurou sua loja. Adicione as configurações agora para começar a personalizar seu ambiente de vendas.',
                [{ text: 'Configurar' }]
            );
            setHasShownAlert(true); // Marca que o alerta foi exibido
        }
    }, [hasShownAlert]); // Dependência do estado hasShownAlert



    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        try {
            await fetchStoreSettings();
        } catch (error) {
            alert(error);
        } finally {
            setRefreshing(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchStoreSettings();
        }, [])
    );

    const fetchStoreSettings = async () => {
        try {
            const response = await api.get('/store-settings');
            if (response.data) {
                const settings = response.data;
                setStoreSettings({
                    storeName: settings.storeName,
                    phone: settings.phone,
                    address: settings.address,
                    latitude: settings.latitude || 0,
                    longitude: settings.longitude || 0,
                    logo: settings.logo,
                    background: settings.background,
                    colors: JSON.parse(settings.colors).background,
                    openingHours: settings.openingHours ? JSON.parse(settings.openingHours) : {},
                });
                setSelectedBackground(`${api.defaults.baseURL}/uploads/${settings.background}`);
                setSelectedLogo(`${api.defaults.baseURL}/uploads/${settings.logo}`);
                if (settings.address) {
                    setAddress({
                        zip: '',
                        street: '',
                        number: '',
                        neighborhood: '',
                        city: '',
                        state: '',
                        complement: '',
                        referencePoint: '',
                        latitude: settings.latitude,
                        longitude: settings.longitude,
                        address: settings.address,
                    });
                }
            } else {
                setStoreSettings({
                    storeName: '',
                    phone: '',
                    address: '',
                    latitude: 0,
                    longitude: 0,
                    logo: null,
                    background: null,
                    colors: { primary: '#003bae', secondary: '#1c1542' },
                    openingHours: {
                        monday: { open: '', close: '' },
                        tuesday: { open: '', close: '' },
                        wednesday: { open: '', close: '' },
                        thursday: { open: '', close: '' },
                        friday: { open: '', close: '' },
                        saturday: { open: '', close: '' },
                        sunday: { open: '', close: '' },
                    },
                });
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setStoreSettings({
                    storeName: '',
                    phone: '',
                    address: '',
                    latitude: 0,
                    longitude: 0,
                    logo: null,
                    background: null,
                    colors: { primary: '#003bae', secondary: '#1c1542' },
                    openingHours: {
                        monday: { open: '', close: '' },
                        tuesday: { open: '', close: '' },
                        wednesday: { open: '', close: '' },
                        thursday: { open: '', close: '' },
                        friday: { open: '', close: '' },
                        saturday: { open: '', close: '' },
                        sunday: { open: '', close: '' },
                    },
                });
            } else {
                console.error('Erro ao carregar configurações da loja:', error);
            }
        }
    };

    const pickImageAsync = async (type) => {
        let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('É necessário conceder permissão para acessar a galeria de imagens.');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            if (type === 'background') {
                setStoreSettings((prevSettings) => ({
                    ...prevSettings,
                    background: result.assets[0].uri.split('/').pop()
                }));
                setSelectedBackground(result.assets[0].uri);
                setErrorImage({ ...errorImagem, background: false });

            }
            if (type === 'logo') {
                setStoreSettings((prevSettings) => ({
                    ...prevSettings,
                    logo: result.assets[0].uri.split('/').pop()
                }));
                setSelectedLogo(result.assets[0].uri);
                setErrorImage({ ...errorImagem, logo: false });
            }
        } else {
            alert('Você não selecionou nenhuma imagem.');
        }
    };

    const handleTimeChange = (event, selectedDate) => {
        setPickerVisible({ open: false, close: false });  // Fechar ambos os pickers
        if (selectedDate) {
            const formattedTime = selectedDate.toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
            });
            setStoreSettings((prevSettings) => ({
                ...prevSettings,
                openingHours: {
                    ...prevSettings.openingHours,
                    [selectedDay]: {
                        ...prevSettings.openingHours[selectedDay],
                        [timeType]: formattedTime,  // Salvar o horário de acordo com o tipo (open ou close)
                    },
                },
            }));
        }
    };

    const showTimePicker = (day, type) => {
        setSelectedDay(day);
        setTimeType(type);  // Define o tipo (open ou close)
        setPickerVisible((prevState) => ({
            ...prevState,
            [type]: true,  // Mostrar o picker de acordo com o tipo
        }));
    };



    const handleSubmit = async () => {
        const formData = new FormData();
        if (storeSettings.logo && storeSettings.logo !== '' && storeSettings.logo !== null) {
            formData.append('logo', {
                uri: selectedLogo,
                type: 'image/jpeg',
                name: 'logo.jpg',
            } as any);
        }
        console.log(storeSettings.background);

        if (storeSettings.background && storeSettings.background !== '' && storeSettings.background !== null) {
            formData.append('background', {
                uri: selectedBackground,
                type: 'image/jpeg',
                name: 'background.jpg',
            } as any);
        }

        formData.append('storeName', storeSettings.storeName);
        formData.append('phone', storeSettings.phone);
        formData.append('address', storeSettings.address !== '' ? storeSettings.address : address.address);
        // formData.append('address', '');
        formData.append('latitude', String(storeSettings.latitude) !== '0' ? String(storeSettings.latitude) : String(address.latitude) === 'undefined' ? '0' : String(address.latitude));
        formData.append('longitude', String(storeSettings.longitude) !== '0' ? String(storeSettings.longitude) : String(address.longitude) === 'undefined' ? '0' : String(address.longitude));
        formData.append('openingHours', JSON.stringify(storeSettings.openingHours));
        formData.append('colors', JSON.stringify({ background: storeSettings.colors }));

        setLoading(true);
        try {
            await api.post('/store-settings', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            socket.emit('AtualizarLoja');
            fetchStoreSettings();

            Alert.alert('Sucesso', 'Configurações atualizadas com sucesso, reinicie o aplicativo para ver todas as mudanças');
        } catch (error) {
            // console.error('Erro ao salvar configurações:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao atualizar as configurações, tente novamente');
        } finally {
            setLoading(false);
        }
    };

    const deleteAddress = () => {
        storeSettings.address = '';
        setAddress({
            zip: '',
            street: '',
            number: '',
            neighborhood: '',
            city: '',
            state: '',
            complement: '',
            referencePoint: '',
            latitude: undefined,
            longitude: undefined,
            address: '',
        });
    };

    const handleDelete = async () => {
        try {
            await api.delete('/store-settings');
            Alert.alert('Sucesso', 'Configurações da loja deletadas');
            setStoreSettings({
                storeName: '',
                phone: '',
                address: '',
                latitude: 0,
                longitude: 0,
                logo: null,
                background: null,
                colors: { primary: '#003bae', secondary: '#1c1542' },
                openingHours: {
                    monday: { open: '', close: '' },
                    tuesday: { open: '', close: '' },
                    wednesday: { open: '', close: '' },
                    thursday: { open: '', close: '' },
                    friday: { open: '', close: '' },
                    saturday: { open: '', close: '' },
                    sunday: { open: '', close: '' },
                },
            });
            socket.emit('AtualizarLoja');
        } catch (error) {
            console.error('Erro ao deletar configurações:', error);
            Alert.alert('Erro', 'Erro ao deletar configurações da loja');
        }
    };

    const dayNames = {
        monday: 'Segunda-feira',
        tuesday: 'Terça-feira',
        wednesday: 'Quarta-feira',
        thursday: 'Quinta-feira',
        friday: 'Sexta-feira',
        saturday: 'Sábado',
        sunday: 'Domingo',
    };


    // Função para pegar e definir as cores selecionadas
    const handleColorChange = (color, type) => {
        setStoreSettings(prevSettings => ({
            ...prevSettings,
            colors: {
                ...prevSettings.colors,
                [type]: color,
            },
        }));
    };

    return (
        <ScrollView contentContainerStyle={styles(theme).scrollContainer} keyboardShouldPersistTaps="handled"
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >

            <View style={styles(theme).cardContainer}>

                <Text style={styles(theme).title}>Configurações da Loja</Text>


                <View style={styles(theme).imageSection}>
                    {/* Logo */}
                    <View style={styles(theme).imageContainer}>
                        <TouchableOpacity
                            onPress={() => pickImageAsync('logo')}
                            style={[styles(theme).imageWrapper, { backgroundColor: theme.primary }]}
                        >
                            {storeSettings.logo !== null && storeSettings.logo && errorImagem.logo !== true ? (
                                <Image
                                    source={{ uri: selectedLogo }}
                                    style={styles(theme).imagePreviewLogo as ImageStyle}
                                    onError={() => setErrorImage({ ...errorImagem, logo: true })}
                                />
                            ) : (
                                <View style={styles(theme).imagePreviewLogo}>
                                    <Ionicons name="image" size={80} color={theme.white} />
                                </View>
                            )}
                        </TouchableOpacity>
                        <Text style={styles(theme).imageLabel}>Logo</Text>
                    </View>

                    {/* Background */}
                    <View style={styles(theme).imageContainerB}>
                        <TouchableOpacity
                            onPress={() => pickImageAsync('background')}
                            style={[styles(theme).imageWrapperB, { backgroundColor: theme.secondary }]}
                        >
                            {storeSettings.background !== null && storeSettings.background && errorImagem.background !== true ? (
                                <Image
                                    source={{ uri: selectedBackground }}
                                    style={styles(theme).imagePreview as ImageStyle}
                                    onError={() => setErrorImage({ ...errorImagem, background: true })}
                                    blurRadius={3}
                                />
                            ) : (
                                <View style={styles(theme).imagePreview}>
                                    <Ionicons name="image" size={80} color={theme.white} />
                                </View>
                            )}
                        </TouchableOpacity>
                        <Text style={styles(theme).imageLabel}>
                            Background
                        </Text>
                    </View>
                </View>

                {/* Restante do conteúdo do formulário */}
                <View style={styles(theme).inputWrapper}>
                    <Ionicons name="storefront-outline" size={24} color="#000" style={styles(theme).icon} />
                    <TextInput
                        value={storeSettings.storeName}
                        onChangeText={(text) => setStoreSettings({ ...storeSettings, storeName: text })}
                        placeholder="Nome da loja"
                        style={styles(theme).input}
                    />
                </View>

                <View style={styles(theme).inputWrapper}>
                    <Ionicons name="call-outline" size={24} color="#000" style={styles(theme).icon} />
                    <TextInputMask
                        type={'custom'}
                        options={{
                            mask: '(99) 9999-99999',
                        }}
                        placeholder='Telefone'
                        style={styles(theme).input}
                        value={storeSettings.phone}
                        onChangeText={(text) => setStoreSettings({ ...storeSettings, phone: text })}
                        placeholderTextColor={theme.text}
                        keyboardType='phone-pad'
                        maxLength={15}
                    />
                </View>

                <View style={styles(theme).addressContainer}>
                    {address.address || storeSettings.address || !address.address == undefined || !storeSettings.address == undefined ? (
                        <>
                            <TouchableOpacity style={styles(theme).button} onPress={() => navigation.navigate('MapScreen', {
                                address: address.address,
                                latitude: address.latitude,
                                longitude: address.longitude,
                                isVisualize: true,
                            })}>
                                <Ionicons name="location" size={18} color={theme.white} style={styles(theme).icon} />
                                <Text style={styles(theme).addressText}>
                                    {address.address || storeSettings.address}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles(theme).deleteAddress} onPress={() => deleteAddress()}>
                                <Ionicons name="trash" size={18} color={theme.white} />
                            </TouchableOpacity></>
                    ) : (
                        <TouchableOpacity style={styles(theme).button} onPress={() => navigation.navigate('Endereco', { addForUser: false, returnScreen: "Config" })}>
                            <Ionicons name="location" size={18} color={theme.white} style={styles(theme).icon} />
                            <Text style={styles(theme).addressText}>
                                {'Adicionar endereço'}
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>


            <View style={styles(theme).cardContainer}>
                <Text style={styles(theme).title}>Horários de funcionamento</Text>
                {Object.keys(storeSettings.openingHours).map((day) => (
                    <View key={day} style={styles(theme).timeRow}>
                        <Text style={styles(theme).timeLabel}>{dayNames[day]}</Text>

                        <View style={styles(theme).timePickerWrapper}>
                            <TouchableOpacity onPress={() => showTimePicker(day, 'open')} style={styles(theme).timeButton}>
                                <Text style={styles(theme).timeButtonText}>
                                    {storeSettings.openingHours[day]?.open || 'Selecione'}
                                </Text>
                            </TouchableOpacity>
                            <Text style={styles(theme).timeSeparator}>-</Text>
                            <TouchableOpacity onPress={() => showTimePicker(day, 'close')} style={styles(theme).timeButton}>
                                <Text style={styles(theme).timeButtonText}>
                                    {storeSettings.openingHours[day]?.close || 'Selecione'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </View>


            <View style={styles(theme).cardContainer}>
                <Text style={styles(theme).title}>Cores da loja</Text>
                <View style={styles(theme).buttonContainerColor}>
                    <TouchableOpacity onPress={() => setIsPrimary(true)} style={[styles(theme).colorButtonPrimary, { backgroundColor: storeSettings.colors.primary }]}>
                        <Text style={styles(theme).textButtonColors}>
                            {storeSettings.colors.primary}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setIsPrimary(false)} style={[styles(theme).colorButtonSecondary, { backgroundColor: storeSettings.colors.secondary }]}>
                        <Text style={styles(theme).textButtonColors}>
                            {storeSettings.colors.secondary}
                        </Text>
                    </TouchableOpacity>
                </View>
                <ColorPicker
                    value={isPrimary ? storeSettings.colors.primary : storeSettings.colors.secondary}
                    onChange={(color) => handleColorChange(color.hex, isPrimary ? 'primary' : 'secondary')}
                    sliderThickness={25}
                    thumbSize={24}
                    thumbShape='circle'
                    boundedThumb
                >
                    <View style={styles(theme).containerColorPicker} >
                        <View style={styles(theme).colorPicker} >
                            <HueCircular containerStyle={styles(theme).hueContainer} thumbShape='pill' >
                                <Panel1 style={styles(theme).panelStyle} />
                            </HueCircular>
                        </View>
                        <Swatches style={styles(theme).swatchesContainer} swatchStyle={styles(theme).swatchStyle} colors={new Array(8).fill('#fff').map(() => colorKit.randomRgbColor().hex())} />
                    </View>
                </ColorPicker>
            </View>

            {isPickerVisible.open && (
                <DateTimePicker
                    value={new Date()}
                    mode="time"
                    display="default"
                    onChange={handleTimeChange}
                />
            )}
            {isPickerVisible.close && (
                <DateTimePicker
                    value={new Date()}
                    mode="time"
                    display="default"
                    onChange={handleTimeChange}
                />
            )}


            <View style={styles(theme).buttonContainer}>
                <TouchableOpacity onPress={handleSubmit} style={styles(theme).submitButton}>
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles(theme).buttonText}>Salvar Configurações</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity onPress={handleDelete} style={styles(theme).deleteButton}>
                    <Text style={styles(theme).buttonText}>Deletar Configurações</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default StoreSettingsScreen;