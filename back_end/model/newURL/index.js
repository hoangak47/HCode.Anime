const axios = require("axios");

const newURL = {
  getHtml: async () => {
    const response = await axios.get(process.env.URL);
    console.log(process.env.URL);

    // Kiểm tra xem có chuyển hướng link hay không
    if (response.request.res.responseUrl !== process.env.URL) {
      // Cập nhật lại URL mới
      url = response.request.res.responseUrl;
    }

    return url;
  },
};

module.exports = newURL;
