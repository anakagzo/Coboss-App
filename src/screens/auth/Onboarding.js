/* eslint-disable prettier/prettier */
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  StyleSheet,
  Dimensions,
} from 'react-native';
import SellerPage from './SellerPage';
import PurchasePage from './PurchasePage';
import TransactionPage from './Transaction';
import Header from '../../components/Header';

 // create the drawer navigator
const Drawer = createDrawerNavigator();


/*
  The Drawer content
  this controls what screen/page to dispaly
*/

// the onboarding screen
const Onboarding = ({navigation}) => {
  //const auth = getAuth(app)
  //const user = auth.currentUser.displayName;
  //const [ displayName, setDisplayName ] = useState(user);
  const customHeader = () => { return (<Header />);};

  return(
      <Drawer.Navigator
        initialRouteName="Transactions"
        screenOptions={{
          header : customHeader,
          drawerStyle: {
            width: 180,
          },
          }}
      >
        <Drawer.Screen name="Cart" component={SellerPage} />
        <Drawer.Screen name="Expenditure" component={PurchasePage}/>
        <Drawer.Screen name="Transactions" component={TransactionPage}/>
      </Drawer.Navigator>
  );};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'skyblue',
  },
  mainScreen: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'white',
    opacity: 0.9,
    alignItems: 'center',
    width: Dimensions.get('window').width,
  },
  textInput: {
    width: 300,
    backgroundColor: 'white',
    color: 'black',
    borderRadius: 5,
    borderWidth: 1,
    fontSize: 16,
    marginTop: 30,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  smallTextInput: {
    display: 'flex',
    borderWidth: 1,
    marginBottom: 20,
    paddingVertical: 0,
    width: 130,
    borderRadius: 5,
  },
  text:{
    fontSize: 16,
    color: 'grey',
    width: 300,
    borderWidth: 0.2,
    borderColor: 'grey',
    padding: 8,
    backgroundColor: 'white',
  },
  smallText:{
   color: 'grey',
   marginBottom: 20,
  },
  flatlist:{
    borderWidth: 0,
    maxHeight: 200,
    borderRadius: 10,
    backgroundColor: 'white',
    zIndex: 1000,
    position: 'absolute',
    top: 115,
  },
  itemBox:{
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 5,
    top: 25,
    width: 300,
    color: 'grey',
  },
  quantityBox:{
    display: 'flex',
    flexDirection: 'column',
  },
  rightColumn:{
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  leftColumn:{
    flex:2,
    paddingVertical: 30,
  },
  cartList:{
    display: 'flex',
    width: Dimensions.get('window').width,
    position: 'absolute',
    bottom: 1,
  },
  cartListInner:{
    paddingHorizontal:10,
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    color: 'black',
    paddingBottom: 5,
    fontSize: 16,
    fontWeight: '900',
    margin: 0,
  },
  headerSubText: {
    color: 'black',
    fontSize: 14,
  },
  rowSpaced: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  eachRow: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderTopWidth: 1,
  },
  pullUpBtn: {
    position: 'absolute',
    bottom: 1,
    width: 60,
    height: 12,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: 'grey',
  },
  cartFooter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

});

export default React.memo(Onboarding);
