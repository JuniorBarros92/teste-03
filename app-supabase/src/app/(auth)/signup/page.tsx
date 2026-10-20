import colors from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
    Alert,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../../../lib/supabase";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert("Erro", error.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    router.replace("/");
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Pressable
              style={styles.backButton}
              onPress={() => router.replace("/")}
              accessibilityRole="button"
              accessibilityLabel="Voltar para entrar"
            >
              <Ionicons name="arrow-back" size={24} color={colors.white} />
            </Pressable>

            <Text style={styles.logoText}>
              Dev<Text style={{ color: colors.green }}>App</Text>
            </Text>
            <Text style={styles.slogan}>Criar uma Conta</Text>
          </View>

          <View style={styles.form}>
            <View>
              <Text style={styles.label}>Nome Completo</Text>
              <TextInput
                placeholder="Digite seu nome completo..."
                style={styles.input}
                value={name}
                onChangeText={setName}
              />
            </View>

            <View>
              <Text style={styles.label}>Email</Text>
              <TextInput
                placeholder="Digite seu email..."
                style={styles.input}
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View>
              <Text style={styles.label}>Senha</Text>
              <TextInput
                placeholder="Digite sua senha..."
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <Pressable
              style={styles.button}
              onPress={handleSignup}
              accessibilityRole="button"
              accessibilityLabel="Cadastrar"
            >
              <Text style={styles.buttonText}>Cadastrar</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 34,
    backgroundColor: colors.zinc,
  },
  header: {
    paddingLeft: 14,
    paddingRight: 14,
  },
  logoText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.white,
    marginBottom: 8,
  },
  slogan: {
    fontSize: 34,
    color: colors.white,
    marginBottom: 34,
  },
  label: {
    fontSize: 16,
    color: colors.zinc,
    marginBottom: 4,
  },
  input: {
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
    paddingBottom: 14,
    paddingTop: 14,
  },
  form: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 24,
    paddingLeft: 14,
    paddingRight: 14,
  },
  button: {
    backgroundColor: colors.green,
    paddingTop: 14,
    paddingBottom: 14,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderRadius: 8,
  },
  buttonText: {
    color: colors.zinc,
    fontSize: 16,
    fontWeight: "bold",
  },
  backButton: {
    backgroundColor: "rgba(255, 255, 255, 0.55)",
    alignSelf: "flex-start",
    padding: 8,
    borderRadius: 8,
  },
});
