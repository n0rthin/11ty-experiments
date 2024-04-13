const markdownIt = require("markdown-it");

module.exports = function (eleventyConfig) {
  const md = markdownIt();
  md.renderer.rules.image = function (tokens, idx, options, env, self) {
    const token = tokens[idx];
    const imgSrc = token.attrGet('src');
    const imgAlt = token.content;
    const imgTitle = token.attrGet('title');

    return `<img src="${imgSrc}" alt="${imgAlt}" title="${imgTitle}" width="100%" height="auto" />`;
  }

  eleventyConfig.setLibrary("md", md);
  eleventyConfig.addPassthroughCopy("content/assets");

  return {
    dir: {
      input: "content",
      output: "_site"
    },
  };
};
