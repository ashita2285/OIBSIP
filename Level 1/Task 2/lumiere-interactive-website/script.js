const products = [
    {
        id: 1, name: "Luna Ceramic Vase", category: "Home", price: 899,
        image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=700&q=80",
        description: "A soft, minimal ceramic vase designed to add a calm decorative touch to shelves, tables and bedside spaces."
    },
    {
        id: 2, name: "Sage Linen Shirt", category: "Fashion", price: 1499,
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=700&q=80",
        description: "A relaxed everyday linen shirt with a clean silhouette and breathable feel."
    },
    {
        id: 3, name: "Calm Candle Set", category: "Wellness", price: 799,
        image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=700&q=80",
        description: "A set of softly scented candles created for slow evenings, reading corners and relaxing routines."
    },
    {
        id: 4, name: "Classic Watch", category: "Accessories", price: 2199,
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=700&q=80",
        description: "A timeless accessory with a clean face and versatile style for everyday wear."
    },
    {
        id: 5, name: "Soft Throw Blanket", category: "Home", price: 1699,
        image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=700&q=80",
        description: "A cozy throw that adds warmth and texture to sofas, chairs and bedrooms."
    },
    {
        id: 6, name: "Everyday Tote", category: "Fashion", price: 1199,
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=700&q=80",
        description: "A practical tote with a simple look, designed for daily essentials."
    },
    {
        id: 7, name: "Aroma Diffuser", category: "Wellness", price: 1899,
        image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=700&q=80",
        description: "A compact diffuser for creating a peaceful atmosphere at home."
    },
    {
        id: 8, name: "Minimal Sunglasses", category: "Accessories", price: 1299,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=80",
        description: "A clean, versatile frame designed to complement everyday outfits."
    }
];

let cart = JSON.parse(localStorage.getItem("lumiereCart") || "[]");
let wishlist = JSON.parse(localStorage.getItem("lumiereWishlist") || "[]");
let authMode = "login";
let selectedProduct = null;

const $ = id => document.getElementById(id);

function money(value) {
    return "₹" + value.toLocaleString("en-IN");
}

function save() {
    localStorage.setItem("lumiereCart", JSON.stringify(cart));
    localStorage.setItem("lumiereWishlist", JSON.stringify(wishlist));
}

function toast(message) {
    $("toast").textContent = message;
    $("toast").classList.add("show");
    setTimeout(() => $("toast").classList.remove("show"), 2200);
}

function showModal(id) {
    $(id).classList.add("show");
}

function closeModal(id) {
    $(id).classList.remove("show");
}

function renderProducts(filter = "All", search = "") {
    const term = search.toLowerCase().trim();
    const filtered = products.filter(p =>
        (filter === "All" || p.category === filter) &&
        (!term || `${p.name} ${p.category} ${p.description}`.toLowerCase().includes(term))
    );

    $("productGrid").innerHTML = filtered.length ? filtered.map(p => `
        <article class="product-card">
            <div class="product-image-wrap">
                <img src="${p.image}" alt="${p.name}">
                <button class="wish ${wishlist.includes(p.id) ? "saved" : ""}" data-wish="${p.id}" title="Add to wishlist">
                    ${wishlist.includes(p.id) ? "♥" : "♡"}
                </button>
            </div>
            <div class="product-info">
                <span class="eyebrow">${p.category}</span>
                <h3>${p.name}</h3>
                <p>${p.description}</p>
                <div class="product-bottom">
                    <span class="price">${money(p.price)}</span>
                    <button class="small-btn" data-product="${p.id}">View Details</button>
                </div>
            </div>
        </article>
    `).join("") : `<p>No matching products found. Try another search.</p>`;
}

