// Albert S. Villasor - Portfolio Core Logic & Interactive Experiences

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
  initTypingEffect();
  initSkillsFilter();
  renderProjects();
  initProjectFilters();
  initModals();
  initContactForm();
  initCopyButtons();
  initBackToTop();
  initResumeControls();
});

/* ==========================================================================
   Theme Switcher (Dark / Light Mode)
   ========================================================================== */

function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  
  // Check stored theme or system preference
  const savedTheme = localStorage.getItem('albert_portfolio_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const currentTheme = savedTheme || (prefersDark ? 'dark' : 'dark'); // Default dark
  
  applyTheme(currentTheme);
  
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('albert_portfolio_theme', newTheme);
      showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`);
    });
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const themeIcon = document.getElementById('theme-icon');
  if (themeIcon) {
    if (theme === 'light') {
      themeIcon.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
    } else {
      themeIcon.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
    }
  }
}

/* ==========================================================================
   Navbar & Navigation Scrollspy
   ========================================================================== */

function initNavbar() {
  const navbar = document.getElementById('site-navbar');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Navbar scroll background change
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Scrollspy active link
    let currentSection = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });
  
  // Mobile Hamburger Toggle
  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
    
    // Close mobile menu on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }
}

/* ==========================================================================
   Typing Effect in Hero Section
   ========================================================================== */

function initTypingEffect() {
  const typingElement = document.getElementById('role-cycler');
  if (!typingElement) return;
  
  const roles = [
    "Information Technology Student",
    "Flutter Mobile App Developer",
    "Full-Stack Django Developer",
    "Dean's Lister & Academic Achiever",
    "Aspiring Software Engineer"
  ];
  
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 90;
  
  function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingDelay = 40;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingDelay = 90;
    }
    
    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingDelay = 1800; // Pause at full word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingDelay = 400; // Pause before new word
    }
    
    setTimeout(type, typingDelay);
  }
  
  type();
}

/* ==========================================================================
   Skills Matrix Filtering
   ========================================================================== */

function initSkillsFilter() {
  const skillFilters = document.querySelectorAll('.skill-filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');
  
  skillFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      skillFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filter = btn.getAttribute('data-filter');
      
      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   Render & Filter Projects
   ========================================================================== */

function renderProjects() {
  const projectsContainer = document.getElementById('projects-grid');
  if (!projectsContainer || typeof PROJECTS_DATA === 'undefined') return;
  
  projectsContainer.innerHTML = PROJECTS_DATA.map(project => {
    return `
      <article class="project-card" data-category="${project.category}">
        <div class="project-thumbnail-wrapper">
          <img src="${project.thumbnail}" alt="${project.title}" class="project-thumbnail-img" loading="lazy">
          <span class="project-badge-pill">${project.categoryLabel}</span>
        </div>
        
        <div class="project-content">
          <h3 class="project-title">${project.title}</h3>
          <p class="project-tagline">${project.tagline}</p>
          <p class="project-summary">${project.summary}</p>
          
          <div class="project-tags">
            ${project.tags.slice(0, 5).map(tag => `<span class="project-tag">${tag}</span>`).join('')}
            ${project.tags.length > 5 ? `<span class="project-tag">+${project.tags.length - 5}</span>` : ''}
          </div>
          
          <div class="project-actions">
            <button class="btn btn-primary btn-sm open-project-deepdive" data-id="${project.id}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              Deep Dive
            </button>
            <button class="btn btn-outline btn-sm open-project-demo" data-id="${project.id}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              Live Demo
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
  
  // Attach event listeners to project buttons
  document.querySelectorAll('.open-project-deepdive').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      openProjectModal(id, 'overview');
    });
  });
  
  document.querySelectorAll('.open-project-demo').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      openProjectModal(id, 'demo');
    });
  });
}

function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filter = btn.getAttribute('data-filter');
      const cards = document.querySelectorAll('.project-card');
      
      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   Project Detail & Interactive Modal System
   ========================================================================== */

