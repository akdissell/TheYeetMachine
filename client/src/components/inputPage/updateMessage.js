import React from 'react';
import * as MessageHandler from '../../handlers/messageHandler';


export default class UpdateMessage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            idToUpdate: '',
            updateToApply: ''
        }
    }

    updateMessage = async (idToUpdate, updateToApply) => {
        const objIdToUpdate = this.props.getObjIdFromMessageId(idToUpdate, this.props.messages);
        await MessageHandler.updateMessage(objIdToUpdate, updateToApply);
        this.props.recontextualize();
    }

    render() {
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
                    onClick={() => this.updateMessage(this.state.idToUpdate, this.state.updateToApply)}
                >
                    UPDATE
                 </button>
            </div>
        )
    }
}