function renderCart() {
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    $("cartCount").textContent = count;

    if (!cart.length) {
        $("cartItems").innerHTML = `<p>Your cart is empty. Explore the collection and add something you love.</p>`;
        $("cartTotal").textContent = "";
        return;
    }

    $("cartItems").innerHTML = cart.map(item => {
        const p = products.find(x => x.id === item.id);
        return `
            <div class="cart-item">
                <img src="${p.image}" alt="${p.name}">
                <div>
                    <h4>${p.name}</h4>
                    <small>${money(p.price)}</small>
                    <div class="qty">
                        <button data-dec="${p.id}">−</button>
                        <span>${item.qty}</span>
                        <button data-inc="${p.id}">+</button>
                    </div>
                </div>
                <button class="remove" data-remove="${p.id}">Remove</button>
            </div>
        `;
    }).join("");

    const total = cart.reduce((sum, item) => {
        const p = products.find(x => x.id === item.id);
        return sum + p.price * item.qty;
    }, 0);

    $("cartTotal").textContent = `Total: ${money(total)}`;
}

function renderWishlist() {
    $("wishlistCount").textContent = wishlist.length;

    if (!wishlist.length) {
        $("wishlistItems").innerHTML = `<p>Your wishlist is empty. Tap ♡ on a product to save it.</p>`;
        return;
    }

    $("wishlistItems").innerHTML = wishlist.map(id => {
        const p = products.find(x => x.id === id);
        return `
            <div class="wish-item">
                <img src="${p.image}" alt="${p.name}">
                <div>
                    <h4>${p.name}</h4>
                    <small>${money(p.price)}</small>
                </div>
                <button class="remove" data-wish-remove="${p.id}">Remove</button>
            </div>
        `;
    }).join("");
}

function addToCart(id) {
    const existing = cart.find(x => x.id === id);
    if (existing) existing.qty++;
    else cart.push({ id, qty: 1 });
    save();
    renderCart();
    toast("Added to your cart.");
}

function toggleWishlist(id) {
    if (wishlist.includes(id)) {
        wishlist = wishlist.filter(x => x !== id);
        toast("Removed from wishlist.");
    } else {
        wishlist.push(id);
        toast("Saved to wishlist.");
    }
    save();
    renderProducts(document.querySelector(".filter.active")?.dataset.filter || "All", $("searchInput").value);
    renderWishlist();
}

function openProduct(id) {
    selectedProduct = products.find(p => p.id === id);
    $("modalProductImage").src = selectedProduct.image;
    $("modalProductImage").alt = selectedProduct.name;
    $("modalProductCategory").textContent = selectedProduct.category;
    $("modalProductName").textContent = selectedProduct.name;
    $("modalProductDescription").textContent = selectedProduct.description;
    $("modalProductPrice").textContent = money(selectedProduct.price);
    showModal("productModal");
}

document.addEventListener("click", e => {
    const productButton = e.target.closest("[data-product]");
    if (productButton) openProduct(Number(productButton.dataset.product));

    const wishButton = e.target.closest("[data-wish]");
    if (wishButton) toggleWishlist(Number(wishButton.dataset.wish));

    const infoButton = e.target.closest("[data-info]");
    if (infoButton) {
        $("infoTitle").textContent = infoButton.textContent.trim() || "About Lumière";
        $("infoText").textContent = infoButton.dataset.info;
        showModal("infoModal");
    }

    const category = e.target.closest("[data-category]");
    if (category) {
        document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
        const matching = document.querySelector(`.filter[data-filter="${category.dataset.category}"]`);
        if (matching) matching.classList.add("active");
        renderProducts(category.dataset.category);
        $("shop").scrollIntoView({ behavior: "smooth" });
    }

    const inc = e.target.closest("[data-inc]");
    if (inc) {
        const item = cart.find(x => x.id === Number(inc.dataset.inc));
        if (item) item.qty++;
        save(); renderCart();
    }

    const dec = e.target.closest("[data-dec]");
    if (dec) {
        const item = cart.find(x => x.id === Number(dec.dataset.dec));
        if (item) item.qty--;
        cart = cart.filter(x => x.qty > 0);
        save(); renderCart();
    }

    const remove = e.target.closest("[data-remove]");
    if (remove) {
        cart = cart.filter(x => x.id !== Number(remove.dataset.remove));
        save(); renderCart(); toast("Removed from cart.");
    }

    const wishRemove = e.target.closest("[data-wish-remove]");
    if (wishRemove) {
        wishlist = wishlist.filter(x => x !== Number(wishRemove.dataset.wishRemove));
        save(); renderWishlist(); renderProducts();
    }

    const close = e.target.closest("[data-close]");
    if (close) closeModal(close.dataset.close);
});

