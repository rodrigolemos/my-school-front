import styled from 'styled-components'

export const ProfileColumn = styled.div`
  height: 100%;
  width: 35%;
  padding: 1rem;

  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 100%;
  }
`

export const InnerProfile = styled.div`
  width: 100%;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`

export const ProfileDetails = styled(InnerProfile)`
  height: 55%;
  min-height: 340px;
  flex-direction: column;
`

export const Avatar = styled.div`
  width: 200px;
  height: 200px;
  margin-bottom: 2rem;
  border-radius: 50%;
  font-size: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Personal = styled.div`
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  span {
    margin-bottom: 1rem;
  }
`

export const About = styled.div`
  font-size: 1.4rem;
  width: 80%;
  height: 75%;
  border-radius: 5px;
  padding: 1.6rem;

  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;

  @media (max-width: 375px) {
    width: 95%;
    height: 100%;
  }

  span, label {
    margin-bottom: 2rem;
  }

  label {
    display: flex;
    align-items: center;

    svg {
      font-size: 2rem;
      margin-right: 1rem;
    }
  }
`

export const ProfileAbout = styled(InnerProfile)`
  height: 45%;
  min-height: 278px;
`
