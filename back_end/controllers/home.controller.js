const axios = require("axios");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");

const playwright = require("playwright-aws-lambda");

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
  getSchedule: async (page, day) => {
    try {
      await page.click(day);

      const waitDay = await page.waitForSelector("#LichChieuPhim .name-movie");
      return await waitDay.evaluate(async () => {
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
    } catch (error) {
      console.log(error);
    }
  },
  schedule: async (req, res) => {
    try {
      const date = new Date();
      const today = date.getDay();
      let { day } = req.query;
      if (day === undefined) {
        day = `#thu-${today + 1}`;
      }
      const browserFetcher = puppeteer.createBrowserFetcher();
      let revisionInfo = await browserFetcher.download("1095492");
      const browser = await puppeteer.launch({
        executablePath: revisionInfo.executablePath,
      });

      const page = await browser.newPage();

      await page.goto(process.env.URL, {
        waitUntil: "networkidle2",
        timeout: 0,
      });

      const schedule = await home.getSchedule(page, day);
      await browser.close();

      return res.status(200).send({
        msg: "Success",
        data: [...schedule],
        timestamp: new Date().getTime(),
      });
    } catch (error) {
      console.log(error);
    }
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

      const comingSoon = home.comingSoon(html, $);

      return res.status(200).send({
        msg: "Success",
        data: {
          carousel: carousel,
          latest_Episodes: {
            title: "Phim mới cập nhật",
            data: latest_Episodes,
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
      const browser = await playwright.launchChromium({
        headless: true,
        args: ["--no-sandbox"],
      });
      const page = await browser.newPage({ strictSelectors: false });

      await page.goto(process.env.URL);

      const schedule = await page.evaluate(async () => {
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

      await browser.close();

      return res.status(200).send({
        msg: "Success",
        data: [...schedule],
        timestamp: new Date().getTime(),
      });
    } catch (error) {}
  },
};

module.exports = home;
