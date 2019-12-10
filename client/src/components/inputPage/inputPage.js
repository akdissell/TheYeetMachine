import React, { Component } from 'react';
import * as MessageHandler from '../../handlers/messageHandler';
import AddMessage from './addMessage';
import DeleteMessage from './deleteMessage';
import { Link } from 'react-router-dom';

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idToDelete: '',
      idToUpdate: '',
      updateToApply: '',
    };
  }



  updateMessage = async (idToUpdate, updateToApply) => {
    const objIdToUpdate = this.getObjIdFromMessageId(idToUpdate, this.props.messages);
    await MessageHandler.updateMessage(objIdToUpdate, updateToApply);
    this.recontextualize()
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



  updateMessageComponent = () => {
    return (
      <div style={{ margin: '10px' }}>
        <input
          id="updateIDInput"
          style={{ width: '200px' }}
          onChange={(e) => this.setState({ idToUpdate: e.target.value })}
          placeholder="id of item to update here"
        />
        <input
          id="updateMessageInput"
          style={{ width: '200px' }}
          onChange={(e) => this.setState({ updateToApply: e.target.value })}
          placeholder="put new value of the item here"
        />
        <button
          onClick={() =>
            this.updateMessage(this.state.idToUpdate, this.state.updateToApply)
          }
        >
          UPDATE
         </button>
      </div>
    )
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
        <AddMessage messages={this.props.messages} recontextualize={this.recontextualize} />
        <DeleteMessage idToDelete={this.idToDelete } 
          recontextualize={this.recontextualize} 
          getObjIdFromMessageId={this.getObjIdFromMessageId}  
          messages={this.props.messages}/>
        {this.updateMessageComponent()}
        {this.extraButtons()}
      </React.Fragment>
    );
  }
}

