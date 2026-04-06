async function analyze() {

    const message = document.getElementById("message").value;

    const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: message })
    });

    const data = await response.json();

    const resultDiv = document.getElementById("result");
    const lamp = document.getElementById("lamp");
    const bar = document.getElementById("toxicity-bar");
    const text = document.getElementById("toxicity-text");

    let resultText = "";
    let color = "";
    let lampClass = "";

    if (data.labels.threat.value) {
        resultText = "🔴 Threat Detected";
        color = "red";
        lampClass = "toxic";
    } else if (data.labels.obscene.value) {
        resultText = "🔴 Obscene Content";
        color = "red";
        lampClass = "toxic";
    } else if (data.labels.insult.value) {
        resultText = "🟡 Insult Detected";
        color = "yellow";
        lampClass = "toxic";
    } else if (data.labels.toxic.value) {
        resultText = "🟡 Toxic Message";
        color = "yellow";
        lampClass = "toxic";
    } else {
        resultText = "🟢 Clean Message";
        color = "lightgreen";
        lampClass = "clean";
    }

    resultDiv.innerHTML = resultText;
    resultDiv.style.color = color;

    lamp.classList.remove("clean", "toxic");
    lamp.classList.add(lampClass);

    let max = data.max_confidence;
    let labelName = data.max_label;

    bar.style.width = max + "%";

    if (max < 50) {
        bar.style.backgroundColor = "green";
    } else if (max < 80) {
        bar.style.backgroundColor = "yellow";
    } else {
        bar.style.backgroundColor = "red";
    }

    // explanation logic (so no undefined)
    let explanation = "";
    if (data.severity === "HIGH") {
        explanation = "Highly toxic message detected";
    } else if (data.severity === "MEDIUM") {
        explanation = "Moderately harmful content";
    } else {
        explanation = "Safe / low toxicity";
    }

    text.innerText =
        labelName.toUpperCase() + " → " + max + "%\n" +
        "Severity: " + data.severity + "\n" +
        explanation;
}