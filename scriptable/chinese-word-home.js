// Chinese Word – Home Screen
const DEFAULT_LEVELS = "HSK1,HSK2,HSK3" // edit fallback here
const levels = (Script.widgetParameter || DEFAULT_LEVELS).trim()
const URL = "https://angelosaadeh.fr/api/chinese-word.php?levels=" + encodeURIComponent(levels)

let widget = new ListWidget()
widget.backgroundColor = new Color("#b8bcd4")

let data
try {
let req = new Request(URL)
data = await req.loadJSON()
} catch(e) {
let err = widget.addText("offline")
err.textColor = new Color("#ffffff", 0.5)
Script.setWidget(widget)
return
}

let hskLabel = widget.addText(data.hsk)
hskLabel.font = Font.systemFont(9)
hskLabel.textColor = new Color("#ffffff", 0.55)

widget.addSpacer(4)

let char = widget.addText(data.char)
char.font = Font.boldSystemFont(36)
char.textColor = new Color("#ffffff", 0.95)

let pinyin = widget.addText(data.pinyin)
pinyin.font = Font.systemFont(11)
pinyin.textColor = new Color("#ffffff", 0.7)

widget.addSpacer(4)

let def = widget.addText(data.definition)
def.font = Font.systemFont(11)
def.textColor = new Color("#ffffff", 0.7)
def.lineLimit = 2

widget.refreshAfterDate = new Date(Date.now() + 10 * 60 * 1000)

Script.setWidget(widget)
Script.complete()
