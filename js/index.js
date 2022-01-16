window.addEventListener('load', function () {
  // 下载app的显示二维码
  var app = document.querySelector('.topbar-download')
  app.addEventListener('mouseenter', function () {
    app.className = 'topbar-download active'
  })
  app.addEventListener('mouseleave', function () {
    app.className = 'topbar-download'
  })
  //   鼠标经过购物车，显示与隐藏方块
  var cart = document.querySelector('.cart-mini')
  var menu = document.querySelector('.site-topbar .cart-menu')
  cart.addEventListener('mouseover', function () {
    menu.style.display = 'block'
  })
  cart.addEventListener('mouseout', function () {
    menu.style.display = 'none'
  })
  // 输入框点击边框变色，且显示下拉菜单
  var searchText = document.querySelector('.search-text')
  var keyword = document.querySelector('.keyword-list')
  var searchBtn = document.querySelector('.search-btn')
  searchText.addEventListener('focus', function () {
    keyword.className = 'keyword-list'
    searchText.style.borderColor = '#ff6a00'
    searchBtn.style.borderColor = '#ff6a00'
  })
  searchText.addEventListener('blur', function () {
    keyword.className = 'keyword-list hide'
    searchText.style.borderColor = '#e0e0e0'
    searchBtn.style.borderColor = '#e0e0e0'
  })
  // 滑动到K40背景图时，显示回顶部的电梯导航
  var backtop = document.querySelector('.backtop')
  var homeBanner = document.querySelector('.home-banner-box')
  var bannerTop = homeBanner.offsetTop
  // 页面滚动事件
  document.addEventListener('scroll', function () {
    // 当页面滚动到盒子，就显示返回顶部盒子
    if (window.pageYOffset >= bannerTop) {
      backtop.style.display = 'block'
    } else {
      backtop.style.display = 'none'
    }
  })
  // 当点击了返回顶部模块，就让窗口滚动到页面最上方
  // 滚动窗口至文档的特定位置
  // window.scroll(x,y)
  backtop.addEventListener('click', function () {
    animate(window, 0)
  })

  // 轮播图
  // 1. 鼠标经过轮播图，停止播放
  var focus = document.querySelector('.home-hero-swiper')
  var prev = document.querySelector('.swiper-button-prev')
  var next = document.querySelector('.swiper-button-next')
  focus.addEventListener('mouseover', function () {
    clearInterval(timer)
    // 清除定时器变量
    timer = null
  })
  // 鼠标离开轮播图，继续播放
  focus.addEventListener('mouseout', function () {
    timer = setInterval(function () {
      // 手动调用点击事件
      next.click()
    }, 2000)
  })
  // 第2个模块：动态生成小圆点（为方便之后增删图片，且图片与底下小圆点的匹配）
  var ul = focus.querySelector('ul')
  var ol = focus.querySelector('.swiper-pagination')
  var focusWidth = focus.offsetWidth
  for (var i = 0; i < ul.children.length; i++) {
    // 创建一个 li
    var li = document.createElement('li')
    // 记录当前小圆圈的索引号，通过自定义属性
    li.setAttribute('index', i)
    // 把小li插入到ol里
    ol.appendChild(li)
    // 第3个模块:小圆圈排他思想 我们可以直接在小圆圈生成的同时，直接绑定点击事件
    li.addEventListener('click', function () {
      // 干掉所有人 把所有小li清除selected这个类
      for (var i = 0; i < ol.children.length; i++) {
        ol.children[i].className = ''
      }
      // 留下我自己 给自己添加selected这个类
      this.className = 'swiper-pagination-bullet-active'
      // 第4个模块:点击小圆圈，实现图片滑动效果 移动的是ul
      // ul 的移动距离 小圆圈的索引号乘以图片的宽度 注意是负值
      // 当我们点击了某个小li，就拿到当前小li 的索引号
      var index = this.getAttribute('index')
      // 当我们点击了某个小li，就把这个li的索引号给num
      num = index
      // 当我们点击了某个小li，就把这个li的索引号给circle
      circle = index
      animate(ul, -index * focusWidth)
    })
  }
  // 把ol里面的第一个小li设置类名
  ol.children[0].className = 'swiper-pagination-bullet-active'
  // 点击右侧按钮一次，就让图片滚动一张
  var first = ul.children[0].cloneNode(true)
  ul.appendChild(first)
  var num = 0
  // circle控制小圆圈的播放
  var circle = 0
  // flag 节流阀
  var flag = true
  // 右侧按钮
  next.addEventListener('click', function () {
    if (flag) {
      // 关闭节流阀
      flag = false
      // 如果走到了最后复制的一张图片，此时，我们的ul要快速复原 left改为0
      if (num == ul.children.length - 1) {
        ul.style.left = 0
        num = 0
      }
      num++
      animate(ul, -num * focusWidth, function () {
        // 打开节流阀
        flag = true
      })
      // 第6个模块：点击右侧按钮，小圆圈跟随变化
      // 最简单的做法是再声明一个变量circle，每次点击自增1，注意，左侧按钮也需要这个变量，所以声明为全局变量
      // 但图片有5张，小圆圈只有4个，少一个，必须加一个判断条件
      // 如果circle==4就重新复原为0
      circle++
      // 如果circle=4 说明走到最后我们克隆的这张图片了，我们就复原
      if (circle == ol.children.length) {
        circle = 0
      }
      // 调用函数
      circleChange()
    }
  })
  // 左侧按钮
  prev.addEventListener('click', function () {
    if (flag) {
      flag = false
      // 如果走到了最后复制的一张图片，此时，我们的ul要快速复原 left改为0
      if (num == 0) {
        num = ul.children.length - 1
        ul.style.left = -num * focusWidth + 'px'
      }
      num--
      animate(ul, -num * focusWidth, function () {
        flag = true
      })
      // 第6个模块：点击右侧按钮，小圆圈跟随变化
      // 最简单的做法是再声明一个变量circle，每次点击自增1，注意，左侧按钮也需要这个变量，所以声明为全局变量
      // 但图片有5张，小圆圈只有4个，少一个，必须加一个判断条件
      // 如果circle==4就重新复原为0
      circle--
      // 如果circle<0 说明第一张图片，则小圆圈要改为第4个小圆圈(3)
      if (circle < 0) {
        circle = ol.children.length - 1
      }
      circleChange()
    }
  })
  function circleChange() {
    // 先清除其他小圆圈的selected类
    for (var i = 0; i < ol.children.length; i++) {
      ol.children[i].className = ''
    }
    // 留下当前的小圆圈的swiper-pagination-bullet-active类
    ol.children[circle].className = 'swiper-pagination-bullet-active'
  }
  // 第8个模块：自动播放 定时器
  var timer = setInterval(function () {
    // 手动调用点击事件
    next.click()
  }, 2000)
})
