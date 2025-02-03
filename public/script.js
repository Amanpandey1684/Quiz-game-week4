document.addEventListener('DOMContentLoaded', () => {
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const submitBtn = document.getElementById('submit-btn');
    const nextBtn = document.getElementById('next-btn');
    const scoreDisplay = document.getElementById('score');
    const resultContainer = document.getElementById('result-container');
    const finalScoreDisplay = document.getElementById('final-score');

    let currentQuestionIndex = 0;
    let score = 0;
    let questions = [];

    // Fetch questions from JSON file
    async function fetchQuestions() {
        try {
            const response = await fetch('questions.json');
            questions = await response.json();
            loadQuestion();
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    }

    function loadQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionText.textContent = currentQuestion.question;

        optionsContainer.innerHTML = '';
        currentQuestion.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.classList.add('option');
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => selectOption(optionElement));
            optionsContainer.appendChild(optionElement);
        });

        submitBtn.disabled = true;
        nextBtn.disabled = true;
    }

    function selectOption(selectedOption) {
        const options = document.querySelectorAll('.option');
        options.forEach(opt => opt.classList.remove('selected'));
        selectedOption.classList.add('selected');
        submitBtn.disabled = false;
    }

    submitBtn.addEventListener('click', () => {
        const selectedOption = document.querySelector('.option.selected');
        if (!selectedOption) return;

        const currentQuestion = questions[currentQuestionIndex];
        if (selectedOption.textContent === currentQuestion.correctAnswer) {
            score++;
            scoreDisplay.textContent = score;
        }

        submitBtn.disabled = true;
        nextBtn.disabled = false;
    });

    nextBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            endQuiz();
        }
    });

    function endQuiz() {
        document.getElementById('quiz-content').classList.add('hidden');
        resultContainer.classList.remove('hidden');
        finalScoreDisplay.textContent = `${score}/${questions.length}`;
    }

    fetchQuestions();
});