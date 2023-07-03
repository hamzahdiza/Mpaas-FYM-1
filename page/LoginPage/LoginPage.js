Page({
  data: {
    email: '',
    password: ''
  },

  onLoad() {
    my.setNavigationBar({
      title: 'For Your Mood',
      backgroundColor: "#1CB955",
    });

    const token = my.getStorageSync({
      key: 'token' 
    }).data;

    my.hideBackHome();
  
  },

  handleEmailInput(event) {
    this.setData({
      email: event.detail.value
    });
  },
  handlePasswordInput(event) {
    this.setData({
      password: event.detail.value
    });
  },
  handleLogin() {
    const { email, password } = this.data;
    console.log("Email: ", email);
    console.log("Password: ", password);
    if (this.data.email && this.data.password) {
      my.request({
        url: 'http://localhost:3000/login', 
        method: 'POST',
        data: {
          email: this.data.email,
          password: this.data.password
        },
        success: (res) => {
          console.log(res.data, "Access Token");
          if (res.status === 200) {
            my.setStorageSync({
              key: 'token', 
              data: res.data.token
            });
  
            my.redirectTo({
              url: '/page/TermOfService/TermOfService' 
            });
          } else {
  
            my.alert({
              title: 'Login Failed',
              content: res.data.error || 'Please check your email/password',
              buttonText: 'OK'
            });
          }
        },
        fail: (err) => {
          console.log(err.data.message, ">>>>>>>>>>>>>>>>>>//");
          my.showToast({
            type: 'fail',
            content: err.data.message,
            duration: 2000,
          });
        }
      });
    } else {
      my.alert({
        title: 'Alert',
        content: 'Please enter your email and password',
        buttonText: 'OK'
      });
    }
  }
});