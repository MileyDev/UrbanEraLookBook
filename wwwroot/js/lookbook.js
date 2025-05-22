window.lookbook = {
    dotNetRef: null,

    init: function () {
        const wrapper = document.getElementById("lookbookWrapper") || document.getElementById("lookbook");

        // Touch swipe (horizontal)
        let startX;
        wrapper.addEventListener("touchstart", (e) => {
            startX = e.touches[0].clientX;
        });

        wrapper.addEventListener("touchend", (e) => {
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            if (diff > 50) {
                wrapper.scrollBy({ left: wrapper.clientWidth, behavior: "smooth" });
            } else if (diff < -50) {
                wrapper.scrollBy({ left: -wrapper.clientWidth, behavior: "smooth" });
            }
        });

        // Touch swipe down (vertical)
        let startY;
        wrapper.addEventListener("touchstart", (e) => {
            startY = e.touches[0].clientY;
        });

        wrapper.addEventListener("touchend", (e) => {
            const endY = e.changedTouches[0].clientY;
            if (startY - endY < -100 && window.lookbook.dotNetRef) {
                window.lookbook.dotNetRef.invokeMethodAsync("ExitLookbook");
            }
        });

        // IntersectionObserver for video autoplay
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const el = entry.target;
                if (el.tagName === "VIDEO") {
                    entry.isIntersecting ? el.play() : el.pause();
                }
            });
        }, { threshold: 0.9 });

        document.querySelectorAll('[data-observe], video').forEach(el => observer.observe(el));

        // Debounced scroll handling
        let scrollTimeout;
        wrapper.addEventListener("scroll", () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                if (window.lookbook.dotNetRef) {
                    window.lookbook.dotNetRef.invokeMethodAsync("UpdateCurrentSlideAsync");
                }
            }, 200); // Delay: 200ms after scroll stops
        });
    },

    scrollBy: function (element, direction) {
        if (!element || !element.scrollBy) return;
        element.scrollBy({
            left: direction * element.clientWidth,
            behavior: "smooth"
        });
    }
};

window.initializeLookbookInterop = (dotNetRef) => {
    window.lookbook.dotNetRef = dotNetRef;
    window.lookbook.init();
};

window.getCurrentSlideIndex = () => {
    const container = document.getElementById("lookbook");
    return Math.round(container.scrollLeft / window.innerWidth);
};
