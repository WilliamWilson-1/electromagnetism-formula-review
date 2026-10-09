/* 所有公式均来自电磁学复习提纲；变量注释用于解释现有公式。 */
(() => {
  const t = String.raw;
  const chapters = [
    ['charges', '01', '电荷与电场', '§10-1', '静电场 A', '从点电荷到连续分布：先判断方向，再用对称性与叠加求场。'],
    ['gauss', '02', '高斯定理', '§10-2', '静电场 A', '通量由包围的净电荷决定；求局部场强还需要足够的对称性。'],
    ['potential', '03', '电势与保守性', '§10-3～10-4', '静电场 A', '电势按标量相加，电场是电势的负梯度。先选定参考零势点。'],
    ['conductors', '04', '导体静电平衡', '§10-5', '静电学 B', '用导体内部电场为零、等势与电荷守恒分析感应电荷。'],
    ['dielectrics', '05', '电介质与电位移', '§10-6', '静电学 B', '先由自由电荷求电位移，再在各层介质中求电场和电压。'],
    ['capacitors', '06', '电容与电场能量', '§10-7～10-8', '静电学 B', '改变电容前先判断边界条件：电压不变，还是极板净电荷不变。'],
    ['current', '07', '电流与电动势', '§10-9', '静电学 B', '把电荷的定向运动、电流密度和非静电力做功联系起来。'],
    ['biot', '08', '电流产生磁场', '§11-1～11-2', '静磁场 A', '按右手定则判断各电流元的方向，再拆成典型电流并叠加。'],
    ['ampere', '09', '磁场的基本定律', '§11-3～11-4', '静磁场 A', '对称性决定安培环路的选法，环路绕向决定穿面电流的正负。'],
    ['force', '10', '载流导线与线圈', '§11-4', '静磁场 A', '先求外加磁场，再求安培力与磁力矩；分清线圈平面与法线。'],
    ['particles', '11', '粒子运动与霍尔效应', '§11-5', '静磁场 A', '先判受力方向，再画圆心与轨道；磁场力不做功。']
  ].map(([id,number,title,section,source,description]) => ({id,number,title,section,source,description}));
  const types = ['全部类型', '基本定律', '定义关系', '典型模型', '受力运动'];
  const symbols = {
    'eps': [t`\varepsilon_0`, '真空电容率，约 8.85 × 10⁻¹² F/m'],
    'q': [t`q`, '带符号的电荷量，单位 C'],
    'q1': [t`q_1,q_2`, '两个点电荷的带符号电荷量，单位 C'],
    'q0': [t`q_0`, '足够小的正检验电荷，单位 C'],
    'Q': [t`Q`, '分布电荷的总电荷量或极板电荷量，单位 C'],
    'r': [t`r`, '源点到场点的距离，或距对称中心/轴的距离，单位 m'],
    'rhat': [t`\hat{\mathbf r}`, '从场源指向场点的单位矢量'],
    'E': [t`\mathbf E`, '电场强度，单位 N/C 或 V/m'],
    'F': [t`\mathbf F`, '力，单位 N'],
    'dq': [t`dq`, '微元电荷：线分布 λ dl，面分布 σ dS，体分布 ρ dV'],
    'lambda': [t`\lambda`, '线电荷密度，单位 C/m'],
    'sigma': [t`\sigma`, '面电荷密度，单位 C/m²'],
    'rho': [t`\rho`, '体电荷密度，单位 C/m³'],
    'R': [t`R`, '带电体或电流环半径，单位 m'],
    'x': [t`x`, '轴线上相对圆心的位置坐标，单位 m'],
    'p': [t`\mathbf p`, '电偶极矩，单位 C·m'],
    'ell': [t`\boldsymbol\ell`, '从负电荷指向正电荷的位移，单位 m'],
    'flux': [t`\Phi_E`, '电通量，单位 N·m²/C'],
    'dS': [t`d\mathbf S`, '有向面积元；闭合面的法向取向外'],
    'Qin': [t`Q_{\rm in}`, '闭合面内全部电荷的代数和，单位 C'],
    'V': [t`V`, '相对于选定零势点的电势，单位 V'],
    'Va': [t`V_a,V_b`, '起点 a、终点 b 的电势，单位 V'],
    'dl': [t`d\mathbf l`, '沿积分方向的有向线元，单位 m'],
    'work': [t`W`, '电场力做功或储存的电场能量，需结合上下文；单位 J'],
    'Uenergy': [t`U`, '电势能，单位 J；此处不是电压'],
    'En': [t`E_n`, '沿导体表面外法向的电场分量，单位 V/m'],
    'D': [t`\mathbf D`, '电位移矢量，单位 C/m²'],
    'P': [t`\mathbf P`, '极化强度，即单位体积内的电偶极矩，单位 C/m²'],
    'epsilon': [t`\varepsilon`, '介质电容率，ε = εᵣ ε₀，单位 F/m'],
    'er': [t`\varepsilon_r`, '相对电容率，无量纲'],
    'chi': [t`\chi_e`, '电极化率；线性介质中 εᵣ = 1 + χₑ'],
    'Qfree': [t`Q_{\rm free,in}`, '高斯面内自由电荷的代数和，不包括束缚电荷'],
    'sb': [t`\sigma_b`, '束缚（极化）面电荷密度，单位 C/m²'],
    'nhat': [t`\hat{\mathbf n}`, '介质表面向外的单位法向矢量'],
    'C': [t`C`, '电容，单位 F；由几何形状、相对位置和介质决定'],
    'voltage': [t`U`, '两极板的电势差（电压），单位 V'],
    'S': [t`S`, '极板面积或线圈面积，单位 m²'],
    'd': [t`d`, '平行板间距，单位 m'],
    'ab': [t`a,b`, '内外球面或圆柱的半径，满足 a < b，单位 m'],
    'L': [t`L`, '圆柱电容器长度或导线有效长度，单位 m'],
    'we': [t`w_e`, '电场能量密度，单位 J/m³'],
    'dVolume': [t`dV`, '体积元，单位 m³；这里的 V 不表示电势'],
    'I': [t`I`, '常规电流，正方向为正电荷运动方向，单位 A'],
    'time': [t`t`, '时间，单位 s'],
    'j': [t`\mathbf j`, '电流密度，单位 A/m²'],
    'n': [t`n`, '载流子数密度，单位 m⁻³'],
    'vd': [t`\mathbf v_d`, '载流子平均漂移速度，单位 m/s'],
    'conductivity': [t`\sigma_c`, '电导率，单位 S/m；与面电荷密度 σ 不同'],
    'resistivity': [t`\rho_{\rm res}`, '电阻率，单位 Ω·m；与体电荷密度 ρ 不同'],
    'emf': [t`\mathcal E`, '电源电动势，单位 V'],
    'Ek': [t`\mathbf E_{\rm 非静电}`, '单位正电荷受到的非静电力，单位 N/C'],
    'mu': [t`\mu_0`, '真空磁导率，按课程取 4π × 10⁻⁷ H/m'],
    'B': [t`\mathbf B`, '磁感应强度，单位 T'],
    'Idl': [t`I\,d\boldsymbol\ell`, '电流元，线元沿常规电流方向，单位 A·m'],
    'aDistance': [t`a`, '场点到直导线延长线的垂直距离，单位 m'],
    'alpha': [t`\alpha_1,\alpha_2`, '端点连线相对垂线的有向角，须使用同一角度约定'],
    'N': [t`N`, '线圈总匝数，无量纲'],
    'phi': [t`\varphi`, '圆弧对应的圆心角，单位 rad'],
    'turnDensity': [t`n`, '螺线管单位长度的匝数 n = N/L，单位 m⁻¹'],
    'omega': [t`\omega`, '带电体转动角速度，单位 rad/s'],
    'magneticMoment': [t`\mathbf m`, '线圈磁矩，沿电流的右手法线，单位 A·m²'],
    'vectorS': [t`\mathbf S`, '有向线圈面积，沿电流的右手法线，单位 m²'],
    'Ithrough': [t`I_{\rm 穿过}`, '穿过环路所围曲面的电流代数和，与绕向用右手定则配对'],
    'vectorL': [t`\mathbf L`, '匀强场中从导线起点到终点的位移矢量，单位 m'],
    'theta': [t`\theta`, '公式中两个相关矢量的夹角，需确认具体对象'],
    'twoI': [t`I_1,I_2`, '两根平行长直导线中的电流，单位 A'],
    'tau': [t`\boldsymbol\tau`, '线圈受到的磁力矩，单位 N·m'],
    'mass': [t`m`, '粒子质量，单位 kg；与磁矩的矢量 m 不同'],
    'v': [t`\mathbf v`, '粒子的瞬时速度，单位 m/s'],
    'orbitR': [t`R`, '粒子轨道的圆半径或螺旋半径，单位 m'],
    'T': [t`T`, '回旋周期，单位 s'],
    'wc': [t`\omega_c`, '回旋角频率，单位 rad/s'],
    'vperp': [t`v_\perp`, '垂直磁场的速度分量 v sin θ，单位 m/s'],
    'vparallel': [t`v_\parallel`, '平行磁场的速度分量 v cos θ，单位 m/s'],
    'h': [t`h`, '每绕一周沿磁场轴线前进的距离（螺距），单位 m'],
    'EH': [t`E_H`, '稳态横向霍尔电场的大小，单位 V/m'],
    'UH': [t`U_H`, '横向霍尔电压，单位 V'],
    'thickness': [t`t`, '样品沿磁场方向的厚度，单位 m；这里不是时间'],
    'RH': [t`R_H`, '单一载流子模型下的带符号霍尔系数，单位 m³/C']
  };
  const formulas = [];
  function f(chapter,id,title,latex,type,vars,condition,hint,keywords='') {
    formulas.push({chapter,id,title,latex,type,variables:vars.map(key => symbols[key]),condition,hint,keywords});
  }
  f('charges','coulomb','库仑定律',t`\mathbf F_{1\to2}=\frac{q_1q_2}{4\pi\varepsilon_0r^2}\hat{\mathbf r}_{12}`,'基本定律',['F','q1','eps','r','rhat'],'真空中的静止点电荷；单位矢量从电荷 1 指向电荷 2。','先保留电荷正负号，再判定力的方向。同号相斥，异号相吸。','Coulomb 电力 点电荷');
  f('charges','field-definition','电场强度的定义',t`\mathbf E=\frac{\mathbf F}{q_0}`,'定义关系',['E','F','q0'],'检验电荷足够小，不改变原有电荷分布。','电场方向按正检验电荷定义；负电荷的受力方向与电场相反。');
  f('charges','point-field','点电荷的电场',t`\mathbf E=\frac{q}{4\pi\varepsilon_0r^2}\hat{\mathbf r}`,'典型模型',['E','q','eps','r','rhat'],'真空中的静止点电荷，场点不在点电荷位置。','先画出每个电荷产生的场方向，再按分量做矢量叠加。');
  f('charges','continuous-field','连续电荷分布的电场',t`\mathbf E(\mathbf r)=\frac1{4\pi\varepsilon_0}\int\frac{\mathbf r-\mathbf r'}{\lvert\mathbf r-\mathbf r'\rvert^3}\,dq`,'基本定律',['E','eps','dq'],'真空中静止的连续电荷分布；r 为场点位置，r′ 为源点位置。','选 dq = λ dl、σ dS 或 ρ dV；先用对称性消去抵消的分量，再积分。','积分 叠加 分量');
  f('charges','dipole-moment','电偶极矩',t`\mathbf p=q\boldsymbol\ell`,'定义关系',['p','q','ell'],'两等量异号电荷构成的电偶极子；q 取正电荷的电荷量。','从负电荷指向正电荷画出偶极矩。远场电场按 1/r³ 衰减。');
  window.REVIEW_DATA = {chapters,types,formulas};
  window.addReviewFormula = f;
})();
