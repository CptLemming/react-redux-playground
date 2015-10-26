import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import actionCreators         from '../actions/auth';

const mapStateToProps = (state) => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

export class LogoutView extends React.Component {

  constructor() {
    super();
  }

  componentDidMount() {
  	this.props.actions.logout();
  }

  render() {
    return (
      <p>You are now logged out</p>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoutView);
