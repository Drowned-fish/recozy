import { renderHook, act } from '@testing-library/react-hooks';
import defineStore from '../src';

describe('defineStore', () => {
  // 测试基本状态管理
  it('should manage state correctly', async () => {
    const useCounterStore = defineStore({
      count: 0,
      increment() {
        this.count += 1;
      },
      decrement() {
        this.count -= 1;
      }
    });

    const { result, waitForNextUpdate } = renderHook(() => useCounterStore.useUniqueState());

    // 测试初始状态
    expect(result.current[0].count).toBe(0);

    // 测试方法调用
    await act(async () => {
      result.current[1].increment();
    });
    expect(result.current[0].count).toBe(1);

    await act(async () => {
      result.current[1].decrement();
    });
    expect(result.current[0].count).toBe(0);
  });

  // 测试异步方法
  it('should handle async methods correctly', async () => {
    const useAsyncStore = defineStore({
      data: null as string | null,
      async fetchData() {
        await new Promise(resolve => setTimeout(resolve, 100));
        this.data = 'test data';
      }
    });

    const { result } = renderHook(() => useAsyncStore.useUniqueState());

    await act(async () => {
      await result.current[1].fetchData();
    });
    expect(result.current[0].data).toBe('test data');
  });

  // 测试订阅功能
  it('should handle subscriptions correctly', async () => {
    const useStore = defineStore({
      value: 0,
      increment() {
        this.value += 1;
      }
    });

    const subscriber = jest.fn();
    const unsubscribe = useStore.subscribe(subscriber);

    // 测试订阅回调
    await act(async () => {
      useStore.methods.increment();
    });

    expect(subscriber).toHaveBeenCalledWith({ value: 1 });

    // 测试取消订阅
    unsubscribe();
    await act(async () => {
      useStore.methods.increment();
    });
    expect(subscriber).toHaveBeenCalledTimes(1);
  });

  // 测试 getState 方法
  it('should return current state snapshot', async () => {
    const useStore = defineStore({
      value: 0,
      increment() {
        this.value += 1;
      }
    });

    expect(useStore.getState()).toEqual({ value: 0 });

    await act(async () => {
      useStore.methods.increment();
    });

    expect(useStore.getState()).toEqual({ value: 1 });
  });

  // 测试批量更新
  it('should batch multiple updates', async () => {
    const useStore = defineStore({
      count: 0,
      increment() {
        this.count += 1;
      }
    });

    const { result } = renderHook(() => useStore.useUniqueState());

    await act(async () => {
      result.current[1].increment();
      result.current[1].increment();
      result.current[1].increment();
    });

    expect(result.current[0].count).toBe(3);
  });
});