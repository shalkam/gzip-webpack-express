import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

export default class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      count: 0
    };
  }

  handleUp(e) {
    this.setState({
      count: this.state.count + 1
    });
  }

  handleDown(e) {
    this.setState({
      count: this.state.count - 1
    });
  }

  render() {
    return (
      <div
        className="well"
        style={{
          'text-align': 'center',
          margin: 25
        }}>
        <h1>{this.state.count}</h1>
        <button className="btn btn-success btn-lg" onClick={this.handleUp.bind(this)}>
          Count Up!!
        </button>{' '}
        <button className="btn btn-danger btn-lg" onClick={this.handleDown.bind(this)}>
          Count Down!!
        </button>
      </div>
    );
  }
}
