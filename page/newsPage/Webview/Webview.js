Page({
  data: {
    webUrl: ''
  },

  onLoad(query) {
    console.log(query.link, "LINK WEBVIEW<<<<<<<<<<<<<<");
    this.setData({
      webUrl: decodeURIComponent(query.link)
    });

    let queryLink = query.link
    

    my.setNavigationBar({
      backgroundColor: "#1CB955",
    });
  }
})
