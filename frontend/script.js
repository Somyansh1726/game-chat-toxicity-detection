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

    const resultDiv = document.getElementById("result");
    const lamp = document.getElementById("lamp");


if(data.prediction === "toxic"){

    resultDiv.innerHTML = "🔴 Toxic Message";
    resultDiv.style.color = "red";

    lamp.classList.remove("clean");
    lamp.classList.add("toxic");

}
else{

    resultDiv.innerHTML = "🟢 Clean Message";
    resultDiv.style.color = "lightgreen";

    lamp.classList.remove("toxic");
    lamp.classList.add("clean");

}

}