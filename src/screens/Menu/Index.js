import { useEffect, useState } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, ScrollView } from "react-native"
import { QRCode } from "../../components/qrcode"
import { getMovements } from "../../services/Movement_api"
import { Fontisto, Ionicons, FontAwesome } from '@expo/vector-icons';
import { formatDateTime } from "../../utils/data";
export function Menu(props) {
    const [movements, setMovements] = useState([]);

    useEffect(() => {
        // Chama a função para obter os movimentos quando o componente é montado
        fetchMovements();
    }, []);
    const fetchMovements = async () => {
        try {
            // Chama a função para obter os movimentos
            const data = await getMovements();
            // Define os movimentos no estado local
            setMovements(data);
        } catch (error) {
            console.error("Erro ao obter movimentos:", error);
        }
    };
    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <View style={styles.column}>
                <Text style={styles.columnHeader}>Data</Text>
                <Text style={styles.itemText}>{formatDateTime(item.created_at)}</Text>
            </View>
            <View style={styles.column}>
                <Text style={styles.columnHeader}>Produto</Text>
                <Text style={styles.itemText}>{item.product.commercial_name}</Text>
            </View>
            <View style={styles.column}>
                <Text style={styles.columnHeader}>Movimento</Text>
                <Text style={styles.itemText}>{item.movement_type_description}</Text>
            </View>
            <View style={styles.column}>
                <Text style={styles.columnHeader}>Quantidade (Kg/L)</Text>
                <Text style={styles.itemText}>{`${item.quantity_kilos}/${item.quantity_liters}`}</Text>
            </View>
            </View>
    );
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.header}>
                <Text style={styles.title}>Bem vindo, Fulano de Tal</Text>
            </View>
            <View style={styles.content}>


                <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('QRCode')} >
                    <Fontisto name="shopping-basket-add" size={30} color="white" />
                    <Text style={styles.btntxt}>Consumo</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('QRCode')} >
                    <Ionicons name="settings-sharp" size={30} color="white" />
                    <Text style={styles.btntxt}>Transformação</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('QRCode')} >
                    <FontAwesome name="industry" size={30} color="white" />
                    <Text style={styles.btntxt}>Produção</Text>
                </TouchableOpacity>

            </View>
            
            <Text style={[styles.title, {color:  "#084d6e"}]}>Eventos</Text>
            <ScrollView horizontal>
                <FlatList
                    data={movements}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.flatListContainer}
                    flexGrow={1}
                />
            </ScrollView>

        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    header: {
        backgroundColor: 'black',
        paddingTop: 58,
        paddingBottom: 14,
        paddingLeft: 14,
        paddingRight: 14,
    },
    title: {
        fontSize: 18,
        color: "#FFF",
        fontWeight: 'bold'
    },
    content: {
        alignContent: 'center',
        alignItems: 'center',
        padding: 20,
        height: "50%"
    },
    button: {
        backgroundColor: "#084d6e",
        width: "50%",
        height: "30%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        marginBottom: 18
    },
    btntxt: {
        fontSize: 18,
        color: "white",
        fontWeight: 'bold'
    },
    flatListContainer: {
        paddingBottom: 20,
    },
    column: {
        flex: 1,
        marginRight: 10,
        marginBottom: 20,
    },
    columnHeader: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    itemContainer: {
        backgroundColor: "#f0f0f0",
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemText: {
        fontSize: 16,

    },
})