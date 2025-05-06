import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default LoyaltyProgramScreen = () => {
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState('Bronze');
  const [nextReward, setNextReward] = useState(50);

  useEffect(() => {
    const fetchUserData = async () => {
      const userDoc = await firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .get();
      
      const userPoints = userDoc.data().loyaltyPoints || 0;
      setPoints(userPoints);
      
      // Definir nível
      if (userPoints >= 500) {
        setLevel('Diamante');
        setNextReward(null);
      } else if (userPoints >= 200) {
        setLevel('Ouro');
        setNextReward(500);
      } else if (userPoints >= 100) {
        setLevel('Prata');
        setNextReward(200);
      } else {
        setLevel('Bronze');
        setNextReward(100);
      }
    };

    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.levelText}>Nível {level}</Text>
        <Text style={styles.pointsText}>{points} pontos</Text>
      </View>

      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${Math.min(100, (points / nextReward) * 100)}%` }]} />
      </View>
      
      {nextReward && (
        <Text style={styles.nextRewardText}>
          {nextReward - points} pontos para o próximo nível
        </Text>
      )}

      <View style={styles.rewardsContainer}>
        <Text style={styles.sectionTitle}>Seus Benefícios</Text>
        {level === 'Bronze' && (
          <Text>- 5% de cashback em todas as compras</Text>
        )}
        {level === 'Prata' && (
          <>
            <Text>- 10% de cashback em todas as compras</Text>
            <Text>- Entrega grátis em compras acima de R$ 30</Text>
          </>
        )}
        {level === 'Ouro' && (
          <>
            <Text>- 15% de cashback em todas as compras</Text>
            <Text>- Entrega grátis em todas as compras</Text>
            <Text>- Descontos exclusivos</Text>
          </>
        )}
        {level === 'Diamante' && (
          <>
            <Text>- 20% de cashback em todas as compras</Text>
            <Text>- Entrega prioritária grátis</Text>
            <Text>- Descontos exclusivos</Text>
            <Text>- Presentes mensais</Text>
          </>
        )}
      </View>

      <View style={styles.historyContainer}>
        <Text style={styles.sectionTitle}>Histórico de Pontos</Text>
        {/* Lista de transações que geraram pontos */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  levelText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF9900',
  },
  pointsText: {
    fontSize: 18,
    color: '#666',
  },
  progressContainer: {
    height: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
    marginVertical: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FF9900',
    borderRadius: 5,
  },
  nextRewardText: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  rewardsContainer: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  historyContainer: {
    flex: 1,
  },
});