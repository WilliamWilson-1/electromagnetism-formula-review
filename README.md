# 电磁学公式复习站

依据《电磁学复习提纲：大纲、公式与解题思路》制作的交互式公式索引。课程范围为静电场、导体、电介质、电容、电场能量、传导电流与电动势、稳恒磁场、磁场力和带电粒子运动。

## 在线网站

[打开电磁学公式复习站](https://williamwilson-1.github.io/electromagnetism-formula-review/)

GitHub Pages 使用 `gh-pages` 分支的根目录发布，发布内容与 `dist/` 一致。`.nojekyll` 使 GitHub 直接提供静态 HTML、CSS、JavaScript 与本地公式字体。所有资源采用相对路径，兼容项目子路径。

## 使用

- 按 11 个章节浏览；搜索公式名称、变量、条件和解题提示。
- 筛选基本定律、定义关系、典型模型或受力运动。
- 11 个章节下按 34 个模型与关系分类折叠，支持展开/收起全部；搜索或筛选时自动展开匹配分类，清除筛选后保留手动折叠状态。
- 每条公式包含 3 步推导或关系说明、物理量反解与适用条件（总计 249 步说明、167 个求量条目），可跳转到关联公式。基本定律、定义和模型推导分别标明性质。
- 点击公式打开详情；Escape 关闭；按 `/` 聚焦搜索。卡片预览适用场景和可求物理量，详细推导与变量可按区块折叠。
- “做题思路”展示六步方法、三个模板、题型选择与易错点。
- “总结辨析”按 12 类物理量比较不同求法，包含 16 组易错辨析、5 条综合路线与六项自检；关联公式覆盖全部 83 条，点击即可查看详情。可通过 `#summary` 直达。
- “小测试”提供 66 道单项选择题，覆盖 11 章的公式、知识点和解法。可选章节、题型和 5/10/15 题；混合抽题兼顾题型与章节，题目及选项随机排列，一轮内不重复。提交后显示答案、解析与关联公式；结束后查看成绩、错题回顾、重练错题或重新抽题。范围不足时抽取全部题目，可通过 `#quiz` 直达。
- 按 Apple 的材质层次重构：浮动导航、搜索、筛选和操作控件使用统一的玻璃材质，阅读卡片使用清晰的标准材质；圆润轮廓、高光边缘、柔和阴影和轻微光泽统一管理，标签指示器平滑滑动。鼠标附近高光跟随，触屏与减少动效模式保持静态显示。
- 四个复习视图使用透明玻璃分段控件，取消旧版选中下划线。可用鼠标或手指按住横向拖动，滑块连续跟随、松开后吸附到最近选项；支持点击及方向键、Home/End，竖向手势保留页面滚动。取消或中断拖动会回到原选项，切换视图保留搜索和答题状态。
- 右上角“外观设置”支持跟随系统、浅色和深色，以及减少透明效果；选择保存在当前浏览器。支持系统减少透明度、增加对比度、减少动效与强制配色；不支持背景模糊的浏览器使用实色回退。
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

## 材质设计依据

- [Apple：采用 Liquid Glass](https://developer.apple.com/cn/documentation/technologyoverviews/adopting-liquid-glass) 与 [HIG：Materials](https://developer.apple.com/design/human-interface-guidelines/materials)：以导航和控件形成独立的功能层，避免密集内容与嵌套控件过度使用玻璃效果；本网站以 regular 材质的可读性作为方向。
- [用户提供的 Liquid Glass 网页指南](https://github.com/Joe-Mu-Yu/Joe-Mu-Yu.github.io/blob/main/LIQUID-GLASS-GUIDE.md)：参考边缘光、多层阴影、光泽及移动端降低模糊的实现思路。CSS 的具体透明度、模糊和阴影数值为本网站自定参数。

这里使用 HTML/CSS 实现网页材质近似，并非 Apple 原生的 Liquid Glass 渲染器。公式、推导与课程范围保持原有内容。

## 项目结构

```text
dist/index.html        页面与可访问性结构
dist/styles.css       桌面及移动端样式
dist/materials.css    玻璃功能层、阅读层、主题与可访问性样式
dist/materials.js     外观偏好、标签指示器与局部光泽响应
dist/segments.js      玻璃分段控件的拖动、吸附与手势处理
dist/data.js          章节、变量和基础公式
dist/content.js       完整公式与做题思路
dist/summary.js       按物理量的求法、易错辨析与关联公式
dist/learning.js      公式推导、物理量反解与模型分类
dist/quiz-data.js     基于现有内容的 66 道选择题及解析
dist/quiz-engine.js   抽题、选项打乱与评分
dist/quiz-ui.js       小测试设置、答题及错题回顾
dist/app.js           搜索、筛选、导航、详情交互
dist/vendor/katex/    本地公式引擎和字体
scripts/check.mjs    公式解析、数据完整性与资源检查
scripts/check-interactions.mjs  页面路由与交互的 DOM 模拟检查
scripts/check-quiz.mjs  随机抽题、判分、解析与错题重练检查
scripts/check-materials.mjs  材质语法、阅读配色对比度与外观偏好检查
scripts/check-segments.mjs  拖动切换、触摸/点击/键盘与取消行为检查
```

支持减少动效设置、键盘导航、详情焦点约束与可访问的数学标记。支持浏览器的 WebMCP 功能时也可调用 `search_formulas`、`open_formula_detail`。

`npm run check` 校验公式、推导、反解、题库与引用，保证每条公式恰好归入一个分类；DOM 模拟验证折叠、搜索、导航、全部详情、关联跳转和测试流程。随机抽题检查验证题型及章节分布、不重复、选项乱序、范围限制与判分。材质检查验证 CSS 解析、浅/深色阅读与反馈配色的 4.5:1 对比度、外观保存、系统偏好与标签定位；对比度检查针对指定实色角色，不覆盖每个实际背景像素。该检查不替代真实浏览器中的桌面/移动布局与视觉检查。
