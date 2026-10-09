(() => {
  // This page connects the existing course formulas; references always use formula IDs.
  const t = String.raw;
  window.REVIEW_DATA.summary = {
    targets: [
      {
        id:'field',title:'电场强度',symbol:t`\mathbf E`,intro:'由电荷求场、由电势求场，或从受力反推。先画方向，再选择计算路线。',
        methods:[
          {title:'电荷已知：叠加或积分',when:'点电荷系、有限尺寸带电体；不具备直接简化高斯积分的对称性。',steps:t`点电荷逐个求场，按分量相加；连续分布取 $dq=\lambda\,dl$、$\sigma\,dS$ 或 $\rho\,dV$。圆环、圆盘轴线上先消去横向分量。`,refs:['point-field','continuous-field','ring-field','disk-field']},
          {title:'对称性充分：高斯定理',when:'球对称、无限长柱对称、无限大平面对称。',steps:'选场强大小恒定且方向可判断的高斯面；分区算包围电荷。球壳、实心球、长圆柱的内部与外部不能共用同一段表达式。',refs:['electric-gauss','line-field','plane-field','shell-field','solid-sphere','charged-cylinder']},
          {title:'电势或检验电荷受力已知',when:'给出电势函数，或足够小的检验电荷及其电场力。',steps:t`电势函数求负梯度；受力反推用 $\mathbf E=\mathbf F/q_0$，负检验电荷需保留符号。导体紧外侧可由局部表面电荷密度求法向场。`,refs:['potential-gradient','potential-components','field-definition','surface-field']}
        ],check:'验算方向、单位与远场极限；场的某一分量为零，不等于整个电场为零。'
      },
      {
        id:'potential',title:'电势与电势差',symbol:t`V,\ \Delta V`,intro:'电势是标量。先指定参考零点，再区分“求一点电势”和“求两点电势差”。',
        methods:[
          {title:'电荷分布已知：标量叠加',when:'局域点电荷系或可取无穷远零势点的连续分布。',steps:'保留源电荷的正负号，直接相加，无需投影。球壳内部是常电势；电偶极子公式只用于远场。',refs:['point-potential','potential-sum','continuous-potential','shell-potential','dipole-potential']},
          {title:'电场已知：沿路径积分',when:'已有分段电场，或无限长线电荷等不宜取无穷远零势点的模型。',steps:t`按 $V_a-V_b=\int_a^b\mathbf E\cdot d\mathbf l$ 固定点序；跨界面分段积分。静电场可选方便路径。`,refs:['potential-difference','electrostatic-loop']},
          {title:'做功或电容状态已知：反解',when:'给出带符号电荷的电场力做功，或已知电容与极板电荷量大小。',steps:t`由 $W_{a\to b}=q(V_a-V_b)$ 求有向电势差；电容器由 $U=Q/C$ 求电压大小，端点方向另行说明。`,refs:['electric-work','capacitance']}
        ],check:'沿电场方向电势降低；电势零点可变，电势差不随参考点改变。'
      },
      {
        id:'charge',title:'电荷量与电荷密度',symbol:t`Q,\ \rho,\ \sigma`,intro:'先区分总电荷、自由电荷、束缚电荷，以及电荷密度的种类。',
        methods:[
          {title:'密度分布已知：电荷元积分',when:'给出线、面或体电荷密度及对应分布区域。',steps:t`按几何取 $dq=\lambda\,dl$、$\sigma\,dS$ 或 $\rho\,dV$，积分得到区域内电荷。密度均匀时才可直接乘长度、面积或体积。`,refs:['continuous-field']},
          {title:'由场的通量或散度反推',when:'真空中已知电场，或介质中已知电位移。',steps:t`真空中由闭合面电通量求 $Q_{\rm in}$，由 $\rho=\varepsilon_0\nabla\cdot\mathbf E$ 求局部体电荷密度；介质中 $\mathbf D$ 的通量给出面内自由电荷。`,refs:['electric-flux','electric-gauss','gauss-local','dielectric-gauss']},
          {title:'由导体平衡与电荷守恒',when:'空腔内净电荷、导体自身净电荷，或紧外侧法向电场已知。',steps:'在导体材料内选包住空腔的高斯面求内壁总电荷，再用守恒求外壁总电荷。真空紧外侧的法向场可反推局部面电荷密度。',refs:['conductor-equilibrium','cavity-charge','surface-field']},
          {title:'由极化或电容反推',when:'给出极化强度、介质表面方向，或电容与电压。',steps:t`束缚面电荷用 $\sigma_b=\mathbf P\cdot\hat{\mathbf n}$；极板电荷量大小用 $Q=CU$。内表面的介质外法向要单独画。`,refs:['bound-charge','capacitance']}
        ],check:'总电荷确定不意味着局部表面电荷均匀；高斯定理右侧只计面内相应种类的电荷。'
      },
      {
        id:'medium',title:'电位移与极化强度',symbol:t`\mathbf D,\ \mathbf P`,intro:'介质题通常先求电位移，再求电场，最后求极化与束缚电荷。',
        methods:[
          {title:'自由电荷 + 对称性 → 电位移',when:'介质中的球对称、柱对称或平面对称问题。',steps:t`由 $\oint\mathbf D\cdot d\mathbf S=Q_{\rm free,in}$ 求 $\mathbf D$；各层满足线性、各向同性模型时，再用各自的 $\varepsilon$ 求 $\mathbf E$。`,refs:['dielectric-gauss','linear-dielectric']},
          {title:'电场 + 介质参数 → 极化',when:'已知局部电场和线性介质参数。',steps:t`用 $\mathbf P=\varepsilon_0\chi_e\mathbf E$；也可由 $\mathbf D=\varepsilon_0\mathbf E+\mathbf P$ 反解。先把相对电容率换成对应的有量纲参数。`,refs:['polarization','displacement','relative-permittivity','bound-charge']}
        ],check:'分层介质不能统一代入同一个电容率；介质中的 D 通量只计自由电荷。'
      },
      {
        id:'capacitance',title:'电容与电容器状态',symbol:t`C,\ Q,\ U`,intro:'先求结构决定的电容，再用连接方式与边界条件确定电荷、电压和能量。',
        methods:[
          {title:'几何模型匹配：直接求电容',when:'平行板、同心球、同轴长圆柱，满足各自近似条件。',steps:'识别面积、间距、内外半径和介质参数。平行板忽略边缘，长圆柱忽略端部。',refs:['parallel-plate','spherical-capacitor','cylindrical-capacitor']},
          {title:'一般路线：先场后势再比值',when:'需要从几何推导，或存在分层介质。',steps:t`设极板带 $\pm Q$，先求 $\mathbf E$ 或 $\mathbf D$，再积分极板电势差，最后取 $C=Q/U$。`,refs:['electric-gauss','dielectric-gauss','potential-difference','capacitance']},
          {title:'电容器组：串并联 + 守恒',when:'能辨认相同两节点的并联，或中间孤立节点原先净电荷为零的标准串联。',steps:'串联用倒数和，电荷量大小相同；并联用电容和，电压相同。改变连接或断开电源后，按实际孤立节点检查电荷守恒。',refs:['series-capacitance','parallel-capacitance','capacitor-energy']}
        ],check:'接理想电源通常 U 固定；孤立电容器 Q 固定。不要把定义式误读成 C 由当前 Q 单独决定。'
      },
      {
        id:'energy',title:'功、势能与电场能量',symbol:t`W,\ U,\ w_e`,intro:'同一符号在不同公式中可能表示不同量，先写清“谁做功、什么能量”。',
        methods:[
          {title:'电荷在静电场中移动',when:'已知初末电势及带符号电荷量。',steps:t`单个电荷的势能为 $U=qV$；电场力功为 $q(V_{\rm 初}-V_{\rm 末})$，等于势能减少量。只受静态电磁场力时据此求动能变化。`,refs:['potential-energy','electric-work','particle-energy']},
          {title:'电容器整体：选择固定量',when:'给出电容器的 Q、U、C，或比较改变前后状态。',steps:'Q 固定优先用 Q²/(2C)，U 固定优先用 CU²/2，每个状态各用自身数据。先求初末储能，再比较变化；不要把两种连接约束下的趋势混用。',refs:['capacitor-energy']},
          {title:'电场分布已知：能量密度积分',when:'线性介质中的非均匀电场或分层介质。',steps:'先求各处能量密度，再遍历所需空间积分。球对称、柱对称分别选对应体积元；每层使用本层介质参数。',refs:['energy-density','field-energy']},
          {title:'给定线圈磁矩：磁场中的势能',when:'线圈磁矩和外磁场已知。',steps:'取点积并保留负号；磁矩与磁场同向时势能最低，垂直时是公式约定的零势能。',refs:['magnetic-energy']}
        ],check:'电容公式中的 U 表示电压；U=qV 中的 U 表示电势能；能量积分的 dV 表示体积元。'
      },
      {
        id:'current',title:'电流、电流密度与电动势',symbol:t`I,\ \mathbf j,\ \mathcal E`,intro:'宏观通量、微观载流子运动和导体本构关系是三条互相连接的路线。',
        methods:[
          {title:'截面分布或通过电荷已知',when:'给出电荷随时间变化，或截面上的电流密度分布。',steps:t`由 $I=dq/dt$ 或电流密度通量积分求 I；只有均匀且垂直截面时才可化为 $I=jS$。`,refs:['current-density']},
          {title:'载流子或电场参数已知',when:'单一载流子模型，或满足欧姆定律的导体。',steps:t`用 $\mathbf j=nq\mathbf v_d$ 连接浓度、电荷与漂移速度；用局部欧姆关系连接电场和电流密度。反求未知量时保留方向约定。`,refs:['carrier-current','ohm-local']},
          {title:'转动电荷或非静电力已知',when:'带电体以固定角速度转动，或给出电源内部非静电场。',steps:'转动电荷按每周期通过的电荷求等效电流，分成圆环后积分。电动势计算非静电力沿回路对单位正电荷做的功。',refs:['rotating-charge','emf-definition']}
        ],check:'电子漂移方向与常规电流方向相反；电导率与面电荷密度、电阻率与体电荷密度应按下标区分。'
      },
      {
        id:'magnetic',title:'磁感应强度',symbol:t`\mathbf B`,intro:'先看电流分布的对称性，再在环路法和电流元积分法之间选择。',
        methods:[
          {title:'对称性充分：安培环路定理',when:'无限长直导线、均匀载流长柱、薄壁长筒、理想密绕螺线环。',steps:'选环路并确定绕向，按右手规则求穿面电流的代数和；分区计算实际穿过的电流，不能全部区域都代总电流。',refs:['ampere-law','long-wire','current-cylinder','current-shell','toroid']},
          {title:'有限导线或组合结构：积分与叠加',when:'有限直段、圆弧、圆线圈及其组合，不易从环路积分直接提取 B。',steps:'按毕奥–萨伐尔定律先判叉乘方向，再积分分量；分段使用匹配的典型公式，最后作矢量合成。',refs:['biot-savart','magnetic-superposition','finite-wire','half-wire','loop-axis','loop-center','arc-center']},
          {title:'长螺线管或转动带电体',when:'长密绕螺线管内部远离端部；带电体转动的等效稳恒电流模型。',steps:'螺线管先求单位长度匝数。转动带电体先拆成圆环并算等效电流，再积分每环磁场。',refs:['solenoid','rotating-charge','loop-center']},
          {title:'受力或轨迹已知：反解磁场',when:'已知纯磁力大小与夹角，或仅受匀强磁力的粒子圆周半径。',steps:t`垂直入射时由 $B=mv/(|q|R)$ 反解；由磁力大小反解需已知垂直速度，且它不为零。直导线也可由安培力大小关系反解，注意有效长度和夹角。`,refs:['orbit-radius','magnetic-force-size','straight-force-size']}
        ],check:'磁场高斯定理约束闭合面的净通量，不单独确定局部 B。圆弧公式仅用于圆心，角度用弧度。'
      },
      {
        id:'moments',title:'偶极矩与磁矩',symbol:t`\mathbf p,\ \mathbf m`,intro:'两者都包含方向，但定义来源、方向约定及后续使用的公式不同。',
        methods:[
          {title:'电偶极子：电荷量与间距',when:'等量异号点电荷构成的偶极子。',steps:'从负电荷指向正电荷画间距矢量，乘正电荷电荷量得电偶极矩；远场电势再取与场点方向的点积。',refs:['dipole-moment','dipole-potential']},
          {title:'线圈：电流、面积与匝数',when:'平面载流线圈，或可拆成圆环的转动带电体。',steps:'面积矢量按电流右手规则取向。各线圈磁矩按矢量相加；求力矩与势能时使用磁矩和磁场的夹角。',refs:['magnetic-moment','rotating-charge','magnetic-torque','magnetic-energy']}
        ],check:'磁矩矢量 m 与粒子质量 m 通过物理对象和单位区分，不能跨公式混用。'
      },
      {
        id:'force',title:'电磁力与磁力矩',symbol:t`\mathbf F,\ \boldsymbol\tau`,intro:'先分清受力对象：点电荷、运动粒子、电流元、整段导线或线圈。',
        methods:[
          {title:'点电荷与运动粒子',when:'源点电荷已知，或场点处电场、磁场和速度已知。',steps:'静止点电荷间用库仑定律；粒子在给定场中用洛伦兹力。先分别算电场力和磁场力，再合成；磁力大小与方向分开算。',refs:['coulomb','field-definition','lorentz-force','magnetic-force','magnetic-force-size']},
          {title:'载流导线：先外场，再积分',when:'直导线、弯曲导线、非匀强外磁场或两根平行长直电流。',steps:'一般先求外加 B，再积分电流元受力；整段处于同一匀强场时，可用首尾位移代替弯曲路径。平行长导线的结果是单位长度力。',refs:['ampere-element','wire-force','uniform-wire-force','straight-force-size','parallel-wires']},
          {title:'线圈转动：磁矩叉乘磁场',when:'平面载流线圈在匀强外磁场中。',steps:'闭合线圈在匀强场中合力为零，但可以有力矩；磁矩方向先由电流判定，再取叉乘。',refs:['magnetic-moment','magnetic-torque']}
        ],check:'求大小用 |q|，求方向用带符号 q；导线受力用外加场，不把自身场直接当作外加场。'
      },
      {
        id:'motion',title:'速率、轨迹半径、周期与螺距',symbol:t`v,\ R,\ T,\ h`,intro:'电场做功决定速率变化，磁场决定弯曲；轨迹模型须与实际受力条件一致。',
        methods:[
          {title:'先用能量求速率',when:'非相对论粒子只受静态电磁场力，已知初末电势。',steps:'用电势差与初速求动能变化；若存在其他做功的力，需要按题目补入，不能直接套当前公式。',refs:['particle-energy','electric-work']},
          {title:'垂直入射：圆周运动',when:'仅受磁力、匀强磁场、速度垂直磁场。',steps:t`先由磁力方向定圆心，再求 R 与 T。出入边界用圆、弦与角的几何；经过圆心角 $\Delta\varphi$ 的时间为 $(\Delta\varphi/2\pi)T$。`,refs:['magnetic-force','orbit-radius','cyclotron-frequency']},
          {title:'斜入射：分解速度形成螺旋',when:'仅受匀强磁场力，速度与磁场既不平行也不垂直。',steps:'垂直分量决定半径，平行分量决定一个周期的轴向位移。周期仍由电荷量大小、质量与磁场决定。',refs:['velocity-components','helix-radius','helix-pitch','cyclotron-frequency']}
        ],check:'复合场一般不能直接按等速圆弧处理；只有磁力时，速率和动能不变。'
      },
      {
        id:'hall',title:'霍尔电场、电压与载流子浓度',symbol:t`E_H,\ U_H,\ n`,intro:'霍尔效应把微观漂移、磁力平衡和宏观电压测量串在一起。',
        methods:[
          {title:'稳态力平衡求横向电场',when:'单一载流子，漂移速度垂直磁场，已达到横向稳态。',steps:'先画载流子的磁力和积累电荷产生的电场力。平衡时两者相抵；大小由漂移速率乘磁场求得。',refs:['lorentz-force','hall-field','carrier-current']},
          {title:'由霍尔电压反推浓度',when:'电流、磁场、霍尔电压大小、沿磁场方向厚度已知。',steps:t`由现有霍尔电压式反解 $n=IB/(|q|t|U_H|)$。若给出霍尔系数，单一载流子模型中用 $n=1/(|q|\,|R_H|)$。`,refs:['hall-voltage','hall-coefficient']},
          {title:'由电压极性判断载流子电性',when:'明确电流方向、磁场方向和测量端点的高低电势。',steps:'先假设载流子电性，确定漂移方向，再判磁力与积累电荷所在侧；与已知高电势侧核对。霍尔系数的符号须基于明确测量约定。',refs:['carrier-current','magnetic-force','hall-coefficient']}
        ],check:'厚度 t 沿磁场方向，不是任意横向宽度；大小公式不能独立判断载流子正负。'
      }
    ],
    pitfalls:[
      {title:'通量为零 ≠ 场为零',wrong:'闭合面的电通量或磁通量为零，所以里面处处没有场。',right:'通量是整个曲面上的带符号总和。电通量零只说明面内净电荷为零；磁场的闭合面净通量始终为零。',check:'若要从零积分推出局部零场，还须有足够对称性。',refs:['electric-flux','electric-gauss','magnetic-gauss','current-shell']},
      {title:'定理成立 ≠ 能直接提出场强',wrong:'用了高斯定理或安培环路定理，就可以把 E 或 B 当成常量提出积分。',right:'场的大小和方向在所选面、环路上的变化须由对称性确定；不满足时改用叠加、积分。',check:'检查哪些部分法向/切向分量为零，哪些部分场强大小相同。',refs:['electric-gauss','ampere-law','continuous-field','biot-savart']},
      {title:'面内源与总场不是同一件事',wrong:'高斯面外的电荷不产生面上的电场，环路外的电流不产生环路上的磁场。',right:'积分中的场由全部相关源共同产生；右侧仅记录包围电荷或穿面电流。外部源也可改变各点场值。',check:'不要用右侧只计局部源的规则删去左侧总场贡献。',refs:['electric-gauss','ampere-law','magnetic-superposition']},
      {title:'E 为零 ≠ V 为零',wrong:'球壳内部或静电平衡导体内场强为零，所以电势为零。',right:'场强为零意味着该连通区域内电势为常量；常量值仍由参考零点和边界决定。',check:'检查壳内电势与表面电势是否相同。',refs:['shell-field','shell-potential','conductor-equilibrium','potential-gradient']},
      {title:'电势标量，电场矢量',wrong:'电势也要按方向投影，或者电场大小可以直接代数相加。',right:'同一参考点下电势带符号相加；电场先按方向分解，再合成。对称位置可能出现 E 抵消而 V 不抵消。',check:'q 的正负、场点距离和分量方向分开记录。',refs:['point-field','continuous-field','potential-sum','continuous-potential']},
      {title:'功的点序与梯度负号',wrong:'把末势减初势直接乘 q 当作电场力做功，或求场漏掉负梯度。',right:t`电场力功是 $q(V_{\rm 初}-V_{\rm 末})=-\Delta U$；$\mathbf E=-\nabla V$。负电荷的势能变化与电势变化相反。`,check:'先写初末点与带符号 q，再代数值；正功对应势能下降。',refs:['potential-difference','electric-work','potential-energy','potential-components']},
      {title:'零势点与无限模型',wrong:'所有分布都能把无穷远选为有限的零势点。',right:'点电荷和局域分布可按现有公式采用无穷远参考；无限长线电荷等模型优先求两点电势差，另选有限参考点。',check:'先检查场的积分到无穷远是否收敛。',refs:['point-potential','continuous-potential','line-field','potential-difference']},
      {title:'导体紧外侧与非导体薄片',wrong:'所有带电平面单侧场都用同一个系数。',right:t`真空静电平衡导体紧外侧 $E_n=\sigma/\varepsilon_0$；孤立的均匀非导体无限薄片单侧大小为 $|\sigma|/(2\varepsilon_0)$。`,check:'画出高斯盒两侧场：导体内侧为零，薄片两侧均有通量。',refs:['surface-field','plane-field']},
      {title:'导体材料内部与有源空腔',wrong:'导体静电平衡，因此腔内无论有没有电荷都没有电场。',right:'导体材料内场强为零；腔内有电荷时不能套用材料内部结论。腔壁总感应电荷可由材料内的高斯面求得。',check:'先标明高斯面经过金属材料还是空腔空间。',refs:['conductor-equilibrium','cavity-charge']},
      {title:'E、D、P 与两类电荷',wrong:'介质中 D 的通量右侧计全部电荷，或所有介质都直接用 D=εE。',right:'D 的闭合面通量计自由电荷；E 由自由与束缚电荷共同产生。标量电容率形式须满足线性、各向同性等条件。',check:'分层介质分别代入参数，束缚面电荷按介质外法向取符号。',refs:['displacement','dielectric-gauss','linear-dielectric','bound-charge']},
      {title:'电容变化前先判断固定量',wrong:'插入介质、改变板距后，默认 Q 和 U 都保持原值。',right:'理想电源保持连接时通常固定 U；孤立电容器固定 Q。电容随结构与介质改变，储能的变化取决于约束。',check:'先写连接状态，再选 Q²/(2C) 或 CU²/2 比较。',refs:['parallel-plate','capacitance','capacitor-energy']},
      {title:'同一字母可能代表不同量',wrong:'把电压 U 与势能 U、电导率 σ 与面电荷密度 σ 当作同一变量。',right:'电容式中 U 是电压，U=qV 中是能量；σ、ρ 在局部欧姆关系中有材料参数下标。粒子 m 是质量，线圈的矢量 m 是磁矩。',check:'核对变量详情与单位，能量积分的 dV 是体积元。',refs:['capacitance','potential-energy','field-energy','ohm-local','magnetic-moment','orbit-radius']},
      {title:'导线公式的角度与几何',wrong:'有限直线的有向角差改成任意正角相加，或圆弧公式用在任意场点。',right:'有限直线公式需按既定垂线和有向角约定取端点角；半无限线公式要求场点在端点垂线上；圆弧公式要求场点在圆心且角度以弧度计。',check:'先画垂足、端点和场点，确认几何后套式。',refs:['finite-wire','half-wire','arc-center','loop-axis']},
      {title:'合力为零 ≠ 力矩为零',wrong:'匀强场里闭合线圈合力为零，所以没有转动趋势。',right:'匀强场中首尾位移为零导致合力为零，但线圈磁矩与磁场不平行时有力矩。夹角是磁矩和磁场之间的角。',check:'分别问平动与转动，先画面积矢量正法线。',refs:['uniform-wire-force','magnetic-moment','magnetic-torque']},
      {title:'磁力改变方向，电场力可改变速率',wrong:'磁场力大，所以粒子越转越快；斜入射的半径直接代总速率。',right:'磁力垂直瞬时速度，不做功。斜入射半径只用垂直速度，螺距用平行速度；有电场的复合场轨迹一般不能按等速圆弧处理。',check:'求速度先看做功，求半径先看垂直分量；用带符号 q 判弯曲方向。',refs:['magnetic-force','particle-energy','velocity-components','helix-radius','helix-pitch','lorentz-force']},
      {title:'霍尔大小关系与极性判断',wrong:'用电压大小直接判断载流子正负，或任取一个尺寸作为厚度 t。',right:'霍尔电压大小求浓度；正负需结合电流、磁场、测量端点和电荷积累判断。t 是沿磁场方向的样品厚度。',check:'画三维方向，再判断横向受力和高电势侧。',refs:['hall-field','hall-voltage','hall-coefficient','carrier-current']}
    ],
    chains:[
      {title:'静电分布题',steps:['分区与对称性','电场 E','电势差','功 / 势能'],note:'积分每跨一个不同电场区域，就拆一段；保持同一参考零点。',refs:['electric-gauss','potential-difference','electric-work']},
      {title:'介质电容题',steps:['自由电荷','电位移 D','各层电场 E','电压 U → 电容 C'],note:'D 的通量计自由电荷；每层各用自身 ε，再按实际电源连接状态求末态。',refs:['dielectric-gauss','linear-dielectric','capacitance','capacitor-energy']},
      {title:'电流磁场与导线受力题',steps:['电流分布 / 等效电流','外磁场 B','电流元力','合力 / 力矩'],note:'先算其他电流产生的场，再算目标导线的力；合力和力矩分别判断。',refs:['rotating-charge','biot-savart','ampere-element','magnetic-torque']},
      {title:'粒子过电场与磁场题',steps:['电势差与初速','进入磁场的速度','弯曲侧与半径','边界几何 / 运动时间'],note:'仅受匀强磁力时才能套圆周或螺旋模型；出入边界由几何决定。',refs:['particle-energy','orbit-radius','cyclotron-frequency','helix-pitch']},
      {title:'霍尔测量题',steps:['电流方向与漂移方向','磁力与积累电荷','稳态横向电场','电压 / 浓度 / 电性'],note:'电压大小与电压极性分开处理；样品厚度沿磁场方向。',refs:['carrier-current','hall-field','hall-voltage','hall-coefficient']}
    ],
    checks:[['对象','点电荷还是电流元？导体材料还是空腔？'],['范围','静电、稳恒、匀强、远场、无限长等条件是否满足？'],['方向','点积的法向、叉乘的次序、带符号电荷是否正确？'],['边界','内外分区、端点点序、参考零点和电源约束是否清楚？'],['单位','电压与能量、电容率与相对电容率、质量与磁矩是否区分？'],['极限','中心、边界、远场、平行或垂直入射的结果是否合理？']]
  };
})();
