/* Context-specific quantities. Identical letters in different models have separate entries. */
(() => {
  'use strict';
  const t=String.raw,g={};
  const def=(key,symbol,name,unit,meaning,convention,reading)=>{g[key]={symbol,name,unit,meaning,convention,reading};};
  def('eps0',t`\varepsilon_0`,'真空电容率','F/m','真空中联系电荷分布与电场强弱的常量，约 8.85×10⁻¹² F/m。','不是介质的相对电容率。','有介质时先判断公式需要 ε0 还是 ε=εrε0。');
  def('eps',t`\varepsilon`,'介质电容率','F/m','当前区域线性、各向同性介质的电学参数。','ε=εrε0；分层介质各层可不同。','不要把数值 εr 直接代到 ε 的位置。');
  def('epsr',t`\varepsilon_r`,'相对电容率','无量纲','介质电容率与真空电容率之比。','在线性极化模型中 εr=1+χe。','相对量没有 F/m 单位。');
  def('chie',t`\chi_e`,'电极化率','无量纲','线性模型中衡量介质极化强度对局部电场响应的系数。','P=ε0χeE；矢量同向关系还要求各向同性。','不要与磁化率 χm 混用。');
  def('mu0',t`\mu_0`,'真空磁导率','H/m','真空中电流与磁场关系的常量，课程计算按 4π×10⁻⁷ H/m。','不是磁介质的磁导率 μ。','课程数值约定用于计算，不用 μr 替代 μ0。');
  def('mu',t`\mu`,'介质磁导率','H/m','当前区域线性磁介质中 B 与 H 的比例系数。','μ=μ0μr；铁磁质一般不能全程当常数。','同轴结构的介质夹层和非磁性导体内部分别用相应参数。');
  def('mur',t`\mu_r`,'相对磁导率','无量纲','磁导率与真空磁导率之比。','线性模型 μr=1+χm；抗磁略小于1，顺磁略大于1。','铁磁质工作点 B/(μ0H) 不能自动视为全程常数。');
  def('chim',t`\chi_m`,'磁化率','无量纲','线性各向同性模型中 M=χmH 的响应系数。','抗磁 χm<0，顺磁 χm>0。','铁磁磁滞过程应读取曲线和历史。');
  def('q',t`q`,'运动或受力电荷的电荷量','C','所考察粒子携带的电荷，电子取负值，正离子取正值。','在矢量力和功中保留正负号；大小式出现 |q| 才取绝对值。','先用 q 判断受力或转动方向，再用 |q| 求半径等大小。');
  def('qsource',t`q`,'源点电荷的电荷量','C','产生本卡电场或电势的那个点电荷的带符号电荷量。','正电荷电场向外、负电荷向内；同一零势点下电势贡献也带符号。','不是被放入场中用来受力的检验电荷。');
  def('q1',t`q_1`,'源电荷1','C','库仑力中施力的点电荷1的电荷量。','保留电荷正负。','与 q2 的乘积决定力沿 r12 还是反向。');
  def('q2',t`q_2`,'受力电荷2','C','库仑力中受到电荷1作用的点电荷2的电荷量。','公式的 F1→2 是作用在电荷2上的力。','与源电荷的位置、下标不要对调。');
  def('q0',t`q_0`,'正检验电荷','C','用来定义该点电场的小正电荷，其存在不应显著改变原场源分布。','定义方向按正检验电荷受力方向。','若实验给的是负电荷，E=F/q 仍应保留 q 的符号。');
  def('Q',t`Q`,'分布总电荷量','C','当前带电环、盘、球壳或带电体的全部电荷代数和。','其正负决定电场和电势的符号。','均匀分布才能直接以总量除面积或体积求密度。');
  def('Qplate',t`Q`,'极板电荷量大小','C','电容定义中一块极板带电量的非负大小，两板为 +Q 和 −Q。','U 按高电势板减低电势板取正时 C=Q/U>0。','孤立且无漏电时固定的是极板净电荷，而非必然固定电压。');
  def('Qin',t`Q_{\rm in}`,'闭合面内净电荷','C','高斯面包围的所有相关电荷的代数和。','真空 E 高斯关系中计总电荷；面外电荷不进入右侧。','左侧电场仍由面内外所有电荷共同产生。');
  def('Qf',t`Q_{\rm free,in}`,'包围的自由电荷','C','D 高斯关系中闭合面内的自由电荷代数和。','不包含已经用极化描述的束缚电荷。','与 E 高斯关系右侧的总电荷分开。');
  def('qin',t`q`,'空腔内净电荷','C','位于导体空腔中的自由电荷代数和，不是导体自身所带的总电荷。','正负保留，内壁总感应电荷为 −q。','只决定壁面总量，通常不决定壁面各点分布。');
  def('Qcon',t`Q`,'导体自身净电荷','C','导体材料及其内外表面合计的净电荷，不包含独立的腔内电荷。','Q内壁+Q外壁=Q。','外壁为 Q+q，而不是始终等于 Q。');
  def('Qinner',t`Q_{\rm 内壁}`,'空腔内壁总电荷','C','包围腔内电荷的那一侧导体表面上的电荷代数和。','导体静电平衡时等于 −q。','不是内壁面电荷密度。');
  def('Qouter',t`Q_{\rm 外壁}`,'导体外壁总电荷','C','导体外表面所带的电荷代数和。','由导体电荷守恒得 Q+q。','外部物体仍可改变局部分布。');
  def('qi',t`q_i`,'第 i 个源电荷','C','离散电荷系中第 i 个点电荷的带符号电荷量。','i 是求和编号。','每一项使用自己的 ri，不能统一用同一个距离。');
  def('dq',t`dq`,'微元电荷','C','从带电体中取出的很小一部分电荷。','线、面、体分布分别为 λdl、σdS、ρdV。','积分变量属于源点，别把它与场点坐标混为一谈。');
  def('lambda',t`\lambda`,'线电荷密度','C/m','单位导线或细棒长度上分布的电荷量。','带符号；大小公式使用 |λ|。','均匀分布时 λ=Q/总长度。');
  def('sigma',t`\sigma`,'面电荷密度','C/m²','单位表面积上的净电荷。','带符号；导体表面由外法向约定正负场分量。','不是电导率 σc，也不保证任意导体表面均匀。');
  def('rho',t`\rho`,'体电荷密度','C/m³','单位体积中的净电荷代数和。','在高斯微分关系中为考察点的局部密度。','不是电阻率 ρres；均匀实心体可用总电荷除体积。');
  def('rs',t`r`,'源点到场点的距离','m','从产生场的源点量到考察点 P 的直线距离，r>0。','r 是距离大小；方向另由单位矢量给出。','不是任意坐标原点到 P 的距离。');
  def('ra',t`r`,'到对称轴的径向距离','m','从长直线、长圆柱或同轴线的轴线垂直量到场点 P 的距离。','从轴线起量，不是到导体表面的最短距离。','先与实体半径比较，决定使用内区或外区表达式。');
  def('rc',t`r`,'到球心的径向距离','m','从球形模型中心 O 量到场点 P 的距离。','r 是场点位置；R 是实体的固定半径。','r<R 与 r>R 对应不同的包围电荷或积分区域。');
  def('rhat',t`\hat{\mathbf r}`,'源到场点的单位方向矢量','无量纲','长度为1，只表示从源点指向场点的方向。','含两电荷下标时 r12 从电荷1指向电荷2。','电荷符号或叉乘结果可使实际场、力与它反向。');
  def('rvec',t`\mathbf r`,'场点位置矢量','m','从选定原点指向要计算电场的固定观察点。','对源积分时 r 保持不变。','不是积分变量。');
  def('rprime',t`\mathbf r'`,'源点位置矢量','m','从同一原点指向当前微元电荷 dq 的位置。','积分过程中随源点移动。','r−r′ 才是从 dq 指向场点的位移。');
  def('ri',t`r_i`,'第 i 个源到场点距离','m','第 i 个点电荷 qi 与同一场点之间的距离。','每项可不同，且为正数。','电势贡献的正负来自 qi，而非令距离为负。');
  def('Rbody',t`R`,'实体或圆环固定半径','m','从圆心或球心到模型边界的固定几何尺寸。','与变化的场点距离 r 区分。','圆环轴线题中 R 在环平面内，x 在轴线上。');
  def('xaxis',t`x`,'轴线上场点坐标','m','从圆环或圆盘中心 O 沿轴线量到场点 P 的有向距离。','正轴按模型预先规定；圆盘本卡限定 x>0。','Ex、Bx 的下标 x 表示轴向分量。');
  def('E',t`\mathbf E`,'电场强度矢量','N/C = V/m','该时刻该点单位正电荷受到的电场力。','方向按正电荷受力定义，负电荷受力相反。','不等于电动势 ℰ；无箭头 E 在大小式中表示大小。');
  def('Ex',t`E_x`,'电场的 x 分量','V/m','沿模型 x 轴的有向电场分量。','正值沿 +x，负值沿 −x。','对称性可能使其他分量抵消，不能先把所有大小相加。');
  def('Esize',t`E`,'电场强度大小','V/m','电场矢量的非负模长；仅在该式为大小关系时如此。','方向由场源正负和几何另判。','大小中的绝对值不能用于替代带符号矢量叠加。');
  def('F',t`\mathbf F`,'合力或本式所指的力','N','作用在所考察电荷、导线等对象上的力矢量。','F1→2 专指电荷1施加给电荷2的力。','先确认对象；合力、分力和力矩不能混用。');
  def('Fsize',t`F`,'力的大小','N','本式指定的安培力或磁力的非负大小。','大小式中 sinθ 对应两矢量夹角。','方向另外按叉乘和电荷正负判断。');
  def('FB',t`\mathbf F_B`,'磁场对电荷的力','N','粒子总洛伦兹力中的磁场部分。','与瞬时速度 v 垂直；负电荷把 v×B 的方向反转。','不包括电场力 qE。');
  def('p',t`\mathbf p`,'电偶极矩','C·m','等量异号电荷的电荷量大小乘从负电荷到正电荷的位移。','从 −q 指向 +q。','远场近似还需观察距离远大于偶极子间距。');
  def('dipq',t`q`,'偶极子正电荷量大小','C','电偶极子两电荷为 +q 与 −q，这里的 q 取正值。','负号已经由电荷对和位移方向表达。','不要再给 q 代入电子的负号。');
  def('dipell',t`\boldsymbol\ell`,'偶极子分离位移','m','从负电荷位置指向正电荷位置的位移矢量。','模长为两电荷间距。','不是观察点到偶极子中心的距离。');
  def('PhiE',t`\Phi_E`,'电场通量','N·m²/C','电场穿过指定曲面的带符号总量。','E 与面元正法向同向贡献为正，反向为负。','它是一个曲面的积分结果，不是某点场强。');
  def('surface',t`S`,'积分曲面','曲面本身无单位；面积为 m²','场通量积分所覆盖的曲面。','闭合面用向外法向；开曲面法向与边界绕向右手配对。','这里 S 是积分区域；不是坡印廷矢量。');
  def('dS',t`d\mathbf S`,'有向面积元','m²','很小一块面积 dS 乘其单位正法向。','闭合面向外；开面由所选回路绕向确定。','点积自动取场的法向分量，不是直接把大小相乘。');
  def('thetaFlux',t`\theta`,'场与正法向的夹角','rad','图中电场或磁场矢量与所选面积正法线之间的夹角。','同向 θ=0，垂直 θ=π/2，反向 θ=π。','不是场与平面的夹角；匀强场通量才可直接用场大小乘 S cosθ。');
  def('normal',t`\hat{\mathbf n}`,'表面外法向单位矢量','无量纲','在介质表面由介质内部指向外部的单位方向。','空腔侧面的“介质向外”可能指向空腔。','先画清介质在哪一侧，再给束缚电荷或电流取符号。');
  def('En',t`E_n`,'沿导体外法向的场分量','V/m','紧贴导体表面外侧的电场在外法向上的投影。','可带符号；正面电荷对应向外分量为正。','不是任意离表面很远位置的场强。');
  def('V',t`V`,'电势','V（伏特）','相对已选参考零点，单位正电荷的电势能。','是带符号标量，其零点由参考约定决定。','不是体积 V，也不是某个电荷自己的势能。');
  def('Va',t`V_a`,'起点 a 的电势','V','同一参考零点下 a 点的电势。','与 Vb 的差为 Va−Vb。','初末点顺序决定电场力做功的符号。');
  def('Vb',t`V_b`,'终点 b 的电势','V','与 Va 使用相同零点的 b 点电势。','静电场沿 a→b 线积分得到 Va−Vb。','换积分方向时电势差也要换号。');
  def('dl',t`d\mathbf l`,'有向路径线元','m','沿当前积分路径及规定积分方向的一小段位移。','不是总长度；方向反转积分换号。','环流只取场沿路径切线的分量。');
  def('path',t`C\ \text{或}\ L`,'闭合积分回路','路径本身无单位；长度为 m','进行环流积分时选定的闭合曲线，并非一定存在实际导线。','绕向与所围曲面正法向按右手规则配对。','安培式下标 L 是路径名，不是自感系数。');
  def('work',t`W_{a\to b}`,'电场力做功','J','电荷由 a 到 b 时电场力对它做的功。','正功对应电势能减少。','写 q(Va−Vb)，不是默认写末势减初势。');
  def('Uenergy',t`U`,'电势能','J','某个带电粒子在给定静电场中的势能。','U=qV，零点随电势参考而定。','与电容器公式中单位为 V 的电压 U 不同。');
  def('DU',t`\Delta U`,'电势能改变量','J','终态电势能减初态电势能。','ΔU=U末−U初；电场力功为 −ΔU。','Δ 表示两个状态之差，不是微元。');
  def('xyz',t`x,y,z`,'直角坐标','m','同一坐标系中场点的三个位置分量。','求偏导时固定另外两个坐标。','坐标不是位移大小；可正可负。');
  def('Ecomponents',t`E_x,E_y,E_z`,'电场直角分量','V/m','电场沿各坐标正轴的投影。','每个分量分别等于相应电势偏导的负值。','负梯度指向电势下降最快方向。');
  def('D',t`\mathbf D`,'电位移矢量','C/m²','把介质极化贡献并入定义后，便于以自由电荷求场的宏观量。','D=ε0E+P；仅在线性各向同性模型中简写为 εE。','D 的通量计自由电荷，不代表 E 只由自由电荷产生。');
  def('P',t`\mathbf P`,'极化强度','C/m²','单位体积内电偶极矩的矢量和，描述电介质极化。','方向由局部偶极矩取向决定。','不是功率 P；与表面外法向点积得到束缚面电荷密度。');
  def('sb',t`\sigma_b`,'束缚面电荷密度','C/m²','介质极化后在指定表面出现的束缚电荷。','σb=P·n，可正可负。','下标 b 表示束缚，不要在 D 的自由电荷右侧重复计入。');
  def('C',t`C`,'电容','F','在指定几何和介质状态下，极板电荷量大小与电压之比。','常规电容 C>0，由几何、相对位置及介质决定。','当前 Q、U 同比变化并不意味着电容改变。');
  def('Ci',t`C_i`,'第 i 个电容器的电容','F','网络中第 i 个独立电容元件的参数。','下标 i 是元件编号。','先确认连接拓扑，再使用串并联关系。');
  def('Cseries',t`C_{\rm 串}`,'串联等效电容','F','从串联网络两端看进去的等效电容。','标准串联中的中间孤立节点初始净电荷为零时，各电容电荷量大小相同。','倒数相加，结果小于每个正电容。');
  def('Cparallel',t`C_{\rm 并}`,'并联等效电容','F','各电容都接在相同两个节点之间时的总电容。','各支路电压相同。','电容直接相加，电荷按各支路分别分配。');
  def('Uvoltage',t`U`,'两极板电压','V','本卡按高电势极板减低电势极板得到的电势差。','Q 取极板电荷量大小时 U 也取相应正值。','不是单位 J 的势能 U；接理想电源时通常 U 固定。');
  def('Sarea',t`S`,'极板或线圈有效面积','m²','平面极板的相对面积，或线圈所围且计入公式的平面面积。','磁通还要乘 B 与正法线夹角的余弦。','不是导线横截面积，也不是能流密度矢量。');
  def('dplate',t`d`,'板间距离','m','从一块平行板沿法向量到另一块板的间隔。','边缘效应可忽略时用平行板模型。','不是沿板面的边长。');
  def('a',t`a`,'内表面半径','m','从共同球心或圆柱轴到内极板外表面的距离。','a<b。','电容题中的板间厚度为 b−a，不是 b。');
  def('b',t`b`,'外表面内半径','m','从相同球心或轴线到外极板内表面的距离。','a<b。','与 a 采用相同单位，ln(b/a) 内为无量纲比值。');
  def('Llen',t`L`,'轴向或有效导线长度','m','当前长圆柱电容器的轴向长度，或本卡导线参与受力的长度。','是几何长度，不是单位 H 的自感。','只计模型中参与场或受力的有效部分。');
  def('Wel',t`W`,'储存的电场能量','J','电容器或指定空间中储存的电场能。','线性电容器能量形式中的 Q、U、C 必须属于同一状态。','不是某个粒子移动时的电场力功。');
  def('we',t`w_e`,'电场能量密度','J/m³','单位体积内储存的电场能量。','线性介质中为 E·D/2。','能量密度乘体积再积分才是总能量。');
  def('volume',t`V`,'积分或实体体积','m³','储能积分所覆盖的空间，或螺线管内部体积。','此处 V 不表示电势。','螺线管体积 V=Sℓ；不要把面面积当体积。');
  def('dV',t`dV`,'体积微元','m³','用于累加局部能量或电荷的小体积。','柱对称每长度可用 2πrdr，球对称用 4πr²dr。','按当前积分区域和对称性选取，不能混用几何因子。');
  def('I',t`I`,'常规电流','A','单位时间穿过所选截面的净正电荷量。','沿正电荷定向运动定义方向，电子漂移通常相反。','有向量要与截面法向或环路绕向保持配对。');
  def('qpass',t`q`,'通过截面的净电荷','C','在所选电流正方向上累计穿过截面的电量。','dq/dt 给有向电流。','不是载流子数密度模型中的单个电荷。');
  def('time',t`t`,'时间','s','从题目约定的 t=0 起计的时间。','对时间求导时，注意哪些几何或材料参数也变化。','霍尔式中的同字母 t 表示厚度，不是时间。');
  def('j',t`\mathbf j`,'传导电流密度','A/m²','单位截面积的电流通量矢量，描述局部电流流动。','积分 j·dS 才得到电流。','仅当均匀且垂直截面时才简化为 I=jS。');
  def('ncarrier',t`n`,'载流子数密度','m⁻³','单位体积内可参与传导的载流子数目。','n≥0，载流子电性由 q 给出。','不是螺线管单位长度匝数，后者单位 m⁻¹。');
  def('qcarrier',t`q`,'单个载流子电荷','C','每个电子、空穴或其他载流子的带符号电荷。','电子 q<0；单一载流子模型使用同一种 q。','与 n、漂移速度一起决定 j 的方向。');
  def('vd',t`\mathbf v_d`,'平均漂移速度','m/s','载流子在外加作用下的平均定向速度。','电子的 vd 与常规电流方向相反；不是无规则热运动速率。','霍尔大小式中的 vd 取漂移速率。');
  def('sigmac',t`\sigma_c`,'电导率','S/m','欧姆导体中局部 j 与 E 的比例系数。','在本模型下与电阻率互为倒数。','下标 c 用于和面电荷密度 σ 区分。');
  def('rhores',t`\rho_{\rm res}`,'电阻率','Ω·m','描述材料阻碍传导电流的参数，等于 1/σc。','与温度、材料状态等有关。','不是体电荷密度 ρ，也不是整根导线的电阻 R。');
  def('emf',t`\mathcal E`,'有向电动势','V','非静电作用沿指定路径对单位正电荷的做功。','正值表示沿所选积分方向推动正电荷。','不是“力”，也不自动等于任意两点电势差。');
  def('Ek',t`\mathbf E_{\rm 非静电}`,'等效非静电场','N/C = V/m','把单位正电荷受到的非静电力写成一个等效场量。','方向由具体电源或运动机制决定。','和由静止电荷产生的静电场分开。');
  def('B',t`\mathbf B`,'磁感应强度','T','场点处决定磁力和磁通的磁场矢量。','方向用右手定则或已给定的坐标约定。','没有箭头的 B 在模型大小式中表示模长；不是 H。');
  def('Bx',t`B_x`,'磁场轴向分量','T','圆电流在 x 轴上产生的有向磁场分量。','正方向按线圈电流的右手法线定义。','轴线上横向分量因对称性相消。');
  def('dB',t`d\mathbf B`,'电流元的磁场贡献','T','一个微小电流元在固定场点产生的矢量磁场。','方向为 I dl 与源到场点方向的叉乘方向。','需先矢量积分，不能把各段大小直接相加。');
  def('Idl',t`I\,d\boldsymbol\ell`,'电流元','A·m','电流大小乘沿常规电流方向的一小段导线位移。','dℓ 取沿电流正方向。','它不是导线整体的端点位移。');
  def('avec',t`a`,'到直导线延长线的垂距','m','从场点 P 向直导线所在直线作垂线的长度。','即使垂足在实际线段之外仍按延长线量。','不是场点到某个端点的斜距离。');
  def('alpha1',t`\alpha_1`,'起端点的有向角','rad','由垂足建立的导线坐标中，起端点连线相对垂线的角。','沿电流方向建立轴，端点1到端点2；角度使用同一正负约定。','公式是 sinα2−sinα1；图示端点分居垂足两侧时 α1<0<α2。');
  def('alpha2',t`\alpha_2`,'末端点的有向角','rad','同一角度约定下，末端点连线相对垂线的角。','不把两个有向角都擅自改成正角。','若更换角的定义，公式形式也需同步推导。');
  def('N',t`N`,'线圈总匝数','无量纲','完整线圈围绕磁通区域绕行的总圈数。','磁通链的 N 不是单位长度匝数。','每匝通量不同应逐匝相加，不能直接乘同一 Φ。');
  def('nturn',t`n`,'单位长度匝数','m⁻¹','沿螺线管轴向，每米长度内绕有的匝数。','n=N/轴向长度。','不是载流子数密度 n；比较变长或加匝时明确哪个量固定。');
  def('phi',t`\varphi`,'圆弧圆心角','rad','在圆心看到该段载流圆弧所张的角。','整圆为 2π；半圆为 π。','必须用弧度，且本模型场点在圆心。');
  def('omega',t`\omega`,'角速度或角频率','rad/s','转动题中表示转角变化率，波动题中表示相位随时间的变化率。','符号方向由转轴正向规定；大小式取 |ω|。','不是单位 J/m³ 的能量密度 w。');
  def('dI',t`dI`,'微小圆环的等效电流','A','转动带电体中微元电荷 dq 每周期经过一次形成的电流。','方向取正电荷绕转方向；负电荷与机械转向相反。','dq 的取法由带电体的面或体分布决定。');
  def('mvec',t`\mathbf m`,'线圈磁矩','A·m²','N 匝线圈电流乘其有向面积，表征线圈磁作用的方向和大小。','沿常规电流的右手法线。','不是质量 m；线圈平面与磁矩相互垂直。');
  def('Svec',t`\mathbf S`,'有向线圈面积','m²','线圈平面面积乘右手单位法线。','法线由线圈电流绕向确定。','不是同字母的坡印廷矢量，单位也不同。');
  def('Ienc',t`I_{\rm 穿过}`,'穿面电流代数和','A','穿过所选安培环路任一配对曲面的电流总和。','与正法向同向为正，反向为负。','环路外电流不计入右侧，但仍可影响局部 B。');
  def('dF',t`d\mathbf F`,'电流元受到的安培力','N','外磁场作用于微小载流导线段的力。','方向由 I dℓ×B 给出。','用外加磁场，不把该微元的自身场直接代入。');
  def('Lvec',t`\mathbf L`,'导线端点位移','m','从选定导线起点指向终点的矢量，与有向电流路径配对。','匀强外场中曲线导线可用端点位移简化。','不是弯曲导线的总弧长。');
  def('thetaLB',t`\theta`,'导线与磁场夹角','rad','直导线沿电流的方向与 B 的夹角。','θ 在 0 到 π 之间；F 大小含 sinθ。','平行为零，垂直最大；与线圈法线夹角不是同一概念。');
  def('I1',t`I_1`,'回路或导线1的电流','A','编号1对象中的常规电流，方向见模型。','平行导线同向相吸、反向相斥。','互感题中下标1常表示源回路。');
  def('I2',t`I_2`,'回路或导线2的电流','A','编号2对象中的常规电流。','与 I1 的参考方向共同决定相助相消。','有向电流与互感符号只作一次一致约定。');
  def('taum',t`\boldsymbol\tau`,'磁力矩','N·m','磁场使线圈磁矩转向 B 的力矩。','方向为 m×B。','合力为零不表示力矩为零。');
  def('Umag',t`U`,'磁矩在外场中的势能','J','把给定磁矩线圈放在外磁场中，其取向对应的势能。','按 −m·B，平行时最低，垂直时取零。','不是线圈自身磁场储能 LI²/2。');
  def('mass',t`m`,'粒子或导体质量','kg','本模型中受到力学作用的对象质量。','粒子回旋公式采用非相对论质量模型。','不是带箭头的磁矩 m。');
  def('vparticle',t`\mathbf v`,'粒子瞬时速度','m/s','粒子在当前时刻的位置变化率，含方向。','v×B 的方向先按正电荷取，再乘 q 的正负。','轨道半径若为斜入射，只用垂直分量。');
  def('vsize',t`v`,'粒子速率','m/s','粒子瞬时速度的非负大小。','本卡纯圆周模型要求速度垂直 B。','磁力只改方向，不改变仅受磁力粒子的速率。');
  def('thetaVB',t`\theta`,'速度与磁场夹角','rad','粒子速度 v 与 B 的夹角。','v⊥=v sinθ，v∥=v cosθ。','不要取速度与磁场垂直平面的夹角。');
  def('Rorbit',t`R`,'回旋半径','m','垂直于 B 的投影平面中，轨道到圆心的半径。','斜入射用 v⊥；垂直入射用总速率。','不是磁场区域的边界半径。');
  def('wc',t`\omega_c`,'回旋角频率','rad/s','粒子绕磁场方向每秒转过的角度大小。','ωc=|q|B/m 为大小，转向由 q 判断。','非相对论匀强场模型中与速率无关。');
  def('T',t`T`,'回旋周期','s','垂直投影圆周运动完整绕一圈所需时间。','T=2π/ωc。','不是特斯拉的单位符号 T；不足一圈需乘圆心角比例。');
  def('vperp',t`v_\perp`,'垂直磁场的速度大小','m/s','速度在垂直于 B 的平面上的分量模长。','决定回旋半径，不决定沿轴前进速度。','不能在斜入射时直接替换成总速率 v。');
  def('vparallel',t`v_\parallel`,'平行磁场的速度分量','m/s','速度沿所选磁场轴向的分量。','带符号时表示沿轴正向或反向；螺距大小取绝对值。','仅受磁力时保持不变。');
  def('hpitch',t`h`,'有向螺距','m','粒子绕一周期间沿磁场轴前进的位移。','本式 h=v∥T，若只求螺距大小取 |h|。','不是螺旋轨迹一圈的实际弧长。');
  def('Vinitial',t`V_{\rm 初}`,'初位置电势','V','粒子初态位置相对共同参考点的电势。','与末态使用同一零势点。','静态电场力功为 q(V初−V末)。');
  def('Vfinal',t`V_{\rm 末}`,'末位置电势','V','粒子末态位置在同一静电场中的电势。','此处电势指静态场，不能替代一般感生电场路径积分。','动能变化由电场做功提供，磁力不进做功项。');
  def('EH',t`E_H`,'霍尔电场大小','V/m','横向电荷积累建立的、平衡载流子磁力的电场大小。','方向由积累电荷确定，不由大小式单独决定。','稳态且漂移速度垂直 B 才用 EH=vdB。');
  def('UH',t`U_H`,'有向霍尔电压','V','样品横向两测量端的电势差，端点顺序需先规定。','本卡使用 |UH| 求大小；极性需结合坐标和载流子电性。','不要由绝对值式直接判断电子或空穴。');
  def('thickness',t`t`,'沿磁场方向的样品厚度','m','霍尔样品在 B 方向上的几何尺寸。','与电流方向和测量电压方向区分。','这里 t 不是时间，也不一定是图上竖直画出的边长。');
  def('RH',t`R_H`,'霍尔系数','m³/C','单一载流子模型下联系电流、磁场和横向电压的带符号系数。','RH=1/(nq)，符号与所用测量方向约定配套。','多载流子材料不直接用此简单式反推浓度。');
  def('Mmag',t`\mathbf M`,'磁化强度','A/m','单位体积中分子磁矩的矢量和。','与 H 的关系由材料决定；抗磁时方向可相反。','不是单位 H 的标量互感 M。');
  def('mmol',t`\mathbf m_{\rm mol}`,'单个分子磁矩','A·m²','课件把分子内部磁作用用等效小电流环的磁矩表示。','求和要保留各分子取向。','大量非零磁矩无序取向时，总磁化可为零。');
  def('DV',t`\Delta V`,'宏观小体积','m³','相对物体很小、但仍含足够多分子的取样体积。','对该体积内的分子磁矩求和。','不是电势差 ΔV。');
  def('Kb',t`\mathbf K_b`,'表面束缚电流密度','A/m','磁化后单位横向长度所对应的表面电流。','Kb=M×n；课件用 J 表示该量。','与体电流密度 A/m² 不同，不能直接乘面积求面电流。');
  def('Ib',t`I_{b,\rm enc}`,'包围的束缚电流','A','穿过环路所围曲面的磁化电流代数和。','绕向与正法向右手配对。','不是自由传导电流。');
  def('H',t`\mathbf H`,'磁场强度矢量','A/m','通过 H=B/μ0−M 定义的宏观磁场量，便于处理自由电流。','稳恒时 H 环流计自由电流；时变时补位移电流。','不是 B 的另一种单位写法。');
  def('If',t`I_{f,\rm enc}`,'穿面自由电流','A','按选定曲面法向计的自由电荷运动电流代数和。','同向为正，反向为负。','不重复加入已由 M 表示的束缚电流；时变时另有位移项。');
  def('Hsol',t`H_{\rm sol}`,'长螺线管内部场强','A/m','长密绕螺线管远离端部处的轴向 H 大小。','正向沿电流的右手轴向。','乘内部介质 μ 才得到 B。');
  def('Htor',t`H_{\rm tor}`,'螺线环内部场强','A/m','半径 r 的环形磁路上 H 的切向大小。','r 从整个螺线环的中心轴量起。','不是环截面自身的小半径。');
  def('rTor',t`r`,'环形磁路的圆周半径','m','从螺线环的中心轴量到环内场点 P 的距离。','圆周路径长为 2πr。','厚环各 r 不同，B 不一定在整个截面恒定。');
  def('cRadius',t`c`,'外导体外半径','m','同轴电缆中，从轴线到外导体最外表面的距离。','a<b<c；外导体占 b<r<c。','这里 c 不是光速。');
  def('Hphi',t`H_\varphi`,'磁场强度的环向分量','A/m','同轴圆周切线方向的有向 H。','正电流沿 +z 时，+φ 由右手规则确定。','分区按实际包围的去流与回流计算。');
  def('Br',t`B_r`,'剩磁','T','经历磁化后，在指定磁滞分支 H=0 处的 B。','下标 r 表示 remanence，不是径向分量。','同一当前 H 下的 B 还与磁化历史有关。');
  def('Hc',t`H_c`,'矫顽力大小','A/m','沿相应退磁分支施加反向 H 使 B 回到零所需的场强大小。','图上对应横坐标通常为 −Hc；Hc 本身取正。','不是机械力，单位不是 N。');
  def('Phim',t`\Phi_m`,'单匝磁通量','Wb','B 通过该匝所围曲面的有向面积分。','法向与该匝的正绕向右手配对。','有效面积只计磁场实际覆盖的部分。');
  def('Psi',t`\Psi`,'磁通链','Wb（常说 Wb·匝）','把各匝的磁通按统一绕向相加的总量。','每匝通量相同才等于 NΦm。','法拉第电动势对 Ψ 求导；不能把 N 再乘一次。');
  def('Phik',t`\Phi_k`,'第 k 匝磁通','Wb','第 k 个完整线圈匝所链入的有向磁通。','k 为匝的编号，不是波数。','不等匝通量时用求和，不能用单一面积代表。');
  def('PsiExt',t`\Psi_{\rm ext}`,'外场磁通链','Wb','由外部磁源产生、穿过本回路的磁通链。','与回路自身电流产生的自感磁通链分开。','若自感不可忽略，外磁通导数除 R 不等于实际电流。');
  def('Rres',t`R`,'回路总电阻','Ω','实际闭合回路中所有相关导线和元件的总电阻。','电量端点式要求 R 在过程中恒定。','不是几何半径，也不是只取某一段导线的电阻。');
  def('qind',t`q_{\rm ind}`,'有向感应净电量','C','在 t1 到 t2 之间沿规定方向穿过某截面的净电荷量。','相反方向通过的电量会抵消。','若问累计电量大小且电流反向，要分段积分 |I|。');
  def('t1',t`t_1`,'积分开始时刻','s','计算感应电量的初时刻。','Ψ1 是这个时刻的磁通链。','不是第1个周期。');
  def('t2',t`t_2`,'积分结束时刻','s','感应电量积分的末时刻，通常 t2>t1。','Ψ2 是这个时刻的磁通链。','电量公式的顺序为 Ψ1−Ψ2。');
  def('Psi1',t`\Psi_1`,'初态磁通链','Wb','在 t1 时穿过线圈的磁通链。','与 Ψ2 采用同一正法向。','不可分别按大小取值后丢掉方向。');
  def('Psi2',t`\Psi_2`,'末态磁通链','Wb','在 t2 时穿过线圈的磁通链。','移到足够远的零磁场区域才可按零处理。','若反转线圈，末通量可能变号而非仅变小。');
  def('theta0',t`\theta_0`,'线圈初始法线夹角','rad','t=0 时 B 与线圈所选正法线的夹角。','随时间角度为 ωt+θ0。','不能拿 B 与线圈平面的夹角直接代入 cos。');
  def('vmove',t`\mathbf v`,'导体局部运动速度','m/s','积分线元所在位置的导体速度。','转动导体各处速度不同；刚性平移才全段相同。','不是载流子相对导体的漂移速度。');
  def('rab',t`\mathbf r_b-\mathbf r_a`,'导体起末端位移','m','从积分起点 a 指向终点 b 的直线位移矢量。','方向与 a→b 配对。','弯导线总长度不能替代端点位移投影。');
  def('ell',t`\ell`,'导体或线圈的几何长度','m','本模型标明的直棒长度，或螺线管的轴向长度。','位置在图示和模型说明中确定。','不是自感 L，也不是无穷小线元 dℓ。');
  def('rRod',t`r`,'转动棒微元到转轴距离','m','沿直棒从固定转轴量到当前积分微元的位置。','绕端点时 0≤r≤ℓ，局部速率为 |ω|r。','不能把所有线元的速度都取端点速率。');
  def('vRail',t`v`,'棒沿斜面下滑速度','m/s','沿导轨斜面向下的有向速度，课件初速为零。','正向沿下滑；终速 v∞ 在该方向上取正。','不是竖直速度或轨道切线以外的分量。');
  def('gravity',t`g`,'重力加速度大小','m/s²','近地重力加速度，方向竖直向下。','沿斜面分量为 g sinα。','g 不是磁场或几何间距。');
  def('slope',t`\alpha`,'导轨斜面倾角','rad','导轨所在平面与水平面的夹角。','B 在课件模型中竖直，因此法向磁场为 Bcosα。','磁力沿斜面的投影还要出现一个 cosα。');
  def('tauRail',t`\tau`,'电磁阻尼时间常数','s','速度接近终速的特征时间 mR/(B²ℓ²cos²α)。','本卡标量 τ，不是磁力矩矢量。','t=τ 时 v=v∞(1−e⁻¹)，不是已完全达到终速。');
  def('vinfty',t`v_\infty`,'终端速度','m/s','重力沿斜面分量与磁阻力平衡时的速度。','本模型 v∞=mgR sinα/(B²ℓ²cos²α)。','只在相关分母非零及模型条件满足时适用。');
  def('aMag',t`a`,'圆柱磁区或极板半径','m','从轴心到理想均匀时变场区域边界的距离。','场点 r 与 a 比较决定有效穿面面积。','不是回路或棒长，除非模型特别规定。');
  def('Ephi',t`E_\varphi`,'感生电场环向分量','V/m','以磁区轴为中心的圆周切向电场。','B 沿 +z，+φ 按右手方向定义；B 增加时 Eφ 为负。','外区 B≈0 仍可能有 Eφ。');
  def('Bdot',t`\dot B`,'磁感应强度分量变化率','T/s','沿已固定的轴向取 B 的有向分量后，对时间求导。','点号是导数，不是乘法点积。','场大小变化与方向变化都应在矢量关系中完整处理。');
  def('Lind',t`L`,'自感系数','H（亨利）','在固定线性模型下，自身磁通链与回路电流的比例系数。','Ψ=LI；材料或几何变动时 L 可能变化。','单位为 H，不是表示长度的 L。');
  def('emfL',t`\mathcal E_L`,'自感电动势','V','本回路电流变化引起的磁通链变化所产生的电动势。','沿电流参考方向取正，恒定 L 时为 −L dI/dt。','阻碍的是电流变化，不是永远反向于电流。');
  def('hToroid',t`h`,'矩形截面环的轴向高度','m','螺线环矩形截面沿中心轴方向的尺寸。','径向窄条面积为 h dr。','不是粒子螺旋轨迹的螺距。');
  def('Lprime',t`L'`,'单位长度自感','H/m','同轴薄壁电缆每米长度的外部自感。','总长度 ℓ 的自感为 L′ℓ。','撇号表示按长度归一化，不表示求导。');
  def('Mmut',t`M`,'互感系数大小','H','一个线圈单位源电流穿过另一个线圈的磁通链大小。','本课程以 M≥0 表示耦合大小，方向符号另按绕向给出。','不是磁化强度矢量 M，单位不同。');
  def('N1',t`N_1`,'线圈1匝数','无量纲','编号1线圈的总匝数。','与源电流或受感线圈的编号要配对。','Φ12 是源2穿入线圈1的每匝通量，应乘 N1。');
  def('N2',t`N_2`,'线圈2匝数','无量纲','编号2线圈的总匝数。','Φ21 是源1穿入线圈2的每匝通量。','求磁通链时乘受感线圈的匝数。');
  def('Phi21',t`\Phi_{21}`,'源1穿入线圈2的单匝磁通','Wb','线圈1电流在编号2线圈的每一匝中产生的磁通。','本网站下标顺序“先受感、后场源”。','不是线圈1自己的自感磁通。');
  def('Phi12',t`\Phi_{12}`,'源2穿入线圈1的单匝磁通','Wb','线圈2电流穿过编号1线圈每匝的磁通。','与 Φ21 使用互易的正绕向约定。','受感侧乘 N1，再除源电流 I2。');
  def('emf21',t`\mathcal E_{21}`,'在线圈2产生的互感电动势','V','由源线圈1的电流变化在线圈2中产生的有向电动势。','负号相对已选正磁通链参考方向。','下标不是把电动势施加回线圈1。');
  def('aLoop',t`a`,'线框平行边长度','m','矩形线框中与长直导线平行的那条边长度。','窄条面积为 a dr。','与近边距 r1、远边距 r2 区分。');
  def('r1',t`r_1`,'近边到导线轴线距离','m','由长直导线垂直量到矩形线框近侧边的距离。','0<r1<r2。','不是线框宽度；宽度为 r2−r1。');
  def('r2',t`r_2`,'远边到导线轴线距离','m','相同方向量到线框远侧边的距离。','与 r1 从同一源导线量起。','ln(r2/r1) 为无量纲。');
  def('L1',t`L_1`,'线圈1自感','H','单独定义的编号1线圈自感参数。','与互感 M 分开计入。','耦合能量中对应 I1²。');
  def('L2',t`L_2`,'线圈2自感','H','编号2线圈自感参数。','不必等于 L1。','相同线圈的理想反接零自感还需 k=1。');
  def('coupling',t`k`,'耦合系数','无量纲','实际互感相对完全耦合值 √(L1L2) 的比例。','0≤k≤1；k=1 为理想完全耦合。','不是平面波的波数 k。');
  def('Leq',t`L_{\rm eq}`,'串联等效自感','H','从串联网络端口观察到的等效磁通链/电流比。','相助取 +2M，相消取 −2M。','每个线圈互相链入对方通量，共有两项互感链。');
  def('Wm',t`W_m`,'磁场总储能','J','电感或指定空间磁场中储存的能量。','二次型公式在固定线性介质模型下使用。','不是磁矩在给定外场的取向势能。');
  def('wm',t`w_m`,'磁场能量密度','J/m³','空间某点单位体积内储存的磁场能。','线性各向同性时等于 B·H/2。','不能把密度直接当总能量；要乘体积积分。');
  def('qShell',t`q`,'运动球壳总电荷','C','经典均匀薄球壳模型表面的总电荷。','磁能含 q²，结果不由电荷正负改变。','本模型不代表电子的完整现代结构。');
  def('R0',t`R_0`,'带电薄球壳半径','m','从球壳中心到带电表面的固定半径。','能量积分从 R0 到无穷远。','不能在点电荷极限 R0=0 得到有限自能。');
  def('vshell',t`v`,'球壳整体平移速率','m/s','薄球壳作为整体相对观察者运动的速率。','要求 v≪c。','不是球壳表面旋转产生的切向速率。');
  def('jd',t`\mathbf j_d`,'位移电流密度','A/m²','固定空间点处电位移矢量对时间的偏导。','方向变化也可产生非零 jd。','不等于自由电荷实际穿过真空的运动流。');
  def('Id',t`I_d`,'位移电流','A','jd 穿过指定有向曲面的积分。','正负由曲面法向决定。','不能省略实际积分面积而直接使用整块极板的电流。');
  def('PhiD',t`\Phi_D`,'电位移通量','C','D 对固定曲面的通量。','与所选正法向有关。','不是单位 Wb 的磁通 Φm；其变化率才是位移电流。');
  def('Qcharge',t`Q`,'电容器极板有向电荷','C','与板间 D 通量正方向配对的极板电荷。','Q=CU；Id=dQ/dt。','此处按选定正法向取有向量，而非一概先取绝对值。');
  def('Bphi',t`B_\varphi`,'磁感应强度环向分量','T','以圆形电容器轴为中心的圆周切向磁场。','方向与位移电流按右手规则配对。','不是板间轴向电场本身。');
  def('Edot',t`\dot E`,'板间轴向电场变化率','V/(m·s)','沿固定正法向的均匀板间 E 分量对时间的导数。','决定位移电流方向。','E 大小不变但方向变时须回到矢量公式。');
  def('QfPlain',t`Q_f`,'闭合面内自由电荷','C','宏观麦克斯韦高斯关系中所包围的自由电荷代数和。','闭合面法向取向外。','束缚电荷通过 P 与 D 的关系处理。');
  def('IfPlain',t`I_f`,'跨面自由电流','A','穿过与回路 C 配对开曲面的自由电流代数和。','正方向与曲面法向一致。','旁边的 D 时间导数项另外计入全电流。');
  def('rhof',t`\rho_f`,'自由体电荷密度','C/m³','考察点单位体积中的自由电荷代数和。','宏观 D 的散度与它对应。','不是把全部束缚电荷也加进去。');
  def('jf',t`\mathbf j_f`,'自由电流密度','A/m²','由自由电荷运动形成的局部电流密度。','H 的旋度等于 jf 加 D 的时间变化率。','区别于位移电流密度 jd。');
  def('Ey',t`E_y`,'电场 y 分量','V/m','所示沿 x 传播平面波的电场横向分量。','与 Hz 配对时 E×H 沿 +x。','不是电场沿传播方向的分量。');
  def('Hz',t`H_z`,'磁场强度 z 分量','A/m','平面波中沿 z 的磁场强度分量。','其相位与 Ey 一致，幅度按介质阻抗配对。','不是单位 T 的 Bz。');
  def('xwave',t`x`,'传播方向坐标','m','沿波传播轴从选定原点量到观察点的有向坐标。','固定相位 t−x/v 对应向 +x 传播。','不是圆环轴线模型中的中心距离。');
  def('vwave',t`v`,'介质中的波速','m/s','平面波等相位面在当前均匀无耗散介质中的传播速度。','v=1/√(με)，真空取 c。','不是导体运动速率，也不是粒子速度。');
  def('E0',t`E_0`,'电场振幅','V/m','简谐场电场分量能达到的峰值大小。','E(t) 的瞬时值还乘 cos 相位。','振幅不是有效值；整周期平均平方为 E0²/2。');
  def('H0',t`H_0`,'磁场强度振幅','A/m','简谐 H 的峰值大小。','单向无耗散平面波与 E 同相。','平均能流用 E0H0/2，而非 E0H0。');
  def('B0',t`B_0`,'磁感应强度振幅','T','平面波 B 的峰值大小。','B0=μH0，E0/B0=v。','本卡下标0表示振幅，不是未放介质前的外场。');
  def('phi0',t`\phi_0`,'初相位','rad','在 t=0、x=0 处的相位常数。','不是初始场值；初始场值还含 cosφ0。','与旋转线圈初始法线角 θ0 的物理含义区分。');
  def('wtotal',t`w`,'电磁总能量密度','J/m³','同一时刻同一点的电场能量密度与磁场能量密度之和。','一般保留 εE²/2+μH²/2 两项。','单向平面波才可用等分关系进一步合并。');
  def('Sflow',t`\mathbf S`,'坡印廷矢量','W/m²','单位面积每单位时间通过的电磁能量通量矢量。','方向 E×H；大小在单向平面波中为 wv。','不是面积 S；功率还需与有向面积点乘积分。');
  def('p0',t`p_0`,'振荡电偶极矩振幅','C·m','小尺寸电偶极源的电偶极矩峰值大小。','课件源写为 p(t)=p0 cosωt。','比较 ω⁴ 标度时必须保持 p0 固定。');
  def('rrad',t`r`,'源中心到远区观察点距离','m','从振荡偶极子中心量到观察点。','远区需 r 远大于波长且大于源尺寸。','延迟时间为 t−r/c；不可延用至 r→0。');
  def('thetarad',t`\theta`,'相对偶极轴的极角','rad','观察方向与偶极矩振荡轴的夹角。','轴向 θ=0或π，赤道 θ=π/2。','场振幅含 sinθ，能流含 sin²θ。');
  def('cLight',t`c`,'真空光速','m/s','真空中电磁波传播速度，约 3.00×10⁸ m/s。','c=1/√(μ0ε0)。','不是同轴电缆外导体半径 c。');
  def('Etheta',t`E_\theta`,'远区电场极角分量','V/m','在观察点沿球坐标 θ 方向的横向辐射电场。','与径向传播方向垂直；正负还随相位变化。','不是径向静电场分量。');
  def('Hphirad',t`H_\varphi`,'远区磁场方位角分量','A/m','沿偶极轴周围球坐标 φ 方向的横向辐射磁场。','Eθ×Hφ 沿向外径向。','以局部平面波场比与 Eθ 配对。');
  def('Sr',t`S_r`,'径向瞬时能流密度','W/m²','偶极辐射沿球面向外法向传播的能流密度。','平均值要对 cos² 相位作整周期平均。','随角度和距离变，不能用赤道值代表整球。');
  def('Prad',t`P(r,t)`,'穿过远区球面的瞬时功率','W','在距离 r 的整个球面上对径向能流积分得到的功率。','仍含延迟时间，随时间变化。','不是极化强度矢量 P。');
  def('Pavg',t`\langle P\rangle`,'周期平均辐射功率','W','对一个完整简谐周期的瞬时辐射功率取平均。','稳定振幅与频率下不含观察时刻。','与瞬时峰值相差 1/2，不能重复平均。');
  const specs={
    'coulomb':'F q1 q2 eps0 rs rhat','field-definition':'E F q0','point-field':'E qsource eps0 rs rhat','continuous-field':'E eps0 rvec rprime dq','dipole-moment':'p dipq dipell',
    'line-field':'Esize lambda eps0 ra','plane-field':'Esize sigma eps0','ring-field':'Ex Q xaxis eps0 Rbody','disk-field':'Ex sigma eps0 xaxis Rbody',
    'electric-flux':'PhiE E surface dS thetaFlux','electric-gauss':'E surface dS Qin eps0','shell-field':'Esize Q eps0 rc Rbody','solid-sphere':'Esize Q eps0 rc Rbody','charged-cylinder':'Esize rho eps0 ra Rbody','gauss-local':'E rho eps0',
    'potential-difference':'Va Vb E dl','electric-work':'work q Va Vb DU','potential-energy':'Uenergy q V','electrostatic-loop':'E path dl','potential-gradient':'E V xyz','potential-components':'Ecomponents V xyz',
    'point-potential':'V qsource eps0 rs','potential-sum':'V qi ri eps0','continuous-potential':'V eps0 dq rs','shell-potential':'V Q eps0 Rbody rc','dipole-potential':'V p rhat eps0 rs',
    'conductor-equilibrium':'E','surface-field':'En sigma eps0','cavity-charge':'Qinner Qouter qin Qcon',
    'displacement':'D eps0 E P','dielectric-gauss':'D surface dS Qf','linear-dielectric':'D eps E','polarization':'P eps0 chie E','relative-permittivity':'eps epsr eps0 chie','bound-charge':'sb P normal',
    'capacitance':'C Qplate Uvoltage','series-capacitance':'Cseries Ci','parallel-capacitance':'Cparallel Ci','parallel-plate':'C eps Sarea dplate','spherical-capacitor':'C eps a b','cylindrical-capacitor':'C eps Llen a b','capacitor-energy':'Wel Qplate C Uvoltage','energy-density':'we E D eps','field-energy':'Wel we volume dV',
    'current-density':'I qpass time j surface dS','carrier-current':'j ncarrier qcarrier vd','ohm-local':'j sigmac E rhores','emf-definition':'emf Ek path dl',
    'biot-savart':'dB mu0 Idl rhat rs','magnetic-superposition':'B dB','long-wire':'B mu0 I ra','half-wire':'B mu0 I rs','finite-wire':'B mu0 I avec alpha1 alpha2','loop-axis':'Bx mu0 I Rbody xaxis','loop-center':'B mu0 N I Rbody','arc-center':'B mu0 I phi Rbody','solenoid':'B mu0 nturn I N Llen','rotating-charge':'dI omega dq','magnetic-moment':'mvec N I Svec',
    'magnetic-gauss':'B surface dS','ampere-law':'B path dl mu0 Ienc','current-cylinder':'B mu0 I ra Rbody','current-shell':'B mu0 I ra Rbody','toroid':'B mu0 N I rTor',
    'ampere-element':'dF I Idl B','wire-force':'F I dl B','uniform-wire-force':'F I Lvec B','straight-force-size':'Fsize I Llen B thetaLB','parallel-wires':'Fsize Llen mu0 I1 I2 ra','magnetic-torque':'taum mvec B','magnetic-energy':'Umag mvec B',
    'lorentz-force':'F q E vparticle B','magnetic-force':'FB q vparticle B','magnetic-force-size':'Fsize q vsize B thetaVB','orbit-radius':'Rorbit mass vsize q B','cyclotron-frequency':'wc T q B mass','velocity-components':'vperp vparallel vsize thetaVB','helix-radius':'Rorbit mass vperp q B','helix-pitch':'hpitch vparallel T','particle-energy':'mass vsize q Vinitial Vfinal',
    'hall-field':'EH vd B','hall-voltage':'UH I B ncarrier qcarrier thickness','hall-coefficient':'RH ncarrier qcarrier',
    'magnetization-definition':'Mmag mmol DV','bound-surface-current':'Kb Mmag normal','magnetization-circulation':'Mmag path dl Ib','magnetic-h':'H B mu0 Mmag','magnetic-h-ampere':'H path dl If','linear-magnetic':'Mmag chim H mur B mu',
    'medium-solenoid-toroid':'Hsol Htor nturn I N rTor B mu','coax-media':'Hphi I ra a b cRadius','ferro-characteristics':'Br B H Hc',
    'flux-linkage':'Phim B surface dS thetaFlux Psi N Phik','faraday-law':'emf Psi time','induction-current':'I emf Rres PsiExt time','induced-charge':'qind I time t1 t2 Psi1 Psi2 Rres','rotating-loop':'Psi N B Sarea omega time theta0 emf',
    'motional-integral':'emf vmove B dl','translation-emf':'emf vmove B rab','rotating-rod':'emf B omega rRod ell','rail-dynamics':'mass vRail gravity slope B ell Rres vinfty time tauRail',
    'induced-circulation':'E path dl B time surface dS','cylinder-induced':'Ephi ra aMag Bdot','tangent-induced':'emf aMag Bdot',
    'self-inductance':'Lind Psi I N Phim','self-emf':'emfL Lind I time','solenoid-inductance':'Lind mu nturn volume N Sarea ell','toroid-inductance':'Lind mu N hToroid a b','coax-inductance':'Lprime mu a b',
    'mutual-definition':'Mmut N2 Phi21 I1 N1 Phi12 I2','mutual-emf':'emf21 Mmut I1 time','wire-loop-mutual':'Mmut mu0 aLoop r1 r2','coupling-factor':'Mmut coupling L1 L2','coupled-series':'Leq L1 L2 Mmut',
    'inductor-energy':'Wm Lind I','magnetic-density':'wm B H mu','magnetic-field-energy':'Wm wm volume dV','moving-shell-energy':'Wm mu0 qShell vshell R0','coupled-energy':'Wm L1 I1 L2 I2 Mmut',
    'displacement-density':'jd D time','displacement-current':'Id surface D time dS PhiD','capacitor-displacement':'Id Qcharge C Uvoltage time','displacement-law':'H path dl If surface D time dS','capacitor-magnetic':'Bphi mu0 eps0 ra Edot aMag',
    'maxwell-integral':'D E B H surface dS QfPlain path dl time IfPlain volume','maxwell-local':'D rhof E B time H jf',
    'wave-equation':'Ey Hz xwave time mu eps vwave','plane-wave':'Ey E0 Hz H0 omega time xwave vwave phi0','wave-field-ratio':'E0 H0 mu eps B0 vwave','em-energy-density':'wtotal eps E mu H','poynting-vector':'Sflow E H wtotal vwave',
    'radiation-fields':'Etheta omega p0 thetarad eps0 cLight rrad time Hphirad mu0','radiation-flux':'Sr omega p0 thetarad eps0 cLight rrad time','radiation-power':'Prad Pavg omega p0 eps0 cLight time rrad'
  };
  const overrides={
    'parallel-wires':{ra:{symbol:'r',name:'两导线轴线间距',meaning:'从一根平行长直导线的中心轴量到另一根轴的垂直距离。',convention:'两线平行，间距处处相同。',reading:'不是到其中一根导线表面的距离。'}},
    'dipole-potential':{rs:{name:'偶极中心到远场点距离',meaning:'从电偶极子中心 O 到观察点 P 的距离。',convention:'远大于两电荷的分离间距。',reading:'单位矢量也从偶极中心指向 P。'}},
    'half-wire':{rs:{name:'端点到场点的垂距',meaning:'场点位于半无限导线端点的垂线上，r 为端点到场点的距离。',convention:'仅适用于本卡特定几何。',reading:'场点不在端点垂线上时改用有限直线角度表达式的极限。'}},
    'toroid-inductance':{a:{meaning:'矩形截面螺线环靠近中心轴一侧的圆周半径。'},b:{meaning:'矩形截面螺线环远离中心轴一侧的圆周半径。'}},
    'coax-media':{a:{meaning:'内实心导体外半径。'},b:{meaning:'外筒内表面半径；夹层介质占 a<r<b。'}},
    'coax-inductance':{a:{meaning:'内薄圆筒半径。'},b:{meaning:'外薄圆筒半径；两者之间均匀介质。'}},
    'tangent-induced':{aMag:{name:'圆柱磁区半径',meaning:'磁区半径为 a；棒长为 2a，中点与磁区边界相切。',reading:'端点相对中心张角 π/2，补回路后有效面积 πa²/4。'}}
  };
  const notation=[
    [/\\times/,'× 叉乘','所得矢量垂直于两个输入矢量；先按右手规则，再考虑电荷正负。'],
    [/\\cdot/,'· 点积','取沿另一矢量的投影；场与面元法向的夹角进入 cos。'],
    [/\\(?:oiint|oint)/,'闭合积分','闭合面取外法向；闭合线绕向与所围开面法向右手配对。'],
    [/\\int/,'积分与微元','把各微元贡献累加；积分上下限、区域和几何尺寸必须匹配。'],
    [/\\partial/,'∂ 偏导数','只改变所求导的变量，其余独立变量固定；矢量场按分量求导。'],
    [/\\nabla/,'∇ 梯度 / 散度 / 旋度','∇V 给梯度，∇·场给散度，∇×场给旋度；三种运算不可互换。'],
    [/\\dot|d(?:I|U|Q|\\Psi).*dt/,'时间导数','点号或 d/dt 表示单位时间变化率；参数会变时须完整求导。'],
    [/\\Delta/,'Δ 状态之差','Δ量=末态量−初态量；检查功、势能和通量差的符号。'],
    [/\\langle/,'〈 〉周期平均','对完整周期平均；本卡简谐 cos² 的平均为 1/2。'],
    [/\\pm/,'± 连接方向','先根据电流和绕向判磁通相助或相消，再选正负；不是任意两个答案。']
  ];
  for(const f of window.REVIEW_DATA.formulas){
    if(!specs[f.id])throw new Error('Missing quantity specification: '+f.id);
    f.variableDetails=specs[f.id].split(' ').map(key=>{
      if(!g[key])throw new Error('Unknown quantity '+key);
      const detail={...g[key],...(overrides[f.id]?.[key]||{}),key};
      if(key==='omega'&&['waves','radiation'].includes(f.chapter))Object.assign(detail,{name:'简谐振荡角频率',meaning:'简谐场或电偶极源的相位每秒增加的弧度数。',convention:'本卡为稳定简谐频率，按正的频率大小给出。',reading:'单位 rad/s，不是每秒转数或普通频率 Hz；与 w 能量密度区分。'});
      else if(key==='omega')Object.assign(detail,{name:'机械转动角速度',meaning:'本模型导线、线圈或带电体的转角随时间的变化率。'});
      if(key==='mass')Object.assign(detail,{name:f.id==='rail-dynamics'?'导体棒质量':'粒子质量',meaning:f.id==='rail-dynamics'?'沿斜导轨下滑的整根导体棒的质量。':'所考察带电粒子的质量；本卡采用非相对论模型。'});
      if(key==='Esize'&&['shell-field','solid-sphere','charged-cylinder'].includes(f.id))Object.assign(detail,{symbol:'E(r)',name:'径向电场分量',meaning:'场点处沿从对称中心或轴线向外方向的电场分量，本式保留 Q 或 ρ 的符号。',convention:'向外为正；负源电荷得到负分量，表示实际电场向内。',reading:'若只求非负场强大小，对该径向分量取绝对值。'});
      if(key==='Fsize'&&f.id==='magnetic-force-size')Object.assign(detail,{symbol:'F_B',name:'磁力大小',meaning:'洛伦兹力中磁场部分的非负大小，不包含电场力。'});
      if(key==='Sarea'&&f.id==='rotating-loop')Object.assign(detail,{name:'单匝线圈面积',meaning:'每一匝平面线圈所围的几何面积。',reading:'匝数 N 已在磁通链中单独计入，面积不再乘一次 N。'});
      if(key==='Sarea'&&f.id==='solenoid-inductance')Object.assign(detail,{name:'螺线管内部横截面积',meaning:'垂直螺线管轴线、由每匝近似圈住的内部截面面积。',reading:'体积 V=Sℓ，S 不是整个侧表面积。'});
      return detail;
    });
    f.variables=f.variableDetails.map(v=>[v.symbol,`${v.name}；单位：${v.unit}。${v.meaning} ${v.convention} ${v.reading}`]);
    f.notation=notation.filter(([pattern])=>pattern.test(f.latex)).map(([,title,description])=>({title,description}));
  }
  window.REVIEW_QUANTITIES=Object.freeze({definitions:g,specs});
})();
