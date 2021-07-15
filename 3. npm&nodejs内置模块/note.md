## npm是什么
- Node.js的包管理工具

## 包是什么
- 别人写的Node.js模块

```
npm uninstall XXX // 卸载
```

## Node.js内置模块
- File System 操作操作系统上的文件
- Net 使用操作系统的网络能力
- Process 记载nodejs进程信息
- OS 跟操作系统相关的事情
- EventEmitter 
  - 观察者模式
  - 调用 vs 抛事件
    - 关键在于“不知道被通知者存在”
    - 以及“没有人听还能继续下去”