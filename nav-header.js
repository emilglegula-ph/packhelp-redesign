// Single source of truth for the top nav — the ONLY component for site
// navigation. Never rebuild nav markup inline on a page; add a placeholder
// here instead and edit this file.
//
// Two variants:
// - Full nav (megamenu, search, sticky-cta) — used on marketing/catalog
//   pages. Placeholders: <div id="ph-sticky-bar"></div> and
//   <div id="ph-nav-wrapper"></div>.
// - Simplified nav (centered logo only) — used on focused/flow pages
//   (checkout-style, no distractions). Placeholder: <div id="ph-nav-simple"></div>.
// A page uses one variant or the other, never both.

var STICKY_BAR_HTML = `
<div class="sticky-bar" id="stickyBar">
  <nav class="sticky-links" id="stickyLinks">
    <a href="packaging.html">Packaging</a>
    <a href="packaging.html">Merchandise<span class="nav-badge-new">New</span></a>
    <a href="industries.html">Industries</a>
  </nav>

  <div class="search-wrap" id="searchWrap">
    <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
    <input type="text" placeholder="Search products by names, needs, categories...">
  </div>

  <div class="sticky-cta" id="stickyCta">
    <a href="get-a-quote.html" class="btn-pill sm secondary">Get a quote</a>
    <button class="btn-pill sm">
      <span class="cta-avatars sm">
        <span class="cta-avatar"><img src="assets/expert-01.png" alt=""></span>
        <span class="cta-avatar"><img src="assets/expert-02.png" alt=""></span>
        <span class="cta-avatar"><img src="assets/expert-03.png" alt=""></span>
      </span>
      Book an expert call
    </button>
  </div>
</div>
`;

