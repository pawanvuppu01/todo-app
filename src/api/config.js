import { Platform } from 'react-native';
import Constants from 'expo-constants';

// Derive API host for different running environments. This helps when running Expo
// on a physical device (QR) where 127.0.0.1 refers to the device, not the host.
const DEFAULT_PORT = 8000;

function getLocalHostFromDebuggerHost() {
  // expo's debuggerHost is "<host>:<port>". Use the host part.
  const dh = Constants.manifest?.debuggerHost || Constants.expoConfig?.extra?.host;
  if (!dh) return null;
  const host = dh.split(':')[0];
  if (!host) return null;
  return host;
}

export function getApiBaseUrl() {
  if (process?.env?.REACT_NATIVE_API_URL) {
    return process.env.REACT_NATIVE_API_URL; // explicit override
  }

  if (Platform.OS === 'web') return `http://127.0.0.1:${DEFAULT_PORT}`;
  if (Platform.OS === 'android') {
    // Android Emulator uses 10.0.2.2 as host machine loopback
    return `http://10.0.2.2:${DEFAULT_PORT}`;
  }

  // For iOS simulator or physical device, try to extract the host IP used by Expo
  const hostFromDebugger = getLocalHostFromDebuggerHost();
  if (hostFromDebugger) return `http://${hostFromDebugger}:${DEFAULT_PORT}`;

  // Last resort: localhost
  return `http://127.0.0.1:${DEFAULT_PORT}`;
}

export default getApiBaseUrl();
