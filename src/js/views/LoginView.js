import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import { replaceState }       from 'redux-router';
import actionCreators         from '../actions/auth';

const mapStateToProps = (state) => ({
  auth: state.auth,
  routerState: state.router
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch),
  replaceState: bindActionCreators(replaceState, dispatch)
});

export class LoginView extends React.Component {

  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isLoggedIn) {
      var { location, routerState } = this.props;

      if (location.state && location.state.nextPathname) {
        this.props.replaceState(routerState, location.state.nextPathname);
      } else {
        this.props.replaceState(routerState, '/');
      }
    }
  }

  handleSubmit(e) {
    e.preventDefault()

    const email = this.refs.email.value;
    const pass = this.refs.password.value;

    this.props.actions.login(email, pass);
  }

  render() {
    const { loginError } = this.props.auth;

    return (
      <form onSubmit={this.handleSubmit}>
        <label><input ref="email" placeholder="email" defaultValue="test@example.com" /></label>
        <label><input ref="password" placeholder="password" /></label> (hint: testing)<br />
        <button type="submit">Login</button>
        {loginError && (
          <p>Bad login information</p>
        )}
      </form>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
