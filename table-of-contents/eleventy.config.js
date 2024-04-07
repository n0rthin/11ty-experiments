const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const { buildTOC } = require("./toc/build-toc");

module.exports = function (eleventyConfig) {
  eleventyConfig.setLibrary(
    "md",
    markdownIt().use(markdownItAnchor)
  )
  
  eleventyConfig.addFilter("toc", (content) => {
    return buildTOC(content)
  });
  
  return {
    dir: {
      input: "content",
      output: "_site"
    },
  };
};
