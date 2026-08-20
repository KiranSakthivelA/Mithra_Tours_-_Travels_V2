const fs = require('fs');
const path = require('path');

const roadmapCss = `
/* ═══════════════════════════════════════════════════════════
   WHY MITHRA — ZIG-ZAG ROADMAP TIMELINE COMPONENT
   ═══════════════════════════════════════════════════════════ */

.why-roadmap-section {
    position: relative;
    padding: 3rem 0 4rem;
    overflow: hidden;
}

.why-roadmap-wrapper {
    position: relative;
    max-width: 1200px;
    margin: 2.5rem auto 0;
    padding: 2rem 1rem;
}

/* Central Horizontal Road Track (Desktop) */
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

/* 4-Step Grid */
.roadmap-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
    position: relative;
    z-index: 2;
}

/* Individual Roadmap Item */
.roadmap-item {
    display: flex;
    flex-direction: column;
    position: relative;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.roadmap-item:hover {
    transform: translateY(-4px);
}

/* Alternating Placement: Top vs Bottom */
.roadmap-item.pos-top {
    padding-bottom: 3.2rem;
    justify-content: flex-end;
}

.roadmap-item.pos-bottom {
    padding-top: 3.2rem;
    justify-content: flex-start;
}

/* Connecting Stem to Road Node */
.roadmap-stem {
    position: absolute;
    left: 40px;
    width: 2px;
    background: #FDE68A;
    z-index: 2;
}

.roadmap-item.pos-top .roadmap-stem {
    bottom: 0;
    height: 3.2rem;
}

.roadmap-item.pos-bottom .roadmap-stem {
    top: 0;
    height: 3.2rem;
}

/* Glowing Node on the Road Track */
.roadmap-node-point {
    position: absolute;
    left: 31px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #FFFFFF;
    border: 4px solid #F59E0B;
    box-shadow: 0 0 12px rgba(245, 158, 11, 0.35);
    z-index: 3;
    transition: all 0.3s ease;
}

.roadmap-item.pos-top .roadmap-node-point {
    bottom: -10px;
}

.roadmap-item.pos-bottom .roadmap-node-point {
    top: -10px;
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
    padding: 1.5rem 1.35rem;
    box-shadow: 0 10px 28px -6px rgba(15, 23, 42, 0.06), 0 2px 8px rgba(0, 0, 0, 0.02);
    position: relative;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
}

.roadmap-item:hover .roadmap-card {
    border-color: #F59E0B;
    box-shadow: 0 16px 36px -8px rgba(217, 119, 6, 0.16), 0 4px 12px rgba(0, 0, 0, 0.04);
}

/* Card Header: Squircle Icon + Step Number */
.roadmap-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.roadmap-icon-squircle {
    width: 54px;
    height: 54px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.35rem;
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

/* Style B: Vivid Gold Gradient Squircle (Like Inspo Red Box) */
.roadmap-icon-squircle.style-vivid {
    background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
    color: #FFFFFF;
    box-shadow: 0 8px 20px rgba(217, 119, 6, 0.35);
}

.roadmap-step-badge {
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 1.5px;
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

/* Content */
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
    .roadmap-track-line {
        display: none;
    }

    .roadmap-grid {
        grid-template-columns: 1fr;
        gap: 1.25rem;
        position: relative;
        padding-left: 2rem;
    }

    /* Vertical Road Track on Mobile */
    .why-roadmap-wrapper::before {
        content: '';
        position: absolute;
        top: 2rem;
        bottom: 2rem;
        left: 28px;
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
        padding: 0;
        justify-content: flex-start;
    }

    .roadmap-stem {
        display: none;
    }

    /* Node point on vertical track */
    .roadmap-node-point {
        left: -32px;
        top: 28px;
        bottom: auto;
    }

    .roadmap-card {
        padding: 1.35rem 1.25rem;
    }
}
`;

// Append / update roadmapCss in brand.css files
['v2/css/brand.css', 'css/brand.css'].forEach(f => {
    const file = path.resolve(__dirname, f);
    if (!fs.existsSync(file)) return;
    let css = fs.readFileSync(file, 'utf8');

    const regex = /\/\* ═+\r?\n\s*WHY MITHRA — ZIG-ZAG ROADMAP TIMELINE COMPONENT[\s\S]*?(?=$)/;
    if (regex.test(css)) {
        css = css.replace(regex, roadmapCss.trim());
        fs.writeFileSync(file, css, 'utf8');
        console.log('Updated roadmap CSS in:', file);
    } else {
        css += '\n\n' + roadmapCss.trim() + '\n';
        fs.writeFileSync(file, css, 'utf8');
        console.log('Appended roadmap CSS to:', file);
    }
});
