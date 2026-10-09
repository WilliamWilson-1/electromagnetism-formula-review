# 电磁学复习提纲：大纲、公式与解题思路

> 依据三份课件整理：[第10章静电场A.pdf](./第10章静电场A.pdf)、[第10章 静电学B.pdf](./第10章%20静电学B.pdf)、[第11章静磁场A.pdf](./第11章静磁场A.pdf)。范围为**静电场、导体与电介质、电容和电场能量、稳恒电流基础、稳恒磁场及磁场力**。课件没有系统讲电磁感应、交流电、麦克斯韦方程组和电磁波，因此本文不把它们当作已讲内容。

## 0. 一张图看知识主线

```text
电荷分布 ──库仑定律/高斯定理──> 电场 E ──线积分──> 电势 V
                                   │             │
                                   └──力 qE      └──电势能 qV
导体静电平衡 ──> 感应电荷、屏蔽 ──> 电容 C ──> 储能 W
电介质极化 ──> 位移矢量 D ────────┘
电荷定向运动 ──> 电流 I ──毕奥-萨伐尔/安培环路定理──> 磁场 B
                                                     │
                                安培力、磁力矩 <───────┤
                                洛伦兹力、粒子轨道 <───┘
```

### 章节对应

| 课件 | 内容 | 核心任务 |
|---|---|---|
| 静电场 A：§10-1～§10-4 | 库仑定律、场强、高斯定理、电势、场强与电势的关系 | 从电荷求 $\mathbf E$ 和 $V$，从 $V$ 反求 $\mathbf E$ |
| 静电学 B：§10-5～§10-9 | 导体、电介质、电容、电场能量、传导电流与电动势 | 处理感应电荷、分层介质、接电源/断电源问题 |
| 静磁场 A：§11-1～§11-5 | 磁现象、毕奥-萨伐尔定律、磁高斯定理、安培环路定理、磁场力、粒子运动 | 从电流求 $\mathbf B$，再求受力或轨迹 |

## 1. 记号、单位与基本判断

- 真空电容率 $\varepsilon_0\approx8.85\times10^{-12}\,\mathrm{F/m}$，$k=1/(4\pi\varepsilon_0)\approx8.99\times10^9\,\mathrm{N\,m^2/C^2}$；真空磁导率 $\mu_0=4\pi\times10^{-7}\,\mathrm{H/m}$。
- 均匀各向同性线性介质：$\varepsilon=\varepsilon_r\varepsilon_0$。$\mathbf E$ 单位 $\mathrm{N/C}=\mathrm{V/m}$；$\mathbf B$ 单位 T；$\mathbf D$ 单位 $\mathrm{C/m^2}$。
- $\lambda,\sigma,\rho$ 分别表示线、面、体电荷密度，单位分别为 $\mathrm{C/m}$、$\mathrm{C/m^2}$、$\mathrm{C/m^3}$。不要把电阻率 $\rho_{\rm res}$ 与体电荷密度 $\rho$ 混淆。
- **场是矢量，电势是标量。** 求场先定方向再积分/叠加；求电势可直接代数相加。积分式里的 $r$ 应为源点到场点的距离。

## 2. 静电场：公式大全

### 2.1 电荷、电力、场强与叠加（静电场 A，§10-1）

| 对象 | 条件与用法 | 公式 |
|:--|---|---|
| 两点电荷 | 真空、静止点电荷；$\hat{\mathbf r}_{12}$ 从 1 指向 2，电荷符号自动决定引斥 | $\displaystyle \mathbf F_{1\to2}=\frac{1}{4\pi\varepsilon_0}\frac{q_1q_2}{r^2}\hat{\mathbf r}_{12}$ |
| 场强定义 | $q_0$ 为足够小的正检验电荷；负电荷受力与 $\mathbf E$ 反向 | $\displaystyle \mathbf E=\mathbf F/q_0$ |
| 点电荷场 | $q>0$ 向外，$q<0$ 向内 | $\displaystyle \mathbf E=\frac{1}{4\pi\varepsilon_0}\frac{q}{r^2}\hat{\mathbf r}$ |
| 连续分布 | $dq=\lambda dl,\sigma dS,\rho dV$；先按对称性消去互相抵消的分量 | $\displaystyle \mathbf E(\mathbf r)=\frac1{4\pi\varepsilon_0}\int\frac{\mathbf r-\mathbf r'}{\lvert\mathbf r-\mathbf r'\rvert^3}\,dq$ |
| 电偶极矩 | $\boldsymbol\ell$ 从负电荷指向正电荷；远场 $E\propto1/r^3$ | $\mathbf p=q\boldsymbol\ell$ |

