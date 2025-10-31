// 电梯教学演示系统 - 主要JavaScript代码

// 全局状态管理
const appState = {
    currentModule: 'recognition',
    currentView: null,
    userData: {
        progress: {},
        completedSteps: [],
        scores: {}
    }
};

// 电梯部件数据
const elevatorComponents = [
    // 曳引系统
    { id: 1, name: '曳引机', system: '曳引系统', icon: '⚙️', image: 'images/components/traction-machine.jpg', position: { top: '20px', right: '10px' }, description: '提供电梯运行的动力，通过钢丝绳和曳引轮的摩擦力驱动轿厢升降。' },
    { id: 2, name: '曳引轮', system: '曳引系统', icon: '⭕', image: 'images/components/traction-machine.jpg', position: { top: '50px', right: '30px' }, description: '与钢丝绳配合，将曳引机的动力传递给轿厢和对重。' },
    { id: 3, name: '钢丝绳', system: '曳引系统', icon: '📏', image: 'images/components/steel-rope.jpg', position: { top: '100px', left: '50%' }, description: '连接轿厢和对重，承受电梯的全部重量。' },
    
    // 导向系统
    { id: 4, name: '导轨', system: '导向系统', icon: '📍', image: 'images/components/guide-rail.jpg', position: { top: '150px', left: '10px' }, description: '引导轿厢和对重沿固定方向运行，限制轿厢和对重的活动自由度。' },
    { id: 5, name: '导靴', system: '导向系统', icon: '👟', image: 'images/components/guide-rail.jpg', position: { top: '200px', left: '20px' }, description: '安装在轿厢和对重上，与导轨配合保持运行的稳定性。' },
    
    // 轿厢系统
    { id: 6, name: '轿厢', system: '轿厢系统', icon: '🚪', image: 'images/elevator/elevator-full.jpg', position: { top: '250px', left: '50%' }, description: '承载乘客和货物的箱体，是电梯的主要载重部件。' },
    { id: 7, name: '轿架', system: '轿厢系统', icon: '🔲', image: 'images/components/steel-rope.jpg', position: { top: '300px', left: '45%' }, description: '支撑轿厢的金属框架结构。' },
    { id: 8, name: '安全钳', system: '轿厢系统', icon: '🔒', image: 'images/components/safety-gear.jpg', position: { top: '350px', left: '40%' }, description: '当电梯超速下降时，安全钳会夹紧导轨使轿厢停止。' },
    
    // 门系统
    { id: 9, name: '层门', system: '门系统', icon: '🚪', image: 'images/components/elevator-door.jpg', position: { top: '400px', left: '5px' }, description: '各楼层的电梯门，只有轿厢到达该层时才能打开。' },
    { id: 10, name: '轿门', system: '门系统', icon: '🚪', image: 'images/components/elevator-door.jpg', position: { top: '400px', left: '45%' }, description: '轿厢上的门，与层门联动开关。' },
    { id: 11, name: '门机', system: '门系统', icon: '🔧', image: 'images/components/motor.jpg', position: { top: '230px', right: '10px' }, description: '控制电梯门的开关动作的装置。' },
    
    // 重量平衡系统
    { id: 12, name: '对重', system: '重量平衡系统', icon: '⚖️', image: 'images/components/steel-rope.jpg', position: { top: '450px', right: '20px' }, description: '平衡轿厢重量，减少曳引机的功率消耗。' },
    
    // 电力拖动系统
    { id: 13, name: '电动机', system: '电力拖动系统', icon: '⚡', image: 'images/components/motor.jpg', position: { top: '30px', right: '50px' }, description: '为曳引机提供动力的电机。' },
    { id: 14, name: '变频器', system: '电力拖动系统', icon: '📊', image: 'images/components/control-panel.jpg', position: { top: '70px', right: '60px' }, description: '控制电动机转速，实现电梯的平稳运行和节能。' },
    
    // 电气控制系统
    { id: 15, name: '控制柜', system: '电气控制系统', icon: '🎛️', image: 'images/components/control-panel.jpg', position: { top: '120px', right: '70px' }, description: '电梯的大脑，控制电梯的所有运行逻辑。' },
    { id: 16, name: '操纵盘', system: '电气控制系统', icon: '🔘', image: 'images/components/control-panel.jpg', position: { top: '280px', left: '55%' }, description: '轿厢内的按钮面板，乘客通过它选择楼层。' },
    { id: 17, name: '召唤按钮', system: '电气控制系统', icon: '🔴', image: 'images/components/control-panel.jpg', position: { top: '420px', left: '0px' }, description: '各楼层的呼叫按钮，用于召唤电梯。' },
    
    // 安全保护系统
    { id: 18, name: '限速器', system: '安全保护系统', icon: '🛑', image: 'images/components/safety-gear.jpg', position: { top: '160px', right: '40px' }, description: '监测电梯运行速度，超速时触发安全钳动作。' },
    { id: 19, name: '缓冲器', system: '安全保护系统', icon: '🔽', image: 'images/components/safety-gear.jpg', position: { bottom: '10px', left: '50%' }, description: '安装在井道底部，轿厢或对重撞击时起缓冲作用。' },
    { id: 20, name: '安全触板', system: '安全保护系统', icon: '🚧', image: 'images/components/elevator-door.jpg', position: { top: '420px', left: '50%' }, description: '门上的安全装置，遇到障碍物时门会重新打开。' }
];

// 维修保养流程数据
const maintenanceFlows = [
    {
        id: 'daily',
        name: '日常检查',
        steps: [
            { id: 1, title: '检查机房环境', description: '检查机房温度、湿度、通风情况，确保设备正常运行环境。', completed: false },
            { id: 2, title: '检查曳引机', description: '查看曳引机运行声音是否正常，有无异常振动，润滑油是否充足。', completed: false },
            { id: 3, title: '检查钢丝绳', description: '检查钢丝绳是否有断丝、磨损、锈蚀等情况。', completed: false },
            { id: 4, title: '检查轿厢运行', description: '测试轿厢运行是否平稳，有无异常噪音，门的开关是否正常。', completed: false },
            { id: 5, title: '检查安全装置', description: '测试安全钳、限速器等安全装置是否灵敏有效。', completed: false },
            { id: 6, title: '记录检查结果', description: '详细记录检查情况，发现问题及时处理并上报。', completed: false }
        ]
    },
    {
        id: 'monthly',
        name: '月度保养',
        steps: [
            { id: 1, title: '清洁机房设备', description: '清洁曳引机、控制柜等设备表面灰尘。', completed: false },
            { id: 2, title: '润滑保养', description: '对导轨、门机等需要润滑的部位进行润滑保养。', completed: false },
            { id: 3, title: '紧固连接件', description: '检查并紧固各部位的螺栓、螺母等连接件。', completed: false },
            { id: 4, title: '测试安全性能', description: '全面测试各项安全保护装置的性能。', completed: false },
            { id: 5, title: '清理井道', description: '清理井道内的杂物和灰尘。', completed: false },
            { id: 6, title: '更新保养记录', description: '完整填写保养记录表，归档保存。', completed: false }
        ]
    },
    {
        id: 'quarterly',
        name: '季度保养',
        steps: [
            { id: 1, title: '全面检查曳引系统', description: '详细检查曳引机、曳引轮、钢丝绳的磨损情况。', completed: false },
            { id: 2, title: '检查电气系统', description: '检查控制柜内各电器元件，测试绝缘电阻。', completed: false },
            { id: 3, title: '调整门系统', description: '调整门的开关速度和力度，确保运行顺畅。', completed: false },
            { id: 4, title: '检查安全回路', description: '全面检查安全回路的完整性和有效性。', completed: false },
            { id: 5, title: '性能测试', description: '进行运行速度、平层精度等性能指标测试。', completed: false },
            { id: 6, title: '编写保养报告', description: '编写详细的季度保养报告，提出改进建议。', completed: false }
        ]
    }
];

