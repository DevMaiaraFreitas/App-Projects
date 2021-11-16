import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default function Botao (props){

    return(
    <View style={styles.ViewBotao}>
        <TouchableOpacity onPress={()=> props.logicaCalculadora(props.numero)} style={styles.touchableBotao}>
            <Text  style={styles.textBotao}>{props.numero}</Text>
        </TouchableOpacity>
    </View>);

}

const styles = StyleSheet.create({
    ViewBotao:{
        backgroundColor:'black',
        borderColor:'white',
        borderWidth:1,
        width:'20%',
        height:'40%',
        justifyContent:'center',
        alignItems:'center'
    },
    touchableBotao:{
        width:'100%',
        justifyContent:'center', 
        alignItems:'center'
    },
    textBotao:{
        color:'white', 
        textAlign:'center',
        fontSize:30
    }
});
