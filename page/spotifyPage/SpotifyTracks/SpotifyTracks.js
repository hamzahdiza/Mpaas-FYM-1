const app = getApp();

Page({
  data: {
    tracksList: [],
    image_playlist: "",
    name_playlist: "",
    access_token: "",
    searchFocus: false,
    searchInputValue: "",
    filteredTracks: [],
    timer: null,
    isLoading: false,
  },

  onShow() {
    my.setNavigationBar({
      backgroundColor: '#1CB955',
    });

    my.hideNavigationBarLoading()
  },

  async onLoad(query) {


    const access_token_t = my.getStorageSync({
      key: 'access_token' 
    }).data

    this.setData({
      access_token: access_token_t
    })

    const { track_url, image_playlist, name_playlist } = query; 
    const dataGetTracks = await this.getTracks(track_url, access_token_t);

    my.setNavigationBar({
      title: name_playlist,
      backgroundColor: "#1CB955",
    })
    
    this.setData({
      tracksList: dataGetTracks,
      image_playlist: image_playlist.replace(/}/g, ""),
      name_playlist: name_playlist
    })

    my.setStorageSync({
      key: 'track_url', 
      data: track_url
    });
    
    console.log(this.data.image_playlist, "image_playlist <<<");
    console.log(this.data.name_playlist);
    console.log(this.data.tracksList, "getTracks");
  },

  async onPullDownRefresh() {

    const track_url = my.getStorageSync({
      key: 'track_url' 
    }).data

    this.setData({
      tracksList: null,
    });

    try {
      const dataGetTracks = await this.getTracks(track_url, this.data.access_token);
      this.setData({
        tracksList: dataGetTracks,
      })
    } catch (error) {
      console.error(error);
    } finally {
      my.stopPullDownRefresh();
    }
  },


  getTracks (track_url, access_token_t) {
    return new Promise((resolve, reject) => {
      this.setData({
        isLoading: true
      })
      my.request({
        url: "http://localhost:3000/get-tracks",
        method: "POST",
        headers: {
          access_token: access_token_t
        },
        data: {
          track_url: track_url,
        },
        success: (res) => {
          resolve(res.data)
          this.setData({
            isLoading: false
          })
        },
        fail: (err) => {
          app.globalData.handleExpiredToken(err)
          this.setData({
            isLoading: false
          })
        },
      })
    })
  },

  // handleIconTap(e) {
  //   const { link } = e.target.dataset;
  //   my.navigateTo({
  //     url: "/page/spotifyPage/Webview/Webview?link=" + link,
  //   });
  // },

  handleEventTrack(e) {
    my.navigateTo({
      url: "/page/spotifyPage/Webview/Webview?link=" + e.link,
    });
  },

  toggleSearchFocus() {
    this.setData({
      searchFocus: !this.data.searchFocus,
    });
  },


  handleSearchInput(e) {
    clearTimeout(this.data.timer);

    const track_url = my.getStorageSync({
      key: 'track_url' 
    }).data

    const value = e.detail.value.trim();

    console.log(value, track_url, this.data.access_token, "<<<<<<<<OOOOOOOOOOOOOO");

    if (value !== '') {
        this.setData({
          searchInputValue: value
        })
    } else {
      this.setData({
        filteredTracks: []
      })
    }
  },

  handleSearchButton() {
    const searchValue = this.data.searchInputValue.trim();

    if (searchValue !== '') {
      this.searchTrack(searchValue);
    } else {
      // 
    }
  },


  searchTrack(query) {
    this.setData({
      showLoading: true,
    });
    console.log(query, "<<<<<<<<<,,,sdsd");

    const filteredTracks = this.data.tracksList.filter(track => track.name_track.toLowerCase().includes(query.toLowerCase()));

    this.setData({
      filteredTracks: filteredTracks
    });
 
  },


});
