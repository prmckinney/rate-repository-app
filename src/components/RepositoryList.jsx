import { useState } from "react";
import { useDebounce } from "use-debounce";
import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { Menu, Button, PaperProvider, Searchbar } from "react-native-paper";
import { useNavigate } from "react-router-native";

import useRepositories from "../hooks/useRepositories";
import RepositoryItem from "./RepositoryItem";
import theme from "../theme";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.lightBackground,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListHeader = ({
  setOrderBy,
  setOrderDirection,
  search,
  setSearch,
}) => {
  const [order, setOrder] = useState("Latest Repositories");
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <PaperProvider>
      <Searchbar placeholder="Search" onChangeText={setSearch} value={search} />
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Button onPress={openMenu}>{order}</Button>}
      >
        <Menu.Item
          onPress={() => {
            setOrder("Latest repositories");
            setOrderBy("CREATED_AT");
            setOrderDirection("DESC");
            setVisible(false);
          }}
          title="Latest repositories"
        />
        <Menu.Item
          onPress={() => {
            setOrder("Highest rated repositories");
            setOrderBy("RATING_AVERAGE");
            setOrderDirection("DESC");
            setVisible(false);
          }}
          title="Highest rated repositories"
        />
        <Menu.Item
          onPress={() => {
            setOrder("Lowest rated repositories");
            setOrderBy("RATING_AVERAGE");
            setOrderDirection("ASC");
            setVisible(false);
          }}
          title="Lowest rated repositories"
        />
      </Menu>
    </PaperProvider>
  );
};

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState("CREATED_AT");
  const [orderDirection, setOrderDirection] = useState("DESC");
  const [search, setSearch] = useState("");
  const [searchKeyword] = useDebounce(search, 500);
  const { repositories } = useRepositories({
    orderBy,
    orderDirection,
    searchKeyword,
  });

  const navigate = useNavigate();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={RepositoryListHeader({
        setOrderBy,
        setOrderDirection,
        search,
        setSearch,
      })}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/repo/${item.id}`)}>
          <RepositoryItem repo={item} />
        </Pressable>
      )}
    />
  );
};

export default RepositoryList;
