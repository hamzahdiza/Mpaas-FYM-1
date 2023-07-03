// Page({
//   data: {
//     top: 0,
//     tabs: ['music', 'entertainment'],
//     activeTab: 0, 
    
//     musicNews: [],
//     entertainmentNews: [],
//     currentTab: 'music',
//     page: 1,
//   },

//   onTabBarTap(e) {
//     const { index } = e.target.dataset
//     let tab_section = this.data.tabs[index];
//     this.setData({
//       activeTab: index,
//       currentTab: tab_section,
//       page: 1,
//     });
//     this.loadNews();
//   },

//   async onLoad() {
//     await this.loadNews();
//   },

//   async onReachBottom() {
//     this.setData({
//       page: this.data.page + 1,
//     });
//     await this.loadNews();
//   },

//   async loadNews() {
//     my.showLoading({
//       content: "Loading..."
//     });

//     let url = 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI';
//     let headers = {
//       'X-RapidAPI-Key': 'cc5e08d273mshc4f4615947be0f3p1738c9jsne12b3ff3557e',
//       'X-RapidAPI-Host': 'contextualwebsearch-websearch-v1.p.rapidapi.com'
//     };
//     let params = {
//       q: this.data.currentTab,
//       pageNumber: this.data.page.toString(),
//       pageSize: '10',
//       autoCorrect: 'true',
//       fromPublishedDate: 'null',
//       toPublishedDate: 'null'
//     };

//     my.request({
//       url: url,
//       headers: headers,
//       data: params,
//       method: 'GET',
//       dataType: 'json',
//       success: (res) => {
//         if(this.data.currentTab == "music") {
//           let newData = this.data.page === 1 ? res.data.value : this.data.musicNews.concat(res.data.value);
//           this.setData({
//             musicNews: [...this.data.musicNews, ...newData]
//           });
//           // console.log(this.data.musicNews, "musicNews <<<<<<<<<<<");
//         } else {
//           let newData = this.data.page === 1 ? res.data.value : this.data.entertainmentNews.concat(res.data.value);
//           this.setData({
//             entertainmentNews: newData
//           });
//           // console.log(this.data.entertainmentNews, "entertainmentNews <<<<<<<<<<<");
//         }
//       },
//       fail: function(res) {
//         my.showToast({
//           content: "Failed to load news"
//         });
//       },
//       complete: function(res) {
//         my.hideLoading();
//       }
//     });
//   },
// });
const app = getApp()

Page({
  data: {
    top: 0,
    tabs: ['music', 'entertainment'],
    activeTab: 0, 
    musicNews: [],
    entertainmentNews: [],
    currentTab: 'music',
    limit: 10,
    offset: 0,
    isLoading: false
  },

  async onTabBarTap(e) {
    const { index } = e.target.dataset;
    let tab_section = this.data.tabs[index];

    for(let i = 0; i < this.data.tabs.length; i++){
      if(tab_section == this.data.tabs[i]) {
        this.setData({
          activeTab: i
        })
      }
    }
    console.log(tab_section, "tabbbbb");
    console.log(this.data.activeTab, "tabbbbb");
    this.setData({
      activeTab: index,
      currentTab: tab_section,
    });
    await this.loadNews();
  },

  async onLoad() {
    await this.loadNews();

    my.setNavigationBar({
      backgroundColor: "#1CB955",
    });
  },

  async onReachBottom() {
    this.setData({
      limit: 10,
      offset: this.data.offset + 10
    });
    await this.loadNews();
  },

  async loadNews() {
    const access_token = my.getStorageSync({
      key: 'access_token' 
    }).data

    this.setData({
      isLoading: true
    })

    const url = `http://localhost:3000/get-news-${this.data.currentTab}?offset=${this.data.offset}&limit=${this.data.limit}`
    // console.log(this.data.currentTab, "Current TABBBBBBBBBb");
    // console.log(this.data.activeTab, "ACTIVE TAB");
      my.request({
        url: url,
        // data: params,
        method: 'GET',
        headers: {
          access_token: access_token
        },
        success: (res) => {
          this.handleStoreData(res.data)
          this.setData({
            isLoading: false
          })
        },
        fail: (res) => {
          console.log(res, "CEKS DISINI @@@@@@@@@@");
          app.globalData.handleExpiredToken(res)
        },
        complete: (res) => {
          this.setData({
            isLoading: false
          })
        }
      });

  },

  async onPullDownRefresh() {

    this.setData({
      musicNews: [],
      entertainmentNews: [],
    });

    try {
      
      await this.loadNews()
    } catch (error) {
      console.error(error, "ON PULL DOWN REFRESH");
    } finally {
      my.stopPullDownRefresh();
    }
  },

  handleIconTap(e) {
    const { link } = e.target.dataset;
    my.navigateTo({
      url: "/page/newsPage/Webview/Webview?link=" + link,
    });
  },

  handleEventTrack(e) {
    my.navigateTo({
      url: "/page/newsPage/Webview/Webview?link=" + e.link
    })
  },
  
  dataFormat(dateString) {
    const date = new Date(dateString);
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
  
    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  },


  async handleStoreData(newsData) {
    if(this.data.currentTab == "music") {
      console.log(this.data.currentTab, "Musiiiiiicccccccccccc", newsData);
      let shuffledData = this.shuffle(newsData);
      let newData =  this.data.offset === 0 ? shuffledData : this.data.musicNews.concat(newsData);
      this.setData({
        musicNews: newData.map(item => {
          return {
            ...item,
            published_date: this.dataFormat(item.published_date),
            views: Math.floor(Math.random() * 10000) + 1 
          };
        })
      });
      console.log(this.data.musicNews, "musicNews <<<<<<<<<<<<<,");
    } else {
      console.log(this.data.currentTab, "Enterrrrrrrrrrrrrrrr");
      let shuffledData = this.shuffle(newsData);
      let newData = this.data.offset === 0 ? shuffledData : this.data.entertainmentNews.concat(newsData);
      this.setData({
        entertainmentNews: newData.map(item => {
          return {
            ...item,
            published_date: this.dataFormat(item.published_date),
            views: Math.floor(Math.random() * 10000) + 1 
          };
        })
      });
      console.log(this.data.entertainmentNews, "entertainmentNews <<<<<<%%<<<<<<<,");
    }
  },

  shuffle(array) {
    if (Array.isArray(array)) {
      let currentIndex = array.length, temporaryValue, randomIndex;
    
      while (0 !== currentIndex) {
    
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
    
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
    
      return array;
    } else {
      console.error('newsData is not an array: ', array);
    }
  },

});



