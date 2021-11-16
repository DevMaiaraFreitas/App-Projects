import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Picker, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';
import Contador from './Contador';

export default function App() {

  console.disableYellowBox = true;
  const [estado,setarEstado] = useState('selecionar');
  const [segundos,setarSegundos ] = useState(1);
  const [minutos,setarMinutos] = useState(0);
  const [alarmeSound, setarAlarmeSound] = useState ([
  {
    id:1,
    selecionado: true,
    som: 'Alarme 1',
    file: require('./assets/alarme1.mp3')
  },
  {
    id:2,
    selecionado: false,
    som: 'Alarme 2',
    file: require('./assets/alarme2.mp3')
  }
]);

  var numeros =[];
  for(var i=1; i<=60; i++){
    numeros.push(i);
  }

  function setarAlarme(id){
    let alarmesTemp= alarmeSound.map(function(val){
      if (id != val.id)
        val.selecionado= false;
      else
        val.selecionado = true;
      return val;
    })
    setarAlarmeSound(alarmesTemp);
  }

  if(estado=='selecionar'){
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
      <Text style= {{color:'white',fontSize:30}}>Selecione o seu tempo:</Text>
      <View style= {{flexDirection:'row'}}>
        <Text style={{color:'white', paddingTop:16}}>Min:</Text>
      
      <Picker
          selectedValue={minutos}
          onValueChange={(itemValue, itemIndex)=>setarMinutos(itemValue)}
          style={{height: 50, width:100, color:'white' }} 
          >
            <Picker.Item label ='0' value='0'/>
            {
            numeros.map(function(val){
            return(<Picker.Item label ={val.toString()} value= {val.toString()}/>);
            })
            }
      </Picker>
      <Text style={{color:'white', paddingTop:16}}>Seg:</Text>
      <Picker
          selectedValue={segundos}
          onValueChange={(itemValue, itemIndex)=>setarSegundos(itemValue)}
          style={{height: 50, width:100,color:'white' }} 
          >
            
            {
            numeros.map(function(val){
            return(<Picker.Item label ={val.toString()} value= {val.toString()}/>);
            })
            }
      </Picker>
      </View>

      <View style= {{flexDirection:'row'}}>
        {
          alarmeSound.map(function(val){
            if (val.selecionado) {
             return( 
             <TouchableOpacity onPress={()=> setarAlarme(val.id)} style={styles.btnEscolherSelecionado}>
               <Text style={{color:'white'}}>{val.som}</Text>
               </TouchableOpacity>);
            }else{
              return( 
                <TouchableOpacity onPress={()=> setarAlarme(val.id)} style={styles.btnEscolher}>
                  <Text style={{color:'white'}}>{val.som}</Text>
                  </TouchableOpacity>);
            }
          })
        }  
      </View>

        <TouchableOpacity onPress={()=> setarEstado('iniciar')} style={styles.btnIniciar}><Text style={styles.txtIniciar}>INICIAR</Text></TouchableOpacity>
      
    </View>
  
  );
  }else if(estado =='iniciar'){
    
    return(
      <Contador alarmes={alarmeSound} setarMinutos={setarMinutos} setarSegundos={setarSegundos} setarEstado={setarEstado} minutos={minutos} segundos={segundos}></Contador>
    );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#288a82',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnEscolher:{
    marginRight:10,
    padding:8,
    backgroundColor:'rgba(24, 186, 173,0.3)',
    borderRadius:10
  },
  btnEscolherSelecionado:{
    marginRight:10,
    padding:8,
    backgroundColor:'#1c9c92',
    borderRadius:10, 
    borderColor:'white',
    borderWidth:1
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
    fontSize:20
  }
});
