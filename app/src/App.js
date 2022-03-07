import React, { useEffect } from "react";
import api from "../src/services/api";

export default () => {

  useEffect(() =>{
    const loadAll = async () => {
      let list = await api.getHomeList();
      console.log(list);
    }

    loadAll();
  }, []);

  return <div>Olá Mundo!</div>;
};