**常见对称分布的场**（无限长、无限大模型均忽略边缘）：

| 电荷分布 | 场强大小 |
|---|---|
| 无限长均匀带电直线，距轴 $r$ | $\displaystyle E=\frac{|\lambda|}{2\pi\varepsilon_0r}$ |
| 无限大均匀带电平面，任一侧 | $\displaystyle E=\frac{|\sigma|}{2\varepsilon_0}$ |
| 半径 $R$ 的均匀带电圆环，轴线上距圆心 $x$ | $\displaystyle E_x=\frac{1}{4\pi\varepsilon_0}\frac{Qx}{(R^2+x^2)^{3/2}}$（带符号） |
| 半径 $R$ 的均匀带电圆盘，轴线 $x>0$ | $\displaystyle E_x=\frac{\sigma}{2\varepsilon_0}\left(1-\frac{x}{\sqrt{x^2+R^2}}\right)$ |

### 2.2 电通量与高斯定理（静电场 A，§10-2）

$$\Phi_E=\int_S\mathbf E\cdot d\mathbf S,\qquad
\oint_S\mathbf E\cdot d\mathbf S=\frac{Q_{\rm in}}{\varepsilon_0}.$$

- 闭合面的法向取**向外**。$Q_{\rm in}$ 是面内电荷的**代数和**；积分中的 $\mathbf E$ 却由空间内外**所有**电荷产生。
- 高斯定理始终成立，但只有球、柱、平面等足够对称时，才容易由通量直接求场强。$Q_{\rm in}=0$ 只说明净通量为零，**不说明面上处处 $E=0$**。
- 均匀带电球壳：$E(r<R)=0$，$\displaystyle E(r>R)=\frac1{4\pi\varepsilon_0}\frac{Q}{r^2}$。
- 均匀带电实心球：$\displaystyle E(r<R)=\frac{Qr}{4\pi\varepsilon_0R^3}$；外部按点电荷处理。
- 半径 $R$、体电荷密度 $\rho$ 的无限长均匀带电圆柱：$\displaystyle E(r<R)=\frac{\rho r}{2\varepsilon_0}$，$\displaystyle E(r>R)=\frac{\rho R^2}{2\varepsilon_0r}$。
- 静电场的微分形式：$\nabla\cdot\mathbf E=\rho/\varepsilon_0$。这是“电荷是电场源”的局部表述。

### 2.3 电势、电场力做功、保守性（静电场 A，§10-3～§10-4）

$$V_a-V_b=\int_a^b\mathbf E\cdot d\mathbf l,\qquad
W_{a\to b}=q(V_a-V_b)=-\Delta U,\qquad U=qV.$$

$$\oint\mathbf E\cdot d\mathbf l=0,\qquad
\mathbf E=-\nabla V
=-\left(\frac{\partial V}{\partial x}\hat{\mathbf x}+\frac{\partial V}{\partial y}\hat{\mathbf y}+\frac{\partial V}{\partial z}\hat{\mathbf z}\right).$$

- 取无穷远 $V=0$ 时：点电荷 $\displaystyle V=\frac{q}{4\pi\varepsilon_0r}$；点电荷系 $\displaystyle V=\sum_i\frac{q_i}{4\pi\varepsilon_0r_i}$；连续分布 $\displaystyle V=\frac1{4\pi\varepsilon_0}\int\frac{dq}{r}$。
- 仅当无穷远电势可定义为有限值时，才方便取 $V(\infty)=0$。无限长直线、无限大平面的**绝对电势**不能这样定；直接求两点电势差，并自选有限参考点。
- $\mathbf E$ 沿电势下降最快方向，且垂直等势面。$V=0$ 不代表 $E=0$，$E=0$ 也不代表 $V=0$。
- 均匀带电球壳取 $V(\infty)=0$：$\displaystyle V(r\ge R)=\frac{Q}{4\pi\varepsilon_0r}$，$\displaystyle V(r\le R)=\frac{Q}{4\pi\varepsilon_0R}$。跨分段区域积分时先分段，且电势在普通带电面处连续。
- 电偶极子远场：$\displaystyle V\simeq\frac{1}{4\pi\varepsilon_0}\frac{\mathbf p\cdot\hat{\mathbf r}}{r^2}$，适用于 $r\gg\ell$。