// 故障诊断数据
const faultDiagnosis = [
    {
        id: 1,
        name: '电梯不能启动',
        level: 'high',
        symptoms: ['按下按钮后电梯无反应', '控制柜无显示', '轿厢照明正常但不运行'],
        causes: ['电源故障', '安全回路断开', '门锁未闭合', '控制系统故障'],
        solutions: [
            '检查电源开关和断路器是否合上',
            '检查安全回路中各安全开关是否正常',
            '检查层门和轿门门锁是否完全闭合',
            '检查控制系统主板和接线',
            '查看故障代码，根据说明书排查'
        ],
        safety: ['维修前务必切断电源', '挂上"正在维修"警示牌', '使用万用表检测时注意用电安全']
    },
    {
        id: 2,
        name: '电梯运行噪音异常',
        level: 'medium',
        symptoms: ['运行时有刺耳的摩擦声', '曳引机异响', '导轨处有噪音'],
        causes: ['导轨缺油或有异物', '曳引机轴承磨损', '导靴磨损严重', '钢丝绳张力不均'],
        solutions: [
            '清洁导轨并重新润滑',
            '检查曳引机轴承，必要时更换',
            '检查导靴磨损情况，及时更换',
            '调整钢丝绳张力',
            '检查其他传动部件是否松动'
        ],
        safety: ['在机房操作时注意防止卷入运动部件', '使用专用润滑油', '确保轿厢内无人再进行测试']
    },
    {
        id: 3,
        name: '电梯门无法正常开关',
        level: 'high',
        symptoms: ['门开到一半就停止', '门关不上反复开关', '门开关速度异常'],
        causes: ['门机故障', '门导轨有异物', '安全触板失灵', '门锁触点不良'],
        solutions: [
            '清理门导轨，去除异物',
            '调整门机参数',
            '检查安全触板，必要时更换',
            '清洁门锁触点或更换门锁',
            '检查门皮带或门链条张力'
        ],
        safety: ['维修时将轿厢停靠在非楼层位置', '防止乘客误入', '调试时注意手指不要放在门缝处']
    },
    {
        id: 4,
        name: '电梯平层不准确',
        level: 'medium',
        symptoms: ['停靠时与楼层有落差', '每次停靠位置不一致', '需要二次平层'],
        causes: ['平层感应器位置偏移', '编码器故障', '曳引轮打滑', '变频器参数不当'],
        solutions: [
            '调整平层感应器位置',
            '检查编码器连接和工作状态',
            '检查曳引轮和钢丝绳摩擦力',
            '重新设定变频器平层参数',
            '进行平层自学习'
        ],
        safety: ['调试时在轿厢内放置警示标志', '调整参数要逐步进行', '测试时保持轿厢内无人']
    },
    {
        id: 5,
        name: '电梯频繁故障停梯',
        level: 'high',
        symptoms: ['运行中突然停止', '显示安全回路故障', '需要复位后才能运行'],
        causes: ['安全回路接触不良', '电磁干扰', '控制系统故障', '传感器故障'],
        solutions: [
            '检查安全回路所有接点，清洁或更换',
            '检查接地系统',
            '加装抗干扰装置',
            '检查各类传感器工作状态',
            '更换老化的电气元件'
        ],
        safety: ['系统性故障需要全面排查', '不要随意短接安全回路', '必要时请厂家技术支持']
    }
];

