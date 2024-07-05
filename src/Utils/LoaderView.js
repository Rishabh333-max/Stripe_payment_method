import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

const LoaderView = ({isLoading}) => {
  return isLoading ? (
    <View style={styles.mainView}>
      <ActivityIndicator
        animating={isLoading}
        size={'large'}
        color={'white'}
      />
      <Text style={{fontFamily: '600', color: 'white'}}>
        {"Loading"}
      </Text>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  mainView: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'rgba(52, 52, 52, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
});
// const LoaderView = React.memo(LoaderViewComponent)

export {LoaderView};
