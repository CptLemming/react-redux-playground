import React from 'react';

import MessageListItem from './MessageListItem';

class MessageList extends React.Component {
  static propTypes = {
    messages: React.PropTypes.arrayOf(React.PropTypes.shape({
      message: React.PropTypes.string.isRequired
    }))
  }

  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <h3>Messages</h3>
        <ul>
          {this.props.messages.map((item, i) => (<li key={i}><MessageListItem {...item} /></li>))}
        </ul>
      </div>
    );
  }
}

export default MessageList;
