import styled from "../../custom/styled-components";

const Subtitle = styled.h2`
  color: ${props => props.theme.secondary};
  font-size: 1.25rem;
  font-weight: 200;
  margin-left: auto;
  margin-right: auto;
  text-align: center;

  @media screen and (min-width: 35em) {
    font-size: 1.5rem;
  }
`;

export default Subtitle;
