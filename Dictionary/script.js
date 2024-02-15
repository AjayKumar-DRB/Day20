// Function to check if the key pressed is an alphabet or backspace
function checkLetterPress(event) {
    const isLetter = /^[a-zA-Z\s]$/.test(event.key) || event.key === 'Backspace';

    // If the key pressed is not an alphabet or backspace, prevent default behavior
    if (!isLetter) {
        return event.preventDefault();
    }
}

// Function to fetch data based on the input from the search bar
function processData(){
    const searchBox = document.getElementById("searchBar").value;
    getWordDetails(searchBox);
}

// Function to fetch details for the word of the day
function getWODDetails(){
    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/dig`;
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const wordOfTheDay = document.getElementById("wordOfTheDay");
            wordOfTheDay.textContent = data[0].word;

            const audioIcon = document.getElementById("wodAudio");
            audioIcon.innerHTML = `<i class="fa fa-volume-up p-1"></i>`;

            currentWODAudio = new Audio(data[0].phonetics[0].audio);
            audioIcon.addEventListener('click', () => { currentWODAudio.play() });

           const WODPronounciation = document.getElementById("wodPronounciation");
            if(data[0].phonetic){
                WODPronounciation.textContent = data[0].phonetic}
            else{
                WODPronounciation.textContent = null;
            }

           const wodPartOfSpeech = document.getElementById("wodPartOfSpeech")
           if(data[0].meanings[0].partOfSpeech){
                wodPartOfSpeech.textContent = data[0].meanings[0].partOfSpeech
            }
           else{
                wodPartOfSpeech.textContent = null;
            }

            const wodMeaning = document.getElementById("wodMeaning")
            if(data[0].meanings[0].definitions[0].definition){
                wodMeaning.textContent = data[0].meanings[0].definitions[0].definition
            }
            else{
                wodMeaning.textContent = null
            }

            const wodExample = document.getElementById("wodExample")
            if(data[0].meanings[0].definitions[0].example){
                wodExample.textContent = data[0].meanings[0].definitions[0].example
            }
            else{
                wodExample.textContent = null
            }

            const wodSynonym = document.getElementById("wodSynonym")
            if(data[0].meanings[0].definitions[0].synonyms.length > 0){
                wodSynonym.textContent = `Synonyms: ${data[0].meanings[0].definitions[0].synonyms}`
            }
            else{
                wodSynonym.textContent = null
            }

            const wodAntonym = document.getElementById("wodAntonym")
            if(data[0].meanings[0].definitions[0].antonyms.length > 0){
                wodAntonym.textContent = `Antonyms: ${data[0].meanings[0].definitions[0].antonyms}`
            }
            else{
                wodAntonym.textContent = null
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function getWordDetails(inputWord){
    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${inputWord}`;
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const word = document.getElementById("word");
            word.textContent = data[0].word;

            const audioIcon = document.getElementById("audio");
            audioIcon.innerHTML = `<i class="fa fa-volume-up p-1"></i>`;

            currentAudio = new Audio(data[0].phonetics[0].audio);
            audioIcon.addEventListener('click', () => { currentAudio.play() });

            const pronounciation = document.getElementById("pronunciation");
            pronounciation.textContent = data[0].phonetic;
            

            const partOfSpeech = document.getElementById("partOfSpeech")
            if(data[0].meanings[0].partOfSpeech){
                partOfSpeech.textContent = data[0].meanings[0].partOfSpeech
            }
            else{
                partOfSpeech.textContent = null;
            }

            const meaning = document.getElementById("meaning")
            if(data[0].meanings[0].definitions[0].definition){
                meaning.textContent = data[0].meanings[0].definitions[0].definition
            }
            else{
                meaning.textContent = null
            }

            const example = document.getElementById("example")
            if(data[0].meanings[0].definitions[0].example){
                example.textContent = data[0].meanings[0].definitions[0].example
            }
            else{
                example.textContent = null
            }

            const synonym = document.getElementById("synonym")
            if(data[0].meanings[0].definitions[0].synonyms.length > 0){
                synonym.textContent = `Synonyms: ${data[0].meanings[0].definitions[0].synonyms}`
            }
            else{
                synonym.textContent = null
            }

            const antonym = document.getElementById("antonym")
            if(data[0].meanings[0].definitions[0].antonyms.length > 0){
                antonym.textContent = `Antonyms: ${data[0].meanings[0].definitions[0].antonyms}`
            }
            else{
                antonym.textContent = null
            }            
        updateBackgroundColor()
        })
        .catch(() => {
            const word = document.getElementById("word");
            word.textContent = `kindly enter a valid word`;

            const audioIcon = document.getElementById("audio");
            audioIcon.innerHTML = "";

            const pronounciation = document.getElementById("pronunciation");
            pronounciation.textContent = "";            

            const partOfSpeech = document.getElementById("partOfSpeech")
            partOfSpeech.textContent = "";

            const meaning = document.getElementById("meaning")
            meaning.textContent = "";

            const example = document.getElementById("example")
            example.textContent = "";

            const synonym = document.getElementById("synonym")
            synonym.textContent = "";

            const antonym = document.getElementById("antonym")
            antonym.textContent = "";

        });
}

// Function to check if all child <p> elements are empty
function areAllEmpty(element) {
    const paragraphs = element.querySelectorAll('p');
    return Array.from(paragraphs).every(p => p.innerText.trim() === '');
}

// Function to update background color based on content
function updateBackgroundColor() {
    const searchResult = document.getElementById('result');
    if (areAllEmpty(searchResult)) {
        searchResult.classList.add('noContent');
    } else {
        searchResult.classList.remove('noContent');
    }
}

// Check initial state of searchResult
updateBackgroundColor();

// Function to display the present date
function presentDate(){
    let today = new Date();
    const getDate = document.getElementById("presentDate")  // Getting the element to display the present date
    const dateTextNode = document.createTextNode(today.toDateString()); // Creating a text node with the present date and appending it to the element
    getDate.appendChild(dateTextNode)
}

// Function to play the audio for the word of the day
function playWordOfTheDayAudio() {
    const audio = document.getElementById('wordOfTheDayAudio');
    audio.play();
}

// Function to play the audio for a specific word
function playWordAudio() {
    const audio = document.getElementById('audio');
    audio.play();
}

presentDate() // Display present date
getWODDetails() // Fetch details for the word of the day