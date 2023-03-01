import React, { useEffect } from "react";
import cn from "classnames";

import appStyles from "../App.module.scss";
import { useAppDispatch } from "../store";
import { fetchUsers } from "../store/reducer";
import { Users } from "../components/Home";

const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className={cn(appStyles.page_container, appStyles.home)}>
      <Users />
    </div>
  );
};

export default Home;
