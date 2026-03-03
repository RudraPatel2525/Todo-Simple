// Name : Lab 6 - Note-Vote App
// Author : Rudra Patel
// StudentID : 200498392
// -------- MODEL --------
let  nextNoteId = 0;
const model = {
  users: ["User A", "User B", "User C"],
  currentUser: "User A",
  notes:[]
};

function score(note) {
  return note.upvoters.length - note.downvoters.length;
}
function hasUser(list, user) {
  for (let i = 0; i < list.length; i++) 
    if (list[i] === user) 
      {return true;}
  return false;
}
function removeUser(list, user) {
  for (let i = 0; i < list.length; i++) {
    if (list[i] === user) 
      { list.splice(i, 1); 
        return; }
  }
}


// -------- VIEW --------
function renderUserLabel() {
  $("#CurrentUserLabel").text(model.currentUser);
}

function renderNotes() {
  const $list = $("#notesList");
  $list.empty();

  model.notes.forEach((note) => {
    const mine = note.creator === model.currentUser;
    const votedUp = hasUser(note.upvoters, model.currentUser);
    const votedDown = hasUser(note.downvoters, model.currentUser);
    const voted = votedUp || votedDown;

    const $row = $(`
      <div class="todo-text d-flex align-items-center gap-2 mb-2 note" data-id="${note.id}">
        <input class="form-control form-control-sm" type="text" readonly />
      </div>
    `);

    $row.find("input").val(note.text);

    if (mine) {
      // Mine: always show score, no vote buttons
      $row.append(`<span class="badge text-bg-light ms-auto">${score(note)}</span>`);
    } else {
      // Not mine: show buttons, score only after vote
      const upClass = votedUp ? "btn-success" : "btn-light";
      const downClass = votedDown ? "btn-danger" : "btn-light";

      $row.append(`<button class="btn ${upClass} btn-sm vote-up" type="button">↑</button>`);
      $row.append(`<button class="btn ${downClass} btn-sm vote-down" type="button">↓</button>`);

      if (voted) {
        $row.append(`<span class="badge text-bg-light ms-1">${score(note)}</span>`);
      }
    }

    $list.append($row);
  });
}

// -------- CONTROLLER --------
function setUser(user) {
  model.currentUser = user;   // update MODEL
  renderUserLabel();          // update VIEW
  renderNotes();              // update VIEW
}

function addNote(){
  const text = $("#noteText").val().trim();
    if (!text) return;

    model.notes.push({
      id: nextNoteId++,
      creator: model.currentUser,
      text: text,
      upvoters: [],
      downvoters: []
    });

    $("#noteText").val("");
    renderNotes();
}

$(function () {
  renderUserLabel();
  renderNotes();

  // click handler
  $(".Users").on("click", function (e) {
    e.preventDefault();
    setUser($(this).data("user"));
  });

  $("#addNoteButton").on("click", function (e) {
    e.preventDefault();
    addNote();
  });

    // UPVOTE
    $(document).on("click", ".vote-up", function () {
    const id = Number($(this).closest(".note").data("id"));
    const note = model.notes.find(n => n.id === id);
    if (!note) 
      return;
    if (note.creator === model.currentUser) 
      return; // can't vote own note

    const u = model.currentUser;

    if (hasUser(note.upvoters, u)) {
        // clicking upvote again removes upvote
        removeUser(note.upvoters, u);
    } else {
        // switching from down -> up ,remove downvote if exists, then add upvote
        removeUser(note.downvoters, u);
        note.upvoters.push(u);
    }

    renderNotes();
    });

    // DOWNVOTE
    $(document).on("click", ".vote-down", function () {
    const id = Number($(this).closest(".note").data("id"));
    const note = model.notes.find(n => n.id === id);
    if (!note) 
      return;
    if (note.creator === model.currentUser) 
      return; // can't vote own note

    const u = model.currentUser;

    if (hasUser(note.downvoters, u)) {
        // clicking downvote again removes downvote
        removeUser(note.downvoters, u);
    } else {
        // switching from up -> down remove upvote if exists, then add downvote
        removeUser(note.upvoters, u);
        note.downvoters.push(u);
    }
    renderNotes();
    });

});