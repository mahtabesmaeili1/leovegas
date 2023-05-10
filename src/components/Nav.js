import "../App.css";
import styled from "styled-components";
import { useState } from "react";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <Nav>
      <Logo className="logo" href="/">
        <span className="span">W</span>ATCHFLIX
      </Logo>
      <Hamburger onClick={() => setOpen(!open)}>
        <span />
        <span />
        <span />
      </Hamburger>
      <Menu open={open}>
        <a className="nav-link" href="/watchlater">
          watch later
        </a>
        <a className="nav-link" href="/favourites">
          favourites
        </a>
      </Menu>
    </Nav>
  );
};

export default Navbar;

const Nav = styled.div`
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background: #000000be;
  /* position: absolute; */
  top: 0;
  left: 0;
  right: 0;
`;

const Logo = styled.a`
  padding: 1rem 0;
  color: #ececec;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.5rem;

  span {
    font-weight: 700;
    font-size: 2rem;
  }
  @media (max-width: 780px) {
    font-size: 1.3rem;
    span {
      font-size: 1.7rem;
    }
  }
`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;
  span {
    height: 2px;
    width: 25px;
    background-color: #ececec;
    margin-bottom: 4px;
    border-radius: 5px;
  }

  @media (max-width: 780px) {
    display: flex;
  }
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  @media (max-width: 780px) {
    overflow: hidden;
    flex-direction: column;
    width: 100%;
    max-height: ${({ open }) => (open ? "300px" : "0")};
    transition: max-height 0.3s ease-in;
  }
`;
