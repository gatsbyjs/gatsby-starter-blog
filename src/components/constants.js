import styled from 'styled-components';

export const Background = styled.div`
  background-repeat: no-repeat;
  min-height: fit-content;
  background-size: cover;

  @media only screen and (max-width: 600px) {
    background-size: contain;
  }
`;