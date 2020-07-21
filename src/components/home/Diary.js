import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import useSWR from "swr";
import ActionButton from "../general/ActionButton";
import EntryItem from "../general/EntryItem";
import HeaderMessage from "../general/HeaderMessage";

function sortByCreatedDesc(a, b) {
  if (a._metadata.created < b._metadata.created) {
    return 1;
  }
  if (a._metadata.created > b._metadata.created) {
    return -1;
  }
  return 0;
}

const Diary = ({ navigation, special }) => {
  const { data, isValidating, mutate } = useSWR(
    `/moods?_limit=100&${special ? "special=true" : ""}`
  );
  const items = ((data && data.items) || []).sort(sortByCreatedDesc);

  const openMyModal = () => {
    navigation.navigate("MyModal", {
      onSave: mutate,
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        initialNumToRender={3}
        ListHeaderComponent={() => <HeaderMessage onPress={openMyModal} />}
        keyExtractor={(item, index) => item.id}
        onRefresh={() => mutate()}
        refreshing={isValidating}
        style={styles.list}
        renderItem={({ item, index }) => {
          return <EntryItem key={item.id} {...item} />;
        }}
      />
      <ActionButton icon="add" onPress={openMyModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 3,
    paddingHorizontal: 15,
  },
});

export default Diary;
