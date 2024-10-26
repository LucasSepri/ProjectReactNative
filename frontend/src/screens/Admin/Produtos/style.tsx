import { StyleSheet } from "react-native";
import { COLORS } from "../../../styles/COLORS";


export default StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: COLORS.white,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    pickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: COLORS.white,
        marginBottom: 20,
    },
    reloadButton: {
        padding: 10,
        borderRadius: 25,
        backgroundColor: COLORS.white,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    reloadIcon: {
        fontSize: 24,
        color: COLORS.darkGrey,
    },
    picker: {
        flex: 1,
        height: 50,
        backgroundColor: COLORS.white,
        marginLeft: 10,
    },
    imagePicker: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.white,
        height: 200,
        marginBottom: 20,
    },
    uploadText: {
        fontSize: 18,
        color: COLORS.grey,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    input: {
        height: 50,
        borderColor: COLORS.grey,
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 10,
        backgroundColor: COLORS.white,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly', // Distribui o espaço de maneira equilibrada
        alignItems: 'center',
        marginTop: 15,
    },

    button: {
        flex: 1, // Torna ambos os botões de tamanho igual
        marginHorizontal: 5, // Dá espaço horizontal entre os botões
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3, // Para sombra no Android
    },

    submitButton: {
        backgroundColor: COLORS.green, // Verde para criar/editar
    },

    cancelButton: {
        backgroundColor: COLORS.red, // Vermelho para cancelar
    },

    buttonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: 'bold',
    },

    cancelButtonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    productsTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    productsContainer: {
        marginBottom: 20,
    },
    productItem: {
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        marginBottom: 20,
        borderRadius: 10, // Aumento no raio para torná-lo mais moderno
        elevation: 3, // Adiciona sombra para Android
        shadowColor: COLORS.black, // Cor da sombra para iOS
        shadowOffset: { width: 0, height: 2 }, // Posição da sombra
        shadowOpacity: 0.1, // Opacidade da sombra
        shadowRadius: 1.5, // Raio da sombra
        overflow: 'hidden', // Garante que nada saia do card
    },
    imageContainer: {
        marginVertical: 'auto',
        marginHorizontal: 10,
        width: 120,
        height: 120,
    },
    productImage: {
        width: 120,
        height: 120,
        borderRadius: 12,
        backgroundColor: COLORS.white, // Cor de fundo caso a imagem não carregue
        resizeMode: 'cover',
    },
    infoContainer: {
        flex: 1,
        padding: 10,
        justifyContent: 'space-between', // Altera o alinhamento para distribuir os itens uniformemente
    },
    actions: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        marginBottom: 10,
    },
    editButton: {
        padding: 5,
        backgroundColor: COLORS.blue,
        borderRadius: 5,
        marginRight: 10,
    },
    deleteButton: {
        padding: 5,
        backgroundColor: COLORS.red,
        borderRadius: 5,
    },
    editButtonText: {
        color: COLORS.white,
        fontSize: 14,
        fontWeight: '500',
    },
    deleteButtonText: {
        color: COLORS.white,
        fontSize: 14,
        fontWeight: '500',
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.darkGrey, // Torna a cor do texto um pouco mais escura para melhor leitura
    },
    productDescription: {
        fontSize: 16,
        color: COLORS.grey, // Cor mais leve para o texto
        marginVertical: 4, // Adiciona margem vertical para separar do título e ingredientes
    },
    productIngredients: {
        fontSize: 14,
        color: COLORS.lightGrey,
        fontStyle: 'italic', // Estilo itálico para diferenciar dos outros textos
    },
    productCategory: {
        fontSize: 16,
        color: COLORS.primary,
        fontWeight: 'bold',
    },
    productPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.blue, // Uma cor diferente para destacar o preço
    },
});