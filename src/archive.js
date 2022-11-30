import $ from "jquery";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { serverAddress } from "./constants";
import { urlLocationHandler } from "./router";

const initArchive = (key) => {

  let route = "/user/get/root/sub-files"
  let body = JSON.stringify({})

  if(history.state.fid != null && history.state.title != null){
    route = "/user/get/sub-files"
    body = JSON.stringify({"id": history.state.fid, "name": history.state.title})
  }

  fetch(serverAddress + route, {
    method: "POST",
    body: body,
    headers: {
      "Content-Type": "application/json",
      token: key.token,
    },
  })
    .then((response) => {
      return response.status == 200 ? response.json() : null;
    })
    .then((files) => {
      $("#create-document").on("click", () => {
        window.history.pushState({}, "", "/create-document");
        urlLocationHandler();
      });

      if (files != null) {
        for (const file of files) {
          console.log(file);

          // we check if the given file is document or directory
          if (isDocument(file)) {
            $("#content").append(documentHtml(file));

            // we add listeners for each button dynamically
            $(`#edit-${file.id}`).on("click", async () => {
              window.history.pushState({ token: key.token ,id: file.docId, title: file.name }, "", `/edit`);
              urlLocationHandler();
            });
          } else {
            $("#content").append(directoryHtml(file));
            // we add listeners for each button dynamically
            $(`#open-${file.id}`).on("click", async () => {
              window.history.pushState({fid: file.id, title: file.name}, "", `/archive`);
              urlLocationHandler();
            });
          }

          // we add listeners for each button dynamically
          $(`#move-${file.id}`).on("click", async () => {
            window.history.pushState({}, "", `/edit`);
            urlLocationHandler();
          });

          $(`#delete-${file.id}`).on("click", async () => {
            // delete document
          });
        }
      }
    });
};

const isDocument = (file) => {
  return file.docId != null ? true : false;
};

const documentHtml = (file) => {
  return `<div data-id="${file.id}" data-fid="${file.fatherId}" class="col-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-file-earmark-word-fill" viewBox="0 0 16 16">
              <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM5.485 6.879l1.036 4.144.997-3.655a.5.5 0 0 1 .964 0l.997 3.655 1.036-4.144a.5.5 0 0 1 .97.242l-1.5 6a.5.5 0 0 1-.967.01L8 9.402l-1.018 3.73a.5.5 0 0 1-.967-.01l-1.5-6a.5.5 0 1 1 .97-.242z"/>
            </svg>
            <b>Title</b>: ${file.name} </br>
            <button id="edit-${file.id}" class="btn btn-success"> Edit </button>
            <button id="move-${file.id}" class="btn btn-primary"> Move </button>
            <button id="delete-${file.id}" class="btn btn-danger"> Delete </button>
        </div>`;
};

const directoryHtml = (file) => {
  return `<div data-id="${file.id}" data-fid="${file.fatherId}" class="col-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-folder" viewBox="0 0 16 16">
              <path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4H2.19zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707z"/>
            </svg>
            <b>Title</b>: ${file.name} </br>
            <button id="open-${file.id}" class="btn btn-success"> Open </button>
            <button id="move-${file.id}" class="btn btn-primary"> Move </button>
            <button id="delete-${file.id}" class="btn btn-danger"> Delete </button>
        </div>`;
};

export { initArchive };
