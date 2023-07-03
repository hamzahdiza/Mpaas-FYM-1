Page({
  navigateTo() {
    my.navigateTo({ url: '../confirm/confirm' })
  },
  navigateBack() {
    my.navigateBack()
  },
  redirectTo() {
    my.redirectTo({ url: '../alert/alert' })
  },
  navigateToMiniProgram() {
    if (my.canIUse('navigateToMiniProgram')) {
      my.navigateToMiniProgram({
        appId: '2017072607907880',
        extraData: {
          "data1": "test"
        },
        success: (res) => {
          console.log(JSON.stringify(res))
        },
        fail: (res) => {
          console.log(JSON.stringify(res))
        }
      });
    }
  },
  navigateBackMiniProgram() {
    if (my.canIUse('navigateBackMiniProgram')) {
      my.navigateBackMiniProgram({
        extraData: {
          "data1": "test"
        },
        success: (res) => {
          console.log(JSON.stringify(res))
        },
        fail: (res) => {
          console.log(JSON.stringify(res))
        }
      });
    }
  },
  switchTab() {
    my.switchTab({
        url: '/page/tabBar/component/index',
        success: () => {
          my.showToast({
            content: '成功',
            type: 'success',
            duration: 4000
          });
        }
      }
    );
  },
})
