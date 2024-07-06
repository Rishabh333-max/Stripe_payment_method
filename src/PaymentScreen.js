import React, {useRef, useState} from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  CardField,
  confirmPayment,
  createToken,
  useStripe,
} from '@stripe/stripe-react-native';
import CommonButton from '../Button';
import createPaymentIntent from './apis/StripeApi';
import {LoaderView} from './Utils/LoaderView';

const PaymentScreen = () => {
  const cardFieldRef = useRef();
  const [cards, setCards] = useState([]);
  const [cardDetails, setCardDetails] = useState(null);
  const [cardInfo, setCardInfo] = useState(null);
  const [loader, setLoader] = useState(false);

  const fetchCardDetail = cardDetail => {
    if (cardDetail.complete) {
      setCardInfo(cardDetail);
    } else {
      setCardInfo(null);
    }
  };

  const handlePress = item => {
    Alert.alert(
      'Confirm Payment',
      `Do you want to pay with this card?\n\nCard Number: ${item.last4}\nCard Brand: ${item.brand}\nCard Expiry: ${item.expiryMonth}/${item.expiryYear}`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Payment Cancelled'),
          style: 'cancel',
        },
        {
          text: 'Pay',
          onPress: () => onDonePayment('created'),
        },
      ],
      {cancelable: true},
    );
  };

  const onDonePayment = async command => {
    setLoader(true);
    let api_data = {
      amount: 1200,
      currency: 'eur',
    };
    try {
      const res = await createPaymentIntent(api_data);
      console.log('ress create succ', res);
      if (res?.data?.paymentIntent) {
        let confirmPaymentIntent = confirmPayment(res?.data?.paymentIntent, {
          paymentMethodType: 'Card',
        });
        console.log('confirmPaymentIntent', confirmPaymentIntent);
        setLoader(false);
        Alert.alert('Payment done successfully!');
        if (command == 'created') {
          return;
        } else {
          setCardDetails(null);
          setCardInfo(null);
          cardFieldRef.current.clear();
          setCards([...cards, cardDetails]);
        }
      }
    } catch (error) {
      setLoader(false);
      console.log('error placed during payment intent', error);
    }

  };
  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <CardField
          ref={cardFieldRef}
          postalCodeEnabled={false}
          placeholders={{
            number: '4242 4242 4242 4242',
          }}
          cardStyle={{
            backgroundColor: '#FFFFFF',
            textColor: '#000000',
          }}
          style={{
            width: '100%',
            height: 50,
            marginVertical: 30,
          }}
          onCardChange={cardDetails => {
            fetchCardDetail(cardDetails);
            if (cardDetails.complete) {
              setCardDetails(cardDetails);
            }
          }}
          onFocus={focusedField => {
            console.log('focusedField', focusedField);
          }}
        />
        <ScrollView>
          <CommonButton
            text={'Save Card'}
            onPress={() => {
              setCards([...cards, cardDetails]);
              setCardDetails(null);
              setCardInfo(null);
              cardFieldRef.current.clear();
            }}
            disable={!cardInfo}
          />

          {
            <CommonButton
              text={'Pay'}
              disable={!cardInfo}
              onPress={() => {
                onDonePayment();
              }}
            />
          }

          {cards.map((item, index) => {
            return (
              <TouchableOpacity
                style={styles.touch}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.cardText}>Card Number:</Text>
                  <Text style={styles.cardText}>{item.last4}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.cardText}>Card Brand:</Text>
                  <Text style={styles.cardText}>{item.brand}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.cardText}>Card Expiry Month:</Text>
                  <Text style={styles.cardText}>{item.expiryMonth}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.cardText}>Card Expiry Year:</Text>
                  <Text style={styles.cardText}>{item.expiryYear}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: 'grey',
                      height: 30,
                      width: 80,
                      borderRadius: 10,
                      marginVertical: 20,
                      right: 10,
                      alignItems: 'center',
                    }}
                    onPress={() => handlePress(item)}>
                    <Text style={StyleSheet.cardText}>Pay</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </SafeAreaView>
      <LoaderView isLoading={loader} />
    </View>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    color: 'white',
    fontWeight: '600',
    marginHorizontal: 20,
    marginVertical: 5,
  },
  touch:{
    backgroundColor: '#D76540',
    minHeight: 80,
    marginHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
  }
});
export default PaymentScreen;
