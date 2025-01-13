fetch('/home_recomondation/pages/navbar.html')
.then(response => response.text())
.then(data => {
    document.getElementById('navbar').innerHTML = data;
})
.catch(error => console.error('Error loading navbar:', error));

var questions = document.querySelectorAll(".question");
questions.forEach(function (question) {
    question.addEventListener("click", function () {
        var parent = question.parentElement;
        parent.classList.toggle("active");
        var answer = question.nextElementSibling;
        if (answer.style.display === "block") {
            answer.style.display = "none";
        } else {
            answer.style.display = "block";
        }
    });
});

