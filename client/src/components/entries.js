
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default class Entries extends Component {

  header = () => {
    return (
      <>
        <EntriesHeader>List entries here</EntriesHeader>
        <Link to={'/input'} className="nav-link">
          <YeetButton>
            YEET
          </YeetButton>
        </Link>
      </>
    )
  }

  messageList = () => {
    return (
      this.props.messages.map((message, messageIndex) => (
        <EntryItem key={messageIndex}>
          <IDContainer>
            <LineTitle>
              id:
            </LineTitle>
            {message.id}
          </IDContainer>
          <RowContainer>
            <LineTitle>
              message:
            </LineTitle>
            {message.message}
          </RowContainer>
          <RowContainer>
            <LineTitle>
              signature:
            </LineTitle>
            {message.signature}
          </RowContainer>
        </EntryItem>
      ))
    )
  }


  render() {
    return (
      <>
        <ContentContainer>
          {this.header()}
        </ContentContainer>
        <EntriesList>
          {(this.props.messages.length <= 0)
            ? "NO DB ENTRIES YET"
            : this.messageList()}
        </EntriesList>
      </>
    );
  }
}


const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`

const EntriesHeader = styled.div`
  margin: 10px;
`

const YeetButton = styled.button`
  margin: 10px;
  background-color: #446272;
  color: white;
  border-color: #32292F;
`

const EntriesList = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`

const EntryItem = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  padding: 10px;
`

const RowContainer = styled.div`
  color: #27464F;
  display: flex;
  max-width: 500px;
  margin-right: 20px;
`

const IDContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 50px;
  margin-right: 5px;
`

const LineTitle = styled.div`
  color: grey;
  margin-right: 5px;
`

