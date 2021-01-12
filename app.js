// store questions and answer in an object array
const quizData = [
    {
        q: 'How many soccer players should each team have on the field at the start of each match?',
        a: '11',
        b: '10',
        c: '8',
        d: '12',
        answer: 'a',
    },
    {
        q: 'When Michael Jordan played for the Chicago Bulls, how many NBA Championships did he win?',
        a: 'Five',
        b: 'Six',
        c: 'Four',
        d: 'Seven',
        answer: 'b',
    },
    {
        q: 'In what year was the first-ever Wimbledon Championship held?',
        a: '1875',
        b: '1876',
        c: '1877',
        d: '1878',
        answer: 'c',
    },
    {
        q: 'What country won the first FIFA World Cup in 1930?',
        a: 'Brazil',
        b: 'France',
        c: 'Belguim',
        d: 'Uruguay',
        answer: 'd',
    },
]

// initialize index will be used in object array
let index = 0;

// initialize user score
let score = 0;

// get answers element
const answers = document.querySelectorAll('.answers');


// start quiz function
const startQuiz = () => {

    // get question and option elements
    const q = document.getElementById('question');
    const aText = document.getElementById('a-text');
    const bText = document.getElementById('b-text');
    const cText = document.getElementById('c-text');
    const dText = document.getElementById('d-text');
    
    // change text content based on first object in array
    q.textContent = quizData[index].q;
    aText.textContent = quizData[index].a;
    bText.textContent = quizData[index].b;
    cText.textContent = quizData[index].c;
    dText.textContent = quizData[index].d;

}

// store answer function
const storeAnswer = (answer) => {

    // check if answer is the same as quizData answer
    if (answer === quizData[index].answer) {

        // increase score
        score++;
    }
};


// clear radio button selection function
const clearRadio = () => {
    answers.forEach ( (answer) => {
        answer.checked = false;
    })
};

// end quiz function
const endQuiz = () => {

    // get questions element
    const questions = document.querySelector('.questions');


    // change content and style of questions element
    questions.innerHTML = `
                            <div class="questions">
                                <div class="question-header">
                                    <h2 id="question">You score ${score} out of ${quizData.length}</h2>
                                </div>
                                <div id="submit">
                                    <button id="retry">Retry</button>
                                </div>
                            </div>`
    questions.style.textAlign = 'center';

    // add click event to retry button to reload page
    document.getElementById('retry')
        .addEventListener('click', () => {
            location.reload();
        })
};

// add click event on submit button
document.querySelector('button')
    .addEventListener('click', () => {

        // for each answer 
        answers.forEach( (answer) => {

            // check if one of the answer is checked
            if(answer.checked) {

                // store the answer
                storeAnswer(answer.id);

                // if index is less than quizData length
                if (index < quizData.length - 1) {
                    
                    // increase index
                    index++;

                    // call startQuiz function
                    startQuiz();

                    // call clearRadio function
                    clearRadio();
                } else {
                    // call endQuiz function
                    endQuiz();
                }
            }
        })
    })

// call startQuiz function
startQuiz();

// toggle about modal function
const toggleAbout = () => {
    document.querySelector('.modal-container')
            .classList.toggle('active');
}

// add click event to about
document.getElementById('about')
    .addEventListener('click', toggleAbout);

// add click event to X
document.getElementById('close')
    .addEventListener('click', toggleAbout);