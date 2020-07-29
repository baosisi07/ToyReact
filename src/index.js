import {MyReact, Component} from './MyReact'
import './index.css'
// class MyComponent extends Component {
//     render() {
//     return <div class="attr"><span>hello </span><span>world!</span><p>{false}</p>{this.children}</div>
//     }
    
// }

// let a = <MyComponent name="ss"><div>你好</div></MyComponent>

// MyReact.render(a, document.getElementById('root'))



// let b = <div class="ss">
//     <span class="f">233</span>
//     <span>hello</span>
// </div>

// let root = document.getElementById('root');
// root.appendChild(b)


class Board extends Component {
  renderSquare(i) {
    return <Square value={i} />;
  }
  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
class Square extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }
  render() {
    return (
      <button className="square" onClick={() => this.setState({value: 'X'})}>
        {this.state.value || ''}
      </button>
    );
  }
}

MyReact.render(<Board/>, document.getElementById('root'))