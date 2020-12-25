import styled from 'styled-components';
import { TextField } from '@material-ui/core';

export const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Main = styled.main`
  position: relative;
  width: 83%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1110px) {
    width: 100%;
  }
`;

export const ContentWrapper = styled.div`
  width: 100%;
  height: 90vh;
  margin-top: 10vh;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;

  @media (max-width: 768px) {
    height: auto;
  }
`;

export const Content = styled.div`
  width: 95%;
  min-height: 100%;
  padding: 1rem;

  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const FormColumn = styled.div`
  height: 100%;
  width: 65%;
  padding: 1rem;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const FormArea = styled.div`
  width: 100%;
  height: 100%;
  min-height: 536px;
  padding: 1rem;
  border-radius: 1rem;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const Form = styled.form`
  width: 100%;
  height: 100%;
  padding: 2rem;
  border-radius: 5px;

  h3 {
    font-size: 2rem;
  }
`;

export const Controls = styled.div`
  width: 100%;
  height: 15%;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  button {
    font-size: 1.2rem;
  }

  @media (max-width: 768px) {
    justify-content: center;
    margin-top: 2rem;

    button {
      width: 100%;
    }
  }
`;

export const CustomInput = styled(TextField)`
  margin: 1.8rem 0 !important;
  width: 100%;
  * {
    font-size: 1.6rem !important;
    padding-top: 0.6rem;
    color: inherit !important;
  }
`;
