const EleventyNavigationPlugin = require("@11ty/eleventy-navigation");
module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(EleventyNavigationPlugin);
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });
  // Favicon files live in src/ root — explicitly copy them to _site/ root
  eleventyConfig.addPassthroughCopy({ "src/favicon.svg": "favicon.svg" });
  eleventyConfig.addPassthroughCopy({ "src/favicon-32.png": "favicon-32.png" });
  eleventyConfig.addPassthroughCopy({ "src/apple-touch-icon.png": "apple-touch-icon.png" });
  eleventyConfig.addFilter("dateToISO", (date) => {
    return new Date(date).toISOString().split("T")[0];
  });
  eleventyConfig.addCollection("blogPosts", function(api) {
    return api.getFilteredByGlob("src/blog/**/*.njk")
      .filter(p => p.data.type === "post")
      .sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
  });
  eleventyConfig.addCollection("servicePages", function(api) {
    return api.getFilteredByGlob("src/software-testing-services/**/*.njk")
      .filter(p => p.data.type === "service");
  });
  eleventyConfig.addCollection("consultingPages", function(api) {
    return api.getFilteredByGlob("src/qa-consulting/**/*.njk")
      .filter(p => p.data.type === "consulting");
  });
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
