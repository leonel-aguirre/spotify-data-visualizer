import React from "react";
import { useRouter } from "next/router";

const Home = () => {
  const { push } = useRouter();

  const loginButtonHandler = () => {
    fetch("/api/login")
      .then((response) => response.json())
      .then(({ url }) => {
        push(url);
      });
  };

  return (
    <div className="home">
      <h1>TEST</h1>
      <button onClick={loginButtonHandler}>Login</button>
    </div>
  );
};

export default Home;
