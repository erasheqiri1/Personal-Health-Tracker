import React from 'react';
import { render } from '@testing-library/react-native';
import { Text, View } from 'react-native';


const SimpleComponent = () => (
    <View>
        <Text>Hello Health Tracker!</Text>
    </View>
);

describe('Smoke Test', () => {
    it('renders correctly', () => {
        const { getByText } = render(<SimpleComponent />);
        expect(getByText('Hello Health Tracker!')).toBeTruthy();
    });

});
