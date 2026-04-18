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
}

function updateTopBar(style, message) {
    const classes = ["disconnected-0", "connecting", "connected", "disconnected-1"];
    document.getElementById("connection-info").classList = [`${classes[style]}`];
    document.getElementById("top-text").innerText = message;
}

function displayConnected() {
    document.getElementById("controls-disconnect").removeAttribute("disabled");
}

function disconnect() {
    client.login().catch(()=>{});
    clearCourseSelect();
    document.getElementById("controls-disconnect").setAttribute("disabled",1);
    updateTopBar(0, "Disconnected");
    //update other relevant places: chat input
}

function clearCourseSelect() {
    document.getElementById("course-select-list").innerHTML = "";
}

function generateCourseSelect() {
    clearCourseSelect();
    let coursesElem = document.getElementById("course-select-list");
    for(let i in courseInfo) {
        let newElem = document.createElement("div");
        newElem.classList.add("course-tile");
        newElem.innerText = `${i} (${courseInfo[i].abbreviation})`;
        coursesElem.appendChild(newElem);
    }
}

function login(address, username) {
    disconnect();
    updateTopBar(1, "Connecting...")
    console.log("logging in...");
    client.login(address, username)
        .then((val) => {
            slotData = val;
            console.log(slotData);
            displayConnected();
            updateTopBar(2, `Connected to ${address} as ${username}`);
            generateCourseSelect();
        })
        .catch((e) => {
            console.error(e);
            updateTopBar(3, `Failed to connect`);
        });
}

