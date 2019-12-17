import React, { Component } from 'react';
import * as MessageHandler from '../../handlers/messageHandler';
import styled from 'styled-components';

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
            <DeleteComponent>
                <DeleteInput
                    id="deleteByIDInput"
                    onChange={(e) => this.setState({ idToDelete: e.target.value })}
                    placeholder="put id of item to delete here"
                />
                <DeleteButton
                    onClick={() => { this.deleteMessage(this.state.idToDelete) }}>
                    DELETE
                </DeleteButton>
            </DeleteComponent>
        )
    }

    dropCollectionComponent = () => {
        return (
            <RemoveCollectionButton onClick={MessageHandler.deleteAllMessages}>
                REMOVE COLLECTION
            </RemoveCollectionButton>
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

const DeleteComponent = styled.div`
    margin: 10px;
`

const DeleteInput = styled.input`
    width: 200px;
`

const DeleteButton = styled.button`
    background-color: #446272;
    color: white;
    border-color: #32292F;
`

const RemoveCollectionButton = styled.button`
    margin: 0px 10px;    
    background-color: #446272;
    color: white;
    border-color: #32292F;
`