$("modalAddCart").addEventListener("click", () => {
    if (selectedProduct) addToCart(selectedProduct.id);
    closeModal("productModal");
});

$("cartBtn").addEventListener("click", () => {
    renderCart();
    $("cartPanel").classList.add("open");
});

$("wishlistBtn").addEventListener("click", () => {
    renderWishlist();
    $("wishlistPanel").classList.add("open");
});

$("closeCart").addEventListener("click", () => $("cartPanel").classList.remove("open"));
$("closeWishlist").addEventListener("click", () => $("wishlistPanel").classList.remove("open"));

$("searchBtn").addEventListener("click", () => {
    $("searchPanel").classList.toggle("show");
    if ($("searchPanel").classList.contains("show")) $("searchInput").focus();
});

$("searchInput").addEventListener("input", e => renderProducts("All", e.target.value));

document.querySelectorAll(".filter").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
        button.classList.add("active");
        renderProducts(button.dataset.filter, $("searchInput").value);
    });
});

document.querySelectorAll(".faq-item").forEach(item => {
    item.addEventListener("click", () => item.classList.toggle("open"));
});

$("menuToggle").addEventListener("click", () => $("mainNav").classList.toggle("open"));

function openAuth() {
    showModal("loginModal");
    updateAuthUI();
}

function updateAuthUI() {
    const signup = authMode === "signup";
    $("authTitle").textContent = signup ? "Create Account" : "Welcome Back";
    $("authSubtitle").textContent = signup ? "Create your Lumière account." : "Login to your Lumière account.";
    $("nameField").classList.toggle("hidden", !signup);
    $("authName").required = signup;
    $("authSubmit").textContent = signup ? "Create Account" : "Login";
    $("switchAuth").textContent = signup ? "Already have an account? Login" : "New here? Create an account";
    $("authMessage").textContent = "";
}

$("loginBtn").addEventListener("click", openAuth);
$("footerLogin").addEventListener("click", openAuth);

$("switchAuth").addEventListener("click", () => {
    authMode = authMode === "login" ? "signup" : "login";
    updateAuthUI();
});

$("authForm").addEventListener("submit", e => {
    e.preventDefault();

    const email = $("authEmail").value.trim().toLowerCase();
    const password = $("authPassword").value;

    if (authMode === "signup") {
        const name = $("authName").value.trim();
        localStorage.setItem("lumiereUser", JSON.stringify({ name, email, password }));
        $("authMessage").textContent = "Account created successfully. You can now log in.";
        $("authMessage").style.color = "green";
        authMode = "login";
        setTimeout(updateAuthUI, 1000);
    } else {
        const user = JSON.parse(localStorage.getItem("lumiereUser") || "null");

        if (!user) {
            $("authMessage").textContent = "No account found. Please create an account first.";
            $("authMessage").style.color = "#a45159";
            return;
        }

        if (user.email === email && user.password === password) {
            localStorage.setItem("lumiereLoggedIn", "true");
            $("authMessage").textContent = `Welcome back, ${user.name}! Login successful.`;
            $("authMessage").style.color = "green";
            setTimeout(() => closeModal("loginModal"), 1000);
        } else {
            $("authMessage").textContent = "Email or password is incorrect.";
            $("authMessage").style.color = "#a45159";
        }
    }
});

$("contactForm").addEventListener("submit", e => {
    e.preventDefault();
    const message = $("contactMessageStatus");
    message.textContent = "Thank you! Your message has been received in this demo.";
    $("contactForm").reset();
});

$("checkoutBtn").addEventListener("click", () => {
    if (!cart.length) {
        toast("Your cart is empty.");
        return;
    }
    toast("Checkout demo: your order is ready to be processed.");
});

window.addEventListener("click", e => {
    if (e.target.classList.contains("modal-overlay")) e.target.classList.remove("show");
});

renderProducts();
renderCart();
renderWishlist();
