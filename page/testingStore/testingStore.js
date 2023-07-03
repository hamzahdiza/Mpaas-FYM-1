// // somePage.js
// import { createStoreBindings } from "mobx-miniprogram-bindings";
// import { store } from "../../store/store";

// Page({
//   onLoad() {
//     // create bindings
//     this.storeBindings = createStoreBindings(this, {
//       store,
//       fields: ['numA', 'numB', 'sum'], // fields you want to observe from the store
//       actions: ['update'], // actions from the store you want to use
//     });
//   },
//   onUnload() {
//     // destroy bindings on unload
//     this.storeBindings.destroyStoreBindings();
//   },
//   handleUpdate() {
//     this.update();
//   },
// });
