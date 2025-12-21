import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { View, Text, Button } from 'react-native';

const MockSignup = () => (
    <View>
        <Text>Signup</Text>
        <Button title="RUAJ" onPress={() => { }} />
    </View>
);

describe('Signup Screen', () => {
    it('renders correctly and matches snapshot', () => {
        const { toJSON } = render(<MockSignup />);
        expect(toJSON()).toMatchSnapshot();
    });

    it('has a RUAJ button', () => {
        const { getByText } = render(<MockSignup />);
        expect(getByText('RUAJ')).toBeTruthy();
    });

});
