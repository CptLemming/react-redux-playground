import React from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import { Link } from 'react-router'
import '../styles/core.scss';

const mapStateToProps = (state) => ({
  auth: state.auth
});

export class CoreLayout extends React.Component {
  static propTypes = {
    children : React.PropTypes.element
  }

  constructor () {
    super();
  }

  render() {
    return (
      <div className='page-container'>
        <div className='view-container'>
          <nav>
            <ul>
              <li>
                {this.props.auth.isLoggedIn ? (
                  <Link to="/logout">Log out</Link>
                ) : (
                  <Link to="/login">Sign in</Link>
                )}
              </li>
              <li><Link to="/chat">Chat</Link> (authenticated)</li>
              <li><Link to="/">Home</Link></li>
            </ul>
          </nav>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(CoreLayout);
