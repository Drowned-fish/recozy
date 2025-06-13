# Recozy

一个轻量级的 React 状态管理工具，专注于提供舒适的开发体验，🙅🏻‍♀️复杂的配置和样板代码。
（PS: 非必要不使用状态管理工具）

## 特性

- 🎯 **完整的 TypeScript 支持**：提供类型安全的状态和方法定义
- 🔄 **响应式更新**：自动追踪状态变化并更新组件
- 🚀 **批量更新优化**：使用微任务队列合并多个更新
- 🎨 **简洁的定义和使用方式**：易于学习和使用的 API 设计

## 安装

```bash
npm install recozy
```


## 基础用法

```typescript
import defineStore from 'recozy';

// 定义 store
const useCounterStore = defineStore({
  // 状态
  count: 0,
  
  // 方法
  increment() {
    this.count += 1;
  },
  
  decrement() {
    this.count -= 1;
  },
  
  async asyncIncrement() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.count += 1;
  }
});

// 在组件中使用
function Counter() {
  const [state, methods] = useCounterStore.useUniqueState();
  
  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={methods.increment}>+</button>
      <button onClick={methods.decrement}>-</button>
      <button onClick={methods.asyncIncrement}>Async +</button>
    </div>
  );
}
```

## API 参考

### defineStore

```typescript
 function defineStore<T>(initialState: T): Store<T>
```
创建一个新的 store，接收初始状态对象作为参数。该对象可以包含：

- 状态属性：普通的值或对象
- 方法：用于修改状态的函数


### useUniqueState

在组件中使用 store 的状态和方法。

```typescript
function useUniqueState(): [state: State, methods: Methods]
```
返回一个数组，包含当前状态和方法对象。

###  getState

获取当前store的快照。

```typescript
function getState(): State
```

### subscribe

订阅状态变化。返回取消订阅的函数。

```typescript
function subscribe(subscriber: (state: State) => void): () => void
```

### 支持异步方法

```typescript
const useStore = defineStore({
  data: null,
  
  async fetchData() {
    const response = await fetch('/api/data');
    this.data = await response.json();
  }
});
```

## 注意事项

store 中的方法应该使用普通函数而不是箭头函数，以确保正确的 this 绑定

```typescript
const store = createUniqueStateManager({
  count: 0,

  // ✅ 正确
  increment() {
    this.count += 1;
  },

  // 🚫 错误（箭头函数）
  badIncrement: () => {
    this.count += 1; 
  }
});
```

避免直接修改状态对象，应该通过定义的方法来修改状态

```typescript
const store = createUniqueStateManager({
  count: 0,
  
  // ✅ 正确
  increment() {
    this.count += 1;
  },
  
  // 🚫 错误（访问闭包变量）
  badIncrement() {
    currentState.count += 1; // 避免这样使用
  }
});

// ✅ 正确
methods.increment();

// 🚫 错误
state.count += 1;
```

## License

MIT