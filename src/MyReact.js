class wrapperElement {
    constructor(type) {
        this.root = document.createElement(type)
    }
    setAttribute(name,value) {
        this.root.setAttribute(name,value)
    }
    appendChild(child) {
        child.mountedTo(this.root)
    }
    mountedTo(parent) {
        parent.appendChild(this.root)
    }
}
class wrapperTextElement {
    constructor(content) {
        this.root = document.createTextNode(content)
    }
    mountedTo(parent) {
        parent.appendChild(this.root)
    }
}
export class Component {
    constructor() {
        this.children = []
    }
    setAttribute(name, value) {
        this[name] = value
    }
    appendChild(vChild) {
        this.children.push(vChild)
    }
    mountedTo(parent) {
        let vDom = this.render()
        vDom.mountedTo(parent)
    }
}
export let MyReact = {
    createElement(type,attributes,...children) {
        let ele
        if(typeof type === 'string') {
            ele = new wrapperElement(type)
        } else {
            ele = new type
        }
        for(let attr in attributes) {
            ele.setAttribute(attr,attributes[attr])
        }
        let insertChild = (children) => {
            for (let child of children) {
                if(typeof child === 'object' && child instanceof Array) {
                    insertChild(child)
                } else {
                    if (!(child instanceof Component) && !(child instanceof wrapperElement) && !(child instanceof wrapperTextElement)) {
                        child = String(child)
                    }

                    if (typeof child === 'string') {
                        child = new wrapperTextElement(child)
                    }
                    ele.appendChild(child)
                } 
            }
        }
        insertChild(children)
        return ele
    },
    render(vDom,parent) {
        vDom.mountedTo(parent)
    }
}