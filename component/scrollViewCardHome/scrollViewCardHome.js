Component({
  mixins: [],
  data: {},
  props: {},
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    handleTap(e) {
      const {link} = e.target.dataset
      this.props.onMyEvent({
        link
      })
    }
  },
});
