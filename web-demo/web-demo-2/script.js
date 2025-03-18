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
        const data = JSON.parse(message)
        document.getElementById("soilMoisture").innerText = data["soil-moisture"]
        document.getElementById("npkSensor").innerText = data["npk-sensor"]
        document.getElementById("temperature").innerText = data.temperature
        document.getElementById("humidity").innerText = data.humidity
    }
})

function sendCommand(cmd) {
    client.publish(topicPub, cmd)
    console.log("Send: " + cmd);
}

function confirmReset() {
    if (confirm("Reset WebPage?")) {
        location.reload()
    }
}