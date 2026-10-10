(() => {
  const t=String.raw,questions=[];
  const add=(id,chapter,kind,prompt,options,explanation,refs)=>questions.push({id,chapter,kind,prompt,options,answer:0,explanation,refs});
  // Authored answers use index 0; the engine independently shuffles the four choices for every round.
  add('charge-f1','charges','formula','真空中点电荷 q 的场，径向单位矢量从源指向场点。正确表达式是？',[
    t`$\mathbf E=\dfrac{q}{4\pi\varepsilon_0r^2}\hat{\mathbf r}$`,t`$\mathbf E=\dfrac{q}{4\pi\varepsilon_0r}\hat{\mathbf r}$`,t`$\mathbf E=-\dfrac{q}{4\pi\varepsilon_0r^2}\hat{\mathbf r}$`,t`$\mathbf E=\dfrac{q}{2\pi\varepsilon_0r^2}\hat{\mathbf r}$`
  ],'点电荷场按距离平方反比变化，源电荷 q 保留符号；单位矢量从源指向场点。',['point-field']);
  add('charge-f2','charges','formula','均匀带电圆环半径 R、总电荷 Q，轴向坐标为 x。轴向电场分量是哪一项？',[
    t`$E_x=\dfrac{Qx}{4\pi\varepsilon_0(R^2+x^2)^{3/2}}$`,t`$E_x=\dfrac{QR}{4\pi\varepsilon_0(R^2+x^2)^{3/2}}$`,t`$E_x=\dfrac{Q}{4\pi\varepsilon_0(R^2+x^2)}$`,t`$E_x=\dfrac{Qx}{4\pi\varepsilon_0(R^2+x^2)}$`
  ],'横向分量成对抵消，轴向投影带来 x，分母为源到场点距离的三次方。圆心 x=0 时轴向场为零。',['ring-field','continuous-field']);
  add('charge-c1','charges','concept','负检验电荷放在给定的非零静电场中，电场力与场强的方向关系是？',[
    '电场力方向与场强相反','电场力方向与场强相同','两者必定垂直','负检验电荷所在位置的场强自动为零'
  ],t`电场方向按正检验电荷定义。由 $\mathbf F=q_0\mathbf E$，负的 $q_0$ 使受力方向反向。`,['field-definition']);
  add('charge-c2','charges','concept','由等量异号电荷构成的电偶极子，其电偶极矩方向如何规定？',[
    '从负电荷指向正电荷','从正电荷指向负电荷','总与电荷连线垂直','只由选取的零势点决定'
  ],t`$\mathbf p=q\boldsymbol\ell$ 中 q 取正电荷电荷量，间距矢量从负电荷指向正电荷。`,['dipole-moment']);
  add('charge-m1','charges','method','已知一个有限带电体的连续电荷分布，且缺少直接简化高斯积分的对称性。求电场应优先采用？',[
    '写电荷元，求微元场分量后积分','随意选闭合面，把未知 E 直接提出积分','把所有电荷都移到几何中心后使用点电荷公式','只求总电荷，便能确定任意场点的场强'
  ],'连续分布先取线、面或体电荷元，按对称性消去抵消分量，再积分。高斯定理成立并不自动允许把 E 当成常量。',['continuous-field','electric-gauss']);
  add('charge-m2','charges','method','求均匀无限长直线电荷距轴 r 处的场强，最合适的高斯面及通量判断是？',[
    '同轴圆柱面，侧面有通量、端面通量为零','以场点为中心的球面，场在球面上恒定','与轴平行的开放平面，直接用闭合面高斯定理','同轴圆柱面，只计两个端面的通量'
  ],'电场沿径向，在同轴柱面侧面大小相同，端面法向沿轴，因此端面点积为零。',['line-field','electric-gauss']);

  add('gauss-f1','gauss','formula',t`匀强电场穿过面积 S 的平面，$\theta$ 为场与所选法向的夹角。有向电通量是？`,[
    t`$\Phi_E=ES\cos\theta$`,t`$\Phi_E=ES\sin\theta$`,t`$\Phi_E=E/S$`,t`$\Phi_E=ES$，与夹角无关`
  ],'通量是电场与面积矢量的点积。夹角按法向定义，反向穿过可使通量为负。',['electric-flux']);
  add('gauss-f2','gauss','formula','均匀带电实心球总电荷 Q、半径 R，球内 0<r<R 的向外径向电场分量是？',[
    t`$E_r=\dfrac{Qr}{4\pi\varepsilon_0R^3}$`,t`$E_r=\dfrac{Q}{4\pi\varepsilon_0r^2}$`,t`$E_r=0$`,t`$E_r=\dfrac{Q}{4\pi\varepsilon_0R^2}$`
  ],t`球内包围电荷为 $Q(r/R)^3$，代入球面通量关系后，场与 r 成正比。球壳内部零场的结论不能套给实心球。`,['solid-sphere','shell-field']);
  add('gauss-c1','gauss','concept','真空静电场中某闭合面的净电通量为零，可以直接推出什么？',[
    '面内净电荷为零','面上每一点的电场都为零','面外没有电荷','面内每一个电荷都为零'
  ],'零净通量只约束面内净电荷；正负电荷可能抵消净电荷，外部电荷也可能在面上产生非零场。',['electric-gauss']);
  add('gauss-c2','gauss','concept','把总电荷非零的均匀实心球与均匀球壳的内部电场相比较，正确说法是？',[
    '球壳内部为零；均匀实心球内部径向场与 r 成正比','两者内部场都处处为零','两者内部场都按 1/r² 变化','两者内部场都与位置无关'
  ],'两种分布的球内包围电荷不同。球壳内部没有壳电荷，均匀实心球则按包围体积计电荷。',['shell-field','solid-sphere']);
  add('gauss-m1','gauss','method','使用真空高斯定理时，左侧场与右侧电荷应如何计入？',[
    '左侧用内外全部源产生的总场，右侧只计面内净电荷','左侧只用面内电荷产生的场，右侧计全部空间电荷','左侧和右侧都只计面外电荷','把面内正负电荷分别取绝对值后相加'
  ],'面外源可影响面上各点电场，但对闭合面净通量的贡献相抵。右侧是带符号的面内净电荷。',['electric-gauss']);
  add('gauss-m2','gauss','method','已知真空中可微电场的直角坐标分量，要反求局部体电荷密度，应该？',[
    '求电场散度，再乘真空电容率','求电场大小，再除以体积','只取 Ex，不用偏导数','对电场取负梯度后直接当作电荷密度'
  ],t`局部高斯关系是 $\rho=\varepsilon_0(\partial E_x/\partial x+\partial E_y/\partial y+\partial E_z/\partial z)$。`,['gauss-local']);

  add('potential-f1','potential','formula','给定可微静电势 V，场强与电势的关系是？',[
    t`$\mathbf E=-\nabla V$`,t`$\mathbf E=\nabla V$`,t`$V=-\nabla\cdot\mathbf E$`,t`$\mathbf E=-V\hat{\mathbf x}$，对任何电势函数成立`
  ],'电场指向电势下降最快方向。由微小位移的电势差比较各方向分量，得到负梯度。',['potential-gradient']);
  add('potential-f2','potential','formula','真空点电荷 q，取无穷远为零势点，距它 r 处的电势是？',[
    t`$V=\dfrac q{4\pi\varepsilon_0r}$`,t`$V=\dfrac{|q|}{4\pi\varepsilon_0r}$`,t`$V=\dfrac q{4\pi\varepsilon_0r^2}$`,t`$V=-\dfrac q{4\pi\varepsilon_0r}$`
  ],'电势是带符号标量，q 的正负保留，距离依赖为 1/r。对径向场从 r 积分到无穷远可得到此式。',['point-potential']);
  add('potential-c1','potential','concept','负电荷从较高电势移到较低电势，电势能变化如何？',[
    '电势能增加','电势能减少','电势能必定不变','不能由电荷符号和电势差判断'
  ],t`$\Delta U=q(V_{\rm 末}-V_{\rm 初})$。负电荷 q<0，而末势减初势也为负，故势能变化为正。`,['potential-energy','electric-work']);
  add('potential-c2','potential','concept','求理想无限长线电荷的电势时，参考零点的正确处理是？',[
    '优先求两点电势差，并选合适的有限参考点','无条件取无穷远为有限零势点','凡是静电场都只能取无穷远为零','把电场为零的位置一律当作零势点'
  ],'无限长线电荷的场按 1/r 变化，向无穷远的电势积分不收敛，不能套用局域点电荷的无穷远零点选择。',['line-field','potential-difference']);
  add('potential-m1','potential','method','由已知分段电场求跨多个区域的电势差，合适的做法是？',[
    '固定初末点序，跨区域分段线积分后相加','只用起点的场强乘完整路径长度','把每一段电势差取绝对值相加','只看场强为零的区域，不计其他段'
  ],'不同区域使用各自场表达式；路径方向和端点顺序保持一致，电势差带符号相加。',['potential-difference']);
  add('potential-m2','potential','method','求多个正负点电荷在同一场点的电势，应该如何合成？',[
    '使用相同零势点，逐项保留电荷符号直接代数相加','像电场一样先按方向投影电势','把每项电势取绝对值后相加','只计离场点最近的一项，其他一律忽略'
  ],'电势是标量，正负源电荷分别产生正负贡献；每一项使用该电荷到场点的距离及同一零势点。',['potential-sum']);

  add('conductor-f1','conductors','formula','静电平衡导体表面紧外侧为真空，外法向电场分量 En 与局部面电荷密度 σ 的关系是？',[
    t`$E_n=\sigma/\varepsilon_0$`,t`$E_n=\sigma/(2\varepsilon_0)$`,t`$E_n=2\sigma/\varepsilon_0$`,t`$E_n=0$，导体外侧也总是零场`
  ],'跨表面的薄高斯盒内侧处于导体材料内，场为零，因此只有外侧端面有通量。不要套用非导体无限薄片的两侧通量。',['surface-field','plane-field']);
  add('conductor-f2','conductors','formula','静电平衡空腔导体自身净电荷为 Q，腔内净电荷为 q。内外壁总电荷是？',[
    t`$Q_{\rm 内壁}=-q,\quad Q_{\rm 外壁}=Q+q$`,t`$Q_{\rm 内壁}=q,\quad Q_{\rm 外壁}=Q-q$`,t`$Q_{\rm 内壁}=0,\quad Q_{\rm 外壁}=Q$`,t`$Q_{\rm 内壁}=-q,\quad Q_{\rm 外壁}=Q-q$`
  ],'材料内零场高斯面给出内壁电荷 −q；导体两壁电荷之和为 Q，故外壁为 Q+q。',['cavity-charge']);
  add('conductor-c1','conductors','concept','导体处于静电平衡，以下结论正确的是？',[
    '导体材料内部场为零，有电荷的空腔内不必零场','导体材料和任意空腔内的场都为零','导体材料内部电势必定为零','腔内电荷不会引起内壁感应电荷'
  ],'“导体内零场”指金属材料内部，不自动包含有源空腔。导体是等势体，但常电势值由边界和参考点决定。',['conductor-equilibrium','cavity-charge']);
  add('conductor-c2','conductors','concept','同一连通的静电平衡导体内任意两点的电势关系是？',[
    '两点电势相等，数值未必为零','两点电势都必须为零','电势随两点距离增加而增加','有净电荷时便不再是等势体'
  ],t`导体材料内 $\mathbf E=0$，两点间电势差积分为零，故同一连通导体等势。`,['conductor-equilibrium','potential-difference']);
  add('conductor-m1','conductors','method','求有源空腔导体的内壁总感应电荷，第一步最合适的是？',[
    '在导体材料内选包住整个空腔的闭合高斯面','直接假设内壁每一点密度均匀','把空腔内电场全部设为零','只使用外壁电势，不用内壁电荷约束'
  ],'材料内场为零，闭合面内净电荷为零，从腔内电荷与内壁总电荷的和先求内壁，再用守恒求外壁。',['cavity-charge','electric-gauss']);
  add('conductor-m2','conductors','method','已知静电平衡导体真空紧外侧的带符号法向场 En，求对应局部面电荷密度应采用？',[
    t`$\sigma=\varepsilon_0E_n$，按外法向保留符号`,t`$\sigma=2\varepsilon_0E_n$，因为盒两端场必定相同`,'不论形状，先把所有电荷均匀分配到整个表面','由一个点的场值直接求整个导体总电荷，不需面积分'
  ],'表面紧外侧关系给出局部 σ。总电荷需在整个指定表面上积分；局部场值不意味着整个面上密度均匀。',['surface-field']);

  add('medium-f1','dielectrics','formula','宏观介质静电学中，电位移矢量的定义是？',[
    t`$\mathbf D=\varepsilon_0\mathbf E+\mathbf P$`,t`$\mathbf D=\varepsilon_0\mathbf E-\mathbf P$`,t`$\mathbf D=\mathbf E+\varepsilon_0\mathbf P$`,t`$\mathbf D=\mathbf P$，与 E 无关`
  ],'D 由真空场项 ε₀E 与极化强度 P 相加定义；标量 εE 写法还需要相应介质模型条件。',['displacement','linear-dielectric']);
  add('medium-f2','dielectrics','formula','介质中闭合面的电位移通量右侧应是什么？',[
    t`$\oint\mathbf D\cdot d\mathbf S=Q_{\rm free,in}$`,t`$\oint\mathbf D\cdot d\mathbf S=Q_{\rm 全部,in}$`,t`$\oint\mathbf D\cdot d\mathbf S=Q_{\rm bound,in}$`,t`$\oint\mathbf D\cdot d\mathbf S=0$，对任何自由电荷都成立`
  ],'介质中的 D 高斯定理右侧只计自由电荷。E 的物理来源包括自由电荷与束缚电荷，不能混淆。',['dielectric-gauss']);
  add('medium-c1','dielectrics','concept','关于电容率 ε、相对电容率 εr 和电极化率 χe，正确说法是？',[
    t`$\varepsilon=\varepsilon_r\varepsilon_0$，εr 无量纲；线性模型中 $\varepsilon_r=1+\chi_e$`,t`$\varepsilon=\varepsilon_r$，两者单位相同`,t`$\varepsilon_r=\chi_e$，所有情况下都相等`,t`$\varepsilon_0=\varepsilon+\varepsilon_r$`
  ],'ε 是有量纲材料参数，εr 是它与 ε₀ 的比值。线性极化与 D 定义合并得到 εr=1+χe。',['relative-permittivity']);
  add('medium-c2','dielectrics','concept','求球壳介质内表面的束缚面电荷时，公式里的介质外法向朝哪里？',[
    '在内表面指向球心','在内表面也必须远离球心','总与极化强度同向','方向任意，不影响电荷符号'
  ],'法向按“离开介质材料”定义。球壳内表面向空腔，方向指向球心；外表面才远离球心。',['bound-charge']);
  add('medium-m1','dielectrics','method','有足够对称性的分层线性各向同性介质电容题，正确计算顺序是？',[
    '由自由电荷求 D，各层用各自 ε 求 E，再分段积分电压','先将所有层的 ε 任意平均，再统一算 E','将束缚电荷直接作为 D 高斯定理的唯一右侧源','只求一层电场，就当作所有层的电场'
  ],'各层参数不同，需要逐层使用本构关系。电压来自各段电场积分，最后才能联系 Q/U 求电容。',['dielectric-gauss','linear-dielectric','potential-difference']);
  add('medium-m2','dielectrics','method','已知介质表面处极化强度 P，要求束缚面电荷密度，应该如何操作？',[
    '把 P 投影到介质向外法向，保留点积符号','总取 P 的大小，所有表面电荷都为正','取 P 与法向的叉乘大小','用自由电荷总量除任意面积'
  ],t`$\sigma_b=\mathbf P\cdot\hat{\mathbf n}$ 是法向投影。法向与 P 反向时，束缚面电荷密度为负。`,['bound-charge','polarization']);

  add('capacitor-f1','capacitors','formula','平行板电容器有效面积 S、板距 d，板间均匀充满电容率 ε 的介质，忽略边缘效应。电容是？',[
    t`$C=\varepsilon S/d$`,t`$C=\varepsilon d/S$`,t`$C=\varepsilon S/(2d)$`,t`$C=2\varepsilon S/d$`
  ],'板间 E=Q/(εS)，电压 U=Ed，代入 C=Q/U 后电荷量约去，得到几何与介质决定的 C。',['parallel-plate','capacitance']);
  add('capacitor-f2','capacitors','formula','两个电容 C1、C2 标准串联，中间孤立节点原先净电荷为零，等效电容是？',[
    t`$C_{\rm 串}=\dfrac{C_1C_2}{C_1+C_2}$`,t`$C_{\rm 串}=C_1+C_2$`,t`$C_{\rm 串}=\dfrac{C_1+C_2}{C_1C_2}$`,t`$C_{\rm 串}=C_1-C_2$`
  ],'标准串联各电容的电荷量大小相等，总电压相加，电容倒数相加；电容直接相加属于并联。',['series-capacitance','parallel-capacitance']);
  add('capacitor-c1','capacitors','concept','孤立平行板电容器完全断开电源、无漏电，也无其他连接。插入介质时应首先保持哪个量不变？',[
    '极板电荷量 Q','极板电压 U','电容 C','储存的场能 W'
  ],'此时孤立极板净电荷守恒，Q 固定；介质改变 C 后，由 Q=CU 再求 U，储能也可能改变。',['capacitance','parallel-plate','capacitor-energy']);
  add('capacitor-c2','capacitors','concept','线性电容器的几何与介质都不变，把电荷量 Q 加倍，电容和电压如何变化？',[
    'C 不变，U 加倍','C 加倍，U 不变','C 和 U 都不变','C 减半，U 加倍'
  ],'C 是结构与介质决定的比例系数。保持 C 不变时，Q=CU 使电压跟着 Q 同比例变化。',['capacitance']);
  add('capacitor-m1','capacitors','method','完全孤立且无漏电的线性电容器，在电荷量不变时电容变为原来的 2 倍。如何判断储能？',[
    t`用 $W=Q^2/(2C)$，储能变为原来的 1/2`,t`保持 U 不变，代入 $W=CU^2/2$，储能变为 2 倍`,'Q、U 都不变，所以储能不变','电容增加意味着任何连接状态下储能都减小'
  ],'先判约束：孤立时 Q 固定。储能 Q²/(2C) 与 C 成反比；接理想电源时的固定 U 约束给出另一种趋势。',['capacitor-energy','capacitance']);
  add('capacitor-m2','capacitors','method','整体断开电源后，两个电容以同极性连接成并联，已知连接节点的总电荷 Q。求最终共同电压应采用？',[
    t`节点电荷守恒，再用 $U=Q/(C_1+C_2)$`,'每个电容原来的电压分别保持不变','先按串联电容的倒数和求共同电压','不计总电荷，令最终电压一律为零'
  ],'并联连接于相同两节点，最终电压相同。孤立节点总电荷守恒；同极性计量下 Q=(C₁+C₂)U。',['parallel-capacitance','capacitance']);

  add('current-f1','current','formula','单一载流子模型中，n 为数密度、q 为带符号单粒子电荷、vd 为漂移速度矢量。电流密度是？',[
    t`$\mathbf j=nq\mathbf v_d$`,t`$\mathbf j=n|q|\mathbf v_d$，负电荷方向也不反转`,t`$\mathbf j=q\mathbf v_d/n$`,t`$\mathbf j=nq/\mathbf v_d$`
  ],'矢量关系必须保留载流子 q 的符号。电荷数密度乘电荷与漂移速度给出电流密度。',['carrier-current']);
  add('current-f2','current','formula','一般非均匀电流密度通过指定有向截面的电流，正确表达式是？',[
    t`$I=\int_S\mathbf j\cdot d\mathbf S$`,t`$I=jS$，不论分布与夹角如何都成立`,t`$I=\int_S|\mathbf j|\,dS$，不必考虑法向`,t`$I=\oint\mathbf j\cdot d\mathbf l$`
  ],'电流是电流密度的截面通量。只有法向分量均匀等条件满足时，才能简化为相应分量乘面积。',['current-density']);
  add('current-c1','current','concept','只有电子作为载流子的导体中，电子漂移速度与常规电流方向的关系是？',[
    '方向相反','方向相同','两者必定垂直','电子带负电，所以没有电流'
  ],t`电子 q<0，$\mathbf j=nq\mathbf v_d$ 给出电流密度与漂移速度反向。`,['carrier-current']);
  add('current-c2','current','concept','电源电动势的物理含义是？',[
    '非静电力沿闭合电路对单位正电荷所做的功','电源内任意一点的静电场强大小','任意工作状态下都等于电源端电压','闭合回路内静电场的线积分必定等于它'
  ],'电动势对应非静电力做功；静电场闭合路径线积分为零，端电压也不能在任何状态都直接等同于电动势。',['emf-definition','electrostatic-loop']);
  add('current-m1','current','method','已知截面上电流密度随位置变化，求总电流的正确做法是？',[
    '把电流密度投影到截面法向，再对截面积分','选一个任意位置的 j 乘整个面积','将每点 j 的方向删除后直接相加大小','对导线的长度积分 j，不考虑截面'
  ],'各面元只计法向通过量。非均匀时不能随意提出某个场点的 j。',['current-density']);
  add('current-m2','current','method','满足局部欧姆定律的导体，已知电阻率 ρres 与局部电流密度 j，如何求电场？',[
    t`$\mathbf E=\rho_{\rm res}\mathbf j$`,t`$\mathbf E=\mathbf j/\rho_{\rm res}$`,t`$\mathbf E=-\rho_{\rm res}\mathbf j$`,'把 ρres 当作体电荷密度，直接使用点电荷公式'
  ],'局部欧姆关系 j=E/ρres，故 E=ρresj。电阻率 ρres 与体电荷密度 ρ 是不同物理量。',['ohm-local']);

  add('biot-f1','biot','formula','有限直导线的垂距为 a，端点连线相对垂线的有向角按同一方位有序记为 α1、α2。本站采用的磁场大小表达式是？',[
    t`$B=\dfrac{\mu_0I}{4\pi a}(\sin\alpha_2-\sin\alpha_1)$`,t`$B=\dfrac{\mu_0I}{4\pi a}(\sin\alpha_2+\sin\alpha_1)$`,'不论端点几何如何都等于无限长导线结果',t`$B=\dfrac{\mu_0I}{4\pi a}(\cos\alpha_2-\cos\alpha_1)$`
  ],'相对垂线的有向角换元后积分得到 sinα 的端点差。不能把有向角差与另一种无向角约定的角和混用。',['finite-wire']);
  add('biot-f2','biot','formula','电流 I 流过半径 R、圆心角 φ 的圆弧，场点在圆心。φ 用弧度，磁场大小是？',[
    t`$B=\dfrac{\mu_0I\varphi}{4\pi R}$`,t`$B=\dfrac{\mu_0I\varphi}{2\pi R}$`,t`$B=\dfrac{\mu_0I}{4\pi R\varphi}$`,t`$B=\dfrac{\mu_0I\varphi}{4\pi R^2}$`
  ],'圆心处各微元场同向，dl=R dφ。整圆 φ=2π 时得到单匝圆电流中心磁场 μ₀I/(2R)。',['arc-center','loop-center']);
  add('biot-c1','biot','concept','无限长直导线的电流大小不变，场点垂距加倍，磁场大小如何变化？',[
    '变为原来的 1/2','变为原来的 1/4','变为原来的 2 倍','保持不变'
  ],'无限长直导线外 B=μ₀I/(2πr)，与垂距成反比。不要混同点电荷电场的 1/r² 关系。',['long-wire']);
  add('biot-c2','biot','concept','理想足够长密绕螺线管内部远离端部，B≈μ0nI。这里的 n 是？',[
    '单位长度匝数 N/L','总匝数 N','载流子数密度','每匝线圈的面积'
  ],'n 是螺线管匝密度，不是总匝数，也不是漂移电流模型中的载流子浓度。先由 N/L 换算。',['solenoid','carrier-current']);
  add('biot-m1','biot','method','一根导线由有限直段与圆弧组成，要计算圆弧圆心处的总磁场，正确路线是？',[
    '逐段匹配几何求磁场，判各段方向后矢量叠加','把所有段的磁场大小无条件相加','只计圆弧，所有直段必定没有贡献','把圆弧的弧长当作无限长直线的垂距'
  ],'只有特定径向直段在圆心处贡献为零，其他直段仍须按实际几何计算；总场按矢量叠加。',['magnetic-superposition','finite-wire','arc-center']);
  add('biot-m2','biot','method','有限长度电流缺乏足够对称性，不能从环路积分直接提取 B。已知电流路径时，应该优先采用？',[
    '毕奥–萨伐尔电流元积分，先投影再合成','任取环路并假定整圈 B 恒定','因为安培定理无法直接求场，就认定 B 为零','只用闭合面的零磁通量求每点 B'
  ],'基本定理的成立与能否直接解局部场是两回事。电流元积分可处理有限路径与分量方向变化。',['biot-savart','ampere-law']);

  add('ampere-f1','ampere','formula','均匀载流实心长圆柱半径 R、总电流大小 I，柱内 0<r<R 的磁场大小是？',[
    t`$B=\dfrac{\mu_0Ir}{2\pi R^2}$`,t`$B=\dfrac{\mu_0I}{2\pi r}$`,t`$B=0$`,t`$B=\dfrac{\mu_0I}{2\pi R}$`
  ],'柱内穿面电流为 I(r/R)²，代入 2πrB=μ₀Iin，使 B 与 r 成正比。外部才使用全部 I 的 1/r 式。',['current-cylinder']);
  add('ampere-f2','ampere','formula','真空理想密绕螺线环共 N 匝，每匝电流大小 I，场点在绕组截面内，距中心轴 r。场大小是？',[
    t`$B=\dfrac{\mu_0NI}{2\pi r}$`,t`$B=\dfrac{\mu_0I}{2\pi Nr}$`,t`$B=\mu_0NI$，不需要长度量`,t`$B=\dfrac{\mu_0NI}{2\pi r^2}$`
  ],'同心圆环路穿过 NI 的代数电流，环路长 2πr。r 是到整个环中心轴的距离，不是绕组截面半径。',['toroid']);
  add('ampere-c1','ampere','concept','任意闭合曲面的净磁通量为零，正确理解是？',[
    '穿入与穿出的有向磁通量相抵，局部 B 可非零','曲面上所有点的 B 都必须为零','任何开放面的磁通量也必为零','该曲面不可能包含电流'
  ],'磁场高斯定理约束的是闭合面净通量，不能据此删掉局部磁场。开放面磁通量可以不为零。',['magnetic-gauss']);
  add('ampere-c2','ampere','concept','安培环路右侧的穿面电流，应如何求和？',[
    '先按右手规则规定正向，再取穿面电流的代数和','各电流大小一律正数相加','只计距离环路最近的一根','把空间中所有电流都计入，不论是否穿面'
  ],'环路绕向与穿面正向相配。右侧是穿面电流代数和，左侧的场仍由全部相关电流共同产生。',['ampere-law']);
  add('ampere-m1','ampere','method','求均匀载流长圆柱内部场，在写环路方程前应先做什么？',[
    '按环路包围的截面积比例算实际穿面电流','无论环路大小都直接代总电流 I','先假设柱内场为零','将 r 换成圆柱长度'
  ],t`电流均匀时 $I_{\rm in}=I(r/R)^2$。这一步决定柱内线性随 r 的场，而不是柱外的 1/r 场。`,['current-cylinder','ampere-law']);
  add('ampere-m2','ampere','method','某环路的净穿面电流为零，想推出局部磁场为零，还需要什么？',[
    '足够对称性，能明确环路上场的方向和恒定大小','不需任何条件，环路积分零就说明每点场零','只需环路面积足够大','只需把所有电流的符号去掉'
  ],'零环路积分只给出积分约束。理想薄壁长圆筒内部零场，还使用了柱对称性使整圈切向场大小相同。',['ampere-law','current-shell']);

  add('force-f1','force','formula','平面载流线圈在匀强外磁场中的磁力矩矢量是？',[
    t`$\boldsymbol\tau=\mathbf m\times\mathbf B$`,t`$\boldsymbol\tau=\mathbf B\times\mathbf m$`,t`$\boldsymbol\tau=\mathbf m\cdot\mathbf B$`,t`$\boldsymbol\tau=-\mathbf m\cdot\mathbf B$`
  ],'力矩为磁矩与外场的叉乘，次序不能颠倒。点积带负号对应此模型的势能，而不是力矩。',['magnetic-torque','magnetic-energy']);
  add('force-f2','force','formula','整段载流导线处于同一匀强外磁场，沿电流方向规定起点与终点，L 为起点到终点的位移矢量。合力为？',[
    t`$\mathbf F=I\mathbf L\times\mathbf B$`,'总是等于电流乘导线弧长乘 B 的大小，与方向无关',t`$\mathbf F=I\mathbf B\times\mathbf L$`,t`$\mathbf F=I\mathbf L\cdot\mathbf B$`
  ],'匀强场可把 B 提出积分，∫dℓ 等于首尾位移 L。合力与弯曲路径的弧长一般不同。',['uniform-wire-force']);
  add('force-c1','force','concept','磁力矩大小 τ=mB sinθ 中，θ 是哪两个方向的夹角？',[
    '磁矩（线圈正法线）与 B','线圈平面与 B','电流导线的每一个切向与 B 都共用的任意角','磁矩与电场 E'
  ],'磁矩方向由电流右手规则确定，是面积矢量正法线。平面与场的夹角和法线与场的夹角不能混用。',['magnetic-moment','magnetic-torque']);
  add('force-c2','force','concept','两根平行无限长直导线中，电流同向与反向分别如何相互作用？',[
    '同向相吸，反向相斥','同向相斥，反向相吸','同向与反向都相吸','同向与反向都无力'
  ],'先按一根导线的电流方向求另一根处的 B，再按安培力叉乘判受力方向，可得同向吸引、反向排斥。',['parallel-wires','long-wire']);
  add('force-m1','force','method','载流导线位于非匀强外磁场，求合力的正确方法是？',[
    '用每处的外场求电流元力，按分量积分','用任一处 B 代入整段匀强场公式','把 B 提出积分，不用检查它是否变化','把每个微元力大小积分后直接当作合力大小'
  ],'B 随位置变化时应保留在积分内，微元力方向也可能变化，需逐分量合成。',['wire-force','ampere-element']);
  add('force-m2','force','method','闭合平面线圈在匀强外磁场中，磁矩不与 B 平行。对平动和转动应如何判断？',[
    '合力为零，但可有非零磁力矩','合力与力矩都一定为零','合力非零，力矩必定为零','只需求导线弧长，便能判断全部运动'
  ],'闭合线圈首尾位移为零，因此匀强场合力为零；m×B 在不平行时非零，可使线圈转动。',['uniform-wire-force','magnetic-torque']);

  add('particle-f1','particles','formula','非相对论粒子斜入射匀强磁场、仅受磁力，螺旋半径应使用哪项？',[
    t`$R=\dfrac{mv_\perp}{|q|B}$`,t`$R=\dfrac{mv_\parallel}{|q|B}$`,t`$R=\dfrac{mv}{qB}$，任何夹角都直接用总速率`,t`$R=\dfrac{|q|B}{mv_\perp}$`
  ],'垂直分量决定圆周运动，平行分量决定沿场方向前进。求半径大小用 |q|，电荷符号用于判断弯曲侧。',['helix-radius','velocity-components']);
  add('particle-f2','particles','formula','非相对论带电粒子在匀强磁场中回旋，其周期是？',[
    t`$T=\dfrac{2\pi m}{|q|B}$`,t`$T=\dfrac{2\pi|q|B}{m}$`,t`$T=\dfrac{2\pi mv}{|q|B}$`,t`$T=\dfrac{m}{2\pi|q|B}$`
  ],'由角速度 ωc=|q|B/m，再用 T=2π/ωc 得周期。非相对论模型中它与速率无关。',['cyclotron-frequency']);
  add('particle-c1','particles','concept','粒子仅受磁场力时，关于速率和动能的正确说法是？',[
    '磁力不做功，速率和动能不变','磁力越大，速率就不断增加','粒子弯曲说明动能必定减少','磁力方向与速度相同，因此总做正功'
  ],'磁力 qv×B 垂直瞬时速度，点积功率为零。它能改变速度方向，但不改变动能。',['magnetic-force']);
  add('particle-c2','particles','concept','霍尔电压公式中的样品厚度 t，应取哪个方向的尺寸？',[
    '沿磁场 B 的方向','沿电流的方向','横向两个电压测量端之间的距离','任意方向的尺寸都可以'
  ],'在标准矩形截面推导中，横向宽度在 I 与 UH 的关系中约去，留下沿 B 的厚度 t。',['hall-voltage']);
  add('particle-m1','particles','method','粒子先经静电场加速，再垂直进入匀强磁场，仅受相应场力。求磁场段出射位置的合理路线是？',[
    '电势差求入射速率，磁力方向定圆心，半径结合边界几何','把加速区和磁场区都当作同一个等速圆弧','让磁场力做功来求进入磁场后的速率变化','不计电荷符号，固定向同一侧弯曲'
  ],'静电场做功决定进入磁场的速率，纯磁场段速率不变。电荷符号定弯曲侧，出射位置由圆弧与边界几何决定。',['particle-energy','orbit-radius','magnetic-force']);
  add('particle-m2','particles','method','单一载流子模型中，测得非零霍尔电压大小，已知电流大小 I、磁场大小 B、|q| 和沿 B 的厚度 t。如何求浓度 n 与电性？',[
    t`先用 $n=IB/(|q|t|U_H|)$ 求浓度，电性再结合电流、磁场与电压极性判断`,'电压大小为正，所以载流子一定带正电','只凭电压大小便能同时确定浓度和电荷符号','不必知道样品厚度，直接用 I/B 求浓度'
  ],'大小关系只能反解浓度。载流子正负需要明确测量端点和方向，再分析漂移、磁力和电荷积累。',['hall-voltage','hall-coefficient','carrier-current']);

  window.REVIEW_DATA.quiz={questions,kinds:{formula:'公式题',concept:'知识点',method:'解法题'}};
})();
