import React from 'react';
import { Text } from 'react-native';
import { styles } from '../style';

console.log(styles);

const Title = ({ children }) => (<Text style={styles.title}>{children}</Text>);

export default Title;