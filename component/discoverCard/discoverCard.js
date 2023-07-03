Component({
  mixins: [],
  data: {},
  props: {},
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    handleTap(e) {
      const { link } = e.target.dataset;
      console.log(link, "ZZZZZZZZzz");
      this.props.onMyEvent({
        link
      });
    }
  },
});
