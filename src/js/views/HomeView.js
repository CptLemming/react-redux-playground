import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import { Link }               from 'react-router';
import actionCreators         from '../actions/counter';

// We define mapStateToProps and mapDispatchToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  counter : state.counter,
  routerState : state.router
});

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(actionCreators, dispatch)
});

export class HomeView extends React.Component {
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
        <nav>
          <h2>Demos:</h2>
          <ul>
            <li><Link to="/counter">Counter</Link></li>
            <li><Link to="/chat">Chat</Link></li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
