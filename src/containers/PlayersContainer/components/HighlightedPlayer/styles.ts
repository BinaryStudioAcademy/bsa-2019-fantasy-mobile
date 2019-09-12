import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

export const plain = StyleSheet.create({
  card: {
    margin: 10,
    borderWidth: 0,
    borderRadius: 5,
    elevation: 1,
  },
  container: {
    paddingBottom: 0,
  },
});

export const Container = styled.View`
  position: relative;

  flex: 0;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const POTWStatement = styled.Text`
  position: absolute;
  top: 0;
  left: 0;

  color: rgba(0, 0, 0, 0.1);
  font-weight: bold;
  font-size: 25px;
`;

export const Attributes = styled.View`
  position: relative;
  height: 100%;
  max-width: 50%;

  display: flex;
  flex-direction: column;
  justify-content: center;

  padding-bottom: 15px;
`;

export const Name = styled.Text.attrs({
  numberOfLines: 1,
})`
  color: ${(props) => (props.theme as any).color.secondary}
  font-size: 30px;
  font-weight: bold;
`;

export const Club = styled.Text`
  margin-top: -10px;

  color: ${(props) => (props.theme as any).color.secondary2}
  font-size: 20px;
`;

export const Badges = styled.View`
  position: absolute;
  bottom: 15px;
  left: 0;

  display: flex;
  flex-direction: row;

  opacity: 0.6;
`;

export const Badge = styled.View`
  margin-right: 10px;

  display: flex;
  flex-direction: row;
  align-items: center;

  color: rgba(0, 0, 0, 0.1);
  font-weight: bold;
`;

export const BadgeText = styled.Text`
  margin-left: 3px;
`;
