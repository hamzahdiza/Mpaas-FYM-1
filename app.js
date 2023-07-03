
App({
  onLaunch(options) {
    console.log('App Launch', options);
    console.log('getSystemInfoSync', my.getSystemInfoSync());
    console.log('SDKVersion', my.SDKVersion);
    my.on('nativeToTiny', (res) => {
      my.showToast({
        type: 'none',
        content: JSON.stringify(res),
        duration: 3000,
        success: () => {
          
        },
        fail: () => {
          
        },
        complete: () => {
          
        }
      });
    })

    this.globalData.isLoading = false
  },
  
  onShow() {
    console.log('App Show');
  },
  onHide() {
    console.log('App Hide');
  },
  globalData: {
    isLoading: false,
    counter: 0, 
    handleExpiredToken(res){
      if (res.status === 403 || res.status === 401) {
        console.log("Masyk sisu kagak");

        if (this.counter >= 3) { 
          console.log("Max retries reached");
          this.counter = 0; 
          return;
        }
  
        const token = my.getStorageSync({
          key: 'token' 
        }).data
  
        my.request({
          url: 'http://localhost:3000/token',
          method: 'POST',
          data: {
            token: token,
          },
          success: (res) => {
            if (res.status === 200) {
              const newAccessToken = res.data.access_token;
  
              my.setStorageSync({
                key: 'access_token', 
                data: newAccessToken
              });
              
              console.log("Berhasil");

              const pages = getCurrentPages();
              const currentPage = pages[pages.length - 1];
              // console.log(currentPage, "INI CURRETN PAGE");

              if (currentPage.onPullDownRefresh) {
                console.log("adaE");
                currentPage.onPullDownRefresh();
              }
            }
          },
          fail: (res) => {
            if (res.status === 403 || res.status === 401 || res.status === 500) {
              let pages = getCurrentPages(); 
              let currentPage = pages[pages.length - 1];
              let url = currentPage.route; 
  
              my.setStorageSync({key: 'lastPage', data: url});
              my.reLaunch({ url: '/page/LoginPage/LoginPage' });
              my.removeStorageSync({
                key: "access_token"
              })
              my.removeStorageSync({
                key: "token"
              })
            }
          },
        });

        this.counter++;
      }
    }
  },
});