// 应急救援场景数据
const emergencyScenarios = [
    {
        id: 'trapped',
        name: '乘客困梯救援',
        type: '困人救援',
        image: 'images/scenarios/trapped-rescue.jpg',
        description: '电梯在运行中突然停止，乘客被困在轿厢内',
        steps: [
            { id: 1, icon: '📞', title: '接收报警', description: '接到困人报警后，立即记录时间、位置、被困人数等信息。', time: '1分钟', completed: false },
            { id: 2, icon: '🗣️', title: '安抚乘客', description: '通过对讲系统与被困乘客沟通，告知正在施救，请其保持冷静，不要擅自行动。', time: '持续', completed: false },
            { id: 3, icon: '🔍', title: '确认轿厢位置', description: '到达现场后，确认轿厢所在楼层位置，查看电梯运行状态。', time: '2分钟', completed: false },
            { id: 4, icon: '⚡', title: '切断电源', description: '到机房关闭电梯主电源，挂上"正在维修"标志。', time: '2分钟', completed: false },
            { id: 5, icon: '🔧', title: '盘车操作', description: '使用专用盘车轮，慢慢转动曳引轮，将轿厢移动到最近的楼层。', time: '5-10分钟', completed: false },
            { id: 6, icon: '🚪', title: '打开层门', description: '使用层门钥匙打开层门和轿门，确保安全后引导乘客离开。', time: '2分钟', completed: false },
            { id: 7, icon: '📋', title: '检查设备', description: '检查电梯故障原因，排除故障后进行试运行。', time: '30分钟', completed: false },
            { id: 8, icon: '📝', title: '记录报告', description: '详细记录救援过程和故障原因，填写救援报告。', time: '10分钟', completed: false }
        ],
        safetyNotes: [
            '救援过程中保持与被困人员的沟通',
            '严禁强行扒开电梯门',
            '盘车时要缓慢均匀用力',
            '开门前确保轿厢已完全平层',
            '非专业人员不得进行救援操作'
        ]
    },
    {
        id: 'power-outage',
        name: '停电应急处置',
        type: '停电应急',
        image: 'images/scenarios/power-outage.jpg',
        description: '突然停电导致电梯停止运行',
        steps: [
            { id: 1, icon: '🔌', title: '确认停电', description: '确认是否为供电系统停电，检查配电箱和应急电源。', time: '1分钟', completed: false },
            { id: 2, icon: '🔋', title: '启动应急电源', description: '如有应急电源装置（ARD），应自动将轿厢运行至最近楼层。', time: '自动', completed: false },
            { id: 3, icon: '📢', title: '通知乘客', description: '通过应急通话或对讲系统告知乘客停电情况。', time: '持续', completed: false },
            { id: 4, icon: '🚪', title: '等待平层', description: '如有应急平层装置，等待轿厢自动运行到楼层并开门。', time: '2-5分钟', completed: false },
            { id: 5, icon: '🔧', title: '手动救援', description: '如无应急装置，按困人救援程序进行手动盘车。', time: '10-15分钟', completed: false },
            { id: 6, icon: '🛑', title: '停止运行', description: '来电后，检查电梯状态，确认正常后才恢复运行。', time: '持续', completed: false }
        ],
        safetyNotes: [
            '配备应急照明设备',
            '停电期间禁止使用电梯',
            '来电后需要全面检查才能恢复运行',
            '在电梯入口放置停运标志'
        ]
    },
    {
        id: 'fire',
        name: '火灾应急程序',
        type: '火灾应急',
        image: 'images/scenarios/fire-emergency.jpg',
        description: '建筑物发生火灾时的电梯应急处置',
        steps: [
            { id: 1, icon: '🔥', title: '接收火警信号', description: '消防控制中心接收火警信号，立即启动应急预案。', time: '立即', completed: false },
            { id: 2, icon: '🚫', title: '切换消防模式', description: '电梯自动切换到消防运行模式，停止响应所有外呼。', time: '自动', completed: false },
            { id: 3, icon: '⬇️', title: '迫降至首层', description: '所有电梯迫降至首层（或指定疏散层），中途不停靠。', time: '自动', completed: false },
            { id: 4, icon: '🚪', title: '打开门并停用', description: '到达首层后，门自动打开，电梯停止运行。', time: '自动', completed: false },
            { id: 5, icon: '👨‍🚒', title: '消防员专用', description: '电梯转为消防员专用模式，只能由消防员操作。', time: '持续', completed: false },
            { id: 6, icon: '🛑', title: '现场管控', description: '在电梯入口设置警示标志，禁止普通人员使用。', time: '持续', completed: false },
            { id: 7, icon: '📞', title: '协助消防', description: '电梯管理人员协助消防人员，提供电梯技术支持。', time: '持续', completed: false }
        ],
        safetyNotes: [
            '火灾时严禁普通乘客使用电梯',
            '消防电梯具有防烟、防水功能',
            '只有经过培训的消防员才能操作消防电梯',
            '火灾扑灭后需全面检查才能恢复使用'
        ]
    },
    {
        id: 'flood',
        name: '水浸应急处理',
        type: '水浸应急',
        image: 'images/scenarios/power-outage.jpg',
        description: '电梯井道或机房进水的应急处理',
        steps: [
            { id: 1, icon: '💧', title: '发现水浸', description: '通过水浸传感器或人工发现井道或机房进水。', time: '立即', completed: false },
            { id: 2, icon: '⚡', title: '切断电源', description: '立即切断电梯主电源，防止漏电和短路。', time: '立即', completed: false },
            { id: 3, icon: '🚫', title: '停止使用', description: '在所有电梯入口处放置禁用标志，疏散人员。', time: '立即', completed: false },
            { id: 4, icon: '🔍', title: '确认水源', description: '查找进水原因，是管道破裂、渗漏还是外部灌入。', time: '5分钟', completed: false },
            { id: 5, icon: '🚰', title: '截断水源', description: '采取措施截断水源，防止继续进水。', time: '紧急', completed: false },
            { id: 6, icon: '💨', title: '排水处理', description: '使用水泵等设备排出积水，保持通风干燥。', time: '视情况', completed: false },
            { id: 7, icon: '🔧', title: '检查设备', description: '全面检查电气设备，测试绝缘电阻，确认无隐患。', time: '2小时以上', completed: false },
            { id: 8, icon: '✅', title: '恢复运行', description: '确认所有设备正常且安全后，才能恢复运行。', time: '检查后', completed: false }
        ],
        safetyNotes: [
            '进水后严禁通电运行',
            '彻底干燥后再检查设备',
            '重点检查电气系统的绝缘性能',
            '必要时更换受损的电气元件',
            '做好防水措施预防再次发生'
        ]
    }
];

// 考核题目数据
const examQuestions = [
    {
        id: 1,
        question: '电梯困人时，以下哪种做法是正确的？',
        options: [
            '立即强行扒开电梯门',
            '先安抚乘客，然后按规程进行盘车救援',
            '让乘客自己从轿厢顶部爬出',
            '直接重启电梯电源'
        ],
        correct: 1,
        explanation: '电梯困人时，首要任务是安抚被困乘客，然后严格按照救援规程操作。强行扒门或重启电源都可能造成危险。'
    },
    {
        id: 2,
        question: '以下哪个不属于电梯八大系统？',
        options: [
            '曳引系统',
            '照明系统',
            '安全保护系统',
            '电气控制系统'
        ],
        correct: 1,
        explanation: '电梯八大系统包括：曳引系统、导向系统、轿厢系统、门系统、重量平衡系统、电力拖动系统、电气控制系统、安全保护系统。照明只是轿厢系统的一部分。'
    },
    {
        id: 3,
        question: '电梯限速器的作用是什么？',
        options: [
            '控制电梯的运行速度',
            '检测电梯超速并触发安全钳',
            '记录电梯的运行速度',
            '调节电梯的加速度'
        ],
        correct: 1,
        explanation: '限速器是安全保护装置，当电梯超速时会触发安全钳动作，使电梯制动停止。'
    },
    {
        id: 4,
        question: '火灾时，为什么不能乘坐普通电梯？',
        options: [
            '电梯速度太慢',
            '电梯可能断电停运，且有烟雾和触电危险',
            '电梯会被消防员征用',
            '电梯会自动停止工作'
        ],
        correct: 1,
        explanation: '火灾时，电梯可能因断电停运，井道会成为烟囱效应的通道，且有漏电危险，因此严禁使用。'
    },
    {
        id: 5,
        question: '电梯日常检查的重点项目不包括？',
        options: [
            '检查钢丝绳是否有断丝',
            '检查门的开关是否正常',
            '更换主控板',
            '检查安全装置是否灵敏'
        ],
        correct: 2,
        explanation: '更换主控板属于维修项目，不是日常检查的内容。日常检查主要是观察、测试各部件的工作状态。'
    },
    {
        id: 6,
        question: '对重的主要作用是？',
        options: [
            '增加电梯的重量',
            '平衡轿厢重量，减少能耗',
            '保持电梯稳定',
            '防止电梯超速'
        ],
        correct: 1,
        explanation: '对重的重量约等于轿厢自重加40-50%额定载重，可以平衡轿厢重量，减少曳引机的功率消耗。'
    },
    {
        id: 7,
        question: '电梯维修时，正确的安全措施是？',
        options: [
            '在机房关闭主电源，挂上警示牌',
            '只需要告诉其他人正在维修',
            '保持电源开启方便测试',
            '仅在轿厢内放置警示标志'
        ],
        correct: 0,
        explanation: '维修前必须切断电源，并挂上"正在维修"的警示牌，这是最基本的安全措施。'
    },
    {
        id: 8,
        question: '当电梯出现异常噪音时，最可能的原因是？',
        options: [
            '电梯超载',
            '导轨缺油或有异物',
            '电梯速度太快',
            '楼层太高'
        ],
        correct: 1,
        explanation: '异常噪音通常是机械摩擦引起的，导轨缺油或有异物是最常见的原因。'
    }
];

