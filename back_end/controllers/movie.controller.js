const axios = require("axios");
const cheerio = require("cheerio");
const detail = require("./detail.controller");
const home = require("./home.controller");

const movieController = {
  getMovie: async (req, res, next) => {
    try {
      const { name, episode } = req.params;

      const response = await axios.get(
        process.env.URL + name + "/" + episode + ".html"
      );
      const html = response.data;
      const $ = cheerio.load(html);

      const title = $(".entry-title a").text();
      const link = $(".entry-title a").attr("href").split("/")[3];
      const episodes = await detail.getEpisode($, "#content #listsv-1 li");
      const movieActive = $("#listsv-1 li.active").text();

      const link1 =
        $("iframe.embed-responsive-item").attr("src").includes("archive.org") ||
        $("iframe.embed-responsive-item")
          .attr("src")
          .includes("www.dailymotion.com") ||
        $("iframe.embed-responsive-item").attr("src").includes("//ok.ru")
          ? $("iframe.embed-responsive-item").attr("src")
          : $("#server-item-1").attr("data-link").includes("archive.org") ||
            $("#server-item-1")
              .attr("data-link")
              .includes("www.dailymotion.com") ||
            $("#server-item-1").attr("data-link").includes("//ok.ru")
          ? $("#server-item-1").attr("data-link")
          : $("#server-item-2").attr("data-link").includes("archive.org") ||
            $("#server-item-2")
              .attr("data-link")
              .includes("www.dailymotion.com") ||
            $("#server-item-2").attr("data-link").includes("//ok.ru")
          ? $("#server-item-2").attr("data-link")
          : $("#server-item-3").attr("data-link").includes("archive.org") ||
            $("#server-item-3")
              .attr("data-link")
              .includes("www.dailymotion.com") ||
            $("#server-item-3").attr("data-link").includes("//ok.ru")
          ? $("#server-item-3").attr("data-link")
          : $("#server-item-1").attr("data-link");
      const link2 = $("#server-item-1").attr("data-link");
      const link3 = $("#server-item-2").attr("data-link");
      const link4 = $("#server-item-3").attr("data-link");

      const carousel = await home.carousel(html, $);

      return res.status(200).send({
        message: "Get movie successfully",
        data: {
          title,
          link,
          movieActive,
          link1,
          link2,
          link3,
          link4,
          carousel,
          episodes,
        },
        time: new Date().getTime(),
      });
    } catch (error) {}
  },
};

module.exports = movieController;