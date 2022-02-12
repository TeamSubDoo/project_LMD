import React, { useContext } from 'react';
import { FlatList, View } from 'react-native';
import styled, { ThemeContext } from 'styled-components';
import { MaterialIcons } from '@expo/vector-icons';
import { Button } from '../components';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background };
`;

const ItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.listBorder};
  padding: 15px 20px;
`;

const ItemTextContainer = styled.View`
  flex: 1;
  flex-direction: column;
`;

const ItemTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
`;

const ItemDescription = styled.Text`
  font-size: 16px;
  margin-top: 5px;
  color: ${({ theme }) => theme.listTime};
`;

const ItemTime = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.listTime}
`;

const schedules = [];
for( let idx = 0 ; idx< 10 ; idx++) {
  schedules.push({
    id: idx,
    name: `스케쥴 No.${idx}`,
    description: `설명${idx}`,
    createdAt: idx,
  });
}

const Item = React.memo(
  ({ item: { id, name, description, createdAt }, onPress, onMatching }) => {
  const theme = useContext(ThemeContext);
  console.log(`Item: ${id}`);

  return (
    <ItemContainer onPress={() => onPress({ id, name })}>
      <ItemTextContainer>
        <ItemTitle>{name}</ItemTitle>
        <ItemDescription>{description}</ItemDescription>
      </ItemTextContainer>
      <View>
        <Button
          title="매칭"
          onPress={onMatching}
          />
      </View>
    </ItemContainer>
  )
}
);

const ScheduleList = ({navigation}) => {
  const _handleItemPress = params => {
    navigation.navigate('Channel', params);
  };

  const _handleMatching = params => {
    navigation.navigate('Channel', params);
  };

  return (
    <Container>
      <FlatList
        keyExtractor={item => item['id'].toString()}
        data={schedules}
        renderItem={({ item }) => (
          <Item item={item} onPress={_handleItemPress} onMatching={_handleMatching} />
        )}
        windowSize={3}
      />
    </Container>
  )
}

export default ScheduleList;