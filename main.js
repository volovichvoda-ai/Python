document.addEventListener("DOMContentLoaded", () => {
  // Поиск и фильтрация функций
  const search = document.getElementById("functionSearch");
  const cards = [...document.querySelectorAll(".function-card")];
  const filters = [...document.querySelectorAll(".filter")];
  const count = document.getElementById("resultCount");
  const empty = document.getElementById("emptyState");
  let activeFilter = "all";

  function updateFunctions() {
    if (!search) return;
    const query = search.value.trim().toLowerCase();
    let visible = 0;
    cards.forEach(card => {
      const textMatch = card.dataset.search.toLowerCase().includes(query) ||
        card.querySelector("h3").textContent.toLowerCase().includes(query);
      const categoryMatch = activeFilter === "all" || card.dataset.category === activeFilter;
      const show = textMatch && categoryMatch;
      card.hidden = !show;
      if (show) visible++;
    });
    count.textContent = visible + " функций";
    empty.hidden = visible !== 0;
  }

  if (search) search.addEventListener("input", updateFunctions);
  filters.forEach(button => button.addEventListener("click", () => {
    filters.forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    activeFilter = button.dataset.filter;
    updateFunctions();
  }));

  // Копирование примеров кода
  document.querySelectorAll(".copy-btn").forEach(button => {
    button.addEventListener("click", async () => {
      const original = button.textContent;
      try {
        await navigator.clipboard.writeText(button.dataset.copy);
        button.textContent = "Скопировано ✓";
      } catch {
        button.textContent = "Не удалось скопировать";
      }
      setTimeout(() => button.textContent = original, 1500);
    });
  });

  // Интерактивный тест
  const questions = [
    {q:"Какая функция выводит текст на экран?",a:["input()","print()","type()","len()"],correct:1,why:"print() выводит значения на экран."},
    {q:"Что возвращает len(\"Python\")?",a:["5","6","7","Python"],correct:1,why:"В слове Python шесть символов."},
    {q:"Какая функция преобразует значение в целое число?",a:["str()","float()","int()","type()"],correct:2,why:"int() преобразует совместимое значение в целое число."},
    {q:"Как узнать тип значения?",a:["type()","kind()","value()","info()"],correct:0,why:"type() возвращает тип объекта."},
    {q:"Что вернёт sum([2, 3, 5])?",a:["235","8","10","5"],correct:2,why:"Функция sum() складывает элементы: 2 + 3 + 5 = 10."},
    {q:"Какая функция возвращает наибольшее значение?",a:["min()","max()","abs()","round()"],correct:1,why:"max() находит максимальное значение."}
  ];
  const question = document.getElementById("question");
  const answers = document.getElementById("answers");
  const progressText = document.getElementById("progressText");
  const progressBar = document.getElementById("progressBar");
  const feedback = document.getElementById("feedback");
  const nextBtn = document.getElementById("nextBtn");
  const questionArea = document.getElementById("questionArea");
  const resultArea = document.getElementById("resultArea");
  const scoreText = document.getElementById("scoreText");
  const restartBtn = document.getElementById("restartBtn");
  let current = 0, score = 0, answered = false;

  function renderQuestion() {
    if (!question) return;
    answered = false;
    const item = questions[current];
    question.textContent = item.q;
    progressText.textContent = `ВОПРОС ${current + 1} ИЗ ${questions.length}`;
    progressBar.style.width = `${(current / questions.length) * 100}%`;
    feedback.textContent = "";
    nextBtn.disabled = true;
    answers.innerHTML = "";
    item.a.forEach((answer, index) => {
      const button = document.createElement("button");
      button.className = "answer";
      button.textContent = answer;
      button.addEventListener("click", () => chooseAnswer(index));
      answers.appendChild(button);
    });
  }

  function chooseAnswer(index) {
    if (answered) return;
    answered = true;
    const item = questions[current];
    const buttons = [...answers.querySelectorAll("button")];
    buttons.forEach((button, i) => {
      button.disabled = true;
      if (i === item.correct) button.classList.add("correct");
      else if (i === index) button.classList.add("wrong");
    });
    if (index === item.correct) {
      score++;
      feedback.textContent = "Верно! " + item.why;
    } else {
      feedback.textContent = "Пока неверно. " + item.why;
    }
    nextBtn.disabled = false;
    nextBtn.textContent = current === questions.length - 1 ? "Посмотреть результат" : "Следующий вопрос →";
    progressBar.style.width = `${((current + 1) / questions.length) * 100}%`;
  }

  if (nextBtn) nextBtn.addEventListener("click", () => {
    if (!answered) return;
    current++;
    if (current < questions.length) renderQuestion();
    else {
      questionArea.hidden = true;
      resultArea.hidden = false;
      scoreText.textContent = `Твой результат: ${score} из ${questions.length}. ${score === questions.length ? "Идеально! Все ответы правильные." : "Продолжай практиковаться — у тебя всё получится!"}`;
      progressText.textContent = "ТЕСТ ЗАВЕРШЁН";
      progressBar.style.width = "100%";
    }
  });
  if (restartBtn) restartBtn.addEventListener("click", () => {
    current = 0; score = 0;
    questionArea.hidden = false;
    resultArea.hidden = true;
    nextBtn.textContent = "Следующий вопрос →";
    renderQuestion();
  });
  renderQuestion();
});