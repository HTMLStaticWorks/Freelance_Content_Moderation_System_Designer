/**
 * SafeQueue Dashboard Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    initSidebarToggle();
    initTabSwitching();
    renderQueue();
    renderRules();
    renderCharts();
});

function initSidebarToggle() {
    const sidebar = document.getElementById('sidebar');
    const openBtn = document.getElementById('open-sidebar');
    const closeBtn = document.getElementById('close-sidebar');

    if (openBtn && sidebar) {
        openBtn.addEventListener('click', () => {
            sidebar.classList.add('active');
        });
    }

    if (closeBtn && sidebar) {
        closeBtn.addEventListener('click', () => {
            sidebar.classList.remove('active');
        });
    }

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    });
}

function initTabSwitching() {
    const links = document.querySelectorAll('.sidebar-link[data-tab]');
    const sections = document.querySelectorAll('.dashboard-section');
    const title = document.getElementById('page-title');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const tab = link.getAttribute('data-tab');
            
            // Update UI
            links.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            sections.forEach(s => s.classList.remove('active'));
            document.getElementById(`${tab}-section`).classList.add('active');

            title.textContent = link.textContent.trim();

            // Close sidebar on mobile
            if (window.innerWidth <= 1024) {
                document.getElementById('sidebar').classList.remove('active');
            }
        });
    });
}

function renderQueue() {
    const queueContainer = document.getElementById('queue-container');
    const data = [
        { id: 'TX-4092', type: 'IMAGE', severity: 'high', lang: 'EN', date: '2m ago' },
        { id: 'TX-4093', type: 'TEXT', severity: 'med', lang: 'ES', date: '5m ago' },
        { id: 'TX-4094', type: 'VIDEO', severity: 'high', lang: 'FR', date: '12m ago' },
        { id: 'TX-4095', type: 'TEXT', severity: 'low', lang: 'EN', date: '15m ago' },
        { id: 'TX-4096', type: 'IMAGE', severity: 'med', lang: 'DE', date: '18m ago' },
        { id: 'TX-4097', type: 'TEXT', severity: 'high', lang: 'AR', date: '22m ago' },
    ];

    const typeIcons = {
        'IMAGE': 'ph-image',
        'TEXT': 'ph-text-aa',
        'VIDEO': 'ph-video-camera'
    };

    queueContainer.innerHTML = data.map(item => `
        <div class="queue-item">
            <div class="item-meta">
                <span class="item-label">Content ID</span>
                <span class="item-id">${item.id}</span>
            </div>
            <div class="item-meta">
                <span class="item-label">Type</span>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <i class="ph ${typeIcons[item.type]}"></i>
                    <span>${item.type}</span>
                </div>
            </div>
            <div class="item-meta">
                <span class="item-label">Severity</span>
                <span class="badge badge-${item.severity}">${item.severity}</span>
            </div>
            <div class="item-meta">
                <span class="item-label">Language</span>
                <span style="font-weight: 500;">${item.lang}</span>
            </div>
            <div class="item-meta">
                <span class="item-label">Queued</span>
                <span style="font-size: 0.875rem;">${item.date}</span>
            </div>
            <div class="actions" style="display: flex; gap: 8px; justify-content: flex-end;">
                <button class="icon-btn action-btn btn-approve" title="Approve"><i class="ph ph-check"></i></button>
                <button class="icon-btn action-btn btn-flag" title="Flag"><i class="ph ph-warning"></i></button>
                <button class="icon-btn action-btn btn-reject" title="Reject"><i class="ph ph-trash"></i></button>
            </div>
        </div>
    `).join('');
}

function renderRules() {
    const rulesContainer = document.getElementById('rules-container');
    const rules = [
        { name: 'Explicit Hate Speech', cat: 'Safety', threshold: 85 },
        { name: 'Medical Misinformation', cat: 'Health', threshold: 92 },
        { name: 'Cyberbullying Patterns', cat: 'Safety', threshold: 70 },
        { name: 'Financial Scams', cat: 'Fraud', threshold: 88 },
        { name: 'Copyright Violation', cat: 'Legal', threshold: 95 },
        { name: 'Regional Slang Filter', cat: 'Policy', threshold: 65 },
    ];

    rulesContainer.innerHTML = rules.map((rule, idx) => `
        <div class="slider-row">
            <div>
                <div style="font-weight: 600;">${rule.name}</div>
                <div style="font-size: 0.75rem; color: var(--text-secondary);">${rule.cat} | v1.${idx+1}</div>
            </div>
            <input type="range" min="0" max="100" value="${rule.threshold}">
            <div class="font-mono" style="text-align: right;">${rule.threshold}%</div>
        </div>
    `).join('');
}

function renderCharts() {
    const overviewChart = document.getElementById('overview-chart');
    const trendChart = document.getElementById('trend-chart');

    const renderBars = (container, count) => {
        container.innerHTML = '';
        for(let i=0; i<count; i++) {
            const h = Math.floor(Math.random() * 80) + 20;
            const bar = document.createElement('div');
            bar.className = 'bar';
            bar.style.height = `${h}%`;
            container.appendChild(bar);
        }
    };

    renderBars(overviewChart, 12);
    renderBars(trendChart, 7);
}
