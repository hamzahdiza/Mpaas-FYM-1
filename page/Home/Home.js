
// Page({
//   data: {
//     userList: null,
//     page: 1,
//     showLoading: false,
//     searchKeyword: null
//   },

//   onLoad() {
//     this.loadData();
//   },

//   loadData() {
//     const apiUrl = `https://dummyjson.com/users?limit=10`;
//     this.setData({
//       showLoading: true,
//       userList: null
//     });

//     my.httpRequest({
//       url: apiUrl,
//       method: 'GET',
//       success: (res) => {
//         const newUsers = res.data;
//         this.setData({
//           userList: newUsers,
//         });
//         console.log(newUsers, "<<<<<<<<<<")

//         this.setData({
//           showLoading: false,
//         });
//       },
//       fail: (error) => {
//         console.error('API Request Failed:', error);
//         this.setData({
//           showLoading: false,
//         });
//       }
//     });
//   },

//   loadMoreData() {
//     const { page } = this.data;
//     const apiUrl = `https://dummyjson.com/users?limit=${page * 10}`;
//     this.setData({
//       showLoading: true,
//     });

//     my.httpRequest({
//       url: apiUrl,
//       method: 'GET',
//       success: (res) => {
//         const newUsers = res.data;
//         this.setData({
//           userList: newUsers,
//           page: page + 1,
//           showLoading: false,
//         });
//         console.log(newUsers, "<<<<<<<<<<")
//       },
//       fail: (error) => {
//         console.error('API Request Failed:', error);
//         this.setData({
//           showLoading: false,
//         });
//       }
//     });
//   },

//   handleCardTap(e) {
//     const { id } = e.target.dataset;
//     my.navigateTo({
//       url: '/page/DetailPage/DetailPage?id=' + id,
//     });
//   },


//   handleSearchInput(e) {
//     const keyword = e.detail.value.trim();
//     console.log(keyword, "Keyword<<");
//     this.setData({
//       searchKeyword: keyword
//     })
//   },

//   searchUser() {
//     const keyword = this.searchKeyword
//     console.log(keyword, "Search Keyword <<<");
//     this.setData({
//       userList: null
//     })
//     // if (this.searchKeyword.length > 0) {
//     //   this.setData({
//     //     userList: null
//     //   })
//     //   my.httpRequest({
//     //     url: `https://dummyjson.com/users/search?q=${this.searchKeyword}`,
//     //     method: 'GET',
//     //     success: (res) => {
//     //       this.setData({
//     //         userList: res.data,
//     //       });
//     //       console.log(res.data, "Search <<<");
//     //     },
//     //     fail: (error) => {
//     //       console.error('API Request Failed:', error);
//     //     }
//     //   });
//     // } else {
//     //   this.loadData()
//     // }
//   }
  

// });

Page({
  data: {
    userList: [],
    timer: null,
    page: 1,
    showLoading: false,
    searchInputValue: ""
  },

  onLoad(){
    this.loadDefaultData()
  },

  loadDefaultData() {
    this.setData({
      showLoading: true,
    });
    my.request({
      url: 'https://dummyjson.com/users?limit=10',
      success: (res) => {
        this.setData({
          userList: res.data,
          showLoading: false
        });
      },
      fail: (error) => {
        console.error('API Request Failed:', error);
        this.setData({
          showLoading: false,
        });
      }
    });
  },

  loadMoreData() {
    const { page } = this.data;
    const apiUrl = `https://dummyjson.com/users?limit=${page * 10}`;
    this.setData({
      showLoading: true,
    });

    my.httpRequest({
      url: apiUrl,
      method: 'GET',
      success: (res) => {
        const newUsers = res.data;
        this.setData({
          userList: newUsers,
          page: page + 1,
          showLoading: false,
        });
        console.log(newUsers, "<<<<<<<<<<")
      },
      fail: (error) => {
        console.error('API Request Failed:', error);
        this.setData({
          showLoading: false,
        });
      }
    });
  },

  handleCardTap(e) {
    const { id } = e.target.dataset;
    my.navigateTo({
      url: '/page/DetailPage/DetailPage?id=' + id,
    });
  },

  handleSearchInput(e) {
    clearTimeout(this.data.timer);

    const value = e.detail.value.trim();

    if (value !== '') {
        this.setData({
          searchInputValue: value
        })
    } else {
      this.loadDefaultData();
    }
  },

  handleSearchButton() {
    const searchValue = this.data.searchInputValue.trim();

    if (searchValue !== '') {
      this.searchUser(searchValue);
    } else {
      this.loadDefaultData();
    }
  },


  searchUser(query) {
    this.setData({
      showLoading: true,
    });
    my.request({
      url: `https://dummyjson.com/users/search?q=${query}`,
      success: (res) => {
        this.setData({
          userList: res.data,
          showLoading: false
        });
        
      },
      fail: (error) => {
        console.error('API Request Failed:', error);
        this.setData({
          showLoading: false,
        });
      }
    });
  },
});


 