let activeAudioContext = null;
let activeMusicInterval = null;

function initModals() {
  const backdrop = document.getElementById('project-modal-backdrop');
  const closeBtn = document.getElementById('project-modal-close');
  
  if (backdrop && closeBtn) {
    closeBtn.addEventListener('click', () => closeProjectModal());
    
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        closeProjectModal();
      }
    });
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && backdrop.classList.contains('active')) {
        closeProjectModal();
      }
    });
  }
}

function closeProjectModal() {
  const backdrop = document.getElementById('project-modal-backdrop');
  if (backdrop) {
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  // Stop audio synthesis if running
  stopMusicAudio();
}

function openProjectModal(projectId, defaultTab = 'overview') {
  const project = PROJECTS_DATA.find(p => p.id === projectId);
  if (!project) return;
  
  const backdrop = document.getElementById('project-modal-backdrop');
  const titleElem = document.getElementById('modal-project-title');
  const bodyElem = document.getElementById('modal-project-body');
  
  titleElem.textContent = project.title;
  document.body.style.overflow = 'hidden';
  
  bodyElem.innerHTML = `
    <!-- Modal Navigation Tabs -->
    <div class="modal-tabs">
      <button class="modal-tab-btn ${defaultTab === 'overview' ? 'active' : ''}" data-tab="overview">
        Overview & Features
      </button>
      <button class="modal-tab-btn ${defaultTab === 'architecture' ? 'active' : ''}" data-tab="architecture">
        Architecture & Code
      </button>
      <button class="modal-tab-btn ${defaultTab === 'gallery' ? 'active' : ''}" data-tab="gallery">
        Gallery (${project.gallery ? project.gallery.length : 0})
      </button>
      <button class="modal-tab-btn ${defaultTab === 'demo' ? 'active' : ''}" data-tab="demo">
        ⚡ Live Interactive Simulator
      </button>
    </div>

    <!-- Tab 1: Overview & Features -->
    <div class="tab-pane ${defaultTab === 'overview' ? 'active' : ''}" id="tab-overview" style="display: ${defaultTab === 'overview' ? 'block' : 'none'};">
      <div style="margin-bottom: 1.5rem;">
        <h4 style="font-size: 1.15rem; margin-bottom: 0.5rem; color: var(--accent-light);">${project.tagline}</h4>
        <p style="color: var(--text-secondary); line-height: 1.7; font-size: 0.98rem;">${project.overview}</p>
      </div>

      <!-- Quick Metrics -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
        ${project.metrics.map(m => `
          <div style="background: var(--bg-card); border: 1px solid var(--border-color); padding: 1rem; border-radius: var(--radius-md);">
            <div style="font-size: 0.78rem; text-transform: uppercase; color: var(--text-muted);">${m.label}</div>
            <div style="font-weight: 700; font-size: 1rem; color: var(--text-primary); margin-top: 0.25rem;">${m.value}</div>
          </div>
        `).join('')}
      </div>

      <!-- Key Features Checklist -->
      <h4 style="font-size: 1.1rem; margin-bottom: 1rem;">Key Technical Features</h4>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
        ${project.features.map(f => `
          <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.1rem;">
            <div style="font-weight: 700; font-size: 0.95rem; margin-bottom: 0.35rem; color: var(--text-primary); display: flex; align-items: center; gap: 0.5rem;">
              <span style="color: var(--accent-light);">✔</span> ${f.title}
            </div>
            <div style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5;">${f.desc}</div>
          </div>
        `).join('')}
      </div>

      <!-- Tech Stack Badges -->
      <h4 style="font-size: 1.1rem; margin-bottom: 0.75rem;">Technology Stack</h4>
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
        ${project.tags.map(tag => `<span class="project-tag" style="padding: 0.35rem 0.8rem; font-size: 0.84rem;">${tag}</span>`).join('')}
      </div>
    </div>

    <!-- Tab 2: Architecture & Code -->
    <div class="tab-pane ${defaultTab === 'architecture' ? 'active' : ''}" id="tab-architecture" style="display: ${defaultTab === 'architecture' ? 'block' : 'none'};">
      <h4 style="font-size: 1.1rem; margin-bottom: 0.75rem;">System Architecture Breakdown</h4>
      <ul style="margin-left: 1.5rem; color: var(--text-secondary); line-height: 1.8; margin-bottom: 2rem;">
        ${project.architecture.map(arc => `<li>${arc}</li>`).join('')}
      </ul>

      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
        <h4 style="font-size: 1.1rem;">Core Implementation Code</h4>
        <span style="font-size: 0.8rem; color: var(--accent-light); font-family: var(--font-mono);">Source Extract</span>
      </div>
      <pre class="code-block-box"><code>${escapeHtml(project.codeSnippet)}</code></pre>
    </div>

    <!-- Tab 3: Gallery -->
    <div class="tab-pane ${defaultTab === 'gallery' ? 'active' : ''}" id="tab-gallery" style="display: ${defaultTab === 'gallery' ? 'block' : 'none'};">
      <div class="modal-gallery-grid">
        ${project.gallery.map(img => `
          <div class="modal-gallery-item">
            <img src="${img.src}" alt="${img.caption}" loading="lazy">
            <p>${img.caption}</p>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Tab 4: Interactive Live Demo -->
    <div class="tab-pane ${defaultTab === 'demo' ? 'active' : ''}" id="tab-demo" style="display: ${defaultTab === 'demo' ? 'block' : 'none'};">
      ${renderInteractiveDemo(project)}
    </div>
  `;
  
  // Attach Tab Switch Handlers
  bodyElem.querySelectorAll('.modal-tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const tabTarget = e.currentTarget.getAttribute('data-tab');
      
      bodyElem.querySelectorAll('.modal-tab-btn').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      
      bodyElem.querySelectorAll('.tab-pane').forEach(p => p.style.display = 'none');
      const targetPane = bodyElem.querySelector(`#tab-${tabTarget}`);
      if (targetPane) targetPane.style.display = 'block';
    });
  });
  
  // Attach specific simulator events
  if (project.id === 'safedrive') {
    initSafeDriveSimulator();
  } else if (project.id === 'musicplayer') {
    initMusicPlayerDemo();
  } else if (project.id === 'fashionpulse') {
    initFashionPulseDemo();
  }
  
  backdrop.classList.add('active');
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* ==========================================================================
   Interactive Simulators
   ========================================================================== */

