import { StyleSheet } from 'react-native';

export const plain = StyleSheet.create({
  card: {
    position: 'relative',
    margin: 10,
    borderRadius: 5,
    elevation: 1,
    borderWidth: 0,
  },
  cardTitle: {
    textAlign: 'left',
    fontSize: 30,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  switcher: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    elevation: 1,
  },
});
