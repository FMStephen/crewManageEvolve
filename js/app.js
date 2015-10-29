angular.module('app',['ui.router','ngCookies']);

var currentUser = {};

var boyslove = "isayserious";

var school = [  {"name": "请选择","value": ""},
                {"name": "C.材料科学与工程学院","value": "材料科学与工程学院"},
        		{"name": "D.电子与信息学院","value": "电子与信息学院"},
        		{"name": "D.电力学院","value": "电力学院"},
        		{"name": "F.法学院(知识产权学院)","value": "法学院(知识产权学院)"},
        		{"name": "G.国际教育学院","value": "国际教育学院"},
        		{"name": "G.工商管理学院(创业教育学院)","value": "工商管理学院(创业教育学院)"},
        		{"name": "G.公共管理学院","value": "公共管理学院"},
        		{"name": "H.环境与能源学院","value": "环境与能源学院"},
        		{"name": "H.化学与化工学院","value": "化学与化工学院"},
        		{"name": "J.机械与汽车工程学院","value": "机械与汽车工程学院"},
        		{"name": "J.计算机科学与工程学院","value": "计算机科学与工程学院"},
       		    {"name": "J.建筑学院","value": "建筑学院"},
    			{"name": "J.经济与贸易学院","value": "经济与贸易学院"},
        		{"name": "L.理学院(数学系 物理系)","value": "理学院(数学系 物理系)"},
        		{"name": "Q.轻工与食品学院","value": "轻工与食品学院"},
        		{"name": "R.软件学院","value": "软件学院"},
        		{"name": "S.生物科学与工程学院","value": "生物科学与工程学院"},
        		{"name": "S.思想政治学院","value": "思想政治学院"},
        		{"name": "S.设计学院","value": "设计学院"},
        		{"name": "T.土木与交通学院","value": "土木与交通学院"},
        		{"name": "T.体育学院","value": "体育学院"},
        		{"name": "W.外国语学院","value": "外国语学院"},
        		{"name": "X.新闻与传播学院","value": "新闻与传播学院"},
        		{"name": "Y.艺术学院","value": "艺术学院"},
        		{"name": "Y.医学院","value": "医学院"},
        		{"name": "Z.自动化科学与工程学院","value": "自动化科学与工程学院"},
  			];

var gender = [  {"name": "请选择","value": ""},
                {"name": "男","value": "男"},
                {"name": "女","value": "女"}
                 ];

var dprt = [    {"name": "所有部门","value": ""},
                {"name": "B.编辑部","value": "编辑部"},
                {"name": "C.策划推广部","value": "策划推广部"},
                {"name": "J.技术部","value": "技术部"},
                {"name": "J.节目部","value": "节目部"},
                {"name": "R.人力资源部","value": "人力资源部"},
                {"name": "S.视觉设计部","value": "视觉设计部"},
                {"name": "S.视频部","value": "视频部"}, 
                {"name": "W.外联部","value": "外联部"},
                {"name": "Z.综合管理部","value": "综合管理部"},
                {"name": "Z.综合新闻部","value": "综合新闻部"}
            ];

var position = [    {"name": "所有职位","value": ""},
                    {"name": "干事","value": "干事"},
                    {"name": "主管","value": "主管"},
                    {"name": "部长","value": "部长"},
                    {"name": "常委","value": "常委"}
                ];