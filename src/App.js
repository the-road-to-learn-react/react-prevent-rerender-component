import React, { Component, PureComponent } from 'react';
import styled from 'styled-components';
import { pure } from 'recompose';

const list = new Array(5000).fill(0);

class App extends Component {
  state = {
    perspective: false,
  };

  togglePerspective = () => {
    this.setState(state => ({ perspective: !state.perspective }));
  };

  render() {
    return (
      <div>
        <Button onClick={this.togglePerspective}>
          Toggle Perspective
        </Button>

        <Perspective perspective={this.state.perspective}>
          {list.map((v, i) => <Exponential key={i} number={i} />)}
        </Perspective>
      </div>
    );
  }
}

const Perspective = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${props => (props.perspective ? 'row' : 'column')};
`;

const Button = ({ onClick, children }) => (
  <button type="button" onClick={onClick}>
    {children}
  </button>
);

const Item = styled.div`
  margin: 10px;
`;

// Different versions:

// FAST, no re-render, shallow shouldComponentUpdate check
const Exponential = pure(({ number }) => (
  <Item>{number * number}</Item>
));

// FAST, no re-render, shallow shouldComponentUpdate check
// class Exponential extends PureComponent {
//   render() {
//     return <Item>{this.props.number * this.props.number}</Item>;
//   }
// }

// FAST, no re-render, fine-granular shouldComponentUpdate check
// class Exponential extends Component {
//   shouldComponentUpdate(nextProps, nextState) {
//     if (this.props.number === nextProps.number) {
//       return false;
//     } else {
//       return true;
//     }
//   }

//   render() {
//     return <Item>{this.props.number * this.props.number}</Item>;
//   }
// }

// SLOW
// class Exponential extends Component {
//   render() {
//     return <Item>{this.props.number * this.props.number}</Item>;
//   }
// }

// SLOW
// const Exponential = ({ number }) => <Item>{number * number}</Item>;

export default App;
