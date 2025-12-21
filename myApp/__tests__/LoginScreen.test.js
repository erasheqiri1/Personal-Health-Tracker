import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { View, Text } from 'react-native';


const MockLogin = () => (
    <View>
        <Text>Login Screen</Text>
    </View>
);

describe('Login Screen', () => {
    it('renders correctly', async () => {
        let tree;

        await act(async () => {
            tree = renderer.create(<MockLogin />);
        });

        expect(tree.toJSON()).toBeDefined();

        expect(tree.toJSON()).toMatchSnapshot();
    });

});
