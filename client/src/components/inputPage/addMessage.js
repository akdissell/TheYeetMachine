import React, { Component } from 'react';
import * as MessageHandler from '../../handlers/messageHandler';

export default class AddMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            signature: '',
        };
    }

    putToDBThenGetData = async (messageToBeAdded, signatureToBeAdded) => {
        const idToBeAdded = this.generateMessageId(this.props.messages);
        await MessageHandler.postMessage(messageToBeAdded, signatureToBeAdded, idToBeAdded);
        this.props.recontextualize();
    }

    generateMessageId = (messages) => {
        console.log('before generate ID message:', this.props.messages);
        let currentIds = messages.map((message) => message.id);
        let idToBeAdded = 0;
        while (currentIds.includes(idToBeAdded)) {
            ++idToBeAdded;
        }
        return idToBeAdded;
    }

    render() {
        return (
            <div style={{ margin: '10px' }}>
                <input
                    id='messageInput'
                    onChange={(e) => this.setState({ message: e.target.value })}
                    placeholder="add something in the database"
                    style={{ width: '200px' }}
                />
                <input
                    id='signatureInput'
                    style={{ width: '200px' }}
                    onChange={(e) => this.setState({ signature: e.target.value })}
                    placeholder="Sign Here"
                />
                <button 
                    className="Button"
                    onClick={() => this.putToDBThenGetData(this.state.message, this.state.signature)}>
                    ADD
                </button>
            </div>
        )
    }
}
