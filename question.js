
const quizData = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyperlinks and Text Markup Language",
            "Home Tool Markup Language"
        ],
        answer: 0
    },
    {
        question: "Which language is used for styling web pages?",
        options: ["HTML", "JQuery", "CSS", "XML"],
        answer: 2
    },
    {
        question: "Which is not a JavaScript framework?",
        options: ["React", "Angular", "Vue", "Django"],
        answer: 3
    }
];


// Shuffle questions randomly
quizData.sort(() => Math.random() - 0.5);
