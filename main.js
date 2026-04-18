import { Client } from "node_modules/archipelago.js";

const client = new Client();

console.log("gmorning");

client.messages.on("message", (content) => {
    console.log(content);
});

function login(address, player) {
    client.login(address, player)
        .then(() => console.log("Connected!"))
        .catch(console.error);
}

