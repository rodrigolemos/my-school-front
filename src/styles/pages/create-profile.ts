import styled from 'styled-components';
import { showFromLeft } from '../animations';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const backgroundImage = require('../../../public/images/typing-1.jpg');

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;

export const DesktopPanel = styled.div`
  width: 55vw;
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--secondary);

  background: linear-gradient(rgba(0, 0, 0, 0.57), rgba(0, 0, 0, 0.57)), url('${backgroundImage}');
  background-size: cover;

  div.overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: var(--secondary);
    opacity: 0.7;
  }

  div.brand {
    z-index: 2;
    opacity: 0.9;
    width: 50%;
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: var(--white);

    h2 {
      display: flex;
      align-items: center;
      font-size: 3.8rem;
      margin-bottom: 2rem;

      svg {
        margin-right: 1rem;
      }
    }

    svg.desktop {
      font-size: 30rem;
    }

    h3 {
      font-size: 1.8rem;
      text-align: center;
    }
  }

  @media (max-width: 998px) {
    display: none;
  }
`;

export const BackButton = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;

  svg {
    margin-right: 1rem;
    font-size: 1.7rem;
  }
`;

export const FormPanel = styled.div`
  position: relative;
  width: 45vw;
  min-height: 640px;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  color: var(--secondary);

  @media (max-width: 998px) {
    width: 100vw;
  }

  form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    animation: ${showFromLeft} 0.5s ease-in-out;

    width: 60%;
    min-height: 50%;

    @media (max-width: 998px) {
      width: 50vw;
    }

    @media (max-width: 500px) {
      width: 90vw;
      height: 100%;
    }

    h1 {
      font-size: 3.8rem;
      margin-bottom: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        margin-right: 1rem;
      }
    }

    label {
      display: flex;
      flex-direction: column;

      width: 100%;
      margin: 0.7rem 0;
      font-size: 1.5rem;
      font-weight: bold;
    }

    input {
      height: 4rem;
      padding: 0.5rem;
      font-size: 1.5rem;
      border: 2px solid var(--shadow);
      outline: none;
      border-radius: 5px;
      margin-top: 0.5rem;
      color: var(--tertiary-light);
      font-weight: bold;
      transition: all 0.2s ease-in-out;

      ::placeholder {
        font-weight: bold;
        color: #ccc;
      }

      &:focus {
        border: 2px solid var(--secondary-light);
      }
    }

    p.error {
      font-weight: normal;
      font-size: 1.2rem;
      color: #e00;
      margin: 0.5rem 0;
    }

    button {
      width: 100%;
      margin-top: 2rem;
      border: none;
      outline: none;
      border-radius: 5px;
      height: 4rem;
      cursor: pointer;
      transition: all 0.2s ease-in-out;

      font-weight: bold;
      background-color: var(--secondary);
      color: var(--white);

      &:focus,
      &:hover {
        background-color: var(--secondary-light);
      }
    }

    div.loading {
      width: 100%;
      text-align: center;
      margin-top: 2rem;
      height: 4rem;

      svg {
        color: var(--secondary);
      }
    }

    div.controls {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 1.5rem;
      font-size: 1.3rem;
      font-weight: bold;

      a,
      a:active,
      a:visited {
        text-decoration: none;
        color: inherit;
        transition: all 0.2s ease-in-out;

        &:hover {
          color: var(--primary);
        }
      }
    }
  }
`;
