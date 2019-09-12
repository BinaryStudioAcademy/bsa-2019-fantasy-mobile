import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { Row } from 'react-native-table-component';

export const inline = StyleSheet.create({
  tableHeader: {
    borderBottomColor: 'rgba(0,0,0,.1)',
    borderBottomWidth: 2,
  },
});

export const TableHeader = styled(Row).attrs({
  textStyle: {
    textAlign: 'center',
  },
})`
  margin-bottom: 5px;

  border-radius: 3px;
  background-color: rgba(0, 0, 0, 0.02);
`;

export const Container = styled.View`
  flex: 1;
  min-height: 100px;

  display: flex;
  flex-direction: column;
  overflow: visible;
`;
