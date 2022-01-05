main();

async function main() {
  const content = await getContent();
  const secondary = content.querySelector("#secondary");

  secondary.innerHTML = `
    <div class="yt-notes">
      <textarea id="notes"></textarea>
     </div>
  `;
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
