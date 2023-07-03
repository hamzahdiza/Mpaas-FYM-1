Component({
  mixins: [],
  data: {},
  props: {},
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    handleTap(e) {
      const { track_url, image_playlist, name_playlist } = e.target.dataset;
      this.props.onMyEvent({
        track_url, 
        image_playlist, 
        name_playlist
      });
    },
  },
});
