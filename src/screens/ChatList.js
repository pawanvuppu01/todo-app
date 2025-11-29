import { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import colors from '../theme/colors';
import spacing from '../theme/spacing';

export default function ChatList({ navigation }) {
  const { token } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    // fetch conversations
    const load = async () => {
      try {
        const res = await fetch(`${process.env.REACT_NATIVE_API_URL || 'http://localhost:8000'}/chat/conversations`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setConversations(data || []);
      } catch (e) {
        console.warn('Failed to load conversations', e);
      }
    };
    if (token) load();
  }, [token]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chats</Text>
      <FlatList
        data={conversations}
        keyExtractor={(i) => i.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('Chat', { id: item.id, title: item.title || 'Chat' })}>
            <View>
              <Text style={styles.title}>{item.title || 'Conversation'}</Text>
              <Text style={styles.sub}>Tap to open</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <View style={{ marginTop: 40, alignItems: 'center' }}>
            <Text style={{ color: colors.subtext }}>No conversations yet</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.md, backgroundColor: colors.background },
  header: { fontSize: 24, fontWeight: '700', marginBottom: spacing.md },
  row: { padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  title: { fontSize: 16, fontWeight: '600' },
  sub: { color: colors.subtext, marginTop: 4 },
});
