const axios = require("axios");
const cheerio = require("cheerio");
const latestMovie = require("./latest-movie.controller");

const category = {
  getCategory: async (req, res) => {
    try {
      const response = await axios.get(process.env.URL);
      const html = response.data;
      const $ = cheerio.load(html);

      const category = [];

      $("#menu-menu li").each(function () {
        const link = $(this).find("a").attr("href").split("/")[3];
        const name = $(this).find("a").text().trim();
        category.push({
          link,
          name,
        });
      });

      return res.send({
        message: "Success",
        category,
      });
    } catch (error) {
      res.status(500).send({
        message: "Failed",
        timestamp: new Date().getTime(),
      });
    }
  },
  getCategoryDetail: async (req, res) => {
    try {
      const { name, page } = req.params;
      const response = await axios.get(
        page === 1
          ? process.env.URL + "/" + name
          : process.env.URL + "/" + name + "/page/" + page
      );
      const html = response.data;
      const $ = cheerio.load(html);

      const pagination = await latestMovie.getPage(html, $);
      const latest_Episodes = await latestMovie.getLatestEpisodes(html, $);
      const title = $("#main-contents .section-title span").text().trim();

      return res.send({
        message: "Success",
        data: { pagination, latest_Episodes, title },
        timestamp: new Date().getTime(),
      });
    } catch (error) {
      return res.status(500).send({
        message: "Failed",
        timestamp: new Date().getTime(),
      });
    }
  },
};

module.exports = category;
