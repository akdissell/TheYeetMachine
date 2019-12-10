import React, { Component } from 'react';
import * as MessageHandler from '../../handlers/messageHandler';

export default class DeleteMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idToDelete: '',
        };
    }

    deleteMessage = async (idToDelete) => {
        const objIdToDelete = this.props.getObjIdFromMessageId(idToDelete, this.props.messages);
        await MessageHandler.deleteMessage(objIdToDelete);
        this.props.recontextualize();
    }

    render() {
        return (
            <div style={{ margin: '10px' }}>
                <input
                    id="deleteByIDInput"
                    style={{ width: '200px' }}
                    onChange={(e) => this.setState({ idToDelete: e.target.value })}
                    placeholder="put id of item to delete here"
                />
                <button onClick={() => { this.deleteMessage(this.state.idToDelete) }}>
                    DELETE
                </button>
            </div>
        )
    }
}