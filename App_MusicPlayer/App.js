import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ImagePropTypes, LogBox, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {Audio} from 'expo-av';
import {AntDesign} from '@expo/vector-icons';
import Player from './Player.js';

export default function App() {

  LogBox.ignoreAllLogs(true);

  const [audioIndex,setarAudioIndex] = useState(0);

  const [playing,setPlaying] = useState(false);
  
  const [audio,setarAudio] = useState(null);

  const [musicas,setarMusicas] = useState([

    {
        nome: 'SoundHelix Song 1',
        artista: 'T. Schürger',
        playing: false,
        file: {uri:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'}
    },

    {
        nome: 'SoundHelix Song 2',
        artista: 'T. Schürger',
        playing: false,
        file: {uri:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'}
    },
    {
      nome: 'SoundHelix Song 3',
      artista: 'T. Schürger',
      playing: false,
      file: {uri:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'}
  },
  {
    nome: 'SoundHelix Song 4',
    artista: 'T. Schürger',
    playing: false,
    file: {uri:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'}
  },
  {
    nome: 'SoundHelix Song 5',
    artista: 'T. Schürger',
    playing: false,
    file: {uri:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3'}
  },
  {
    nome: 'SoundHelix Song 6',
    artista: 'T. Schürger',
    playing: false,
    file: {uri:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3'}
  },
  {
    nome: 'SoundHelix Song 7',
    artista: 'T. Schürger',
    playing: false,
    file: {uri:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3'}
  },
  {
    nome: 'SoundHelix Song 8',
    artista: 'T. Schürger',
    playing: false,
    file: {uri:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3'}
  },
  {
    nome: 'SoundHelix Song 9',
    artista: 'T. Schürger',
    playing: false,
    file: {uri:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3'}
  },
  ]);

  const changeMusic = async (id) =>{
      let curFile = null;
      let newMusics = musicas.filter((val,k)=>{
            if(id == k){
                musicas[k].playing = true;
               
                curFile = musicas[k].file;
                setPlaying(true);
                setarAudioIndex(id);
            }
            else{
                musicas[k].playing = false;
            }

            return musicas[k];
      })

      if(audio != null){
          audio.unloadAsync();
      }

      let curAudio = new Audio.Sound();

      try{
          await curAudio.loadAsync(curFile);
          await curAudio.playAsync();
      }catch(error){}

      setarAudio(curAudio);
      setarMusicas(newMusics);

  }

  return (
     <View style={{flex:1}}>
      <ScrollView style={styles.container}>
          <StatusBar hidden />
          <View style={styles.header}>
            <Text style={{textAlign:'center',color:'white',fontSize:25}}>App Música | Maiara Freitas</Text>
          </View>

          <View style={styles.table}>
              <Text style={{width:'50%',color:'rgb(200,200,200)', fontSize:16}}>Música</Text>
              <Text style={{width:'50%',color:'rgb(200,200,200)'}}>Artista</Text>
          </View>


          {
            musicas.map((val,k)=>{
                
                if(val.playing){
                    //Renderiza algo aqui.
                    return(
                    <View style={styles.table}>
                        <TouchableOpacity onPress={()=>changeMusic(k)}  style={{width:'100%',flexDirection:'row'}}>
                            <Text style={styles.tableTextSelected}><AntDesign name="play" size={15} 
                            color="#e0782d" /> {val.nome}</Text>
                            <Text style={styles.tableTextSelected}>{val.artista}</Text>
                        </TouchableOpacity>
                    </View>
                    );
                }else{
                  //Renderiza outra coisa aqui.
                  return(
                    <View style={styles.table}>
                        <TouchableOpacity onPress={()=>changeMusic(k)} style={{width:'100%',flexDirection:'row'}}>
                            <Text style={styles.tableText}><AntDesign name="play" size={15} 
                            color="white" /> {val.nome}</Text>
                            <Text style={styles.tableText}>{val.artista}</Text>
                        </TouchableOpacity>
                    </View>
                    );
                }

            })
          }

          
        <View style={{paddingBottom:200}}></View>
        
      </ScrollView>
      <Player playing={playing}  setPlaying={setPlaying} setarAudioIndex={setarAudioIndex} audioIndex={audioIndex} musicas={musicas}
        setarMusicas={setarMusicas} audio={audio} setarAudio={setarAudio}
      ></Player>
      </View>
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222'
  },
  header:{
    backgroundColor:'#e0782d',
    width:'100%',
    padding:20
  },
  table:{
    flexDirection:'row',
    padding:20,
    borderBottomColor:'white',
    borderBottomWidth:1
  },
  tableTextSelected:{width:'50%',color:'#e0782d'},
  tableText:{width:'50%',color:'white'}
});
