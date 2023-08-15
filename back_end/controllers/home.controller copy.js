const axios = require("axios");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");

const home = {
  getHome: async (req, res) => {
    try {
      const response = await axios.get(process.env.URL);

      // async function imageUrlToBase64(url) {
      //   try {
      //     const response = await fetch(url);

      //     const blob = await response.arrayBuffer();

      //     const contentType = response.headers.get("content-type");

      //     const base64String = `data:${contentType};base64,${Buffer.from(
      //       blob
      //     ).toString("base64")}`;

      //     return base64String;
      //   } catch (err) {
      //     console.log(err);
      //   }
      // }

      const html = response.data;
      const $ = cheerio.load(html);

      const carousel = [];

      $(".owl-carousel a", html).each(async function () {
        const img = $(this).find("img").attr("src");
        const title = $(this).find(".name").text();
        const episode_latest = $(this).find(".episode_latest").text().trim();
        const link = $(this).attr("href").split("/")[4].slice(0, -5);

        // const test = Promise.resolve(imageUrlToBase64(img)).then((value) => {
        //   return {
        //     img: {
        //       value,
        //     },
        //     title,
        //     episode_latest,
        //     link,
        //   };
        // });

        carousel.push({
          img,
          title,
          episode_latest,
          link,
        });
      });

      // Promise.all(carousel).then((values) => {
      //   res.status(200).send({
      //     carousel: values,
      //   });
      // });

      const latest_Episodes = [];
      $(`.ah_content .movies-list .movie-item`, html).each(function () {
        const title = $(this).find(".name-movie").text().trim();
        const link = $(this).find("a").attr("href").split("/")[4].slice(0, -5);
        const img = $(this).find("img").attr("src");
        const episode_latest = $(this).find(".episode-latest").text().trim();
        const rating = $(this)
          .find(".score span")
          .text()
          .replace("star", "")
          .trim();

        latest_Episodes.push({
          title,
          link,
          img,
          episode_latest,
          rating,
        });
      });

      const dateSchedule = [];
      const date = new Date();
      const today = date.getDay();

      $(".tab-lichchieu a", html).each(function () {
        const day = $(this).find(".item-label").text().trim();

        dateSchedule.push({
          day,
        });
      });

      res.status(200).send({
        msg: "Success",
        data: {
          carousel: carousel,
          latest_Episodes: {
            title: "Phim mới cập nhật",
            data: latest_Episodes,
          },
          schedule: {
            title: "Lịch chiếu",
            date: {
              dateSchedule,
              currentDay: today,
            },
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
  test: async (req, res) => {},
};

module.exports = home;
