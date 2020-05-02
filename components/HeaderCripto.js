import {Platform, StyleSheet, Text, View} from 'react-native';

import React from 'react';

const HeaderCripto = () => {
  return <Text style={styles.encabezado}>Criptomonedas</Text>;
};

export default HeaderCripto;

const styles = StyleSheet.create({
  encabezado: {
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    fontFamily: 'Lato-Black',
    backgroundColor: '#5e49e2',
    paddingBottom: 16,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 20,
    color: '#fff',
    marginBottom: 30,
    letterSpacing: 2,
  },
});