function renderInteractiveDemo(project) {
  if (project.id === 'safedrive') {
    return `
      <div style="text-align: center; margin-bottom: 1.5rem;">
        <h4 style="font-size: 1.25rem; margin-bottom: 0.35rem;">SafeDrive SOS Emergency Simulator</h4>
        <p style="font-size: 0.92rem; color: var(--text-secondary);">Test the real-time emergency dispatch pipeline: GPS geofencing, guardian notifications, and local alerts.</p>
      </div>

      <div class="simulator-box">
        <div class="sim-phone-header">
          <span>SafeDrive OS v1.0</span>
          <span>📍 Basak San Nicolas, Cebu</span>
          <span style="color: #10b981;">● Online</span>
        </div>

        <button id="sim-sos-button" class="sos-trigger-btn">
          <span>SOS</span>
          <span style="font-size: 0.75rem; font-weight: normal; opacity: 0.9;">EMERGENCY</span>
        </button>

        <p id="sos-hint-text" style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1rem;">
          Click the SOS button to simulate an emergency alert
        </p>

        <div style="display: flex; justify-content: center; gap: 0.5rem; margin-bottom: 1rem;">
          <button id="sim-cancel-btn" class="btn btn-outline btn-sm" style="display: none;">Cancel SOS</button>
          <button id="sim-notify-test-btn" class="btn btn-primary btn-sm">Simulate Route Map</button>
        </div>

        <div class="sos-status-console" id="sos-console">
          <div>[SYSTEM READY] Monitoring vehicle telemetry...</div>
          <div>[GPS] 10.2974° N, 123.8679° E (Cebu City, PH)</div>
          <div>[STATUS] Speed: 32 km/h | Road: N. Bacalso Ave</div>
        </div>
      </div>
    `;
  }
  
  if (project.id === 'musicplayer') {
    return `
      <div style="text-align: center; margin-bottom: 1.5rem;">
        <h4 style="font-size: 1.25rem; margin-bottom: 0.35rem;">Melody Stream Audio Player</h4>
        <p style="font-size: 0.92rem; color: var(--text-secondary);">Interactive Web Audio demonstration with playback controls, progress scrubber, and melodic synth audio engine.</p>
      </div>

      <div class="music-widget-box">
        <div class="album-art-widget">
          <img id="player-album-cover" src="glimpseofus.jpg" alt="Now Playing">
        </div>

        <h4 class="track-title-widget" id="player-track-title">Glimpse of Us</h4>
        <div class="track-artist-widget" id="player-track-artist">Joji</div>

        <div class="track-progress-container">
          <span class="track-time" id="player-curr-time">0:00</span>
          <input type="range" class="progress-slider" id="player-progress" min="0" max="100" value="0">
          <span class="track-time" id="player-total-time">3:53</span>
        </div>

        <div class="music-controls-row">
          <button class="music-ctrl-btn" id="player-prev-btn" title="Previous Track">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5"></line></svg>
          </button>
          
          <button class="music-ctrl-btn play-pause-btn" id="player-play-btn" title="Play / Pause">
            <svg id="play-icon-svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          </button>
          
          <button class="music-ctrl-btn" id="player-next-btn" title="Next Track">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line></svg>
          </button>
        </div>

        <div style="margin-top: 1.5rem; display: flex; align-items: center; justify-content: center; gap: 0.5rem; font-size: 0.8rem; color: var(--text-muted);">
          <span>Audio Synthesizer Engine:</span>
          <span id="player-status-badge" style="color: #a855f7; font-weight: 600;">Paused</span>
        </div>
      </div>
    `;
  }
  
  if (project.id === 'fashionpulse') {
    return `
      <div style="text-align: center; margin-bottom: 1.5rem;">
        <h4 style="font-size: 1.25rem; margin-bottom: 0.35rem;">Fashion Pulse Article & Style Lens Inspector</h4>
        <p style="font-size: 0.92rem; color: var(--text-secondary);">Interactive preview showing dynamic reading time calculation, moderation workflow, and Style Gallery heart reactions.</p>
      </div>

      <div style="max-width: 580px; margin: 0 auto; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 16px; overflow: hidden; box-shadow: var(--shadow-md);">
        <img src="editorial mission.jpg" alt="Article Preview" style="width: 100%; height: 220px; object-fit: cover;">
        
        <div style="padding: 1.5rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
            <span style="font-size: 0.75rem; text-transform: uppercase; font-weight: 700; background: rgba(139, 92, 246, 0.15); color: #8b5cf6; padding: 0.25rem 0.65rem; border-radius: 20px;">
              EDITORIAL FEATURE
            </span>
            <span style="font-size: 0.8rem; color: #10b981; font-weight: 600;">
              ✔ Moderation: Approved
            </span>
          </div>

          <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem; color: var(--text-primary);">Contemporary Street Heritage & Sustainable Tailoring</h3>
          
          <div style="display: flex; align-items: center; gap: 1rem; font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1.25rem;">
            <span>By Fashion Desk</span>
            <span>•</span>
            <span id="fp-read-time">📖 4 min read (820 words)</span>
          </div>

          <p style="font-size: 0.94rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.5rem;">
            Exploring the confluence of heritage craftsmanship and street culture in urban Southeast Asia. Features high-res photographic documentation and community styling notes.
          </p>

          <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 1rem; border-top: 1px solid var(--border-color);">
            <button id="fp-like-btn" class="btn btn-outline btn-sm" style="display: flex; align-items: center; gap: 0.4rem;">
              <span id="fp-heart-icon" style="color: #ef4444; font-size: 1.1rem;">♡</span>
              <span id="fp-like-count">128</span> Hearted
            </button>
            <span style="font-size: 0.84rem; color: var(--text-muted);">24 Editorial Comments</span>
          </div>
        </div>
      </div>
    `;
  }
  
  return `<p>Demo is being initialized...</p>`;
}

