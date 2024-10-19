import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TextInput,
  View,
  FlatList,
} from 'react-native';
import Button from '../../components/Button';
import DeleteBtn from '../../components/DeleteBtn';

const PurchasePage = () => {

  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  const fDate = `${day}-${month}-${year}`;

  const [date, setDate] = useState(fDate);
  const [invoiceNum, setInvoiceNum] = useState();
  const [companyName, setCompanyName] = useState();
  const [numOfItems, setNumOfItems] = useState([
    {id: 1, ItemName: '', quantity: '', uPrice: '', amount: ''},
  ]); // stores the list of items on the screen
  const [currentAmount, setCurrentAmount] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);


  const getSummary = async () => {
    // calculate the total amount and quantity
    let amount = 0;
    let quantity = 0;
    numOfItems.forEach(item => {
      amount = amount + parseInt(item.amount, 10);
      quantity = quantity + parseInt(item.quantity, 10);
    });
    setTotalAmount(amount);
    setTotalQuantity(quantity);
  };
  
  const createNewItem = () => {
    // create a new item section

    const newItem = {
      id: numOfItems[numOfItems.length - 1].id + 1,
      itemName: '',
      quantity: '0',
      uPrice: '0',
      amount: '0',
    };
    setNumOfItems(prev => [...prev, newItem]);
  };

  const deleteItemBox = id => {
    // delete an item box
    const newlst = numOfItems.filter(item => item.id !== id);
    setNumOfItems(newlst);
    getSummary();
    setCurrentAmount(id);
  };

  const handleSumbit = () => {
    // validate the inputs and submit when no errors

    getSummary();
  }


  /*
  const validateDate = (date) => {
    // validate the date
    
    const regex = /^[0-9][0-9]-[0-9][0-9]-[0-9]{4}$/;
    const isValid = regex.test(date);
    if (isValid) {
      let day = date.slice(0, 2);
      let month = date.slice(3, 5);
      let year = date.slice(6, 10);
    }
    console.log(isValid)
  };*/

  const valChange = (id, field, val) => {
    // change the values of items in the record
    numOfItems.forEach(item => { 
      if (item.id == id) {
        item[field] = val;
        item.amount = parseInt(item.uPrice, 10) * parseInt(item.quantity, 10);
        // calculate the current amount and store
        setCurrentAmount(item.amount); //adding this line of code makes the screen to refresh to update the amount
      }
    });
  };


  return (
    <SafeAreaView className="container" style={styles.container}>
      <StatusBar hidden={true} />
      <View style={styles.mainScreen}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Expenditure</Text>
          <View className="form" style={styles.form}>
            <TextInput
              maxLength={10}
              placeholder="Date eg. dd-mm-yyyy"
              style={styles.textInput}
              keyboardType="number-pad"
              value={date}
              readOnly={true}
            />
            <TextInput
              onChangeText={val => setInvoiceNum(val)}
              placeholder="Invoice num"
              style={styles.textInput}
              keyboardType="numeric"
            />
            <TextInput
              onChangeText={val => setCompanyName(val)}
              placeholder="Company/ Name"
              style={styles.textInput}
              keyboardType="text"
            />
          </View>
          <FlatList
            scrollEnabled={false}
            data={numOfItems}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => (
              <View className="form" style={{...styles.form, display: 'flex'}}>
                <View className="item-header" style={styles.itemHeader}>
                  <Text className="sub-title" style={styles.subtitle}>
                    Item {index + 1}{' '}
                  </Text>
                  {item.id !== 1 ?
                    <DeleteBtn
                      btnClick={deleteItemBox}
                      extraVal={{id: item.id}}
                    />
                   : null}
                </View>
                <TextInput
                  onChangeText={val => valChange(item.id, 'itemName', val)}
                  placeholder="name"
                  style={styles.textInput}
                  keyboardType="text"
                />
                <TextInput
                  onChangeText={val => valChange(item.id, 'quantity', val)}
                  placeholder="quantity"
                  style={styles.textInput}
                  keyboardType="numeric"
                />
                <TextInput
                  onChangeText={val => valChange(item.id, 'uPrice', val)}
                  placeholder="N unit-price"
                  style={styles.textInput}
                  keyboardType="number-pad"
                />
                <Text style={styles.textInput}>
                  Amount: N {item.uPrice * item.quantity}
                </Text>
              </View>
            )}
          />
          <View className="add-item-section" style={styles.addItem}>
            <Button
              caption="add another item"
              background="grey"
              buttonPress={createNewItem}
            />
          </View>
          <TextInput
            placeholder="Comment"
            style={styles.commentBox}
            multiline={true}
            //maxLength={10}
          />
          <View className="summary" style={styles.summaryBox}>
            <Text style={styles.summaryText}>
              Total Quantity: {totalQuantity ? totalQuantity : 0}
            </Text>
            <Text style={styles.summaryText}>
              Total Amount: N {totalAmount ? totalAmount : 0}
            </Text>
          </View>
          <Button caption="Submit" buttonPress={handleSumbit}/>
        </ScrollView>
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
  title: {
    marginVertical: 5,
    paddingTop: 0,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    color: 'black',
  },
  subtitle: {
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 16,
    color: 'grey',
    fontStyle: 'italic',
  },
  itemHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  form: {
    marginTop: 40,
    //marginBottom: 40,
    borderTopWidth: 0.5,
    borderColor: 'grey',
  },
  textInput: {
    width: 300,
    backgroundColor: 'white',
    color: 'black',
    borderRadius: 5,
    borderWidth: 1,
    fontSize: 16,
    marginTop: 10,
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
  addItem: {
    margin: 20,
    borderTopWidth: 1,
    borderColor: 'grey',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  commentBox: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    //height: 100,
    maxWidth: Dimensions.get('window').width * 0.8,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
  summaryBox: {
    display: 'flex',
    paddingVertical: 2,
    paddingHorizontal: 1,
    marginVertical: 20,
  },
  summaryText: {
    fontSize: 16,
    color: 'black',
    paddingVertical: 5,
  },
});

export default React.memo(PurchasePage);
