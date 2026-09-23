/* ====================================================================
   AI 素養課程學習單網站 — 共用版型（頁首／導覽／頁尾）
   純 React.createElement 寫成（不用 JSX），所以可以用一般 <script src>
   直接載入，不需要經過 Babel 轉譯，也不需要任何 build step。
   載入順序：React / ReactDOM → 這支檔案 → 各頁自己的 text/babel 內容。
   ==================================================================== */
(function (global) {
  const h = React.createElement;

  const MODULES = [
    { id: "00", file: "module00.html", type: "純內容展示", title: "課程定位",
      cardDesc: "這門課在教什麼、不教什麼，先建立共同期待。" },
    { id: "01", file: "module01.html", type: "內容展示＋練習題", title: "AI 時代的研究",
      cardDesc: "對話型 AI 與 AI 代理，在研究中各自扮演什麼角色。" },
    { id: "02", file: "module02.html", type: "內容展示＋練習題", title: "研究需求與提示詞反思",
      cardDesc: "提示詞不是起點，先想清楚自己真正需要什麼。" },
    { id: "03", file: "module03.html", type: "內容展示＋練習題", title: "AI 輔助研究流程",
      cardDesc: "研究歷程六階段，AI 可以介入哪裡、人必須把關哪裡。" },
    { id: "04", file: "module04-student.html", type: "完整互動＋繳交＋批改", title: "證據、資料庫與文獻品質",
      cardDesc: "AI 產出 → 資料庫查證 → 比較與修正 → 反思，送出後由老師批改。" },
    { id: "05", file: "module05.html", type: "網頁化填答表單", title: "AI 輔助閱讀",
      cardDesc: "先讀—再問—回原文核對，20 題四階段學習單。" },
    { id: "06", file: "module06.html", type: "內容展示＋練習題", title: "研究驗證框架",
      cardDesc: "來源、脈絡、比對、責任——一套可以重複使用的驗證框架。" },
    { id: "07", file: "module07.html", type: "內容展示＋互動測驗", title: "負責任研究",
      cardDesc: "ROBOT test 小測驗，加上 AI 揭露決策卡。" }
  ];

  function SiteHeader() {
    return h("header", { className: "site-header" },
      h("div", { className: "site-header__inner" },
        h("a", { className: "site-header__brand", href: "index.html" },
          h("span", { className: "site-header__brand-eyebrow" }, "AI 素養工作坊"),
          h("span", { className: "site-header__brand-title" }, "課程學習單")
        ),
        h("a", { className: "site-header__home-link", href: "index.html" }, "回課程首頁")
      )
    );
  }

  function SiteFooter() {
    return h("footer", { className: "site-footer" },
      h("div", { className: "site-footer__inner" },
        h("span", null, "AI 素養工作坊｜課程學習單網站"),
        h("span", null, "單場課程使用，不提供長期進度儲存。")
      )
    );
  }

  function ModuleGoals({ goals }) {
    if (!goals || !goals.length) return null;
    return h("div", { className: "module-goals" },
      h("p", { className: "module-goals__title" }, "學習目標"),
      h("ul", null, goals.map((g, i) => h("li", { key: i }, g)))
    );
  }

  function ModuleHero({ id, type, title, intro, goals }) {
    return h("header", { style: { marginBottom: 40 } },
      h("p", { className: "module-eyebrow" }, "MODULE " + id + " ｜ " + type),
      h("h1", { className: "module-title" }, title),
      intro ? h("p", { className: "hint", style: { fontSize: 15, lineHeight: 1.8 } }, intro) : null,
      h(ModuleGoals, { goals: goals })
    );
  }

  function Block({ title, children }) {
    return h("section", { className: "block" },
      title ? h("h2", null, title) : null,
      children
    );
  }

  function ReflectionQuestions({ questions }) {
    if (!questions || !questions.length) return null;
    return h("ul", { className: "reflection-list" },
      questions.map((q, i) => h("li", { key: i }, q))
    );
  }

  function PracticeNote({ text }) {
    return h("span", { className: "practice-note" }, text || "練習用，僅供自我檢視，不會送出或儲存");
  }

  function PracticeField({ label, hint, value, onChange, rows, placeholder }) {
    return h("div", { style: { marginBottom: 18 } },
      h("label", { className: "field-label", style: { display: "block", fontWeight: 600, fontSize: 14, marginBottom: 6 } },
        label,
        hint ? h("span", { className: "hint" }, " — " + hint) : null
      ),
      h("textarea", {
        rows: rows || 4,
        value: value,
        onChange: onChange,
        placeholder: placeholder || "請輸入你的答案..."
      })
    );
  }

  function ModulePager({ currentId }) {
    const idx = MODULES.findIndex((m) => m.id === currentId);
    const prev = idx > 0 ? MODULES[idx - 1] : null;
    const next = idx >= 0 && idx < MODULES.length - 1 ? MODULES[idx + 1] : null;
    return h("nav", { className: "module-pager" },
      prev
        ? h("a", { className: "module-pager__link", href: prev.file },
            h("span", { className: "module-pager__label" }, "← 上一個"),
            "Module " + prev.id + "｜" + prev.title
          )
        : h("span", { className: "module-pager__link", style: { visibility: "hidden" } }),
      h("a", { className: "module-pager__home", href: "index.html" }, "回首頁"),
      next
        ? h("a", { className: "module-pager__link module-pager__link--next", href: next.file },
            h("span", { className: "module-pager__label" }, "下一個 →"),
            "Module " + next.id + "｜" + next.title
          )
        : h("span", { className: "module-pager__link", style: { visibility: "hidden" } })
    );
  }

  global.SiteShared = {
    MODULES: MODULES,
    SiteHeader: SiteHeader,
    SiteFooter: SiteFooter,
    ModuleHero: ModuleHero,
    ModuleGoals: ModuleGoals,
    Block: Block,
    ReflectionQuestions: ReflectionQuestions,
    PracticeNote: PracticeNote,
    PracticeField: PracticeField,
    ModulePager: ModulePager
  };
})(window);
