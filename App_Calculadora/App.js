import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View} from 'react-native';
import Botao from './Botao';

export default function App() {
  
  console.disableYellowBox  = true;
  const [Primeiro, setPrimeiro] = useState(0);
  const [Segundo, setSegundo] = useState(0);
  const [sinal, setSinal] = useState("");
  const [stringCalculo, setStringCalculo] = useState("0");
  var numeros = [];

  for(var i = 0; i <= 9; i++){
      numeros.push(i);
  }

  function logicaCalculadora(n){
        if(sinal == ""){
            setPrimeiro(parseInt(Primeiro.toString() + n.toString()));
            setStringCalculo(parseInt(Primeiro.toString() + n.toString()));
        }

        if((n == "/" || n == "*" || n == "+" || n =="-") && Segundo == 0){
            setStringCalculo(Primeiro.toString() + n);
            setSinal(n);
        }

        if(sinal != ""){
            setSegundo(parseInt(Segundo.toString() + n.toString()));
            setStringCalculo(Primeiro+sinal+parseInt(Segundo.toString() + n.toString()));
        }

        if(n == "="){
            let resultado = 0;
            if(sinal == "+"){
                resultado = Primeiro+Segundo;
            }else if(sinal == "-"){
              resultado = Primeiro-Segundo;
            }
            else if(sinal == "/"){
              resultado = Primeiro/Segundo;
            }
            else if(sinal == "*"){
              resultado = Primeiro*Segundo;
            }
            setStringCalculo(resultado);
            setSinal("");
            setPrimeiro(resultado);
            setSegundo(0);
        }
       
  }
 
  return (
    <View style={styles.View0}>
      <StatusBar hidden />
      <View style={styles.container}><Text style={styles.textContainer}>{stringCalculo}</Text></View>
      
      <View style={styles.ViewStyle}>
        <TouchableOpacity onPress={()=>logicaCalculadora('+')} style={styles.touchableStyle}><Text style={styles.textTouchable}>+</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>logicaCalculadora('-')} style={styles.touchableStyle}><Text style={styles.textTouchable}>-</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>logicaCalculadora('/')} style={styles.touchableStyle}><Text style={styles.textTouchable}>/</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>logicaCalculadora('*')} style={styles.touchableStyle}><Text style={styles.textTouchable}>*</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>logicaCalculadora('=')} style={styles.touchableStyle}><Text style={styles.textTouchable}>=</Text></TouchableOpacity>
      </View>
      
      <View style={styles.View1}>
          {
            numeros.map(function(e){
            return (<Botao logicaCalculadora={logicaCalculadora} numero={e}></Botao>);
            })
          }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
      View0:{
        flex:1,
        backgroundColor:'black'
      },
      container:{
        backgroundColor:'rgb(20,20,20)',
        height:'16.6%',
        justifyContent:'center',
        paddingLeft:20
      },
      textContainer:{
        fontSize:24,
        color:'white'
      },
      ViewStyle:{
        flexDirection:'row',
        height:'16.6%',
        alignItems:'center'
      },
      touchableStyle:{
        width:'20%',
        backgroundColor:'rgb(20,20,20)',
        justifyContent:'center',
        alignItems:'center',
        height:'100%'
      },
      textTouchable:{
        fontSize:40,
        color:'white'
      },
      View1:{
        flexDirection:'row',
        flexWrap:'wrap',
        borderTopColor:'black',
        borderTopWidth:2,
        height:'30%'
      }
});