### 2.4 静电平衡中的导体（静电学 B，§10-5）

- 平衡条件：导体材料内部 $\mathbf E=0$；整个连通导体为等势体；表面外侧电场垂直于表面。导体内部净电荷为零，孤立实心导体的多余电荷在外表面。
- 真空中导体表面紧外侧：$\displaystyle E_n=\sigma/\varepsilon_0$，$\sigma$ 带符号决定方向。**不要误用为非导体带电薄片的 $\sigma/(2\varepsilon_0)$**。
- 空腔导体：若腔内无电荷，腔内 $E=0$，内壁无净感应电荷；若腔内有净电荷 $q$、导体本身净电荷 $Q$，内壁总电荷为 $-q$，外壁总电荷为 $Q+q$。仅凭总电荷不能确定内外壁各处的局部分布。
- 导体外壳可屏蔽外部静电场对无源空腔的影响。尖端附近曲率大，表面电荷和场强通常更集中；这是定性判断，不是任意形状都满足简单的“$\sigma$ 与曲率成正比”定量式。

### 2.5 电介质与电位移（静电学 B，§10-6）

$$\mathbf D=\varepsilon_0\mathbf E+\mathbf P,\qquad
\oint_S\mathbf D\cdot d\mathbf S=Q_{\rm free,in}.$$

均匀各向同性**线性**介质中：$\mathbf P=\varepsilon_0\chi_e\mathbf E$，$\mathbf D=\varepsilon\mathbf E$，$\varepsilon_r=1+\chi_e$。若界面无自由面电荷，$D_n$ 连续；静电场切向分量 $E_t$ 连续。极化面电荷密度为 $\sigma_b=\mathbf P\cdot\hat{\mathbf n}$（$\hat{\mathbf n}$ 为介质外法向）。

**分层介质题**：先用包围自由电荷的高斯面求 $D$，再在各层用 $E_i=D_i/\varepsilon_i$，最后分段积分得电压。$D$ 的高斯定理只计**自由电荷**；$E$ 的高斯定理计自由电荷与束缚电荷的总和。

### 2.6 电容与电场能量（静电学 B，§10-7～§10-8）

$$C=\frac{Q}{U},\qquad Q=CU,\qquad
\frac1{C_{\rm 串}}=\sum_i\frac1{C_i},\qquad
C_{\rm 并}=\sum_i C_i.$$

| 电容器 | 电容 | 条件 |
|---|---|---|
| 平行板 | $\displaystyle C=\frac{\varepsilon S}{d}$ | 板间均匀充满介质，$d$ 远小于板尺寸 |
| 同心球面，半径 $a<b$ | $\displaystyle C=4\pi\varepsilon\frac{ab}{b-a}$ | 两球间均匀介质 |
| 同轴圆柱，长度 $L$、半径 $a<b$ | $\displaystyle C=\frac{2\pi\varepsilon L}{\ln(b/a)}$ | 忽略端部效应 |

$$W=\frac{Q^2}{2C}=\frac12QU=\frac12CU^2,\qquad
w_e=\frac12\mathbf E\cdot\mathbf D=\frac12\varepsilon E^2,\qquad
W=\int w_e\,dV.$$

- **串联等电荷，并联等电压**。接着电源时通常 $U$ 固定；断开电源且无漏电时，孤立极板上的 $Q$ 固定。先定哪个量固定，再判断插入介质、改变板距后的 $C,U,E,W$。
- 充满介质使 $C$ 增大 $\varepsilon_r$ 倍：若 $Q$ 不变，$U,E,W$ 减小为原来的 $1/\varepsilon_r$；若 $U$ 不变，$Q,W$ 增大 $\varepsilon_r$ 倍，而理想平行板 $E=U/d$ 不变。
- 两个电容器相连后的能量差应写作 $W_{\rm 初}-W_{\rm 末}$。电荷守恒，并不代表静电场能量守恒；损失转化为导线和其他形式的能量。

### 2.7 传导电流与电动势（静电学 B，§10-9）

$$I=\frac{dq}{dt}=\int_S\mathbf j\cdot d\mathbf S,\qquad
\mathbf j=nq\mathbf v_d,\qquad
\mathbf j=\sigma_c\mathbf E=\frac{\mathbf E}{\rho_{\rm res}}.$$

