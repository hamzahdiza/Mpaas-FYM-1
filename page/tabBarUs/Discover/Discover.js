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
    filteredNews: [],
    searchInputValue: null,
    isLoading: false,
    scroll: false
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
    this.setData({
      currentTab: tab_section,
    });

    console.log(this.data.currentTab, this.data.activeTab, "<<<<<<<<FFFFFFFFFFFFFFF");
    await this.loadNews();

  },

  async onLoad() {
    await this.loadNews();


    my.setNavigationBar({
      backgroundColor: "#1CB955",
    });
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

  async onReachBottom() {
    this.setData({
      limit: 10,
      offset: this.data.offset + 10,
      scroll: true
    });

    try {
      const newsData = await this.loadNews();
      this.handleStoreData(newsData)
    } catch (err) {
      console.log(err);
    } 
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

  handleEventTrack(e) {
    my.navigateTo({
      url: "/page/newsPage/Webview/Webview?link=" + e.link,
    });
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

  handleSearchInput(e) {
    const value = e.detail.value.trim()

    if(value !== ''){
      this.setData({
        searchInputValue: value
      })
    } else {
      this.setData({
        filteredNews: []
      })
    }
    // console.log(value, "<<<<KKKKK");
  },

  handleSearchButton(e) {
    const access_token = my.getStorageSync({
      key: 'access_token' 
    }).data

    const searchValue = this.data.searchInputValue

    if(searchValue !== ""){
  
      my.request({
        url: "http://localhost:3000/search-news",
        method: "POST",
        headers: {
          access_token: access_token
        },
        data: {
          query: searchValue
        },
        success: (res) => {
          this.setData({
            filteredNews: res.data.dataSearch
          })

          console.log(this.data.filteredNews, "HASILLLNYAYAYA");
        },
        fail: (res) => {
          app.globalData.handleExpiredToken(res)
        },
      })
    }
  },
});

