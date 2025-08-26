# 渐变生成器

![OpenAI-style gradient](./ellipses.svg)

一个基于React + TypeScript的OpenAI风格随机渐变背景生成器，支持实时预览和多种格式导出。

## ✨ 功能特点

- 🎨 **多种预设调色板**: 包含OpenAI、Sunset、Forest、Ocean等风格
- 🔄 **实时预览**: 热重载开发环境，即时查看渐变效果
- 📥 **多格式导出**: 支持SVG和PNG格式下载
- 🎯 **自定义调色板**: 轻松添加自己的配色方案
- 🚀 **现代技术栈**: React 19 + TypeScript + Bun + Tailwind CSS
- 📱 **响应式设计**: 适配各种屏幕尺寸

## 🚀 快速开始

### 环境要求
- [Bun](https://bun.sh/) (JavaScript运行时和包管理器)

### 安装和运行

```bash
# 克隆项目
git clone git@github.com:yelihu/gradient-gen.git
cd gradient-gen

# 安装依赖
bun install

# 启动开发服务器
bun dev
```

访问 http://localhost:3001 即可开始使用！

### 项目结构

```
src/
├── components/ui/     # shadcn/ui组件
├── index.tsx         # 服务器入口点
├── App.tsx           # 主应用组件
└── EllipseGenerator.tsx  # 核心渐变生成逻辑
```

## 🎨 自定义调色板

编辑 `src/EllipseGenerator.tsx` 文件，在 `colorPalettes` 对象中添加新调色板：

```typescript
const colorPalettes = {
  '你的调色板': ['#FF0000', '#FFFF00', '#FFFFFF', '#0000FF'],
  // 更多调色板...
};
```

保存文件后刷新浏览器页面，新调色板就会出现在下拉菜单中。

## 🔧 开发命令

```bash
bun dev          # 启动开发服务器
bun start        # 启动生产服务器
bun run build    # 构建生产版本
```

## 📊 技术栈

- **运行时**: Bun
- **前端**: React 19 + TypeScript
- **样式**: Tailwind CSS v4 + shadcn/ui
- **构建**: Bun内置构建器
- **服务器**: Bun内置HTTP服务器

## 🎯 使用场景

- 博客封面图片生成
- 网站背景设计
- 社交媒体配图
- 设计灵感获取
- 品牌色彩方案

---

<div align="center">

**原项目信息**

---

# gradients.venki.dev

A simple project that generates gradients in the style of OpenAI's 2020-2022 website. 
I use it to generate cover images for [my Substack blog](https://venkii.substack.com/).

The method was derived from [Justin Jay Wang's blog post](https://justinjay.wang/methods-for-random-gradients/) - which shows various gradients he tried out as a designer at OpenAI. 

The meat of the method is to generate 12 random SVG ellipses, using different random parameters sampled with the following code:
```
  {
    color: palette[Math.floor(Math.random() * palette.length)],
    fx: 0.1 + Math.random() * 0.3,
    scale: [0.7 + Math.random() * 0.8, 0.7 + Math.random() * 0.8],
    skew: -10 + Math.random() * 20,
    rotation: Math.random() * 360,
    translation: [
      -250 + Math.random() * 500,
      -250 + Math.random() * 500
    ]
  };
```
Take a look at `EllipseGenerator.tsx` for the full logic.

## Local development

This is a deployed as a static website, but uses bun for hot reloads & bundling. Thus:

To install dependencies:

```bash
bun install
```

To start a development server:

```bash
bun dev
```

</div>