import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
    width:"100%",
    marginBottom:16,
    borderRadius:16,
    padding:20,
    backgroundColor:"#fff",
    textDecorationColor:"black",
  },
  buttonLogin:{
    borderRadius:20,
    width:"100%",
    height:55,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor: "black",
    padding:8,
    color:"white"
  },
  textButton:{
    textDecorationStyle:"white",
    color:"white",
    fontSize:18,
    fontWeight:600,
  },
  titleLogo:{
    fontSize:50,
    fontWeight:700,
  },
  price:{
     fontSize:50,
    fontWeight:500,
  },
  titleHome:{
    fontSize:24,
    fontWeight:400,

  },
  buttonHome:{
    borderWidth:1,
    borderColor:"#ccc",
    paddingHorizontal:24,
    paddingBlock:14,
    borderRadius:26,
    flexDirection:"row",
    alignItems:"center",
    gap:8,
    //Sombra
    backgroundColor: "#F3F3F3",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.16 ,
    shadowRadius: 3, 
    elevation: 5, 
  },

  blocoCard:{
    flexDirection:"row",
    alignItems:"center",
    margin:8,
    gap:8,
    borderRadius:50,
    borderWidth:1,
    borderColor:"#ccc",
    paddingHorizontal:6,
    paddingRight:26,
    paddingBlock:6,
   
    //Sombra
    backgroundColor: "#F3F3F3",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.16 ,
    shadowRadius: 3, 
    elevation: 5, 
  },
  //Botão da home Rodondo
  buttonCircle:{
    borderWidth:1,
    borderRadius:30,
    padding:12,
    borderColor:"#ccc",
    backgroundColor: "#F3F3F3",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.16 ,
    shadowRadius: 3, 
    elevation: 5,
  },

  //transação

  cardCategory:{
    borderWidth:1,
    borderColor:"#ccc",
    padding:16,
    margin:8,
    borderRadius:20,
    alignItems:"center",
    gap:8,
     backgroundColor: "#F3F3F3",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.16 ,
    shadowRadius: 3, 
    elevation: 5,

  },

  containerTransaction:{
    padding:18,
    borderWidth:1,
    borderRadius:30,
    borderColor:"#ccc",
    //sombra
     backgroundColor: "#F3F3F3",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.16 ,
    shadowRadius: 3, 
    elevation: 5,
  },
  //botão transação 
  buttonTrasanction:{
    borderRadius:20,
    height:55,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor: "black",
    padding:8,
    color:"white"
  },

  //tela pos splash

  backgroundScreenBlack:{
   
    borderTopLeftRadius:50,
    borderTopRightRadius:50,
    backgroundColor: '#232323',
    alignItems: 'center',
    justifyContent: 'center',
    padding:40
    },
    backgroundScreen:{
    flex: 1,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop:50,
    
    },

    ///Perfil button

    buttonPerfil:{
    borderRadius:30,
    width:340,
    margin:8,
    height:75,
    borderWidth:1,
    borderColor:"#ccc",
    justifyContent:"center",
    alignItems:"center",
    backgroundColor: "#F3F3F3",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.16 ,
    shadowRadius: 3, 
    elevation: 5,
    },
    textButtonPerfil:{
      color:"black",
      fontSize:18,
      fontWeight:500
    }
});

export default styles 
