import defineStore from "recozy";

const useCounterStore = defineStore({
  count: 0,
  increment() {
    this.count += 1;
  },
  decrement() {
    this.count -= 1;
  },
  reset() {
    this.count = 0;
  },
});

export default useCounterStore;
