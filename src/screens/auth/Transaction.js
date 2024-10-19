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
  TouchableOpacity,
} from 'react-native';
//import DateTimePicker from '@react-native-community/datetimepicker';

import DatePicker from 'react-native-date-picker';
import Button from '../../components/Button';
import Transactions from '../../transactions.';

const TransactionPage = () => {

  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  //const fDate = `${day}-${month}-${year}`;

  const [date, setDate] = useState(new Date()); //holds todays date
  const [showDate, setShowDate] = useState(false); //dtermines whether to show or hide date picker
  const [whereTO, setWhereTo] = useState('none'); //determines where to display date either (start date or end date input box)
  const [startDate, setStartDate] = useState(today); //holds the start date
  const [endDate, setEndDate] = useState(today); //holds the end date
  const [userDate, setUserDate] = useState(today); //holds the current date selected by user
  const [filteredTransactions, setFilteredTransactions] = useState([]); //holds the filtered list of transactions by selected date
  const [credits, setCredits] = useState(0);
  const [debits, setDebits] = useState(0);
  const [quantitySold, setQuantitySold] = useState(0);
  const [quantityBought, setQuantityBought] = useState(0);

  useEffect(() => {
    // get the transactions of today
    const todayDate = today.toLocaleDateString();
    let quantity = 0;
    let bought = 0;
    let credit = 0;
    let debit = 0;
    let newLst = Transactions.filter(item => item.date === todayDate);
    newLst.forEach(item => {
      if (item.type === 'CR'){
        credit = credit + item.amount;
        quantity = quantity + item.quantity;
      } else {
        debit = debit + item.amount;
        bought = bought + item.quantity;
      }
    });
    setCredits(credit);
    setDebits(debit);
    setQuantitySold(quantity);
    setQuantityBought(bought);
    setFilteredTransactions(newLst);
  }, []);

  const showCalender = dateType => {
    // make the date picker to appear
    setWhereTo(dateType);
    setShowDate(true);
  }

  const saveDate = () => {
    // display the date in the input box and hide date picker
    if (whereTO == 'start') {
      setStartDate(userDate);
    } else {
      setEndDate(userDate);
    }
    setUserDate(today.toLocaleDateString());

    //console.log(userDate)
    setShowDate(false);
  }

  const cancelDate = () => {
    // hide date picker
    setShowDate(false);
  }

  const refreshPage = () => {
    // filter transactions based on the selected dates
    const date1 = String(startDate).split('/');
    let year = date1[2];
    let month = date1[0].padStart(2, '0');
    let day = date1[1].padStart(2, '0');
    let formattedDate1 = `${year}-${month}-${day}`;
  

    const date2 = String(endDate).split('/');
    year = date2[2];
    month = date2[0].padStart(2, '0');
    day = date2[1].padStart(2, '0');
    let formattedDate2 = `${year}-${month}-${day}`;

    formattedDate1 = new Date(formattedDate1).getTime();
    formattedDate2 = new Date(formattedDate2).getTime();


    let quantity = 0;
    let bought = 0;
    let credit = 0;
    let debit = 0;
    let newLst = [];
    Transactions.forEach(item => {
      let fDate = `${item.date.slice(6, 10)}-${item.date.slice(0, 2)}-${item.date.slice(3, 5)}`;
      fDate = new Date(fDate).getTime();
      
      if (fDate >= formattedDate1 && fDate <= formattedDate2) {
        newLst.push(item);
      };
    })
   
    newLst.forEach(item => {
      if (item.type === 'CR'){
        credit = credit + item.amount;
        quantity = quantity + item.quantity;
      } else {
        debit = debit + item.amount;
        bought = bought + item.quantity;
      }
    });
    setCredits(credit);
    setDebits(debit);
    setQuantitySold(quantity);
    setQuantityBought(bought);
    setFilteredTransactions(newLst);
  }


  return (
    <SafeAreaView className="container" style={styles.container}>
      <StatusBar hidden={true} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainScreen}>
          <Text style={styles.title}>Transactions</Text>
          <View className="date" style={styles.date}>
            <TouchableOpacity
              className="startDate"
              hitSlop={10}
              pressRetentionOffset={2}
              onPress={() => showCalender('start')}>
              <TextInput
                placeholder="start date"
                style={styles.dateInput}
                value={startDate}
                readOnly
              />
            </TouchableOpacity>
            <Text>to</Text>
            <TouchableOpacity
              className="endDate"
              hitSlop={10}
              pressRetentionOffset={2}
              onPress={() => showCalender('end')}>
              <TextInput
                placeholder="end date"
                style={styles.dateInput}
                value={endDate}
                readOnly
              />
            </TouchableOpacity>
          </View>
          {showDate?
            <View className="datePicker" style={styles.datePicker} >
              <DatePicker
                date={date}
                mode="date"
                onDateChange={date => setUserDate(date.toLocaleDateString())}
              />
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Button
                  caption="Cancel"
                  background="grey"
                  buttonPress={cancelDate}
                />
                <Button caption="Okay" buttonPress={() => saveDate()}/>
              </View>
            </View>
          : null}
          <View
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              width: Dimensions.get('window').width * 0.9,
            }}>
            <Button caption="Refresh" buttonPress={refreshPage}/>
          </View>
          <View className="table-header" style={styles.tableHeader}>
            <Text style={{...styles.subtitle, flex: 1, fontWeight: '500'}}>Date</Text>
            <Text style={{...styles.subtitle, flex: 3, fontWeight: '500'}}>Description</Text>
            <Text style={{...styles.subtitle, flex: 1, fontWeight: '500'}}>Quantity</Text>
            <Text style={{...styles.subtitle, flex: 2, fontWeight: '500'}}>Unit-cost(N)</Text>
            <Text style={{...styles.subtitle, flex: 2, fontWeight: '500'}}>Amount(N)</Text>
          </View>
          <View className="flatList" style={{width: Dimensions.get('window').width}}>
            <FlatList
              scrollEnabled={false}
              data={filteredTransactions}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <View className="eachTransaction" style={styles.eachTransaction}>
                  <Text style={{...styles.subtitle, flex: 1}}>{item.date}</Text>
                  <Text style={{...styles.subtitle, flex: 3, fontWeight: '500'}}>{item.name}</Text>
                  <Text style={{...styles.subtitle, flex: 1}}>{item.quantity}</Text>
                  <Text style={{...styles.subtitle, flex: 2}}>{item.unitCost}</Text>
                  {item.type === 'CR'?
                    <Text style={{...styles.subtitle, flex: 2, color: 'green'}}>{item.amount}</Text>
                    :
                    <Text style={{...styles.subtitle, flex: 2, color: 'red'}}>-{item.amount}</Text>
                  }
                  
                </View>
              )}
            />
          </View>
          <View className="summary" style={styles.summaryBox}>
            <Text style={styles.summaryText}>
              Total Items Sold: {quantitySold}
            </Text>
            <Text style={styles.summaryText}>Total Revenue: N {credits}</Text>
            <Text style={styles.summaryText}>
              Total Items Paid for: {quantityBought}
            </Text>
            <Text style={styles.summaryText}>
              Total Expenditure: N {debits}
            </Text>
            <Text style={styles.summaryText}>Profit: N {credits - debits}</Text>
            <Text style={styles.summaryText}>
              Profit margin: {100 - (debits * 100) / credits} %
            </Text>
          </View>
        </View>
      </ScrollView>
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
    width: Dimensions.get('window').width ,
    //height: Dimensions.get('window').height,
    paddingHorizontal: 0,
  },
  title: {
    marginVertical: 5,
    paddingTop: 0,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    color: 'black',
  },
  date:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateInput:{
    borderWidth: 1,
    padding: 0,
    paddingHorizontal: 5,
    borderRadius: 4,
    width: Dimensions.get('window').width * 0.3,
    marginHorizontal: 30,
    fontSize: 16,
    color: 'black',
  },
  datePicker:{
    fontSize: 10,
    backgroundColor: 'rgb(150,150,180)',
    borderRadius: 10,
    paddingHorizontal: 5,
    position: 'absolute',
    top: 70,
    zIndex: 100000,
  },
  subtitle: {
    paddingVertical: 5,
    fontSize: 14,
    color: 'black',
    paddingHorizontal: 0,
    flexWrap: 'wrap',
    paddingRight: 2,
  },

  tableHeader: {
    display: 'flex',
    borderTopWidth: 1,
    borderBottomWidth: 2,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignSelf: 'center',
    width: Dimensions.get('window').width,
    paddingHorizontal: 0,
  },
  eachTransaction: {
    display: 'flex',
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 0,
    borderBottomWidth: 1,

  },
  summaryBox: {
    display: 'flex',
    backgroundColor: 'white',
    marginVertical: 30,
    marginHorizontal: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    width: Dimensions.get('window').width,

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

  summaryText: {
    color: 'black',
    fontSize: 15,
    fontWeight: '700',
    paddingHorizontal: 10,
    paddingVertical: 5,
  }
});

export default React.memo(TransactionPage);