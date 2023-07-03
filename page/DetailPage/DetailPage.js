Page({
  data: {
    userProfile: null
  },

  onLoad(query) {
    const { id } = query; 
    my.httpRequest({
      url: 'https://dummyjson.com/users/' + id,  
      method: 'GET',
      success: (res) => {
      
        console.log(res.data)
        const responseData = res.data; 
        this.setData({
          userProfile: responseData  
        });
        
      },
      fail: (error) => {
        console.error('API Request Failed:', error);
      }
    });
  },
});