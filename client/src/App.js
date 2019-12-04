import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  //initialize our state
  state = {
    data: [],
    id: 0,
    message: null,
    signature: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
  };

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
    const { data } = this.state;
    return (
      <div>
        <ul>
          {data.length <= 0
            ? 'NO DB ENTRIES YET'
            : data.map((datum, datumIndex) => (
              <li style={{ padding: '10px' }} key={datumIndex}>
                <span style={{ color: 'gray' }}> id: </span> {datum.id} <br />
                <span style={{ color: 'gray' }}> data: </span>
                {datum.message}
              </li>
            ))}
        </ul>
        <div style={{ padding: '10px' }}>
          <input
            id='add'
            type="text"
            onChange={(e) => this.setState({ message: e.target.value })}
            placeholder="add something in the database"
            style={{ width: '200px' }}
          />
          <button onClick={() => this.putToDBThenGetData(this.state.message, this.state.signature)}>
            ADD
          </button>
        </div>
        <div style={{ padding: '10px' }}>
          <input
            type="text"
            style={{ width: '200px' }}
            onChange={(e) => this.setState({ idToDelete: e.target.value })}
            placeholder="put id of item to delete here"
          />
          <button onClick={() => { this.deleteFromDBThenGetData(this.state.idToDelete) }}>
            DELETE
          </button>
        </div>
        <div style={{ padding: '10px' }}>
          <input
            type="text"
            style={{ width: '200px' }}
            onChange={(e) => this.setState({ idToUpdate: e.target.value })}
            placeholder="id of item to update here"
          />
          <input
            type="text"
            style={{ width: '200px' }}
            onChange={(e) => this.setState({ updateToApply: e.target.value })}
            placeholder="put new value of the item here"
          />
          <button
            onClick={() =>
              this.updateDBThenGetData(this.state.idToUpdate, this.state.updateToApply)
            }
          >
            UPDATE
          </button>
        </div>
        <div style={{ padding: '10px'}}>
            <input
            type="text"
            style={{ width: '200px' }}
            onChange={(e) => this.setState({ signature: e.target.value })}
            placeholder="Sign Here"
            />
        </div>
        <div style={{ padding: '10px' }}>
          <button
            onClick={() =>
              this.dropDataCollectionInDB()}>
            REMOVE COLLECTION
          </button>
        </div>
        <div>

        </div>
      </div>
    );
  }
}

export default App;
