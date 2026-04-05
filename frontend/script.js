console.log("JS LOADED");
async function analyze(){

    const message = document.getElementById("message").value;

    const response = await fetch("http://127.0.0.1:5000/predict",{

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            text: message
        })

    });

    const data = await response.json();
    console.log(data);

    const resultDiv = document.getElementById("result");
    const lamp = document.getElementById("lamp");


let resultText = "";
let color = "";
let lampClass = "";

// Severity logic
if (data.threat.value) {
    resultText = "🔴 Threat Detected";
    color = "red";
    lampClass = "toxic";
}
else if (data.obscene.value) {
    resultText = "🔴 Obscene Content";
    color = "red";
    lampClass = "toxic";
}
else if (data.insult.value) {
    resultText = "🟡 Insult Detected";
    color = "yellow";
    lampClass = "toxic";
}
else if (data.toxic.value) {
    resultText = "🟡 Toxic Message";
    color = "yellow";
    lampClass = "toxic";
}
else {
    resultText = "🟢 Clean Message";
    color = "lightgreen";
    lampClass = "clean";
}

// Apply to UI
resultDiv.innerHTML = resultText;
resultDiv.style.color = color;

// Lamp update
lamp.classList.remove("clean", "toxic");
lamp.classList.add(lampClass);

let bar = document.getElementById("toxicity-bar");
let text = document.getElementById("toxicity-text");

let max = 0;
let labelName = "";

for (let key in data) {
    if (data[key].confidence > max) {
        max = data[key].confidence;
        labelName = key;
    }
}

bar.style.width = max + "%";

if (max < 50) {
    bar.style.backgroundColor = "green";
} else if (max < 80) {
    bar.style.backgroundColor = "yellow";
} else {
    bar.style.backgroundColor = "red";
}

text.innerText = labelName.toUpperCase() + " → " + max + "%";

console.log("FULL DATA:",data);
}

