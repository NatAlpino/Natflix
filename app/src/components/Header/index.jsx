import React from "react";
import "./Header.css";

export default ({ black }) => {
  return (
    <header className={black ? "black" : ""}>
      <div className="header--logo">
        <a href="/">
          <img
            src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.elo7.com.br%2Fposter-impresso-netflix-logo%2Fdp%2F127EDB3&psig=AOvVaw3lt6xPkg8RSiam-Va9Gcu4&ust=1647018926837000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCPiQkeOFvPYCFQAAAAAdAAAAABAD"
            alt="logo"
          />
        </a>
      </div>
      <div className="header--user">
        <a href="/">
          <img src="user.jpeg" alt="user" />
        </a>
      </div>
    </header>
  );
};
