import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Picker, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';

export default function Contador (props) {

    var done = false;

    useEffect (()=>{

        const timer = setInterval(()=>{

            props.setarSegundos(props.segundos-1);

            if(props.segundos<= 0){
                if(props.minutos > 0){
                    props.setarMinutos(minutos-1);
                    props.setarSegundos(59);
                }else{
                    if(!done){
                        done = true;
                        props.setarEstado('selecionar');
                        props.setarMinutos(0);
                        props.setarSegundos(1);
                        playSound();
                    }
                }
            }

        },1000)

        return ()=> clearInterval (timer);

    })

    async function playSound(){
        const soundObject = new Audio.Sound();
        try{
            var alarme;
            props.alarmes.map(function(val){
                if(val.selecionado){
                    alarme = val.file;
                }
            })
            await soundObject.loadAsync(alarme);
            await soundObject.playAsync();
        }catch (error){}
    }

    function resetar(){
        props.setarEstado('selecionar');
        props.setarMinutos(0);
        props.setarSegundos(1);
    }

    function formatarNumero(number){
        var finalNumber ='';
        if( number <10){
            finalNumber = '0'+number;
        }else{
            finalNumber = number;
        }

        return finalNumber;
    }

    var segundos = formatarNumero(props.segundos);
    var minutos = formatarNumero(props.minutos);

    return (
        <View style={styles.container}>
        <StatusBar style="auto" />
        <LinearGradient
          colors={['rgba(0,0,0,0.8)', 'transparent']}
          style= {{
            position:'absolute',
            left:0,
            right:0,
            top:0,
            height:'100%'
          }}
        />

          <View style={{flexDirection:'row'}}>
                <Text style={styles.textContador}>{minutos} : </Text>
                <Text style={styles.textContador}>{segundos}</Text>
          </View>

          <TouchableOpacity onPress={()=> resetar()} style={styles.btnIniciar}><Text style={styles.txtIniciar}>RESETAR</Text></TouchableOpacity>

        </View>
    );
}
  const styles = StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: '#288a82',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textContador:{
        color:'white',
        fontSize:50
    },
    btnIniciar:{
        backgroundColor:'rgba(24, 186, 173,0.3)',
        width:100,
        height:100,
        borderRadius:50,
        marginTop:30,
        borderColor:'white',
        borderWidth:2
      },
      txtIniciar:{
        color:'white',
        fontWeight:'bold',
        textAlign:'center',
        paddingTop:33,
        fontSize:18
      }

  });