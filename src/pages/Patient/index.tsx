import React from 'react';
import { Text, View, StyleSheet, Image, FlatList, ScrollView } from "react-native";
import photo from '../../../assets/PerfilPhoto.jpg';





  const infoData =[ {
      id: 1,
      nascimento: "07/12/1999",
      estadoCivil: "Casado",
      Naturalidade: "Maranhão", 
      CPF: "61906410321",
      RG: "1234567890",
      FatorSanguineo: "0+",
      Convenio: "UNIMED",
      Plano: "Especial",
      Matricula: "12345"

  }]



const Patient = () => {
    const renderSeparatorView = () => (
          <View style={{
              height: 1, 
              width: "100%",
              backgroundColor: "#CEDCCE",
            }}
          />
        );
      


  return (
    <View style={{ paddingTop: 20}}>
        <View style={styles.PerfilContainer}>
            <Image source={photo} style={{height: 70, width: 70, borderRadius: 100}}/>
            <View style={styles.PerfilContainerText}>    
                <Text style={styles.Name}>Wesley Sousa</Text>
                <Text>21 anos * Masculino</Text>
            </View>
        </View>

        <ScrollView style={styles.Info}>
            
            <FlatList
                ItemSeparatorComponent={renderSeparatorView}
                data={infoData}
                renderItem={({item}) => (
                    <>
                        <Text style={{padding:15, fontWeight: 'bold'}}>Informações Principais</Text>
                        <View style={styles.InfoTextView}>
                        <Text>Data de Nascimento  </Text>
                        <Text>{item.nascimento}</Text>
                        </View>  
                        <View style={styles.line}/>

                        <View style={styles.InfoTextView}>
                        <Text>Estado Civil  </Text>
                        <Text>{item.estadoCivil}</Text>
                        </View>
                        <View style={styles.line}/>

                        <View style={styles.InfoTextView}>
                        <Text>Naturalidade</Text>
                        <Text>{item.Naturalidade}</Text>
                        </View>  
                        <View style={styles.line}/>

                        <View style={styles.InfoTextView}>
                        <Text>CPF</Text>
                        <Text>{item.CPF}</Text>
                        </View>  
                        <View style={styles.line}/>

                        <View style={styles.InfoTextView}>
                        <Text>RG</Text>
                        <Text>{item.RG}</Text>
                        </View>  
                        <View style={styles.line}/>

                        <View style={styles.InfoTextView}>
                        <Text>Fator Sanguineo</Text>
                        <Text>{item.FatorSanguineo}</Text>
                        </View>  
                        <View style={styles.line}/>

                        <Text style={{padding:15, fontWeight: 'bold'}}>Plano de Saúde</Text>

                        <View style={styles.InfoTextView}>
                        <Text>Convenio</Text>
                        <Text>{item.Convenio}</Text>
                        </View>  
                        <View style={styles.line}/>

                        <View style={styles.InfoTextView}>
                        <Text>Plano</Text>
                        <Text>{item.Plano}</Text>
                        </View>  
                        <View style={styles.line}/>

                        <View style={styles.InfoTextView}>
                        <Text>Matricula</Text>
                        <Text>{item.Matricula}</Text>
                        </View>  
                        <View style={styles.line}/>
                    </>
                )}
            />
        </ScrollView>




   

    </View>
  )
}


const styles = StyleSheet.create({
  renderContainer: {
    padding: 10,
  },

  renderText: {

  },
  Name:{
    fontSize: 20,
    fontWeight: "bold"
  },
  PerfilContainer:{
      paddingTop: 20,
      paddingLeft: 20,
      flexDirection: "row",
      alignItems: "center",
    

  },
  PerfilContainerText:{
    flexDirection: "column",
    paddingLeft: 25

},
 Info:{
    padding: 5,

   
 },
 InfoTextView:{
     padding: 15,
     justifyContent: 'space-between',
     flexDirection: "row"
 },
line:{
    height: 1, 
    width: "100%",
    backgroundColor: "#CEDCCE",
}
});

export default Patient;