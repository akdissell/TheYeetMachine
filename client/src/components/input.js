import React, { Component } from 'react';
import axios from 'axios';
import App from '../App';

class Input extends Component {

  
 state = { App };

  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 5000);
      this.setState({ intervalIsSet: interval });
    }
  }

  //never let a process live forever
  // always kill a process everytime we are done using it
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.instervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  getDataFromDb = () => {

    console.log('Im getting the data!')
    fetch('http://localhost:3001/api/getData')
      .then((data) => data.json())
      .then((res) => this.setState({ data: res.data }));
  };

  putDataToDB = async (messageToBeAdded, signatureToBeAdded) => {
    console.log('Datum going out!')

    let currentIds = this.state.data.map((data) => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }
console.log("signature is:", signatureToBeAdded);
    await axios.post('http://localhost:3001/api/putData', {
      id: idToBeAdded,
      message: messageToBeAdded,
      signature: signatureToBeAdded,
      
    });
    console.log("signature after axios is:", signatureToBeAdded);
  };

  deleteFromDB = async (idToDelete) => {
    idToDelete = parseInt(idToDelete, 10);
    let objIdToDelete = null;
    this.state.data.forEach((datum) => {
      if (datum.id === idToDelete) {
        objIdToDelete = datum._id;
      }
    });

    await axios.delete('http://localhost:3001/api/deleteData', {
      data: {
        id: objIdToDelete,
      },
    });
  };

  updateDB = async (idToUpdate, updateToApply) => {
    console.log('Im updating the data!')
    let objIdToUpdate = null;
    idToUpdate = parseInt(idToUpdate, 10);
    this.state.data.forEach((datum) => {
      if (datum.id === idToUpdate) {
        objIdToUpdate = datum._id;
      }
    });

    await axios.post('http://localhost:3001/api/updateData', {
      id: objIdToUpdate,
      update: { message: updateToApply },
    });
  };
  // adds data then grabs from database
  putToDBThenGetData = async (messageToBeAdded, signatureToBeAdded) => {
    await this.putDataToDB(messageToBeAdded, signatureToBeAdded);
    console.log("signature on putThenGet is:", signatureToBeAdded);
    this.getDataFromDb();
    document.getElementById('add').value = '';
  }
  // deletes data then grabs from database
  deleteFromDBThenGetData = async (idToDelete) => {
    await this.deleteFromDB(idToDelete);
    this.getDataFromDb();
  }
  // updates data then grabs from database
  updateDBThenGetData = async (idToUpdate, updateToApply) => {
    await this.updateDB(idToUpdate, updateToApply);
    this.getDataFromDb();
  }
  // removes collection from database then grabs from database
  dropDataCollectionInDB = async () => {
    await axios.delete('http://localhost:3001/api/removeDataCollection');
    this.getDataFromDb();
  }


  render() {

    return (
        <div>
          <h2>Make inputs here</h2>
        </div>
    );
  }
}

export default Input;