# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个用于生成OpenAI风格随机渐变背景的React + TypeScript单页应用。项目使用Bun作为运行时和包管理器，支持生成SVG/PNG格式的渐变图像。

## 快速启动

### 首次运行
```bash
# 安装Bun（如果未安装）
curl -fsSL https://bun.sh/install | bash

# 安装项目依赖
bun install

# 启动开发服务器
bun dev
```

### 日常开发
```bash
# 启动开发服务器（热重载）
bun dev

# 启动生产服务器
bun start

# 构建生产版本
bun run build
```

### 端口冲突处理
如果3000端口被占用，编辑 `src/index.tsx` 修改端口：
```typescript
const server = serve({
  port: 3001, // 修改为其他端口
  // ... 其他配置
});
```

## 自定义调色板

### 添加新调色板
编辑 `src/EllipseGenerator.tsx` 文件，在 `colorPalettes` 对象中添加新调色板：

```typescript
const colorPalettes = {
  '现有调色板': ['#颜色1', '#颜色2', '#颜色3', '#颜色4'],
  '你的调色板': ['#FF0000', '#FFFF00', '#FFFFFF', '#0000FF'],
  // 添加更多调色板...
};
```

### 调色板格式
- **名称**: 任意字符串，将显示在下拉菜单中
- **颜色**: 3-4个十六进制颜色值 `#RRGGBB`
- **效果**: 颜色会被随机应用到12个椭圆上

### 示例调色板
```typescript
'Fire to Ice': ['#FF0000', '#FFFF00', '#FFFFFF', '#0000FF'],
'Sunset': ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A'],
'Forest': ['#2D5016', '#61A532', '#8FBC8F', '#228B22'],
```

### 使用新调色板
1. 保存文件后刷新浏览器页面
2. 在下拉菜单中选择新添加的调色板
3. 点击"Generate New"生成渐变

## 核心架构

### 技术栈
- **运行时**: Bun (JavaScript运行时和包管理器)
- **前端**: React 19 + TypeScript
- **样式**: Tailwind CSS v4 + shadcn/ui组件库
- **构建工具**: Bun内置构建器 + 自定义构建脚本
- **后端**: Bun内置HTTP服务器

### 项目结构
```
src/
├── components/ui/     # shadcn/ui组件
├── lib/              # 工具函数
├── index.tsx         # 服务器入口点
├── frontend.tsx      # React应用入口
├── App.tsx           # 主应用组件
├── EllipseGenerator.tsx  # 核心渐变生成逻辑
└── APITester.tsx     # API测试工具

styles/
└── globals.css       # 全局样式 + Tailwind配置

build.ts              # 自定义构建脚本
```

### 关键文件说明

#### 服务器架构 (src/index.tsx:4-35)
- 使用Bun内置HTTP服务器
- 支持静态文件服务和API路由
- 开发环境启用热重载

#### 渐变生成算法 (src/EllipseGenerator.tsx:22-34)
生成12个随机椭圆的SVG渐变，核心参数：
- `color`: 从调色板随机选择颜色
- `fx`: 径向渐变的焦点位置 (0.1-0.4)
- `scale`: 椭圆缩放比例 (0.7-1.5)
- `skew`: 倾斜角度 (-10°到20°)
- `rotation`: 旋转角度 (0-360°)
- `translation`: 位移范围 (-250到250)

#### 构建系统 (build.ts:144-155)
- 支持多HTML文件入口点
- 自动处理Tailwind CSS
- 内置源码映射和代码压缩
- 灵活的CLI参数解析

## 配置文件

### TypeScript配置 (tsconfig.json)
- 使用JSX转换: `react-jsx`
- Bundler模式模块解析
- 路径别名: `@/*` 指向 `src/*`

### shadcn/ui配置 (components.json)
- 样式主题: `new-york`
- 基础颜色: `zinc`
- 启用CSS变量和前缀
- 图标库: `lucide`

### 包管理 (package.json)
- 使用Bun作为包管理器
- 开发依赖: React 19, TypeScript
- UI组件: @radix-ui, shadcn/ui
- 表单处理: react-hook-form + zod

## 开发注意事项

### 组件模式
- 所有UI组件使用shadcn/ui库
- 统一使用`@/components/ui/*`路径导入
- 表单验证使用react-hook-form + zod

### 样式系统
- 使用Tailwind CSS v4
- 支持亮色/暗色主题切换
- CSS变量通过shadcn/ui配置

### 构建输出
- 生产构建输出到`dist/`目录
- 自动处理静态资源
- 支持代码分割和源码映射

### API路由
- 示例API: `/api/hello` (GET/PUT)
- 动态路由: `/api/hello/:name`
- 返回JSON格式的响应

## 部署就绪性

项目设计为静态网站部署，构建后的文件可直接部署到任何静态托管服务。