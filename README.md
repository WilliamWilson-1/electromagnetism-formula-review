# 电磁学公式复习站

依据《电磁学复习提纲：大纲、公式与解题思路》制作的交互式公式索引。课程范围为静电场、导体、电介质、电容、电场能量、传导电流与电动势、稳恒磁场、磁场力和带电粒子运动。

## 在线网站

[打开电磁学公式复习站](https://williamwilson-1.github.io/electromagnetism-formula-review/)

GitHub Pages 使用 `gh-pages` 分支的根目录发布，发布内容与 `dist/` 一致。`.nojekyll` 使 GitHub 直接提供静态 HTML、CSS、JavaScript 与本地公式字体。所有资源采用相对路径，兼容项目子路径。

## 使用

- 按 11 个章节浏览；搜索公式名称、变量、条件和解题提示。
- 筛选基本定律、定义关系、典型模型或受力运动。
- 点击公式打开详情；Escape 关闭；按 `/` 聚焦搜索。
- “做题思路”展示六步方法、三个模板、题型选择与易错点。
- 使用本地 KaTeX 与字体，支持行内及独立公式；移动端长公式局部横向滚动。

## 本地运行

```sh
npm install
npm run vendor
npm run check
npm run dev
```

打开 http://localhost:4173 。纯静态文件在 `dist/`，可直接托管，无后端与账号数据库。

## 内容来源与范围

课程公式来自最近整理的 Markdown 提纲，下载副本在 `dist/review-outline.md`。结构化公式与变量解释位于 `dist/data.js`、`dist/content.js`。源课件为第10章静电场 A、第10章静电学 B、第11章静磁场 A。未上传原始课程 PDF。

原提纲中的连续分布电场表格被竖线分隔符截断，网页恢复了本次任务此前已经整理的完整积分表达式，并修复安培力公式中的逗号排版问题。其余公式仅拆分、调整 LaTeX 排版和解释变量，不扩展课程章节。

界面风格参考 [animation-vocabulary](https://github.com/stan-rym/animation-vocabulary) 的浅灰底色、绿色强调与轻量卡片交互，未复制其动画实现或添加课程外内容。KaTeX 的许可随文件保留在 `dist/vendor/katex/LICENSE`。

## 项目结构

```text
dist/index.html        页面与可访问性结构
dist/styles.css       桌面及移动端样式
dist/data.js          章节、变量和基础公式
dist/content.js       完整公式与做题思路
dist/app.js           搜索、筛选、导航、详情交互
dist/vendor/katex/    本地公式引擎和字体
scripts/check.mjs    公式解析、数据完整性与资源检查
```

支持减少动效设置、键盘导航、详情焦点约束与可访问的数学标记。支持浏览器的 WebMCP 功能时也可调用 `search_formulas`、`open_formula_detail`。
