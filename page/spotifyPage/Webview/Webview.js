Page({
  data: {
    webUrl: ''
  },

  onLoad(query) {
    this.setData({
      webUrl: decodeURIComponent(query.link)
    });

    my.setNavigationBar({
      backgroundColor: "#1CB955",
    });
  }
})
