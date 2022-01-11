import React from "react";
import styled from "styled-components";

const HeaderStyled = styled.header`
  background: rgb(21, 190, 174);
  padding: 15px;
  text-align: center;
`;
const Header = () => {
  return (
    <HeaderStyled>
      <h1>SpaceStagram</h1>
    </HeaderStyled>
  );
};

export default Header;
