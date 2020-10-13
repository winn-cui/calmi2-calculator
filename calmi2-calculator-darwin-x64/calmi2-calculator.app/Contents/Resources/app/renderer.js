const zerorpc = require("zerorpc");
let client = new zerorpc.Client();

client.connect("tcp://127.0.0.1:4242");

client.invoke("echo", "server ready", (error, res) => {
  if (error || res !== "server ready") {
    console.error(error);
  } else {
    console.log("server is ready");
  }
});

let button = document.querySelector("#sum-button");
let result = document.querySelector("#result");

button.addEventListener("click", () => {
  let num1 = Number(document.querySelector("#num-1").value);
  let num2 = Number(document.querySelector("#num-2").value);
  client.invoke("calc", num1, num2, (error, res) => {
    if (error) {
      console.error(error);
    } else {
      result.value = res;
    }
  });
});

button.dispatchEvent(new Event("input"));
