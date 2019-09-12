import styled from 'styled-components/native';
import { Row } from 'react-native-table-component';

export const Container = styled(Row).attrs({
  textStyle: {
    textAlign: 'center',
  },
})<{ highlighted: boolean }>`
  margin: 10px 0;

  display: flex;
  flex-direction: row;
  align-items: center;

  border-width: 0px;
  border-radius: 5px;

  background-color: ${(props) => (props.highlighted ? 'rgba(0, 0, 0, 0.05)' : '#fff')};
`;
