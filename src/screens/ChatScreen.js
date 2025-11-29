import * as ImagePicker from 'expo-image-picker';
import { useContext, useEffect, useRef, useState } from 'react';
import { FlatList, Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import colors from '../theme/colors';
import spacing from '../theme/spacing';

export default function ChatScreen({ route }) {
  const { id } = route.params;
  const { token } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const wsRef = useRef(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${process.env.REACT_NATIVE_API_URL || 'http://localhost:8000'}/chat/conversations/${id}/messages`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setMessages(data || []);
      } catch (e) {
        console.warn('load messages error', e);
      }
    };
    if (token) load();
  }, [id, token]);

  useEffect(() => {
    const wsUrl = `${(process.env.REACT_NATIVE_API_URL || 'http://localhost:8000').replace('http', 'ws')}/ws/conversations/${id}?token=${token}`;
    const ws = new WebSocket(wsUrl);
    ws.onmessage = (ev) => {
      try {
        const d = JSON.parse(ev.data);
        setMessages((m) => [...m, d]);
      } catch (e) {
        setMessages((m) => [...m, { content: ev.data }]);
      }
    };
    ws.onerror = (e) => console.warn('ws err', e);
    wsRef.current = ws;
    return () => ws.close();
  }, [id, token]);

  const send = async () => {
    if (!text.trim()) return;
    // send via REST to persist
    try {
      await fetch(`${process.env.REACT_NATIVE_API_URL || 'http://localhost:8000'}/chat/conversations/${id}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ content: text }),
      });
      setText('');
    } catch (e) {
      console.warn('send error', e);
      // as fallback send via websocket
      try {
        wsRef.current && wsRef.current.send(text);
        setText('');
      } catch (ex) {}
    }
  };

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') return alert('Permission denied');
      const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.7 });
      if (result.cancelled) return;
      // upload
      const uri = result.uri;
      const filename = uri.split('/').pop();
      const match = /\.(\w+)$/.exec(filename || '');
      const ext = match ? match[1] : 'jpg';
      const form = new FormData();
      form.append('file', { uri, name: filename, type: `image/${ext}` });
      const up = await fetch(`${process.env.REACT_NATIVE_API_URL || 'http://localhost:8000'}/media/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });
      const data = await up.json();
      if (data?.url) {
        // post message with url
        await fetch(`${process.env.REACT_NATIVE_API_URL || 'http://localhost:8000'}/chat/conversations/${id}/messages`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ content: data.url }),
        });
      }
    } catch (err) {
      console.warn('image pick/upload error', err);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.container}>
        <FlatList
          data={messages}
          keyExtractor={(i, idx) => (i.id ? i.id.toString() : idx.toString())}
          renderItem={({ item }) => (
            <View style={[styles.msgRow, item.sender_id && item.sender_id === (null) ? styles.msgOut : styles.msgIn]}>
              <View style={styles.msgBubble}>
                {item.content && item.content.startsWith('/media/') ? (
                  <Image source={{ uri: `${process.env.REACT_NATIVE_API_URL || 'http://localhost:8000'}${item.content}` }} style={{ width: 200, height: 120, borderRadius: 8 }} />
                ) : (
                  <Text style={styles.msgText}>{item.content}</Text>
                )}
                {item.created_at ? <Text style={styles.ts}>{new Date(item.created_at).toLocaleTimeString()}</Text> : null}
              </View>
            </View>
          )}
        />

        <View style={styles.composer}>
          <TouchableOpacity onPress={pickImage} style={{ marginRight: 8 }}><Text style={{ color: colors.primary }}>📷</Text></TouchableOpacity>
          <TextInput placeholder='Message' value={text} onChangeText={setText} style={styles.input} />
          <TouchableOpacity onPress={send} style={styles.sendBtn}><Text style={{color:'#fff'}}>Send</Text></TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  msgRow: { padding: spacing.sm },
  msgIn: { alignItems: 'flex-start' },
  msgOut: { alignItems: 'flex-end' },
  msgBubble: { maxWidth: '80%', padding: spacing.sm, backgroundColor: '#fff', borderRadius: 12 },
  msgText: { fontSize: 16 },
  ts: { fontSize: 10, color: colors.subtext, marginTop: 6, textAlign: 'right' },
  composer: { flexDirection: 'row', padding: spacing.sm, borderTopWidth: 1, borderTopColor: colors.border, alignItems: 'center' },
  input: { flex: 1, padding: 10, backgroundColor: '#fff', borderRadius: 8, marginRight: 8 },
  sendBtn: { backgroundColor: colors.primary, padding: 10, borderRadius: 8 },
});