/* SafeDrive Simulator Logic */
function initSafeDriveSimulator() {
  const sosBtn = document.getElementById('sim-sos-button');
  const cancelBtn = document.getElementById('sim-cancel-btn');
  const notifyBtn = document.getElementById('sim-notify-test-btn');
  const consoleElem = document.getElementById('sos-console');
  const hintText = document.getElementById('sos-hint-text');
  
  if (!sosBtn || !consoleElem) return;
  
  let isSosActive = false;
  
  sosBtn.addEventListener('click', () => {
    isSosActive = !isSosActive;
    if (isSosActive) {
      sosBtn.classList.add('active');
      hintText.textContent = "🚨 EMERGENCY ACTIVE: Alerting emergency network & authorities...";
      hintText.style.color = "#ef4444";
      cancelBtn.style.display = 'inline-flex';
      
      const time = new Date().toLocaleTimeString();
      consoleElem.innerHTML = `
        <div style="color: #ef4444; font-weight: bold;">[${time}] SOS TRIGGER DETECTED!</div>
        <div style="color: #f59e0b;">[LOCAL NOTIF] High Priority Alert Broadcasted</div>
        <div>[GEO] Transmitting Lat: 10.2974, Lng: 123.8679</div>
        <div style="color: #10b981;">[CONTACT 1] Papa - Alert Sent via SMS/Push ✔</div>
        <div style="color: #10b981;">[CONTACT 2] Mama - Alert Sent via SMS/Push ✔</div>
        <div style="color: #38bdf8;">[NETWORK] Response team notified with vehicle ID: SD-882</div>
      `;
      showToast("🚨 SOS Alert Dispatched in Simulator!");
    } else {
      resetSOS();
    }
  });
  
  if (cancelBtn) {
    cancelBtn.addEventListener('click', resetSOS);
  }
  
  function resetSOS() {
    isSosActive = false;
    sosBtn.classList.remove('active');
    hintText.textContent = "Click the SOS button to simulate an emergency alert";
    hintText.style.color = "var(--text-secondary)";
    cancelBtn.style.display = 'none';
    consoleElem.innerHTML = `
      <div style="color: #10b981;">[STATUS] Emergency cancelled. Driver safe.</div>
      <div>[GPS] 10.2974° N, 123.8679° E (Cebu City, PH)</div>
      <div>[SYSTEM] Monitoring normal driving conditions...</div>
    `;
    showToast("SOS Alert Cancelled");
  }
  
  if (notifyBtn) {
    notifyBtn.addEventListener('click', () => {
      consoleElem.innerHTML += `
        <div style="color: #a855f7;">[NAVIGATION] Destination Route: Cebu Eastern College (CEC) via Natalio Bacalso Ave</div>
        <div>[ESTIMATE] ETA: 8 mins | Distance: 2.4 km</div>
      `;
      showToast("Route Loaded to Cebu Eastern College!");
    });
  }
}

