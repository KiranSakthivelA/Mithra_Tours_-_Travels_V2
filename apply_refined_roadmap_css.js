const fs = require('fs');
const path = require('path');

const refinedRoadmapCss = `/* ═══════════════════════════════════════════════════════════
   WHY MITHRA — ZIG-ZAG ROADMAP TIMELINE COMPONENT
   ═══════════════════════════════════════════════════════════ */

.why-roadmap-section {
    position: relative;
    padding: 3.5rem 0 4.5rem;
    background: #FAFAFA;
}

.why-roadmap-wrapper {
    position: relative;
    max-width: 1200px;
    margin: 3rem auto 1rem;
    padding: 1.5rem 1rem;
}

/* Central Horizontal Road Track Line */
.roadmap-track-line {
    position: absolute;
    top: 50%;
    left: 4%;
    right: 4%;
    height: 3px;
    background: repeating-linear-gradient(
        90deg,
        #F59E0B 0px,
        #F59E0B 8px,
        transparent 8px,
        transparent 16px
    );
    transform: translateY(-50%);
    z-index: 1;
}

/* 4-Column Grid for Zig-Zag */
.roadmap-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
    position: relative;
    z-index: 2;
    min-height: 520px;
}

/* Individual Step */
.roadmap-item {
    display: flex;
    flex-direction: column;
    position: relative;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.roadmap-item:hover {
    transform: translateY(-4px);
}

/* Step 1 & 3: Top Row */
.roadmap-item.pos-top {
    justify-content: flex-start;
    padding-bottom: 260px;
}

/* Step 2 & 4: Bottom Row */
.roadmap-item.pos-bottom {
    justify-content: flex-end;
    padding-top: 260px;
}

/* Connecting Stem to Central Road Track */
.roadmap-stem {
    position: absolute;
    left: 48px;
    width: 2px;
    background: #FDE68A;
    z-index: 2;
}

.roadmap-item.pos-top .roadmap-stem {
    top: 100%;
    bottom: auto;
    height: calc(260px / 2 - 10px);
}

.roadmap-item.pos-bottom .roadmap-stem {
    bottom: 100%;
    top: auto;
    height: calc(260px / 2 - 10px);
}

/* Milestone Node Point (Directly on Center Track) */
.roadmap-node-point {
    position: absolute;
    left: 39px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #FFFFFF;
    border: 4px solid #F59E0B;
    box-shadow: 0 0 12px rgba(245, 158, 11, 0.35);
    z-index: 4;
    transition: all 0.3s ease;
}

.roadmap-item.pos-top .roadmap-node-point {
    top: calc(100% + 260px / 2 - 20px);
}

.roadmap-item.pos-bottom .roadmap-node-point {
    bottom: calc(100% + 260px / 2 - 20px);
}

.roadmap-item:hover .roadmap-node-point {
    transform: scale(1.3);
    background: #F59E0B;
    border-color: #FFFFFF;
    box-shadow: 0 0 20px rgba(245, 158, 11, 0.6);
}

/* Card Body */
.roadmap-card {
    background: #FFFFFF;
    border: 1.5px solid #E2E8F0;
    border-radius: 20px;
    padding: 1.6rem 1.4rem;
    box-shadow: 0 10px 28px -6px rgba(15, 23, 42, 0.06), 0 2px 8px rgba(0, 0, 0, 0.02);
    position: relative;
    z-index: 3;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
}

.roadmap-item:hover .roadmap-card {
    border-color: #F59E0B;
    box-shadow: 0 18px 40px -8px rgba(217, 119, 6, 0.16), 0 4px 12px rgba(0, 0, 0, 0.04);
}

/* Card Header: Squircle Icon + Step Number */
.roadmap-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.roadmap-icon-squircle {
    width: 52px;
    height: 52px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    box-shadow: 0 6px 16px rgba(15, 23, 42, 0.06);
    transition: transform 0.3s ease;
}

.roadmap-item:hover .roadmap-icon-squircle {
    transform: scale(1.08) rotate(3deg);
}

/* Style A: Soft Gold / Neumorphic Light Squircle */
.roadmap-icon-squircle.style-light {
    background: #FFFBEB;
    color: #D97706;
    border: 1.5px solid #FDE68A;
}

/* Style B: Vivid Gold Gradient Squircle */
.roadmap-icon-squircle.style-vivid {
    background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
    color: #FFFFFF;
    box-shadow: 0 8px 20px rgba(217, 119, 6, 0.35);
}

.roadmap-step-badge {
    font-size: 0.70rem;
    font-weight: 800;
    letter-spacing: 1.2px;
    color: #94A3B8;
    text-transform: uppercase;
    background: #F8FAFC;
    padding: 0.25rem 0.65rem;
    border-radius: 9999px;
    border: 1px solid #E2E8F0;
}

.roadmap-item:hover .roadmap-step-badge {
    color: #D97706;
    border-color: #FDE68A;
    background: #FFFBEB;
}

/* Typography */
.roadmap-card h3 {
    font-size: 1.12rem;
    font-weight: 800;
    color: #0F172A;
    line-height: 1.3;
    margin: 0;
    letter-spacing: -0.01em;
}

.roadmap-card p {
    font-size: 0.82rem;
    color: #64748B;
    line-height: 1.55;
    margin: 0;
}

/* ═══════════════════════════════════════════════════════════
   RESPONSIVE ROADMAP FOR TABLET & MOBILE (≤ 992px & ≤ 768px)
   ═══════════════════════════════════════════════════════════ */
@media (max-width: 992px) {
    .why-roadmap-section {
        padding: 2rem 0 3rem;
    }

    .roadmap-track-line {
        display: none;
    }

    .why-roadmap-wrapper {
        margin: 1.5rem auto 0;
        padding: 1rem 0.5rem;
    }

    .roadmap-grid {
        grid-template-columns: 1fr;
        gap: 1.25rem;
        position: relative;
        padding-left: 2.5rem;
        min-height: auto;
    }

    /* Vertical Road Track on Mobile */
    .why-roadmap-wrapper::before {
        content: '';
        position: absolute;
        top: 2.5rem;
        bottom: 2.5rem;
        left: 22px;
        width: 3px;
        background: repeating-linear-gradient(
            180deg,
            #F59E0B 0px,
            #F59E0B 8px,
            transparent 8px,
            transparent 16px
        );
        z-index: 1;
    }

    .roadmap-item.pos-top,
    .roadmap-item.pos-bottom {
        padding: 0 !important;
        justify-content: flex-start !important;
    }

    .roadmap-stem {
        position: absolute;
        left: -20px;
        top: 36px;
        width: 20px;
        height: 2px;
        background: #FDE68A;
        display: block;
    }

    /* Node point on vertical track */
    .roadmap-node-point {
        left: -32px !important;
        top: 27px !important;
        bottom: auto !important;
    }

    .roadmap-card {
        padding: 1.35rem 1.2rem;
        border-radius: 16px;
    }
}
`;

// Apply to brand.css files
['v2/css/brand.css', 'css/brand.css'].forEach(f => {
    const file = path.resolve(__dirname, f);
    if (!fs.existsSync(file)) return;
    let css = fs.readFileSync(file, 'utf8');

    const regex = /\/\* ═+\r?\n\s*WHY MITHRA — ZIG-ZAG ROADMAP TIMELINE COMPONENT[\s\S]*?(?=$)/;
    if (regex.test(css)) {
        css = css.replace(regex, refinedRoadmapCss.trim());
        fs.writeFileSync(file, css, 'utf8');
        console.log('Updated refined roadmap CSS in:', file);
    }
});
