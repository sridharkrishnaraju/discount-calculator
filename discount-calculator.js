/**
 * <discount-calculator> — original price + discount % → final price & you save. Zero dependencies.
 * Built & maintained by SGBP — Singapore Build Partners (https://sgbp.tech). MIT.
 */
class DiscountCalculator extends HTMLElement {
  constructor() { super(); this.attachShadow({ mode: "open" }); }
  connectedCallback() { this.render(); }
  _num(v) { const n = parseFloat(String(v).replace(/[^0-9.]/g, "")); return isFinite(n) ? n : NaN; }
  _fmt(n) { return n.toLocaleString("en-SG", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
  _calc() {
    const $ = (s) => this.shadowRoot.querySelector(s);
    const price = this._num($("#in").value);   // #in = original price (ToolExample target)
    const pct = this._num($("#pct").value);
    const out = $("#out");
    if (!isFinite(price) || !isFinite(pct)) { out.style.display = "none"; return; }
    const save = price * (pct / 100);
    const final = price - save;
    out.style.display = "block";
    $("#final").textContent = "$" + this._fmt(Math.max(final, 0));
    $("#save").textContent = "You save $" + this._fmt(Math.max(save, 0)) + " (" + (pct || 0) + "% off)";
  }
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        *,*::before,*::after{box-sizing:border-box}
        :host{display:block;width:100%;max-width:460px;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif}
        .card{border:1px solid #e2e2e2;border-radius:12px;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.06);padding:16px}
        .row{display:flex;gap:12px}
        .fld{flex:1;min-width:0;margin-bottom:6px}
        label{display:block;font-size:12px;font-weight:600;color:#555;margin-bottom:6px}
        .ig{position:relative}
        .ig .pre{position:absolute;left:11px;top:50%;transform:translateY(-50%);font-size:14px;color:#888}
        input{width:100%;padding:10px 12px;border:1px solid #ccc;border-radius:8px;font-size:16px}
        .ig.cur input{padding-left:24px}
        .ig.pct input{padding-right:28px}
        .ig .suf{position:absolute;right:11px;top:50%;transform:translateY(-50%);font-size:14px;color:#888}
        .out{display:none;margin-top:14px;background:#fafafa;border:1px solid #eee;border-radius:10px;padding:14px;text-align:center}
        .final{font-size:28px;font-weight:800;color:#111}
        .save{font-size:13px;color:#137333;font-weight:600;margin-top:4px}
        .reset{margin-top:12px;font:inherit;font-size:12px;font-weight:700;color:#555;background:#fff;border:1px solid #ccc;border-radius:8px;padding:8px 12px;cursor:pointer}
      </style>
      <div class="card">
        <div class="row">
          <div class="fld"><label>Original price</label>
            <div class="ig cur"><span class="pre">$</span><input id="in" type="text" inputmode="decimal" placeholder="100.00"></div></div>
          <div class="fld"><label>Discount</label>
            <div class="ig pct"><input id="pct" type="text" inputmode="decimal" placeholder="20"><span class="suf">%</span></div></div>
        </div>
        <div class="out" id="out">
          <div class="final" id="final">$0.00</div>
          <div class="save" id="save"></div>
        </div>
        <button class="reset" id="reset">Reset</button>
      </div>`;
    const $ = (s) => this.shadowRoot.querySelector(s);
    $("#in").addEventListener("input", () => this._calc());
    $("#pct").addEventListener("input", () => this._calc());
    $("#reset").addEventListener("click", () => { $("#in").value = ""; $("#pct").value = ""; $("#out").style.display = "none"; $("#in").focus(); });
  }
}
if (!customElements.get("discount-calculator")) customElements.define("discount-calculator", DiscountCalculator);
