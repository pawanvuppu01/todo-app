import { useContext, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import colors from '../theme/colors';
import spacing from '../theme/spacing';

export default function NewChat({ navigation }) {
  const [emails, setEmails] = useState('');
  const [title, setTitle] = useState('');
  const { token } = useContext(AuthContext);

  const create = async () => {
    const list = emails.split(',').map(s => s.trim()).filter(Boolean);
    try {
      const res = await fetch(`${process.env.REACT_NATIVE_API_URL || 'http://localhost:8000'}/chat/conversations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title, participant_emails: list }),
      });
      const data = await res.json();
      navigation.replace('Chat', { id: data.id, title: data.title || 'Chat' });
    } catch (e) {
      alert('Failed to create chat');
    }
  };

  return (
    <View style={{ flex: 1, padding: spacing.md, backgroundColor: colors.background }}>
      <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: spacing.md }}>New Chat</Text>
      <TextInput placeholder='Title (optional)' value={title} onChangeText={setTitle} style={styles.input} />
      <TextInput placeholder='Participant emails, comma separated' value={emails} onChangeText={setEmails} style={[styles.input, { height: 100 }]} multiline />
      <TouchableOpacity style={styles.btn} onPress={create}><Text style={{ color: '#fff', textAlign: 'center' }}>Create</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: spacing.md },
  btn: { backgroundColor: colors.primary, padding: 12, borderRadius: 8 }
});