其中 $q$ 是**带符号的单个载流子电荷**；电子漂移速度与常规电流方向相反。电动势 $\displaystyle \mathcal E=\oint\frac{\mathbf f_{\rm 非静电}}{q}\cdot d\mathbf l=\oint\mathbf E_{\rm 非静电}\cdot d\mathbf l$，即电源非静电力沿闭路对单位正电荷做的功。本节课件把稳恒电路定律标为自学，复习优先掌握定义与微分形式欧姆定律。

## 3. 稳恒磁场：公式大全

### 3.1 电流产生磁场（静磁场 A，§11-1～§11-2）

$$d\mathbf B=\frac{\mu_0}{4\pi}\frac{I\,d\boldsymbol\ell\times\hat{\mathbf r}}{r^2},\qquad
\mathbf B=\int d\mathbf B.$$

$d\boldsymbol\ell$ 沿电流方向，$\hat{\mathbf r}$ 从电流元指向场点；方向用右手定则。复杂导线可拆成直段、圆弧、圆环后做**矢量叠加**。

| 电流模型 | 磁感应强度 | 条件 |
|---|---|---|
| 无限长直导线，距导线 $r$ | $\displaystyle B=\frac{\mu_0 I}{2\pi r}$ | 导线外；绕线成环向 |
| 半无限长直导线，场点在端点的垂线上、距端点 $r$ | $\displaystyle B=\frac{\mu_0 I}{4\pi r}$ | 特定几何位置 |
| 有限直导线，场点到延长线垂距 $a$ | $\displaystyle B=\frac{\mu_0 I}{4\pi a}(\sin\alpha_2-\sin\alpha_1)$ | $\alpha_i$ 为两端点连线相对垂线的**有向角**；统一角度定义即可 |
| 半径 $R$ 的圆电流，轴线上距圆心 $x$ | $\displaystyle B_x=\frac{\mu_0IR^2}{2(R^2+x^2)^{3/2}}$ | 轴向按右手定则 |
| $N$ 匝圆线圈中心 | $\displaystyle B=\frac{\mu_0NI}{2R}$ | 每匝近似同半径 |
| 圆弧在圆心，弧度 $\varphi$ | $\displaystyle B=\frac{\mu_0I\varphi}{4\pi R}$ | 仅圆心，角度用弧度 |
| 无限长密绕螺线管内部 | $B\simeq\mu_0 nI$ | 真空、远离端部；$n=N/L$ |

转动带电体先求等效电流：$dI=(\omega/2\pi)dq$，再把圆环的磁场积分；磁矩 $\mathbf m=NI\mathbf S$，方向按电流右手定则。

### 3.2 磁高斯定理与安培环路定理（静磁场 A，§11-3～§11-4）

$$\oint_S\mathbf B\cdot d\mathbf S=0,\qquad
\oint_L\mathbf B\cdot d\boldsymbol\ell=\mu_0 I_{\rm 穿过}.$$

- 磁场线无起点终点；穿入闭合面的磁通量与穿出量相抵。单个开放面的磁通量仍可不为零。
- 安培环路的绕向与穿面电流正向由右手定则配对。$I_{\rm 穿过}$ 是代数和；环路积分中的 $\mathbf B$ 由**全部电流**产生。
- 安培环路定理适合求场的前提是**对称性足够强**，能在所选环路上把 $B$ 从积分中提出；否则定理仍成立，但不能直接求 $B$。
- 均匀载流实心长圆柱，半径 $R$、总电流 $I$：$\displaystyle B(r<R)=\frac{\mu_0Ir}{2\pi R^2}$，$\displaystyle B(r>R)=\frac{\mu_0I}{2\pi r}$。
- 理想无限长薄壁圆柱筒，电流全在半径 $R$ 的筒壁：$B(r<R)=0$，$\displaystyle B(r>R)=\frac{\mu_0I}{2\pi r}$。
- 密绕螺线环内：$\displaystyle B(r)=\frac{\mu_0NI}{2\pi r}$（在绕组截面内部、理想对称近似）；外部近似为零。

### 3.3 磁场对电流的作用（静磁场 A，§11-4）

$$d\mathbf F=I\,d\boldsymbol\ell\times\mathbf B,\qquad
\mathbf F=I\int d\boldsymbol\ell\times\mathbf B.$$

