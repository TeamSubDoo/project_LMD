import React, { useContext, useState } from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import { GiftedChat, Send } from 'react-native-gifted-chat';
import { MaterialIcons } from '@expo/vector-icons';
import { getCurrentUser } from '../utils/firebase';

const Container = styled.View`
  flex:1;
  background-color: ${({ theme }) => theme.background};
`;

const SendButton = props => {
  const theme = useContext(ThemeContext);

  return (
    <Send
      {...props}
      disabled={!props.text}
      containerStyle={{
        width: 44,
        height:44,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 4
      }}
      >
        <MaterialIcons
          name="send"
          size={24}
          color={
            props.text ?  theme.sendButtonActivate : theme.sendButtonInActivate
          }
          /> 
      </Send>
  )
}

const Channel = ({ route }) => {
  const theme = useContext(ThemeContext);
  const { uid, name, photoUrl } = getCurrentUser();
  const {messages, setMessages} = useState([]);

  const _handleMessageSend = () => {};
  
  return (
    <Container>
      <GiftedChat
        listViewProps={{
          style: { backgroundColor: theme.background },
        }}
        placeholder="Enter a message..."
        messages={messages}
        user={{ _id: uid, name, avatar: photoUrl }}
        onSend={_handleMessageSend}
        alwaysShowSend={true}
        textInputProps={{
          autoCapitalize: 'none',
          autoCorrect: false,
          textContentType: 'none',
          underlineColorAndriod: 'tansparent'
        }}
        multiline={false}
        renderUsernameOnMessage={true}
        scrollToBottom={true}
        renderSend={props => <SendButton {...props}/>}
        />
    </Container>
  );
};

export default Channel;