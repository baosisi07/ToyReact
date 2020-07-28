export let MyReact = {
    createElement(type,attributes,...children) {
        console.log(arguments)
        let ele = document.createElement(type)
        for(let attr in attributes) {
            ele.setAttribute(attr,attributes[attr])
        }
        for(let child of children) {
            if(typeof child === 'string') {
                child = document.createTextNode(child)
            }
            ele.appendChild(child)
        }
        return ele
    }
}