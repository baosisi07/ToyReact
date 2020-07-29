class wrapperElement {
    constructor(type) {
        this.root = document.createElement(type)
    }
    setAttribute(name,value) {
        if(/^on([\s\S]+)$/.test(name)) {
            let eventName =RegExp.$1.replace(/^[\s\S]/, s => s.toLowerCase()) 
            console.log(eventName)
            this.root.addEventListener(eventName,value)
        }
        if(name === 'className') {
            name = 'class'
        }
        this.root.setAttribute(name, value)
    }
    appendChild(child) {
        let range = document.createRange()
        if(this.root.children.length) {
            range.setStartAfter(this.root.lastChild)
            range.setEndAfter(this.root.lastChild)
        } else {
            range.setStart(this.root,0)
            range.setEnd(this.root,0)
        }
        child.mountedTo(range)
    }
    mountedTo(range) {
        range.deleteContents()
        range.insertNode(this.root)
    }
}
class wrapperTextElement {
    constructor(content) {
        this.root = document.createTextNode(content)
    }
    mountedTo(range) {
        range.deleteContents()
        range.insertNode(this.root)
    }
}
export class Component {
    constructor() {
        this.children = []
        this.props = Object.create(null)
    }
    setAttribute(name, value) {
        this.props[name] = value
        this[name] = value
    }
    appendChild(vChild) {
        this.children.push(vChild)
    }
    mountedTo(range) {
        this.range = range
        this.update()
    }
    update() {
        let placeH = document.createComment('placeH')
        let range = document.createRange()
        range.setStart(this.range.endContainer, this.range.endOffset)
        range.setEnd(this.range.endContainer, this.range.endOffset)
        range.insertNode(placeH)

        this.range.deleteContents()

        let vDom = this.render()
        vDom.mountedTo(this.range)
    }
    setState(state) {
        let merge = (oldState,newState) => {
            for(let s in newState) {
                if(typeof newState[s] === 'object') {
                    if(typeof oldState[s] !== 'object') {
                        newState[s] = {}
                    } else {
                        merge(oldState[s],newState[s])
                    }
                } else {
                    oldState[s] = newState[s]
                }
            }
        }
        if(!this.state && state) {
            this.state = {}
        }
        merge(this.state,state)
        this.update()
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
        let range = document.createRange()
        if (parent.children.length) {
            range.setStartAfter(parent.lastChild)
            range.setEndAfter(parent.lastChild)
        } else {
            range.setStart(parent, 0)
            range.setEnd(parent, 0)
        }
        vDom.mountedTo(range)
    }
}