main();

async function main() {
  const content = await getContent();
  const secondary = content.querySelector("#secondary");

  secondary.innerHTML = `
    <div class="yt-notes">
      <textarea id="notes"></textarea>
      <button id="save">Save</button>
     </div>
  `;

  const videoId = getVideoId();
  const oldNotes = await getNotes(videoId);
  console.log("Do we have some old notes?");
  console.log({ oldNotes });
  if (oldNotes) {
    document.querySelector("#notes").value = oldNotes;
  }

  const saveBtn = secondary.querySelector("#save");

  saveBtn.addEventListener("click", () => {
    console.log("Clicked save button");
    const notes = secondary.querySelector("#notes").value;
    console.log("Notes from textarea:");
    console.log({ notes });
    saveNotes(notes);
  });
}

// Get text from textarea
async function getNotes(videoId) {
  try {
    const result = await chrome.storage.sync.get([videoId]);
    return result[videoId];
  } catch {
    console.log("Probably no results");
    return null;
  }
}

function getVideoId() {
  const url = window.location.href;
  const videoId = url.split("=")[1];

  return videoId;
}

function saveNotes() {
  const notes = getNotes();
  const videoId = getVideoId();

  console.log("Saving notes:", notes);
  console.log("Video ID:", videoId);

  chrome.storage.sync.set({ [videoId]: notes });
}

/**
 * When YouTube loads, the div with content is not immediately available.
 * Try to get it every 500ms until it is available.
 */
function getContent() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const content = document.querySelector("#columns");
      if (!content) {
        resolve(getContent());
      } else {
        resolve(content);
      }
    }, 500);
  });
}
