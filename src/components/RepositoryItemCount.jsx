import { View, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  flexContainer: {
    flexDirection: "column",
    justifyContent: "center",
  },
});

const RepositoryItemCount = ({ count, label }) => {
  const kiloCount =
    count >= 1000 ? `${Number(count / 1000, 2).toFixed(1)}k` : count;
  return (
    <View style={styles.flexContainer}>
      <Text centered bold>
        {kiloCount}
      </Text>
      <Text centered color={theme.colors.textSecondary}>
        {label}
      </Text>
    </View>
  );
};

export default RepositoryItemCount;
