import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const OrderScreen = ({ navigation }) => {
  const [address, setAddress] = useState('');
  const [items, setItems] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    // Lógica para enviar o pedido
    alert('Pedido enviado com sucesso!');
    navigation.navigate('Home');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Nova Entrega</Text>
      
      <Text style={styles.label}>Endereço de Entrega</Text>
      <TextInput
        style={styles.input}
        placeholder="Rua, Número, Bairro"
        value={address}
        onChangeText={setAddress}
      />
      
      <Text style={styles.label}>Itens para Entrega</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Descreva os itens que precisam ser entregues"
        multiline
        value={items}
        onChangeText={setItems}
      />
      
      <Text style={styles.label}>Observações</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Alguma informação adicional?"
        multiline
        value={notes}
        onChangeText={setNotes}
      />
      
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Solicitar Entrega</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#FF9900',
    padding: 15,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default OrderScreen;