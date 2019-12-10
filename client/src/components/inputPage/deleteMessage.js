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

    deleteInputComponent = () => {
        return (
            <div style={{ margin: '10px' }}>
                <input
                    id="deleteByIDInput"
                    style={{ width: '200px' }}
                    onChange={(e) => this.setState({ idToDelete: e.target.value })}
                    placeholder="put id of item to delete here"
                />
                <button 
                    className="Button"
                    onClick={() => { this.deleteMessage(this.state.idToDelete) }}>
                    DELETE
                </button>
            </div>
        )
    }

    dropCollectionComponent = () => {
        return (
            <button
                className="Button"
                style={{ margin: '0px 10px' }}
                onClick={MessageHandler.deleteAllMessages}
            >
                REMOVE COLLECTION
            </button>
        )
    }

    render() {
        return (
            <>
                {this.deleteInputComponent()}
                {this.dropCollectionComponent()}
            </>
        );
    }
}