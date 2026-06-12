/*const xhr = new XMLHttpRequest();
xhr.addEventListener('load', () => {
  console.log(xhr.response);
});

xhr.open('GET', 'https://supersimplebackend.dev/greeting');
xhr.send();





async function getMessage() {
  const response = await fetch("https://supersimplebackend.dev/greeting")
  const text = await response.text();
  console.log(text);
}

getMessage();



async function sendName() {
  const response = await fetch("https://supersimplebackend.dev/greeting", {
    method: 'POST',
    headers: {'Content-Type' : 'application/json' },
    body: JSON.stringify({ name: "Adam_Driscoll"})
  });

  const text = await response.text();
  console.log(text);
}

sendName();


async function amazonRequest() {
  try{
    const response = await fetch("https://amazon.com");
    const text = await response.text();
    console.log(text);
  }
  catch(error){
    console.log("CORS error. Your request was blocked by the backend.");
  }
}

amazonRequest();*/

async function errorHandling() {
  try{
    const response = await fetch("https://supersimplebackend.dev", {
      method: 'POST',
      headers: { "Content-Type" : "application/json"}
    });

    let status = await response.status;
    if (status>=400){ throw status; }

    const text = await response.text();
    console.log(text);
  }
  catch(error){
    if (error.status===400){
      const errorMessage = await error.json();
      console.log(errorMessage);
    }
    else{
      console.log("Network error. Please try again later");
    }
  }
}


errorHandling();