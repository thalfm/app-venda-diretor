import React from 'react';
import { NavigationContainer as Container} from '@react-navigation/native';

import MainStack from './MainStack';

export default function NavigationContainer() {
    return (
        <Container>
                <MainStack />
        </Container>
    );
}