Page({
  tinyToNative() {
    my.call('tinyToNative', {
      param1: 'p1aaa',
      param2: 'p2bbb'
    }, (result) => {
      console.log(result);
      my.showToast({
        type: 'none',
        content: result.message,
        duration: 3000,
      });
    })
  }
});
