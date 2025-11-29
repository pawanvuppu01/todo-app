import React from 'react';
import { render } from '@testing-library/react-native';
import ButtonPrimary from '../ButtonPrimary';

test('renders button with label', () => {
  const { getByText } = render(<ButtonPrimary label="Click" onPress={() => {}}/>);
  expect(getByText('Click')).toBeTruthy();
});
