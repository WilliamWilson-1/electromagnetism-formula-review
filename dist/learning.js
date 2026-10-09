(() => {
  const t=String.raw;
  const learning={};
  const add=(id,kind,steps,solves,related=[])=>{learning[id]={kind,steps,solves,related};};
  window.REVIEW_DATA.groups=[
    ['charges','charge-basics','基础定律与场的计算','点电荷 · 场强定义 · 连续分布',['coulomb','field-definition','point-field','continuous-field']],
    ['charges','charge-models','典型电荷分布','长直线 · 无限平面 · 圆环 · 圆盘',['line-field','plane-field','ring-field','disk-field']],
    ['charges','electric-dipole','电偶极子','电荷量与间距决定偶极矩',['dipole-moment']],
    ['gauss','gauss-basics','通量与高斯定理','积分形式 · 局部形式',['electric-flux','electric-gauss','gauss-local']],
    ['gauss','sphere-fields','球对称电场模型','球壳 · 均匀实心球',['shell-field','solid-sphere']],
    ['gauss','cylinder-field','柱对称电场模型','均匀带电长圆柱',['charged-cylinder']],
    ['potential','potential-work','电势差、功与势能','端点点序 · 电荷符号',['potential-difference','electric-work','potential-energy']],
    ['potential','potential-gradient','保守性与电势梯度','环路定理 · 矢量与分量',['electrostatic-loop','potential-gradient','potential-components']],
    ['potential','potential-sources','电势的叠加与积分','点电荷 · 点电荷系 · 连续分布',['point-potential','potential-sum','continuous-potential']],
    ['potential','potential-models','球壳与偶极子电势','内外分段 · 远场近似',['shell-potential','dipole-potential']],
    ['conductors','conductor-equilibrium','导体平衡与表面场','材料内零场 · 紧外侧法向场',['conductor-equilibrium','surface-field']],
    ['conductors','conductor-cavity','空腔导体与感应电荷','内壁与外壁总电荷',['cavity-charge']],
    ['dielectrics','medium-basics','电位移与自由电荷','D、E、P 的联系 · 通量',['displacement','dielectric-gauss']],
    ['dielectrics','linear-medium','线性介质关系','电容率 · 相对电容率 · 极化率',['linear-dielectric','polarization','relative-permittivity']],
    ['dielectrics','bound-surface','束缚面电荷','极化强度与介质外法向',['bound-charge']],
    ['capacitors','capacitor-connections','定义与串并联','电容定义 · 串联 · 并联',['capacitance','series-capacitance','parallel-capacitance']],
    ['capacitors','capacitor-models','不同类型的电容器','平行板 · 同心球 · 同轴圆柱',['parallel-plate','spherical-capacitor','cylindrical-capacitor']],
    ['capacitors','capacitor-energy','储能与电场能量','电容器整体 · 局部密度 · 空间积分',['capacitor-energy','energy-density','field-energy']],
    ['current','current-models','宏观与微观电流','通过截面的电流 · 载流子漂移',['current-density','carrier-current']],
    ['current','current-material','导体与电源关系','局部欧姆定律 · 非静电力做功',['ohm-local','emf-definition']],
    ['biot','magnetic-sources','磁场的基本计算','电流元 · 矢量叠加',['biot-savart','magnetic-superposition']],
    ['biot','straight-wire-models','不同直导线磁场模型','无限长 · 半无限长 · 有限长',['long-wire','half-wire','finite-wire']],
    ['biot','round-current-models','圆形电流磁场模型','轴线上 · 圆心 · 圆弧',['loop-axis','loop-center','arc-center']],
    ['biot','solenoid-model','长螺线管磁场','密绕近似 · 远离端部',['solenoid']],
    ['biot','equivalent-current','等效电流与磁矩','转动电荷 · 平面线圈',['rotating-charge','magnetic-moment']],
    ['ampere','magnetic-laws','磁场基本定律','闭合面磁通量 · 环路积分',['magnetic-gauss','ampere-law']],
    ['ampere','current-body-models','柱形载流体模型','实心长柱 · 薄壁长筒',['current-cylinder','current-shell']],
    ['ampere','toroid-model','螺线环磁场模型','同心环路 · 实际环半径',['toroid']],
    ['force','wire-force-models','导线受力的不同求法','电流元 · 积分 · 匀强场 · 直导线',['ampere-element','wire-force','uniform-wire-force','straight-force-size']],
    ['force','wire-interaction','平行导线的相互作用','先求外场，再求单位长度力',['parallel-wires']],
    ['force','loop-mechanics','线圈力矩与势能','磁矩方向 · 点积与叉乘',['magnetic-torque','magnetic-energy']],
    ['particles','particle-forces','粒子受力与能量','电场力 · 磁场力 · 电场做功',['lorentz-force','magnetic-force','magnetic-force-size','particle-energy']],
    ['particles','particle-orbits','圆周与螺旋运动','半径 · 周期 · 速度分量 · 螺距',['orbit-radius','cyclotron-frequency','velocity-components','helix-radius','helix-pitch']],
    ['particles','hall-models','霍尔效应模型','稳态电场 · 霍尔电压 · 霍尔系数',['hall-field','hall-voltage','hall-coefficient']]
  ].map(([chapter,id,title,description,ids])=>({chapter,id,title,description,ids}));

  add('coulomb','基本定律 · 使用过程',[
    ['作为真空静止点电荷的基本力学关系使用。先约定从电荷 1 指向电荷 2 的单位矢量。'],
    ['先求力的大小，再用电荷符号确定吸引或排斥。',t`F=\frac{|q_1q_2|}{4\pi\varepsilon_0r^2}`],
    ['多个电荷分别求力，按坐标分量叠加；不能直接加力的大小。']
  ],[
    ['距离',t`r=\sqrt{\frac{|q_1q_2|}{4\pi\varepsilon_0F}}`,'已知非零力的大小与两电荷量，r 取正。'],
    ['电荷量大小',t`|q_2|=\frac{4\pi\varepsilon_0r^2F}{|q_1|}`,'q₁ 非零；电荷正负另由力的方向判断。']
  ],['point-field','field-definition']);
  add('field-definition','定义 · 关系整理',[
    ['放入足够小的检验电荷，测量它受到的电场力；原场源分布保持不变。'],
    ['力与检验电荷的带符号电荷量之比定义场强。',t`\mathbf F=q_0\mathbf E\quad\Rightarrow\quad\mathbf E=\frac{\mathbf F}{q_0}`],
    ['正检验电荷的力沿 E，负检验电荷的力反向。']
  ],[
    ['电场力',t`\mathbf F=q_0\mathbf E`,'仅计电场力，不能把包含磁力的总力直接代入。'],
    ['场强大小',t`E=\frac{F}{|q_0|}`,'q₀ 非零，F 是电场力大小。']
  ],['coulomb','lorentz-force']);
  add('point-field','由库仑定律推导',[
    ['源电荷为 q，场点放置检验电荷 q₀；径向单位矢量从源指向场点。',t`\mathbf F=\frac{qq_0}{4\pi\varepsilon_0r^2}\hat{\mathbf r}`],
    ['除以带符号检验电荷量，消去 q₀。',t`\mathbf E=\frac{\mathbf F}{q_0}=\frac{q}{4\pi\varepsilon_0r^2}\hat{\mathbf r}`],
    ['q 的符号决定径向方向；多个源电荷各自使用到场点的距离。']
  ],[
    ['源电荷',t`q=4\pi\varepsilon_0r^2E_r`,'Eᵣ 为向外径向的带符号分量。'],
    ['距离',t`r=\sqrt{\frac{|q|}{4\pi\varepsilon_0E}}`,'E 为非零场强大小。']
  ],['coulomb','field-definition','point-potential']);
  add('continuous-field','由点电荷场叠加推导',[
    ['把带电体分成电荷元，按几何取线、面或体密度。',t`dq=\lambda\,dl,\qquad dq=\sigma\,dS,\qquad dq=\rho\,dV`],
    ['源点为 r′，场点为 r；位移矢量从源指向场点。',t`d\mathbf E=\frac{\mathbf r-\mathbf r'}{4\pi\varepsilon_0|\mathbf r-\mathbf r'|^3}\,dq`],
    ['先利用对称性消去抵消的分量，再对剩余分量积分。',t`E_k=\int dE_k\quad(k=x,y,z)`]
  ],[
    ['总电荷',t`Q=\int dq`,'积分域为指定带电区域；密度均匀时才可提出积分。'],
    ['场强分量',t`E_x=\int dE_x`,'先把电荷元场投影到固定 x 方向；其他分量同理。']
  ],['point-field','ring-field','disk-field']);
  add('dipole-moment','定义 · 方向说明',[
    ['两个电荷为 ±q，q 取正电荷电荷量；间距矢量从负电荷指向正电荷。'],
    ['电偶极矩同时记录电荷分离的强度与方向。',t`\mathbf p=q\boldsymbol\ell,\qquad p=q\ell`],
    ['远场电势使用 p 与场点方向的点积，须满足距离远大于间距。']
  ],[
    ['电荷量',t`q=\frac p\ell`,'p、ℓ 取大小，ℓ 非零。'],
    ['间距',t`\ell=\frac pq`,'q 为正电荷的电荷量大小。']
  ],['dipole-potential']);
  add('line-field','由高斯定理推导',[
    ['选半径 r、长度 L 的同轴圆柱面。长直线的电场沿径向，端面通量为零。'],
    ['侧面场强大小相同，包围电荷为 λL。',t`E_r(2\pi rL)=\frac{\lambda L}{\varepsilon_0}`],
    ['消去 L，大小取绝对值，方向由 λ 的符号判断。',t`E_r=\frac{\lambda}{2\pi\varepsilon_0r},\qquad E=|E_r|`]
  ],[
    ['线电荷密度大小',t`|\lambda|=2\pi\varepsilon_0rE`,'无限长近似有效，E 为大小。'],
    ['距离',t`r=\frac{|\lambda|}{2\pi\varepsilon_0E}`,'E 非零，r 为到带电线的垂距。']
  ],['electric-gauss','potential-difference']);
  add('plane-field','由高斯定理推导',[
    ['取跨过薄平面的柱形盒，两端面积均为 S。对称性给出两侧大小相同，侧面通量为零。'],
    ['两端通量同号相加。以正面电荷为例写大小关系。',t`2ES=\frac{|\sigma|S}{\varepsilon_0}`],
    ['消去 S 得单侧场；正电荷两侧向外，负电荷两侧向内。',t`E=\frac{|\sigma|}{2\varepsilon_0}`]
  ],[
    ['面电荷密度大小',t`|\sigma|=2\varepsilon_0E`,'均匀非导体无限薄片的单侧场。'],
    ['一块区域的电荷量大小',t`|Q|=2\varepsilon_0ES`,'S 为薄片上选取区域的面积，密度均匀。']
  ],['electric-gauss','surface-field']);
  add('ring-field','由电荷元积分推导',[
    ['场点在轴线上，全部电荷元到场点的距离相同。',t`s=\sqrt{R^2+x^2}`],
    ['横向分量成对抵消，轴向投影系数为 x/s。',t`dE_x=\frac{x\,dq}{4\pi\varepsilon_0s^3}`],
    ['将固定的 x、s 提出积分，积分 dq 得 Q。',t`E_x=\frac{Qx}{4\pi\varepsilon_0(R^2+x^2)^{3/2}}`]
  ],[
    ['圆环电荷量',t`Q=\frac{4\pi\varepsilon_0E_x(R^2+x^2)^{3/2}}x`,'x 非零，Eₓ 保留符号。'],
    ['圆心场强',t`E_x(0)=0`,'均匀带电圆环；不能用圆心零场反推出 Q 为零。']
  ],['continuous-field','continuous-potential']);
  add('disk-field','由圆环模型积分推导',[
    ['把圆盘分成半径 s、宽 ds 的圆环，s 为积分变量。',t`dq=2\pi\sigma s\,ds`],
    ['每个圆环只保留轴向场，对 s 从 0 到 R 积分。',t`E_x=\frac{\sigma x}{2\varepsilon_0}\int_0^R\frac{s\,ds}{(s^2+x^2)^{3/2}}`],
    ['原函数为 −1/√(s²+x²)；用 x>0 的条件整理。',t`E_x=\frac{\sigma}{2\varepsilon_0}\left(1-\frac{x}{\sqrt{x^2+R^2}}\right)`]
  ],[
    ['面电荷密度',t`\sigma=\frac{2\varepsilon_0E_x}{1-x/\sqrt{x^2+R^2}}`,'x>0、R>0，Eₓ 为轴向带符号分量。'],
    ['圆盘总电荷',t`Q=\pi R^2\sigma`,'均匀圆盘，先求 σ 再乘面积。']
  ],['ring-field','plane-field']);
  add('electric-flux','定义 · 积分整理',[
    ['面积元的方向为选定法向；闭合面统一取向外法向。'],
    ['逐面元取场与面积矢量的点积。',t`d\Phi_E=\mathbf E\cdot d\mathbf S=E\cos\theta\,dS`],
    ['平面、匀强场、夹角不变时可提出 E 与 cosθ。',t`\Phi_E=ES\cos\theta`]
  ],[
    ['法向场分量',t`E_n=\frac{\Phi_E}S`,'平面上法向分量均匀，S>0。'],
    ['真空闭合面内净电荷',t`Q_{\rm in}=\varepsilon_0\Phi_E`,'这里的 ΦE 必须是整个闭合面的净通量。']
  ],['electric-gauss']);
  add('electric-gauss','基本定律 · 使用过程',[
    ['对真空静电场的闭合面，净电通量由面内净电荷确定。作为基本定律使用。'],
    ['若对称性允许，逐段判断法向场是否恒定或为零。',t`\oint_S\mathbf E\cdot d\mathbf S=\frac{Q_{\rm in}}{\varepsilon_0}`],
    ['只有合适的对称面才能化为场强乘有效面积。',t`E_nA_{\rm 有效}=\frac{Q_{\rm in}}{\varepsilon_0}`]
  ],[
    ['包围净电荷',t`Q_{\rm in}=\varepsilon_0\oint_S\mathbf E\cdot d\mathbf S`,'右侧用全部源共同产生的总电场。'],
    ['场强',t`E_n=\frac{Q_{\rm in}}{\varepsilon_0A_{\rm 有效}}`,'仅当相关面上法向场相同，其余部分通量为零。']
  ],['line-field','shell-field','charged-cylinder']);
  add('shell-field','由球对称高斯面推导',[
    ['取同心球面，径向场在面上大小相同。',t`4\pi r^2E_r=\frac{Q_{\rm in}}{\varepsilon_0}`],
    ['壳内高斯面不包围壳电荷；球对称性使壳内场为零。',t`r<R:\quad Q_{\rm in}=0\ \Rightarrow\ E_r=0`],
    ['壳外包围全部 Q。',t`r>R:\quad E_r=\frac{Q}{4\pi\varepsilon_0r^2}`]
  ],[
    ['球壳总电荷',t`Q=4\pi\varepsilon_0r^2E_r`,'取壳外 r>R，Eᵣ 带符号。'],
    ['壳面电荷密度',t`\sigma=\frac{Q}{4\pi R^2}`,'均匀球壳，R 是壳半径。']
  ],['electric-gauss','shell-potential']);
  add('solid-sphere','由分区高斯面推导',[
    ['体电荷密度均匀，先由总体积确定密度。',t`\rho=\frac{3Q}{4\pi R^3}`],
    ['球内包围电荷按体积比增长，代入球面通量。',t`Q_{\rm in}=Q\frac{r^3}{R^3},\qquad E_r=\frac{Qr}{4\pi\varepsilon_0R^3}\quad(r<R)`],
    ['球外包围全部 Q；两段在表面给出相同场值。',t`E_r=\frac{Q}{4\pi\varepsilon_0r^2}\quad(r>R)`]
  ],[
    ['体电荷密度',t`\rho=\frac{3\varepsilon_0E_r}{r}`,'球内 0<r<R，Eᵣ 带符号。'],
    ['总电荷',t`Q=4\pi\varepsilon_0r^2E_r`,'球外 r>R；球内须改用内段关系。']
  ],['electric-gauss','gauss-local']);
  add('charged-cylinder','由柱对称高斯面推导',[
    ['选半径 r、长度 L 的同轴柱面，端面通量为零。',t`E_r(2\pi rL)=\frac{Q_{\rm in}}{\varepsilon_0}`],
    ['柱内电荷由高斯面内体积计算。',t`Q_{\rm in}=\rho\pi r^2L\ \Rightarrow\ E_r=\frac{\rho r}{2\varepsilon_0}\quad(r<R)`],
    ['柱外只包围带电柱半径 R 内的电荷。',t`Q_{\rm in}=\rho\pi R^2L\ \Rightarrow\ E_r=\frac{\rho R^2}{2\varepsilon_0r}\quad(r>R)`]
  ],[
    ['体电荷密度',t`\rho=\frac{2\varepsilon_0E_r}{r}`,'柱内 0<r<R，Eᵣ 带符号。'],
    ['等效线电荷密度',t`\lambda=\rho\pi R^2=2\pi\varepsilon_0rE_r`,'柱外 r>R。']
  ],['electric-gauss','line-field']);
  add('gauss-local','由积分定理转为局部形式',[
    ['体电荷给出的包围电荷写成体积积分。',t`Q_{\rm in}=\int_{\mathcal V}\rho\,dV`],
    ['用散度定理把闭合面通量换成体积积分。',t`\int_{\mathcal V}\nabla\cdot\mathbf E\,dV=\int_{\mathcal V}\frac{\rho}{\varepsilon_0}\,dV`],
    ['对任意小体积成立，因此逐点对应。',t`\nabla\cdot\mathbf E=\frac{\rho}{\varepsilon_0}`]
  ],[
    ['体电荷密度',t`\rho=\varepsilon_0\left(\frac{\partial E_x}{\partial x}+\frac{\partial E_y}{\partial y}+\frac{\partial E_z}{\partial z}\right)`,'电场分量可微，真空静电场。'],
    ['电场散度',t`\nabla\cdot\mathbf E=\frac{\rho}{\varepsilon_0}`,'仅给 ρ 不能唯一确定 E，还需边界等信息。']
  ],['electric-gauss','potential-components']);

  add('potential-difference','由功与电势定义整理',[
    ['电场力沿路径做功，检验电荷 q 带符号。',t`W_{a\to b}=q\int_a^b\mathbf E\cdot d\mathbf l`],
    ['电势差定义为单位电荷的电场力功。',t`V_a-V_b=\frac{W_{a\to b}}q`],
    ['消去 q 得线积分；跨不同电场区域时分别积分后相加。']
  ],[
    ['电势差',t`V_a-V_b=\int_a^b\mathbf E\cdot d\mathbf l`,'静电场，积分从 a 到 b。'],
    ['电场力功',t`W_{a\to b}=q(V_a-V_b)`,'q 带符号；先确定初末点。']
  ],['electric-work','point-potential']);
  add('electric-work','由势能差推导',[
    ['同一参考零点下，初末电势能分别为 qVₐ、qVᵦ。',t`\Delta U=qV_b-qV_a`],
    ['静电场力的功等于势能减少量。',t`W_{a\to b}=-\Delta U=q(V_a-V_b)`],
    ['负电荷保留符号：电势降低时，它的势能可能升高。']
  ],[
    ['电势差',t`V_a-V_b=\frac{W_{a\to b}}q`,'q 非零，W 取电场力做功的符号。'],
    ['势能变化',t`\Delta U=-W_{a\to b}`,'仅比较对应的静电势能变化。']
  ],['potential-energy','particle-energy']);
  add('potential-energy','定义 · 关系整理',[
    ['电势是单位电荷的电势能，电势与势能使用相同参考零点。',t`V=\frac Uq`],
    ['乘以带符号电荷量，得到该电荷在给定外场中的势能。',t`U=qV`],
    ['改变参考零点会改变 U 的常量部分，初末势能差保持不变。']
  ],[
    ['电势',t`V=\frac Uq`,'q 非零，参考零点一致。'],
    ['势能变化',t`\Delta U=q(V_b-V_a)`,'电荷量不变，电势取带符号值。']
  ],['electric-work','potential-difference']);
  add('electrostatic-loop','由静电场保守性说明',[
    ['静电场两点间的电势差只由端点决定。',t`\int_a^b\mathbf E\cdot d\mathbf l=V_a-V_b`],
    ['沿闭合路径回到原点，初末电势相同。',t`\oint\mathbf E\cdot d\mathbf l=V_a-V_a=0`],
    ['因此可选方便路径求电势差；这里的适用范围是静电场。']
  ],[
    ['闭合路径的电场力功',t`W_{\rm 闭合}=q\oint\mathbf E\cdot d\mathbf l=0`,'静电场中的完整闭合路径。'],
    ['不同路径的积分',t`\int_{a}^{b}\!\mathbf E\cdot d\mathbf l\bigg|_{\Gamma_1}=\int_{a}^{b}\!\mathbf E\cdot d\mathbf l\bigg|_{\Gamma_2}`,'两条路径具有相同初末点。']
  ],['potential-difference','emf-definition']);
  add('potential-gradient','由微小电势差推导',[
    ['把电势差关系应用到相邻两点。',t`dV=-\mathbf E\cdot d\mathbf l`],
    ['可微标量场的微分可写成梯度点积。',t`dV=\nabla V\cdot d\mathbf l`],
    ['对任意微小位移都成立，比较各方向分量。',t`\mathbf E=-\nabla V`]
  ],[
    ['给定电势求电场',t`E_k=-\frac{\partial V}{\partial k}\quad(k=x,y,z)`,'对一个坐标求偏导时，其余坐标保持不变。'],
    ['一维场的电势差',t`V(b)-V(a)=-\int_a^b E_x\,dx`,'场与路径按 x 方向表示，端点点序固定。']
  ],['potential-components','potential-difference']);
  add('potential-components','由梯度分量展开',[
    ['直角坐标中的梯度有三个独立分量。',t`\nabla V=\frac{\partial V}{\partial x}\hat{\mathbf x}+\frac{\partial V}{\partial y}\hat{\mathbf y}+\frac{\partial V}{\partial z}\hat{\mathbf z}`],
    ['对三个分量统一加负号，形成场矢量。',t`(E_x,E_y,E_z)=-\left(\frac{\partial V}{\partial x},\frac{\partial V}{\partial y},\frac{\partial V}{\partial z}\right)`],
    ['电势只依赖一个坐标时，其余偏导为零。']
  ],[
    ['场强大小',t`E=\sqrt{E_x^2+E_y^2+E_z^2}`,'先求带符号分量，再合成大小。'],
    ['电势的局部变化率',t`\frac{\partial V}{\partial x}=-E_x`,'y、z 固定；其他坐标同理。']
  ],['potential-gradient','gauss-local']);
  add('point-potential','由点电荷场积分推导',[
    ['取无穷远电势为零，沿径向积分点电荷的场。',t`V(r)-V(\infty)=\int_r^\infty E_r(s)\,ds`],
    ['代入带符号径向场，s 为积分距离。',t`V(r)=\frac{q}{4\pi\varepsilon_0}\int_r^\infty\frac{ds}{s^2}`],
    ['计算积分，保留源电荷符号。',t`V(r)=\frac{q}{4\pi\varepsilon_0r}`]
  ],[
    ['源电荷',t`q=4\pi\varepsilon_0rV`,'以无穷远为零势点，r>0。'],
    ['径向电场',t`E_r=-\frac{dV}{dr}=\frac{q}{4\pi\varepsilon_0r^2}`,'同一源电荷与同一场点。']
  ],['point-field','potential-difference']);
  add('potential-sum','由电势线性叠加整理',[
    ['各源电荷分别产生点电荷电势，采用相同的无穷远零点。',t`V_i=\frac{q_i}{4\pi\varepsilon_0r_i}`],
    ['电场叠加和线积分的线性关系使电势直接代数相加。',t`V=\sum_iV_i`],
    ['每项 qᵢ 的正负保留；rᵢ 是该源到当前场点的距离。']
  ],[
    ['电势能',t`U=q_0\sum_i\frac{q_i}{4\pi\varepsilon_0r_i}`,'q₀ 是置于给定外电荷系中的电荷，外场不因它改变。'],
    ['两点电势差',t`V_a-V_b=\sum_i\frac{q_i}{4\pi\varepsilon_0}\left(\frac1{r_{ia}}-\frac1{r_{ib}}\right)`,'两点都使用同一参考零点。']
  ],['point-potential','electric-work']);
  add('continuous-potential','由点电荷电势叠加推导',[
    ['将连续带电体分成电荷元，每元贡献为带符号标量。',t`dV=\frac{dq}{4\pi\varepsilon_0r}`],
    ['对源区域积分；r 是电荷元到固定场点的距离。',t`V=\frac1{4\pi\varepsilon_0}\int\frac{dq}{r}`],
    ['若所有电荷元到场点距离相同，则 1/r 可提出积分。',t`V=\frac{Q}{4\pi\varepsilon_0r}\quad\text{（等距情形）}`]
  ],[
    ['由电势求场',t`\mathbf E=-\nabla V`,'积分结果给出场点坐标依赖后，再求偏导。'],
    ['由等距电势反推总电荷',t`Q=4\pi\varepsilon_0rV`,'仅当所有电荷元到该场点等距，且无穷远零点有效。']
  ],['continuous-field','potential-gradient']);
  add('shell-potential','由球壳场分段积分推导',[
    ['壳外径向场与同总电荷的点电荷场相同，取无穷远为零。',t`V(r)=\int_r^\infty\frac{Q}{4\pi\varepsilon_0s^2}\,ds=\frac{Q}{4\pi\varepsilon_0r}\quad(r\ge R)`],
    ['壳内场为零，壳内任一点与壳面之间电势差为零。',t`V(r)-V(R)=\int_r^R0\,ds=0\quad(r<R)`],
    ['用表面电势确定壳内常量。',t`V(r<R)=\frac{Q}{4\pi\varepsilon_0R}`]
  ],[
    ['由壳内电势求总电荷',t`Q=4\pi\varepsilon_0RV_{\rm 内}`,'均匀球壳，参考点是无穷远。'],
    ['壳外电场',t`E_r=-\frac{dV}{dr}=\frac{Q}{4\pi\varepsilon_0r^2}`,'r>R；壳内导数为零。']
  ],['shell-field','point-potential']);
  add('dipole-potential','由两点电荷电势作远场近似',[
    ['以两电荷中点为原点，r₊、r₋ 分别为场点到正、负电荷的距离。',t`V=\frac{q}{4\pi\varepsilon_0}\left(\frac1{r_+}-\frac1{r_-}\right)`],
    ['r 远大于间距 ℓ，只保留 ℓ/r 的一阶贡献；θ 为偶极矩与场点方向夹角。',t`\frac1{r_+}-\frac1{r_-}\simeq\frac{\ell\cos\theta}{r^2}`],
    ['代入 p=qℓ 并写成点积。',t`V\simeq\frac{p\cos\theta}{4\pi\varepsilon_0r^2}=\frac{\mathbf p\cdot\hat{\mathbf r}}{4\pi\varepsilon_0r^2}`]
  ],[
    ['偶极矩沿场点方向的投影',t`p\cos\theta\simeq4\pi\varepsilon_0r^2V`,'远场近似有效；V 带符号。'],
    ['电荷量大小',t`q\simeq\frac{4\pi\varepsilon_0r^2V}{\ell\cos\theta}`,'ℓ>0、cosθ 非零，正负方向约定与 V 一致。']
  ],['dipole-moment','potential-sum']);
  add('conductor-equilibrium','由自由电荷静电平衡说明',[
    ['导体有可移动电荷。若材料内部存在宏观静电场，自由电荷将继续重新分布。'],
    ['达到静电平衡时，材料内部的宏观电场为零。',t`\mathbf E_{\rm 材料内}=0`],
    ['由场与电势关系可得同一连通导体为等势体。',t`dV=-\mathbf E\cdot d\mathbf l=0`]
  ],[
    ['同一导体两点的电势差',t`V_a-V_b=0`,'两点属于同一连通、静电平衡的导体；常电势未必是零。'],
    ['材料内高斯面包围的净电荷',t`Q_{\rm in}=\varepsilon_0\oint\mathbf E\cdot d\mathbf S=0`,'高斯面完全在导体材料中，可包住有源空腔。']
  ],['surface-field','cavity-charge']);
  add('surface-field','由跨表面高斯盒推导',[
    ['取很薄的高斯盒跨过导体表面。导体内侧场为零，侧面通量在厚度趋零时消失。'],
    ['真空外侧只有法向场贡献，盒内表面电荷为 σS。',t`E_nS=\frac{\sigma S}{\varepsilon_0}`],
    ['消去面积 S；正向沿导体向外法向。',t`E_n=\frac{\sigma}{\varepsilon_0}`]
  ],[
    ['局部面电荷密度',t`\sigma=\varepsilon_0E_n`,'导体静电平衡，紧外侧为真空，Eₙ 带符号。'],
    ['均匀区域的电荷',t`Q=\varepsilon_0E_nS`,'仅当该区域面电荷密度与法向场均匀；否则须积分。']
  ],['conductor-equilibrium','plane-field']);
  add('cavity-charge','由零场高斯面与电荷守恒推导',[
    ['在导体材料中取包住整个空腔的高斯面；面上 E=0。',t`q+Q_{\rm 内壁}=0`],
    ['导体自身的净电荷 Q 等于内外两壁电荷之和。',t`Q=Q_{\rm 内壁}+Q_{\rm 外壁}`],
    ['联立求两壁总电荷。',t`Q_{\rm 内壁}=-q,\qquad Q_{\rm 外壁}=Q+q`]
  ],[
    ['腔内净电荷',t`q=-Q_{\rm 内壁}`,'导体静电平衡，取整个内壁的总感应电荷。'],
    ['导体自身净电荷',t`Q=Q_{\rm 内壁}+Q_{\rm 外壁}`,'总电荷不能决定壁上每一点的局部分布。']
  ],['conductor-equilibrium','electric-gauss']);
  add('displacement','定义 · 矢量关系整理',[
    ['宏观介质模型中，以极化强度 P 记录介质的极化响应。'],
    ['电位移按真空场项与极化项相加定义。',t`\mathbf D=\varepsilon_0\mathbf E+\mathbf P`],
    ['各矢量按分量计算；只有相应介质条件满足时才能进一步用标量 ε。']
  ],[
    ['极化强度',t`\mathbf P=\mathbf D-\varepsilon_0\mathbf E`,'在同一场点使用 D、E。'],
    ['电场',t`\mathbf E=\frac{\mathbf D-\mathbf P}{\varepsilon_0}`,'除的是标量 ε₀，各分量分别整理。']
  ],['dielectric-gauss','linear-dielectric','polarization']);
  add('dielectric-gauss','基本定律 · 自由电荷统计',[
    ['宏观介质中的电位移闭合面通量与面内自由电荷对应，作为课程基本关系使用。'],
    ['球、柱、平面对称时，可按面元方向把通量化成有效面积上的法向 D。',t`D_nA_{\rm 有效}=Q_{\rm free,in}`],
    ['求出 D 后，满足线性各向同性模型的每层再用各自 ε 求 E。',t`\mathbf E_i=\frac{\mathbf D_i}{\varepsilon_i}`]
  ],[
    ['包围自由电荷',t`Q_{\rm free,in}=\oint_S\mathbf D\cdot d\mathbf S`,'只计自由电荷，面必须闭合。'],
    ['电位移法向分量',t`D_n=\frac{Q_{\rm free,in}}{A_{\rm 有效}}`,'对称性足够，相关面上的法向分量相同。']
  ],['displacement','linear-dielectric']);
  add('linear-dielectric','由线性极化与 D 的定义整理',[
    ['均匀各向同性线性介质中，极化强度与 E 成正比。',t`\mathbf P=\varepsilon_0\chi_e\mathbf E`],
    ['代入电位移定义，将 E 的系数合并。',t`\mathbf D=\varepsilon_0(1+\chi_e)\mathbf E`],
    ['用 ε=ε₀εᵣ、εᵣ=1+χₑ 整理。',t`\mathbf D=\varepsilon\mathbf E`]
  ],[
    ['电场',t`\mathbf E=\frac{\mathbf D}{\varepsilon}`,'满足标量电容率模型；分层时逐层代入。'],
    ['电容率',t`\varepsilon=\frac DE`,'D、E 为同向非零大小，线性各向同性模型。']
  ],['displacement','polarization','relative-permittivity']);
  add('polarization','线性模型 · 系数定义',[
    ['在均匀各向同性线性介质中，P 与 E 同向且呈线性响应。'],
    ['用无量纲电极化率 χₑ 表示比例系数。',t`\mathbf P=\varepsilon_0\chi_e\mathbf E`],
    ['与 D 的定义联立，可将极化响应写成介电参数差。',t`\mathbf P=(\varepsilon-\varepsilon_0)\mathbf E`]
  ],[
    ['电极化率',t`\chi_e=\frac{P}{\varepsilon_0E}`,'P、E 同向，E 非零；使用带符号投影时保持同一正向。'],
    ['束缚面电荷密度',t`\sigma_b=\varepsilon_0\chi_e\mathbf E\cdot\hat{\mathbf n}`,'n 沿介质向外，使用表面内侧对应的极化强度。']
  ],['linear-dielectric','bound-charge']);
  add('relative-permittivity','由介电参数定义整理',[
    ['相对电容率是电容率与真空电容率之比，无量纲。',t`\varepsilon_r=\frac{\varepsilon}{\varepsilon_0}`],
    ['线性模型中由 D=ε₀E+P 与 P=ε₀χₑE 合并系数。',t`\varepsilon=\varepsilon_0(1+\chi_e)`],
    ['比较得到相对电容率与极化率的关系。',t`\varepsilon_r=1+\chi_e`]
  ],[
    ['电容率',t`\varepsilon=\varepsilon_r\varepsilon_0`,'ε 有单位，εᵣ 无量纲。'],
    ['电极化率',t`\chi_e=\varepsilon_r-1`,'用于当前线性介质模型。']
  ],['linear-dielectric','polarization']);
  add('bound-charge','极化表面关系 · 法向投影',[
    ['表面的束缚电荷取决于极化在介质外法向上的分量，使用课程给出的极化表面关系。'],
    ['设 P 与介质向外法向夹角为 θ，取点积。',t`\sigma_b=\mathbf P\cdot\hat{\mathbf n}=P\cos\theta`],
    ['内表面的介质外法向可能指向几何中心；符号需逐面判断。']
  ],[
    ['极化强度的法向分量',t`P_n=\sigma_b`,'以介质外法向为正。'],
    ['指定表面上的束缚总电荷',t`Q_b=\int_S\sigma_b\,dS`,'S 是指定介质表面；若 σb 均匀则等于 σbS。']
  ],['polarization','displacement']);
  add('capacitance','定义 · 关系整理',[
    ['两极板带等量异号电荷；定义中 Q 和极板电压 U 取大小。'],
    ['在线性结构中，Q 与 U 成比例，比例系数为电容。',t`Q=CU\quad\Rightarrow\quad C=\frac QU`],
    ['计算状态变化前，先由几何和介质求 C，再判断 Q 或 U 的约束。']
  ],[
    ['极板电荷量大小',t`Q=CU`,'电容、电压使用同一状态的值。'],
    ['极板电压大小',t`U=\frac QC`,'C>0；有向电势差的正负需按端点另定。']
  ],['parallel-plate','series-capacitance','capacitor-energy']);
  add('series-capacitance','由串联电压相加推导',[
    ['标准串联的中间孤立节点初始净电荷为零，各电容的极板电荷量大小相同。'],
    ['分别用 Uᵢ=Q/Cᵢ，总电压为各段之和。',t`U=\sum_iU_i=Q\sum_i\frac1{C_i}`],
    ['由等效电容 Q/U 得倒数和。',t`\frac1{C_{\rm 串}}=\sum_i\frac1{C_i}`]
  ],[
    ['两个电容的等效电容',t`C_{\rm 串}=\frac{C_1C_2}{C_1+C_2}`,'两个标准串联电容器。'],
    ['各电容电压',t`U_i=\frac{C_{\rm 串}}{C_i}U`,'标准串联约束有效，U 为整组电压。']
  ],['capacitance','parallel-capacitance']);
  add('parallel-capacitance','由并联电荷相加推导',[
    ['各电容连接在相同两节点间，因此电压都为 U。'],
    ['各支路电荷量大小按 Qᵢ=CᵢU 求，整组电荷量为和。',t`Q=\sum_iQ_i=U\sum_iC_i`],
    ['用等效电容 Q/U 整理。',t`C_{\rm 并}=\sum_iC_i`]
  ],[
    ['各电容电荷量',t`Q_i=C_iU`,'相同两节点，先确定最终共同电压。'],
    ['共同电压',t`U=\frac{Q}{\sum_iC_i}`,'Q 为按相同极性定义的节点电荷量；变更接线时须先处理符号和守恒。']
  ],['capacitance','series-capacitance']);
  add('parallel-plate','由板间场与电势差推导',[
    ['忽略边缘，板间介质均匀。自由面电荷密度为 Q/S。',t`D=\frac QS,\qquad E=\frac{Q}{\varepsilon S}`],
    ['板间场匀强，极板电压大小为场强乘板距。',t`U=Ed=\frac{Qd}{\varepsilon S}`],
    ['将 Q/U 约去 Q，得到结构决定的电容。',t`C=\frac{\varepsilon S}{d}`]
  ],[
    ['板间场强',t`E=\frac Ud=\frac{Q}{\varepsilon S}`,'先按接电源或孤立状态确定 U 或 Q。'],
    ['板距',t`d=\frac{\varepsilon S}{C}`,'均匀介质、有效面积 S 已知，边缘效应可忽略。']
  ],['dielectric-gauss','linear-dielectric','capacitance']);
  add('spherical-capacitor','由球对称场积分推导',[
    ['内球带 +Q，外球带 −Q，a<r<b，均匀介质。',t`E_r=\frac{Q}{4\pi\varepsilon r^2}`],
    ['沿径向由内球到外球积分电势差大小。',t`U=\int_a^b E_r\,dr=\frac{Q}{4\pi\varepsilon}\left(\frac1a-\frac1b\right)`],
    ['取 Q/U 并整理分母。',t`C=4\pi\varepsilon\frac{ab}{b-a}`]
  ],[
    ['两球间电场',t`E_r=\frac{CU}{4\pi\varepsilon r^2}`,'a<r<b；U 为内球高电势时的正电压大小。'],
    ['介质电容率',t`\varepsilon=\frac{C(b-a)}{4\pi ab}`,'同心球、均匀线性各向同性介质。']
  ],['dielectric-gauss','potential-difference','capacitance']);
  add('cylindrical-capacitor','由柱对称场积分推导',[
    ['长为 L 的同轴筒，半径 a<b。忽略端部，筒间高斯柱面给出径向场。',t`E_r(2\pi rL)=\frac Q\varepsilon\ \Rightarrow\ E_r=\frac{Q}{2\pi\varepsilon Lr}`],
    ['由内筒到外筒积分，1/r 的积分给出对数。',t`U=\frac{Q}{2\pi\varepsilon L}\int_a^b\frac{dr}{r}=\frac{Q}{2\pi\varepsilon L}\ln\frac ba`],
    ['取 Q/U，注意 b/a>1。',t`C=\frac{2\pi\varepsilon L}{\ln(b/a)}`]
  ],[
    ['筒间电场',t`E_r=\frac{U}{r\ln(b/a)}`,'a<r<b，内筒为高电势，均匀介质。'],
    ['单位长度电容',t`\frac CL=\frac{2\pi\varepsilon}{\ln(b/a)}`,'L 足够长，可忽略端部。']
  ],['dielectric-gauss','potential-difference','capacitance']);
  add('capacitor-energy','由充电微元功积分推导',[
    ['线性电容 C 固定，充到中间电荷 q′ 时电压为 q′/C。',t`dW=U(q')\,dq'=\frac{q'}C\,dq'`],
    ['从未充电积分到最终 Q。',t`W=\int_0^Q\frac{q'}C\,dq'=\frac{Q^2}{2C}`],
    ['用 Q=CU 换元，得到三种等价写法。',t`W=\frac{Q^2}{2C}=\frac12QU=\frac12CU^2`]
  ],[
    ['固定电荷时求储能',t`W=\frac{Q^2}{2C}`,'比较各状态，分别用该状态的 C。'],
    ['由储能反求电压',t`U=\sqrt{\frac{2W}{C}}`,'U 取电压大小，C>0，W 非负。'],
    ['由储能反求电荷量',t`Q=\sqrt{2CW}`,'Q 取大小，使用同一状态数据。']
  ],['capacitance','energy-density']);
  add('energy-density','由平行板储能认识局部形式',[
    ['均匀线性介质的平行板中，代入 C=εS/d 与 U=Ed。',t`W=\frac12\frac{\varepsilon S}{d}(Ed)^2=\frac12\varepsilon E^2Sd`],
    ['板间体积为 Sd，除以体积得到能量密度。',t`w_e=\frac W{Sd}=\frac12\varepsilon E^2`],
    ['线性介质的课程局部形式写成点积；标量 εE² 用于各向同性情况。',t`w_e=\frac12\mathbf E\cdot\mathbf D`]
  ],[
    ['均匀区总场能',t`W=w_e\mathcal V`,'𝒱 是该区体积，wₑ 均匀。'],
    ['场强大小',t`E=\sqrt{\frac{2w_e}{\varepsilon}}`,'各向同性线性介质，ε>0；方向需由场源另定。']
  ],['capacitor-energy','field-energy']);
  add('field-energy','由能量密度逐体积叠加',[
    ['小体积元的能量等于局部密度乘体积元。',t`dW=w_e\,dV`],
    ['遍历所需电场空间，把各体积元能量相加。',t`W=\int_{\mathcal V}w_e\,dV`],
    ['球对称可用 4πr²dr，柱对称可用 2πrLdr；介质分层时分区积分。']
  ],[
    ['均匀区能量',t`W=w_e\mathcal V`,'𝒱 为体积，密度均匀。'],
    ['球对称线性介质场能',t`W=\int_{r_1}^{r_2}\frac12\varepsilon(r)E(r)^2\,4\pi r^2\,dr`,'明确积分区域；若参数分段变化则分段积分。']
  ],['energy-density','capacitor-energy']);

  add('current-density','定义 · 截面通量整理',[
    ['电流定义为单位时间穿过指定截面的有向电荷量。',t`I=\frac{dq}{dt}`],
    ['每个面元贡献由电流密度的法向分量决定。',t`dI=\mathbf j\cdot d\mathbf S`],
    ['对截面积分；均匀且垂直截面时简化。',t`I=\int_S\mathbf j\cdot d\mathbf S,\qquad I=jS\ \text{（均匀垂直）}`]
  ],[
    ['均匀电流密度的法向分量',t`j_n=\frac IS`,'法向分量在整个截面上相同。'],
    ['一段时间内通过的有向电荷',t`q=\int_{t_1}^{t_2}I(t)\,dt`,'I 恒定时为 IΔt；积分是该时段通过的净电荷。']
  ],['carrier-current','ohm-local']);
  add('carrier-current','由漂移通过的载流子数推导',[
    ['均匀漂移中，dt 内通过截面 S 的载流子来自长度 vdt 的小柱体。',t`dN=nSv_d\,dt`],
    ['乘单个载流子电荷得到通过电荷，再除以 dt 和 S。',t`I=nqv_dS\quad\text{（带方向约定）}`],
    ['矢量形式保留 q 的符号，负载流子电流方向与漂移相反。',t`\mathbf j=nq\mathbf v_d`]
  ],[
    ['漂移速率',t`v_d=\frac{j}{n|q|}`,'j 为电流密度大小，单一载流子，n>0。'],
    ['载流子浓度',t`n=\frac{I}{|q|v_dS}`,'I、vd 取大小，电流均匀且垂直截面。']
  ],['current-density','hall-voltage']);
  add('ohm-local','导体本构关系 · 代数整理',[
    ['满足欧姆定律的导体中，局部电流密度与电场成比例，采用课程给出的本构关系。',t`\mathbf j=\sigma_c\mathbf E`],
    ['电阻率与电导率互为倒数。',t`\rho_{\rm res}=\frac1{\sigma_c}`],
    ['按已知参数选等价形式；材料参数下标与电荷密度符号区分。',t`\mathbf j=\frac{\mathbf E}{\rho_{\rm res}}`]
  ],[
    ['电场',t`\mathbf E=\rho_{\rm res}\mathbf j`,'欧姆导体，使用同一位置的局部量。'],
    ['电导率或电阻率',t`\sigma_c=\frac jE,\qquad\rho_{\rm res}=\frac Ej`,'j、E 为非零同向大小，适用标量材料参数模型。']
  ],['current-density','carrier-current']);
  add('emf-definition','定义 · 非静电力做功',[
    ['电动势表示非静电力沿闭合电路对单位正电荷的功。',t`\mathcal E=\frac{W_{\rm 非静电}}q`],
    ['用非静电力与电荷之比定义等效非静电场。',t`\mathbf E_{\rm 非静电}=\frac{\mathbf f_{\rm 非静电}}q`],
    ['把单位电荷沿路径做功写成积分。',t`\mathcal E=\oint\mathbf E_{\rm 非静电}\cdot d\mathbf l`]
  ],[
    ['非静电力做功',t`W_{\rm 非静电}=q\mathcal E`,'沿完整约定回路，q 和回路方向保持一致。'],
    ['电动势',t`\mathcal E=\frac{W_{\rm 非静电}}q`,'q 非零；该定义不直接等于任意状态的电源端电压。']
  ],['electrostatic-loop','current-density']);
  add('biot-savart','基本定律 · 电流元使用过程',[
    ['采用真空稳恒电流元的磁场基本关系。电流元方向沿常规电流，r 从源点指向场点。'],
    ['先用叉乘判方向；θ 为电流元与源到场点方向夹角。',t`dB=\frac{\mu_0I\,dl\sin\theta}{4\pi r^2}`],
    ['微元方向变化时先投影，再对电流路径积分。',t`\mathbf B=\int d\mathbf B`]
  ],[
    ['磁场分量',t`B_k=\int dB_k\quad(k=x,y,z)`,'固定坐标后逐电流元投影。'],
    ['单个小电流元的贡献',t`dB=\frac{\mu_0I\,dl\sin\theta}{4\pi r^2}`,'r>0；不是任意整段导线可直接套的有限公式。']
  ],['finite-wire','loop-axis','magnetic-superposition']);
  add('magnetic-superposition','线性叠加 · 积分整理',[
    ['将电流分布拆成若干直段、圆弧或线圈，每部分单独计算。'],
    ['分别记录方向和分量，叠加全部贡献。',t`\mathbf B=\sum_i\mathbf B_i\quad\text{或}\quad\mathbf B=\int d\mathbf B`],
    ['先求矢量结果，再取大小；反向的贡献可以抵消。']
  ],[
    ['总场分量',t`B_x=\sum_iB_{ix},\quad B_y=\sum_iB_{iy},\quad B_z=\sum_iB_{iz}`,'每项使用同一坐标方向。'],
    ['总场大小',t`B=\sqrt{B_x^2+B_y^2+B_z^2}`,'先合成分量，不能直接相加各部分大小。']
  ],['biot-savart','long-wire','arc-center']);
  add('long-wire','由环路定理或有限直线极限推导',[
    ['取以导线为中心、半径 r 的圆环路，B 沿切向且大小恒定。',t`B(2\pi r)=\mu_0I`],
    ['消去环路长度得到模型公式。',t`B=\frac{\mu_0I}{2\pi r}`],
    ['也可在有限直线公式中令有向角为 −π/2、π/2；角差项等于 2。']
  ],[
    ['电流大小',t`I=\frac{2\pi rB}{\mu_0}`,'r 是垂距，方向由右手定则另定。'],
    ['垂直距离',t`r=\frac{\mu_0I}{2\pi B}`,'I、B 取非零大小，场点在导线外。']
  ],['ampere-law','finite-wire','half-wire']);
  add('half-wire','由有限直线端点角推导',[
    ['场点在端点的垂线上，最近端点的有向角为 0，无穷远端为 π/2。'],
    ['代入有限直线公式的角差项。',t`B=\frac{\mu_0I}{4\pi r}\left(\sin\frac\pi2-\sin0\right)`],
    ['角差项为 1，结果是同垂距无限长导线的一半。',t`B=\frac{\mu_0I}{4\pi r}`]
  ],[
    ['电流大小',t`I=\frac{4\pi rB}{\mu_0}`,'必须满足场点在端点垂线上的几何条件。'],
    ['垂距',t`r=\frac{\mu_0I}{4\pi B}`,'B 非零，使用大小关系。']
  ],['finite-wire','long-wire']);
  add('finite-wire','由毕奥–萨伐尔积分推导',[
    ['以垂足为 z=0，导线端点坐标为 z₁、z₂，场点垂距为 a>0。',t`B=\frac{\mu_0I}{4\pi}\int_{z_1}^{z_2}\frac{a\,dz}{(a^2+z^2)^{3/2}}`],
    ['用 z=a tanα 换元，α 是相对垂线的有向角。',t`\frac{a\,dz}{(a^2+z^2)^{3/2}}=\frac{\cos\alpha}{a}\,d\alpha`],
    ['按同一方向有序取 α₁、α₂ 并积分。',t`B=\frac{\mu_0I}{4\pi a}(\sin\alpha_2-\sin\alpha_1)`]
  ],[
    ['电流大小',t`I=\frac{4\pi aB}{\mu_0(\sin\alpha_2-\sin\alpha_1)}`,'按当前有序角约定使括号为正；方向由叉乘确定。'],
    ['端点角',t`\alpha_i=\arctan\frac{z_i}{a}`,'zᵢ 从同一垂足沿同一轴方向计量，角保持符号。']
  ],['biot-savart','long-wire','half-wire']);
  add('loop-axis','由圆电流微元积分推导',[
    ['半径 R 的圆电流到轴上场点距离相同，记为 s。',t`s=\sqrt{R^2+x^2}`],
    ['横向磁场抵消，轴向微元分量为 μ₀IRdl/(4πs³)。',t`B_x=\frac{\mu_0IR}{4\pi s^3}\oint dl`],
    ['圆周总长度为 2πR，代入并整理。',t`B_x=\frac{\mu_0IR^2}{2(R^2+x^2)^{3/2}}`]
  ],[
    ['单匝圆电流大小',t`I=\frac{2B_x(R^2+x^2)^{3/2}}{\mu_0R^2}`,'x 轴正向按电流右手规则定义，R>0。'],
    ['中心磁场',t`B(0)=\frac{\mu_0I}{2R}`,'单匝；N 个同半径同方向线圈再乘 N。']
  ],['biot-savart','loop-center']);
  add('loop-center','由轴线上磁场取中心并叠加',[
    ['单匝圆电流轴线公式取 x=0。',t`B_1=\frac{\mu_0IR^2}{2R^3}=\frac{\mu_0I}{2R}`],
    ['N 匝近似同半径、同中心、同电流方向，贡献同向相加。',t`B=NB_1=\frac{\mu_0NI}{2R}`],
    ['中心外的轴上点改用轴线公式；任意非轴上点不能直接套此式。']
  ],[
    ['电流大小',t`I=\frac{2RB}{\mu_0N}`,'N 匝相同几何、方向同向。'],
    ['线圈半径',t`R=\frac{\mu_0NI}{2B}`,'已知中心非零场大小。']
  ],['loop-axis','arc-center']);
  add('arc-center','由圆弧电流元积分推导',[
    ['场点在圆心，电流元与源到场点方向垂直，所有贡献同向。',t`dB=\frac{\mu_0I}{4\pi R^2}\,dl`],
    ['用弧长元 dl=R dφ，φ 以弧度计。',t`B=\frac{\mu_0I}{4\pi R}\int_0^\varphi d\phi`],
    ['积分得到角度比例；径向连接段在圆心的叉乘为零。',t`B=\frac{\mu_0I\varphi}{4\pi R}`]
  ],[
    ['圆弧角度',t`\varphi=\frac{4\pi RB}{\mu_0I}`,'场点在圆心，I 非零，结果单位为弧度。'],
    ['电流大小',t`I=\frac{4\pi RB}{\mu_0\varphi}`,'φ>0；组合电流需先剔除其他段的磁场贡献。']
  ],['biot-savart','loop-center']);
  add('solenoid','由长螺线管安培环路推导',[
    ['长密绕近似下，内部远离端部的场沿轴，外部贡献近似忽略。'],
    ['取一边长 ℓ 在内部的矩形环路，穿过的匝数为 nℓ。',t`B\ell\simeq\mu_0(n\ell)I`],
    ['消去 ℓ，并将匝密度写成总匝数除长度。',t`B\simeq\mu_0nI,\qquad n=\frac NL`]
  ],[
    ['电流大小',t`I\simeq\frac{B}{\mu_0n}`,'真空长密绕螺线管内部远离端部。'],
    ['总匝数',t`N\simeq\frac{BL}{\mu_0I}`,'L 是螺线管长度，I 非零。']
  ],['ampere-law','toroid']);
  add('rotating-charge','由一个周期通过的电荷推导',[
    ['电荷元以角速度 ω 作匀速转动，转动周期为 2π/ω。',t`T_{\rm 转}=\frac{2\pi}{\omega}`],
    ['每周期通过固定方位一次，等效电流为电荷除周期。',t`dI=\frac{dq}{T_{\rm 转}}=\frac{\omega}{2\pi}\,dq`],
    ['带电圆盘可分成同心圆环，各环先求等效电流，再积分磁场或磁矩。']
  ],[
    ['等效圆环电流',t`I=\frac{\omega Q}{2\pi}`,'全部 Q 在同一圆环并以相同 ω 转动，方向结合 Q 符号。'],
    ['单圆环磁矩大小',t`m=|I|\pi R^2`,'圆环半径 R，磁矩方向由等效电流右手规则定。']
  ],['loop-center','magnetic-moment']);
  add('magnetic-moment','定义 · 匝数叠加',[
    ['平面单匝线圈的面积矢量按电流右手规则取向。',t`\mathbf S=S\hat{\mathbf n}`],
    ['单匝磁矩定义为电流乘面积矢量；N 匝同向贡献叠加。',t`\mathbf m=NI\mathbf S`],
    ['磁矩与场的夹角决定线圈力矩和势能。']
  ],[
    ['电流大小',t`I=\frac m{NS}`,'m、I 取大小，N 匝同向，S>0。'],
    ['线圈面积',t`S=\frac m{NI}`,'平面线圈、I 非零；方向由绕向另定。']
  ],['magnetic-torque','magnetic-energy']);
  add('magnetic-gauss','基本定律 · 闭合面通量说明',[
    ['采用课程的磁场基本关系：磁场线没有磁荷源或终点，闭合面净磁通量为零。'],
    ['每次穿入与穿出按外法向记相反符号，完整闭合面通量相抵。',t`\oint_S\mathbf B\cdot d\mathbf S=0`],
    ['开放曲面的通量可非零；此定理不单独给出每点 B 的值。']
  ],[
    ['闭合面一部分的磁通量',t`\Phi_{B,1}=-\Phi_{B,2}`,'两部分共同组成完整闭合面，均沿闭合面的外法向。'],
    ['匀强场穿过平面的通量',t`\Phi_B=BS\cos\theta`,'开放平面上匀强场，θ 为场与所选法向的夹角。']
  ],['ampere-law','magnetic-superposition']);
  add('ampere-law','基本定律 · 环路使用过程',[
    ['真空稳恒磁场按环路定理计算；绕向与穿面电流正向用右手规则配对。'],
    ['把每根穿面电流计为带符号代数和。',t`\oint_L\mathbf B\cdot d\boldsymbol\ell=\mu_0\sum_iI_i`],
    ['只有对称性保证切向 B 恒定，且其他环路部分贡献可知时，才能直接解 B。']
  ],[
    ['穿面净电流',t`I_{\rm 穿过}=\frac1{\mu_0}\oint_L\mathbf B\cdot d\boldsymbol\ell`,'环路中 B 是所有相关电流共同产生的场。'],
    ['同心圆环路上的场',t`B=\frac{\mu_0I_{\rm 穿过}}{2\pi r}`,'B 沿切向且整圈大小恒定，正向与环路绕向一致。']
  ],['long-wire','current-cylinder','toroid']);
  add('current-cylinder','由穿面电流分区推导',[
    ['电流密度均匀，截面半径 R。',t`j=\frac{I}{\pi R^2}`],
    ['柱内环路穿过的电流由面积比确定。',t`I_{\rm in}=I\frac{r^2}{R^2},\qquad B=\frac{\mu_0Ir}{2\pi R^2}\quad(r<R)`],
    ['柱外环路穿过全部 I，分别使用各区表达式。',t`B=\frac{\mu_0I}{2\pi r}\quad(r>R)`]
  ],[
    ['由柱内场求电流密度大小',t`j=\frac{2B}{\mu_0r}`,'0<r<R，均匀载流长柱。'],
    ['由柱外场求总电流大小',t`I=\frac{2\pi rB}{\mu_0}`,'r>R，大小关系。']
  ],['ampere-law','current-density']);
  add('current-shell','由薄壁电流的分区环路推导',[
    ['电流全部在半径 R 的薄壁上，选同轴圆环路。'],
    ['筒内没有穿面电流；结合柱对称性推出筒内零场。',t`r<R:\quad B(2\pi r)=0\ \Rightarrow\ B=0`],
    ['筒外包围全部电流。',t`r>R:\quad B(2\pi r)=\mu_0I\ \Rightarrow\ B=\frac{\mu_0I}{2\pi r}`]
  ],[
    ['总电流大小',t`I=\frac{2\pi rB}{\mu_0}`,'使用筒外 r>R 的场值。'],
    ['筒内场',t`B=0`,'理想无限长薄壁载流筒；筒内零场不能反推出筒壁电流为零。']
  ],['ampere-law','current-cylinder']);
  add('toroid','由同心环路穿过匝数推导',[
    ['场点位于理想密绕螺线环绕组截面内，选半径 r 的同心圆环路。'],
    ['环路对应穿面电流的代数和为 NI。',t`B(2\pi r)=\mu_0NI`],
    ['消去环路长度；r 为到环中心轴的距离。',t`B(r)=\frac{\mu_0NI}{2\pi r}`]
  ],[
    ['电流大小',t`I=\frac{2\pi rB}{\mu_0N}`,'场点在绕组截面内部，N 为总匝数。'],
    ['局部等效匝密度',t`n_{\rm 等效}(r)=\frac{N}{2\pi r},\qquad B=\mu_0n_{\rm 等效}(r)I`,'只是当前公式的几何整理，不要将 r 换成绕组截面半径。']
  ],['ampere-law','solenoid']);
  add('ampere-element','受力基本关系 · 电流元使用',[
    ['外磁场中的载流微元按课程安培力关系求受力；电流元方向沿常规电流。'],
    ['先用叉乘判断方向，再用 θ 表示电流元与外场夹角。',t`d\mathbf F=I\,d\boldsymbol\ell\times\mathbf B,\qquad dF=I\,dl\,B\sin\theta`],
    ['整段导线需要按受力分量积分，B 使用该电流元位置的外加场。']
  ],[
    ['微元受力大小',t`dF=I\,dl\,B\sin\theta`,'I 取大小，θ 为电流元与 B 的夹角。'],
    ['合力分量',t`F_k=\int dF_k\quad(k=x,y,z)`,'场或方向变化时，先逐点求分量。']
  ],['wire-force','biot-savart']);
  add('wire-force','由电流元力积分推导',[
    ['每个电流元的受力按当前位置的外磁场求。',t`d\mathbf F=I\,d\boldsymbol\ell\times\mathbf B(\mathbf r)`],
    ['稳恒同一导线上的 I 恒定，可提出 I，再按分量积分。',t`\mathbf F=I\int d\boldsymbol\ell\times\mathbf B(\mathbf r)`],
    ['非匀强 B 留在积分内；匀强时才可再把 B 提出。']
  ],[
    ['分段导线的合力',t`\mathbf F=\sum_i\mathbf F_i`,'各段受力用同一坐标，按矢量相加。'],
    ['合力大小',t`F=\sqrt{F_x^2+F_y^2+F_z^2}`,'先积分分量；不能积分各微元大小来代替合力。']
  ],['ampere-element','uniform-wire-force']);
  add('uniform-wire-force','由匀强场导线积分推导',[
    ['整段导线处于同一匀强 B 中，将 B 提出积分。',t`\mathbf F=I\left(\int_a^b d\boldsymbol\ell\right)\times\mathbf B`],
    ['路径上的位移微元积分等于首尾位移。',t`\int_a^b d\boldsymbol\ell=\mathbf r_b-\mathbf r_a=\mathbf L`],
    ['因此弯曲导线也可用首尾位移求合力。',t`\mathbf F=I\mathbf L\times\mathbf B`]
  ],[
    ['合力大小',t`F=IBL_\perp`,'L⊥ 为首尾位移垂直于 B 的分量大小，不是弧长。'],
    ['闭合导线的合力',t`\mathbf L=0\ \Rightarrow\ \mathbf F=0`,'整条闭合导线处于同一匀强外场；力矩仍可能非零。']
  ],['wire-force','straight-force-size','magnetic-torque']);
  add('straight-force-size','由导线叉乘取大小',[
    ['直导线的首尾位移沿电流方向，大小为实际长度 L。',t`\mathbf F=I\mathbf L\times\mathbf B`],
    ['叉乘大小为两矢量大小乘夹角正弦。',t`F=ILB\sin\theta`],
    ['平行时为零，垂直时最大；θ 是电流方向与 B 的夹角。']
  ],[
    ['电流大小',t`I=\frac{F}{LB\sin\theta}`,'分母非零，直导线完整处于匀强外场。'],
    ['外磁场大小',t`B=\frac{F}{IL\sin\theta}`,'分母非零，方向另由受力与电流判断。']
  ],['uniform-wire-force','ampere-element']);
  add('parallel-wires','先求另一导线的场再求力',[
    ['导线 1 在导线 2 处产生无限长直线磁场。',t`B_1=\frac{\mu_0I_1}{2\pi r}`],
    ['导线 2 与该场垂直，长 L 的受力大小为 I₂LB₁。',t`F=I_2LB_1`],
    ['代入得到单位长度力；方向用两次右手规则确定。',t`\frac FL=\frac{\mu_0I_1I_2}{2\pi r}`]
  ],[
    ['两导线间距',t`r=\frac{\mu_0I_1I_2}{2\pi(F/L)}`,'各 I 取大小，F/L 非零，平行无限长近似。'],
    ['导线 2 的电流大小',t`I_2=\frac{2\pi r(F/L)}{\mu_0I_1}`,'I₁ 非零；同向相吸，反向相斥。']
  ],['long-wire','straight-force-size']);
  add('magnetic-torque','由线圈力偶与磁矩整理',[
    ['在匀强场中，闭合平面线圈各边的安培力合力为零，但相对的力可形成力偶。'],
    ['矩形线圈逐边求力矩，可整理为面积 S 与法线夹角 θ 的关系。',t`\tau=NISB\sin\theta`],
    ['用磁矩大小 m=NIS 替换，并按方向写成叉乘。',t`\boldsymbol\tau=\mathbf m\times\mathbf B`]
  ],[
    ['力矩大小',t`\tau=mB\sin\theta`,'θ 为磁矩与 B 的夹角，不能取平面与 B 的夹角。'],
    ['磁矩大小',t`m=\frac{\tau}{B\sin\theta}`,'分母非零，线圈处于匀强外场。']
  ],['magnetic-moment','magnetic-energy']);
  add('magnetic-energy','由磁力矩对转角积分',[
    ['θ 为磁矩与 B 的夹角，磁力矩使 θ 减小；沿增大 θ 的方向，其分量为负。',t`\tau_\theta=-mB\sin\theta`],
    ['势能微分等于磁力矩做功的负值。',t`dU=-\tau_\theta\,d\theta=mB\sin\theta\,d\theta`],
    ['以 θ=π/2 时 U=0 积分，得到点积形式。',t`U=-mB\cos\theta=-\mathbf m\cdot\mathbf B`]
  ],[
    ['两取向间势能变化',t`\Delta U=mB(\cos\theta_{\rm 初}-\cos\theta_{\rm 末})`,'给定磁矩与固定匀强外场，采用同一零点。'],
    ['夹角',t`\cos\theta=-\frac{U}{mB}`,'mB 非零，|U|≤mB，零点采用垂直取向。']
  ],['magnetic-torque','magnetic-moment']);

  add('lorentz-force','受力基本关系 · 两部分合成',[
    ['分别计算电场力与磁场力，采用课程洛伦兹力关系。',t`\mathbf F_E=q\mathbf E,\qquad\mathbf F_B=q\mathbf v\times\mathbf B`],
    ['把两种力按矢量合成。',t`\mathbf F=q(\mathbf E+\mathbf v\times\mathbf B)`],
    ['q 带符号；负电荷的两种力都与正电荷对应结果反向。']
  ],[
    ['由总电磁力反求电场',t`\mathbf E=\frac{\mathbf F}{q}-\mathbf v\times\mathbf B`,'q 非零，F 仅含电磁力，v、B 已知。'],
    ['瞬时加速度',t`\mathbf a=\frac q m(\mathbf E+\mathbf v\times\mathbf B)`,'非相对论粒子仅受这些力，m 为质量且非零。']
  ],['field-definition','magnetic-force','particle-energy']);
  add('magnetic-force','由洛伦兹力的磁场部分整理',[
    ['取洛伦兹力中的磁场贡献。',t`\mathbf F_B=q\mathbf v\times\mathbf B`],
    ['叉乘垂直于 v，因此磁力与瞬时速度点积为零。',t`\mathbf F_B\cdot\mathbf v=0`],
    ['磁力的功率为零；只有磁力时动能与速率不变，方向可改变。']
  ],[
    ['磁力大小',t`F_B=|q|v_\perp B`,'v⊥ 是速度垂直 B 的分量大小。'],
    ['仅受磁力时动能变化',t`\Delta K=0`,'K 为粒子动能；其他力做功时应另行计入。']
  ],['magnetic-force-size','orbit-radius','lorentz-force']);
  add('magnetic-force-size','由叉乘关系取大小',[
    ['磁力矢量为 qv×B；q 的符号影响方向。'],
    ['取大小时电荷量变为绝对值，叉乘给出夹角正弦。',t`F_B=|q|\,|\mathbf v\times\mathbf B|=|q|vB\sin\theta`],
    ['等价地写成垂直速度分量 v⊥ 的作用。',t`F_B=|q|v_\perp B`]
  ],[
    ['磁场大小',t`B=\frac{F_B}{|q|v\sin\theta}`,'分母非零；θ 为 v 与 B 的夹角。'],
    ['垂直速度分量大小',t`v_\perp=\frac{F_B}{|q|B}`,'q、B 非零，不能由此单独求总速率。']
  ],['magnetic-force','velocity-components']);
  add('orbit-radius','由磁力提供向心力推导',[
    ['非相对论粒子垂直进入匀强磁场，仅受磁力，速率不变。'],
    ['磁力大小等于圆周运动所需向心力。',t`|q|vB=\frac{mv^2}{R}`],
    ['约去非零速率并解 R；电荷符号用于判圆心在哪一侧。',t`R=\frac{mv}{|q|B}`]
  ],[
    ['速率',t`v=\frac{|q|BR}{m}`,'垂直入射、仅受匀强磁力，m>0。'],
    ['磁场大小',t`B=\frac{mv}{|q|R}`,'R>0，q 非零；斜入射须改用 v⊥。']
  ],['magnetic-force-size','cyclotron-frequency','helix-radius']);
  add('cyclotron-frequency','由圆周半径与角速度推导',[
    ['垂直平面中的圆周运动角速度为垂直速率除半径。',t`\omega_c=\frac{v_\perp}{R}`],
    ['代入 R=mv⊥/(|q|B)，约去速率。',t`\omega_c=\frac{|q|B}{m}`],
    ['一个完整周期对应角度 2π。',t`T=\frac{2\pi}{\omega_c}=\frac{2\pi m}{|q|B}`]
  ],[
    ['磁场大小',t`B=\frac{2\pi m}{|q|T}`,'非相对论、匀强场，T 是完整回旋周期。'],
    ['通过某段圆弧的时间',t`\Delta t=\frac{\Delta\varphi}{2\pi}T`,'Δφ 为实际经过的圆心角大小，以弧度计。']
  ],['orbit-radius','helix-radius']);
  add('velocity-components','由速度向磁场方向投影',[
    ['以 B 方向为平行轴，θ 为速度与 B 的夹角。'],
    ['沿 B 的投影为 vcosθ，垂直分量大小为 vsinθ。',t`v_\parallel=v\cos\theta,\qquad v_\perp=v\sin\theta`],
    ['两个分量相互垂直；磁力只影响垂直运动。',t`v^2=v_\parallel^2+v_\perp^2`]
  ],[
    ['总速率',t`v=\sqrt{v_\parallel^2+v_\perp^2}`,'v∥ 可带方向符号，v⊥ 取大小。'],
    ['入射夹角',t`\theta=\arccos\frac{v_\parallel}{v}`,'v>0，θ 在 0 到 π 之间，保留平行投影符号。']
  ],['helix-radius','helix-pitch']);
  add('helix-radius','由垂直分量的向心力推导',[
    ['仅受匀强磁力，平行速度不变，垂直平面内作圆周运动。'],
    ['在垂直平面中只用 v⊥ 写向心力关系。',t`|q|v_\perp B=\frac{mv_\perp^2}{R}`],
    ['解得螺旋半径，也可代入入射角。',t`R=\frac{mv_\perp}{|q|B}=\frac{mv\sin\theta}{|q|B}`]
  ],[
    ['垂直速度分量',t`v_\perp=\frac{|q|BR}{m}`,'非相对论、仅受匀强磁力。'],
    ['由轨迹求入射角正弦',t`\sin\theta=\frac{|q|BR}{mv}`,'v>0，右侧应在 0 到 1；仅凭正弦不能判断平行方向。']
  ],['velocity-components','orbit-radius','helix-pitch']);
  add('helix-pitch','由一个周期的平行位移推导',[
    ['平行于磁场的速度不受磁力改变。'],
    ['回旋一周花费 T，同一时间内沿 B 前进 v∥T。',t`h=v_\parallel T`],
    ['代入周期与入射角，整理有向轴向位移。',t`h=\frac{2\pi mv\cos\theta}{|q|B}`]
  ],[
    ['平行速度',t`v_\parallel=\frac hT`,'h 若表示有向轴向位移则带符号；螺距大小取 |h|。'],
    ['完整螺旋的总速率',t`v=\sqrt{\left(\frac{2\pi R}{T}\right)^2+\left(\frac hT\right)^2}`,'R 为回旋半径，T 为同一周期，匀强纯磁场。']
  ],['cyclotron-frequency','velocity-components','helix-radius']);
  add('particle-energy','由动能定理与电场做功推导',[
    ['磁力与速度垂直，不做功。静态电磁场中做功项来自电场力。'],
    ['动能变化等于电场力做功。',t`K_{\rm 末}-K_{\rm 初}=W_E=q(V_{\rm 初}-V_{\rm 末})`],
    ['非相对论时动能为 mv²/2。',t`\frac12m(v_{\rm 末}^2-v_{\rm 初}^2)=q(V_{\rm 初}-V_{\rm 末})`]
  ],[
    ['末速率',t`v_{\rm 末}=\sqrt{v_{\rm 初}^2+\frac{2q}{m}(V_{\rm 初}-V_{\rm 末})}`,'根号内须非负；q 带符号，仅受静态电磁场力。'],
    ['电势差',t`V_{\rm 初}-V_{\rm 末}=\frac{m(v_{\rm 末}^2-v_{\rm 初}^2)}{2q}`,'q 非零，非相对论，未计其他做功的力。']
  ],['electric-work','magnetic-force','orbit-radius']);
  add('hall-field','由稳态横向受力平衡推导',[
    ['载流子受到漂移引起的磁力，横向电荷积累形成霍尔电场。'],
    ['稳态时横向电场力与磁场力相抵。',t`q(\mathbf E_H+\mathbf v_d\times\mathbf B)=0`],
    ['漂移方向垂直 B，取大小得到 E_H=vdB；矢量方向由平衡式判断。',t`\mathbf E_H=-\mathbf v_d\times\mathbf B,\qquad E_H=v_dB`]
  ],[
    ['漂移速率',t`v_d=\frac{E_H}{B}`,'B 非零，单一载流子、横向稳态且漂移垂直 B。'],
    ['横向霍尔电压大小',t`|U_H|=E_Hb`,'横向场均匀，b 是两测量端之间的横向间距；b 与沿 B 的厚度 t 区分。']
  ],['carrier-current','hall-voltage','lorentz-force']);
  add('hall-voltage','由漂移电流与霍尔场联立推导',[
    ['取矩形截面：横向测量宽度 b，沿 B 的厚度 t，电流截面积为 bt。',t`I=n|q|v_dbt`],
    ['横向稳态 E_H=vdB，均匀霍尔电压大小为 E_Hb。',t`|U_H|=v_dBb`],
    ['从电流式解 vd 代入，约去横向宽度 b。',t`|U_H|=\frac{IB}{n|q|t}`]
  ],[
    ['载流子浓度',t`n=\frac{IB}{|q|t|U_H|}`,'单一载流子，分母非零，t 沿磁场方向。'],
    ['磁场大小',t`B=\frac{n|q|t|U_H|}{I}`,'I 非零，其余量取大小；载流子符号由极性另判。']
  ],['hall-field','carrier-current','hall-coefficient']);
  add('hall-coefficient','由有向霍尔关系整理',[
    ['霍尔电压的大小满足 |U_H|=IB/(n|q|t)，其极性由载流子电性及测量方向决定。'],
    ['在与课程公式一致的电流、场与电压方向约定下，定义有向霍尔系数。',t`R_H=\frac{U_Ht}{IB}`],
    ['按这一约定联立有向霍尔关系，得到单一载流子表达式。',t`R_H=\frac1{nq}`]
  ],[
    ['载流子浓度',t`n=\frac1{|q|\,|R_H|}`,'单一载流子、RH 非零，q 的大小已知。'],
    ['载流子电性',t`\operatorname{sgn}(q)=\operatorname{sgn}(R_H)`,'必须先采用与当前公式一致的有向测量约定。']
  ],['hall-voltage','hall-field','carrier-current']);

  window.REVIEW_DATA.learning=learning;
})();
