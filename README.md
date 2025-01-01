### 불필요한 리렌더링 방지

```jsx
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.inputItems !== this.props.inputItems) {
          return true;
        }
        return false;
    }
```

### item → component → container → page 단위로 분할해서 구현

### 대량의 데이터가 들어올 것을 생각해 batching 방법 사용

```
       this.batchInterval = setInterval(() => {
            if (this.batchData.length > 0) {
                this.setState({ orderItems: [...this.batchData] });
                this.batchData = [];
            }
        }, 1000);
```

### 테스트 케이스 작성 못한 이유

1. 작성 시간 부족
2. primereact에 대한 이해 부족 (테스트 시도 시 css error 발생)
3. WebService의 singleton pattern 사용