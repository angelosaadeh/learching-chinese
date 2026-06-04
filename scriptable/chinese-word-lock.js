// Chinese Word – Lock Screen (Rectangular)
const DEFAULT_LEVELS = "HSK1,HSK2,HSK3" // edit fallback here
const levels = (Script.widgetParameter || DEFAULT_LEVELS).trim()
const URL = "https://angelosaadeh.fr/api/chinese-word.php?levels=" + encodeURIComponent(levels)

let widget = new ListWidget()

let data
try {
let req = new Request(URL)
data = await req.loadJSON()
} catch(e) {
let err = widget.addText("offline")
err.font = Font.systemFont(10)
Script.setWidget(widget)
Script.complete()
return
}
let top = widget.addStack()
top.layoutHorizontally()

let char = top.addText(data.char)
char.font = Font.boldSystemFont(22)

top.addSpacer(8)

let right = top.addStack()
right.layoutVertically()

let pinyin = right.addText(data.pinyin)
pinyin.font = Font.systemFont(10)

widget.addSpacer(2)

let def = widget.addText(data.definition)
def.font = Font.systemFont(11)
def.lineLimit = 1

widget.refreshAfterDate = new Date(Date.now() + 10 * 60 * 1000)

Script.setWidget(widget)
Script.complete()
