import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [role, setRole] = useState("");
  const [fullname, setFullname] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const roleParam = urlParams.get("role");
    const fullnameParam = urlParams.get("fullname");
    const idParam = urlParams.get("id");

    if (roleParam && fullnameParam && idParam) {
      sessionStorage.setItem("role", roleParam);
      sessionStorage.setItem("fullname", fullnameParam);
      sessionStorage.setItem("id", idParam);
      localStorage.setItem("role", roleParam);
      localStorage.setItem("fullname", fullnameParam);
      localStorage.setItem("id", idParam);
      setRole(roleParam);
      setFullname(fullnameParam);
      setId(idParam);
    } else {
      const storedRole = localStorage.getItem("role");
      const storedFullname = localStorage.getItem("fullname");
      const storedId = localStorage.getItem("id");
      if (storedRole && storedFullname && storedId) {
        setRole(storedRole);
        setFullname(storedFullname);
        setId(storedId);
      }
    }

    axios.defaults.headers.common["Role"] =
      roleParam || localStorage.getItem("role");
  }, []);

  return (
    <UserContext.Provider value={{ role, fullname, id }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
