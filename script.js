document.addEventListener("DOMContentLoaded", () => {
    // 1. Light / Dark Mode Engine
    const themeBtn = document.getElementById("theme-toggle");
    let currentTheme = localStorage.getItem("theme") || "dark";
    
    function applyTheme(theme) {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
        if (themeBtn) {
            const icon = themeBtn.querySelector(".theme-icon");
            if (theme === "dark") {
                themeBtn.innerHTML = '<span class="theme-icon">🌕</span> Light Mode';
            } else {
                themeBtn.innerHTML = '<span class="theme-icon">🌑</span> Dark Mode';
            }
        }
    }
    
    applyTheme(currentTheme);
    
    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            currentTheme = currentTheme === "dark" ? "light" : "dark";
            applyTheme(currentTheme);
        });
    }
    
    // 2. Tab Switcher System (Home vs Library View)
    const navHome = document.getElementById("nav-home");
    const navLibrary = document.getElementById("nav-library");
    const sectionTitle = document.getElementById("section-title");
    const libraryFilters = document.getElementById("library-filters");
    const cards = document.querySelectorAll(".book-card");
    
    function showHomeView() {
        if (navHome) navHome.classList.add("active");
        if (navLibrary) navLibrary.classList.remove("active");
        if (sectionTitle) sectionTitle.textContent = "Top 15 Trending Stories";
        
        // Hide Search and Genre drawer on Home View
        if (libraryFilters) libraryFilters.style.display = "none";
        
        cards.forEach(card => {
            if (card.classList.contains("top-story")) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    }
    
    function showLibraryView() {
        if (navLibrary) navLibrary.classList.add("active");
        if (navHome) navHome.classList.remove("active");
        if (sectionTitle) sectionTitle.textContent = "Full 30 Books Collection";
        
        // Show Search and Genre drawer exclusively on Library View
        if (libraryFilters) libraryFilters.style.display = "block";
        
        cards.forEach(card => {
            card.style.display = "block";
        });
    }
    
    if (navHome) navHome.addEventListener("click", showHomeView);
    if (navLibrary) navLibrary.addEventListener("click", showLibraryView);
    
    // Initial View State
    showHomeView();
    
    // 3. Drawers Toggle (Search & Genre)
    const btnSearch = document.getElementById("btn-search-toggle");
    const btnGenre = document.getElementById("btn-genre-toggle");
    const searchBox = document.getElementById("search-box");
    const genreDrawer = document.getElementById("genre-drawer");
    
    if (btnSearch) {
        btnSearch.addEventListener("click", () => {
            searchBox.classList.toggle("active");
            if (genreDrawer) genreDrawer.classList.remove("active");
        });
    }
    
    if (btnGenre) {
        btnGenre.addEventListener("click", () => {
            genreDrawer.classList.toggle("active");
            if (searchBox) searchBox.classList.remove("active");
        });
    }
    
    // 4. Genre Filter Engine
    const genrePills = document.querySelectorAll(".genre-pill");
    genrePills.forEach(pill => {
        pill.addEventListener("click", () => {
            genrePills.forEach(p => p.classList.remove("active"));
            pill.classList.add("active");
            const genreVal = pill.getAttribute("data-genre").toLowerCase();
            
            showLibraryView();
            if (sectionTitle) sectionTitle.textContent = "Filtered Stories (" + genreVal.toUpperCase() + ")";
            
            cards.forEach(card => {
                const cardGenre = card.getAttribute("data-genre").toLowerCase();
                if (genreVal === "all" || cardGenre.includes(genreVal)) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
    
    // 5. Search Engine
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
        searchInput.addEventListener("keyup", () => {
            const query = searchInput.value.toLowerCase().trim();
            showLibraryView();
            cards.forEach(card => {
                const title = card.querySelector("h3").textContent.toLowerCase();
                const genre = card.getAttribute("data-genre").toLowerCase();
                if (title.includes(query) || genre.includes(query)) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    }
    
    // 6. About Modal Window Toggle
    const btnAbout = document.getElementById("btn-about-modal");
    const aboutModal = document.getElementById("about-modal");
    const btnCloseModal = document.getElementById("btn-close-modal");
    
    if (btnAbout && aboutModal) {
        btnAbout.addEventListener("click", () => aboutModal.classList.add("active"));
    }
    if (btnCloseModal && aboutModal) {
        btnCloseModal.addEventListener("click", () => aboutModal.classList.remove("active"));
    }
    
    // 7. Outline Heart Reaction (Turns Red When Clicked)
    const likeBtns = document.querySelectorAll(".btn-like");
    likeBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const icon = btn.querySelector(".heart-icon");
            const span = btn.querySelector(".like-count");
            let val = parseFloat(span.textContent.replace('k+', '')) * 1000;
            
            if (btn.classList.contains("liked")) {
                val -= 1;
                btn.classList.remove("liked");
                if (icon) icon.innerHTML = "&#9825;"; // Unfilled outline heart (♡)
            } else {
                val += 1;
                btn.classList.add("liked");
                if (icon) icon.innerHTML = "&#9829;"; // Red filled heart (♥)
            }
            span.textContent = (val / 1000).toFixed(1) + "k+";
        });
    });
    
    // 8. Card Active Touch Effect (Extra border feedback)
    cards.forEach(card => {
        card.addEventListener("click", () => {
            cards.forEach(c => c.classList.remove("lightning-active"));
            card.classList.add("lightning-active");
        });
    });
});