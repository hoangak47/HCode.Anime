const axios = require("axios");
const cheerio = require("cheerio");

const detail = {
  getDetail: async (req, res) => {
    try {
      const { name } = req.params;
      const response = await axios.get(process.env.URL + name);
      const html = response.data;
      const $ = cheerio.load(html);

      const img = $("#content img.movie-thumb").attr("src");
      const title = $("#content .entry-title").text().trim();
      const released = $("#content .released").text().trim();
      const latest_episode = $("#content .episode span:nth-child(2)")
        .text()
        .trim();
      const link =
        $("#content .halim-watch-box a").attr("href").split("/")[3] +
        "/" +
        $("#content .halim-watch-box a")
          .attr("href")
          .split("/")[4]
          .slice(0, -5);

      const categoryMovie = await detail.getCategory($, "#content .category a");

      const episodes = await detail.getEpisode($, "#content #listsv-1 li");

      let content;

      $("#content article.item-content").find("a").remove();
      $("#content article.item-content").find("strong").remove();
      if ($("#content article.item-content").find("p").length > 2) {
        content = $("#content article.item-content").html().trim();
      } else {
        content = await detail.getContent(name);
      }

      return res.send({
        msg: "Success",
        data: {
          img: img,
          title: title,
          link: link,
          released: released,
          latest_episode: latest_episode,
          categoryMovie: categoryMovie,
          episodes: episodes,
          contents:
            content?.slice(0, content.indexOf("<style>")) +
            content?.slice(content.lastIndexOf("</style>") + 8),
        },
        timestamp: new Date().getTime(),
      });
    } catch (error) {}
  },
  getContent: async (name) => {
    try {
      let response, link, html, $;
      link = "https://hh3d.tv/thong-tin-phim/" + name + "-3d";
      response = await axios.get(link);

      html = response.data;

      $ = cheerio.load(html);

      if ($(".description-movie").html()) {
        $(".description-movie")
          .find("h2 span")
          .each(function () {
            $(this).removeAttr("style");
          });

        return $(".description-movie").html().trim();
      }

      link = "https://hh3d.tv/thong-tin-phim/" + name;
      response = await axios.get(link);

      html = response.data;

      $ = cheerio.load(html);
      $(".description-movie")
        .find("h2 span")
        .each(function () {
          $(this).removeAttr("style");
        });

      $(".description-movie").find("strong ").remove();

      return $(".description-movie").html().trim();
    } catch (error) {}
  },
  getEpisode: ($, class_) => {
    const episodes = [];
    $(class_).each(function () {
      const link =
        $(this).find("a").attr("href").split("/")[3] +
        "/" +
        $(this).find("a").attr("href").split("/")[4].slice(0, -5);
      const episode = $(this).find("span").text().trim();
      episodes.push({
        link,
        episode,
      });
    });
    return episodes.reverse();
  },
  getCategory: ($, class_) => {
    const categoryMovie = [];

    $(class_).each(function () {
      const link = $(this).attr("href").split("/")[3];
      const name = $(this).text().trim();
      categoryMovie.push({
        link,
        name,
      });
    });

    return categoryMovie;
  },
};

module.exports = detail;
