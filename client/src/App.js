import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import * as MessageHandler from './handlers/messageHandler';
import Home from './components/home';
import Entries from './components/entries';
import Input from './components/inputPage/inputPage';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      intervalIsSet: false,
    };
  }

  componentDidMount() {
    this.getMessages()
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getMessages, 5000);
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

  getMessages = async () => {
    const messages = await MessageHandler.getMessages();
    this.setState({ messages });
  }

  siteHeader = () => {
    return (
      <React.Fragment>
        <h2>Welcome to The Yeet Machine</h2>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li><Link to={'/'} className="nav-link"> Home </Link></li>
            <li><Link to={'/entries'} className="nav-link">Entries</Link></li>
            <li><Link to={'/input'} className="nav-link">Input</Link></li>
          </ul>
        </nav>
        <hr />
      </React.Fragment>
    )
  }

  pageContent = () => {
    return (
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/input'
          render={() => <Input messages={this.state.messages} getMessages={this.getMessages} />} />
        <Route path='/entries'
          render={() => <Entries messages={this.state.messages} />}
        />
      </Switch>
    )
  }

  render() {
    return (
      <Router>
        {this.siteHeader()}
        {this.pageContent()}
      </Router>
    );
  }
}

export default App;
