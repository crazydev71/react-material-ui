import {StyleSheet} from 'react-native';
// Styles
export const styles = StyleSheet.create({
  card: {
  //  flexGrow: 1,
    justifyContent: 'center'
  },
  title: {
    textAlign: 'center',
    fontSize: '1.25rem',
    color: '#666666',
  },
  fullSupport: {
    flex: 1,
    padding: 20
  },
  inputField: {
    borderColor: '#ddd',
    padding: 20,
    borderBottomWidth: 0.5
  },
  image: {
    marginTop: '100px',
    justifyContent: 'center',
    //width: 100,
    height: 70,
  }
})


export const colorStyles = StyleSheet.create({
  white: { color: 'white' },
  gray: { color: 'gray' },
  red: { color: 'red' },
  green: { color: 'green' }
})

export const sizeStyles = StyleSheet.create({
  small: { fontSize: '0.85rem', padding: '0.5rem' },
  normal: { fontSize: '1rem', padding: '0.75rem' },
  large: { fontSize: '1.5rem', padding: '1rem' }
})

export const weightStyles = StyleSheet.create({
  light: { fontWeight: '300' },
  normal: { fontWeight: '400' },
  bold: { fontWeight: '700' }
})