- 匀强磁场中直导线：$\mathbf F=I\mathbf L\times\mathbf B$，$F=ILB\sin\theta$。同一匀强场中弯导线的合力可用**从起点到终点的位移矢量** $\mathbf L$；非匀强场须逐段积分。
- 两根平行无限长导线相距 $r$：$\displaystyle \frac FL=\frac{\mu_0I_1I_2}{2\pi r}$，同向吸引，反向排斥。
- 平面线圈磁矩 $\mathbf m=NI\mathbf S$；匀强场中的力矩 $\boldsymbol\tau=\mathbf m\times\mathbf B$，$\tau=mB\sin\theta$，其中 $\theta$ 是**磁矩与磁场**的夹角。匀强场中的闭合线圈合力为零，但力矩可不为零；势能 $U=-\mathbf m\cdot\mathbf B$。

### 3.4 带电粒子的磁场力、轨道与霍尔效应（静磁场 A，§11-5）

$$\mathbf F=q(\mathbf E+\mathbf v\times\mathbf B),\qquad
\mathbf F_B=q\mathbf v\times\mathbf B,\quad F_B=|q|vB\sin\theta.$$

- 磁场力始终与瞬时速度垂直，**不做功**，只改变速度方向。用右手定则先判断 $\mathbf v\times\mathbf B$，负电荷反向。
- $\mathbf v\parallel\mathbf B$：匀速直线。$\mathbf v\perp\mathbf B$：$\displaystyle R=\frac{mv}{|q|B}$，$\displaystyle \omega_c=\frac{|q|B}{m}$，$\displaystyle T=\frac{2\pi m}{|q|B}$，非相对论条件下成立。
- 斜入射：$v_\perp=v\sin\theta$，$v_\parallel=v\cos\theta$；螺旋半径 $\displaystyle R=\frac{mv_\perp}{|q|B}$，螺距 $h=v_\parallel T$。
- 静态电磁场中用能量式 $\Delta(\tfrac12mv^2)=q(V_{\rm 初}-V_{\rm 末})$；磁力不进做功项。若速度较高需改用相对论动量，不能机械套 $mv$。
- 霍尔效应（单一载流子、稳态、$\mathbf v\perp\mathbf B$）：$E_H=v_dB$；若样品沿磁场方向厚度为 $t$，$\displaystyle |U_H|=\frac{IB}{n|q|t}$，带符号霍尔系数 $\displaystyle R_H=\frac1{nq}$。电势哪侧高由载流子正负、$\mathbf I$ 与 $\mathbf B$ 的方向共同判断。

## 4. 做题思路：先选方法，再代公式

### 4.1 通用六步

1. **画图并标方向**：场源、场点、坐标轴、正方向、闭合面法向或环路绕向。
2. **找对称性与分区**：球/柱/平面？导体内、空腔、介质层、外部是否要分开？
3. **选主方程**：电场用库仑积分或高斯定理；电势用叠加或 $-\int\mathbf E\cdot d\mathbf l$；磁场用毕奥-萨伐尔或安培环路定理。
4. **写适用条件**：无限长近似、线性介质、匀强场、接电源/断开、是否忽略边缘效应。
5. **先求带符号的分量，再合成**：积分变量与观察位置分清；界面处使用边界条件。
6. **验算**：量纲、方向、边界连续性、$r\to0$ 或 $r\to\infty$ 的极限是否合理。

### 4.2 题型选择表

