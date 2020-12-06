import styled from 'styled-components'

const backgroundImage = require('../../../public/images/bookshelf-1.jpg')

export const Section = styled.section`
  width: 100vw;
  height: 90vh;

  display: flex;
  align-items: center;
  justify-content: center;

  color: var(--white);

  &.title {
    background:
      linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)),
      url("${backgroundImage}");
    background-size: cover;
  }
`
