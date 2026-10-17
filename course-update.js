/* 2026-10-17：仅依据《第11章静磁场B》《第12章变化的电磁场》新增；页码为 PDF 页码。 */
(() => {
  'use strict';
  const d=window.REVIEW_DATA,t=String.raw;
  d.course={updated:'2026-10-17',sources:5,newFormulaIds:[],newChapterIds:[]};
  let chapter,group;
  const chapterGroups=[];
  function section(id,title,ref,source,description,symbol,check){
    chapter={id,title,section:ref,source,description,number:String(d.chapters.length+1).padStart(2,'0')};
    d.chapters.push(chapter);d.course.newChapterIds.push(id);
    const target={id,title,symbol,intro:description,methods:[],check};
    d.summary.targets.push(target);chapterGroups.push(target);
  }
  function category(id,title,description){
    group={id,chapter:chapter.id,title,description,ids:[]};d.groups.push(group);
    chapterGroups.at(-1).methods.push({title,when:description,steps:'',refs:group.ids});
  }
  // Steps distinguish definitions/laws from deductions. Each inversion carries its own condition.
  function add(id,title,latex,variables,condition,hint,pages,steps,solves,related,type='定义关系'){
    for(const [symbol,meaning] of [[t`\mu_0`,'真空磁导率，按课件取 4π×10⁻⁷ H/m'],[t`\varepsilon_0`,'真空电容率，约 8.85×10⁻¹² F/m']]){
      if(latex.includes(symbol)&&!variables.some(([label])=>label===symbol))variables=[...variables,[symbol,meaning]];
    }
    if(/E_0|H_0|B_0/.test(latex)&&!variables.some(([label])=>label.includes('E_0')))variables=[...variables,[t`E_0,H_0,B_0`,'相应电场、磁场强度和磁感应强度的振幅，单位分别 V/m、A/m、T']];
    group.ids.push(id);d.course.newFormulaIds.push(id);
    d.formulas.push({id,title,latex,variables,condition,hint,chapter:chapter.id,type,keywords:group.title+' '+chapter.title,source:`${chapter.source} · PDF 第${pages}页`});
    d.learning[id]={kind:type==='基本定律'?'基本定律与适用范围':type==='定义关系'?'定义与关系说明':'模型推导',steps,solves,related};
    const method=chapterGroups.at(-1).methods.at(-1);
    method.steps+=(method.steps?'；':'')+title+'：'+hint;
  }
  const B=[t`\mathbf B`,'磁感应强度，单位 T'],H=[t`\mathbf H`,'磁场强度，单位 A/m'],M=[t`\mathbf M`,'磁化强度，单位 A/m；与互感系数 M 不同'];
  const mu=[t`\mu=\mu_0\mu_r`,'磁导率，单位 H/m；线性模型中视为常数'],I=[t`I`,'按选定正方向取代数值的电流，单位 A'];
  const flux=[t`\Phi_m,\Psi`,'单匝磁通量 Φm 与磁通链 Ψ，单位 Wb；多匝同通量时 Ψ=NΦm'];
  const emf=[t`\mathcal E`,'沿指定积分方向的电动势，单位 V'],R=[t`R`,'电阻，单位 Ω；几何半径若也用 R，按本卡公式区分'];
  const N=[t`N,n`,'总匝数 N 无量纲；单位长度匝数 n=N/ℓ，单位 m⁻¹'],area=[t`S`,'面积，单位 m²；与坡印廷矢量 S 不同'];
  const ell=[t`\ell`,'长度，单位 m；自感系数使用大写 L'],v=[t`v`,'导体或波的速度，依模型区分，单位 m/s'];
  const omega=[t`\omega`,'角速度或角频率，单位 rad/s'],L=[t`L`,'自感系数，单位 H'],mutual=[t`M`,'互感系数的非负大小，单位 H；符号由绕向或连接约定给出'];
  const E=[t`\mathbf E`,'电场强度，单位 V/m'],D=[t`\mathbf D`,'电位移，单位 C/m²'],eps=[t`\varepsilon`,'电容率，单位 F/m'],W=[t`W_m,w_m`,'磁场能量 Wm（J）与能量密度 wm（J/m³）'];
  section('magnetic-media','磁介质与磁化','§11-6～11-9','静磁场 B','区分 B、H、M；先由自由电流求 H，再结合本构关系求 B。铁磁质另看磁滞曲线。',t`\mathbf H,\mathbf M,\mu_r`,'H 的环流只计自由电流；铁磁质不能套用固定磁导率的线性模型。');
  category('magnetization','磁化与束缚电流','分子磁矩 · 表面磁化电流');
  add('magnetization-definition','磁化强度',t`\mathbf M=\frac{\sum\mathbf m_{\rm mol}}{\Delta V}`,[M,[t`\mathbf m_{\rm mol}`,'分子磁矩，单位 A·m²'],[t`\Delta V`,'含足够多分子的宏观小体积，单位 m³']],'宏观小体积内分子磁矩的矢量和除以体积。','先作矢量求和，随机取向的固有磁矩可以相互抵消。','10～13',[['对选定小体积内的分子磁矩作矢量求和。'],['除以体积得到宏观磁化强度。',t`\sum\mathbf m_{\rm mol}=\mathbf M\Delta V`]],[['总磁矩',t`\mathbf m_{\rm total}=\mathbf M V`,'均匀磁化体；不均匀时应按体积分相加。']],['magnetic-moment','bound-surface-current']);
  add('bound-surface-current','表面磁化电流密度',t`\mathbf K_b=\mathbf M\times\hat{\mathbf n}`,[M,[t`\mathbf K_b`,'束缚面电流密度，单位 A/m；课件记作 J'],[t`\hat{\mathbf n}`,'磁介质向外单位法向']],'按课件均匀磁化模型取表面束缚电流；Kb 不是体电流密度。','叉乘决定方向；只有 M 平行表面时才有 Kb=M，端面 M 平行法向时为零。','13～16',[['均匀磁化圆柱内部的等效分子电流互相抵消，侧面留下净电流。'],['用表面切向磁化分量推广大小关系并确定方向。',t`K_b=M\sin\alpha`]],[['侧面总磁化电流',t`I_b=K_b\ell`,'沿轴向均匀的圆柱侧面，ℓ 为轴向长度。']],['magnetization-definition','magnetic-h']);
  add('magnetization-circulation','磁化强度的环流',t`\oint_C\mathbf M\cdot d\mathbf l=I_{b,\rm enc}`,[M,[t`I_{b,\rm enc}`,'穿过环路所围曲面的束缚电流代数和，单位 A']],'稳恒宏观磁化模型；曲面正法向与绕向右手配对。','与 B/μ0 环路相减，正是 H 环路右侧不再显式出现磁化电流的原因。','16～18',[['对均匀磁化体表面附近的矩形环路，M 的环流为 M 乘有效长边。'],['以磁化面电流密度关系识别包围的束缚电流，并推广为环路表达式。']],[['束缚电流代数和',t`I_{b,\rm enc}=\oint_C\mathbf M\cdot d\mathbf l`,'需已知 M 在完整环路上的分布。']],['bound-surface-current','magnetic-h-ampere']);
  category('h-and-material','磁场强度与介质模型','H 环路 · 线性介质 · 分区求场');
  add('magnetic-h','B、H、M 的定义关系',t`\mathbf H=\frac{\mathbf B}{\mu_0}-\mathbf M`,[B,H,M,[t`\mu_0`,'真空磁导率，按课程取 4π×10⁻⁷ H/m']],'宏观磁介质中的定义关系；不以线性本构为前提。','定义式可用于铁磁质，但不能因此把磁化率当成固定常量。','17～20',[['B 的环流包含自由电流与磁化电流，M 的环流计磁化电流。'],['把磁化项移到左侧，引入 H。',t`\mathbf B=\mu_0(\mathbf H+\mathbf M)`]],[['磁化强度',t`\mathbf M=\mathbf B/\mu_0-\mathbf H`,'已知同一点 B 与 H，按矢量相减。']],['magnetic-h-ampere','linear-magnetic']);
  add('magnetic-h-ampere','磁介质中的安培环路定理',t`\oint_C\mathbf H\cdot d\mathbf l=I_{f,\rm enc}`,[H,I,[t`I_{f,\rm enc}`,'环路所围曲面穿过的自由电流代数和，单位 A']],'稳恒条件；绕向与曲面正法向满足右手关系。','右侧不另加磁化电流；能把 H 提出积分仍需对称性。','18～21',[['对 B/μ0 的环流减去 M 的环流。',t`\oint_C(\mathbf B/\mu_0-\mathbf M)\cdot d\mathbf l=I_{f,\rm enc}`],['按 H 定义识别左侧；用对称性选择可简化的环路。']],[['圆周对称 H',t`H=I_{f,\rm enc}/(2\pi r)`,'同轴长直结构，环路上 H 处处沿切向且大小相同。']],['ampere-law','magnetic-h','displacement-law'],'基本定律');
  add('linear-magnetic','线性磁介质本构关系',t`\mathbf M=\chi_m\mathbf H,\quad\mu_r=1+\chi_m,\quad\mathbf B=\mu\mathbf H`,[B,H,M,mu,[t`\chi_m,\mu_r`,'磁化率与相对磁导率，均无量纲']],'线性、各向同性磁介质；铁磁质一般不能用常数 χm 或 μ 描述整个过程。','顺磁 μr 略大于 1，抗磁略小于 1；比较 B 与真空 B0 时还需相同自由电流和适合的几何条件。','3～9、20～21、27～30',[['代入磁化关系。',t`\mathbf B=\mu_0(\mathbf H+\chi_m\mathbf H)`],['合并系数定义相对磁导率。',t`\mu=\mu_0(1+\chi_m)`]],[['相对磁导率',t`\mu_r=B/(\mu_0H)`,'线性各向同性、B 与 H 同向且 H 非零；B/H 使用大小。']],['magnetic-h','medium-solenoid-toroid']);
  add('medium-solenoid-toroid','介质螺线管与细螺线环',t`H_{\rm sol}=nI,\quad H_{\rm tor}=\frac{NI}{2\pi r},\quad B=\mu H`,[B,H,mu,I,N,[t`r`,'环内圆周到轴线的距离，单位 m']],'长密绕螺线管远离端部；密绕环形线圈内部；均匀线性介质。','先求 H 再求 B；细环平均磁路长 ℓ 时 H≈NI/ℓ，已知磁通还可用 B≈Φm/S。','21～23',[['选安培环路并计算自由电流 NI。'],['螺线管用长边，环形线圈用圆周；最后乘本层磁导率。',t`H\ell\simeq NI,\quad B=\mu H`]],[['由通量反求 μr',t`\mu_r\simeq\frac{\Phi_m\ell}{\mu_0NIS}`,'细环截面内 B 近似均匀，I 非零。']],['magnetic-h-ampere','solenoid','toroid'],'典型模型');
  add('coax-media','同轴电缆的分段 H 与 B',t`H_\varphi=\begin{cases}\dfrac{Ir}{2\pi a^2}&r<a\\\dfrac{I}{2\pi r}&a<r<b\\\dfrac{I(c^2-r^2)}{2\pi r(c^2-b^2)}&b<r<c\\0&r>c\end{cases}`, [H,B,I,mu,[t`a,b,c`,'内导体半径 a、外导体内半径 b 与外半径 c，单位 m']],'无限长同轴导体等值反向电流，截面电流均匀；夹层磁导率 μ，导体按非磁性处理。','B=μH 只用于夹层；两导体内用 μ0H。外部 B=0 仅是该理想模型的磁场结论。','24～26',[['逐区写穿面自由电流：内导体按面积比例，外导体扣除回流部分。'],['代入圆周环路并分别使用各区磁导率。',t`2\pi rH_\varphi=I_{f,\rm enc}(r)`]],[['夹层磁场',t`B_\varphi=\mu I/(2\pi r)`,'a<r<b；其余区域不能继续用夹层 μ。']],['magnetic-h-ampere','current-cylinder','coax-inductance'],'典型模型');
  category('ferromagnetic','铁磁质与磁滞','非线性 · 剩磁 · 矫顽力 · 硬磁与软磁');
  add('ferro-characteristics','磁滞回线的读图关系',t`B_r=B\big|_{H=0},\qquad B\big|_{H=-H_c}=0`,[B,H,[t`B_r`,'经历磁化后在 H=0 时的剩磁，单位 T'],[t`H_c`,'在相应退磁分支上使 B=0 的反向场强大小，单位 A/m']],'沿课件的磁滞回线分支读图；B 不仅由当前 H 决定，还与磁化历史有关。','硬磁通常矫顽力大、回线宽，适合永磁；软磁矫顽力小、回线窄，适合铁芯；不要只靠剩磁大小分类。','27～30',[['沿磁化后回到 H=0 的分支读取 B 截距，定义剩磁。'],['继续施加反向场到 B=0，读取场强绝对值，定义矫顽力。']],[['某工作点等效 μr',t`\mu_{r,\rm sec}=B/(\mu_0H)`,'同向标量工作点且 H 非零；仅为该工作点割线比值，不是常数材料参数。']],['linear-magnetic','magnetic-h']);

  section('induction','磁通与电磁感应','§12-1','变化的电磁场','先定正法向、计算有效磁通，再求总时间导数；楞次定律阻碍磁通变化。',t`\Phi_m,\Psi,\mathcal E`,'磁通、磁通变化率和磁通链不同；线圈面积不一定等于有效磁场面积。');
  category('flux-and-faraday','磁通链与法拉第定律','B、面积、夹角均可能随时间改变');
  add('flux-linkage','磁通与磁通链',t`\Phi_m=\int_S\mathbf B\cdot d\mathbf S,\quad\Psi=\sum_{k=1}^N\Phi_k`,[B,flux,N,area,[t`\theta`,'B 与所选正法线的夹角']],'每匝通量相同才有 Ψ=NΦm；匀强场中平面有效面积才可写 Φm=BS cosθ。','螺线管外套大线圈，通量仍只穿过有磁场的截面。','7、9、12',[['对回路所围曲面作带符号磁通积分。'],['对所有同绕向匝的磁通求和。',t`\Psi=N\Phi_m\quad(\Phi_k=\Phi_m)`]],[['匀强场大小',t`B=\Phi_m/(S\cos\theta)`,'场在面积 S 上均匀且 cosθ 非零，保持正法向约定。']],['electric-flux','faraday-law']);
  add('faraday-law','法拉第电磁感应定律',t`\mathcal E=-\frac{d\Psi}{dt}`, [emf,flux,[t`t`,'时间，单位 s']],'对闭合物质回路及其连续运动适用，包含场随时间变化及回路形变、转动；多匝以磁通链计。','先求 Ψ(t)，再对所有随时间变化的因素求导；方向由配对绕向和负号或楞次定律判断。','4～10、15～19',[['选回路绕向与右手正法线，写磁通链的时间函数。'],['负的变化率给出沿所选绕向的电动势，这是实验基本定律。',t`\mathcal E=-N\frac{d(BS\cos\theta)}{dt}`]],[['平均电动势',t`\overline{\mathcal E}=-\Delta\Psi/\Delta t`,'给定时间段的有向平均；瞬时值仍需求导。']],['flux-linkage','motional-integral','induced-circulation'],'基本定律');
  category('induction-applications','感应电流、电量与转动线圈','电阻回路 · 总电量 · 初相位');
  add('induction-current','电阻回路的感应电流',t`I=\mathcal E/R=-\frac1R\frac{d\Psi_{\rm ext}}{dt}`,[I,R,emf,flux],'闭合纯电阻近似，忽略自感及其他电源；R 是回路总电阻。','自感不可忽略时应列 LdI/dt+RI=外加电动势，不能直接套外磁通导数除以 R。','9、29',[['先由外磁通变化求感应电动势。'],['在忽略自感的电阻回路中应用欧姆关系。',t`RI=\mathcal E`]],[['回路总电阻',t`R=|\mathcal E/I|`,'I 非零，满足纯电阻模型。']],['faraday-law','self-emf']);
  add('induced-charge','通过截面的感应电量',t`q_{\rm ind}=\int_{t_1}^{t_2}I\,dt=\frac{\Psi_1-\Psi_2}{R}`,[flux,R,[t`q_{\rm ind}`,'相对所选电流正向的净通过电量，单位 C']],'总电阻恒定，忽略自感与其他电源；该式给净电量，不等于任意往返过程中电量绝对值累积。','只需要始末磁通链；不需要知道变化历时和每一时刻的变化速率。','10、20',[['对纯电阻回路的感应电流作时间积分。'],['把磁通链的导数积分为端点差。',t`q_{\rm ind}=-\frac1R\int_{\Psi_1}^{\Psi_2}d\Psi`]],[['移出小线圈测 B',t`B=R|q_{\rm ind}|/(NS)`,'初态法线平行均匀场、末态通量为零。']],['induction-current','flux-linkage']);
  add('rotating-loop','匀速转动线圈',t`\Psi=NBS\cos(\omega t+\theta_0),\quad\mathcal E=NBS\omega\sin(\omega t+\theta_0)`,[flux,emf,N,B,area,omega,[t`\theta_0`,'t=0 时 B 与线圈正法线夹角']],'匀强恒定 B，平面线圈绕位于自身平面且垂直 B 的固定轴匀速转动。','初相位看法线；若 B 也随时间变，回到磁通表达式作乘积求导。','13～15',[['将法线随时间的夹角代入磁通链。'],['对余弦求导并保留法拉第负号。']],[['峰值电动势',t`\mathcal E_{\max}=NBS|\omega|`,'B、S、ω 的大小和 N 固定。']],['faraday-law','rotating-rod'],'典型模型');

  section('motional','动生电动势','§12-2','变化的电磁场','用导体局部速度与 B 的叉乘定非静电力，沿导体积分；与力学联立时检查机械能来源。',t`\int(\mathbf v\times\mathbf B)\cdot d\mathbf l`,'开路可有电动势但无持续电流；总磁力不对电荷的总速度做功。');
  category('moving-conductors','平移与转动导体','逐段速度 · 投影 · 端点');
  add('motional-integral','动生电动势的线积分',t`\mathcal E_{a\to b}=\int_a^b(\mathbf v\times\mathbf B)\cdot d\mathbf l`,[emf,v,B,[t`d\mathbf l`,'沿所选导体方向的线元']],'v 是各处导体运动速度；积分对象是实际导体路径，B 与 v 可以随位置变化。','先写 v×B 的方向，再与线元点乘；正负表示沿积分方向的电动势。','22～24、35',[['单位正电荷受运动磁力，以非静电作用等效。',t`\mathbf E_k=\mathbf v\times\mathbf B`],['将等效非静电场沿导体积分。']],[['三垂直直棒速率',t`v=|\mathcal E|/(B\ell)`,'棒、速度和 B 互相垂直且 B、v 均匀。']],['emf-definition','magnetic-force','translation-emf'],'基本定律');
  add('translation-emf','匀强场内平移弯导线',t`\mathcal E_{a\to b}=(\mathbf v\times\mathbf B)\cdot(\mathbf r_b-\mathbf r_a)`,[emf,v,B,[t`\mathbf r_b-\mathbf r_a`,'从积分起点 a 到终点 b 的位移矢量，单位 m']],'全段导体处于同一匀强场，作相同速度的刚性平移。','有效长度看端点位移的投影；若导体部分出入磁区或各处速度不同，应分段积分。','25～29',[['B 与 v 在全段相同，可提出积分。'],['有向线元积分等于端点位移。',t`\int_a^b d\mathbf l=\mathbf r_b-\mathbf r_a`]],[['开路端电压',t`V_b-V_a=\mathcal E_{a\to b}`,'仅有该动生作用、开路达到电荷平衡时；有电流与内阻时不能这样直接等同。']],['motional-integral','rotating-rod'],'典型模型');
  add('rotating-rod','绕端点转动的直棒',t`|\mathcal E|=\int_0^\ell B|\omega|r\,dr=\frac12B|\omega|\ell^2`,[emf,B,omega,ell],'直棒绕端点在垂直匀强 B 的平面转动；大小关系，极性需另判。','各处速率为 ωr，不能把端点速度代入 Bℓv 当全棒速度。','30～31',[['以转轴为 r=0，取棒微元 dr，局部速率 |ω|r。'],['积分得到一半系数。']],[['角速度大小',t`|\omega|=2|\mathcal E|/(B\ell^2)`,'B、ℓ 非零，转轴在端点。']],['motional-integral','rotating-loop'],'典型模型');
  category('rail-induction','导轨的电磁阻尼','电动势 → 电流 → 安培力 → 运动方程');
  add('rail-dynamics','斜面导轨的速度与终速',t`m\dot v=mg\sin\alpha-\frac{B^2\ell^2\cos^2\alpha}{R}v,\quad v=v_\infty(1-e^{-t/\tau})`,[v,B,ell,R,[t`m,\alpha`,'棒质量（kg）与斜面倾角'],[t`\tau`,'机械阻尼时间常数，单位 s']],'无摩擦，B 竖直，棒沿斜面下滑，初速零；忽略回路自感，R 恒定，Bℓcosα 非零。','电动势用穿过斜面的 Bcosα；沿斜面磁阻力也要投影，最终出现 cos²α。','32～34',[['电动势和电流由斜面法向磁场给出。',t`\mathcal E=B\ell v\cos\alpha,\quad I=\mathcal E/R`],['沿斜面列牛顿方程，以初速零解一阶线性方程。']],[['终速与时间常数',t`v_\infty=\frac{mgR\sin\alpha}{B^2\ell^2\cos^2\alpha},\quad\tau=\frac{mR}{B^2\ell^2\cos^2\alpha}`,'倾角和方向与课件模型一致。']],['induction-current','straight-force-size','motional-integral'],'受力运动');

  section('induced','感生电场与电动势','§12-3','变化的电磁场','固定导体中，变化磁场激发涡旋电场；环流可在没有导线时存在。课件以涡电流为证据，电子感应加速器标为自学提示。',t`\mathbf E_{\rm ind}`,'感生电场非保守；开路径电动势一般与路径有关，不能全局用两点静电势差代替。');
  category('induced-field','涡旋电场与圆柱模型','固定路径 · 环流 · 分区面积');
  add('induced-circulation','感生电场的环路定律',t`\oint_C\mathbf E\cdot d\mathbf l=-\int_S\frac{\partial\mathbf B}{\partial t}\cdot d\mathbf S`,[E,B,emf],'固定曲面及其边界；C 绕向与 S 正法向满足右手关系。','静电分量环流为零；即使没有导体，变化磁场仍产生相应环流。','36～40、42',[['固定回路的电动势等于感生电场环流。'],['固定曲面可把时间导数放入磁通积分内。']],[['平均切向场',t`\langle E_t\rangle_C=-\dot\Phi_m/\ell_C`,'ℓC 为回路周长；只有足够对称时才是各点的场强。']],['faraday-law','cylinder-induced','maxwell-integral'],'基本定律');
  add('cylinder-induced','圆柱磁区内外的感生电场',t`E_\varphi(r)=\begin{cases}-\dfrac r2\dot B&r\le a\\-\dfrac{a^2}{2r}\dot B&r>a\end{cases}`, [E,B,[t`a,r`,'匀强磁场区域半径 a 与场点到轴距离 r，单位 m']],'长圆柱磁区内 B=B(t) 沿 +z，外部 B 近似零；+φ 与 +z 组成右手关系。','外部 B=0 不表示外部感生 E=0；磁通有效面积最多 πa²。','43～44',[['圆周环路上切向 E 恒定。',t`2\pi rE_\varphi=-\frac d{dt}[B\pi\min(r^2,a^2)]`],['分别代入 r≤a 与 r>a，检查边界连续。']],[['由内部场反求变化率',t`\dot B=-2E_\varphi/r`,'0<r≤a；保留规定方向的符号。']],['induced-circulation','capacitor-magnetic'],'典型模型');
  category('open-induced','开路径的感生电动势','辅助回路 · 径向段贡献为零');
  add('tangent-induced','磁区外切直棒的感生电动势',t`|\mathcal E_{AB}|=\frac{\pi a^2}{4}|\dot B|`,[emf,B,[t`a`,'圆柱磁区半径；直棒长 2a，且中点与磁区相切']],'课件特定几何：圆柱磁区、外切直棒长 2a，均匀 B(t)；端点相对圆心张角 π/2。','连接圆心到两端补成回路；径向辅助段 E·dl=0，有效磁通面积是四分之一圆。','45～47',[['补上两条径向线段，它们没有环流贡献。'],['扇形内磁通为 Bπa²/4，对时间求导。']],[['磁场变化率大小',t`|\dot B|=4|\mathcal E_{AB}|/(\pi a^2)`,'仅限本卡几何；一般开路径改用线积分或恰当辅助回路。']],['cylinder-induced','induced-circulation'],'典型模型');

  section('inductance','自感与互感','§12-4','变化的电磁场','自感看本回路的磁通链，互感看一个回路电流穿过另一个回路的磁通链。',t`L,M`,'先区分自感 L、互感 M 与磁化强度矢量 M；线圈串联必须看磁通相助还是相消。');
  category('self-induction','自感定义与电动势','设电流 → 求场 → 算磁通链');
  add('self-inductance','自感系数',t`L=\Psi/I=N\Phi_m/I`,[L,flux,I,N],'固定几何、线性介质、每匝相同通量；线性定义中的 I 非零。','先假设电流求磁场与磁通链，最后电流约掉；非线性铁芯不能把 Ψ/I 当成恒定 L。','49～52',[['由本回路电流求自身磁场。'],['积分各匝磁通并按线性比例定义 L。',t`\Psi=LI`]],[['磁通链',t`\Psi=LI`,'线性且 L 固定；每匝通量为 Ψ/N。']],['flux-linkage','self-emf','solenoid-inductance']);
  add('self-emf','自感电动势',t`\mathcal E_L=-\frac{d(LI)}{dt}=-L\frac{dI}{dt}\quad(L\ \text{恒定})`,[L,I,emf],'固定或随参数缓慢改变的回路以 Ψ=LI 表示；最后一个等号仅在 L 恒定时成立。','阻碍电流的变化：电流减小时可与原电流同向，不是永远反向。','50～51、65',[['对自身磁通链用法拉第定律。'],['L 恒定时提出导数；若 L 随时间变需保留乘积求导。']],[['电流变化率',t`\dot I=-\mathcal E_L/L`,'L 恒定且非零，方向与电流参考方向配对。']],['self-inductance','faraday-law']);
  category('inductor-models','典型自感模型','长螺线管 · 矩形截面环 · 薄壁同轴电缆');
  add('solenoid-inductance','长直螺线管自感',t`L=\mu n^2V=\mu N^2S/\ell`,[L,mu,N,area,ell,[t`V=S\ell`,'螺线管内部体积，单位 m³']],'长密绕螺线管，忽略端部，内部均匀线性介质。','比较改变匝数和长度时，注意 n=N/ℓ 与 N 不能同时默认不变。','52',[['由内部场 B=μnI 得每匝通量 BS。'],['乘 N 后除 I。',t`L=\frac{N\mu nIS}{I}=\mu n^2S\ell`]],[['匝数',t`N=\sqrt{L\ell/(\mu S)}`,'几何尺寸、介质固定。']],['self-inductance','medium-solenoid-toroid'],'典型模型');
  add('toroid-inductance','矩形截面螺线环自感',t`L=\frac{\mu N^2h}{2\pi}\ln\frac ba`,[L,mu,N,[t`a,b,h`,'环截面的内半径 a、外半径 b 和高度 h，单位 m']],'密绕环形线圈，矩形截面，均匀线性介质，忽略漏磁。','场随 r 变，用 h dr 积分；不能不加条件地用中径处 B 乘整个截面。','53',[['由圆周环路求 B=μNI/(2πr)。'],['沿径向积分每匝磁通，再乘 N/I。',t`\Phi_m=\int_a^b\frac{\mu NI}{2\pi r}h\,dr`]],[['磁导率',t`\mu=2\pi L/[N^2h\ln(b/a)]`,'尺寸已知且满足线性、忽略漏磁模型。']],['self-inductance','toroid'],'典型模型');
  add('coax-inductance','薄壁同轴电缆单位长度自感',t`L'=\frac{\mu}{2\pi}\ln\frac ba`,[L,mu,[t`L'`,'单位长度自感，单位 H/m'],[t`a,b`,'两薄圆筒半径，a<b，单位 m']],'等值反向电流沿两个同轴薄圆筒传输，夹层均匀线性介质，忽略导体内部磁场能。','该式是单位长度的外部自感；实心均匀载流导体的内部贡献另算。','54、69',[['取单位长度径向面元 dr，B=μI/(2πr)。'],['积分磁通并除以电流。',t`L'=\frac1I\int_a^b\frac{\mu I}{2\pi r}\,dr`]],[['长度 ℓ 的自感',t`L=L'\ell`,'忽略端部与导体内部贡献。']],['coax-media','magnetic-density'],'典型模型');
  category('mutual-induction','互感与耦合线圈','互感系数 · 耦合程度 · 串联方向');
  add('mutual-definition','互感系数',t`M=\frac{N_2\Phi_{21}}{I_1}=\frac{N_1\Phi_{12}}{I_2}`, [mutual,I,flux,[t`\Phi_{21}`,'由线圈1电流产生、穿过线圈2每匝的磁通；下标先受后源']],'固定线圈、线性互易介质，绕向采用磁通相助的正参考，M 表示非负耦合大小。','选择更容易求场的一侧设电流；互易关系允许换源回路。','55～60',[['在线圈1中设电流 I1，求其在线圈2处的场。'],['积分线圈2的磁通链，再除以 I1。']],[['被链磁通',t`\Phi_{21}=MI_1/N_2`,'线圈2各匝通量近似相同，采用既定绕向。']],['self-inductance','mutual-emf']);
  add('mutual-emf','互感电动势',t`\mathcal E_{21}=-M\frac{dI_1}{dt}`, [mutual,emf,[t`I_1`,'源线圈1中的有向电流'],[t`\mathcal E_{21}`,'在线圈2沿正参考方向的电动势']],'M 恒定；正参考使线圈1正电流在线圈2正法向产生正磁通。','下标先受后源；改变绕向会改变有向磁通与电动势符号，大小仍是 M|dI/dt|。','57～60',[['线圈2由线圈1产生的磁通链为 MI1。'],['按法拉第定律对该链求导。']],[['互感大小',t`M=|\mathcal E_{21}|/|\dot I_1|`,'M 固定，源电流变化率非零。']],['mutual-definition','faraday-law']);
  add('wire-loop-mutual','长直导线与矩形线框的互感',t`M=\frac{\mu_0a}{2\pi}\ln\frac{r_2}{r_1}`,[mutual,[t`a,r_1,r_2`,'与长直导线平行的矩形边长 a，以及近、远边到导线的距离 r1、r2']],'真空，单匝矩形线框与理想长直导线共面，0<r1<r2；远处回流对所算通量的影响忽略。','选长直导线作源最方便；反过来求长直导线回路的互感电动势可用互易性。','59～60',[['长直导线的 B=μ0I/(2πr)，对平行窄条面积 a dr 积分。',t`\Phi=\int_{r_1}^{r_2}\frac{\mu_0I}{2\pi r}a\,dr`],['将所得磁通除源电流。']],[['互感电动势大小',t`|\mathcal E|=\frac{\mu_0a}{2\pi}\ln(r_2/r_1)|\dot I|`,'几何固定；方向按相应受感回路绕向判断。']],['mutual-definition','mutual-emf','long-wire'],'典型模型');
  add('coupling-factor','耦合系数',t`M=k\sqrt{L_1L_2},\qquad0\le k\le1`,[mutual,[t`L_1,L_2`,'两线圈各自自感，单位 H'],[t`k`,'耦合系数，无量纲']],'线性互易耦合系统；M 为大小。理想完全耦合 k=1。','不是任意两线圈都有 M=√(L1L2)，有漏磁时 k<1。','61～62',[['理想完全耦合时，同一磁通同时链过两线圈，可消去匝数比。',t`M^2=L_1L_2\quad(k=1)`],['用 k 描述实际耦合相对理想值的比例。']],[['耦合程度',t`k=M/\sqrt{L_1L_2}`,'L1、L2 正且已知。']],['mutual-definition','coupled-series']);
  add('coupled-series','耦合线圈串联等效自感',t`L_{\rm eq}=L_1+L_2\pm2M`,[L,mutual,[t`L_1,L_2`,'两线圈各自自感，单位 H']],'线性耦合线圈串联，同一电流通过；加号为磁通相助，减号为磁通相消。','相同自感且 k=1 时顺接 4L0、反接 0；实际漏磁使反接一般不为零。','63～64',[['总磁通链为两自感链与两互感链的代数和。',t`\Psi=(L_1+L_2)I\pm2MI`],['用总链除电流得到等效 L。']],[['由顺反接测 M',t`M=(L_+-L_-)/4`,'两次几何和介质状态不变，正确辨认相助与相消。']],['coupling-factor','mutual-definition']);

  section('magnetic-storage','磁场能量','§12-5','变化的电磁场','线圈参数已知用 LI²/2；磁场分布已知用密度积分。区分线圈取向势能和磁场储能。',t`W_m,w_m`,'二次型储能公式适用于线性介质；铁磁磁滞过程不可直接套固定 μ 或固定 L。');
  category('magnetic-energy-storage','自感储能与空间分布','能量守恒 · 非均匀场积分');
  add('inductor-energy','线性电感储能',t`W_m=\frac12LI^2`,[W,L,I],'线性电感，L 恒定；磁场建立过程以磁通链为状态变量。','这是场储能，不是旧卡片中给定线圈磁矩在外场的势能 −m·B。','65～68',[['电源反抗自感做功，排除电阻发热部分。',t`dW_m=LI\,dI`],['从电流零积分至 I。']],[['电流大小',t`|I|=\sqrt{2W_m/L}`,'L>0，二次型储能不提供电流方向。']],['self-inductance','magnetic-density','magnetic-energy']);
  add('magnetic-density','磁场能量密度',t`w_m=\frac12\mathbf B\cdot\mathbf H=\frac{B^2}{2\mu}=\frac12\mu H^2`,[W,B,H,mu],'线性、各向同性、无磁滞的介质；B 与 H 同向，μ 固定。','选择已知的 B 或 H 形式；分层使用各层 μ。','66～67、69',[['以长螺线管的 L=μn²V 与 B=μnI 代入储能。'],['除以体积得到密度，再推广到符合线性模型的局部场。']],[['磁场大小',t`B=\sqrt{2\mu w_m}`,'μ>0、线性模型；方向另判。']],['inductor-energy','magnetic-field-energy']);
  add('magnetic-field-energy','磁场能量的体积分',t`W_m=\int_Vw_m\,dV`,[W,[t`dV`,'空间体积元，单位 m³']],'按实际有磁场的空间分区，密度表达式使用该区域适用的介质模型。','柱对称每单位长度用 dV=2πr dr；先积分 B²，不能先平均 B 再平方。','69～70',[['由场分布求局部密度。'],['取与几何匹配的体积元并覆盖相应空间。']],[['同轴薄筒每长度储能',t`W'_m=\frac{\mu I^2}{4\pi}\ln\frac ba`,'薄壁、等值反向电流，只有 a<r<b 区域的场能。']],['magnetic-density','coax-inductance']);
  add('moving-shell-energy','低速运动带电球壳的磁能模型',t`W_m=\frac{\mu_0q^2v^2}{12\pi R_0}`,[W,[t`q,R_0,v`,'均匀带电薄球壳的总电荷（C）、半径（m）和整体平移速率（m/s）']],'课件的经典球壳模型，真空中 v≪c；仅计算该近似下运动所带来的磁场能量，不代表电子的完整现代结构模型。','由球外 B∝sinθ/r² 求密度，用球坐标体积元积分；这是课件例题，不作为任意运动点电荷的有限自能公式。','70',[['采用课件给出的低速球外磁场。',t`B(r,\theta)=\frac{\mu_0|q|v\sin\theta}{4\pi r^2}`],['把 B²/(2μ0) 在 r≥R0 的空间积分，角积分为 8π/3。']],[['模型内的速率',t`v=\sqrt{12\pi R_0W_m/(\mu_0q^2)}`,'q 非零，并检验结果仍满足 v≪c。']],['magnetic-field-energy','magnetic-density'],'典型模型');
  category('coupled-storage','耦合线圈总磁能','互感交叉项的正负');
  add('coupled-energy','耦合线圈磁场总储能',t`W_m=\frac12L_1I_1^2+\frac12L_2I_2^2\pm MI_1I_2`,[W,mutual,[t`L_1,L_2,I_1,I_2`,'两线圈的自感（H）与按图示给出的电流大小（A）']],'线性系统，M 为非负大小；按两电流产生磁通相助或相消选择符号。','若采用带符号的互感与电流，固定一个代数式即可，不要再重复加一次方向符号。','71',[['分别累加两个自感储能。'],['再加上建立电流时的互感交叉能。',t`W_{\rm cross}=\pm MI_1I_2`]],[['串联时总能量',t`W_m=\frac12(L_1+L_2\pm2M)I^2`,'同一电流大小，连接方向与符号配对。']],['coupled-series','inductor-energy']);

  section('displacement','位移电流与全电流','§12-6','变化的电磁场','变化的电位移产生位移电流项，补全非稳恒电路的环路定律。',t`\mathbf j_d,I_d`,'位移电流看矢量 D 的时间变化；大小不变但方向改变时也可非零。');
  category('displacement-current','位移电流的定义与积分','矢量变化 · 固定曲面 · 电容器');
  add('displacement-density','位移电流密度',t`\mathbf j_d=\frac{\partial\mathbf D}{\partial t}`, [D,[t`\mathbf j_d`,'位移电流密度，单位 A/m²'],eps],'在固定空间点对电位移矢量求偏导；恒定线性介质可写 jd=ε∂E/∂t。','方向的变化也要求导；位移电流本身不表示自由电荷穿越真空。','73～80、82',[['电容极板电荷改变导致 D 改变，提示以 D 的变化补充电流。'],['推广为任意空间点的矢量时间变化率，这是麦克斯韦的定义。']],[['固定线性介质场变化率',t`\partial_t\mathbf E=\mathbf j_d/\varepsilon`,'ε 为不随时间变的标量。']],['displacement','displacement-current','displacement-law']);
  add('displacement-current','位移电流强度',t`I_d=\int_S\frac{\partial\mathbf D}{\partial t}\cdot d\mathbf S=\frac{d\Phi_D}{dt}`,[D,[t`I_d,\Phi_D`,'位移电流（A）与电位移通量（C）'],area],'S 为固定曲面；正法向决定电流正负。','这里通量是 D 的通量，单位 C；不要与单位 Wb 的磁通混淆。','77～80',[['把位移电流密度对固定截面积分。'],['固定曲面时导数可以与积分交换。']],[['均匀垂直截面',t`I_d=S\,\partial_tD`,'D 在截面上均匀且垂直。']],['displacement-density','capacitor-displacement']);
  add('capacitor-displacement','电容器中的位移电流',t`I_d=\dot Q=C\frac{dU}{dt}`, [I,[t`C,U`,'电容（F）与板间电压（V）'],D],'理想平行板充电，忽略漏电、边缘，C 恒定；电流方向与极板正法向配对。','C 变化时改用 d(CU)/dt；位移电流与导线中的传导电流连续配对。','75～81',[['由电位移高斯关系得到板间 D 通量为 Q。'],['对 Q=CU 求时间导数。']],[['电压变化率',t`\dot U=I_d/C`,'C 恒定且非零。']],['capacitance','displacement-current']);
  category('full-current','全电流定律与板间磁场','同一边界的不同曲面');
  add('displacement-law','安培—麦克斯韦环路定律',t`\oint_C\mathbf H\cdot d\mathbf l=I_{f,\rm enc}+\int_S\frac{\partial\mathbf D}{\partial t}\cdot d\mathbf S`,[H,D,I],'非稳恒宏观场，C 为固定回路，S 为同一边界的有向曲面；If 包含相应自由电荷运动电流。','选穿过导线的曲面或穿过电容间隙的曲面，应得到相同的环流。','73～80、90～94',[['仅计传导电流时，两种跨面选择给出矛盾。'],['补上 D 的变化率，使全电流在电容充电过程中连续。']],[['全电流',t`I_{\rm total}=I_{f,\rm enc}+I_d`,'两项使用同一个曲面正法向与环路绕向。']],['magnetic-h-ampere','displacement-current','maxwell-integral'],'基本定律');
  add('capacitor-magnetic','圆形电容器板间磁场',t`B_\varphi(r)=\frac{\mu_0\varepsilon_0r}{2}\dot E\quad(0\le r<a)`,[B,E,[t`a,r`,'圆形极板半径 a，场点到轴距离 r']],'真空圆形平行板，忽略边缘，板间 E(t) 均匀；仅计算板内半径范围的理想准静态模型。','穿面位移电流只计 πr²；不能直接把整个极板的 Id 填入内部小环路。','83～86',[['半径 r 内位移电流为 ε0πr² dE/dt。'],['用真空全电流环路关系。',t`2\pi rB_\varphi=\mu_0\varepsilon_0\pi r^2\dot E`]],[['总位移电流',t`I_d=\varepsilon_0\pi a^2\dot E`,'使用完整极板面积。']],['displacement-law','displacement-density'],'典型模型');

  section('maxwell','麦克斯韦方程组','§12-8','变化的电磁场','以两条通量关系与两条环流关系统一静态和时变电磁场。课件小节号从 12-6 跳至 12-8。',t`\mathbf E,\mathbf D,\mathbf B,\mathbf H`,'D 计自由电荷，H 环流含自由电流与位移电流；方程与介质本构关系分开。');
  category('maxwell-system','积分与微分形式','固定回路 / 曲面 · 局部散度 / 旋度');
  add('maxwell-integral','麦克斯韦方程组：积分形式',t`\begin{aligned}\oiint_{\partial V}\mathbf D\cdot d\mathbf S&=Q_f\\\oint_C\mathbf E\cdot d\mathbf l&=-\int_S\partial_t\mathbf B\cdot d\mathbf S\\\oiint_{\partial V}\mathbf B\cdot d\mathbf S&=0\\\oint_C\mathbf H\cdot d\mathbf l&=I_f+\int_S\partial_t\mathbf D\cdot d\mathbf S\end{aligned}`, [E,D,B,H,[t`Q_f,I_f`,'闭合面内自由电荷（C）与跨开曲面的自由电流（A）']],'环流式的 C、S 固定且右手配对；通量式用闭合面外法向。','闭合面与开曲面不能混用；D=εE、B=μH 是额外本构，不是四条方程本身。','87～94',[['保留电位移高斯关系与磁通量闭合关系。'],['两条环路关系加入变化 B 与变化 D 的耦合。']],[['由环流求磁通变化率',t`\dot\Phi_B=-\oint_C\mathbf E\cdot d\mathbf l`,'固定回路；应使用沿回路的总电场。']],['electric-gauss','magnetic-gauss','induced-circulation','displacement-law'],'基本定律');
  add('maxwell-local','麦克斯韦方程组：微分形式',t`\begin{aligned}\nabla\cdot\mathbf D&=\rho_f&\nabla\times\mathbf E&=-\partial_t\mathbf B\\\nabla\cdot\mathbf B&=0&\nabla\times\mathbf H&=\mathbf j_f+\partial_t\mathbf D\end{aligned}`, [E,D,B,H,[t`\rho_f,\mathbf j_f`,'自由体电荷密度（C/m³）与自由电流密度（A/m²）']],'在场足够光滑的局部区域使用经典微分形式；界面处优先使用积分关系。','散度描述源，旋度描述环流；静态时两个时间导数为零。','94',[['通量关系用散度定理转为局部关系。'],['环流关系用斯托克斯定理转为局部关系。']],[['自由电流密度',t`\mathbf j_f=\nabla\times\mathbf H-\partial_t\mathbf D`,'知道 H 空间分布及 D 时间变化，场在考察点光滑。']],['maxwell-integral','wave-equation'],'基本定律');

  section('waves','平面电磁波与能流','§12-9～12-10','变化的电磁场','在均匀无源介质中由时变场耦合导出波动；用场幅度关系和 E×H 连接能量传播。',t`v,\mathbf S`,'E/H 是阻抗量，E/B 是波速量；瞬时能流与周期平均值不同。');
  category('plane-wave-fields','波动方程与场的关系','无源线性介质 · 相位 · 横波');
  add('wave-equation','一维电磁波方程与波速',t`\partial_x^2E_y=\mu\varepsilon\partial_t^2E_y,\quad\partial_x^2H_z=\mu\varepsilon\partial_t^2H_z,\quad v=\frac1{\sqrt{\mu\varepsilon}}`,[E,H,v,mu,eps],'均匀、线性、各向同性、无自由电荷电流且无耗散的介质，沿 x 传播的平面波。','与标准波动方程比较系数；真空代 μ0、ε0 得 c≈3×10⁸m/s。','95～98',[['由两条旋度关系得 ∂xEy=−μ∂tHz 与 ∂xHz=−ε∂tEy。'],['再求导并消去另一场，比较标准波动方程。']],[['介质参数乘积',t`\mu\varepsilon=1/v^2`,'均匀无耗散模型。']],['maxwell-local','plane-wave'],'典型模型');
  add('plane-wave','沿 +x 传播的简谐平面波',t`E_y=E_0\cos[\omega(t-x/v)+\phi_0],\quad H_z=H_0\cos[\omega(t-x/v)+\phi_0]`,[E,H,v,omega,[t`E_0,H_0,\phi_0`,'场振幅与初相位，单位分别 V/m、A/m、rad']],'均匀无耗散介质中的单向平面行波；E 沿 y、H 沿 z。','t−x/v 表示向 +x 传播；E 与 H 同相，传播方向由 E×H 决定。','97～99',[['标准行波解具有 t−x/v 的相位变量。'],['代回耦合场关系使 E、H 具有配对幅度和相位。']],[['相位常数',t`k=\omega/v`,'相位可写 ωt−kx+φ0，k 单位 rad/m。']],['wave-equation','wave-field-ratio'],'典型模型');
  add('wave-field-ratio','平面波的 E、H、B 比例',t`\frac{E_0}{H_0}=\sqrt{\frac\mu\varepsilon},\qquad\frac{E_0}{B_0}=v,\qquad B_0=\mu H_0`,[E,H,B,v,mu,eps],'均匀无耗散介质中单向平面波；比例以非负振幅表示。','真空 B0=E0/c，H0=E0/(μ0c)；不能把 E0/H0 写成 c。','98、105',[['由同相平面波代入麦克斯韦旋度关系。'],['联立波速和 B=μH 得到场振幅比例。']],[['由 E0 求 H0',t`H_0=E_0\sqrt{\varepsilon/\mu}`,'μ、ε 为相应介质参数。']],['plane-wave','poynting-vector']);
  category('wave-energy','电磁场能量与坡印廷矢量','瞬时密度 · 传播方向 · 周期平均');
  add('em-energy-density','电磁能量密度',t`w=\frac12\varepsilon E^2+\frac12\mu H^2`,[E,H,mu,eps,[t`w`,'电磁总能量密度，单位 J/m³']],'线性、无耗散、无磁滞介质；公式中的 E、H 为同一时刻局部值。','单向平面波中电能和磁能各占一半，w=εE²=μH²。','100～101、105',[['把局部电场能与磁场能密度相加。'],['单向平面波满足 εE²=μH²，可进一步合并。']],[['平面波瞬时密度',t`w=\varepsilon E^2`,'仅在符合场比例的单向平面波中；一般电磁场保留两项。']],['energy-density','magnetic-density','wave-field-ratio']);
  add('poynting-vector','坡印廷矢量与能流',t`\mathbf S=\mathbf E\times\mathbf H,\quad S=wv\quad(\text{平面波})`,[E,H,[t`\mathbf S`,'电磁能流密度矢量，单位 W/m²'],v],'E×H 为能流；S=wv 用于单向平面波。当前介质模型为线性无耗散。','方向按叉乘，穿过表面的功率须点乘面积法向；周期平均不要与瞬时值混用。','100～101、104～105',[['时间 dt 内波扫过面积 dA 的体积为 v dt dA。',t`S=w v`],['结合场比例得到大小 EH，方向为 E×H。']],[['简谐波平均强度',t`\langle S\rangle=\tfrac12E_0H_0`,'单向简谐平面波，对完整周期平均；使用的是振幅而非有效值。']],['em-energy-density','wave-field-ratio','radiation-flux']);

  section('radiation','振荡电偶极子辐射','§12-11','变化的电磁场','课件波谱延伸至振荡电偶极辐射：真空远区场随 1/r 衰减；方向分布由 sin²θ 决定，平均功率随 ω⁴ 增长。',t`\mathbf p(t),\langle P\rangle`,'这是偶极近似和远区辐射结果，不可用来替代静电偶极近场公式。');
  category('dipole-radiation','远区场、角分布与总功率','延迟时间 · 1/r · sin²θ · ω⁴');
  add('radiation-fields','振荡偶极子的远区场',t`E_\theta=-\frac{\omega^2p_0\sin\theta}{4\pi\varepsilon_0c^2r}\cos[\omega(t-r/c)],\quad H_\varphi=E_\theta/(\mu_0c)`,[E,H,[t`p_0`,'电偶极矩振幅，单位 C·m'],omega,[t`r,\theta`,'距偶极中心距离与相对偶极轴极角'],[t`c`,'真空光速，单位 m/s']],'真空中 p(t)=p0 cosωt 的小尺寸电偶极源；远区 r≫λ 且 r≫源尺寸，只保留辐射项。','沿径向传播，电场沿 θ、磁场沿 φ；轴向 sinθ=0 无该辐射，赤道最大。','106～107',[['把给定的简谐偶极矩代入课件的远区麦克斯韦解；该解不由静电公式直接替换获得。'],['在远区按局部行波关系连接 H 与 E，保留延迟时间 t−r/c。']],[['场振幅',t`E_0(r,\theta)=\omega^2p_0|\sin\theta|/(4\pi\varepsilon_0c^2r)`,'远区大小；不能在 r→0 处使用。']],['dipole-moment','wave-field-ratio','radiation-flux'],'典型模型');
  add('radiation-flux','偶极辐射的能流分布',t`S_r=\frac{\omega^4p_0^2\sin^2\theta}{16\pi^2\varepsilon_0c^3r^2}\cos^2[\omega(t-r/c)]`,[[t`S_r`,'径向瞬时能流密度，单位 W/m²'],omega,[t`p_0,r,\theta`,'偶极矩振幅、距离和极角']],'与偶极远区场同样的真空、远区、小源近似。','能流随 1/r²，乘球面元 r²sinθdθdφ 后可求功率；平均 cos² 为 1/2。','107～108',[['对正交远区场取能流大小 EH。'],['代入 E、H 的振幅与相位得到 sin²θ 与 1/r² 因子。']],[['周期平均角分布',t`\langle S_r\rangle=\frac{\omega^4p_0^2\sin^2\theta}{32\pi^2\varepsilon_0c^3r^2}`,'对源稳定简谐振荡的完整周期平均。']],['radiation-fields','poynting-vector','radiation-power'],'典型模型');
  add('radiation-power','偶极子的总辐射功率',t`P(r,t)=\frac{\omega^4p_0^2}{6\pi\varepsilon_0c^3}\cos^2[\omega(t-r/c)],\quad\langle P\rangle=\frac{\omega^4p_0^2}{12\pi\varepsilon_0c^3}`, [[t`P,\langle P\rangle`,'穿过远区球面的瞬时功率与周期平均功率，单位 W'],omega,[t`p_0`,'偶极矩振幅，单位 C·m']],'真空简谐电偶极子的远区辐射，源参数稳定；平均值对一个完整周期。','保持 p0 不变时频率加倍，平均功率变为 16 倍；不能在 p0 随频率改变时直接比较。','107～108',[['积分径向能流。',t`P=\int_0^{2\pi}\int_0^\pi S_rr^2\sin\theta\,d\theta\,d\varphi`],['用 ∫sin³θ dθ=4/3，再对 cos² 作周期平均。']],[['由平均功率求 p0',t`p_0=\sqrt{12\pi\varepsilon_0c^3\langle P\rangle}/\omega^2`,'ω>0，符合本卡辐射模型。']],['radiation-flux','radiation-fields'],'典型模型');

  // Integrate new routes into the existing overview rather than a separate disconnected appendix.
  const pit=(title,wrong,right,check,refs)=>d.summary.pitfalls.push({title,wrong,right,check,refs});
  pit('B、H、M 与两类电流','介质中 H 的环流也要加磁化电流。','稳恒时 H 环流只计自由电流；B/μ0 的环流计自由与磁化电流。非稳恒时 H 环流还要加位移电流。','先判断是否稳恒，再确定电流种类。',['magnetic-h','magnetic-h-ampere','displacement-law']);
  pit('铁磁质不是固定磁导率材料','所有磁介质都可把 μ 当常数，用 B=μH 描述任意过程。','铁磁质有非线性与磁化历史；H=0 时也可有剩磁。线性二次型储能不能直接照搬。','读具体 B–H 分支与工作范围。',['ferro-characteristics','linear-magnetic','magnetic-density']);
  pit('楞次定律阻碍变化','感应磁场永远与原磁场反向。','原磁通增加时趋向反向，减小时趋向同向；关键是阻碍原磁通的变化。','固定正法向后判 dΦ/dt，而非只看 B。',['faraday-law','rotating-loop']);
  pit('有效磁通面积与线圈面积','线圈比磁区大，所以用更大的线圈面积乘 B。','积分只计有 B 穿过的实际区域；螺线管外场忽略时有效面积封顶于管截面。','先画磁区与回路所围曲面的交集。',['flux-linkage','cylinder-induced']);
  pit('动生电动势、端电压与电流','只要有电动势就一定有电流，且总等于端电压。','开路可以有电动势；闭合电流还取决于电阻、自感等。开路静电平衡的端电压关系不能任意移用到有流电路。','先画实际电连接和积分方向。',['translation-emf','induction-current','self-emf']);
  pit('感生电场不是静电场','磁区外 B=0，因此该处感生 E=0，或电动势只由端点决定。','外部可有涡旋电场；感生电场一般有非零环流，不存在全局的两点静电势差描述。','开路径用实际线积分或辅助回路。',['induced-circulation','cylinder-induced','tangent-induced']);
  pit('自感阻碍电流变化','自感电动势永远与原电流反向。','增流时反向、减流时同向；L 变化时还需对 LI 整体求导。','先判 dI/dt；再判 L 是否恒定。',['self-emf','self-inductance']);
  pit('耦合的理想极限','所有线圈互感均为 √(L1L2)，相同线圈反接总为零。','一般 M=k√(L1L2)，只有 k=1 且 L1=L2 才有完全相消的理想串联极限。','看漏磁、连接方向和互感正参考。',['coupling-factor','coupled-series','coupled-energy']);
  pit('矢量变化与位移电流','D 的大小不变，因此位移电流必为零。','位移电流密度是 D 矢量的偏导数；方向变化同样产生非零项。','先写矢量分量再求时间导数。',['displacement-density','displacement-current']);
  pit('瞬时值、振幅与平均能流','把 E0H0 当成简谐波的周期平均强度。','瞬时能流为 E×H；同相简谐单向波的平均大小为 E0H0/2。','先标明场是瞬时值、振幅还是有效值。',['plane-wave','wave-field-ratio','poynting-vector']);
  pit('远区辐射与静态偶极场','把辐射场的 1/r 关系延伸到源附近。','远区只保留辐射项；原来的静电偶极电势模型与振荡远区场适用范围不同。','检查波长、源尺寸、距离与角度。',['radiation-fields','radiation-flux','radiation-power']);
  d.summary.chains.push(
    {title:'磁介质分区题',steps:['自由电流','环路求 H','各区 B、M','磁化电流 / 磁通'],note:'铁磁质使用给定曲线；同轴导体逐区计算穿面电流。',refs:['magnetic-h-ampere','coax-media','linear-magnetic','bound-surface-current']},
    {title:'感应与导轨题',steps:['正法向与有效磁通','求导 / v×B 积分','电路求 I','受力与能量'],note:'B、面积与角度可同时改变；有自感时列电路方程。',refs:['faraday-law','motional-integral','rail-dynamics','self-emf']},
    {title:'自感与磁能题',steps:['设源电流','求场与磁通链','求 L 或 M','储能 / 等效连接'],note:'先确认线性模型和耦合正负，空间积分与电路能量相互核对。',refs:['self-inductance','mutual-definition','inductor-energy','magnetic-field-energy']},
    {title:'电容充电到时变场',steps:['D 随时间变化','位移电流','全电流环路','磁场 / 后续感应'],note:'沿相同边界更换跨面，检验全电流的一致性。',refs:['displacement-density','displacement-law','capacitor-magnetic','maxwell-integral']},
    {title:'波与辐射能量题',steps:['确认平面波或远区','场的比例和相位','能流方向','平均 / 面积分'],note:'平面波 E/H 与 E/B 不同；辐射总功率要积角度，不能只取赤道值乘面积。',refs:['wave-field-ratio','poynting-vector','radiation-flux','radiation-power']}
  );
  d.guide.steps[2][1]+='；磁介质先求 H；时变磁通用法拉第定律，非稳恒环流补位移电流。';
  d.guide.steps[3][1]+=' 新增内容还需检查线性、忽略自感、固定曲面、无耗散及远区条件。';
  d.guide.templates.push(
    ['磁介质：从自由电流到磁化',t`先用 $\oint\mathbf H\cdot d\mathbf l=I_f$，再在线性介质内求 $\mathbf B=\mu\mathbf H$、$\mathbf M=\chi_m\mathbf H$。分层各用自己的磁导率；铁磁质改读给定磁滞曲线。`],
    ['电磁感应：先磁通链后时间导数',t`统一正法向与绕向，写 $\Psi(t)$，再用 $\mathcal E=-d\Psi/dt$。$B,S,\theta$ 可同时变化。开路求局部动生电动势用 $\int(\mathbf v\times\mathbf B)\cdot d\mathbf l$；闭合有自感需联立电路方程。`],
    ['自感互感：设电流、算链、约电流',t`自感算自身磁通链除以源电流；互感算另一回路磁通链除以源电流。储能在固定线性模型下用 $LI^2/2$；非均匀场用密度积分。`],
    ['位移电流、波与辐射',t`先求 $\partial\mathbf D/\partial t$ 并积分，再用全电流环路。平面波用 $E_0/H_0=\sqrt{\mu/\varepsilon}$，能流用 $\mathbf S=\mathbf E\times\mathbf H$；周期平均与远区球面积分分别处理。`]
  );
  d.guide.models.push(['磁介质与同轴回流','由自由电流求 H，再分区代介质参数','磁化电流不重复加入 H 环路'],['动生、感生与导轨','先算磁通链或非静电力积分','有效面积、自感与力学反馈'],['自感互感、磁场能','设电流求磁通链，再用储能或密度积分','线性条件与耦合符号'],['电容充电、平面波与辐射','全电流方程、场比例与能流','固定曲面、瞬时平均与远区条件']);
  d.guide.pitfalls.push(...d.summary.pitfalls.slice(-11).map(p=>p.right));
})();
