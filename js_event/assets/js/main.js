
const socket = io('http://localhost:3000'); //127 -> localhost
//Khoi tao connect toi server socket
socket.on("connection", (socket) => {
    socket.emit("hello", "world");
});

const sendBtnEle = document.querySelector('.send-btn')
const messageInputEle = document.querySelector('.message-input')
let username =  '';
while(!username || !username.trim()){
    username = window.prompt('Vui lòng nhập tên để tiếp tục.')
}
sendBtnEle.addEventListener('click', () => {
    console.log('click')
    const content = messageInputEle.value.trim();
    if(!content){
        return
    }
    socket.emit('client_send_message', {
        username,
        content
    })
    messageInputEle.value = '';
    messageInputEle.focus()
})

socket.on('server_send_message', (data) => {
    render(data)
})

socket.on('server_send_message_current', (data) => {
    data.forEach(msg => {
        render(msg)        
    });
})
const render = (message) => {
    const messageListEle = document.querySelector('.message-list');
    const messageItemEle = document.createElement('li')

    const messageItemContent = document.createElement('span');
    messageItemContent.textContent = message.content;
    const usernameEle = document.createElement('strong');
    usernameEle.textContent = `${message.username}: `;

    messageItemEle.append(usernameEle, messageItemContent)
    messageListEle.appendChild(messageItemEle)
}