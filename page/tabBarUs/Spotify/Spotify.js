const app = getApp();

Page({
  data: {
    access_token: "",
    refresh_token: "",
    playlists: [],
    isLoading: false,
    // item: {
    //   id: 'lottie-1',
    //   desc : 'Django autoplay, low-end device downgrade' , 
    //   autoplay: true,
    //   path:'https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/rmsportal/ccVuojvUKLkFENNHAVgT.json',
    //   placeholder:'https://gw.alipayobjects.com/mdn/rms_e345fe/afts/img/A*nu3GTaHqJ9AAAAAAAAAAAAAAARQnAQ524560995883_icon_S.png',
    //   optimize: 'true',
    //   repeatCount: -1,  
    //   assetsPath : 'https://gw.alipayobjects.com/os/lottie-asset/bb/data.json/'
    // } 
  },
  
  // onReady() {
  //   var lottieContext = my.createLottieContext(this.data.item.id);
  //   lottieContext.play()
  // },

  async onLoad() {
    const token = my.getStorageSync({
      key: 'token' 
    }).data

    this.setData({
      refresh_token: token
    })

    // belom dipake yang atas

    my.setNavigationBar({
      title: 'For Your Mood',
      backgroundColor: "#1CB955",
    });

    this.setData ({
      playlists: null,
    })


   
    this.callApiHandler()
    

    console.log(this.data.playlists)
    
  },

  getAccessToken(){
      my.request({
        url: 'http://localhost:3000/token',
        method: 'POST',
        headers: {
          token: this.data.refresh_token,
        },
        success: (res) => {
          console.log(res.data, "getAccessToken");
          resolve(res.data);
        },
        fail: (err) => {
          console.log(err);
          reject(err);
        },
      });
  },

  async onPullDownRefresh() {
    try { 
      await this.callApiHandler()
    } catch (err) {
      console.log(err);
    } finally {
      my.stopPullDownRefresh();
    }
  },

  async callApiHandler(){
    try {

      const access_token = my.getStorageSync({
        key: 'access_token' 
      }).data
  
      
      this.setData({
        isLoading: true,
        playlists: []
      })

      app.globalData.isLoading = true

      let dataWeather = await this.getWeather(access_token)
      let dataAnswer = await this.getAnswer(dataWeather, access_token)
      let dataPlaylist = await this.getPlaylist(dataAnswer, access_token)

      this.setData({
        playlists: dataPlaylist,
      })
     
    } catch (err) {
      console.log(err);
      this.setData({
        isLoading: false
      })
      app.globalData.isLoading = false
    }
    finally {
      this.setData({
        isLoading: false
      });
      app.globalData.isLoading = false
    }
  },

  getWeather(access_token){
    return new Promise((resolve, reject) => {

      my.request({
        url: 'http://localhost:3000/check-weather',
        method: 'POST',
        headers: {
          access_token: access_token,
        },
        success: (res) => {
          resolve(res.data)
        },
        fail: (err) => {
          app.globalData.handleExpiredToken(err)
          reject(err)
        },
      })  
    });
  },

  getAnswer(dataWeather, access_token){
    return new Promise((resolve, reject) => {
      my.request({
        url: "http://localhost:3000/get-answer-ai",
        method: "POST",
        headers: {
          access_token: access_token
        },
        data: {
          query: dataWeather
        }, 
        success: (res) => {
          resolve(res.data)
        },
        fail: (err) => {
          console.log(err)
          reject(err)
        }
      })
    })
  },

  getPlaylist (dataAnswer, access_token) {
    return new Promise((resolve, reject) => {
      my.request({
        url: "http://localhost:3000/get-playlist",
        method: "POST",
        headers: {
          access_token: access_token
        },
        data: {
          query: dataAnswer
        },
        success: (res) => {
          resolve(res.data)
        },
        fail: (err) => {
          console.log(err);
          reject(err)
        } 
      })
    })
  },

  // Sebelum pake props
  // handlePlaylistTap(e) {
  //   const { track_url, image_playlist, name_playlist } = e.target.dataset;
  
  //   my.navigateTo({
  //     url: '/page/spotifyPage/SpotifyTracks/SpotifyTracks?track_url=' + track_url + "&name_playlist=" + name_playlist + "&image_playlist=" + image_playlist 
  //   });
  // },

  handleEventTrack(e) {
    my.setNavigationBar({
      backgroundColor: "#1CB955",
    })
    my.navigateTo({
      url: '/page/spotifyPage/SpotifyTracks/SpotifyTracks?track_url=' + e.track_url + "&name_playlist=" + e.name_playlist + "&image_playlist=" + e.image_playlist 
    });
  },

  // handleExpiredToken(res){
  //   if (res.status === 403 || res.status === 401) {
  //     console.log("Masyk sisu kagak");

  //     const token = my.getStorageSync({
  //       key: 'token' 
  //     }).data

  //     my.request({
  //       url: 'http://localhost:3000/token',
  //       method: 'POST',
  //       data: {
  //         token: token,
  //       },
  //       success: (res) => {
  //         if (res.status === 200) {
  //           const newAccessToken = res.data.access_token;

  //           this.setData({
  //             access_token: newAccessToken
  //           })
  //           my.setStorageSync({
  //             key: 'access_token', 
  //             data: newAccessToken
  //           });
            
  //           console.log("Berhasil");
            
  //           this.onPullDownRefresh()
        
  //         }
  //       },
  //       fail: (res) => {
  //         if (res.status === 403 || res.status === 401 || res.status === 500) {
  //           let pages = getCurrentPages(); 
  //           let currentPage = pages[pages.length - 1];
  //           let url = currentPage.route; 

  //           my.setStorageSync({key: 'lastPage', data: url});
  //           my.reLaunch({ url: '/page/LoginPage/LoginPage' });
  //           my.removeStorageSync({
  //             key: "access_token"
  //           })
  //           my.removeStorageSync({
  //             key: "token"
  //           })
  //         }
  //       },
  //     });
  //   }
  // }

});