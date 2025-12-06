import { useRouter } from "expo-router";
import { ArrowRight, MapPin } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnboardingScreen() {
  const router = useRouter();

  const handleStart = () => {
    // In a real app, request permission here.
    // For now, just navigate.
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.illustrationContainer}>
          <View style={styles.iconCircle}>
            <MapPin size={64} color="#0f172a" />
          </View>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.tagline}>LINELESS</Text>
          <Text style={styles.title}>Skip the wait,{"\n"}save your time.</Text>
          <Text style={styles.description}>
            Find nearby places with short queues, join remotely, and get
            notified when it's your turn.
          </Text>
        </View>

        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.btn} onPress={handleStart}>
            <Text style={styles.btnText}>Enable Location</Text>
            <ArrowRight size={20} color="white" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.replace("/(tabs)")}>
            <Text style={styles.secondaryLink}>Continue without location</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: "space-between",
  },
  illustrationContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#f1f5f9",
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    marginBottom: 40,
  },
  tagline: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0f172a",
    letterSpacing: 1.5,
    marginBottom: 12,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 40,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 16,
    lineHeight: 44,
  },
  description: {
    fontSize: 16,
    color: "#64748b",
    lineHeight: 24,
  },
  actionContainer: {
    gap: 16,
    marginBottom: 20,
  },
  btn: {
    backgroundColor: "#0f172a",
    height: 56,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  btnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  secondaryLink: {
    textAlign: "center",
    color: "#64748b",
    fontSize: 14,
    fontWeight: "500",
  },
});
