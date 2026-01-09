import { Text, View, StyleSheet } from 'react-native';

export default function Pending() {
  return (
    <View style={styles.container}>
      <Text className="text-2xl font-bold text-center text-gray-600">Pending is coming soon!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
