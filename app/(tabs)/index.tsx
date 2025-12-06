import { Filter, List, Map as MapIcon, Search } from "lucide-react-native";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { PlaceCard } from "../../components/PlaceCard";
import { mockPlaces } from "../../data/mockPlaces";

export default function HomeScreen() {
  const [viewMode, setViewMode] = useState<"map" | "list">("map");

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <Search size={20} color="#9ca3af" />
          <Text style={styles.searchText}>Search places, clinics...</Text>
        </View>
        <TouchableOpacity style={styles.filterBtn}>
          <Filter size={20} color="#0f172a" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {viewMode === "map" ? (
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              provider={PROVIDER_DEFAULT}
              initialRegion={{
                latitude: 40.7128,
                longitude: -74.006,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              {mockPlaces.map((place) => (
                <Marker
                  key={place.id}
                  coordinate={{
                    latitude: place.latitude,
                    longitude: place.longitude,
                  }}
                  title={place.name}
                  description={`${place.queueLength} waiting`}
                />
              ))}
            </MapView>
            <View style={styles.bottomSheetPreview}>
              <Text style={styles.nearbyText}>Nearby Places</Text>
              <FlatList
                data={mockPlaces}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
                renderItem={({ item }) => (
                  <View style={{ width: 280 }}>
                    <PlaceCard place={item} />
                  </View>
                )}
              />
            </View>
          </View>
        ) : (
          <FlatList
            data={mockPlaces}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => <PlaceCard place={item} />}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>

      {/* Toggle View FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setViewMode(viewMode === "map" ? "list" : "map")}
      >
        {viewMode === "map" ? (
          <>
            <List size={20} color="white" />
            <Text style={styles.fabText}>List</Text>
          </>
        ) : (
          <>
            <MapIcon size={20} color="white" />
            <Text style={styles.fabText}>Map</Text>
          </>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    gap: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    zIndex: 10,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 12,
    height: 44,
    borderRadius: 12,
    gap: 8,
  },
  searchText: {
    color: "#9ca3af",
    fontSize: 15,
  },
  filterBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#f3f4f6",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: "100%",
  },
  listContent: {
    padding: 16,
  },
  fab: {
    position: "absolute",
    bottom: 24,
    alignSelf: "center",
    backgroundColor: "#0f172a",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  fabText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  bottomSheetPreview: {
    position: "absolute",
    bottom: 20 + 60, // Above FAB
    left: 0,
    right: 0,
    height: 200,
  },
  nearbyText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 16,
    marginBottom: 8,
    color: "#0f172a",
    backgroundColor: "rgba(255,255,255,0.8)",
    paddingHorizontal: 8,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
});
