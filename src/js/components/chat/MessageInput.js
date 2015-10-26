import React from 'react';

class MessageInput extends React.Component {
  static propTypes = {
    sendMessage: React.PropTypes.func
  }

  constructor() {
    super();

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    var input = this.refs.message;
    var message = input.value.trim();

    this.props.sendMessage(message);
    input.value = '';
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input type="text" ref="message" name="message" />
        <button type="submit" className='btn btn-default'>Send</button>
      </form>
    );
  }
}

export default MessageInput;
