const maincontainer = document.querySelector('#root')
const reactElement = {
    type: 'a',
    props:{
        href:'https://www.google.com',
        target:'_blank',
    },
    content:'click on me to navigate to google'

}
function customRender(reactElement,maincontainer){
    // const domElement = document.createElement(reactElement.type)
    // domElement.innerHTML= reactElement.content
    // domElement.setAttribute('href',reactElement.props.href)
    // domElement.setAttribute('target',reactElement.props.target)

    // maincontainer.appendChild(domElement)

    
}

customRender(reactElement,maincontainer)
