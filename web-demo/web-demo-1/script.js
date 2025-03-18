const broker = "wss://test.mosquitto.org:8081/mqtt"
let topicPub = ""
let topicSub = ""

const client = mqtt.connect(broker)

function saveTopics() {
    topicSub = document.getElementById("topicSub").value
    topicPub = document.getElementById("topicPub").value

    if (topicSub && topicPub) {
        client.subscribe(topicSub)
        alert("Subscribe: " + topicSub + "\nPublish: " + topicPub)

        document.getElementById("topicInput").classList.add("hidden")
        document.getElementById("mainContent").classList.remove("hidden")
    } else {
        alert("Masukkan topic terlebih dahulu!")
    }
}

client.on("connect", () => {
    console.log("Terhubung ke MQTT Broker!")
})

client.on("message", (topic, message) => {
    if (topic === topicSub) {
        document.getElementById("status").innerText = message.toString()
    }
})

function sendCommand(cmd) {
    client.publish(topicPub, cmd)
    console.log("sendCommand: " + cmd)
}