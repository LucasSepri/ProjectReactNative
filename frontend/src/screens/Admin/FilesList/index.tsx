import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, StyleSheet, Image, Text, TouchableOpacity, Alert, Dimensions } from 'react-native';
import CheckBox from 'expo-checkbox';
import { api } from '../../../services/api';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ThemeContext } from 'styled-components';
import { DefaultLogoImage } from '../../../components/Logo';

const FilesScreen: React.FC = () => {
    const theme = useContext(ThemeContext);
    const [files, setFiles] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [viewMode, setViewMode] = useState<'grid' | 'large'>('grid');
    const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
    const [isSelecting, setIsSelecting] = useState(false);
    const [imageError, setImageError] = useState<{ [key: string]: boolean }>({});

    const fetchFiles = async (): Promise<string[]> => {
        try {
            const response = await api.get('/files');
            return response.data.files;
        } catch (error) {
            console.error('Erro ao buscar arquivos:', error);
            return [];
        }
    };

    const loadFiles = async () => {
        setLoading(true);
        const filesData = await fetchFiles();
        setFiles(filesData);
        setLoading(false);
    };

    const handleDelete = async (filename: string) => {
        try {
            Alert.alert(
                'Excluir Imagem',
                'Tem certeza que deseja excluir esta imagem?',
                [
                    { text: 'Cancelar', style: 'cancel' },
                    {
                        text: 'Excluir',
                        onPress: async () => {
                            await api.delete(`/files/${filename}`);
                            loadFiles();
                        },
                    },
                ]
            );
        } catch (error) {
            console.error('Erro ao excluir arquivo:', error);
            Alert.alert('Erro', 'Não foi possível excluir a imagem');
        }
    };

    const handleBulkDelete = async () => {
        try {
            const filesToDelete = Array.from(selectedFiles);
            if (filesToDelete.length === 0) {
                Alert.alert('Nenhum arquivo selecionado', 'Selecione pelo menos um arquivo para excluir.');
                return;
            }
            Alert.alert(
                'Excluir Imagens',
                `Tem certeza que deseja excluir ${filesToDelete.length} imagem(s)?`,
                [
                    { text: 'Cancelar', style: 'cancel' },
                    {
                        text: 'Excluir',
                        onPress: async () => {
                            for (const file of filesToDelete) {
                                await api.delete(`/files/${file}`);
                            }
                            loadFiles();
                            setSelectedFiles(new Set());
                        },
                    },
                ]
            );
        } catch (error) {
            console.error('Erro ao excluir múltiplos arquivos:', error);
            Alert.alert('Erro', 'Não foi possível excluir as imagens');
        }
    };

    const handleDeleteAll = async () => {
        try {
            if (files.length === 0) {
                Alert.alert('Nenhuma imagem', 'Não há imagens para excluir.');
                return;
            }

            Alert.alert(
                'Excluir Todas as Imagens',
                'Tem certeza que deseja excluir todas as imagens?',
                [
                    { text: 'Cancelar', style: 'cancel' },
                    {
                        text: 'Excluir',
                        onPress: async () => {
                            await Promise.all(files.map((file) => api.delete(`/files/${file}`)));
                            loadFiles();
                        },
                    },
                ]
            );
        } catch (error) {
            console.error('Erro ao excluir todas as imagens:', error);
            Alert.alert('Erro', 'Não foi possível excluir as imagens');
        }
    };

    const toggleSelection = (filename: string) => {
        const newSelectedFiles = new Set(selectedFiles);
        if (newSelectedFiles.has(filename)) {
            newSelectedFiles.delete(filename);
        } else {
            newSelectedFiles.add(filename);
        }
        setSelectedFiles(newSelectedFiles);
    };

    const startSelecting = (filename: string) => {
        setIsSelecting(true);
        toggleSelection(filename);
    };

    const stopSelecting = () => {
        setIsSelecting(false);
        setSelectedFiles(new Set());
    };

    useEffect(() => {
        loadFiles();
    }, []);

    useEffect(() => {
        if (selectedFiles.size === 0) {
            setIsSelecting(false);
        }
    }, [selectedFiles]);

    const renderItem = ({ item }: { item: string }) => {
        const imageStyle = viewMode === 'large' ? styles(theme).largeImage : styles(theme).image;
        return (
            <View style={[styles(theme).fileContainer, selectedFiles.has(item) && styles(theme).selectedFile]}>
                <TouchableOpacity
                    onLongPress={() => startSelecting(item)}
                    onPress={() => isSelecting && toggleSelection(item)}
                >
                    {imageError[item] ? (
                        <View style={styles(theme).imageContainerStyle}>
                            <Text style={{color: theme.color}}>{item}</Text>
                        </View>
                    ) : (
                        <Image
                            source={{ uri: `${api.defaults.baseURL}/uploads/${item}` }}
                            onError={() => setImageError(prev => ({ ...prev, [item]: true }))}
                            style={imageStyle}
                        />
                    )}

                </TouchableOpacity>

                {isSelecting && (
                    <CheckBox
                        value={selectedFiles.has(item)}
                        onValueChange={() => toggleSelection(item)}
                        style={styles(theme).checkbox}
                    />
                )}

                {!isSelecting && (
                    <TouchableOpacity
                        style={styles(theme).deleteButton}
                        onPress={() => handleDelete(item)}
                    >
                        <Icon name="delete" size={24} color="white" />
                    </TouchableOpacity>
                )}
            </View>
        );
    };

    if (loading && files.length === 0) {
        return (
            <View style={styles(theme).container}>
                <Text style={styles(theme).loadingText}>Carregando imagens...</Text>
            </View>
        );
    }

    const handleRefresh = async () => {
        setRefreshing(true);
        await loadFiles();
        setRefreshing(false);
    };

    return (
        <View style={styles(theme).container}>
            <View style={styles(theme).viewModeButtons}>
                <TouchableOpacity onPress={() => setViewMode('grid')} style={styles(theme).viewModeButton}>
                    <Icon name="grid-on" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setViewMode('large')} style={styles(theme).viewModeButton}>
                    <Icon name="view-carousel" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <FlatList
                key={viewMode}
                data={files}
                keyExtractor={(item) => item}
                numColumns={viewMode === 'grid' ? 3 : 1}
                contentContainerStyle={styles(theme).gridContainer}
                renderItem={renderItem}
                refreshing={refreshing}
                onRefresh={handleRefresh}
                ListEmptyComponent={
                    <Text style={styles(theme).noFilesText}>Nenhum arquivo encontrado</Text>
                }
            />

            {selectedFiles.size > 0 && (
                <TouchableOpacity style={styles(theme).bulkDeleteButton} onPress={handleBulkDelete}>
                    <Text style={styles(theme).bulkDeleteText}>Excluir {selectedFiles.size} Arquivo(s)</Text>
                </TouchableOpacity>
            )}

            {files.length > 0 && (
                <TouchableOpacity style={styles(theme).deleteAllButton} onPress={handleDeleteAll}>
                    <Text style={styles(theme).bulkDeleteText}>Excluir Todos os Arquivos</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.white,
    },
    loadingText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 18,
        color: theme.primary,
    },
    gridContainer: {
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    fileContainer: {
        margin: 10,
        position: 'relative',
        elevation: 5,
        borderRadius: 10,

    },
    imageContainerStyle: {
        width: 100,
        height: 100,
        backgroundColor: theme.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        elevation: 5,
        padding: 10,
    },
    image: {
        width: Dimensions.get('window').width / 3 - 20,
        height: Dimensions.get('window').width / 3 - 20,
        borderRadius: 10,
    },
    largeImage: {
        width: 350,
        height: 350,
        borderRadius: 10,
    },
    checkbox: {
        position: 'absolute',
        top: 5,
        left: 5,
    },
    deleteButton: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: theme.danger,
        padding: 5,
        borderRadius: 20,
    },
    bulkDeleteButton: {
        backgroundColor: theme.danger,
        padding: 15,
        marginBottom: 10,
        marginHorizontal: 20,
        borderRadius: 10,
    },
    bulkDeleteText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    deleteAllButton: {
        backgroundColor: theme.danger,
        padding: 15,
        marginBottom: 10,
        marginHorizontal: 20,
        borderRadius: 10,
    },
    noFilesText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 18,
        color: theme.primary,
    },
    viewModeButtons: {
        flexDirection: 'row',
        backgroundColor: theme.secondary,
        padding: 10,
        margin: 10,
        borderRadius: 10,
        justifyContent: 'space-around',
    },
    viewModeButton: {
        marginHorizontal: 10,
    },
    selectedFile: {
        borderColor: theme.primary,
        borderRadius: 10,
        borderWidth: 2,
    },
});

export default FilesScreen;