/* Melody Stream Music Player Logic */
const PLAYLIST = [
  {
    title: "Glimpse of Us",
    artist: "Joji",
    cover: "glimpseofus.jpg",
    totalTime: "3:53",
    totalSeconds: 233,
    melodyNotes: [261.63, 329.63, 392.00, 440.00] // C, E, G, A
  },
  {
    title: "Die With A Smile",
    artist: "Lady Gaga & Bruno Mars",
    cover: "diewithasmile.jpg",
    totalTime: "4:11",
    totalSeconds: 251,
    melodyNotes: [293.66, 369.99, 440.00, 554.37] // D, F#, A, C#
  },
  {
    title: "Versace On The Floor",
    artist: "Bruno Mars",
    cover: "versaceonthefloor.jpg",
    totalTime: "4:28",
    totalSeconds: 268,
    melodyNotes: [329.63, 415.30, 493.88, 587.33] // E, G#, B, D#
  },
  {
    title: "Oceans & Engines",
    artist: "NIKI",
    cover: "oceansandengines.jpg",
    totalTime: "5:38",
    totalSeconds: 338,
    melodyNotes: [349.23, 440.00, 523.25, 659.25] // F, A, C, E
  }
];

let currentTrackIndex = 0;
let isPlayingTrack = false;
let currentSeconds = 0;

