import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
   mainContainer: {
    height: '100%',
    width: '100%'
   },
   createButtonContainer: {
    position: 'absolute',
    left: 10,
    top: 40
    },
    buttonContainerTop: {
    height: 30,
    borderWidth: 1,
    borderColor: 'rgba(184, 41, 227, 0.5)',
    padding: 5,
    borderRadius: 5,
    backgroundColor: 'rgba(184, 41, 227, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textButton: {
    fontWeight: '600',
    color: 'brown'
  },
   iconX: {
    height: 25,
    width: 25,
    tintColor: 'grey'
   },
   iconXContainer: {
    height: 25,
    width: 25,
    position: 'absolute',
    left: screenWidth - 50,
    top: 50
   },
   cardsContainer: {
    height: '85%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 90
   },
   emptyContent: {
    height: '75%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40
   },
   emptyContentText: {
    fontSize: 20,
    textAlign: 'center'
   },
   buttonContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center'
   },
   opacityBtn: {
    height: 50,
    width: 240,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'pink'
   },
   buttonText: {
    fontSize: 25,
    color: 'white',
    fontWeight: '500'
   },
   loaderDisplay: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
},
   
});


export default styles;