# 记录
```
  我要写英文恶心自己
```
# 记录
```
 data: {
      text1: 'text1',
      text2: 'text2',
      text3: 'text3'
  }
  !!!有些属性实际模板中并没有被用到，列如text3，然而当text3的数据被修改的时候（this.text3 = 'test'）的时候，同样会触发text3的setter导致重新执行渲染，这显然不正确。
```

https://ruphi.cn/archives/336/

在Vue依赖收集里：谁是观察者？谁是观察目标？
显然：


依赖的数据是观察目标
视图、计算属性、侦听器这些是观察者
和文章开头里观察者模式实现代码相对应的，做出notify动作可以在setter里进行，做出addObserver()动作，则可以在getter里进行。


Dep：扮演观察目标的角色，每一个数据都会有Dep类实例，它内部有个subs队列，subs就是subscribers的意思，保存着依赖本数据的观察者，当本数据变更时，调用dep.notify()通知观察者
Watcher：扮演观察者的角色，进行观察者函数的包装处理。如render()函数，会被进行包装成一个Watcher实例
Observer：辅助的可观测类，数组/对象通过它的转化，可成为可观测数据


由于JavaScript是单线程模型，所以虽然有多个观察者函数，但是一个时刻内，就只会有一个观察者函数在执行，那么此刻正在执行的那个观察者函数，所对应的Watcher实例，便会被赋给Dep.target这一类变量，从而只要访问Dep.target就能知道当前的观察者是谁。
在后续的依赖收集工作里，getter里会调用dep.depend()，而setter里则会调用dep.notify()