function initMusicPlayerDemo() {
  const playBtn = document.getElementById('player-play-btn');
  const prevBtn = document.getElementById('player-prev-btn');
  const nextBtn = document.getElementById('player-next-btn');
  const progressBar = document.getElementById('player-progress');
  
  if (!playBtn) return;
  
  loadTrack(currentTrackIndex);
  
  playBtn.addEventListener('click', togglePlayMusic);
  prevBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + PLAYLIST.length) % PLAYLIST.length;
    loadTrack(currentTrackIndex);
    if (isPlayingTrack) startMusicAudio();
  });
  nextBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % PLAYLIST.length;
    loadTrack(currentTrackIndex);
    if (isPlayingTrack) startMusicAudio();
  });
  
  progressBar.addEventListener('input', (e) => {
    const val = parseInt(e.target.value);
    const track = PLAYLIST[currentTrackIndex];
    currentSeconds = Math.floor((val / 100) * track.totalSeconds);
    document.getElementById('player-curr-time').textContent = formatTime(currentSeconds);
  });
}

function loadTrack(index) {
  const track = PLAYLIST[index];
  document.getElementById('player-track-title').textContent = track.title;
  document.getElementById('player-track-artist').textContent = track.artist;
  document.getElementById('player-album-cover').src = track.cover;
  document.getElementById('player-total-time').textContent = track.totalTime;
  document.getElementById('player-curr-time').textContent = "0:00";
  document.getElementById('player-progress').value = 0;
  currentSeconds = 0;
}

function togglePlayMusic() {
  isPlayingTrack = !isPlayingTrack;
  const playIcon = document.getElementById('play-icon-svg');
  const badge = document.getElementById('player-status-badge');
  
  if (isPlayingTrack) {
    playIcon.innerHTML = `<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>`;
    badge.textContent = "Playing Melody (Web Audio)";
    badge.style.color = "#10b981";
    startMusicAudio();
  } else {
    playIcon.innerHTML = `<polygon points="5 3 19 12 5 21 5 3"></polygon>`;
    badge.textContent = "Paused";
    badge.style.color = "#a855f7";
    stopMusicAudio();
  }
}

function startMusicAudio() {
  stopMusicAudio();
  
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    activeAudioContext = new AudioContext();
    
    const track = PLAYLIST[currentTrackIndex];
    let noteIdx = 0;
    
    // Play warm synthetic acoustic notes
    activeMusicInterval = setInterval(() => {
      if (!isPlayingTrack || !activeAudioContext) return;
      
      const osc = activeAudioContext.createOscillator();
      const gain = activeAudioContext.createGain();
      
      const freq = track.melodyNotes[noteIdx % track.melodyNotes.length];
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, activeAudioContext.currentTime);
      
      gain.gain.setValueAtTime(0.08, activeAudioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, activeAudioContext.currentTime + 0.8);
      
      osc.connect(gain);
      gain.connect(activeAudioContext.destination);
      
      osc.start();
      osc.stop(activeAudioContext.currentTime + 0.8);
      
      noteIdx++;
      
      // Update progress
      currentSeconds = (currentSeconds + 1) % track.totalSeconds;
      const progressPercent = (currentSeconds / track.totalSeconds) * 100;
      const progressBar = document.getElementById('player-progress');
      const timeElem = document.getElementById('player-curr-time');
      
      if (progressBar) progressBar.value = progressPercent;
      if (timeElem) timeElem.textContent = formatTime(currentSeconds);
      
    }, 900);
  } catch (err) {
    console.log("Web Audio not supported or blocked", err);
  }
}

