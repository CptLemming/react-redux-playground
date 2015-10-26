import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import actionCreators         from '../actions/counter';

const mapStateToProps = (state) => ({
  counter : state.counter,
  routerState : state.router
});

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(actionCreators, dispatch)
});

export class CounterView extends React.Component {
  static propTypes = {
    actions  : React.PropTypes.object,
    counter  : React.PropTypes.number
  }

  constructor() {
    super();
  }

  render() {
    return (
      <div className='container text-center'>
        <h1>Welcome to the React Redux Starter Kit</h1>
        <h2>Sample Counter: {this.props.counter}</h2>
        <button className='btn btn-default'
                onClick={this.props.actions.increment}>
          Increment
        </button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CounterView);
