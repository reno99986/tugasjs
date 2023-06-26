// mengambil data dari local storage (jika ada)
var todoItems = JSON.parse(localStorage.getItem("todoItems")) || [];
var doneItems = JSON.parse(localStorage.getItem("doneItems")) || [];

// memuat daftar task yang akan dilakukan dan sudah dilakukan saat memulai aplikasi
loadTasks();

// fungsi untuk menambahkan task baru
function addlist() {
  var taskInput = document.getElementById("Todo");
  var taskTgl = document.getElementById("tanggal");
  var taskText = taskInput.value.trim();
  var taskDate = taskTgl.value.trim();
  if ((taskText !== "") & (taskDate !== "")) {
    var task = {
      text: taskText,
      date: taskDate,
    };
    todoItems.push(task);
    saveTasks();
    taskInput.value = "";
    loadTasks();
  } else {
    alert("Tanggal dan Kolom Teks Tidak Boleh Kosong!");
  }
}

// Fungsi untuk menyelesaikan suatu task
function completeTask(index) {
  var task = todoItems.splice(index, 1)[0];
  doneItems.push(task);
  saveTasks();
  loadTasks();
}

// Fungsi untuk mengembalikan task yang sudah selesai ke daftar "Yang akan dilakukan"
function restoreTask(index) {
  var task = doneItems.splice(index, 1)[0];
  todoItems.push(task);
  saveTasks();
  loadTasks();
}

// Fungsi untuk menghapus task yang sudah selesai
function deleteTask(index) {
  doneItems.splice(index, 1);
  saveTasks();
  loadTasks();
}

// Fungsi untuk memuat ulang daftar task
function loadTasks() {
  var todoList = document.getElementById("listbelum");
  var doneList = document.getElementById("listsudah");

  // Mengosongkan daftar task sebelum memuat yang baru
  todoList.innerHTML = "";
  doneList.innerHTML = "";

  // Memuat task yang akan dilakukan
  for (var i = 0; i < todoItems.length; i++) {
    var task = todoItems[i];
    var listItem = createTaskListItem(task.text, task.date, i, false);
    todoList.appendChild(listItem);
  }

  // Memuat task yang sudah dilakukan
  for (var j = 0; j < doneItems.length; j++) {
    var doneTask = doneItems[j];
    var doneListItem = createTaskListItem(
      doneTask.text,
      doneTask.date,
      j,
      true
    );
    doneList.appendChild(doneListItem);
  }
}

// Fungsi untuk membuat elemen daftar task
function createTaskListItem(text, date, index, isDone) {
  var listItem = document.createElement("li");
  var checkbox = document.createElement("input");
  listItem.id = "text1";
  checkbox.type = "checkbox";
  checkbox.id = "centang";
  checkbox.checked = isDone;
  checkbox.addEventListener("change", function () {
    if (this.checked) {
      completeTask(index);
    } else {
      restoreTask(index);
    }
  });

  var taskText = document.createElement("span");
  taskText.textContent = text + " (" + date + ")";
  if (isDone) {
    taskText.classList.add("done");
  }
  listItem.appendChild(taskText);
  listItem.appendChild(checkbox);

  if (isDone) {
    var deleteButton = document.createElement("button");
    deleteButton.id = "hapusbtn";
    deleteButton.textContent = "Hapus";
    deleteButton.addEventListener("click", function () {
      deleteTask(index);
    });
    listItem.appendChild(deleteButton);
  }

  return listItem;
}

// Fungsi untuk menyimpan data ke local storage
function saveTasks() {
  localStorage.setItem("todoItems", JSON.stringify(todoItems));
  localStorage.setItem("doneItems", JSON.stringify(doneItems));
}
