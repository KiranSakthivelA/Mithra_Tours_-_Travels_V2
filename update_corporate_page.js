const fs = require('fs');
const path = require('path');

const newTableStyles = `
        .fleet-table-container {
            background: #FFFFFF;
            border: 1.5px solid var(--border-card);
            border-radius: var(--r-xl);
            overflow: hidden;
            box-shadow: var(--shadow-card);
        }
        .fleet-table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
        }
        .fleet-table th {
            background: #FFFBEB;
            color: #92400E;
            font-size: 0.80rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 1.2px;
            padding: 1.1rem 1.4rem;
            border-bottom: 1.5px solid #FDE68A;
        }
        .fleet-table td {
            padding: 1.05rem 1.4rem;
            border-bottom: 1px solid #F1F5F9;
            font-size: 0.90rem;
            color: #334155;
        }
        .fleet-table tr:hover td {
            background: #FFFDF5;
        }
        .fleet-table .cat-name {
            font-weight: 800;
            color: #0F172A;
        }
        .capacity-pill {
            display: inline-flex;
            align-items: center;
            background: #FEF3C7;
            color: #92400E;
            font-size: 0.76rem;
            font-weight: 800;
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            border: 1px solid #FDE68A;
            white-space: nowrap;
        }

        /* ═══ PREMIUM SHOWCASE CTA CARD ═══ */
        .fleet-showcase-cta-card {
            margin-top: 2.5rem;
            background: linear-gradient(135deg, #FFFFFF 0%, #FFFDF5 60%, #FFFBEB 100%);
            border: 1.5px solid #FDE68A;
            border-radius: 20px;
            padding: 2rem 2.2rem;
            box-shadow: 0 12px 32px -8px rgba(217, 119, 6, 0.10), 0 4px 12px rgba(0, 0, 0, 0.03);
            position: relative;
            overflow: hidden;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .fleet-showcase-cta-card:hover {
            transform: translateY(-2px);
            border-color: #F59E0B;
            box-shadow: 0 18px 40px -8px rgba(217, 119, 6, 0.18), 0 6px 16px rgba(0, 0, 0, 0.04);
        }
        .cta-card-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            background: #FEF3C7;
            color: #B45309;
            font-size: 0.72rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            border: 1px solid #FDE68A;
            margin-bottom: 0.85rem;
        }
        .cta-card-body {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 2rem;
        }
        .cta-card-info h3 {
            font-size: 1.28rem;
            font-weight: 800;
            color: #0F172A;
            margin-bottom: 0.35rem;
            letter-spacing: -0.01em;
        }
        .cta-card-info p {
            font-size: 0.88rem;
            color: #475569;
            line-height: 1.5;
            margin: 0;
            max-width: 650px;
        }
        .cta-showcase-btn {
            display: inline-flex;
            align-items: center;
            gap: 0.6rem;
            background: var(--grad-gold);
            color: #FFFFFF !important;
            font-size: 0.88rem;
            font-weight: 700;
            padding: 0.8rem 1.6rem;
            border-radius: 12px;
            text-decoration: none;
            white-space: nowrap;
            flex-shrink: 0;
            box-shadow: 0 4px 16px rgba(217, 119, 6, 0.35);
            transition: all 0.22s ease;
        }
        .cta-showcase-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(217, 119, 6, 0.50);
            color: #FFFFFF !important;
        }
        .cta-showcase-btn i {
            transition: transform 0.2s ease;
        }
        .cta-showcase-btn:hover i {
            transform: translateX(3px);
        }

        /* ═══ RESPONSIVE MOBILE VIEW FOR TABLE & CTA CARD ═══ */
        @media (max-width: 768px) {
            .fleet-table-container {
                background: transparent !important;
                border: none !important;
                box-shadow: none !important;
                border-radius: 0 !important;
                overflow: visible !important;
            }
            .fleet-table {
                display: block !important;
                min-width: 0 !important;
                width: 100% !important;
            }
            .fleet-table thead {
                display: none !important;
            }
            .fleet-table tbody {
                display: flex !important;
                flex-direction: column !important;
                gap: 0.85rem !important;
                width: 100% !important;
            }
            .fleet-table tr {
                display: block !important;
                background: #FFFFFF !important;
                border: 1.5px solid #E2E8F0 !important;
                border-radius: 14px !important;
                padding: 1rem 1.15rem !important;
                box-shadow: 0 4px 12px rgba(15, 23, 42, 0.04) !important;
                width: 100% !important;
                box-sizing: border-box !important;
            }
            .fleet-table td {
                display: block !important;
                padding: 0 !important;
                border: none !important;
                width: 100% !important;
                box-sizing: border-box !important;
            }
            .fleet-table td.cat-name {
                font-size: 1.05rem !important;
                font-weight: 800 !important;
                color: #0F172A !important;
                margin-bottom: 0.3rem !important;
            }
            .fleet-table td:nth-child(2) {
                font-size: 0.84rem !important;
                color: #64748B !important;
                line-height: 1.45 !important;
                margin-bottom: 0.65rem !important;
            }
            .fleet-table td:nth-child(3) {
                padding-top: 0.65rem !important;
                border-top: 1px dashed #E2E8F0 !important;
                display: flex !important;
                align-items: center !important;
                justify-content: space-between !important;
                width: 100% !important;
            }
            .fleet-table td:nth-child(3)::before {
                content: 'Capacity:' !important;
                font-size: 0.72rem !important;
                font-weight: 700 !important;
                color: #64748B !important;
                text-transform: uppercase !important;
                letter-spacing: 0.5px !important;
            }
            .capacity-pill {
                display: inline-flex !important;
                font-size: 0.74rem !important;
                padding: 0.22rem 0.65rem !important;
            }

            /* Responsive CTA Card */
            .fleet-showcase-cta-card {
                padding: 1.5rem 1.3rem !important;
                margin-top: 2rem !important;
                border-radius: 18px !important;
            }
            .cta-card-body {
                flex-direction: column !important;
                align-items: flex-start !important;
                gap: 1.2rem !important;
            }
            .cta-card-info h3 {
                font-size: 1.15rem !important;
                line-height: 1.3 !important;
            }
            .cta-card-info p {
                font-size: 0.84rem !important;
                line-height: 1.5 !important;
            }
            .cta-showcase-btn {
                width: 100% !important;
                justify-content: center !important;
                padding: 0.8rem 1.2rem !important;
                font-size: 0.86rem !important;
            }
        }
`;

const files = ['v2/corporate.html', 'corporate.html', 'deploy_ready/corporate.html'];

files.forEach(f => {
    const file = path.resolve(__dirname, f);
    if (!fs.existsSync(file)) return;
    let html = fs.readFileSync(file, 'utf8');

    const styleRegex = /<style>[\s\S]*?\.fleet-table-container[\s\S]*?<\/style>/;
    if (styleRegex.test(html)) {
        html = html.replace(styleRegex, `<style>${newTableStyles}\n    </style>`);
    }

    fs.writeFileSync(file, html, 'utf8');
    console.log('Polished table & CTA styles in:', file);
});
