import React, { useEffect } from "react";
import ReactModal from "react-modal";
import { useSelector } from "react-redux";

import styles from "../../styles/UserAlbumsModal.module.scss";
import { fetchUserAlbums } from "../../store/reducer";
import { RootState, useAppDispatch } from "../../store";
import { LoadingSpinner } from "../index";

const appElement = document.getElementById("root");

if (appElement) {
  ReactModal.setAppElement(appElement);
}

interface IProps extends ReactModal.Props {
  onClose: () => void;
  headerBorder?: boolean;
  fullWidth?: boolean;
  userId: number;
}

// In real project I would make separate reusable component for modal
// but as for test task I made it locally for time saving
const UserAlbumsModal: React.FC<IProps> = React.memo(
  ({ onClose, isOpen, userId, ...rest }) => {
    const dispatch = useAppDispatch();

    const { isAlbumsLoading, userAlbums } = useSelector(
      (state: RootState) => state.main
    );

    useEffect(() => {
      dispatch(fetchUserAlbums(Number(userId)));
    }, [userId, dispatch]);

    return isOpen ? (
      <ReactModal
        {...rest}
        isOpen
        className={styles.container}
        overlayClassName={styles.overlay}
        htmlOpenClassName={styles.html}
        onRequestClose={onClose}
      >
        <div className={styles.header}>
          <span className={styles.title}>Albums of user</span>
          <button onClick={onClose}>Close</button>
        </div>

        <div className={styles.albumsList}>
          {isAlbumsLoading ? (
            <LoadingSpinner />
          ) : (
            userAlbums.length &&
            userAlbums.map((album, i) => (
              <span key={album.id}>
                {i + 1}. {album.title}
              </span>
            ))
          )}
        </div>
      </ReactModal>
    ) : null;
  }
);

export default UserAlbumsModal;
