import React from "react";
import NewPostView from "../components/NewPost";

const NewPost = ({ route, navigation }) => {
  const { onSave } = route.params;
  return (
    <NewPostView
      onSave={() => {
        onSave();
        navigation.goBack();
      }}
      onClose={navigation.goBack}
    />
  );
};

export default NewPost;
