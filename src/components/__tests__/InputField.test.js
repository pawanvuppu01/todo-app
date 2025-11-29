import React from 'react';
import { render } from '@testing-library/react-native';
import InputField from '../InputField';

test('renders label and input', () => {
  const { getByText, getByPlaceholderText } = render(<InputField label="Email" placeholder="email@example.com" value="" onChangeText={() => {}} />);
  expect(getByText('Email')).toBeTruthy();
  expect(getByPlaceholderText('email@example.com')).toBeTruthy();
});
