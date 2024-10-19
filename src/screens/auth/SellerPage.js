/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Pressable,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Button from '../../components/Button';
import DeleteBtn from '../../components/DeleteBtn';
import Checkbox from '../../components/Checkbox';
import Products from '../../products';
import PullUp from 'react-native-pull-ups';


const SellerPage = ({}) => {

  const [filteredList, setFilteredList] = useState([]); // stores the list of words in the database that matches the typed text
  const [inputVal, setInputVal] = useState(''); // stores the content of the Search box
  const [itemToBuy, setItemToBuy] = useState(null); // stores the details of item to be bought
  const [itemCart, setItemCart] = useState([]); // stores the items in the cart
  const [totalCount, setTotalCount] = useState(0); // stores the total count of items in the cart
  const [totalQuantity, setTotalQuantity] = useState(0); // stores the total quantity of items in the cart
  const [totalCost, setTotalCost] = useState(0); // stores the total cost of items in the cart
  const [cartList, setCartList] = useState('hidden'); // determines whether the cart is visible or not at the bottom of screen
  const [quantityEntered, setQuantityEntered] = useState(0); // stores the quantity of an item typed in by user
  const [invalidQuantity, setInvalidQuantity] = useState('none'); // checks that user typed in the valid number into the quantity box
  const [itemIndexList, setItemIndexList] = useState([]);  // stores the indices of the items in the cart



  const findWord = (text) => {
    // search the database for the word that best matches the text in the input box
    if (text) {
      setInputVal(text);
      let newList = Products.filter((item) => item.name.toLowerCase().includes(text.toLowerCase()));
      setFilteredList(newList);
    }
    else {
      setFilteredList([]);
      setInputVal('');
    }
  };


  const handleClick = (item) => {
    // execute when an item is selected on the drop down list
    setInputVal(item.name);
    setFilteredList([]);
    setItemToBuy(item);
  };


  const hideItemBox = () => {
    // close the item box (after the user clicks 'add to cart)
    setItemToBuy(null);
    setInputVal('');
  };


  const addToCart = () => {
    // add an item to cart and update the cart
    const unitCost = itemToBuy.cost;
    const name = itemToBuy.name;
    const quantityBought = parseInt(quantityEntered, 10);
    const totalPrice = quantityEntered * unitCost;
    const item = {name: name,
                  quantity: quantityBought,
                  unitCost: unitCost,
                  totalCost: totalPrice};
    
    if (quantityEntered > 0 && quantityEntered <= itemToBuy.quantity){
      setItemCart((prev) => [...prev, item]);
      setTotalCount(prev => prev + 1);
      setTotalQuantity(prev => prev + quantityBought);
      setTotalCost(prev => prev + totalPrice);
      setItemToBuy(null);
      setInputVal('');
    }
    else {
      setInvalidQuantity('flex');
      setTimeout(() => setInvalidQuantity('none'), 4000);
    }
  };


  const togglePullUp = () => {
    // make the cart list to expand or hide it
    setCartList(prevState => (prevState === 'collapsed' ? 'expanded' : 'collapsed'));
  };


  const deleteItem = () => {
    // delete item/items from the cart
    const newlst = itemCart.filter((item, index) => !itemIndexList.includes(index));
    let newQuantity = 0;
    let newCost = 0;
    let count = 0;
    newlst.forEach(item => {
      newQuantity += item.quantity;
      newCost += item.totalCost;
      count += 1;
    });
    setTotalCount(count);
    setTotalQuantity(newQuantity);
    setTotalCost(newCost);
    setItemCart(newlst);

    setItemIndexList([]);
  };

  const markItem = (index) => {
    // mark items to be deleted
    if (itemIndexList.includes(index)) {
      setItemIndexList(prev => { return (prev.filter(item => item !== index))}
      );
    }
    else {
      setItemIndexList(prev => [...prev, index]);
    }
  };

  /*
    Components to display on the screen
  */
  return (
    <SafeAreaView className="container" style={styles.container}>
      <StatusBar hidden={true}/>
      <View style={styles.mainScreen}>
        

        <TextInput
          onChangeText={val => findWord(val)}
          //autoFocus={true}
          placeholder="type here"
          style={styles.textInput}
          keyboardType="default"
          value={inputVal}
        />
        <View style={styles.flatlist}>
          <FlatList
            data={filteredList}
            keyExtractor={(item)=>item.name}
            renderItem={({item})=> (
            <Pressable
              hitSlop={6}
              pressRetentionOffset={1}
              onPress={() => handleClick(item)}>
                <Text style={styles.text}
                >{item.name}</Text>
            </Pressable>
            )}
          />
        </View>
        { itemToBuy ?
            <View style={styles.itemBox}>
              <View className="left-column" style={styles.leftColumn}>
                <View style={styles.quantityBox}>
                  <TextInput
                    className="quantity box"
                    style={styles.smallTextInput}
                    placeholder="enter quantity"
                    keyboardType="numeric"
                    autoFocus={true}
                    onChangeText={val => setQuantityEntered(val)}
                  />
                <Text className="invalid-quantity" style={{color: 'red', display: invalidQuantity}}>quantity in stock exceeded! or invalid entry.</Text>
                </View>
                <Text style={styles.smallText}>Quantity in stock: {itemToBuy.quantity}</Text>
                <Text style={styles.smallText}>Unit price: N {itemToBuy.cost}</Text>
              </View>
              <View className="right-column" style={styles.rightColumn}>
                <DeleteBtn btnClick={hideItemBox}/>
                { quantityEntered  ?
                  <Button
                    caption="Add to Cart"
                    buttonPress={addToCart}
                  />
                : null}
              </View>
            </View> : null
           }
        <TouchableOpacity style={styles.pullUpBtn}
                          hitSlop={20} 
                          pressRetentionOffset={20}
                          onPressIn={togglePullUp}
                          >
          <Text/>
        </TouchableOpacity>
        <View style={styles.cartList}>
            <PullUp
              state={cartList}
              collapsedHeight={50}
              onStateChanged={(newState) => setCartList(newState)}
              style={{borderTopLeftRadius: 30, borderTopRightRadius: 30}}
            > 
              <View style={styles.cartListInner}>
                 <Text style={styles.headerText}>Cart</Text> 
                 <View style={styles.rowSpaced}>
                    <Text style={styles.headerSubText}>Item Count: {totalCount}</Text>
                    <Text style={styles.headerSubText}>Total Quantity: {totalQuantity}</Text>
                    <Text style={styles.headerSubText}>Total Cost: N{totalCost}</Text>
                 </View> 
                 {itemCart ?
                  <View>
                      <FlatList
                        data={itemCart}
                        keyExtractor={(item)=>item.name}
                        renderItem={({item, index})=> (
                        <View style={styles.eachRow}>
                          <View style={{...styles.rowSpaced, marginBottom: 0}}>
                            <Text style={{...styles.headerSubText, fontWeight: '800'}}>{item.name} </Text>
                            <Checkbox 
                              action={markItem}
                              index={index}
                            />
                          </View>
                          <View style={styles.rowSpaced}>
                            <Text style={styles.headerSubText}>CPQ: N{item.unitCost}</Text>
                            <Text style={{...styles.headerSubText}}>Qty: {item.quantity}</Text>
                            <Text style={styles.headerSubText}>Cost: N{item.totalCost}</Text>
                          </View>
                        </View>
                        )}
                      />
                      <View className="cart-footer" style={styles.cartFooter}>
                        <Button
                          caption="submit"
                        />
                        <Button
                          caption="remove"
                          background="grey"
                          buttonPress={deleteItem}
                        />
                      </View>
                  </View>
                 : null}
              </View>
            </PullUp>
        </View>

      </View>
    </SafeAreaView>
  );
};


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
    top: 70,
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
  }

});

export default React.memo(SellerPage);
