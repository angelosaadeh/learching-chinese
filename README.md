# Learning Chinese

Flashcards for practicing HSK vocabulary (HSK1–HSK4). Click a card to reveal the
pinyin, click again for the definition, and filter by HSK level.

HSK5 and HSK6 vocabulary isn't included yet — if you'd like to help add them, feel
free to get in touch.

## Use it

- **Online:** [angelosaadeh.fr/#chinese](https://angelosaadeh.fr/#chinese)
- **Locally:** download or clone this repo and open `chinese_learning.html` in any
  web browser — no server or build step needed.

## iPhone widgets (Scriptable)

You can show a random Chinese word on your Home Screen or Lock Screen using the
free [Scriptable](https://scriptable.app) app:

1. Install **Scriptable** from the App Store.
2. Open it and tap **+** to create a new script.
3. Copy and paste one of the scripts from the [`scriptable/`](scriptable) folder:
   - [`chinese-word-home.js`](scriptable/chinese-word-home.js) — Home Screen widget
   - [`chinese-word-lock.js`](scriptable/chinese-word-lock.js) — Lock Screen (rectangular) widget
4. Add a Scriptable widget to your Home/Lock Screen, then long-press it → **Edit
   Widget** and select the script you just created.

The widget pulls a new word every 10 minutes. To choose which HSK levels appear,
set the widget **Parameter** to a comma-separated list (e.g. `HSK1,HSK2`), or edit
the `DEFAULT_LEVELS` line at the top of the script.
