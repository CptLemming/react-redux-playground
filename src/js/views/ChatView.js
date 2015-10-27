import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import actionCreators         from '../actions/chat';

import UserList from '../components/chat/UserList';
import MessageList from '../components/chat/MessageList';
import MessageInput from '../components/chat/MessageInput';

import { chatSelector } from '../selectors/chat';

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(actionCreators, dispatch)
});

export class ChatView extends React.Component {
  static propTypes = {
    actions  : React.PropTypes.object,
    users    : React.PropTypes.array,
    messages : React.PropTypes.array
  }

  constructor() {
    super();

    this.sendMessage = this.sendMessage.bind(this);
  }

  componentWillMount() {
    this.props.actions.fetch_users();
    this.props.actions.fetch_messages();
  }

  sendMessage(message) {
    this.props.actions.send_message(message);
  }

  render() {
    return (
      <div className='container text-center'>
        <h1>Chat demo</h1>

        <UserList users={this.props.users} />

        <MessageList messages={this.props.messages} />

        <MessageInput sendMessage={this.sendMessage} />
      </div>
    );
  }
}

export default connect(chatSelector, mapDispatchToProps)(ChatView);