function stopMusicAudio() {
  if (activeMusicInterval) {
    clearInterval(activeMusicInterval);
    activeMusicInterval = null;
  }
  if (activeAudioContext) {
    activeAudioContext.close().catch(() => {});
    activeAudioContext = null;
  }
}

function formatTime(totalSecs) {
  const mins = Math.floor(totalSecs / 60);
  const secs = totalSecs % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

/* Fashion Pulse Interactive Demo Logic */
function initFashionPulseDemo() {
  const likeBtn = document.getElementById('fp-like-btn');
  const countElem = document.getElementById('fp-like-count');
  const heartIcon = document.getElementById('fp-heart-icon');
  
  if (!likeBtn || !countElem) return;
  
  let isHearted = false;
  let count = 128;
  
  likeBtn.addEventListener('click', () => {
    isHearted = !isHearted;
    if (isHearted) {
      count++;
      heartIcon.textContent = "♥";
      heartIcon.style.color = "#ef4444";
      likeBtn.style.borderColor = "#ef4444";
      showToast("Hearted! User notification fired to author.");
    } else {
      count--;
      heartIcon.textContent = "♡";
      likeBtn.style.borderColor = "var(--border-color)";
    }
    countElem.textContent = count;
  });
}

/* ==========================================================================
   Copy to Clipboard & Toast System
   ========================================================================== */

function initCopyButtons() {
  document.querySelectorAll('.copy-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied "${textToCopy}" to clipboard!`);
        }).catch(() => {
          showToast(`Failed to copy.`);
        });
      }
    });
  });
}

function showToast(message) {
  let toast = document.getElementById('site-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'site-toast';
    toast.className = 'toast-box';
    document.body.appendChild(toast);
  }
  
  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--accent);"><polyline points="20 6 9 17 4 12"></polyline></svg>
    <span>${message}</span>
  `;
  
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/* ==========================================================================
   Contact Form Handler
   ========================================================================== */

function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = form.querySelector('#contact-name').value.trim();
    const email = form.querySelector('#contact-email').value.trim();
    const subject = form.querySelector('#contact-subject').value.trim();
    const message = form.querySelector('#contact-message').value.trim();
    
    if (!name || !email || !message) {
      showToast("Please fill out all required fields.");
      return;
    }
    
    // Construct pre-filled email client link
    const mailtoUrl = `mailto:albertvillasor6@gmail.com?subject=${encodeURIComponent(subject || 'Inquiry from Portfolio')}&body=${encodeURIComponent(`Hi Albert,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    
    showToast("Message prepared! Opening your mail client...");
    
    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 600);
    
    form.reset();
  });
}

/* ==========================================================================
   Resume Controls (Print & Scan Toggle)
   ========================================================================== */

function initResumeControls() {
  const printBtn = document.getElementById('print-resume-btn');
  const toggleScanBtn = document.getElementById('toggle-resume-scan-btn');
  const paperView = document.getElementById('resume-paper-content');
  const scanView = document.getElementById('resume-scan-content');
  
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
  
  if (toggleScanBtn && paperView && scanView) {
    let showingScan = false;
    toggleScanBtn.addEventListener('click', () => {
      showingScan = !showingScan;
      if (showingScan) {
        paperView.style.display = 'none';
        scanView.style.display = 'block';
        toggleScanBtn.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
          Switch to Web Format
        `;
        showToast("Displaying Original Document Scan");
      } else {
        paperView.style.display = 'block';
        scanView.style.display = 'none';
        toggleScanBtn.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
          View Original Document Scan
        `;
        showToast("Displaying Interactive Web Resume");
      }
    });
  }
}

/* ==========================================================================
   Back to Top Floating Action
   ========================================================================== */

function initBackToTop() {
  const btn = document.getElementById('back-to-top-btn');
  if (!btn) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 450) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });
  
  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
