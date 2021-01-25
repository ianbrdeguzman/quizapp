// Data taken from Open Triva Database API
// https://opentdb.com/api_config.php

// initialize global variables
let index = 0;
let score = 0;
const dataArray = [];

// fetch data from Open Triva Database API
const getData = async () => {
    const response = await fetch('https://opentdb.com/api.php?amount=10&type=multiple');
    const data = await response.json();

    createDataArray(data.results);
}

// call getData
getData();

// create array from fetched Data
const createDataArray= (data) => {

    // loop every key in data
	for (let key in data) {
	    const q = data[key].question;
	    const ca = data[key].correct_answer;
	    const ia = data[key].incorrect_answers;

        // push object with question and correct answer to dataArray
	    dataArray.push( {q: q, o: [ca], a: ca} );

        // push incorrect answers to dataArray
	    ia.forEach( (item) => {
            dataArray[key].o.push(item);
        });

        // shuffle answers in dataArray
        shuffleArray(dataArray[key].o);
    }
};

// Fisher-Yates (aka Knuth) Shuffle Algorithm
const shuffleArray = (array) => {
    
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
};

// startQuiz function
const startQuiz = () => {

    // assign html dom elements
    const q = document.getElementById('question');
    const a = document.getElementById('a-text');
    const b = document.getElementById('b-text');
    const c = document.getElementById('c-text');
    const d = document.getElementById('d-text');

    // new question
	const item = `
    			<div>
        		    <h2 id="question">${dataArray[index].q}</h2>
    			</div>
        		<ul>
            		<li>
                		<input type="radio" name="radio" id="a" class="answers">
                		<label for="a" id="a-text">${dataArray[index].o[0]}</label>
            		</li>
            		<li>
                		<input type="radio" name="radio" id="b" class="answers">
                		<label for="b" id="b-text">${dataArray[index].o[1]}</label>
            		</li>
            		<li>
                		<input type="radio" name="radio" id="c" class="answers">
                		<label for="c" id="c-text">${dataArray[index].o[2]}</label>
            		</li>
            		<li>
                		<input type="radio" name="radio" id="d" class="answers">
                		<label for="d" id="d-text">${dataArray[index].o[3]}</label>
            		</li>
        		</ul>
    			<div>
        		    <button id="submit">Submit</button>
                </div>
                `
    // insert item to question container
    document.querySelector('.question-container')
        .innerHTML = item;
};

// checkAnswer function
const checkAnswer = (answer) => {

	const ans = answer.nextElementSibling.textContent;

    // check if answer is same as dataArray answer
	if (ans === dataArray[index].a) {
        
        // increase score
		score++;
    };
    
    // increase index for next dataArray question
	index++;
};

// endQuiz function
const endQuiz = () => {

    // clear question container
    const container = document.querySelector('.question-container');
    container.innerHTML = '';
    
    // insert new html div
    container.innerHTML = `
        			<div id="result">
            			<h2>You score <span>${score}</span> out of ${dataArray.length}</h2>
        			</div>
        			<div>
            			<button id="retry">Retry</button>
                    </div>
                    `
    
    // add click event to retry button to reload page
    document.getElementById('retry')
        .addEventListener('click', () => {
            location.reload();
        });
};

// add event linstener to submit button
document.addEventListener('click', (e) => {

    const answers = document.querySelectorAll('.answers');

    // check if button id is submit
    if (e.target.id === 'submit') {

        // loop each answer 
        answers.forEach( (answer) => {

            // check if answer is not empty
            if(answer.checked) {

                // check if index is less than dataArray
                if (index < dataArray.length - 1) {

                    // call checkAnswer function
                    checkAnswer(answer);
                    
                    // call startQuiz for next question
                    startQuiz();
                } else {

                    // end quiz if index is greater than dataArray
			        endQuiz();
                }
            }
        })
    }
})

// add event listener to start button to start quiz
document.getElementById('start')
    .addEventListener('click', () => {
        document.querySelector('.about')
            .classList.toggle('start');
        	startQuiz();
    });