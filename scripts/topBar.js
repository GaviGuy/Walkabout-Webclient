const topBarStates = {
    none: 0,
    connecting: 1,
    connected: 2,
    error: 3
}

function updateTopBar(index, message) {
    document.getElementById("connection-info").setAttribute("state", index);
    document.getElementById("top-text").innerText = message;
}