const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

module.exports = function (eleventyConfig) {
  const md = markdownIt().use(markdownItAnchor);
  md.renderer.rules.image = function (tokens, idx) {
    const token = tokens[idx];
    const imgSrc = token.attrGet('src');
    const imgAlt = token.content;
    const imgTitle = token.attrGet('title');

    return `<figure>
      <img src="${imgSrc}" alt="${imgAlt}" title="${imgTitle}" width="100%" height="auto" />
    </figure>`;
  }

  eleventyConfig.setLibrary("md", md);

  eleventyConfig.addPassthroughCopy("content/assets");
  eleventyConfig.addPassthroughCopy("content/assets");

  eleventyConfig.addFilter("date", function (date) {
    return date.toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' });
  });

  eleventyConfig.addGlobalData("blog_name", "Jamie Solo");
  eleventyConfig.addGlobalData("copyright", "Jamie Solo");
  eleventyConfig.addGlobalData("author_name", "Jamie Solo");
  eleventyConfig.addGlobalData("author_profile_picture", "/assets/built/imgs/photo-1607031542107-f6f46b5d54e9.jpg");
  eleventyConfig.addGlobalData("home_page_image", "/assets/built/imgs/photo-1607031542107-f6f46b5d54e9.jpeg")
  eleventyConfig.addGlobalData("current_year", new Date().getFullYear())
  eleventyConfig.addGlobalData("top_menu", [
    { text: "Home", url: "/" },
    { text: "About", url: "/about" },
    { text: "Style guide", url: "/style-guide" },
    { text: "Author", url: "/author" },
    { text: "Collection", url: "/collection" },
  ]);

  eleventyConfig.addGlobalData("footer_menu", [
    { text: "Data & Privacy", url: "/" },
    { text: "Contact", url: "/" },
  ]);

  return {
    dir: {
      input: "content",
      output: "_site"
    },
  };
};
