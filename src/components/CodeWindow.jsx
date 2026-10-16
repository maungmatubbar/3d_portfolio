import React from "react";

// A polished, fake code-editor surface used to show a "coding view".
// Tokens are hand-colored with a Material-ocean-ish palette so the snippet
// reads like a real editor without pulling in a syntax-highlighting library.
const c = {
  cmt: "#5b6170",
  kw: "#c792ea",
  fn: "#82aaff",
  str: "#c3e88d",
  dec: "#ffcb6b",
  num: "#f78c6c",
  punc: "#89ddff",
  txt: "#c6cae6",
};

const T = ({ k, children }) => <span style={{ color: c[k] }}>{children}</span>;

// Representative snippet: a webhook that reconciles a payment in real time
// and fires an automation event — exactly the kind of work described above.
const defaultLines = [
  [{ k: "cmt", t: "// payment.webhook.ts — reconcile in real time" }],
  [
    { k: "dec", t: "@Post" },
    { k: "punc", t: "(" },
    { k: "str", t: "'stripe'" },
    { k: "punc", t: ")" },
  ],
  [
    { k: "kw", t: "async " },
    { k: "fn", t: "handle" },
    { k: "punc", t: "(@" },
    { k: "fn", t: "Body" },
    { k: "punc", t: "() evt" },
    { k: "punc", t: ": " },
    { k: "fn", t: "StripeEvent" },
    { k: "punc", t: ") {" },
  ],
  [
    { k: "kw", t: "  const " },
    { k: "txt", t: "order = " },
    { k: "kw", t: "await " },
    { k: "txt", t: "this.orders." },
    { k: "fn", t: "match" },
    { k: "punc", t: "(evt.id)" },
  ],
  [
    { k: "kw", t: "  await " },
    { k: "txt", t: "this.ledger." },
    { k: "fn", t: "reconcile" },
    { k: "punc", t: "(order, evt.amount)" },
  ],
  [
    { k: "kw", t: "  return " },
    { k: "txt", t: "this.n8n." },
    { k: "fn", t: "emit" },
    { k: "punc", t: "(" },
    { k: "str", t: "'payment.settled'" },
    { k: "punc", t: ", order)" },
  ],
  [{ k: "punc", t: "}" }],
];

const CodeWindow = ({
  filename = "payment.webhook.ts",
  lang = "TypeScript",
  lines = defaultLines,
  className = "",
}) => (
  <div className={`glass-strong rounded-2xl overflow-hidden shadow-glow ${className}`}>
    {/* Title bar */}
    <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
      <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
      <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
      <span className="w-3 h-3 rounded-full bg-[#28c840]" />
      <span className="ml-3 text-secondary text-[12px] font-mono truncate">{filename}</span>
      <span className="ml-auto text-[10px] font-mono px-2 py-0.5 rounded-md bg-accent/10 text-accent-soft border border-accent/20">
        {lang}
      </span>
    </div>

    {/* Code body */}
    <div className="p-4 sm:p-5 overflow-x-auto">
      <pre className="font-mono text-[12.5px] sm:text-[13px] leading-[22px]">
        <code>
          {lines.map((line, i) => (
            <div key={i} className="flex">
              <span className="select-none text-secondary/30 w-7 shrink-0 text-right pr-3">
                {i + 1}
              </span>
              <span className="whitespace-pre">
                {line.map((tok, j) => (
                  <T key={j} k={tok.k}>
                    {tok.t}
                  </T>
                ))}
              </span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  </div>
);

export default CodeWindow;
