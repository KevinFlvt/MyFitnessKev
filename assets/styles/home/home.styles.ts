import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 40,
    marginBottom: 20,
    color: "#111",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 15,
    color: "#666",
  },
  workoutCard: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#f0f4f8",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#dce4ec",
  },
  workoutTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1a2a3a",
  },
  workoutDesc: {
    fontSize: 14,
    color: "#555",
    marginVertical: 4,
  },
  workoutMeta: {
    fontSize: 12,
    color: "#007AFF",
    fontWeight: "500",
  },
  emptyCard: {
    backgroundColor: "#fff",
    borderStyle: "dashed",
    borderColor: "#007AFF",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    color: "#007AFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});
