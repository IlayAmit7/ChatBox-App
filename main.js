async function getResponse() {
    
    try {
        // Get elements: 
        const textBox = document.getElementById("textBox");
        const responseDiv = document.getElementById("responseDiv");
        
        // Extract variables: 
        const text = textBox.value;

        
        // Create prompt: 
        const prompt = promptEngineering(text);
        
        // Get completion: 
        const completion = await getCompletion(prompt);
        
        // Display:
        displayHumanLikeWriting(completion);
        
    }
    catch (err) {
        console.log(err);
        alert(err.message);
    }
}

async function displayHumanLikeWriting(completion) {
    let text = "";
    for (let i = 0; i < completion.length; i++) {
        text += completion[i];
        responseDiv.innerHTML = text;
        await delay(30);
    }
}

function delay(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}

function promptEngineering(text) {
    let prompt = `
    Answer on the ${text} question
    `;
    return prompt;
}

async function getCompletion(prompt) {

    // API key:
    const apiKey = "paste-your-api";

    // URL: 
    const url = "https://api.openai.com/v1/completions";

    // Request body:
    const body = {
        prompt,
        model: "text-davinci-003",
        max_tokens: 2500 // Max tokens in completion (returned answer)
    };

    // POST options:
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer " + apiKey
        },
        body: JSON.stringify(body)
    };

    // Get response:
    const response = await fetch(url, options);

    // Extract JSON:
    const json = await response.json();

    // If there is an error:
    if (response.status >= 400) throw json.error;

    // Extract completion: 
    const completion = json.choices[0].text;

    // Return:
    return completion;
}



