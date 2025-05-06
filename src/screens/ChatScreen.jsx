import React, { useState, useEffect } from 'react';
import { Viwe, FlatList, TextInput, Button } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { auth } from '../services/firebase';

const ChatScreen = ({ route }) => {
    const { orderId } = route.params;
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        const unsubscribe = firestore()
        .collection('chats')
        .doc(orderId)
        .collection('messages')
        .orderBy('createdAt', 'desc')
        .onSnapshot(snapshot => {
            const msgs = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setMessages(msgs);
        });
        return unsubscribe;
    }, [orderId]);

    const sendMessage = async () => {
        if (newMessage.trim()) {
            await firestore()
            .collection('chats')
            .doc(orderId)
            .collection('messages')
            .add({
                text: newMessage,
                createdAt: firestore.FieldValue.serverTimestamp(),
                sendId: auth().currentUser.uid,
                senderType: 'customer', // ou rider/store conforme o usuário
            });
            setNewMessage('');
        }
    };

    return (
        <View style={{ flex: 1 }}>
          <FlatList
            inverted
            data={messages}
            renderItem={({ item }) => (
              <View style={{ 
                alignSelf: item.senderId === auth().currentUser.uid ? 'flex-end' : 'flex-start',
                backgroundColor: item.senderId === auth().currentUser.uid ? '#DCF8C6' : '#ECECEC',
                padding: 10,
                borderRadius: 8,
                margin: 5,
              }}>
                <Text>{item.text}</Text>
              </View>
            )}
            keyExtractor={item => item.id}
          />
          <View style={{ flexDirection: 'row', padding: 10 }}>
            <TextInput
              style={{ flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 20, padding: 10 }}
              value={newMessage}
              onChangeText={setNewMessage}
              placeholder="Digite sua mensagem"
            />
            <Button title="Enviar" onPress={sendMessage} />
          </View>
        </View>
      );
    };

    export default ChatScreen;