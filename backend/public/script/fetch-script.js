function reload() {
  fetch("/data")
    .then((raw) => {
      return raw.json();
    })
    .then((dbdata) => {
      dbdata.forEach((val, idx) => {
        document.getElementsByTagName("tbody")[0].innerHTML += `
            <tr>
              <td>${idx + 1}</td>
              <td>${val.firstName}</td>
              <td>${val.lastName}</td>
              <td>${val.email}</td>
              <td>
                <button class="btn btn-warning">Edit</button>
              </td>
              <td>
                <button class="btn btn-danger">Delete</button>
              </td>
            </tr>
            `;
      });
    });
}

async function sendData() {
  let newhero = {
    firstName: document.getElementById("fname").value,
    lastName: document.getElementById("lname").value,
    email: document.getElementById("email").value,
  };
  await fetch("/data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newhero),
  });
}
function addHandler() {
  sendData();
  reload();
}

function deleteHandler() {
  // delete code
}
function editHandler() {
  // edit code
}

function init() {
  reload();
  document.getElementById("addbtn").addEventListener("click", addHandler);
  document
    .getElementsByTagName("tbody")[0]
    .addEventListener("click", deleteHandler);
}
document.addEventListener("DOMContentLoaded", init);
