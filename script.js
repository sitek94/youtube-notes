const DEBUG = false;

console.log = function (...args) {
  if (DEBUG) {
    console.log(...args);
  }
};

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

  const textarea = secondary.querySelector("#notes");

  // Try to get old notes from the storage, and initialize the textarea with it
  const videoId = getVideoId();
  const oldNotes = await getNotes(videoId);
  if (oldNotes) {
    console.log("✅ Old notes found, setting textarea value");
    textarea.value = oldNotes;
  } else {
    console.log("❌ No old notes found");
  }

  const saveBtn = secondary.querySelector("#save");

  saveBtn.addEventListener("click", () => {
    const videoId = getVideoId();
    const notes = textarea.value;

    saveNotes(videoId, notes);
  });
}

/**
 * Get notes from the storage by the video ID
 */
async function getNotes(videoId) {
  try {
    const result = await chrome.storage.sync.get([videoId]);

    return result[videoId];
  } catch (error) {
    if (/Error in invocation of storage\.get/.test(error.message)) {
      console.log("🥱 There are no notes for this video...");
      return null;
    } else {
      console.error("💣 Something went wrong when getting the notes!");
      console.error(error);
    }
  }
}

/**
 * Save notes in the storage
 */
async function saveNotes(videoId, notes) {
  try {
    await chrome.storage.sync.set({ [videoId]: notes });
    console.log("🥳 Notes saved!");
  } catch (error) {
    console.error("💣 Something went wrong when saving the notes!");
    console.error(error);
  }
}

/**
 * Get YouTube video ID from URL
 */
function getVideoId() {
  const url = window.location.href;
  const videoId = url.split("=")[1];

  return videoId;
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
