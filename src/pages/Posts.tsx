import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import cn from "classnames";

import appStyles from "../App.module.scss";
import { UserPosts, Breadcrumbs } from "../components/Posts";
import { useAppDispatch } from "../store";
import { fetchUserPosts } from "../store/reducer";

const Posts = () => {
  const { id = "" } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserPosts(Number(id)));
  }, [id, dispatch]);

  return (
    <div className={cn(appStyles.page_container, appStyles.posts)}>
      <Breadcrumbs />
      <UserPosts />
    </div>
  );
};

export default Posts;
