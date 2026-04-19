import { Client } from "https://unpkg.com/archipelago.js/dist/archipelago.min.js";

const client = new Client();
let slotData;

function initialize() {
    console.log("gmorning");
    document.getElementById("controls-connect").addEventListener("click", () => {handleLoginButton()});
    document.getElementById("chat-input").addEventListener("keyup", (e) => {
        if(e.key === "Enter" || e.keyCode === 13) {
            let elem = document.getElementById("chat-input");
            client.messages.say(elem.value);
            elem.value = "";
        }
    });
    document.getElementById("input-address").addEventListener("keyup", (e) => {
        updateConnectButton();
    });
    document.getElementById("input-username").addEventListener("keyup", (e) => {
        updateConnectButton();
    });
    document.getElementById("top-disconnect").addEventListener("click", () => {disconnect()});
    document.getElementById("controls-disconnect").addEventListener("click", () => {disconnect()});

    parseCourseInfo();
    initScorecardTabs();
    updateConnectButton();
}

initialize();

client.messages.on("message", (content) => {
    console.log(content);
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

    if(!password) login(address, username);
    else login(address, username, password);
}

function updateTopBar(style, message) {
    const classes = ["disconnected-0", "connecting", "connected", "disconnected-1"];
    document.getElementById("connection-info").classList = [`${classes[style]}`];
    document.getElementById("top-text").innerText = message;
}

function displayConnected() {
    document.getElementById("controls-disconnect").removeAttribute("disabled");
    updateConnectionControls(1);
}

function disconnect() {
    client.login().catch(()=>{});
    clearCourseSelect();
    document.getElementById("controls-disconnect").setAttribute("disabled",1);
    updateTopBar(0, "Disconnected");
    updateConnectionControls(0);
    //update other relevant places: chat input
}

function login(address, username, password) {
    disconnect();
    updateTopBar(1, "Connecting...")
    console.log("logging in...");

    const options = {};
    if(password) options.password = password;

    client.login(address, username, "", options)
        .then((val) => {
            slotData = val;
            console.log(slotData);
            displayConnected();
            updateTopBar(2, `Connected to ${address} as ${username}`);
            generateCourseSelect();
            generateScorecard("Tourist Trap");
        })
        .catch((e) => {
            console.error(e);
            if(e.message.includes("InvalidSlot"))
                updateTopBar(3, `Failed to connect: Invalid slot name`);
            else if(e.message.includes("InvalidPassword"))
                updateTopBar(3, `Failed to connect: Incorrect password`);
            else
                updateTopBar(3, `Failed to connect to server`);
        });
}

function updateConnectionControls(connected) {
    let elem = document.getElementById("connect-controls");
    if(connected) elem.classList.remove("active");
    else elem.classList.add("active");
}