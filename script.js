let habits = JSON.parse(localStorage.getItem("habits")) || [];

function saveHabits() {
  localStorage.setItem("habits", JSON.stringify(habits));
}

function addHabit() {
  let input = document.getElementById("habitInput");
  let habitName = input.value.trim();

  if (habitName === "") {
    alert("Please enter a habit");
    return;
  }

  habits.push({
    name: habitName,
    completed: false
  });

  input.value = "";
  saveHabits();
  displayHabits();
}

function quickAdd(name) {
  habits.push({
    name: name,
    completed: false
  });

  saveHabits();
  displayHabits();
}

function toggleHabit(index) {
  habits[index].completed = !habits[index].completed;
  saveHabits();
  displayHabits();
}

function deleteHabit(index) {
  habits.splice(index, 1);
  saveHabits();
  displayHabits();
}

function displayHabits() {
  let habitList = document.getElementById("habitList");
  habitList.innerHTML = "";

  habits.forEach((habit, index) => {
    let li = document.createElement("li");

    if (habit.completed) {
      li.classList.add("completed");
    }

    li.innerHTML = `
      <span>${habit.name}</span>
      <div class="actions">
        <button class="done" onclick="toggleHabit(${index})">Done</button>
        <button class="delete" onclick="deleteHabit(${index})">Delete</button>
      </div>
    `;

    habitList.appendChild(li);
  });

  updateProgress();
}

function updateProgress() {
  let total = habits.length;
  let completed = habits.filter(habit => habit.completed).length;

  let percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  document.getElementById("progressBar").style.width = percentage + "%";
  document.getElementById("progressText").innerText = percentage + "% Completed";
}

displayHabits();