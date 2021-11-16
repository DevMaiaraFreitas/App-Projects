import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {AntDesign} from '@expo/vector-icons';
import { AsyncStorage } from 'react-native';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView, Modal, TouchableHighlight, Alert, TextInput} from 'react-native';

export default function App() {

const image = require('./resources/bg.jpg');

console.disableYellowBox=true;

const [tarefas, setarTarefas] = useState ([]);

const [modal, setModal] = useState(false);

const [tarefaAtual, setTarefaAtual]= useState('');

useEffect(()=> {

  (async ()=> {
    try{
      let tarefaAtual = await AsyncStorage.getItem('tarefas');
      if (tarefaAtual == null)
        setarTarefas([]);
      else
        setarTarefas(JSON.parse(tarefaAtual));
    } catch (error) {

    }
  })();
},[])



function deletarTarefa (id) {
  alert('Tarefa com id: '+id+', foi deletada com sucesso!');

  let newTarefas = tarefas.filter(function(val){
      return val.id != id;  
  });

  setarTarefas(newTarefas);

  (async ()=> {
    try{
      await AsyncStorage.setItem('tarefas', JSON.stringify(newTarefas));
      console.log('chamado');
    } catch (error) {

    }
  })();
}

function addTarefa(){
    setModal(!modal);
    alert('Tarefa adicionada com sucesso!');

    let id = 0;
    if (tarefas.length > 0){
        id = tarefas[tarefas.length-1].id+1;
    }

    let tarefa= {id:id,tarefa:tarefaAtual};

    setarTarefas([...tarefas,tarefa]);

    (async ()=> {
      try{
        await AsyncStorage.setItem('tarefas', JSON.stringify([...tarefas,tarefa]));
        console.log('chamado');
      } catch (error) {
  
      }
    })();

}

  return (
    <ScrollView style={styles.container}>
      <StatusBar hidden />

      <Modal animationType='slide' transparent={true} visible={modal} onRequestClose={()=> {Alert.alert("Modal has been close");}}>

        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput onChangeText={ text => setTarefaAtual(text)} autoFocus={true}></TextInput>

            <TouchableHighlight style={{...styles.openButton, backgroundColor:'#8a7d5b'}} onPress={()=> addTarefa()}>
              <Text style={styles.textStyle}>Adicionar Tarefa</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <ImageBackground source={image} style={styles.image}>
        <View style= {styles.viewcover}>
          <Text style={styles.textheader} >LISTA DE TAREFAS</Text>
        </View>
      </ImageBackground>

      {
      tarefas.map(function(val){
      return(<View style={styles.tarefaSingle}>
          <View style={{flex:1, width:'100%',padding:10}}>
            <Text>{val.tarefa}</Text>
          </View>
          <View style={{alignItems:"flex-end", flex:1, padding:10}}>
            <TouchableOpacity onPress={()=> deletarTarefa(val.id)}><AntDesign name='minuscircleo' size={24} color='black'/></TouchableOpacity>
          </View>
      </View>);
      })

    }

    <View style={{alignItems:'center', flex:1, padding:30}}>
      <TouchableOpacity onPress={()=> setModal(true)}><AntDesign name="pluscircleo" size={35} color="black" /></TouchableOpacity>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image:{
    width:'100%',
    height:100,
    resizeMode:"cover",
    justifyContent:"center",
  },
  textheader:{
    fontWeight:'bold',
    color:'white',
    padding:10,
    fontSize:20,
    marginTop:20
   },
  viewcover:{
    backgroundColor:'rgba(0,0,0,0.3)',
    width:'100%',
    height:100,
    resizeMode:"cover",
    justifyContent:"center"
  },
  tarefaSingle:{
    marginTop:30,
    width:'100%',
    borderBottomWidth:1,
    borderBottomColor:'black',
    flexDirection:'row',
    paddingBottom:10
  },
  centeredView:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'rgba(0,0,0,0.5)',
  },
  modalView:{
    margin:20,
    backgroundColor:'white',
    borderRadius: 20,
    padding:35,
    alignItems:'center',
    shadowColor:'#000',
    shadowOffset:{ width:0, height:2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation:5,
    zIndex:5
  },
  openButton:{
    backgroundColor:'#8a7d5b',
    borderRadius:20,
    padding:10,
    elevation:2
  },
  textStyle:{
    color:'white',
    fontWeight:'bold',
    textAlign: 'center'
  },
  modalText:{
    marginBottom:15,
    textAlign:'center'
  }
});
