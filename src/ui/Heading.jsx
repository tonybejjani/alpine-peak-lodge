/** @format */
import styled, { css } from 'styled-components';

// const test = css`
//   te xt-align: center;
// `;
const Heading = styled.h1`
  ${(props) =>
    props.as === 'h1' &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}

  ${(props) =>
    props.as === 'h2' &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}

    ${(props) =>
    props.as === 'h3' &&
    css`
      font-size: 2rem;
      font-weight: 300;
    `}
`;

export default Heading;
