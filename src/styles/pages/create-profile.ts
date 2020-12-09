import styled from 'styled-components'

const backgroundImage = require('../../../public/images/typing-1.jpg')

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`

export const DesktopPanel = styled.div`
  width: 55vw;
  height: 100vh;
  position: relative;
  background-color: var(--secondary);

  background:
    linear-gradient(rgba(0, 0, 0, 0.57), rgba(0, 0, 0, 0.57)),
    url("${backgroundImage}");
  background-size: cover;

  div.overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: var(--secondary);
    opacity: .7;
  }

  @media (max-width: 998px) {
    display: none;
  }
`

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
`

export const FormPanel = styled.div`
  position: relative;
  width: 45vw;
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

    width: 60%;
    height: 50%;

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
      margin: .7rem 0;
      font-size: 1.5rem;
      font-weight: bold;
    }

    input {
      height: 4rem;
      padding: .5rem;
      font-size: 1.5rem;
      border: 2px solid var(--shadow);
      outline: none;
      border-radius: 5px;
      margin-top: .5rem;
      color: var(--tertiary-light);
      font-weight: bold;
      transition: all .2s ease-in-out;

      ::placeholder {
        font-weight: bold;
        color: #CCC;
      }

      &:focus {
        border: 2px solid var(--secondary-light);
      }
    }

    button {
      width: 100%;
      margin-top: 2rem;
      border: none;
      outline: none;
      border-radius: 5px;
      height: 4rem;
      
      font-weight: bold;
      background-color: var(--secondary);
      color: var(--white);

      &:focus {
        
      }
    }
  }
`