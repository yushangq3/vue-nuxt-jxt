# vue-nuxt-jxt

> Nuxt.js project

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).


## 记采用ssr 踩得第一个大坑

# 问题描述

vuex 使用状态管理 时 如果 服务端改变store.state值，会导致state值在服务器中全部改变，相当于其它用户访问的数据和第一个用户访问的数据相同

#解决方案
vuex 中 state 同样采用函数方式，而不是直接声明，原理推测 与vue 组件 data 一样 ，初步推测是由于浅拷贝导致的，每创建一个store 对象 ，state值只是浅拷贝。


