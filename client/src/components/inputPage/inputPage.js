import React, { Component } from 'react';
import AddMessage from './addMessage';
import DeleteMessage from './deleteMessage';
import UpdateMessage from './updateMessage';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default class Input extends Component {
  constructor(props) {
    super(props);
  }

  recontextualize = () => {
    this.props.getMessages();
    this.clearFields();
  }

  clearFields = () => {
    document.getElementById('messageInput').value = '';
    document.getElementById('signatureInput').value = '';
    document.getElementById('deleteByIDInput').value = '';
    document.getElementById('updateIDInput').value = '';
    document.getElementById('updateMessageInput').value = ''
  }

  getObjIdFromMessageId = (messageId, messages) => {
    let objId = null;
    messageId = parseInt(messageId, 10);
    messages.forEach((datum) => {
      if (datum.id === messageId) {
        objId = datum._id;
      }
    });
    return objId;
  }

  navButton = () => {
    return (
      <YoinkContainer>
        <Link to={'/entries'} className="nav-link">
          <YoinkButton>
            YOINK THE YEETS
          </YoinkButton>
        </Link>
      </YoinkContainer>
    )
  }

  render() {
    return (
      <>
        <InputHeader>Make inputs here</InputHeader>
        <AddMessage
          messages={this.props.messages}
          recontextualize={this.recontextualize}
        />
        <UpdateMessage
          messages={this.props.messages}
          getObjIdFromMessageId={this.getObjIdFromMessageId}
          recontextualize={this.recontextualize}
        />
        <DeleteMessage
          idToDelete={this.idToDelete}
          messages={this.props.messages}
          getObjIdFromMessageId={this.getObjIdFromMessageId}
          recontextualize={this.recontextualize}
        />
        {this.navButton()}
      </>
    );
  }
}

const InputHeader = styled.div`
  color: #27464F;
  text-align: center;
  font-size: 2em;
`
const YoinkContainer = styled.div`
  margin: 10px;
`
const YoinkButton = styled.button`
  background-color: #446272;
  color: white;
  border-color: #32292F;
`

