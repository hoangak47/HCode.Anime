const axios = require("axios");
const cheerio = require("cheerio");
const latestMovie = require("./latest-movie.controller");

const searchController = {
  query: async (name, page) => {
    const response = await axios
      .request({
        method: "GET",
        url:
          page === undefined || page === 1
            ? process.env.URL + `search/${name}`
            : process.env.URL + `search/${name}/page/${page}`,

        timeout: 3000,
      })
      .catch((error) => {
        return res.status(500).send({
          message: "Search failed",
          timestamp: new Date().getTime(),
        });
      });

    const html = response.data;
    const $ = cheerio.load(html);

    const pagination = await latestMovie.getPage(html, $);
    const latest_Episodes = await latestMovie.getLatestEpisodes(html, $);
    const title = $("#main-contents .section-title span").text().trim();

    // get window location in bookmark data-thumbnail

    if (title === "Nội dung phim") {
      const bookmark = $("#bookmark").attr("data-href").split("/")[3];
      return {
        link: bookmark,
      };
    }

    return {
      title,
      pagination,
      latest_Episodes,
    };
  },
  search: async (req, res) => {
    try {
      const { name, page } = req.query;

      const { latest_Episodes } = await searchController.query(name, page);

      return res.status(200).send({
        message: "Search success",
        data: {
          latest_Episodes: latest_Episodes.slice(0, 3),
        },
        timestamp: new Date().getTime(),
      });
    } catch (error) {}
  },
  searchAll: async (req, res) => {
    try {
      const { name, page } = req.query;

      return res.status(200).send({
        message: "Search success",
        data: await searchController.query(name, page),
        timestamp: new Date().getTime(),
      });
    } catch (error) {}
  },
};

module.exports = searchController;
