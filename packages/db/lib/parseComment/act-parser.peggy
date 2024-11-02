{{
	/**
	 * API 获取的活动评论语法定义
	 * @license AGPL-3.0-or-later
	 */
	import { textToDate } from '../util';
	import { parseDate } from './parseDate';
	import getGroupExpr from './groupExpr';
	import { decodeHTML } from 'entities';
}}

Act
	= title:Title strings:Page* details:DetailH2* groupExpr:GroupExpr stages:Stages {
		return { title, detail: { title, strings, details }, groupExpr, stages };
	}

Title '活动标题'
	= AttrH1Start @ContentLine AttrH1End

DetailH2
	= AttrH2Start !(GroupExprTitle / StagesTitle) title:ContentLine AttrH2End strings:Page* details:DetailH3* {
		return { title, strings, details };
	}
DetailH3
	= AttrH3Start title:ContentLine AttrH3End strings:Page* details:DetailH4* {
		return { title, strings, details };
	}
DetailH4
	= AttrH4Start title:ContentLine AttrH4End strings:Page* {
		return { title, strings, details: [] };
	}

GroupExprTitle '面向群体'
	= '面向群体'
GroupExpr
	= AttrH2Start GroupExprTitle AttrH2End lines:Page {
		return getGroupExpr(decodeHTML(lines).split('\n'));
	}

StagesTitle '时间安排'
	= '时间安排'
Stages
	= AttrH2Start StagesTitle AttrH2End @Stage+
Stage
	= AttrH3Start name:ContentLine AttrH3End timeSteps:StageDateP details:StageDetail* {
		return { name, timeSteps, details };
	}
StageDateP
	= lines:Page {
		return parseDate(lines, options.floor);
	}
StageDetail
	= Page

Page
	= AttrPStart @Content AttrPEnd

AttrPStart '<p>'
	= _ '<p' ContentLine '>' _
AttrH1Start '<h1>'
	= _ '<h1' ContentLine '>' _
AttrH2Start '<h2>'
	= _ '<h2' ContentLine '>' _
AttrH3Start '<h3>'
	= _ '<h3' ContentLine '>' _
AttrH4Start '<h4>'
	= _ '<h4' ContentLine '>' _
AttrPEnd '<p>'
	= _ '</p>' _
AttrH1End '</h1>'
	= _ '</h1>' _
AttrH2End '</h2>'
	= _ '</h2>' _
AttrH3End '</h3>'
	= _ '</h3>' _
AttrH4End '</h4>'
	= _ '</h4>' _
AttrBr '<br />'
	= _ '<br' ContentLine '/'? '>' _
AttrDouble '&amp;'
	= _ '&amp;' _

Content '带<br>的非HTML内容'
	= lines:ContentLine|..,AttrBr| { return lines.join('\n'); }
ContentLine '单行非HTML内容'
	= $[^<>]*

Day '日子'
	= [1-9]
	/ [1-2] Digit
	/ '3' [0-1]
Month '月份'
	= [1-9]
	/ '1' [0-2]
Year '年份'
	= [1-2] Digit|3|
Number '数字'
	= [1-9] Digit*
Digit '个位数'
	= [0-9]

_ '空字符'
	= [ \t\n\r]*
