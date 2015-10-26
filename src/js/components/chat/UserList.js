import React from 'react';

class UserList extends React.Component {
  static propTypes = {
    users: React.PropTypes.arrayOf(React.PropTypes.shape({
      username: React.PropTypes.string.isRequired
    }))
  }

  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <h3>Users</h3>
        <ul>
          {this.props.users.map((user, i) => (<li key={i}>{user.username}</li>))}
        </ul>
      </div>
    );
  }
}

export default UserList;
