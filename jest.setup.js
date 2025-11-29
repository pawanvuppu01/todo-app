import 'react-native-gesture-handler/jestSetup';

// Silence the warning: Animated: `useNativeDriver` is not supported
// Different react-native versions expose NativeAnimatedHelper at different paths.
const tryMockAnimatedHelper = () => {
	try {
		jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
		return;
	} catch (e) {
		try {
			jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
			return;
		} catch (e2) {
			// Last-resort: create a no-op mock
			jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper', () => ({}));
		}
	}
};

tryMockAnimatedHelper();
