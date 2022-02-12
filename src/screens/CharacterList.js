import React, { useContext } from 'react';
import { FlatList } from 'react-native';
import styled, { ThemeContext } from 'styled-components';
import { MaterialIcons } from '@expo/vector-icons';

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

const characters = [];
for( let idx = 0 ; idx< 1000 ; idx++) {
  characters.push({
    id: idx,
    name: `캐릭터명${idx}`,
    description: `Lv${idx}/배틀마스터`,
    createdAt: idx,
  });
}

const Item = React.memo(
  ({ item: { id, name, description, createdAt }, onPress }) => {
  const theme = useContext(ThemeContext);
  console.log(`Item: ${id}`);

  return (
    <ItemContainer onPress={() => onPress({ id, name })}>
      <ItemTextContainer>
        <ItemTitle>{name}</ItemTitle>
        <ItemDescription>{description}</ItemDescription>
      </ItemTextContainer>
      <ItemTime>{createdAt}</ItemTime>
      <MaterialIcons
        name="keyboard-arrow-right"
        size={24}
        color={theme.listIcon}
      />
    </ItemContainer>
  )
}
);

const CharacterList = ({navigation}) => {
  const _handleItemPress = params => {
    navigation.navigate('ScheduleList', params);
  };

  return (
    <Container>
      <FlatList
        keyExtractor={item => item['id'].toString()}
        data={characters}
        renderItem={({ item }) => (
          <Item item={item} onPress={_handleItemPress} />
        )}
        windowSize={3}
      />
    </Container>
  )
}

export default CharacterList;