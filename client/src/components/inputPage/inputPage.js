import React, { Component } from 'react';
import * as MessageHandler from '../../handlers/messageHandler';
import AddMessage from './addMessage';
import DeleteMessage from './deleteMessage';
import UpdateMessage from './updateMessage';
import { Link } from 'react-router-dom';

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

  extraButtons = () => {
    return (
      <React.Fragment>
        <div style={{ margin: '10px' }}>
          <button
            onClick={MessageHandler.deleteAllMessages}>
            REMOVE COLLECTION
          </button>
        </div>
        <div style={{ margin: '10px' }}>
          <Link to={'/entries'} className="nav-link">
            <button>
              YOINK THE YEETS
            </button>
          </Link>
        </div>
      </React.Fragment>
    )
  }


  render() {
    return (
      <React.Fragment>
        <h2>Make inputs here</h2>
        <AddMessage
          messages={this.props.messages}
          recontextualize={this.recontextualize}
        />
        <DeleteMessage
          idToDelete={this.idToDelete}
          messages={this.props.messages}
          getObjIdFromMessageId={this.getObjIdFromMessageId}
          recontextualize={this.recontextualize}
        />
        <UpdateMessage
          messages={this.props.messages}
          getObjIdFromMessageId={this.getObjIdFromMessageId}
          recontextualize={this.recontextualize}
        />
        {this.extraButtons()}
      </React.Fragment>
    );
  }
}

