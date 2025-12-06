import { useRouter } from "expo-router";
import { CheckCircle, Clock } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQueueStore } from "../../store/queueStore";

export default function ActiveQueueScreen() {
  const router = useRouter();
  const { position, startTime, leaveQueue } = useQueueStore();
  const [elapsedTime, setElapsedTime] = useState("00:00");

  useEffect(() => {
    if (!startTime) return;

    const interval = setInterval(() => {
      const now = new Date();
      const diff = now.getTime() - new Date(startTime).getTime();
      const minutes = Math.floor(diff / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setElapsedTime(
        `${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  const handleDone = () => {
    leaveQueue();
    router.replace("/");
  };

  if (!position) {
    router.replace("/");
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.headerTitle}>You're in line!</Text>

          <View style={styles.positionContainer}>
            <Text style={styles.positionLabel}>Initial Position</Text>
            <Text style={styles.positionNumber}>{position}</Text>
          </View>

          <View style={styles.timerContainer}>
            <Clock size={32} color="#0f172a" />
            <Text style={styles.timerText}>{elapsedTime}</Text>
            <Text style={styles.timerLabel}>Time elapsed</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoText}>Estimated wait: ~15 mins</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.doneBtn} onPress={handleDone}>
          <CheckCircle size={24} color="white" />
          <Text style={styles.doneBtnText}>I've been served / Done</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
  },
  card: {
    backgroundColor: "white",
    width: "100%",
    borderRadius: 24,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 30,
  },
  positionContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  positionLabel: {
    fontSize: 16,
    color: "#64748b",
    marginBottom: 8,
  },
  positionNumber: {
    fontSize: 64,
    fontWeight: "bold",
    color: "#0f172a",
  },
  timerContainer: {
    alignItems: "center",
    backgroundColor: "#f1f5f9",
    padding: 20,
    borderRadius: 16,
    width: "100%",
  },
  timerText: {
    fontSize: 32,
    fontWeight: "600",
    color: "#0f172a",
    marginVertical: 4,
    fontVariant: ["tabular-nums"],
  },
  timerLabel: {
    fontSize: 14,
    color: "#64748b",
  },
  infoBox: {
    marginTop: 20,
  },
  infoText: {
    color: "#059669",
    fontWeight: "600",
  },
  doneBtn: {
    backgroundColor: "#0f172a",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 16,
    width: "100%",
    gap: 12,
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  doneBtnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});
