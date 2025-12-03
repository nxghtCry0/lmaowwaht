// ==UserScript==
// @name         Schoology Plus
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  The ultimate Schoology enhancement suite. Dark theme, modern UI, and better navigation.
// @author       TejasGPT
// @match        *://*.schoology.com/*
// @match        *://*.cherrycreekschools.org/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=schoology.com
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @connect      raw.githubusercontent.com
// ==/UserScript==

(function() {
    'use strict';

    // --- CSS INJECTION (Synced with style.css) ---
    const styles = `
    /* --- 1. CORE VARIABLES (Dark & Clean) --- */
    :root {
        --bg-dark: #121212; --bg-panel: #1e1e1e; --bg-panel-hover: #2c2c2c; --bg-input: #2a2a2a;
        --text-primary: #e4e4e7; --text-secondary: #a1a1aa; --text-link: #a78bfa;
        --accent-primary: #8b5cf6; --border-color: #333333;
        --radius-lg: 12px; --radius-md: 6px; --radius-round: 50%;
    }
    html, body, #body { background-color: var(--bg-dark) !important; background-image: none !important; color: var(--text-primary) !important; scrollbar-color: var(--bg-panel) var(--bg-dark); }
    div, span, p, h1, h2, h3, h4, h5, h6, a, li, ul, table, td, th { color: inherit; border-color: var(--border-color); }
    a, .sExtlink-processed, .clickable { color: var(--text-link) !important; text-decoration: none !important; }
    a:hover { color: #fff !important; }
    #wrapper, #main, #main-inner, #content-wrapper, #container, .site-navigation, #center-wrapper, #right-column, #left-nav, .canvas-container, .feed-comments, .theme-2016-layout #main, #home-feed-container { background: transparent !important; background-color: transparent !important; border: none !important; box-shadow: none !important; }
    .s-edge-feed .edge-item, .s-edge-type-update-post, li.s-edge-feed-more-link, .upcoming-events, .recently-completed-wrapper aside, .todo-wrapper, .smart-box-mid, .feed-comments-view-all-container, .grades-grade-wrapper, div.course-item, div.group-item, .s-edge-feed li { background-color: var(--bg-panel) !important; border: 1px solid var(--border-color) !important; border-radius: var(--radius-lg) !important; box-shadow: 0 4px 6px rgba(0,0,0,0.1) !important; padding: 15px !important; margin-bottom: 15px !important; }
    .update-sentence-inner, .update-body, .s-rte, .edge-main-wrapper, .edge-sentence, .story-title { background-color: transparent !important; color: var(--text-primary) !important; }
    .update-sentence-inner a { font-weight: 700 !important; font-size: 1.1em !important; color: #fff !important; }
    input, textarea, select, .form-text, .form-select { background-color: var(--bg-input) !important; border: 1px solid var(--border-color) !important; color: #fff !important; border-radius: var(--radius-md) !important; padding: 8px !important; }
    button, .button, input[type="submit"], .submit-span-wrapper input { background: linear-gradient(to bottom, #333, #222) !important; color: #fff !important; border: 1px solid #444 !important; border-radius: var(--radius-md) !important; padding: 6px 12px !important; cursor: pointer; }
    button:hover, input[type="submit"]:hover { background: var(--accent-primary) !important; border-color: var(--accent-primary) !important; }
    #header, header, ._1Z0RM { background: #0a0a0a !important; border-bottom: 2px solid var(--border-color) !important; box-shadow: 0 4px 20px rgba(0,0,0,0.8) !important; }
    #header nav li button, #header nav li a { background: transparent !important; color: var(--text-primary) !important; }
    #header nav li:hover { background-color: var(--bg-panel-hover) !important; border-radius: var(--radius-md); }
    svg, path, use { fill: currentColor !important; }
    div[role="menu"], .dropdown-menu, .popups-box { background-color: var(--bg-panel) !important; border: 1px solid var(--border-color) !important; color: var(--text-primary) !important; }
    .upcoming-event, .recently-completed-list .item, .recently-completed-event { background-color: #252525 !important; border: 1px solid #333 !important; border-left: 3px solid var(--accent-primary) !important; margin-bottom: 8px !important; padding: 10px !important; border-radius: 4px !important; color: var(--text-primary) !important; }
    .upcoming-event:hover, .recently-completed-event:hover { background-color: var(--bg-panel-hover) !important; }
    /* Custom Course Grid */
    #custom-courses-section h2 { color: #fff !important; border-bottom: 2px solid var(--accent-primary); display: inline-block; padding-bottom: 5px; }
    #custom-course-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px; margin-bottom: 20px; }
    .custom-course-card { background-color: var(--bg-panel); border: 1px solid var(--border-color); border-radius: var(--radius-lg); overflow: hidden; transition: transform 0.2s; cursor: pointer; }
    .custom-course-card:hover { transform: translateY(-4px); box-shadow: 0 8px 16px rgba(0,0,0,0.3); border-color: var(--accent-primary); }
    .course-card-img { height: 110px; background-size: cover; background-position: center; border-bottom: 1px solid var(--border-color); }
    .course-card-info { padding: 12px; }
    .course-card-title { display: block; color: #fff !important; font-weight: 700; font-size: 1rem; margin-bottom: 4px; }
    .course-card-section { color: var(--text-secondary) !important; font-size: 0.85rem; }
    /* License Modal */
    #splus-license-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: #000; z-index: 999999; display: flex; justify-content: center; align-items: center; }
    .splus-license-box { background: var(--bg-panel); border: 2px solid var(--accent-primary); padding: 40px; border-radius: var(--radius-lg); text-align: center; max-width: 500px; box-shadow: 0 0 50px rgba(139, 92, 246, 0.3); }
    .splus-license-box h1 { color: #fff; margin-bottom: 20px; }
    .splus-license-box input { width: 100%; margin: 20px 0; font-size: 1.2rem; text-align: center; }
    .splus-error { color: #ef4444; margin-top: 10px; display: none; }
    /* Features */
    .custom-plus-profile { background: linear-gradient(-45deg, #a78bfa, #8b5cf6, #ec4899, #6366f1); background-size: 300% 300%; -webkit-background-clip: text; background-clip: text; color: transparent !important; -webkit-text-fill-color: transparent; font-weight: 800 !important; animation: gradient-text-anim 5s ease infinite; display: inline-block; }
    @keyframes gradient-text-anim { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
    .custom-plus-logo { height: 50px !important; width: auto !important; max-width: 200px !important; margin-top: 4px !important; object-fit: contain !important; border-radius: 6px !important; border: 2px solid var(--accent-primary) !important; background-color: #000; }
    .item-collapse-btn { position: absolute; bottom: -8px; left: 50%; transform: translateX(-50%); width: 24px; height: 24px; padding: 0 !important; background: var(--bg-panel) !important; border: 1px solid var(--border-color) !important; border-radius: 50% !important; color: var(--text-secondary) !important; font-size: 10px; cursor: pointer; opacity: 0; transition: opacity 0.2s; z-index: 10; }
    .s-edge-feed > li:hover .item-collapse-btn { opacity: 1; }
    .announcement-collapsed .edge-main-wrapper, .announcement-collapsed .edge-footer { display: none !important; }
    .announcement-collapsed .edge-item { padding-bottom: 5px !important; }
    .announcement-collapsed .item-collapse-btn { opacity: 1; }
    .s-material-folder-row-wrapper { display: flex !important; align-items: center !important; background-color: #1f1f23 !important; border: 1px solid #3f3f46 !important; border-left: 4px solid var(--accent-primary) !important; border-radius: var(--radius-lg); margin-bottom: 10px !important; padding: 15px !important; transition: transform 0.2s ease; }
    .s-material-folder-row-wrapper:hover { transform: translateX(5px); border-color: var(--accent-primary) !important; }
    .inline-icon { margin-right: 15px !important; filter: invert(1) drop-shadow(0 0 2px rgba(255,255,255,0.2)); }
    footer, footer div, footer span { background-color: var(--bg-dark) !important; color: var(--text-secondary) !important; }
    /* Hide unwanted */
    #edge-filters, button[aria-label="Show Apps"], li[data-sgy-sitenav="calendar"], .notification-settings-wrapper, .smart-box-mid { display: none !important; }
    /* Tabbed Nav */
    .sgy-tabbed-navigation li a { background: transparent !important; border: none !important; color: var(--text-secondary) !important; }
    .sgy-tabbed-navigation li.active a { color: #fff !important; border-bottom: 3px solid var(--accent-primary) !important; background-color: rgba(255,255,255,0.05) !important; }
    /* Announcements Header */
    .custom-announcements-header { display: flex; align-items: center; gap: 8px; margin-bottom: 15px; padding: 0; }
    .custom-announcements-header h2 { color: #fff !important; margin: 0; font-size: 1.4rem; border-bottom: 2px solid var(--accent-primary); padding-bottom: 5px; }
    .announcements-info-btn { width: 20px; height: 20px; padding: 0 !important; background: var(--bg-panel) !important; border: 1px solid var(--border-color) !important; border-radius: 50% !important; color: var(--text-secondary) !important; font-size: 12px; font-weight: bold; cursor: pointer; position: relative; }
    .announcements-tooltip { display: none; position: absolute; top: 100%; left: 50%; transform: translateX(-50%); margin-top: 8px; padding: 10px 12px; background: var(--bg-panel); border: 1px solid var(--border-color); border-radius: var(--radius-md); color: var(--text-secondary); font-size: 12px; width: 250px; text-align: left; z-index: 1000; box-shadow: 0 4px 12px rgba(0,0,0,0.3); }
    .announcements-info-btn:hover .announcements-tooltip { display: block; }
    /* Assignment React Overrides */
    div[class*="profile-container"], div[class*="profile-header"], div[class*="layout-row-outer"], div[class*="layout-column"] { background: transparent !important; border: none !important; box-shadow: none !important; }
    div[class*="content-box-container"] { background-color: var(--bg-panel) !important; border: 1px solid var(--border-color) !important; border-radius: var(--radius-lg) !important; padding: 25px !important; }
    h1[class*="heading1-root"] { color: #fff !important; text-shadow: 0 2px 4px rgba(0,0,0,0.5); }
    .profile-picture img { border-radius: 50% !important; border: 2px solid var(--border-color) !important; }
    `;

    GM_addStyle(styles);

    // --- MAIN LOGIC ---
    console.log("Schoology Plus (Userscript): Active");

    function init() {
        checkLicense();
    }

    function startFeatures() {
        const mainInner = document.getElementById('main-inner') || document.getElementById('content-wrapper');
        
        injectCourseGrid(mainInner);
        setupAnnouncementsHeader();
        setupIndividualCollapses();
        setupRecentlyCompleted();
        setupProfileName();
        replaceLogo();
        setupLikes();
        hideGrades();
        setupFooter();
    }

    function checkLicense() {
        const key = localStorage.getItem('schoology_plus_key');
        const lastCheck = localStorage.getItem('schoology_plus_last_check');
        const now = Date.now();
        const oneDay = 24 * 60 * 60 * 1000;

        if (key && lastCheck && (now - parseInt(lastCheck) < oneDay)) {
             startFeatures();
             return; 
        }

        if (key || lastCheck) {
            localStorage.removeItem('schoology_plus_key');
            localStorage.removeItem('schoology_plus_last_check');
        }

        const overlay = document.createElement('div');
        overlay.id = 'splus-license-overlay';
        overlay.innerHTML = `
            <div class="splus-license-box">
                <h1 class="custom-plus-profile" style="font-size: 2rem;">Schoology Plus</h1>
                <p>Please enter your license key to continue.</p>
                <input type="text" id="splus-key-input" placeholder="XXXX-XXXX-XXXX" autocomplete="off">
                <button id="splus-verify-btn">Verify License</button>
                <p class="splus-error" id="splus-error-msg">Invalid Key. Please try again.</p>
                <p style="margin-top: 20px; font-size: 0.8rem; color: #666;">Keys are case-sensitive (Re-enter every 24h).</p>
            </div>
        `;
        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';

        const btn = document.getElementById('splus-verify-btn');
        const input = document.getElementById('splus-key-input');
        const errorMsg = document.getElementById('splus-error-msg');

        btn.onclick = () => {
            btn.innerText = "Checking...";
            const inputVal = input.value.trim();
            
            // Use GM_xmlhttpRequest to avoid CORS issues in userscript context
            GM_xmlhttpRequest({
                method: "GET",
                url: "https://raw.githubusercontent.com/nxghtCry0/lmaowwaht/refs/heads/main/hehe.txt",
                onload: function(response) {
                    if (response.status === 200) {
                        const text = response.responseText;
                        const validKeys = text.split('\n').map(k => k.trim()).filter(k => k);

                        if (validKeys.includes(inputVal)) {
                            localStorage.setItem('schoology_plus_key', inputVal);
                            localStorage.setItem('schoology_plus_last_check', Date.now());
                            overlay.remove();
                            document.body.style.overflow = 'auto';
                            startFeatures();
                        } else {
                            errorMsg.style.display = 'block';
                            btn.innerText = "Verify License";
                        }
                    } else {
                        errorMsg.innerText = "Server Error. Try again.";
                        errorMsg.style.display = 'block';
                        btn.innerText = "Verify License";
                    }
                },
                onerror: function(err) {
                    console.error(err);
                    errorMsg.innerText = "Connection Error. Check internet.";
                    errorMsg.style.display = 'block';
                    btn.innerText = "Verify License";
                }
            });
        };
    }

    // --- FEATURES ---

    function injectCourseGrid(mainInner) {
         if (!mainInner) return;
        if (!document.getElementById('custom-courses-section')) {
            const courseContainer = document.createElement('div');
            courseContainer.id = 'custom-courses-section';
            courseContainer.innerHTML = '<h2 style="margin-bottom: 15px; color: #fff;">My Courses</h2><div id="custom-course-grid"><p style="color:#aaa;">Loading courses...</p></div>';
            
            const feedContainer = document.getElementById('home-feed-container') || document.querySelector('.feed');
            const recentHeader = document.querySelector('h2.page-title');
            if(recentHeader && recentHeader.innerText.includes('Recent Activity')) {
                recentHeader.style.display = 'none';
            }

            if (feedContainer) {
                feedContainer.parentNode.insertBefore(courseContainer, feedContainer);
            } else {
                mainInner.prepend(courseContainer);
            }

            loadCourses();
        }
    }

    function loadCourses() {
        fetch('/courses')
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const grid = document.getElementById('custom-course-grid');
                grid.innerHTML = ''; 

                let courseElements = Array.from(doc.querySelectorAll('article'));
                if (courseElements.length === 0) {
                    courseElements = Array.from(doc.querySelectorAll('li.course-item'));
                }

                if(courseElements.length === 0) {
                    grid.innerHTML = '<p style="padding:10px;">Could not load courses automatically. <a href="/courses">View All Courses</a></p>';
                    return;
                }

                courseElements.forEach(course => {
                    const linkEl = course.querySelector('a.course-title') || course.querySelector('a');
                    if(!linkEl) return;
                    if(linkEl.href && linkEl.href.includes('/courses')) return; 

                    const href = linkEl.getAttribute('href');
                    let title = linkEl.innerText;
                    const nestedTitle = course.querySelector('.course-title');
                    if(nestedTitle) title = nestedTitle.innerText;

                    let section = "";
                    const sectionEl = course.querySelector('.section-title') || course.querySelector('.course-section');
                    if (!sectionEl) {
                        const obsSection = course.querySelector('._1wP6w'); 
                        if(obsSection) section = obsSection.innerText;
                    } else {
                        section = sectionEl.innerText;
                    }

                    let bgImage = 'https://asset-cdn.schoology.com/sites/all/themes/schoology_theme/images/course-default.svg';
                    const imgDiv = course.querySelector('.course-logo') || course.querySelector('[class*="card-image"]');
                    if (imgDiv) {
                        const style = imgDiv.getAttribute('style');
                        if (style && style.includes('url')) {
                            const match = style.match(/url\(["']?([^"']*)["']?\)/);
                            if (match && match[1]) bgImage = match[1];
                        } 
                        else if (imgDiv.tagName === 'IMG') bgImage = imgDiv.src;
                        else {
                            const childImg = imgDiv.querySelector('img');
                            if(childImg) bgImage = childImg.src;
                        }
                    }

                    const card = document.createElement('div');
                    card.className = 'custom-course-card';
                    card.onclick = () => window.location.href = href;
                    
                    card.innerHTML = `
                        <div class="course-card-img" style="background-image: url('${bgImage}');"></div>
                        <div class="course-card-info">
                            <span class="course-card-title">${title}</span>
                            <span class="course-card-section">${section}</span>
                        </div>
                    `;
                    grid.appendChild(card);
                });
            });
    }

    function setupAnnouncementsHeader() {
        const smartBox = document.querySelector('.smart-box');
        if (!smartBox || document.getElementById('custom-announcements-header')) return;
        
        const recentActivityH2 = document.querySelector('#home-feed-container > h2');
        if (recentActivityH2) recentActivityH2.style.display = 'none';

        const header = document.createElement('div');
        header.id = 'custom-announcements-header';
        header.className = 'custom-announcements-header';
        header.innerHTML = '<h2>Announcements</h2><button class="announcements-info-btn" type="button">?<span class="announcements-tooltip">Reverts Schoology confusing layout.</span></button>';
        smartBox.parentNode.insertBefore(header, smartBox);
    }

    function setupIndividualCollapses() {
        const addCollapse = (item) => {
            item.classList.add('collapse-processed');
            const edgeItem = item.querySelector('.edge-item');
            const edgeMain = item.querySelector('.edge-main-wrapper');
            if (!edgeItem || !edgeMain) return;

            const collapseBtn = document.createElement('button');
            collapseBtn.className = 'item-collapse-btn';
            collapseBtn.innerHTML = '▼';
            collapseBtn.onclick = function(e) {
                e.stopPropagation();
                const isCollapsed = item.classList.toggle('announcement-collapsed');
                collapseBtn.innerHTML = isCollapsed ? '▶' : '▼';
            };

            const edgeLeft = item.querySelector('.edge-left');
            if (edgeLeft) {
                edgeLeft.style.position = 'relative';
                edgeLeft.appendChild(collapseBtn);
            }
        };

        const checkExist = setInterval(function() {
            const feedItems = document.querySelectorAll('.s-edge-feed > li:not(.s-edge-feed-more-link):not(.collapse-processed)');
            if (feedItems.length > 0) {
                clearInterval(checkExist);
                feedItems.forEach(addCollapse);
            }
        }, 500);

        const observer = new MutationObserver(function() {
            const newItems = document.querySelectorAll('.s-edge-feed > li:not(.s-edge-feed-more-link):not(.collapse-processed)');
            newItems.forEach(addCollapse);
        });

        const feed = document.querySelector('.s-edge-feed');
        if (feed) observer.observe(feed, { childList: true });
    }

    function setupRecentlyCompleted() {
        const checkExist = setInterval(function() {
            const container = document.querySelector('.recently-completed-wrapper');
            if (container) {
                clearInterval(checkExist);
                const header = container.querySelector('h3');
                if(header) {
                    header.innerText = "Grades on Recent Assignments";
                    header.style.textAlign = "center";
                    header.style.color = "#a78bfa";
                }
                const refreshBtn = container.querySelector('.refresh-button');
                if(refreshBtn) {
                    refreshBtn.click();
                    refreshBtn.style.display = 'none';
                }
                const observer = new MutationObserver(function(mutations) {
                    mutations.forEach(function(mutation) {
                        if(mutation.addedNodes.length > 0) {
                            const items = container.querySelectorAll('.item-list li, .s-edge-feed li');
                            items.forEach(item => {
                                item.style.background = '#252525';
                                item.style.borderBottom = '1px solid #333';
                                item.style.padding = '10px';
                            });
                        }
                    });
                });
                const listContainer = container.querySelector('.recently-completed-list');
                if(listContainer) observer.observe(listContainer, { childList: true, subtree: true });
            }
        }, 500);
    }

    function setupProfileName() {
        const checkExist = setInterval(function() {
            const profileEl = document.querySelector('._17Z60');
            if (profileEl && !profileEl.classList.contains('plus-processed')) {
                clearInterval(checkExist);
                const originalName = profileEl.innerText;
                profileEl.innerText = `Welcome to Schoology Plus, ${originalName}`;
                profileEl.classList.add('custom-plus-profile', 'plus-processed');
                profileEl.style.maxWidth = 'none';
                profileEl.style.width = 'auto';
            }
        }, 500);
    }

    function replaceLogo() {
        const checkExist = setInterval(() => {
            const logoWrapper = document.querySelector('[data-sgy-sitenav="header-logo"]') || document.querySelector('[data-sgy-sitenav="custom-header-logo"]');
            const logo = logoWrapper ? logoWrapper.querySelector('img') : null;
            if (logoWrapper && logo) {
                clearInterval(checkExist);
                logoWrapper.removeAttribute('class');
                logoWrapper.setAttribute('data-sgy-sitenav', 'custom-header-logo');
                logoWrapper.style.display = 'flex';
                logoWrapper.style.alignItems = 'center';
                logo.src = 'https://iili.io/fzPKDb4.md.jpg';
                logo.classList.add('custom-plus-logo');
            }
        }, 100);
    }

    function setupLikes() {
        const processLikes = () => {
            const likeSpans = document.querySelectorAll('.s-like-sentence > span:first-child:not(.like-emoji-processed)');
            likeSpans.forEach(span => {
                span.innerText = '👍';
                span.classList.add('like-emoji-processed');
                span.style.background = 'none'; 
                span.style.width = 'auto'; span.style.height = 'auto'; span.style.marginRight = '5px';
                span.style.display = 'inline-block'; span.style.fontSize = '14px';
            });
        };
        processLikes();
        const observer = new MutationObserver(processLikes);
        const feed = document.getElementById('main');
        if (feed) observer.observe(feed, { childList: true, subtree: true });
    }

    function hideGrades() {
        setInterval(() => {
            const buttons = document.querySelectorAll('button');
            buttons.forEach(btn => {
                if (btn.innerText.includes('Grades')) {
                    const listItem = btn.closest('li');
                    if (listItem) listItem.style.display = 'none';
                }
            });
        }, 500);
    }

    function setupFooter() {
        const checkExist = setInterval(() => {
            const footer = document.querySelector('footer');
            if (footer) {
                const copyright = footer.querySelector('#copyright') || footer.querySelector('.Footer-copyright-2Vt6I');
                if (copyright) copyright.innerText = "Schoology+ © 2025, All Rights Reserved";
                footer.style.backgroundColor = ''; footer.style.color = '';
                const children = footer.querySelectorAll('*');
                children.forEach(child => { child.style.backgroundColor = ''; child.style.color = ''; });
                clearInterval(checkExist);
            }
        }, 1000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
