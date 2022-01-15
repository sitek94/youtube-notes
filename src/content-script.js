import easyMdeCss from "to-string-loader!css-loader!./styles.css";
import EasyMDE from "easymde";
import { getYoutubeVideoId } from "./get-youtube-video-id";

main();

async function main() {
  const content = await getContent();
  const secondary = content.querySelector("#secondary");

  const textareaId = "yt-notes-textarea";
  secondary.innerHTML = `
    <style>
      ${easyMdeCss}
    </style>
    <textarea id=${textareaId}></textarea>
  `;

  const textarea = secondary.querySelector("#" + textareaId);
  if (!textarea) {
    throw new Error("❌ Could not find textarea with #notes ID!");
  }

  const easyMDE = new EasyMDE({
    element: textarea,
    status: false,
    autosave: {
      enabled: false,
    },
    spellChecker: false,
    toolbar: false,
  });

  // Try to get old notes from the storage, and initialize the textarea with it
  const videoId = getVideoId();
  let oldNotes = await getNotes(videoId);
  if (oldNotes) {
    console.debug("✅ Old notes found, setting textarea value");
    easyMDE.value(oldNotes);
  } else {
    console.debug("📭 No old notes found");
  }

  // Save the notes, at most every two seconds
  easyMDE.codemirror.on("change", debounce(save, 2000));

  function save() {
    const newNotes = easyMDE.value();
    // Save the notes only if they are different from the old ones
    const notesHaveNotChanged = newNotes === oldNotes;
    if (notesHaveNotChanged) {
      return;
    }

    // Save and update in-memory old notes
    saveNotes(videoId, newNotes);
    oldNotes = newNotes;
  }
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
      console.debug("🥱 There are no notes for this video...");
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
    console.debug("🥳 Notes saved!");
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
  const videoId = getYoutubeVideoId(url);

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

/**
 * Extremely simple debounce
 */
function debounce(func, timeout) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
