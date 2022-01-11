import styled from "styled-components";

export const AppStyled = styled.section`
  width: 100%;
  padding: 20px 30px;

  .error-container {
    width: 100%;
    min-height: 40vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 17px;
  }
  .date-container {
    width: 100%;
    margin: 10px 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }
  .date-container input[type="date"] {
    padding: 10px;
    text-align: center;
    border-radius: 4px;
    cursor: pointer;
  }

  .card-container {
    width: 100%;
    margin-top: 50px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 12px;
  }
  .btn-container {
    text-align: center;
    margin: 50px 0;
  }
  .loader-container {
    width: 100%;
    text-align: center;
  }
`;
