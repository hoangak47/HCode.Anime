const axios = require("axios");
const cheerio = require("cheerio");

const home = {
  carousel: (html, $) => {
    const carousel = [];

    $("#sidebar .popular-post .item a ", html).each(async function () {
      const img = $(this).find("img").attr("src");
      const title = $(this).find(".title").text();
      const episode_latest = $(this).find(".original_title").text().trim();
      const link = $(this).attr("href").split("/")[3];

      carousel.push({
        img,
        title,
        episode_latest,
        link,
      });
    });

    return carousel;
  },
  latest_Episodes: (html, $) => {
    const latest_Episodes = [];
    $(`#halim-advanced-widget-3-ajax-box .grid-item`, html).each(function () {
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
  getSchedule: (html, $, day) => {
    const schedule = [];
    $(`#ajax-schedule-widget ${day} article`, html).each(function () {
      // id = $(this).attr("id");
      const dat = $(this).attr("id");
      const link = $(this).find("a").attr("href").split("/")[3];

      const title = $(this).find(".entry-title").text().trim();
      const episode_latest = $(this).find(".episode").text().trim();
      const img = $(this).find("img").attr("src");

      schedule.push({
        dat,
        link,
        title,
        episode_latest,
        img,
      });
    });

    return schedule;
  },
  schedule: (html, $) => {
    try {
      const monday = home.getSchedule(html, $, "#thu-2");
      const tuesday = home.getSchedule(html, $, "#thu-3");
      const wednesday = home.getSchedule(html, $, "#thu-4");
      const thursday = home.getSchedule(html, $, "#thu-5");
      const friday = home.getSchedule(html, $, "#thu-6");
      const saturday = home.getSchedule(html, $, "#thu-7");
      const sunday = home.getSchedule(html, $, "#chu-nhat");

      return [
        [...monday],
        [...tuesday],
        [...wednesday],
        [...thursday],
        [...friday],
        [...saturday],
        [...sunday],
      ];
    } catch (error) {
      console.log(error);
    }
  },
  getDayOfWeek: () => {
    return ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"];
  },
  getHome: async (req, res) => {
    try {
      const response = await axios.get(process.env.URL);
      const html = response.data;
      const $ = cheerio.load(html);

      const carousel = home.carousel(html, $);

      const latest_Episodes = home.latest_Episodes(html, $);

      const schedule = home.schedule(html, $);

      return res.status(200).send({
        msg: "Success",
        data: {
          carousel: carousel,
          latest_Episodes: {
            title: "Phim mới cập nhật",
            data: latest_Episodes,
          },
          schedule: {
            title: "Lịch chiếu",
            day: home.getDayOfWeek(),
            data: schedule,
          },
        },
        timestamp: new Date().getTime(),
      });
    } catch (error) {
      res.status(500).send({
        message: error,
      });
    }
  },
};

module.exports = home;
