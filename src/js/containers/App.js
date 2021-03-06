import React        from 'react';
import { Provider } from 'react-redux';
import { createDevToolsWindow } from '../utils';
import { DevTools, LogMonitor, DebugPanel } from 'redux-devtools/lib/react';
import { ReduxRouter } from 'redux-router';

export default class App extends React.Component {
  static propTypes = {
    store : React.PropTypes.object.isRequired,
    debug : React.PropTypes.bool,
    debugExternal : React.PropTypes.bool
  }

  constructor() {
    super();
  }

  renderDevTools() {
    if (!this.props.debug) {
      return null;
    }

    if (this.props.debugExternal) {
      createDevToolsWindow(this.props.store);
      return null;
    }

    return (
      <DebugPanel top right bottom key='debugPanel'>
        <DevTools store={this.props.store} monitor={LogMonitor} />
      </DebugPanel>
    );
  }

  render() {
    return (
      <div>
        {this.renderDevTools()}
        <Provider store={this.props.store}>
          <ReduxRouter />
        </Provider>
      </div>
    );
  }
}
