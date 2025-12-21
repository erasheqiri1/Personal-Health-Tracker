import '@testing-library/jest-native/extend-expect';

// Mock Expo Router
jest.mock('expo-router', () => ({
    Stack: { Screen: () => null },
    router: {
        push: jest.fn(),
        replace: jest.fn(),
    },
    useLocalSearchParams: () => ({}),
}));
