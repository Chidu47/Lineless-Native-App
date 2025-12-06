import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, MapPin, TrendingUp } from "lucide-react-native";
import React from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { SafeAreaView } from "react-native-safe-area-context";
import { mockPlaces } from "../../data/mockPlaces";
import { useQueueStore } from "../../store/queueStore";

export default function PlaceDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const place = mockPlaces.find((p) => p.id === id);
  const joinQueue = useQueueStore((state) => state.joinQueue);
  const activeQueueId = useQueueStore((state) => state.activeQueueId);

  if (!place) {
    return <Text>Place not found</Text>;
  }

  const handleJoinQueue = () => {
    if (activeQueueId) {
      Alert.alert(
        "Already in a queue",
        "You can only be in one queue at a time."
      );
      return;
    }
    joinQueue(place.id);
    router.push("/queue/active");
  };

  const chartData = [
    { value: 5, label: "9am" },
    { value: 12, label: "11am" },
    { value: 25, label: "1pm" },
    { value: 18, label: "3pm" },
    { value: 8, label: "5pm" },
  ];

  return (
    <View style={styles.container}>
      {/* Header Image Area */}
      <View style={styles.headerBg}>
        <SafeAreaView>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backBtn}
          >
            <ArrowLeft size={24} color="#0f172a" />
          </TouchableOpacity>
        </SafeAreaView>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.titleSection}>
          <Text style={styles.name}>{place.name}</Text>
          <View style={styles.row}>
            <MapPin size={16} color="#64748b" />
            <Text style={styles.address}>{place.address}</Text>
          </View>
          <View style={styles.badges}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{place.category}</Text>
            </View>
            <View style={[styles.badge, styles.openBadge]}>
              <Text style={styles.openBadgeText}>Open Now</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{place.queueLength}</Text>
            <Text style={styles.statLabel}>Waiting</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: "#eab308" }]}>
              {place.estimatedWaitMinutes}m
            </Text>
            <Text style={styles.statLabel}>Est. Wait</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <TrendingUp size={24} color="#ef4444" />
            <Text style={styles.statLabel}>Trending</Text>
          </View>
        </View>

        <View style={styles.chartSection}>
          <Text style={styles.sectionTitle}>Crowd History</Text>
          <LineChart
            data={chartData}
            height={180}
            spacing={60}
            initialSpacing={20}
            color="#0f172a"
            thickness={3}
            startFillColor1="#0f172a"
            startOpacity={0.1}
            endOpacity={0.0}
            noOfSections={4}
            yAxisTextStyle={{ color: "#9ca3af" }}
            xAxisLabelTextStyle={{ color: "#9ca3af", fontSize: 12 }}
            hideDataPoints={false}
            dataPointsColor="#0f172a"
          />
        </View>
      </ScrollView>

      {/* Bottom Action */}
      <SafeAreaView style={styles.footer} edges={["bottom"]}>
        <TouchableOpacity style={styles.joinBtn} onPress={handleJoinQueue}>
          <Text style={styles.joinBtnText}>I'm in Queue</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerBg: {
    height: 120,
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 16,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  titleSection: {
    marginBottom: 24,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 12,
  },
  address: {
    color: "#64748b",
    fontSize: 14,
  },
  badges: {
    flexDirection: "row",
    gap: 8,
  },
  badge: {
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 12,
    color: "#475569",
    fontWeight: "500",
  },
  openBadge: {
    backgroundColor: "#dcfce7",
  },
  openBadgeText: {
    fontSize: 12,
    color: "#166534",
    fontWeight: "600",
  },
  statsCard: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0f172a",
  },
  statLabel: {
    fontSize: 12,
    color: "#64748b",
  },
  divider: {
    width: 1,
    backgroundColor: "#f0f0f0",
    height: "100%",
  },
  chartSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0f172a",
    marginBottom: 16,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  joinBtn: {
    backgroundColor: "#0f172a",
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  joinBtnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});