var NAV_WRAPPER_HTML = `
<div class="nav-wrapper">
    <div class="nav-row1">
      <a href="index.html" aria-label="Packhelp" style="display:flex;">
        <img class="logo" src="assets/logo-packhelp.1iheyVke.svg" alt="Packhelp">
      </a>

      <div style="display:flex; align-items:center; gap:1rem;">
        <a href="#" class="signin-link">Sign In</a>
        <span class="flag-badge"><img src="assets/gb.svg" alt="GB"></span>
        <button class="icon-btn" aria-label="Cart">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6h15l-1.5 9h-12z"/><path d="M6 6 5 3H2"/><circle cx="9" cy="20" r="1"/><circle cx="17" cy="20" r="1"/></svg>
        </button>
      </div>
    </div>

    <nav class="topbar">
    <ul class="nav-links desktop-only">
      <li class="nav-item-packaging"><a href="packaging.html">Packaging</a></li>
      <li><a href="packaging.html">Merchandise<span class="nav-badge-new">New</span></a></li>
      <li><a href="industries.html">Industries</a></li>
      <li><a href="case-studies.html">Case studies</a></li>
      <li><a href="sample-packs.html">Samples</a></li>
    </ul>

    <div class="nav-megamenu">
      <div class="nav-megamenu-inner">
        <div class="nav-megamenu-col">
          <div class="nav-megamenu-group">
            <p class="nav-megamenu-title">Boxes</p>
            <ul>
              <li><a href="packaging.html">Mailer Boxes</a></li>
              <li><a href="packaging.html">Shipping Boxes</a></li>
              <li>
                <a href="packaging.html">Product Boxes</a>
                <ul class="nav-megamenu-sublist">
                  <li><a href="packaging.html">Folding Cartons</a></li>
                  <li><a href="packaging.html">Rigid Boxes</a></li>
                </ul>
              </li>
            </ul>
          </div>
          <div class="nav-megamenu-group">
            <p class="nav-megamenu-title">Packaging Tubes</p>
            <ul>
              <li><a href="packaging.html">Tube Boxes</a></li>
              <li><a href="packaging.html">Mailing Tubes</a></li>
            </ul>
          </div>
          <div class="nav-megamenu-group">
            <p class="nav-megamenu-title">Mailing Bags</p>
            <ul>
              <li><a href="packaging.html">Poly Mailers</a></li>
              <li><a href="packaging.html">Paper Mailing Bags</a></li>
            </ul>
          </div>
        </div>

        <div class="nav-megamenu-col">
          <div class="nav-megamenu-group">
            <p class="nav-megamenu-title">Product Bags</p>
            <ul>
              <li><a href="packaging.html">Drawstring Bags</a></li>
              <li><a href="packaging.html">Zip Lock Bags</a></li>
            </ul>
          </div>
          <div class="nav-megamenu-group">
            <p class="nav-megamenu-title">Carrier Bags</p>
            <ul>
              <li><a href="packaging.html">Paper Carrier Bags</a></li>
              <li><a href="packaging.html">Cotton Carrier Bags</a></li>
            </ul>
          </div>
          <div class="nav-megamenu-group">
            <p class="nav-megamenu-title">Accessories</p>
            <ul>
              <li><a href="packaging.html">Tissue &amp; wrapping paper</a></li>
              <li><a href="packaging.html">Fillers</a></li>
              <li><a href="packaging.html">Tapes</a></li>
              <li><a href="packaging.html">Labels</a></li>
              <li><a href="packaging.html">Stickers</a></li>
              <li><a href="packaging.html">Other</a></li>
            </ul>
          </div>
        </div>

        <div class="nav-megamenu-col">
          <div class="nav-megamenu-group">
            <p class="nav-megamenu-title">Pouches</p>
          </div>
          <div class="nav-megamenu-group">
            <p class="nav-megamenu-title">Envelopes</p>
            <ul>
              <li><a href="packaging.html">Cardboard</a></li>
              <li><a href="packaging.html">Padded</a></li>
            </ul>
          </div>
          <div class="nav-megamenu-group">
            <p class="nav-megamenu-title">Food Packaging</p>
            <ul>
              <li><a href="packaging.html">Pizza Boxes</a></li>
              <li><a href="packaging.html">Cups and Cup Accessories</a></li>
            </ul>
          </div>
          <div class="nav-megamenu-group">
            <p class="nav-megamenu-title">Containers</p>
            <ul>
              <li><a href="packaging.html">Bottles</a></li>
              <li><a href="packaging.html">Jars</a></li>
            </ul>
          </div>
          <div class="nav-megamenu-group">
            <p class="nav-megamenu-title">Samples</p>
            <ul>
              <li><a href="sample-packs.html">Sample Packs</a></li>
            </ul>
          </div>
          <div class="nav-megamenu-group">
            <p class="nav-megamenu-title">Bundles</p>
          </div>
        </div>

        <div class="nav-megamenu-divider"></div>

        <div class="nav-megamenu-col">
          <div class="nav-megamenu-group">
            <p class="nav-megamenu-title">Custom packaging</p>
            <ul>
              <li><a href="build-your-box.html">Custom Boxes</a></li>
              <li><a href="build-your-box.html">Custom Tubes</a></li>
              <li><a href="build-your-box.html">Custom Mailing Bags</a></li>
              <li><a href="build-your-box.html">Custom Accessories</a></li>
              <li><a href="build-your-box.html">Custom Pouches</a></li>
              <li><a href="build-your-box.html">Custom Packaging Bags</a></li>
              <li><a href="build-your-box.html">Custom Envelopes</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <ul class="nav-links desktop-only">
      <li><a href="deals.html">Deals</a></li>
      <li><a href="#">Solutions</a></li>
      <li><a href="#">Inspirations</a></li>
      <li><a href="contact.html">Contact</a></li>
      <li><a href="get-a-quote.html" class="btn-pill sm secondary">Get a quote</a></li>
      <li><button class="btn-pill sm">
        <span class="cta-avatars sm">
          <span class="cta-avatar"><img src="assets/expert-01.png" alt=""></span>
          <span class="cta-avatar"><img src="assets/expert-02.png" alt=""></span>
          <span class="cta-avatar"><img src="assets/expert-03.png" alt=""></span>
        </span>
        Book an expert call
      </button></li>
    </ul>
  </nav>
</div>
`;

var NAV_SIMPLE_HTML = `
<header class="quote-topbar">
  <a href="index.html" aria-label="Packhelp" style="display:flex;">
    <img class="logo" src="assets/logo-packhelp.1iheyVke.svg" alt="Packhelp">
  </a>
</header>
`;

(function () {
  var stickyBarPlaceholder = document.getElementById('ph-sticky-bar');
  var navWrapperPlaceholder = document.getElementById('ph-nav-wrapper');
  var navSimplePlaceholder = document.getElementById('ph-nav-simple');
  if (stickyBarPlaceholder) {
    stickyBarPlaceholder.outerHTML = STICKY_BAR_HTML;
  }
  if (navWrapperPlaceholder) {
    navWrapperPlaceholder.outerHTML = NAV_WRAPPER_HTML;
  }
  if (navSimplePlaceholder) {
    navSimplePlaceholder.outerHTML = NAV_SIMPLE_HTML;
  }
})();
