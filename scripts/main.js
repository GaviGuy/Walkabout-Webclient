import { Client } from "https://unpkg.com/archipelago.js/dist/archipelago.min.js";

const client = new Client();
let slotData;

function initialize() {
    console.log("gmorning");
    initDebugHotkeys();
    document.getElementById("controls-connect").addEventListener("click",
        () => handleLoginButton());
    document.getElementById("chat-input").addEventListener("keyup", (e) => {
        if(e.key === "Enter" || e.keyCode === 13) {
            sendChatMessage();
        }
    });
    document.getElementById("top-arrow").addEventListener("click",
        (e) => handleTopArrow());
    document.getElementById("input-address").addEventListener("keyup",
        (e) => updateConnectButton());
    document.getElementById("input-username").addEventListener("keyup",
        (e) => updateConnectButton());
    document.getElementById("top-disconnect").addEventListener("click",
        () => disconnect());
    document.getElementById("controls-disconnect").addEventListener("click",
        () => disconnect());
    document.getElementById("select-course-button").addEventListener("click",
        () => changeContentWindow(contentWindows.courseSelect));
    document.getElementById("chat-send").addEventListener("click",
        () => sendChatMessage());

    parseCourseInfo();
    initScorecardTabs();
    updateConnectButton();
}

initialize();

function sendChatMessage() {
    let chatBar = document.getElementById("chat-input");
    client.messages.say(chatBar.value);
    chatBar.value = "";
}

client.messages.on("message", (content) => {
    printChatMessage(content);
});

function updateConnectButton() {
    if(document.getElementById("input-address").value && document.getElementById("input-username").value)
        document.getElementById("controls-connect").removeAttribute("disabled");
    else
        document.getElementById("controls-connect").setAttribute("disabled", 1);
}

function handleLoginButton() {
    let address = document.getElementById("input-address").value;
    let username = document.getElementById("input-username").value;
    let password = document.getElementById("input-password").value;

    if(!address || !username) return;

    login(address, username, password);
}

function displayConnected() {
    document.getElementById("controls-disconnect").removeAttribute("disabled");
    setTopMenuState(menuStates.collapsed);
}

function disconnect() {
    if(slotData) printChatMessage("Disconnected");
    slotData = null;
    client.login().catch(()=>{});
    clearCourseSelect();
    document.getElementById("controls-disconnect").setAttribute("disabled", 1);
    updateTopBar(topBarStates.none, "Disconnected");
    setTopMenuState(menuStates.fixed);
    changeContentWindow(contentWindows.blank);
    //update other relevant places: chat input
}

function login(address, username, password) {
    disconnect();
    updateTopBar(topBarStates.connecting, "Connecting...")
    console.log("logging in...");

    const options = {};
    if(password) options.password = password;

    client.login(address, username, "A Hat in Time", options)
        .then((val) => {
            slotData = val;
            console.log(slotData);
            displayConnected();
            updateTopBar(topBarStates.connected, `Connected to ${address} as ${username}`);
            generateCourseSelect();
            changeContentWindow(contentWindows.courseSelect);
        })
        .catch((e) => {
            console.error(e);
            setTopMenuState(menuStates.fixed);
            if(e.message.includes("InvalidSlot"))
                updateTopBar(topBarStates.error, `Failed to connect: Invalid slot name`);
            else if(e.message.includes("InvalidPassword"))
                updateTopBar(topBarStates.error, `Failed to connect: Incorrect password`);
            else if(e.message.includes("InvalidGame"))
                updateTopBar(topBarStates.error, `Failed to connect: Incorrect game for slot`);
            else
                updateTopBar(topBarStates.error, `Failed to connect to server`);
        });
}