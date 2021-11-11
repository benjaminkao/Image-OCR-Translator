import React from "react";
import { FaBars } from "react-icons/fa";
import { IconContext } from "react-icons";
import {
  Nav,
  NavbarContainer,
  MobileIcon,
  NavMenu,
  NavItem,
  NavLinks,
} from "./NavbarElements";

const Navbar = ({ toggle }) => {
  return (
    <IconContext.Provider value={{ color: "#272343" }}>
      <Nav>
        <NavbarContainer>
          <MobileIcon>
            <h1
              style={{
                color: "#27ae60",
                fontFamily: "Mochiy Pop One, sans-serif",
                fontWeight: "bold",
              }}
            >
              PhoText
            </h1>
          </MobileIcon>
          <NavMenu>
            <NavItem>
              <NavLinks exact activeClassName="active" to="/">
                Upload Image
              </NavLinks>
            </NavItem>
          </NavMenu>
        </NavbarContainer>
      </Nav>
    </IconContext.Provider>
  );
};

export default Navbar;
