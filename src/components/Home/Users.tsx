import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { LoadingSpinner } from "../index";
import { RootState } from "../../store";
import styles from "../../styles/Home.module.scss";
import UserAlbumsModal from "./UserAlbumsModal";

const Users = () => {
  const navigate = useNavigate();
  const { isLoading, users } = useSelector((state: RootState) => state.main);

  const [isAlbumsModalOpened, toggleAlbumsModalOpened] =
    useState<boolean>(false);
  const [chosenAlbumsUserId, setChosenAlbumsUserId] = useState<number | null>(
    null
  );

  const handleUserPostsRedirect = (user: number) => {
    navigate(`/posts/${user}`);
  };

  const handleAlbumsClick = (user: number) => {
    setChosenAlbumsUserId(user);
    toggleAlbumsModalOpened(true);
  };

  const handleCloseAlbumsModal = () => {
    setChosenAlbumsUserId(null);
    toggleAlbumsModalOpened(false);
  };

  return (
    <div className={styles.container}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        users.length &&
        users.map((user) => (
          <div className={styles.user} key={user.id}>
            <span className={styles.username} title={user.username}>
              {user.username}
            </span>
            <span title={user.name}>{user.name}</span>
            <span title={user.email}>{user.email}</span>
            <button onClick={() => handleUserPostsRedirect(user.id)}>
              Posts
            </button>
            <button onClick={() => handleAlbumsClick(user.id)}>Albums</button>
          </div>
        ))
      )}
      {chosenAlbumsUserId && (
        <UserAlbumsModal
          onClose={handleCloseAlbumsModal}
          userId={chosenAlbumsUserId}
          isOpen={isAlbumsModalOpened}
        />
      )}
    </div>
  );
};

export default Users;
