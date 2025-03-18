const broker = "wss://test.mosquitto.org:8081/mqtt";
const topicPub = "orca/control";
const topicSub = "orca/monitoring";

const client = mqtt.connect(broker);

client.on("connect", () => {
    console.log("Terhubung ke MQTT Broker!");
    client.subscribe(topicSub);
});

client.on("message", (topic, message) => {
    if (topic === topicSub) {
        document.getElementById("status").innerText = message.toString();
    }
});

function sendCommand(cmd) {
    client.publish(topicPub, cmd);
    console.log("Mengirim: " + cmd);
}