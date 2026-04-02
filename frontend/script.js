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
if (data.threat) {
    resultText = "🔴 Threat Detected";
    color = "red";
    lampClass = "toxic";
}
else if (data.obscene) {
    resultText = "🔴 Obscene Content";
    color = "red";
    lampClass = "toxic";
}
else if (data.insult) {
    resultText = "🟡 Insult Detected";
    color = "yellow";
    lampClass = "toxic";
}
else if (data.toxic) {
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

console.log("FULL DATA:",data);
}

