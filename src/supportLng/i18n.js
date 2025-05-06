import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

// Traduções
const resources = {
  en: {
    translation: {
      welcome: 'Welcome',
      orders: 'Orders',
      newOrder: 'New Order',
      // ... outras traduções
    }
  },
  pt: {
    translation: {
      welcome: 'Bem-vindo',
      orders: 'Pedidos',
      newOrder: 'Novo Pedido',
      // ... outras traduções
    }
  },
  es: {
    translation: {
      welcome: 'Bienvenido',
      orders: 'Pedidos',
      newOrder: 'Nuevo Pedido',
      // ... outras traduções
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: Localization.locale.split('-')[0], // pega o idioma do dispositivo
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

// App.js
import './i18n'; // Adicione no topo do seu App.js

// Uso em componentes
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <Text>{t('welcome')}</Text>
  );
}

// LanguageSelector.js
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import i18n from '../i18n';

const LanguageSelector = () => {
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={() => changeLanguage('en')}>
        <Text style={{ marginRight: 10 }}>English</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => changeLanguage('pt')}>
        <Text style={{ marginRight: 10 }}>Português</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => changeLanguage('es')}>
        <Text>Español</Text>
      </TouchableOpacity>
    </View>
  );
};