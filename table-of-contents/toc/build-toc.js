const cheerio = require("cheerio");
const TAGS = ["h1", "h2", "h3", "h4", "h5", "h6"];

/**
 * @param {string} content - HTML content of the page to build the table of contents from
 * @returns {string} HTML of the table of contents
 */
function buildTOC(content) {
  const $ = cheerio.load(content);
  const headings = $(TAGS.join(", "));
  
  if (headings.length === 0) {
    return "";
  }
  
  let toc = `
    <details>
      <summary>Table of contents</summary>
      <ul>
  `;
  let parentLevels = [-1];
  headings.each((_, heading) => {
    const level = TAGS.indexOf(heading.name);
    const headingText = heading.children?.[0]?.data;
    const id = heading.attribs.id;
    const link = `<li><a href="#${id}">${headingText}</a></li>`;
    let lastLevel = parentLevels[parentLevels.length - 1];

    if (level === lastLevel) {
      toc += link;
    } else if (level > lastLevel) {
      toc += `<ul>${link}`;
      parentLevels.push(level);
    } else if (level < lastLevel) {
      while (level < lastLevel) {
        toc += "</ul>";
        parentLevels.pop();
        lastLevel = parentLevels[parentLevels.length - 1];
      }

      if (level > lastLevel) {
        toc += `<ul>`;
        parentLevels.push(level);
      }

      toc += link;
    }
  });
  toc += new Array(parentLevels.length).fill("</ul>").join("");
  toc += "</details>"

  return toc;
}

module.exports = {
  buildTOC
}