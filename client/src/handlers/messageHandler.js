import axios from 'axios';

const getMessages = async () => {
    let response = await fetch('http://localhost:3001/api/getData')
        .then((data) => {
            return data.json();
        })
    return response.data;
};

const postMessage = async (messageToBeAdded, signatureToBeAdded, idToBeAdded) => {
    console.log('Datum going out!')
    await axios.post('http://localhost:3001/api/putData', {
        id: idToBeAdded,
        message: messageToBeAdded,
        signature: signatureToBeAdded,
    });
};

const deleteMessage = async (objIdToDelete) => {
    await axios.delete('http://localhost:3001/api/deleteData', {
        data: {
            id: objIdToDelete,
        },
    });
};

const updateMessage = async (objIdToUpdate, updateToApply) => {
    await axios.post('http://localhost:3001/api/updateData', {
        id: objIdToUpdate,
        update: { message: updateToApply },
    });
};

const deleteAllMessages = async () => {
    await axios.delete('http://localhost:3001/api/removeDataCollection');
    this.getDataFromDb();
}


export { getMessages, postMessage, deleteMessage, updateMessage, deleteAllMessages }