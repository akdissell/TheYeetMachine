
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Entries extends Component {
  render() {
    return (
      <>
        <h2>List entries here</h2>
        <Link to={'/input'} className="nav-link">
          <button className="Button">
            YEET
          </button>
        </Link>
        <ul>
          {(this.props.messages.length <= 0)
            ? "NO DB ENTRIES YET"
            : this.props.messages.map((message, messageIndex) => (
              <li style={{ padding: '10px' }} key={messageIndex}>
                <span style={{ color: 'gray' }}> id: </span> {message.id} <br />
                <span style={{ color: 'gray' }}> message: </span> {message.message}<br />
                <span style={{ color: 'gray' }}> signature: </span> {message.signature}<br />
              </li>
            ))}
        </ul>
      </>
    );
  }
}