| 题目特征 | 最快起手式 | 关键检查 |
|---|---|---|
| 离散点电荷、圆环/圆盘轴线 | 写 $dq$，用对称性消横向分量，再积分 | 电场矢量相消；电势标量相加 |
| 球、无限长柱、无限大平面 | 选同对称性的高斯面 | 高斯面上 $E$ 是否恒定或通量是否为零 |
| 给 $\mathbf E$ 求电压/功 | 沿方便路径积分 $V_a-V_b=\int_a^b\mathbf E\cdot d\mathbf l$ | 积分方向、分段边界、参考零势点 |
| 给 $V(x,y,z)$ 求场 | $\mathbf E=-\nabla V$ | 负号、各坐标分量 |
| 导体与空腔 | 先用导体内 $E=0$ 推内壁总电荷，再守恒求外壁 | $Q_{\rm in}$ 与局部电荷分布不可混同 |
| 介质分层 | 先求 $\mathbf D$，再各层求 $\mathbf E$ 和 $U$ | 高斯定理的自由电荷、介质界面条件 |
| 电容器改几何/插介质 | 先求新 $C$，再判 $Q$ 固定还是 $U$ 固定 | 能量与电荷守恒的对象不同 |
| 几段导线、圆弧、电流面 | 毕奥-萨伐尔或典型结果叠加 | 右手定则与各段贡献方向 |
| 无限长圆柱、螺线管、螺线环 | 选有对称性的安培环路 | 环路包围电流，而非“附近全部电流” |
| 导线/线圈受力 | 先由其他电流求 $\mathbf B$，再 $d\mathbf F=I\,d\boldsymbol\ell\times\mathbf B$ | 自身磁场不直接算作外加受力场 |
| 粒子进出磁场、霍尔效应 | 先判力方向；画圆心与轨迹；再用半径/周期/几何 | 电子方向反转；只有电场做功 |

### 4.3 三个高频模板

**模板 A：高斯定理求分段电场和电势。** 先列 $Q_{\rm in}(r)$，写 $E(r)A(r)=Q_{\rm in}(r)/\varepsilon_0$；再从选定零势点分段积分。球面 $A=4\pi r^2$，柱面侧面积 $A=2\pi rL$，平面用跨面的柱形盒。最后检查 $V$ 连续和 $E$ 的合理跃变。

**模板 B：电容器接电源/断电源。** 画出初末两状态，分别写 $C_i,Q_i,U_i,W_i$。保持电源连接用 $U=\text{常量}$；完全断开且无其他连接用极板净电荷 $Q=\text{常量}$。多电容连接还要按串并联约束与节点电荷守恒联立。

**模板 C：磁场中粒子偏转。** 先用 $q\mathbf v\times\mathbf B$ 定弯曲侧，作半径 $R=mv_\perp/(|q|B)$ 的圆；再由边界、弦长、圆心角求出射位置与时间，$t=(\Delta\varphi/2\pi)T$。若同时有电场，用电场做功确定速度变化，不能把整段轨迹直接当成等速圆弧。

## 5. 易错点速查

1. $\oint\mathbf E\cdot d\mathbf S=0$ 不等于闭合面上 $\mathbf E=0$；$\oint\mathbf B\cdot d\mathbf S=0$ 也不等于面上 $\mathbf B=0$。
2. 高斯面只决定**通量**与包围净电荷的关系；求局部场强仍需对称性。
3. 导体表面紧外侧 $E_n=\sigma/\varepsilon_0$；孤立非导体无限薄片单侧 $E=\sigma/(2\varepsilon_0)$。
4. 电势叠加直接带电荷正负号；电场叠加必须带方向。不要把两者算成同一种标量和。
5. 无限大平面、无限长线电荷不要默认 $V(\infty)=0$。
6. $\mathbf E=-\nabla V$ 中的负号、电场力做功 $W=q(V_a-V_b)$ 中的点序，经常同时出错。
7. 电容是几何和介质性质，不由当前 $Q$ 或 $U$ 单独决定；判断能量变化必须先知道边界条件。
8. 安培环路定理中的 $I_{\rm 穿过}$ 是有向代数和；磁场本身仍由所有电流叠加。
9. 洛伦兹磁力不做功；粒子在磁场边界发生圆弧运动时，出射点由圆几何决定。
10. 霍尔电压公式中的厚度是**沿磁场方向的尺寸**；正负号须结合载流子电性和坐标方向判断。

## 6. 建议复习顺序

1. 用 10 分钟默写四个核心积分定律：电场高斯定理、静电环路定理、磁场高斯定理、安培环路定理，并解释各自积分对象。
2. 练“球壳/实心球/无限长圆柱/无限大平面”四个电场模板，再练从 $E$ 到 $V$ 的分段积分。
3. 练导体空腔与介质分层，重点区分自由电荷、束缚电荷和导体感应电荷。
4. 练电容器插介质的两种边界条件：电源连接、断开电源；逐项比较 $C,Q,U,E,W$。
5. 练直导线、圆环、螺线管的磁场，再练载流导线受力和带电粒子圆弧轨道。

**最后自测**：面对一道题，能否在 30 秒内说清“场源是什么、对称性是什么、哪个量守恒、积分/环路方向怎么取”？能说清这些，通常就能选对公式。
