const cheerio = require("cheerio");
const TAGS = ["h1", "h2", "h3", "h4", "h5", "h6"];

function buildTOC(content) {
  const $ = cheerio.load(content);
  const tags = $(TAGS.join(", "));
  
  if (tags.length === 0) {
    return "";
  }
  
  let toc = `
    <details>
      <summary>Table of contents</summary>
      <ul>
  `;
  let parentLevels = [-1];
  tags.each((_, element) => {
    const level = TAGS.indexOf(element.name);
    const headingText = element.children?.[0]?.data;
    const id = element.attribs.id;
    let lastLevel = parentLevels[parentLevels.length - 1];

    if (level === lastLevel) {
      toc += `<li><a href="#${id}">${headingText}</a></li>`;
    } if (level > lastLevel) {
      toc += `<ul><li><a href="#${id}">${headingText}</a></li>`;
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
      toc += `<li><a href="#${id}">${headingText}</a></li>`;
    }
  });
  toc += new Array(parentLevels.length).fill("</ul>").join("");
  toc += "</details>"

  return toc;
}

module.exports = {
  buildTOC
}