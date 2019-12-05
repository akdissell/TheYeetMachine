
import React, { Component } from 'react';

export default class Entries extends Component {
  render() {
    return (
      <div>
        <h2>List entries here</h2>
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
      </div>
    );
  }
}
