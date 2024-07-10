import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Pressable, Text, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getProduct } from '../../services/Product_api';
import {addMovement} from '../../services/Movement_api'
import { movement_type, movement_subtype } from '../../environment/env'; 
export const Product = (props) => {
    const [product, setProductData] = useState(null);
    const [commercialName, setCommercialName] = useState("")
    const [ncmProductName, setNcmProductName] = useState("");
    const [density, setDensity] = useState("");
    const [concentration, setConcentration] = useState("");
   
    const id = props.route.params.data
    console.log("id")
    console.log(props.route.params.data)
    useEffect(() => {
    getProduct(id).then((response) => {
        const product =  response;
        console.log("produto")
        console.log(product)
        setProductData(product)
        setCommercialName(product.commercial_name)
        setNcmProductName(product.ncm_general_name)
        setDensity(product.density)
        setConcentration(String(product.concentration))

         })
        })
     
        const [quantity, setQuantity] = useState('');
        const [isLiters, setIsLiters] = useState(false);

    const handleSubmit = () => {
        var qnt_kilos = ''
        var qnt_litros = ''
        if (isLiters == true){
            qnt_litros = quantity
            qnt_kilos=  (quantity * density).toFixed(3)
        }else{
            qnt_litros = (quantity/density).toFixed(3)
            qnt_kilos=  quantity
        }
        const formData = {
            movement_type: movement_type,
            movement_subtype: movement_subtype,
            liters: qnt_litros,
            kilos: qnt_kilos,
            isLiters: isLiters,
            product: product
        }
    
        addMovement(formData).then(()=> {
            props.navigation.navigate('Menu')
        })
       
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.header}>
                <Text style={styles.title}>Atualização do produto {commercialName}</Text>
            </View>
            <View style={styles.container}>
                <Text>NCM / Nome do Produto:</Text>

                <TextInput
                    style={styles.input}
                    value={ncmProductName}
                    onChangeText={(text) => setNcmProductName(text)}
                    editable={false}
                />
                <View style={styles.inlineContainer}>
                    <View style={styles.fieldContainer}>
                        <Text style={styles.label}>Densidade (g/mL)</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Insira o valor"
                            value={density}
                            onChangeText={(text) => setDensity(text)}
                            keyboardType="numeric"
                            editable={false}
                        />
                    </View>

                    <View style={styles.fieldContainer}>
                        <Text style={styles.label}>Concentração (%)</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Insira o valor"
                            value={concentration}
                            onChangeText={(text) => setConcentration(text)}
                            keyboardType="numeric"
                            editable={false}
                        />
                    </View>
                </View>
                <View style={styles.inlineContainer}>
                <View style={styles.fieldContainer}>


                    <Text style={styles.label}>Quantidade:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Quantidade utilizada"
                        value={quantity}
                        onChangeText={(text) => setQuantity(text)}
                        keyboardType="numeric"
                    />
                    </View>
                    
                    <View style={[styles.fieldContainer, styles.pickerView]}>
                    <Picker
                        style={styles.inlinePicker}
                        selectedValue={isLiters}
                        onValueChange={(itemValue) => setIsLiters(itemValue)}
                    >
                        <Picker.Item label="Litros(L)" value={true} />
                        <Picker.Item label="Kg" value={false} />
                    </Picker>
                    </View>
                    </View>
          
                {isLiters === true && density !== '' && (
                    <Text style={styles.equivalentValue}>
                        Valor em Quilos: {(quantity / density).toFixed(3)} kg
                    </Text>
                )}
                {isLiters === false && density !== '' && (
                    <Text style={styles.equivalentValue}>
                        Valor em Litros: {(quantity * density).toFixed(3)} L
                    </Text>
                )}
                <View style={styles.btnArea}>
                    <Pressable style={styles.button} onPress={handleSubmit} >
                        <Text style={styles.btntxt}>
                            Atualizar</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView >
    );
};

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
        fontWeight: 'bold',
        fontWeight: 'bold'
    },
    container: {
        flex: 1,
        margin: 10,
        textAlign: 'center',
        marginTop: 40

    },
    input: {
        marginTop: 5,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
    },
    button: {
        padding: 10,
        backgroundColor: "#7FFFD4",
        width: "90%",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        marginBottom: 18
    },
    btntxt: {
        fontSize: 18,
        color: "black",
        fontWeight: 'bold'
    },
    btnArea: {
        alignItems: "center",
        justifyContent: "center",
    },
    inlineContainer: {
        flexDirection: 'row',
    },
    inlineInput: {
        flex: 1,
        marginRight: 5,
    },
    inlinePicker: {
        width: 120,
    },
    textInput: {
        flex: 1,
    },
    fieldContainer: {
        flex: 1,
        marginRight: 5,
      },
      pickerView: {
        marginTop: 15,
        borderRadius: 2,

      }
});
