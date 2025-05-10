function reload() {
  $.ajax({
    method: "get",
    url: "/data",
    success: function (data) {
      // console.log(data);
      $("tbody").empty();
      data.forEach(function (val, idx) {
        $("tbody").append(`
          <tr>
              <td>${idx + 1}</td>
              <td>${val.firstName}</td>
              <td>${val.lastName}</td>
              <td>${val.email}</td>
              <td>
                <button data-uid="${
                  val._id
                }" class="btn btn-warning">Edit</button>
              </td>
              <td>
                <button data-uid="${
                  val._id
                }" class="btn btn-danger">Delete</button>
              </td>
            </tr>
          `);
      });
    },
    error: function (err) {
      console.log("Error ", err);
    },
  });
}
function addHandler() {
  if ($("#fname").val() && $("#lname").val() && $("#email").val()) {
    let newhero = {
      firstName: $("#fname").val(),
      lastName: $("#lname").val(),
      email: $("#email").val(),
    };
    // console.log(newhero);
    $.ajax({
      url: "/data",
      method: "POST",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(newhero),
      success: function (res) {
        reload();
        console.log(res);
        $("#fname").val("");
        $("#lname").val("");
        $("#email").val("");
      },
      error: function (error) {
        console.log("Error", error);
      },
    });
  }
}
//-------------------------------
function updateHandler() {
  let updatedhero = {
    id: $("#hero_id").val(),
    firstName: $("#e_fname").val(),
    lastName: $("#e_lname").val(),
    email: $("#e_email").val(),
  };
  $.ajax({
    url: "/update/" + updatedhero.id,
    method: "PUT",
    dataType: "json",
    contentType: "application/json",
    data: JSON.stringify(updatedhero),
    success: function (res) {
      reload();
      console.log(res);
      $("#hero_id").val("");
      $("#e_fname").val("");
      $("#e_lname").val("");
      $("#e_email").val("");
      $("#editbox").hide(500);
      $("#addbox").show(500);
    },
    error: function (error) {
      console.log("Error", error);
    },
  });
}
//-------------------------------
$(function () {
  reload();
  $("#addbtn").on("click", addHandler);
  // delete button logic
  $("tbody").on("click", ".btn.btn-danger", function (evt) {
    // alert(evt.target.getAttribute("data-uid"));
    $.ajax({
      method: "DELETE",
      url: "/edit/" + evt.target.getAttribute("data-uid"),
      success: function (res) {
        console.log(res);
        reload();
      },
      error: function () {},
    });
  });

  // edit button logic

  $("tbody").on("click", ".btn.btn-warning", function (evt) {
    let edithero = {
      firstName: $("#e_fname").val(),
      lastName: $("#e_lname").val(),
      email: $("#e_email").val(),
    };
    $.ajax({
      method: "PUT",
      url: "/edit/" + evt.target.getAttribute("data-uid"),
      success: function (res) {
        // console.log(res);
        $("#e_fname").val(res.firstName);
        $("#e_lname").val(res.lastName);
        $("#e_email").val(res.email);
        $("#hero_id").val(res._id);
        $("#editbox").show(500);
        $("#addbox").hide(500);
      },
      error: function () {},
    });
  });
  // code for update button
  $("#editbtn").on("click", updateHandler);
  $("#editbox").hide();
});
