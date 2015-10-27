import React from 'react';

class MessageListItem extends React.Component {
  static propTypes = {
    message: React.PropTypes.string.isRequired,
    createdAt: React.PropTypes.string.isRequired,
    user: React.PropTypes.shape({
      username: React.PropTypes.string.isRequired
    })
  }

  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <p>Created by {this.props.user.username} at {this.props.createdAt}</p>
        <p>{this.props.message}</p>
      </div>
    );
  }
}

export default MessageListItem;
