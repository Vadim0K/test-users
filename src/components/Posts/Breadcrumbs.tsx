import React from "react";

import styles from "../../styles/Posts.module.scss";

const Breadcrumbs = () => (
  <a className={styles.back_to_home} href="/home">
    Back to users
  </a>
);

export default Breadcrumbs;
