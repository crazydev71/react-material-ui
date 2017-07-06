import React from 'react';
import { View } from 'react-native';
import { styles } from '../style';

const Card = ({ children }) => <View style={styles.card}>{children}</View>;

export default Card;