// Keep the downloadable Markdown aligned with the source-backed course extension.
import fs from 'node:fs';
import vm from 'node:vm';
const sandbox={window:{}};
for(const file of ['data','content','summary','learning','quiz-data','course-update','course-quiz'])vm.runInNewContext(fs.readFileSync(`dist/${file}.js`,'utf8'),sandbox);
const d=sandbox.window.REVIEW_DATA,filename='../电磁学复习提纲_公式与解题思路.md';
const marker='\n## 7. 新增课件大纲与公式';
let original=fs.readFileSync(filename,'utf8').split(marker)[0].trimEnd();
original=original.replace(/^> 依据[^\n]+/m,'> 更新于 **2026-10-17**。依据五份课件：第10章静电场 A、第10章静电学 B、第11章静磁场 A、**新增第11章静磁场 B（30页）与第12章变化的电磁场（109页）**。现已覆盖静电学、稳恒磁场与磁介质、电磁感应、自感互感、磁场能量、位移电流、麦克斯韦方程组、平面电磁波及振荡电偶极子辐射。网页同步为 **21 个主题、134 条公式与关系、54 个分类、126 道选择题**。');
if(!original.includes('变化 D ──> 位移电流'))original=original.replace('                                洛伦兹力、粒子轨道 <───┘','                                洛伦兹力、粒子轨道 <───┘\n自由电流 ──> H ──介质本构──> B、M ──> 磁化电流与磁滞\n变化磁通 ──> 感应电动势 ──> 自感/互感 ──> 磁场储能\n变化 D ──> 位移电流 ──> 全电流定律 ──> 麦克斯韦方程组\n变化 E、B 相互耦合 ──> 电磁波 ──> 能流与偶极辐射');
if(!original.includes('| 静磁场 B：'))original=original.replace('\n## 1. 记号','\n| 静磁场 B：§11-6～11-9 | 磁介质、磁化强度、磁化电流、H、铁磁质 | 先求 H，再求 B 和 M；辨认磁滞曲线 |\n| 变化电磁场：§12-1～12-6、12-8～12-11 | 电磁感应、自感互感、场能、位移电流、麦克斯韦方程组、波与辐射 | 从磁通变化到时变场耦合及能量传播 |\n\n## 1. 记号');
if(!original.includes('6. 介质磁场'))original=original.replace('**最后自测**','6. 介质磁场：先分自由电流与束缚电流，按 H 环路、介质关系、磁化电流的顺序练习。\n7. 电磁感应：从磁通链变化与楞次定律出发，分动生、感生；导轨题联立电路与力学。\n8. 自感互感与磁能：练“设电流—求场—算链—约电流”；比较相助相消与能量积分。\n9. 位移电流与麦克斯韦方程：检查固定曲面、自由源及时间导数。\n10. 平面波与偶极辐射：先确认无耗散、远区等模型，再处理比例、相位、平均与面积积分。\n\n**最后自测**');
const intro=`${marker}（2026-10-17）

### 7.1 新旧范围对照与优先级

原第 0～6 节保留静电学与静磁场 A 的复习结构；下面接续新课件。**课件中出现不等于必考权重**，本提纲不推断老师未说明的考试范围。

| 主题 | 课件与小节 | 核心问题 |
| --- | --- | --- |
${d.chapters.filter(c=>d.course.newChapterIds.includes(c.id)).map(c=>`| ${c.title} | ${c.source} · ${c.section} | ${c.description} |`).join('\n')}

页码索引：静磁场 B 的磁介质 2～9 页、磁化 10～16 页、H 与本构 17～26 页、铁磁质 27～30 页；变化的电磁场的基本感应 3～20 页、动生 22～35 页、感生 36～47 页、自感互感 48～64 页、磁能 65～71 页、位移电流 73～86 页、麦克斯韦 87～94 页、波动与平面波 95～105 页、辐射 106～108 页。

**符号约定**：磁化强度用矢量 $\\mathbf M$（A/m），互感系数用标量 $M$（H）；课件的表面磁化电流密度 $J$ 在网页记作 $K_b$（A/m），与体电流密度 $j$（A/m²）区分。长度优先用 $\\ell$，自感用 $L$；能量密度用 $w$，角频率用 $\\omega$；磁通 $\\Phi_m$（Wb）与电位移通量 $\\Phi_D$（C）分开。

**阅读提示**：第12章的小节编号由 12-6 跳到 12-8，依课件保留，不补造 12-7。涡电流列为感生电场的实验证据；电子感应加速器为课件标注的自学提示，本次不额外补充其公式。波谱按课件识记无线电、红外、可见、紫外、X 与 γ 射线的顺序；未展开课件外的交流电网络与辐射理论。

### 7.2 新增公式、适用条件与求量路线

基本定律和定义标为关系说明；模型结果给出推导步骤。电动势与电流均先选参考正方向，大小式不会自动提供极性。
`;
let extension=intro;
for(const c of d.chapters.filter(c=>d.course.newChapterIds.includes(c.id))){
  extension+=`\n#### ${c.number}. ${c.title}（${c.section}）\n\n${c.description}\n`;
  for(const g of d.groups.filter(g=>g.chapter===c.id)){
    extension+=`\n**${g.title}**：${g.description}\n`;
    for(const id of g.ids){
      const f=d.formulas.find(f=>f.id===id),l=d.learning[id];
      extension+=`\n##### ${f.title}\n\n$$\n${f.latex}\n$$\n\n- **适用条件**：${f.condition}\n- **符号与单位**：${f.variables.map(([s,n])=>`$${s}$：${n}`).join('；')}\n- **${l.kind}**：${l.steps.map(([text,latex])=>text+(latex?` $${latex}$`:'')).join(' → ')}\n- **物理量求法**：${l.solves.map(([name,latex,note])=>`${name} $${latex}$；${note}`).join('；')}\n- **解题提示**：${f.hint}\n- **课件定位**：${f.source}。\n`;
    }
  }
}
extension+='\n### 7.3 铁磁质与磁滞：公式以外的辨析\n\n- 顺磁质：固有磁矩趋向外场取向，附加磁场通常加强外场，μr 略大于 1。\n- 抗磁质：外场引起反向附加磁矩，μr 略小于 1；抗磁效应也存在于其他物质，但可能被更强效应掩盖。\n- 铁磁质：高磁导率、非线性和磁滞，当前 H 不足以唯一决定 B。先认分支，再读剩磁 Br 和矫顽力 Hc。\n- 硬磁：通常回线宽、矫顽力大，适合永磁；软磁：通常回线窄、矫顽力小，适合电磁铁和变压器铁芯。剩磁大小不是唯一分类依据。\n';
extension+='\n### 7.4 求同一物理量的不同方式\n\n| 目标 | 可选方法 | 先检查什么 |\n| --- | --- | --- |\n';
for(const target of d.summary.targets.filter(t=>d.course.newChapterIds.includes(t.id)))extension+=`| ${target.title} | ${target.methods.map(m=>m.title).join('；')} | ${target.check} |\n`;
extension+='\n### 7.5 新增综合解题路线\n';
for(const chain of d.summary.chains.slice(-5))extension+=`\n- **${chain.title}**：${chain.steps.join(' → ')}。${chain.note}\n`;
extension+='\n**混合变化示例（第12章16～17页）**：三角线框与长直导线共面，竖边 a、水平宽 b、近端距离 x，源电流 I 变化且 x 也变化。先积窄条而非取中心场乘总面积：\n\n$$\n\\Phi_m(I,x)=\\frac{\\mu_0aI}{2\\pi b}\\left[(x+b)\\ln\\frac{x+b}{x}-b\\right],\\qquad\n\\mathcal E=-\\left(\\frac{\\partial\\Phi_m}{\\partial I}\\dot I+\\frac{\\partial\\Phi_m}{\\partial x}\\dot x\\right).\n$$\n\n一个贡献来自源电流变化，另一个来自运动；整体求导后再按正方向判断符号，避免重复计入动生项。\n';
extension+='\n### 7.6 新增易错速查\n';
for(const p of d.summary.pitfalls.slice(-11))extension+=`\n- **${p.title}**：${p.right} 自检：${p.check}\n`;
extension+='\n### 7.7 自测与答案\n\n1. 同一电流产生的 H 求出后，能否对任何铁芯都用固定 μ 求 B？\n2. 线圈穿过磁场但磁通瞬时为零，电动势一定为零吗？\n3. 开路旋转棒两端能有电压吗？一段弯导线的电动势何时只与端点有关？\n4. 自感相同的两线圈反接，何时等效自感严格为零？\n5. D 大小不变但方向转动，位移电流密度为零吗？\n6. 单向简谐平面波的平均强度能否直接用 E0H0？\n7. p0 固定、频率加倍，平均偶极辐射功率变为多少倍？\n\n**答案要点**：1. 不能，铁磁质须看本构曲线与历史。2. 不一定，电动势取决于磁通变化率。3. 可以；全段同一匀强 B、相同速度刚性平移时可用端点位移。4. 还要完全耦合 k=1、磁通相消。5. 不一定，须对矢量分量求导。6. 不能，振幅表示时需乘 1/2。7. 16 倍。\n';
original=original.replace(/(\| 静磁场 A：[^\n]+\|)\n\n(?=\| 静磁场 B：)/, '$1\n');
const output=(original+extension).trimEnd()+'\n';
fs.writeFileSync(filename,output);
fs.writeFileSync('dist/review-outline.md',output);
console.log(`Synced outline: ${d.course.newFormulaIds.length} new formulas/relations, ${d.course.newChapterIds.length} new topics.`);
