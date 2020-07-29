import {MyReact, Component} from './MyReact'

class MyComponent extends Component {
    render() {
    return <div class="attr"><span>hello </span><span>world!</span><p>{false}</p>{this.children}</div>
    }
    
}
let a = <MyComponent name="ss"><div>你好</div></MyComponent>

MyReact.render(a, document.getElementById('root'))
// let b = <div class="ss">
//     <span class="f">233</span>
//     <span>hello</span>
// </div>

// let root = document.getElementById('root');
// root.appendChild(b)