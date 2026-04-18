import { Client } from "https://unpkg.com/archipelago.js/dist/archipelago.min.js";

const client = new Client();


console.log("gmorning");
document.getElementById("login-button").addEventListener("click", () => {handleLoginButton()});
document.getElementById("chat-input").addEventListener("keyup", (e) => {
    if(e.key === "Enter" || e.keyCode === 13) {
        let elem = document.getElementById("chat-input");
        client.messages.say(elem.value);
        elem.value = "";
    }
});
document.getElementById("top-disconnect").addEventListener("click", () => {disconnect()});

parseCourseInfo();

client.messages.on("message", (content) => {
    console.log(content);
});

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

function disconnect() {
    client.login().catch(()=>{});
    clearCourseSelect();
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
        .then((slotData) => {
            console.log(slotData);
            updateTopBar(2, `Connected to ${address} as ${username}`);
            generateCourseSelect();
        })
        .catch((e) => {
            console.error(e);
            updateTopBar(3, `Failed to connect`);
        });
}