// 初始化应用
document.addEventListener('DOMContentLoaded', function() {
    loadUserData();
    initializeApp();
    setupEventListeners();
});

// 加载用户数据
function loadUserData() {
    const savedData = localStorage.getItem('elevatorLearningData');
    if (savedData) {
        appState.userData = JSON.parse(savedData);
    }
}

// 保存用户数据
function saveUserData() {
    localStorage.setItem('elevatorLearningData', JSON.stringify(appState.userData));
    updateProgress();
}

// 初始化应用
function initializeApp() {
    loadModule('recognition');
    updateProgress();
}

// 设置事件监听
function setupEventListeners() {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            loadModule(this.dataset.module);
        });
    });
}

// 加载模块
function loadModule(moduleName) {
    appState.currentModule = moduleName;
    
    switch(moduleName) {
        case 'recognition':
            loadRecognitionModule();
            break;
        case 'maintenance':
            loadMaintenanceModule();
            break;
        case 'emergency':
            loadEmergencyModule();
            break;
    }
    
    updateStatusBar(`已切换到${getModuleName(moduleName)}模块`);
}

// 获取模块名称
function getModuleName(moduleName) {
    const names = {
        'recognition': '部件认知',
        'maintenance': '维修保养',
        'emergency': '应急救援'
    };
    return names[moduleName] || '';
}

// 加载部件认知模块
function loadRecognitionModule() {
    const sidebar = document.getElementById('sidebar');
    const contentArea = document.getElementById('contentArea');
    
    sidebar.innerHTML = `
        <div class="menu-section">
            <h3>功能菜单</h3>
            <div class="menu-item active" onclick="showElevatorVisualization()">
                <span class="menu-item-icon">🏗️</span>
                <span>电梯结构可视化</span>
            </div>
            <div class="menu-item" onclick="showComponentsList()">
                <span class="menu-item-icon">📋</span>
                <span>部件列表</span>
            </div>
            <div class="menu-item" onclick="showSystemCategories()">
                <span class="menu-item-icon">🗂️</span>
                <span>系统分类</span>
            </div>
        </div>
    `;
    
    showElevatorVisualization();
}

