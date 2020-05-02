/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import Cotizacion from './components/Cotizacion';
import Formulario from './components/Formulario';
import HeaderCripto from './components/HeaderCripto';
import axios from 'axios';

const App = () => {
  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guardarCriptomoneda] = useState('');
  const [consultarAPI, guardarConsultarAPI] = useState(false);
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando] = useState(false);

  useEffect(() => {
    const cotizarCriptomoneda = async () => {
      if (consultarAPI) {
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
        const resultado = await axios.get(url);
        console.log(resultado.data.DISPLAY[criptomoneda][moneda]);

        guardarCargando(true);

        setTimeout(() => {
          guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
          guardarConsultarAPI(false);
          guardarCargando(false);
        }, 1000);
      }
    };
    cotizarCriptomoneda();
  }, [consultarAPI, criptomoneda, moneda]);

  // mostrar spinner
  const componente = cargando ? (
    <ActivityIndicator size="large" color="#5e49e2" />
  ) : (
    <Cotizacion resultado={resultado} />
  );

  return (
    <>
      <ScrollView>
        <HeaderCripto />
        <Image
          style={styles.imagen}
          source={require('./assets/img/cryptomonedas.png')}
        />
        <View style={styles.contenido}>
          <Formulario
            moneda={moneda}
            criptomoneda={criptomoneda}
            consultarAPI={consultarAPI}
            guardarMoneda={guardarMoneda}
            guardarCriptomoneda={guardarCriptomoneda}
            guardarConsultarAPI={guardarConsultarAPI}
          />
        </View>
        <View style={{marginTop: 20}}>{componente}</View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  imagen: {
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%',
  },
  contenido: {
    marginHorizontal: '2.5%',
  },
});

export default App;
