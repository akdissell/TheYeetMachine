import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import * as MessageHandler from "./handlers/messageHandler";
import Home from './components/home';
import Entries from './components/entries';
import Input from './components/input';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      message: null,
      signature: null,
      intervalIsSet: false,
      idToDelete: null,
      idToUpdate: null,
      objectToUpdate: null,
    };
  }

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

  putToDBThenGetData = async (messageToBeAdded, signatureToBeAdded) => {
    const idToBeAdded = this.generateMessageId(this.state.data);
    await MessageHandler.postMessage(messageToBeAdded, signatureToBeAdded, idToBeAdded);
    this.getDataFromDb();
    document.getElementById('add').value = '';
  }
  deleteFromDBThenGetData = async (idToDelete) => {
    const objIdToDelete = this.getObjIdFromMessageId(idToDelete, this.state.data);
    await MessageHandler.deleteMessage(objIdToDelete);
    this.getDataFromDb();
  }
  updateDBThenGetData = async (idToUpdate, updateToApply) => {
    console.log('Im updating the data!')
    const objIdToUpdate = this.getObjIdFromMessageId(idToUpdate, this.state.data);
    await MessageHandler.updateMessage(objIdToUpdate, updateToApply);
    this.getDataFromDb();
  }
  getDataFromDb = async () => {
    const data = await MessageHandler.getMessages();
    this.setState({ data: data });
  }
  generateMessageId = (messages) => {
    let currentIds = messages.map((message) => message.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }
    return idToBeAdded;
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

  render() {
    return (
      <div>
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
        <div style={{ padding: '10px' }}>
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
        <Router>
          <div>
            <h2>Welcome to React Router Tutorial</h2>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <ul className="navbar-nav mr-auto">
                <li><Link to={'/'} className="nav-link"> Home </Link></li>
                <li><Link to={'/entries'} className="nav-link">Entries</Link></li>
                <li><Link to={'/input'} className="nav-link">Input</Link></li>
              </ul>
            </nav>
            <hr />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/input' component={Input} />
              <Route path='/entries'
                render={() => <Entries messages={this.state.data} />}
              />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
