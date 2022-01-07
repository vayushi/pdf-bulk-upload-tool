var msgElement = document.getElementById("msg");

var loadingButtonUpload = document.getElementById("loading_upload");
var uploadBtn = document.getElementById("submit_upload_btn");

var folder_path_btn = document.getElementById("folder_path_btn");
var folder_path_val = document.getElementById("folder_path_val");
var folder_path_error = document.getElementById("folder_path_error");

var file_path_btn = document.getElementById("file_path_btn");
var file_path_val = document.getElementById("file_path_val");
var file_path_error = document.getElementById("file_path_error");

var folder_path = "";
var file_path = "";

// to get the folder path of pdf folder through python tkinter
folder_path_btn.addEventListener("click", async function () {
  folder_path = await eel.get_folder_path()();
  folder_path_val.innerText = folder_path;
  folder_path_error.innerHTML = "";
});

// to get the file path of excel file through python tkinter
file_path_btn.addEventListener("click", async function () {
  file_path = await eel.get_file_path()();
  file_path_val.innerText = file_path;
  file_path_error.innerHTML = "";
});

function getCurrStatus(status) {
  var p = document.createElement("span");
  p.innerHTML = status + "<br>";
  p.style.color = "grey";
  msgElement.append(p);
}
eel.expose(getCurrStatus, "get_curr_status");

// uploading code
uploadBtn.addEventListener("click", function generateData(e) {
  e.preventDefault();
  msgElement.innerText = "";
  if (folder_path && file_path) {
    eel.start_driver_upload(file_path, folder_path)(viewMessage);
    loadingButtonUpload.style.display = "block";
    uploadBtn.style.display = "none";
  } else {
    folder_path_error.innerHTML = "Cannot be empty";
    file_path_error.innerHTML = "Cannot be empty";
  }
});

function viewMessage(msg) {
  var p = document.createElement("span");
  p.innerHTML = msg[0] + "<br>";
  p.style.color = msg[1];
  msgElement.append(p);
  folder_path_val.innerText = "";
  loadingButtonUpload.style.display = "none";
  uploadBtn.style.display = "block";
}
