// BazaarHub Vanilla App Logic

// Mock Data
const PRODUCTS = [
    { id: "t1", name: "ProMax Ultra Laptop", category: "Tech", price: 1899, description: "The ultimate machine for creative professionals.", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800" },
    { id: "t2", name: "NeuralLink VR Headset", category: "Tech", price: 999, description: "Experience the metaverse in stunning 8K resolution.", image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&q=80&w=800" },
    { id: "g3", name: "Airpods", category: "Gadgets", price: 199, description: "High-quality wireless earbuds with noise cancellation.", image: "assets/products/airpods.jpeg" },
    { id: "g4", name: "Lint Remover", category: "Gadgets", price: 25, description: "Rechargeable lint remover to keep clothes looking new.", image: "assets/products/lint-remover.jpeg" },
    { id: "g5", name: "Portable Aircooler", category: "Gadgets", price: 59, description: "Compact personal air cooler with USB power.", image: "assets/products/portable-aircooler.jpeg" },
    { id: "g6", name: "Portable Fan", category: "Gadgets", price: 35, description: "Rechargeable handheld fan for on-the-go cooling.", image: "assets/products/portable-fan.jpeg" },
    { id: "hb1", name: "GlowSkin Serum", category: "Health", price: 85, description: "Advanced hydration and anti-aging formula.", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800" },
    { id: "hb2", name: "Electric Massager", category: "Health", price: 129, description: "Portable percussion massager for muscle relief.", image: "assets/products/electric-massager.jpeg" },
    { id: "hb3", name: "Hair Dryer", category: "Health", price: 79, description: "Professional-grade hair dryer with multiple settings.", image: "assets/products/hair-dryer.jpeg" },
    { id: "ka1", name: "ChefMaster Air Fryer", category: "Kitchen", price: 199, description: "Crispy perfection with 360-degree heat circulation.", image: "https://images.unsplash.com/photo-1585503418537-88331351ad99?auto=format&fit=crop&q=80&w=800" },
    { id: "ka2", name: "Electric Heater", category: "Kitchen", price: 89, description: "Efficient and portable heater for small rooms.", image: "assets/products/electric-heater.jpeg" },
    { id: "ka3", name: "Electric Mop", category: "Kitchen", price: 149, description: "Cordless electric mop for effortless cleaning.", image: "assets/products/electric-mop.jpeg" },
    { id: "ka4", name: "Juicer", category: "Kitchen", price: 119, description: "High-speed centrifugal juicer for fresh drinks.", image: "assets/products/juicer.jpeg" },
    { id: "ka5", name: "Vacuum", category: "Kitchen", price: 299, description: "Powerful cordless vacuum with HEPA filtration.", image: "assets/products/vacuum.jpeg" },
    { id: "wb1", name: "AquaPure Smart Bottle", category: "Bottles", price: 45, description: "UV-C LED sterilization keeps your water pure.", image: "assets/products/AquaPure Smart Bottle.jpeg" },
    { id: "wb2", name: "Stanley Bottle", category: "Bottles", price: 45, description: "Durable insulated bottle keeps drinks cold.", image: "assets/products/stanley-bottle.jpeg" },
];

document.addEventListener("DOMContentLoaded", () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Initialize Smooth Scroll (Lenis)
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // GSAP ScrollTrigger Integration
    lenis.on('scroll', ScrollTrigger.update);
    gsap.registerPlugin(ScrollTrigger);

    // Custom Cursor
    const cursorOuter = document.querySelector('.cursor-outer');
    const cursorInner = document.querySelector('.cursor-inner');

    window.addEventListener('mousemove', (e) => {
        gsap.to(cursorOuter, { x: e.clientX, y: e.clientY, duration: 0.5, ease: 'power2.out' });
        gsap.to(cursorInner, { x: e.clientX, y: e.clientY, duration: 0.1 });
    });

    // Cursor Hover Effects
    const addCursorHover = (elements) => {
        elements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                gsap.to(cursorOuter, { scale: 2, borderColor: 'var(--accent)', duration: 0.3 });
            });
            el.addEventListener('mouseleave', () => {
                gsap.to(cursorOuter, { scale: 1, borderColor: 'rgba(255, 255, 255, 0.3)', duration: 0.3 });
            });
        });
    };
    addCursorHover(document.querySelectorAll('a, button'));

    // Navbar Scroll Effect
    const navLogo = document.querySelector('.nav-logo');
    gsap.set(navLogo, { opacity: 0 });

    ScrollTrigger.create({
        start: 'top -80',
        onEnter: () => document.querySelector('.navbar').classList.add('scrolled'),
        onLeaveBack: () => document.querySelector('.navbar').classList.remove('scrolled'),
    });

    // Cinematic Hero Animations
    const heroLogo = document.querySelector('.hero-logo');
    if (heroLogo) {
        const heroTl = gsap.timeline({
            scrollTrigger: {
                trigger: '.cinematic-hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true,
                onEnter: () => {
                    gsap.to('.hero-logo', {
                        opacity: 1,
                        scale: 1,
                        duration: 1.5,
                        ease: "elastic.out(1, 0.3)",
                        onStart: () => {
                            heroLogo.classList.add('logo-crazy-reveal');
                        }
                    });
                }
            }
        });

        heroTl.to('.hero-logo', { scale: 0.15, x: '-42vw', y: '-46vh', opacity: 0, duration: 1 })
            .to(navLogo, { opacity: 1, duration: 0.1 }, 0.8)
            .to('.hero-text', { opacity: 1, y: 0, duration: 0.5 }, 0)
            .to('.scroll-prompt', { opacity: 0, duration: 0.2 }, 0);

        gsap.set('.hero-text', { opacity: 0, y: 50 });
    } else {
        // Safe fallback for pages without hero logo
        gsap.set(navLogo, { opacity: 1 });
    }

    // Scrollytelling Sequence (Canvas)
    const canvas = document.getElementById('scrolly-canvas');
    if (canvas) {
        const context = canvas.getContext('2d');
        const frameCount = 240;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const currentFrame = index => `assets/sequence/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`;

        const images = [];
        const sequence = { frame: 0 };

        let loadedCount = 0;
        let preloaderFinished = false;

        const finishPreloader = () => {
            if (preloaderFinished) return;
            preloaderFinished = true;

            gsap.to('.preloader', {
                opacity: 0,
                duration: 1,
                delay: 0.5,
                onComplete: () => {
                    document.querySelector('.preloader').style.display = 'none';
                    initScrolly();
                }
            });
        };

        // Failsafe: Continue after 8 seconds regardless of loading state
        setTimeout(finishPreloader, 8000);

        for (let i = 0; i < frameCount; i++) {
            const img = new Image();
            img.src = currentFrame(i);

            const handleImageLoad = () => {
                loadedCount++;
                const progress = Math.round((loadedCount / frameCount) * 100);
                const bar = document.querySelector('.preloader-bar');
                const text = document.querySelector('.preloader-text');

                if (bar) bar.style.width = progress + '%';
                if (text) text.innerText = `INITIALIZING BAZAARHUB EXCELLENCE (${progress}%)`;

                if (loadedCount >= frameCount) {
                    finishPreloader();
                }
            };

            img.onload = handleImageLoad;
            img.onerror = handleImageLoad; // Continue even if image fails
            images.push(img);
        }

        function render() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            const img = images[sequence.frame];
            if (!img) return;

            const canvasAspect = canvas.width / canvas.height;
            const imgAspect = img.width / img.height;
            let drawWidth, drawHeight, offsetX, offsetY;

            if (canvasAspect > imgAspect) {
                drawHeight = canvas.height;
                drawWidth = drawHeight * imgAspect;
                offsetX = (canvas.width - drawWidth) / 2;
                offsetY = 0;
            } else {
                drawWidth = canvas.width;
                drawHeight = drawWidth / imgAspect;
                offsetX = 0;
                offsetY = (canvas.height - drawHeight) / 2;
            }

            context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        }

        function initScrolly() {
            gsap.to(sequence, {
                frame: frameCount - 1,
                snap: 'frame',
                ease: 'none',
                scrollTrigger: {
                    trigger: '.scrolly-section',
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 1,
                },
                onUpdate: render
            });

            const steps = gsap.utils.toArray('.story-step');
            steps.forEach((step, i) => {
                gsap.timeline({
                    scrollTrigger: {
                        trigger: '.scrolly-section',
                        start: `${(i * 20) + 10}% top`,
                        end: `${(i * 20) + 30}% top`,
                        scrub: true,
                    }
                })
                    .to(step, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1 })
                    .to(step, { opacity: 0, y: -50, filter: 'blur(10px)', duration: 1 }, '+=1');
            });

            render();
        }

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            render();
        });
    } else {
        // Safe dismissal for pages without canvas
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            gsap.to(preloader, {
                opacity: 0, duration: 0.5, onComplete: () => {
                    preloader.style.display = 'none';
                }
            });
        }
    }

    // FAQ Accordion
    document.querySelectorAll('.faq-item').forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });



    // Populate Products
    const grids = {
        'Tech': document.getElementById('product-grid-tech'),
        'Gadgets': document.getElementById('product-grid-gadgets'),
        'Health': document.getElementById('product-grid-health'),
        'Kitchen': document.getElementById('product-grid-kitchen'),
        'Bottles': document.getElementById('product-grid-bottles'),
        'default': document.getElementById('product-grid')
    };

    PRODUCTS.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="p-image-wrap">
                <img src="${product.image}" alt="${product.name}">
                <div class="p-overlay">
                    <button class="btn-view-product" data-id="${product.id}">VIEW DETAILS</button>
                </div>
            </div>
            <div class="p-info">
                <p class="p-cat">${product.category}</p>
                <h3 class="p-name">${product.name}</h3>
                <div class="p-bottom">
                    <p class="p-price">$${product.price}</p>
                    <button class="btn-add-cart" data-id="${product.id}">
                        <i data-lucide="shopping-cart"></i>
                    </button>
                </div>
            </div>
        `;

        const targetGrid = grids[product.category] || grids['default'];
        if (targetGrid) targetGrid.appendChild(card);
    });
    // 3D Tilt Effect
    const addTiltEffect = (elements) => {
        elements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;

                gsap.to(el, {
                    rotateX: rotateX,
                    rotateY: rotateY,
                    transformPerspective: 1000,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            });

            el.addEventListener('mouseleave', () => {
                gsap.to(el, {
                    rotateX: 0,
                    rotateY: 0,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            });
        });
    };

    lucide.createIcons();
    addCursorHover(document.querySelectorAll('.btn-view-product, .btn-add-cart, .cat-card'));
    addTiltEffect(document.querySelectorAll('.product-card, .cat-card'));

    // Modal Logic
    const modal = document.getElementById('product-modal');
    const modalClose = document.getElementById('modal-close');

    const openModal = (product) => {
        document.getElementById('modal-img').src = product.image;
        document.getElementById('modal-name').innerText = product.name;
        document.getElementById('modal-cat').innerText = product.category;
        document.getElementById('modal-price').innerText = `$${product.price}`;
        document.getElementById('modal-desc').innerText = product.description;

        modal.classList.add('active');
        lenis.stop();
        gsap.fromTo('.modal-content',
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
        );
    };

    const closeModal = () => {
        gsap.to('.modal-content', {
            y: 50, opacity: 0, duration: 0.3, ease: 'power3.in',
            onComplete: () => {
                modal.classList.remove('active');
                lenis.start();
            }
        });
    };

    document.querySelectorAll('.btn-view-product').forEach(btn => {
        btn.addEventListener('click', () => {
            const product = PRODUCTS.find(p => p.id === btn.dataset.id);
            if (product) openModal(product);
        });
    });

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Cart State Persistence
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const updateCartUI = () => {
        const counts = document.querySelectorAll('.cart-count');
        const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        counts.forEach(c => {
            c.textContent = totalItems;
            c.style.display = totalItems > 0 ? 'flex' : 'none';
        });
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    const addToCart = (product) => {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 1) + 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCartUI();

        // Notification
        gsap.fromTo('.cart-count', { scale: 1.5 }, { scale: 1, duration: 0.3 });
    };

    // Initialize UI
    updateCartUI();

    document.querySelectorAll('.btn-add-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const product = PRODUCTS.find(p => p.id === btn.dataset.id);
            if (product) {
                addToCart(product);

                // Visual Feedback
                const originalContent = btn.innerHTML;
                btn.innerHTML = '<i data-lucide="check" style="width:14px"></i>';
                lucide.createIcons();
                setTimeout(() => {
                    btn.innerHTML = originalContent;
                    lucide.createIcons();
                }, 2000);
            }
        });
    });

    // Smooth Scroll to Shop
    const btnExplore = document.getElementById('btn-explore');
    if (btnExplore) {
        btnExplore.addEventListener('click', () => {
            lenis.scrollTo('#shop-start');
        });
    }

    // Navbar Navigation
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            if (target.startsWith('#')) {
                lenis.scrollTo(target);
            }
        });
    });
});
