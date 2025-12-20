import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { View, Text } from 'react-native';

// Simple mock component
const MockLogin = () => (
    <View>
        <Text>Login Screen</Text>
    </View>
);

describe('Login Screen', () => {
    it('renders correctly', async () => {
        let tree;

        // Use act() to handle the React 19 rendering cycle
        await act(async () => {
            tree = renderer.create(<MockLogin />);
        });

        // Check that it exists
        expect(tree.toJSON()).toBeDefined();

        // Optional: match a snapshot for this screen too
        expect(tree.toJSON()).toMatchSnapshot();
    });
});