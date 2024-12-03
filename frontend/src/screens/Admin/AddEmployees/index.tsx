import React, { useContext, useEffect, useState } from 'react';
import { View, ScrollView, Alert, TouchableOpacity, Image, TextInput, Button, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Checkbox from 'expo-checkbox';
import { api } from '../../../services/api';
import { TextInputMask } from 'react-native-masked-text';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './style';
import { StackScreenProps } from '@react-navigation/stack';
import { StackParamList } from '../../../routes/admin.routes';
import { DefaultProfileAddImage } from '../../../components/Profile';
import { ThemeContext, useTheme } from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons';

const dayNames = {
    monday: 'Segunda-feira',
    tuesday: 'Terça-feira',
    wednesday: 'Quarta-feira',
    thursday: 'Quinta-feira',
    friday: 'Sexta-feira',
    saturday: 'Sábado',
    sunday: 'Domingo',
};
type Props = StackScreenProps<StackParamList, 'EmployeeDetail'>;

type DaysOff = {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
};


type WorkHours = {
    monday: { start: string; end: string };
    tuesday: { start: string; end: string };
    wednesday: { start: string; end: string };
    thursday: { start: string; end: string };
    friday: { start: string; end: string };
    saturday: { start: string; end: string };
    sunday: { start: string; end: string };
};



const EmployeeDetail: React.FC<Props> = ({ navigation, route }) => {
    const theme = useTheme() as {
        primary: string;
        secondary: string;
        border: string;
        background: string;
        text: string;
        white: string;
        danger: string;
    };
    const { id } = route.params || { id: 0 };
    const [loading, setLoading] = useState(false);
    const [employeeImage, setEmployeeImage] = useState<string | undefined>('');
    const [name, setName] = useState('');
    const [rg, setRg] = useState('');
    const [cpf, setCpf] = useState('');
    const [workCard, setWorkCard] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [hiringDate, setHiringDate] = useState('');
    const [salary, setSalary] = useState('');
    const [uniformSize, setUniformSize] = useState('');
    const [vacationStart, setVacationStart] = useState('');
    const [vacationEnd, setVacationEnd] = useState('');
    const [daysOff, setDaysOff] = useState<DaysOff>({
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
    });

    const [workHours, setWorkHours] = useState<WorkHours>({
        monday: { start: '', end: '' },
        tuesday: { start: '', end: '' },
        wednesday: { start: '', end: '' },
        thursday: { start: '', end: '' },
        friday: { start: '', end: '' },
        saturday: { start: '', end: '' },
        sunday: { start: '', end: '' },
    });

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDateField, setSelectedDateField] = useState<'hiringDate' | 'vacationStart' | 'vacationEnd' | null>(null);
    const [selectedDay, setSelectedDay] = useState<keyof typeof workHours | null>(null);
    const [selectedTimeField, setSelectedTimeField] = useState<'start' | 'end' | null>(null);
    const [showTimePicker, setShowTimePicker] = useState(false);


    useEffect(() => {
        if (id) {
            setLoading(true);
            api.get(`/employees/${id}`)
                .then((response) => {
                    const data = response.data;
                    setEmployeeImage(data.employeeImage && `${api.defaults.baseURL}${data.employeeImage}`);
                    setName(data.name);
                    setRg(data.rg);
                    setCpf(data.cpf);
                    setWorkCard(data.workCard);
                    setAddress(data.address);
                    setPhone(data.phone);
                    setEmail(data.email);
                    setHiringDate(data.hiringDate.split('T')[0]);
                    setSalary(data.salary.toString());
                    setUniformSize(data.uniformSize);
                    setVacationStart(JSON.parse(data.vacation)?.start);
                    setVacationEnd(JSON.parse(data.vacation)?.end);

                    setDaysOff(JSON.parse(data.dayOff) || {});

                    setWorkHours(JSON.parse(data.workingHours) || {});
                })
                .catch((error) => {
                    Alert.alert('Erro', 'Falha ao carregar os dados do funcionário.');
                })
                .finally(() => setLoading(false));
        }
    }, [id]);



    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setEmployeeImage(result.assets[0].uri);
        }
    };

    const handleDateChange = (event: any, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || new Date();
        setShowDatePicker(false);

        if (selectedDateField) {
            const formattedDate = currentDate.toISOString().split('T')[0];
            if (selectedDateField === 'hiringDate') setHiringDate(formattedDate);
            if (selectedDateField === 'vacationStart') setVacationStart(formattedDate);
            if (selectedDateField === 'vacationEnd') setVacationEnd(formattedDate);
        }
    };

    const handleTimeChange = (event: any, selectedDate: Date | undefined) => {
        if (selectedDate) {
            const formattedTime = selectedDate.toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
            });

            if (selectedDay && selectedTimeField) {
                setWorkHours((prevWorkHours) => ({
                    ...prevWorkHours,
                    [selectedDay]: {
                        ...prevWorkHours[selectedDay],
                        [selectedTimeField]: formattedTime,
                    },
                }));
            }
        }

        setShowTimePicker(false);
    };


    const handleSubmit = async () => {
        const formData = new FormData();

        formData.append('name', name);
        formData.append('rg', rg);
        formData.append('cpf', cpf);
        formData.append('workCard', workCard);
        formData.append('address', address);
        formData.append('phone', phone);
        formData.append('email', email);
        formData.append('hiringDate', new Date(hiringDate).toISOString());
        formData.append('salary', parseFloat(salary.replace("R$", "").replace(",", "").trim()).toString());
        formData.append('uniformSize', uniformSize);
        formData.append('vacation', JSON.stringify({ start: vacationStart, end: vacationEnd }));

        // Adicionar horas de trabalho e dias de folga
        formData.append('workingHours', JSON.stringify(workHours));
        formData.append('dayOff', JSON.stringify(daysOff));

        // Adicionar imagem do empregado se disponível
        if (employeeImage) {
            const image = {
                uri: employeeImage,
                name: 'employeeImage.jpg',
                type: 'image/jpeg', // ou image/png dependendo do tipo de arquivo
            } as any;
            formData.append('employeeImage', image);
        }

        try {
            console.log('formData', formData);
            setLoading(true);

            if (id) {
                // Atualizar empregado existente
                await api.put(`/employees/${id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                Alert.alert('Sucesso', 'Empregado atualizado com sucesso!');
            } else {
                // Criar novo empregado
                await api.post('/employees', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                Alert.alert('Sucesso', 'Empregado registrado com sucesso!');
            }

            navigation.goBack();
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Falha ao enviar o formulário.');
        } finally {
            setLoading(false);
        }
    };




    const handleWorkHourSelect = (day: keyof typeof workHours, field: 'start' | 'end') => {
        setSelectedDay(day);
        setSelectedTimeField(field);
        setShowTimePicker(true);
    };


    const handleDeleteEmployee = async (id: number) => {
        try {
            await api.delete(`/employees/${id}`);
            Alert.alert('Sucesso', 'O funcionário foi excluído com sucesso.');
            navigation.goBack();
        } catch (err) {
            Alert.alert('Erro', 'Falha ao excluir o funcionário. Tente novamente mais tarde.');
            console.error(err);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles(theme).scrollView}>
            <Text style={styles(theme).title}>Cadastrar Funcionário</Text>

            {employeeImage ? (
                <TouchableOpacity onPress={pickImageAsync} style={styles(theme).imagePicker}>
                    <Image source={{ uri: employeeImage }} style={styles(theme).image} />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={pickImageAsync} style={[styles(theme).imagePicker, styles(theme).imagePlaceholder]}>
                    <DefaultProfileAddImage style={styles(theme).defaultProfileIcon} theme={theme} />
                    <Text style={styles(theme).imageText}>Adicionar Foto</Text>
                </TouchableOpacity>
            )}

            <View style={styles(theme).inputWrapper}>
                <Icon name="person" size={20} style={styles(theme).icon} />
                <TextInput
                    placeholder="Nome"
                    value={name}
                    onChangeText={setName}
                    style={styles(theme).input2}
                />
            </View>

            <View style={styles(theme).inputWrapper}>
                <Icon name="id-card" size={20} style={styles(theme).icon} />
                <TextInputMask
                    placeholder="RG"
                    type="custom"
                    options={{ mask: '99.999.999-9' }}
                    value={rg}
                    onChangeText={setRg}
                    style={styles(theme).input2}
                    keyboardType='numeric'
                />
            </View>

            <View style={styles(theme).inputWrapper}>
                <Icon name="id-card" size={20} style={styles(theme).icon} />
                <TextInputMask
                    placeholder="CPF"
                    type="custom"
                    options={{ mask: '999.999.999-99' }}
                    value={cpf}
                    onChangeText={setCpf}
                    style={styles(theme).input2}
                    keyboardType='numeric'
                />
            </View>

            <View style={styles(theme).inputWrapper}>
                <Icon name="call" size={20} style={styles(theme).icon} />
                <TextInputMask
                    placeholder="Telefone"
                    type="custom"
                    options={{ mask: '(99) 99999-9999' }}
                    value={phone}
                    onChangeText={setPhone}
                    style={styles(theme).input2}
                    keyboardType='phone-pad'
                />
            </View>

            <View style={styles(theme).inputWrapper}>
                <Icon name="mail" size={20} style={styles(theme).icon} />
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    style={styles(theme).input2}
                    keyboardType="email-address"
                />
            </View>

            <View style={styles(theme).inputWrapper}>
                <Icon name="briefcase" size={20} style={styles(theme).icon} />
                <TextInputMask
                    placeholder="Carteira de Trabalho"
                    type="custom"
                    options={{ mask: '999.99999.99-9' }}
                    value={workCard}
                    onChangeText={setWorkCard}
                    style={styles(theme).input2}
                    keyboardType="numeric"
                />
            </View>

            <View style={styles(theme).inputWrapper}>
                <Icon name="home" size={20} style={styles(theme).icon} />
                <TextInput
                    placeholder='Endereço'
                    value={address}
                    onChangeText={setAddress}
                    style={styles(theme).input2}
                />
            </View>

            <TouchableOpacity onPress={() => { setShowDatePicker(true); setSelectedDateField('hiringDate'); }} style={styles(theme).inputWrapper}>
                <Icon name="calendar" size={20} style={styles(theme).icon} />
                <TextInput
                    placeholder="Data de Contratação"
                    value={hiringDate}
                    editable={false}
                    style={styles(theme).input2}
                />
            </TouchableOpacity>

            <View style={styles(theme).inputWrapper}>
                <Icon name="cash" size={20} style={styles(theme).icon} />
                <TextInputMask
                    type={'money'}
                    options={{
                        precision: 2,
                        separator: ',',
                        delimiter: '.',
                        unit: 'R$ ',
                        suffixUnit: ''
                    }}
                    value={salary}
                    onChangeText={setSalary}
                    style={styles(theme).input2}
                    placeholder="Digite o Salário"
                    keyboardType="numeric"
                />
            </View>

            <View style={styles(theme).inputWrapper}>
                <Icon name="shirt" size={20} style={styles(theme).icon} />
                <TextInput
                    placeholder="Tamanho do Uniforme"
                    value={uniformSize}
                    onChangeText={setUniformSize}
                    style={styles(theme).input2}
                />
            </View>

            <View style={styles(theme).cardContainer}>
                <Text style={styles(theme).title}>Férias</Text>
                <View style={styles(theme).dateContainer}>
                    <TouchableOpacity onPress={() => { setShowDatePicker(true); setSelectedDateField('vacationStart'); }}>
                        <TextInput
                            placeholder="Início"
                            value={vacationStart}
                            editable={false}
                            style={styles(theme).inputField}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setShowDatePicker(true); setSelectedDateField('vacationEnd'); }}>
                        <TextInput
                            placeholder="Fim"
                            value={vacationEnd}
                            editable={false}
                            style={styles(theme).inputField}
                        />
                    </TouchableOpacity>
                </View>
            </View>


            <View style={styles(theme).cardContainer}>
                <Text style={styles(theme).title}>Horário de Trabalho e Folgas</Text>
                {
                    Object.keys(workHours).map((day) => (

                        <View key={day} style={styles(theme).timeRow}>

                            <Checkbox

                                value={daysOff[day as keyof DaysOff]}

                                onValueChange={(newValue) => setDaysOff({ ...daysOff, [day]: newValue })}

                                style={{ marginRight: 8 }}

                            />

                            <Text style={styles(theme).timeLabel}>{dayNames[day as keyof typeof dayNames]}</Text>

                            {!daysOff[day as keyof DaysOff] && (

                                <>

                                    <TouchableOpacity onPress={() => handleWorkHourSelect(day as keyof DaysOff, 'start')}>

                                        <TextInput

                                            placeholder="Início"

                                            value={workHours[day as keyof typeof workHours].start}

                                            editable={false}

                                            style={styles(theme).input}

                                        />

                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => handleWorkHourSelect(day as keyof DaysOff, 'end')}>

                                        <TextInput

                                            placeholder="Fim"

                                            value={workHours[day as keyof typeof workHours].end}

                                            editable={false}

                                            style={styles(theme).input}

                                        />

                                    </TouchableOpacity>

                                </>

                            )}

                            {daysOff[day as keyof DaysOff] && <Text style={styles(theme).folgaText}>Folga</Text>}

                        </View>

                    ))}

            </View>

            <View style={styles(theme).buttonContainer}>
                <TouchableOpacity onPress={handleSubmit} style={styles(theme).buttonSubmit}>
                    <Text style={styles(theme).textButton}>
                        {id ? 'Atualizar' : 'Cadastrar'}
                    </Text>
                </TouchableOpacity>
                {id && (
                    <TouchableOpacity onPress={() => handleDeleteEmployee(Number(id))} style={styles(theme).buttonDelete}>
                        <Text style={styles(theme).textButton}>Excluir</Text>
                    </TouchableOpacity>
                )}
            </View>

            {showDatePicker && selectedDateField && (
                <DateTimePicker
                    value={new Date()}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />
            )}

            {showTimePicker && selectedTimeField && (
                <DateTimePicker
                    value={new Date()}
                    mode="time"
                    display="default"
                    onChange={handleTimeChange}
                />
            )}
        </ScrollView>
    );
};



export default EmployeeDetail;
