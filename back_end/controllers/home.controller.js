const axios = require("axios");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");

// const { initNetworkLogging } = require("network-activity-viewer");

// const asyncHandler = (fn) => (req, res, next) =>
//   Promise.resolve(fn(req, res, next)).catch(next);

const home = {
  carousel: (html, $) => {
    const carousel = [];

    $(".owl-carousel a", html).each(async function () {
      const img =
        $(this).find("img").attr("src").split("/")[0] === "https:"
          ? $(this).find("img").attr("src")
          : `${process.env.URL + $(this).find("img").attr("src")}`;
      const title = $(this).find(".name").text();
      const episode_latest = $(this).find(".episode_latest").text().trim();
      const link = $(this).attr("href").split("/")[4].slice(0, -5);

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
    $(`.ah_content .movies-list .movie-item`, html).each(function () {
      const title = $(this).find(".name-movie").text().trim();
      const link = $(this).find("a").attr("href").split("/")[4].slice(0, -5);
      const img =
        $(this).find("img").attr("src").split("/")[0] === "https:"
          ? $(this).find("img").attr("src")
          : `${process.env.URL + $(this).find("img").attr("src")}`;
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

    return latest_Episodes;
  },
  dateSchedule: (html, $) => {
    const dateSchedule = [];

    $(".tab-lichchieu a", html).each(function () {
      const day = $(this).find(".item-label").text().trim();

      dateSchedule.push({
        day,
      });
    });

    return dateSchedule;
  },
  schedule: async () => {
    console.log("Loading page");
    const browser = await puppeteer.launch({
      args: [
        "--disable-setuid-sandbox",
        "--no-sandbox",
        "--single-process",
        "--no-zygote",
      ],
    });
    console.log("Browser opened");
    const page = await browser.newPage();
    console.log("Page created");
    await page.goto(process.env.URL);
    console.log("Page loaded");

    let schedule = await page.evaluate(async () => {
      const title_anime = document.body.querySelectorAll(
        "#LichChieuPhim .name-movie"
      );

      const link_anime = document.body.querySelectorAll("#LichChieuPhim a");

      const episode_latest = document.body.querySelectorAll(
        "#LichChieuPhim .episode-latest"
      );

      const rating = document.body.querySelectorAll(
        "#LichChieuPhim .score span"
      );

      const img = document.body.querySelectorAll("#LichChieuPhim img");

      const schedule = [];

      for (let i = 0; i < title_anime.length; i++) {
        const title = title_anime[i].innerText;
        const link = link_anime[i].href.split("/")[4].slice(0, -5);
        const episode = episode_latest[i].innerText;
        const rating_anime = rating[i].innerText.replace("star", "").trim();
        const img_anime =
          img[i].src.split("/")[0] === "https:"
            ? img[i].src
            : `${process.env.URL + img[i].src}`;

        schedule.push({
          title,
          link,
          episode,
          rating: rating_anime,
          img: img_anime,
        });
      }

      return schedule;
    });

    console.log("Schedule loaded");

    return schedule;
  },
  comingSoon: (html, $) => {
    const comingSoon = [];

    $("#nominations_movie .movie-item", html).each(function () {
      const title = $(this).find(".name-movie").text().trim();
      const link = $(this).find("a").attr("href").split("/")[4].slice(0, -5);
      const img = $(this).find("img").attr("src");
      const episode_latest = $(this).find(".episode-latest").text().trim();
      const rating = $(this)
        .find(".score span")
        .text()
        .replace("star", "")
        .trim();

      comingSoon.push({
        title,
        link,
        img,
        episode_latest,
        rating,
      });
    });

    return comingSoon;
  },
  getHome: async (req, res) => {
    try {
      const response = await axios.get(process.env.URL);
      const html = response.data;
      const $ = cheerio.load(html);

      const carousel = home.carousel(html, $);

      const latest_Episodes = home.latest_Episodes(html, $).slice(0, 30);

      const dateSchedule = home.dateSchedule(html, $);

      console.log("Schedule loaded");
      const schedule = await home.schedule();

      const date = new Date();
      const today = date.getDay();

      const comingSoon = home.comingSoon(html, $);

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
            date: {
              dateSchedule,
              currentDay: today,
            },
            data: schedule,
          },
          comingSoon: {
            title: "Phim sắp chiếu",
            data: comingSoon,
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
  test: async (req, res) => {
    try {
    } catch (error) {}
  },
};

module.exports = home;
