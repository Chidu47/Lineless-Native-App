import { Link } from "expo-router";
import {
  ChevronRight,
  Clock,
  MapPin,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Place } from "../data/mockPlaces";

interface PlaceCardProps {
  place: Place;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({ place }) => {
  const getQueueColor = (length: number) => {
    if (length < 5) return "#4ade80"; // Green
    if (length < 15) return "#facc15"; // Yellow
    return "#ef4444"; // Red
  };

  return (
    <Link href={`/place/${place.id}`} asChild>
      <TouchableOpacity style={styles.card} activeOpacity={0.7}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            {/* Placeholder for category icon, can map categories to icons later */}
            <MapPin size={20} color="#666" />
          </View>
          <View style={styles.info}>
            <Text style={styles.name}>{place.name}</Text>
            <Text style={styles.category}>
              {place.category} • {place.address}
            </Text>
          </View>
          {place.isTrendUp ? (
            <TrendingUp size={20} color="#ef4444" />
          ) : (
            <TrendingDown size={20} color="#4ade80" />
          )}
        </View>

        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Users size={16} color="#666" />
            <Text style={styles.statText}>{place.queueLength} waiting</Text>
          </View>
          <View style={styles.stat}>
            <Clock size={16} color="#666" />
            <Text
              style={[
                styles.statText,
                { color: getQueueColor(place.queueLength), fontWeight: "bold" },
              ]}
            >
              ~{place.estimatedWaitMinutes} min
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.lastUpdated}>Updated {place.lastUpdated}</Text>
          <ChevronRight size={20} color="#ccc" />
        </View>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f3f4f6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
  },
  category: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 2,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#f9fafb",
    marginTop: 8,
  },
  stat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statText: {
    fontSize: 14,
    color: "#4b5563",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  lastUpdated: {
    fontSize: 10,
    color: "#9ca3af",
  },
});
