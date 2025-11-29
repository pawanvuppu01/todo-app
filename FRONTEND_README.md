# Todo App - Frontend (Expo)

This frontend is built with Expo and React Native.

## Features
- Login/Signup with JWT
- Dashboard to list todos and swipe to complete
- Add todo modal
- Profile screen with logout

## Run

```bash
pnpm install
pnpm start
```

## Tests

```bash
pnpm test
```

Make sure the backend FastAPI server is running at `http://127.0.0.1:8000` (or set your host IP for physical devices).

## Info
- Uses AsyncStorage for token storage
- Axios for API calls
## Mobile / QR Troubleshooting

If your mobile device can scan the Expo QR code but the app shows empty content or cannot reach the backend, follow these steps:

- Make sure your phone and your development machine are on the same Wi-Fi network.
- Start the backend server on your host machine (not inside a remote container) with:

```bash
cd backend
source .venv/bin/activate
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

- Find your machine's local IP address (Mac example):

```bash
ipconfig getifaddr en0  # or `hostname -I` on Linux
```

- Set the API URL in your environment, using that IP address (port 8000 used in examples), for example in your shell running Expo:

```bash
# Example: set to your machine IP when running on a physical device
export REACT_NATIVE_API_URL="http://<YOUR_HOST_IP>:8000"
pnpm start
```

- Alternatively, use a tunnel (Expo Dev Tools -> Tunnel) or use `ngrok` to expose your backend publicly and set the returned URL in `REACT_NATIVE_API_URL`.

Notes:
- When running the frontend on macOS or on emulator, `127.0.0.1` or `localhost` usually works. For physical devices, `127.0.0.1` points to the device itself, hence the backend is unreachable.
- If you develop inside Codespaces or a remote container, connect the backend to a publicly accessible host or run both backend and Expo on your local machine for easiest mobile access.

- Components: InputField, ButtonPrimary, TodoItem
 - Chat: ChatList, ChatScreen (1‑1 chats)

## Screenshots
- Add screenshots of app here (take screenshots on device/emulator and place into `/assets/images/` then add the display examples below).

