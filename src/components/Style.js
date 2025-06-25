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
    paddingHorizontal:26,
    paddingBlock:14,
    borderRadius:26,
    flexDirection:"row",
    alignItems:"center",
    gap:8

  },
  blocoCard:{
   width: 300,
    height: 150,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,

    // Sombra no iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    // Sombra no Android
    elevation: 8,
  },
  texto: {
    fontSize: 16,
    color: '#333',
  },
  
});

export default styles 