// 显示电梯可视化
function showElevatorVisualization() {
    setActiveMenuItem(0);
    const contentArea = document.getElementById('contentArea');
    
    contentArea.innerHTML = `
        <div class="content-header">
            <h2>电梯结构可视化</h2>
            <p>点击标记点查看各部件的详细信息</p>
        </div>
        
        <div class="elevator-visualization">
            <div class="elevator-diagram">
                <div class="elevator-shaft">
                    <div class="elevator-car" id="elevatorCar" style="top: 200px;">
                        <div class="elevator-door left" id="doorLeft"></div>
                        <div class="elevator-door right" id="doorRight"></div>
                    </div>
                    ${elevatorComponents.map(comp => `
                        <div class="component-marker" 
                             style="${Object.entries(comp.position).map(([k,v]) => `${k}:${v}`).join(';')}"
                             onclick="showComponentDetail(${comp.id})"
                             title="${comp.name}">
                            ${comp.icon}
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
                <button class="action-btn" onclick="animateElevator()">
                    演示电梯运行
                </button>
                <button class="action-btn" onclick="toggleDoors()">
                    开关门演示
                </button>
            </div>
        </div>
    `;
}

// 显示部件列表
function showComponentsList() {
    setActiveMenuItem(1);
    const contentArea = document.getElementById('contentArea');
    
    contentArea.innerHTML = `
        <div class="content-header">
            <h2>电梯部件列表</h2>
            <p>浏览所有电梯部件的详细信息</p>
        </div>
        
        <div class="search-filter-bar">
            <div class="search-box">
                <span class="search-icon">🔍</span>
                <input type="text" id="searchInput" placeholder="搜索部件名称..." 
                       oninput="filterComponents()">
            </div>
            <div class="filter-group">
                <button class="filter-btn active" onclick="filterBySystem('all')">全部</button>
                <button class="filter-btn" onclick="filterBySystem('曳引系统')">曳引系统</button>
                <button class="filter-btn" onclick="filterBySystem('导向系统')">导向系统</button>
                <button class="filter-btn" onclick="filterBySystem('安全保护系统')">安全系统</button>
            </div>
        </div>
        
        <div class="components-grid" id="componentsGrid">
            ${elevatorComponents.map(comp => `
                <div class="component-card" onclick="showComponentDetail(${comp.id})">
                    <div class="component-image">
                        <span style="font-size: 4em;">${comp.icon}</span>
                    </div>
                    <div class="component-info">
                        <h3>${comp.name}</h3>
                        <span class="component-system">${comp.system}</span>
                        <p>${comp.description}</p>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// 显示系统分类
function showSystemCategories() {
    setActiveMenuItem(2);
    const contentArea = document.getElementById('contentArea');
    
    const systems = [...new Set(elevatorComponents.map(c => c.system))];
    
    contentArea.innerHTML = `
        <div class="content-header">
            <h2>电梯八大系统</h2>
            <p>按系统分类查看电梯部件</p>
        </div>
        
        ${systems.map(system => {
            const components = elevatorComponents.filter(c => c.system === system);
            return `
                <div class="maintenance-flow" style="margin-bottom: 25px;">
                    <h3 style="color: var(--primary-color); margin-bottom: 20px; font-size: 1.3em;">
                        ${system} (${components.length}个部件)
                    </h3>
                    <div class="components-grid">
                        ${components.map(comp => `
                            <div class="component-card" onclick="showComponentDetail(${comp.id})">
                                <div class="component-image">
                                    ${comp.image ? `<img src="${comp.image}" alt="${comp.name}" style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px;">` : `<span style="font-size: 4em;">${comp.icon}</span>`}
                                </div>
                                <div class="component-info">
                                    <h3>${comp.name}</h3>
                                    <p>${comp.description}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }).join('')}
    `;
}

// 显示部件详情
function showComponentDetail(componentId) {
    const component = elevatorComponents.find(c => c.id === componentId);
    if (!component) return;
    
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <div style="text-align: center; margin-bottom: 30px;">
            ${component.image ? `<img src="${component.image}" alt="${component.name}" style="width: 100%; max-width: 500px; height: 300px; object-fit: cover; border-radius: 12px; margin-bottom: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">` : `<div style="font-size: 6em; margin-bottom: 20px;">${component.icon}</div>`}
            <h2 style="color: var(--primary-color); margin-bottom: 10px;">${component.name}</h2>
            <span class="component-system" style="font-size: 1em;">${component.system}</span>
        </div>
        
        <div style="line-height: 1.8; color: var(--dark-text); font-size: 1.1em;">
            <h3 style="color: var(--primary-color); margin: 20px 0 10px;">部件功能</h3>
            <p>${component.description}</p>
            
            <h3 style="color: var(--primary-color); margin: 20px 0 10px;">技术特点</h3>
            <ul style="padding-left: 20px;">
                <li>高强度材料制造，确保安全可靠</li>
                <li>符合国家标准和安全规范</li>
                <li>定期维护保养可延长使用寿命</li>
                <li>故障时有相应的检测和报警机制</li>
            </ul>
            
            <h3 style="color: var(--primary-color); margin: 20px 0 10px;">维护要点</h3>
            <ul style="padding-left: 20px;">
                <li>定期检查部件工作状态</li>
                <li>及时清洁和润滑</li>
                <li>发现异常及时处理</li>
                <li>做好维护记录</li>
            </ul>
        </div>
        
        <div style="text-align: center; margin-top: 30px;">
            <button class="action-btn" onclick="closeModal()">关闭</button>
        </div>
    `;
    
    modal.classList.add('active');
}

// 加载维修保养模块
function loadMaintenanceModule() {
    const sidebar = document.getElementById('sidebar');
    const contentArea = document.getElementById('contentArea');
    
    sidebar.innerHTML = `
        <div class="menu-section">
            <h3>功能菜单</h3>
            <div class="menu-item active" onclick="showMaintenanceFlows()">
                <span class="menu-item-icon">🔧</span>
                <span>维护流程</span>
            </div>
            <div class="menu-item" onclick="showFaultDiagnosis()">
                <span class="menu-item-icon">⚠️</span>
                <span>故障诊断</span>
            </div>
            <div class="menu-item" onclick="showVirtualPractice()">
                <span class="menu-item-icon">🎮</span>
                <span>虚拟实操</span>
            </div>
        </div>
    `;
    
    showMaintenanceFlows();
}

// 显示维护流程
function showMaintenanceFlows() {
    setActiveMenuItem(0);
    const contentArea = document.getElementById('contentArea');
    
    contentArea.innerHTML = `
        <div class="content-header">
            <h2>电梯维护保养流程</h2>
            <p>学习和演练电梯的日常维护保养程序</p>
        </div>
        
        ${maintenanceFlows.map(flow => `
            <div class="maintenance-flow">
                <h3 style="color: var(--primary-color); margin-bottom: 20px; font-size: 1.3em;">
                    ${flow.name}
                </h3>
                <div class="flow-steps">
                    ${flow.steps.map(step => `
                        <div class="flow-step ${step.completed ? 'completed' : ''}" 
                             onclick="toggleStep('${flow.id}', ${step.id})">
                            <div class="step-number">${step.id}</div>
                            <div class="step-content">
                                <h4>${step.title}</h4>
                                <p>${step.description}</p>
                                <div class="step-actions">
                                    <button class="action-btn" onclick="event.stopPropagation(); markStepComplete('${flow.id}', ${step.id})">
                                        ${step.completed ? '✓ 已完成' : '标记完成'}
                                    </button>
                                    <button class="action-btn" onclick="event.stopPropagation(); showStepDetail('${flow.id}', ${step.id})">
                                        查看详情
                                    </button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div style="text-align: center; margin-top: 20px;">
                    <button class="action-btn success" onclick="completeFlow('${flow.id}')">
                        完成${flow.name}
                    </button>
                    <button class="action-btn" onclick="resetFlow('${flow.id}')">
                        重置流程
                    </button>
                </div>
            </div>
        `).join('')}
    `;
}

// 显示故障诊断
function showFaultDiagnosis() {
    setActiveMenuItem(1);
    const contentArea = document.getElementById('contentArea');
    
    contentArea.innerHTML = `
        <div class="content-header">
            <h2>常见故障诊断与处理</h2>
            <p>学习识别和处理电梯常见故障</p>
        </div>
        
        <div class="fault-diagnosis">
            ${faultDiagnosis.map(fault => `
                <div class="fault-card">
                    <div class="fault-header">
                        <div class="fault-title">${fault.name}</div>
                        <div class="fault-level ${fault.level}">
                            ${fault.level === 'high' ? '高优先级' : fault.level === 'medium' ? '中优先级' : '低优先级'}
                        </div>
                    </div>
                    
                    <div class="fault-section">
                        <h4>故障现象</h4>
                        <ul>
                            ${fault.symptoms.map(s => `<li>${s}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="fault-section">
                        <h4>可能原因</h4>
                        <ul>
                            ${fault.causes.map(c => `<li>${c}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="fault-section">
                        <h4>解决方案</h4>
                        <ul>
                            ${fault.solutions.map(s => `<li>${s}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="fault-section">
                        <h4>安全注意事项</h4>
                        <ul>
                            ${fault.safety.map(s => `<li style="color: var(--danger-color); font-weight: 600;">${s}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div style="text-align: center; margin-top: 15px;">
                        <button class="action-btn" onclick="startFaultPractice(${fault.id})">
                            开始故障排除练习
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// 显示虚拟实操
function showVirtualPractice() {
    setActiveMenuItem(2);
    const contentArea = document.getElementById('contentArea');
    
    const tools = [
        { id: 1, icon: '🔧', name: '扳手' },
        { id: 2, icon: '🪛', name: '螺丝刀' },
        { id: 3, icon: '🔨', name: '锤子' },
        { id: 4, icon: '📏', name: '卷尺' },
        { id: 5, icon: '🔦', name: '手电筒' },
        { id: 6, icon: '⚡', name: '万用表' },
        { id: 7, icon: '🛢️', name: '润滑油' },
        { id: 8, icon: '🧹', name: '清洁工具' },
        { id: 9, icon: '📋', name: '记录本' }
    ];
    
    contentArea.innerHTML = `
        <div class="content-header">
            <h2>虚拟维修实操</h2>
            <p>模拟真实的维修操作场景，提升实践技能</p>
        </div>
        
        <div class="virtual-practice">
            <div class="practice-workspace">
                <div class="tools-panel">
                    <h3>工具箱</h3>
                    <div class="tools-grid">
                        ${tools.map(tool => `
                            <div class="tool-item" onclick="selectTool(${tool.id})">
                                <div class="tool-icon">${tool.icon}</div>
                                <div class="tool-name">${tool.name}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="workspace-area">
                    <h3>工作区域</h3>
                    <div id="workArea" style="background: white; min-height: 300px; border-radius: 8px; 
                         display: flex; align-items: center; justify-content: center; flex-direction: column; padding: 20px;">
                        <div style="font-size: 4em; margin-bottom: 20px;">🔧</div>
                        <p style="color: var(--light-text); text-align: center;">
                            选择左侧的工具开始虚拟维修操作<br>
                            根据提示完成各项维修任务
                        </p>
                        <button class="action-btn" style="margin-top: 20px;" onclick="startPracticeScenario()">
                            开始练习场景
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="score-panel">
                <h3>实操评分</h3>
                <div class="score-value" id="practiceScore">0</div>
                <p>完成更多操作来提高分数</p>
            </div>
        </div>
    `;
}

// 加载应急救援模块
function loadEmergencyModule() {
    const sidebar = document.getElementById('sidebar');
    const contentArea = document.getElementById('contentArea');
    
    sidebar.innerHTML = `
        <div class="menu-section">
            <h3>功能菜单</h3>
            <div class="menu-item active" onclick="showEmergencyScenarios()">
                <span class="menu-item-icon">🚨</span>
                <span>应急场景</span>
            </div>
            <div class="menu-item" onclick="showRescueProcedures()">
                <span class="menu-item-icon">🆘</span>
                <span>救援流程</span>
            </div>
            <div class="menu-item" onclick="startEmergencyExam()">
                <span class="menu-item-icon">📝</span>
                <span>应急考核</span>
            </div>
        </div>
    `;
    
    showEmergencyScenarios();
}

// 显示应急场景
function showEmergencyScenarios() {
    setActiveMenuItem(0);
    const contentArea = document.getElementById('contentArea');
    
    contentArea.innerHTML = `
        <div class="content-header">
            <h2>应急救援场景演练</h2>
            <p>学习各种应急情况的正确处理流程</p>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 20px;">
            ${emergencyScenarios.map(scenario => `
                <div class="emergency-scenario">
                    ${scenario.image ? `<img src="${scenario.image}" alt="${scenario.name}">` : ''}
                    <div style="padding: 20px 30px;">
                        <div class="scenario-header" style="margin: 0 0 20px 0;">
                            <h3>${scenario.name}</h3>
                            <div class="scenario-type">${scenario.type}</div>
                            <p style="margin-top: 10px; font-size: 0.95em;">${scenario.description}</p>
                        </div>
                        
                        <div style="padding: 20px; background: var(--light-bg); border-radius: 8px; margin-bottom: 15px;">
                            <h4 style="color: var(--primary-color); margin-bottom: 10px;">操作步骤</h4>
                            <p style="color: var(--light-text);">共 ${scenario.steps.length} 个步骤</p>
                        </div>
                        
                        <div style="text-align: center;">
                            <button class="action-btn" onclick="startEmergencyDrill('${scenario.id}')">
                                开始演练
                            </button>
                            <button class="action-btn" onclick="viewScenarioDetail('${scenario.id}')">
                                查看详情
                            </button>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// 显示救援流程
function showRescueProcedures() {
    setActiveMenuItem(1);
    const contentArea = document.getElementById('contentArea');
    
    const scenario = emergencyScenarios[0];
    
    contentArea.innerHTML = `
        <div class="content-header">
            <h2>困人救援标准流程</h2>
            <p>详细的救援操作步骤和安全注意事项</p>
        </div>
        
        <div class="emergency-scenario">
            <div class="scenario-header">
                <h3>${scenario.name}</h3>
                <p style="margin-top: 10px;">${scenario.description}</p>
            </div>
            
            <div class="rescue-steps" style="margin-top: 20px;">
                ${scenario.steps.map((step, index) => `
                    <div class="rescue-step" onclick="toggleRescueStep(${index})">
                        <div class="rescue-step-icon">${step.icon}</div>
                        <div class="rescue-step-content">
                            <h4>${step.title}</h4>
                            <p>${step.description}</p>
                            <p style="color: var(--secondary-color); font-size: 0.9em; margin-top: 5px;">
                                预计用时: ${step.time}
                            </p>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div style="background: #fff3cd; border: 2px solid var(--warning-color); padding: 20px; 
                 border-radius: 12px; margin-top: 25px;">
                <h4 style="color: var(--warning-color); margin-bottom: 15px;">⚠️ 安全注意事项</h4>
                <ul style="padding-left: 20px; line-height: 1.8;">
                    ${scenario.safetyNotes.map(note => `
                        <li style="color: var(--dark-text); margin-bottom: 8px;">${note}</li>
                    `).join('')}
                </ul>
            </div>
        </div>
    `;
}

// 开始应急考核
function startEmergencyExam() {
    setActiveMenuItem(2);
    const contentArea = document.getElementById('contentArea');
    
    contentArea.innerHTML = `
        <div class="content-header">
            <h2>应急救援考核</h2>
            <p>测试您的应急处理能力和知识掌握程度</p>
        </div>
        
        <div class="exam-container">
            <div class="exam-header">
                <h3>准备开始考核</h3>
                <div class="exam-timer" id="examTimer">20:00</div>
            </div>
            
            <div style="text-align: center; padding: 60px 20px;">
                <div style="font-size: 5em; margin-bottom: 30px;">📝</div>
                <h3 style="color: var(--primary-color); margin-bottom: 20px; font-size: 1.5em;">
                    电梯应急救援知识考核
                </h3>
                <p style="color: var(--light-text); font-size: 1.1em; margin-bottom: 30px; line-height: 1.8;">
                    本次考核共有 ${examQuestions.length} 道题目<br>
                    考核时间为 20 分钟<br>
                    每题只有一次作答机会<br>
                    请认真作答
                </p>
                <button class="exam-btn" onclick="beginExam()" style="font-size: 1.1em; padding: 15px 40px;">
                    开始考核
                </button>
            </div>
        </div>
    `;
}

// 开始考试
let currentQuestion = 0;
let examScore = 0;
let examAnswers = [];
let examTimer = null;

function beginExam() {
    currentQuestion = 0;
    examScore = 0;
    examAnswers = [];
    startExamTimer();
    showQuestion();
}

function startExamTimer() {
    let timeLeft = 20 * 60;
    const timerElement = document.getElementById('examTimer');
    
    examTimer = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (timeLeft <= 0) {
            clearInterval(examTimer);
            submitExam();
        }
    }, 1000);
}

function showQuestion() {
    const contentArea = document.getElementById('contentArea');
    const question = examQuestions[currentQuestion];
    
    contentArea.innerHTML = `
        <div class="content-header">
            <h2>应急救援考核</h2>
            <p>题目 ${currentQuestion + 1} / ${examQuestions.length}</p>
        </div>
        
        <div class="exam-container">
            <div class="exam-header">
                <h3>第 ${currentQuestion + 1} 题</h3>
                <div class="exam-timer" id="examTimer">20:00</div>
            </div>
            
            <div class="question-card">
                <div class="question-text">${question.question}</div>
                <div class="options-list">
                    ${question.options.map((option, index) => `
                        <div class="option-item" onclick="selectAnswer(${index})">
                            <div class="option-label">${String.fromCharCode(65 + index)}</div>
                            <div>${option}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="exam-actions">
                ${currentQuestion > 0 ? `
                    <button class="exam-btn" onclick="previousQuestion()">上一题</button>
                ` : ''}
                <button class="exam-btn" id="nextBtn" disabled onclick="nextQuestion()">
                    ${currentQuestion < examQuestions.length - 1 ? '下一题' : '提交答卷'}
                </button>
            </div>
        </div>
    `;
}

function selectAnswer(optionIndex) {
    document.querySelectorAll('.option-item').forEach((item, index) => {
        item.classList.toggle('selected', index === optionIndex);
    });
    
    examAnswers[currentQuestion] = optionIndex;
    document.getElementById('nextBtn').disabled = false;
}

function nextQuestion() {
    if (currentQuestion < examQuestions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        submitExam();
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
    }
}

function submitExam() {
    clearInterval(examTimer);
    
    examScore = 0;
    examQuestions.forEach((question, index) => {
        if (examAnswers[index] === question.correct) {
            examScore += 100 / examQuestions.length;
        }
    });
    
    showExamResults();
}

function showExamResults() {
    const contentArea = document.getElementById('contentArea');
    const passed = examScore >= 60;
    
    contentArea.innerHTML = `
        <div class="content-header">
            <h2>考核结果</h2>
            <p>查看您的考核成绩和详细解析</p>
        </div>
        
        <div class="result-panel">
            <h2>${passed ? '🎉 恭喜通过!' : '💪 继续努力!'}</h2>
            <div class="result-score">${Math.round(examScore)}</div>
            <div class="result-message">
                ${passed ? '您已掌握应急救援的基本知识' : '建议再次学习相关内容后重新考核'}
            </div>
            
            <div class="result-details">
                <h3 style="margin-bottom: 15px;">答题详情</h3>
                ${examQuestions.map((q, index) => {
                    const userAnswer = examAnswers[index];
                    const isCorrect = userAnswer === q.correct;
                    return `
                        <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                            <div style="margin-bottom: 10px;">
                                <strong>第${index + 1}题:</strong> ${q.question}
                            </div>
                            <div style="margin-bottom: 5px;">
                                您的答案: ${userAnswer !== undefined ? String.fromCharCode(65 + userAnswer) : '未作答'} 
                                ${isCorrect ? '✓' : '✗'}
                            </div>
                            ${!isCorrect ? `
                                <div style="margin-bottom: 5px;">
                                    正确答案: ${String.fromCharCode(65 + q.correct)}
                                </div>
                                <div style="font-size: 0.9em; opacity: 0.9;">
                                    解析: ${q.explanation}
                                </div>
                            ` : ''}
                        </div>
                    `;
                }).join('')}
            </div>
            
            <div style="margin-top: 30px;">
                <button class="exam-btn" onclick="startEmergencyExam()">重新考核</button>
                <button class="exam-btn" onclick="loadEmergencyModule()">返回学习</button>
            </div>
        </div>
    `;
    
    appState.userData.scores.emergency = Math.round(examScore);
    saveUserData();
}

// 辅助函数

function setActiveMenuItem(index) {
    document.querySelectorAll('.menu-item').forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });
}

function updateStatusBar(message) {
    document.getElementById('statusText').textContent = message;
}

function updateProgress() {
    const total = elevatorComponents.length + maintenanceFlows.length + emergencyScenarios.length;
    const completed = appState.userData.completedSteps.length;
    const progress = Math.round((completed / total) * 100);
    
    document.getElementById('progressText').textContent = `学习进度: ${progress}%`;
}

function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
}

function resetProgress() {
    if (confirm('确定要重置所有学习进度吗？')) {
        appState.userData = {
            progress: {},
            completedSteps: [],
            scores: {}
        };
        saveUserData();
        showToast('进度已重置', 'success');
        loadModule(appState.currentModule);
    }
}

// 动画和交互函数

function animateElevator() {
    const car = document.getElementById('elevatorCar');
    if (!car) return;
    
    const positions = [50, 200, 350];
    let currentPos = 0;
    
    const interval = setInterval(() => {
        currentPos = (currentPos + 1) % positions.length;
        car.style.top = positions[currentPos] + 'px';
        
        if (currentPos === 0) {
            clearInterval(interval);
            showToast('电梯运行演示完成', 'success');
        }
    }, 2000);
    
    showToast('电梯运行演示开始', 'info');
}

function toggleDoors() {
    const doorLeft = document.getElementById('doorLeft');
    const doorRight = document.getElementById('doorRight');
    
    if (!doorLeft || !doorRight) return;
    
    const isOpen = doorLeft.classList.contains('open');
    
    if (isOpen) {
        doorLeft.classList.remove('open');
        doorRight.classList.remove('open');
        showToast('电梯门已关闭', 'info');
    } else {
        doorLeft.classList.add('open');
        doorRight.classList.add('open');
        showToast('电梯门已打开', 'info');
    }
}

function filterComponents() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const cards = document.querySelectorAll('.component-card');
    
    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(searchTerm) ? 'block' : 'none';
    });
}

function filterBySystem(system) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    const cards = document.querySelectorAll('.component-card');
    cards.forEach(card => {
        if (system === 'all' || card.textContent.includes(system)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function markStepComplete(flowId, stepId) {
    const flow = maintenanceFlows.find(f => f.id === flowId);
    if (!flow) return;
    
    const step = flow.steps.find(s => s.id === stepId);
    if (!step) return;
    
    step.completed = !step.completed;
    
    const stepKey = `${flowId}-${stepId}`;
    if (step.completed) {
        if (!appState.userData.completedSteps.includes(stepKey)) {
            appState.userData.completedSteps.push(stepKey);
        }
        showToast('步骤已标记完成', 'success');
    } else {
        appState.userData.completedSteps = appState.userData.completedSteps.filter(s => s !== stepKey);
        showToast('步骤标记已取消', 'info');
    }
    
    saveUserData();
    showMaintenanceFlows();
}

function showStepDetail(flowId, stepId) {
    const flow = maintenanceFlows.find(f => f.id === flowId);
    const step = flow.steps.find(s => s.id === stepId);
    
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <h2 style="color: var(--primary-color); margin-bottom: 20px;">${step.title}</h2>
        <p style="font-size: 1.1em; line-height: 1.8; margin-bottom: 20px;">${step.description}</p>
        
        <h3 style="color: var(--primary-color); margin: 20px 0 10px;">详细操作指南</h3>
        <ul style="padding-left: 20px; line-height: 1.8;">
            <li>准备必要的工具和设备</li>
            <li>确保安全措施到位</li>
            <li>按照标准流程操作</li>
            <li>做好详细的记录</li>
            <li>完成后进行检查验证</li>
        </ul>
        
        <div style="text-align: center; margin-top: 30px;">
            <button class="action-btn" onclick="closeModal()">关闭</button>
        </div>
    `;
    
    modal.classList.add('active');
}

function completeFlow(flowId) {
    const flow = maintenanceFlows.find(f => f.id === flowId);
    const allCompleted = flow.steps.every(s => s.completed);
    
    if (allCompleted) {
        showToast(`${flow.name}已全部完成！`, 'success');
        appState.userData.progress[flowId] = true;
        saveUserData();
    } else {
        showToast('请完成所有步骤', 'warning');
    }
}

function resetFlow(flowId) {
    const flow = maintenanceFlows.find(f => f.id === flowId);
    flow.steps.forEach(step => {
        step.completed = false;
        const stepKey = `${flowId}-${step.id}`;
        appState.userData.completedSteps = appState.userData.completedSteps.filter(s => s !== stepKey);
    });
    
    saveUserData();
    showMaintenanceFlows();
    showToast('流程已重置', 'info');
}

function startFaultPractice(faultId) {
    showToast('故障排除练习模式启动', 'info');
}

function selectTool(toolId) {
    document.querySelectorAll('.tool-item').forEach(item => {
        item.classList.remove('selected');
    });
    event.target.closest('.tool-item').classList.add('selected');
    
    showToast('工具已选择', 'success');
}

function startPracticeScenario() {
    const workArea = document.getElementById('workArea');
    
    const scenarios = [
        { task: '给导轨添加润滑油', tool: '🛢️', steps: 3 },
        { task: '检查钢丝绳状况', tool: '🔦', steps: 4 },
        { task: '调整门机参数', tool: '🪛', steps: 5 }
    ];
    
    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    
    workArea.innerHTML = `
        <div style="text-align: center;">
            <h3 style="color: var(--primary-color); margin-bottom: 20px;">实操任务</h3>
            <div style="font-size: 3em; margin-bottom: 20px;">${scenario.tool}</div>
            <p style="font-size: 1.2em; margin-bottom: 20px;">${scenario.task}</p>
            <div style="background: var(--light-bg); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <p>请选择正确的工具并完成 ${scenario.steps} 个操作步骤</p>
            </div>
            <button class="action-btn success" onclick="completePractice()">完成操作</button>
        </div>
    `;
}

function completePractice() {
    const currentScore = parseInt(document.getElementById('practiceScore').textContent);
    const newScore = currentScore + Math.floor(Math.random() * 20) + 10;
    
    document.getElementById('practiceScore').textContent = newScore;
    showToast('操作完成！得分 +10', 'success');
    
    setTimeout(() => {
        startPracticeScenario();
    }, 1500);
}

function startEmergencyDrill(scenarioId) {
    const scenario = emergencyScenarios.find(s => s.id === scenarioId);
    
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <h2 style="color: var(--danger-color); margin-bottom: 20px;">
            ${scenario.name} - 演练模式
        </h2>
        <p style="font-size: 1.1em; margin-bottom: 30px;">${scenario.description}</p>
        
        <div class="rescue-steps">
            ${scenario.steps.map((step, index) => `
                <div class="rescue-step">
                    <div class="rescue-step-icon">${step.icon}</div>
                    <div class="rescue-step-content">
                        <h4>${step.title}</h4>
                        <p>${step.description}</p>
                        <button class="action-btn" style="margin-top: 10px;" 
                                onclick="markDrillStepComplete(${index})">
                            完成此步骤
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
        
        <div style="text-align: center; margin-top: 30px;">
            <button class="action-btn success" onclick="completeDrill('${scenarioId}')">
                完成演练
            </button>
            <button class="action-btn" onclick="closeModal()">关闭</button>
        </div>
    `;
    
    modal.classList.add('active');
}

function markDrillStepComplete(stepIndex) {
    const steps = document.querySelectorAll('.rescue-step');
    if (steps[stepIndex]) {
        steps[stepIndex].classList.add('completed');
        showToast('步骤完成', 'success');
    }
}

function completeDrill(scenarioId) {
    showToast('演练完成！', 'success');
    closeModal();
    
    if (!appState.userData.completedSteps.includes(scenarioId)) {
        appState.userData.completedSteps.push(scenarioId);
        saveUserData();
    }
}

function viewScenarioDetail(scenarioId) {
    const scenario = emergencyScenarios.find(s => s.id === scenarioId);
    
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        ${scenario.image ? `<img src="${scenario.image}" alt="${scenario.name}" style="width: 100%; max-width: 600px; height: 300px; object-fit: cover; border-radius: 12px; margin-bottom: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">` : ''}
        <h2 style="color: var(--primary-color); margin-bottom: 20px;">${scenario.name}</h2>
        <div class="scenario-type" style="margin-bottom: 20px;">${scenario.type}</div>
        <p style="font-size: 1.1em; margin-bottom: 30px;">${scenario.description}</p>
        
        <h3 style="color: var(--primary-color); margin: 20px 0 15px;">详细步骤</h3>
        ${scenario.steps.map((step, index) => `
            <div style="background: var(--light-bg); padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                <div style="display: flex; gap: 15px; align-items: start;">
                    <div style="font-size: 2em;">${step.icon}</div>
                    <div>
                        <h4 style="color: var(--primary-color); margin-bottom: 5px;">
                            ${index + 1}. ${step.title}
                        </h4>
                        <p style="color: var(--light-text); margin-bottom: 5px;">${step.description}</p>
                        <p style="color: var(--secondary-color); font-size: 0.9em;">用时: ${step.time}</p>
                    </div>
                </div>
            </div>
        `).join('')}
        
        <h3 style="color: var(--danger-color); margin: 20px 0 15px;">⚠️ 安全注意事项</h3>
        <ul style="padding-left: 20px; line-height: 1.8;">
            ${scenario.safetyNotes.map(note => `
                <li style="margin-bottom: 10px;">${note}</li>
            `).join('')}
        </ul>
        
        <div style="text-align: center; margin-top: 30px;">
            <button class="action-btn" onclick="closeModal()">关闭</button>
        </div>
    `;
    
    modal.classList.add('active');
}

function toggleRescueStep(index) {
    const steps = document.querySelectorAll('.rescue-step');
    if (steps[index]) {
        steps[index].classList.toggle('completed');
    }
}

// 点击模态框背景关闭
document.addEventListener('click', function(e) {
    const modal = document.getElementById('modal');
    if (e.target === modal) {
        closeModal();
    }
});
