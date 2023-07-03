const app = getApp()
Page({
  onLoad() {
    setTimeout(() => {
      this.navigateToHome();
    }, 3000); 

    my.setNavigationBar({
      backgroundColor: "#121212",
    });
  },

  navigateToHome() {
    const token = my.getStorageSync({
      key: 'token',
    }).data;

    if(token) {
      my.redirectTo({
        url: '/page/TermOfService/TermOfService'
      });
    } else {
      my.redirectTo({
        url: '/page/LoginPage/LoginPage'
      });
    }
  },
});
