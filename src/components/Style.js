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
    marginTop: 60,
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
    marginBlock:12,
    gap:8,
    borderRadius:50,
    borderWidth:1,
    borderColor:"#ccc",
    paddingHorizontal:6,
    paddingRight:26,
    paddingBlock:6,
    marginHorizontal:8,
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
  }
});

export default styles 
