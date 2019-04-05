import styled from '../../custom/styled-components';
import TextArea from '../../components/TextArea';

export const Body = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  & > * + * {
    margin-top: .75em;
  }
`;

export const ThingTextArea = styled(TextArea)`
  width: 80%;
`
