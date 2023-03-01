import React from "react";
import { useSelector } from "react-redux";

import styles from "../../styles/Posts.module.scss";
import LoadingSpinner from "../LoadingSpinner";
import { RootState } from "../../store";

const UserPosts: React.FC = () => {
  // In real project I would do separate selectors file using "reselect" library
  // but there I used native approach for time saving
  const { isPostsLoading, userPosts } = useSelector(
    (state: RootState) => state.main
  );

  return (
    <div className={styles.container}>
      {isPostsLoading ? (
        <LoadingSpinner />
      ) : (
        userPosts.length &&
        userPosts.map((post) => (
          <div className={styles.post} key={post.id}>
            <span className={styles.title}>{post.title}</span>
            <span className={styles.text}>{post.body}</span>
          </div>
        ))
      )}
    </div>
  );
};

export default UserPosts;
