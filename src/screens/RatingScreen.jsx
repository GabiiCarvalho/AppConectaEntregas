import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const RatingScreen = ({ route, navigation }) => {
  const { orderId } = route.params;
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const submitRating = async () => {
    try {
      await firestore()
        .collection('orders')
        .doc(orderId)
        .update({
          rating,
          ratingComment: comment,
          ratedAt: firestore.FieldValue.serverTimestamp(),
        });
      
      navigation.goBack();
      alert('Avaliação enviada com sucesso!');
    } catch (error) {
      alert('Erro ao enviar avaliação');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Avalie sua experiência</Text>
      
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity 
            key={star} 
            onPress={() => setRating(star)}
          >
            <Icon 
              name={star <= rating ? 'star' : 'star-border'} 
              size={40} 
              color="#FFD700" 
            />
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.commentInput}
        placeholder="Deixe um comentário (opcional)"
        multiline
        value={comment}
        onChangeText={setComment}
      />

      <TouchableOpacity 
        style={styles.submitButton} 
        onPress={submitRating}
        disabled={rating === 0}
      >
        <Text style={styles.submitButtonText}>Enviar Avaliação</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    minHeight: 100,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#FF9900',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

// Componente reutilizável StarRating.js
const StarRating = ({ rating, onRate, size = 24, editable = true }) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity 
          key={star} 
          onPress={() => editable && onRate(star)}
          activeOpacity={editable ? 0.7 : 1}
        >
          <Icon 
            name={star <= rating ? 'star' : 'star-border'} 
            size={size} 
            color="#FFD700" 
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default RatingScreen;