const axios = require("axios");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");

const startPuppeteerSession = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  return { browser, page };
};

const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

const home = {
  carousel: (html, $) => {
    const carousel = [];

    $(".owl-carousel a", html).each(async function () {
      const img = $(this).find("img").attr("src");
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
  getHome: asyncHandler(async (req, res) => {
    try {
      const response = await axios.get(process.env.URL);
      const html = response.data;
      const $ = cheerio.load(html);

      const carousel = home.carousel(html, $);

      const latest_Episodes = home.latest_Episodes(html, $);

      const dateSchedule = home.dateSchedule(html, $);

      const { browser, page } = await startPuppeteerSession();
      await page.goto(process.env.URL);
      //Wait for the page to be loaded

      let schedule = await page.evaluate(async () => {
        return await new Promise((resolve, reject) => {
          const data = document.body.querySelectorAll(
            "#LichChieuPhim .name-movie"
          );

          let title = [];

          data.forEach((item) => {
            title.push(item.innerText);
          });

          resolve(title);
        });
      });

      const date = new Date();
      const today = date.getDay();

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
  }),
  test: asyncHandler(async (req, res) => {}),
};

module.exports = home;
