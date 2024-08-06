const axios = require("axios");
const cheerio = require("cheerio");
const { getHtml } = require("../model/newURL/index.js");

const latestMovie = {
  getLatestMovie: async (req, res) => {
    try {
      const page = req.params.page;
      const newURL = await getHtml();
      const response = await axios
        .request({
          method: "GET",
          url:
            page === 1
              ? newURL + "/latest-movie"
              : newURL + "/latest-movie/page/" + page,
          timeout: 3000,
        })
        .catch((error) => {
          return res.status(500).send({
            message: "Failed",
            timestamp: new Date().getTime(),
          });
        });

      const html = response.data;
      const $ = cheerio.load(html);

      const pagination = await latestMovie.getPage(html, $);

      const latest_Episodes = await latestMovie.getLatestEpisodes(html, $);

      if (!latest_Episodes.length)
        return res.status(404).send({
          msg: "Not found",
          timestamp: new Date().getTime(),
        });

      return res.status(200).send({
        msg: "Success",
        data: { pagination, latest_Episodes },
        timestamp: new Date().getTime(),
      });
    } catch (error) {
      return res.status(500).send({
        message: error,
      });
    }
  },
  getPage: (html, $) => {
    const Page = [];
    $("ul.page-numbers li", html).each(async function () {
      const page = $(this).find("a").hasClass("prev")
        ? "prev"
        : $(this).find("a").hasClass("next")
        ? "next"
        : $(this).find("span").hasClass("dots")
        ? "..."
        : $(this).find("span").hasClass("current")
        ? Number($(this).find("span").text())
        : Number($(this).find("a").text());

      const link = $(this).find("span").html()
        ? null
        : new URL($(this).find("a").attr("href")).pathname;

      Page.push({
        page,
        link: link || null,
      });
    });

    return [...Page];
  },
  getLatestEpisodes: (html, $) => {
    const latest_Episodes = [];
    $(".halim_box article .halim-item", html).each(async function () {
      const title = $(this).find(".entry-title").text().trim();
      const link = $(this).find("a").attr("href").split("/")[3];
      const img = $(this).find("img").attr("src");
      const episode_latest = $(this).find(".episode").text().trim();

      latest_Episodes.push({
        title,
        link,
        img,
        episode_latest,
      });
    });

    return latest_Episodes;
  },
};

module.exports = latestMovie;
