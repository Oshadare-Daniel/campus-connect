
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("product-search");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const productCards = document.querySelectorAll(".product-card");
    const noProductsMessage = document.getElementById("no-products");

    // Stop if this page does not contain the marketplace.
    if (!searchInput || productCards.length === 0) {
        return;
    }

    let selectedCategory = "all";

    function filterProducts() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        let visibleProducts = 0;

        productCards.forEach((card) => {
            const category = card.dataset.category || "";
            const productName = card.dataset.name || "";
            const productText = card.textContent.toLowerCase();

            const matchesCategory =
                selectedCategory === "all" ||
                category === selectedCategory;

            const matchesSearch =
                productName.includes(searchTerm) ||
                productText.includes(searchTerm);

            const shouldShow = matchesCategory && matchesSearch;

            card.hidden = !shouldShow;

            if (shouldShow) {
                visibleProducts++;
            }
        });

        if (noProductsMessage) {
            noProductsMessage.hidden = visibleProducts !== 0;
        }
    }

    // Search as the user types.
    searchInput.addEventListener("input", filterProducts);

    // Filter when a category button is selected.
    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            selectedCategory = button.dataset.filter || "all";

            filterButtons.forEach((item) => {
                item.classList.remove("active");
            });

            button.classList.add("active");

            filterProducts();
        });
    });

    filterProducts();
});
