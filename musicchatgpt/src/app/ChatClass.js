import Talk from 'talkjs';
import React from 'react';

class MyChatComponent extends React.Component {
  chatboxEl = React.createRef();

  async componentDidMount() {
    await Talk.ready;

    const currentUser = new Talk.User({
      id: '1',
      name: 'Henry Mill',
      email: 'henrymill@example.com',
      photoUrl: 'henry.jpeg',
      welcomeMessage: 'Hello!',
      role: 'default',
    });

    const otherUser = new Talk.User({
      id: '2',
      name: 'Jessica Wells',
      email: 'jessicawells@example.com',
      photoUrl: 'jessica.jpeg',
      welcomeMessage: 'Hello!',
      role: 'default',
    });

    this.session = new Talk.Session({
      appId: 'tjZ8jq9X',
      me: currentUser,
    });

    const conversationId = Talk.oneOnOneId(currentUser, otherUser);
    const conversation = this.session.getOrCreateConversation(conversationId);
    conversation.setParticipant(currentUser);
    conversation.setParticipant(otherUser);

    const chatbox = this.session.createChatbox();
    chatbox.select(conversation);
  }

  componentWillUnmount() {
    if (this.session) {
      this.session.destroy();
    }
  }

  render() {
    return <div ref={this.chatboxEl} />;
  }
}