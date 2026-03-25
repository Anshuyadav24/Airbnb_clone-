// Prevent form reload if submitted by mistake
document.getElementById("searchForm").addEventListener("submit", (e) => {
    e.preventDefault();
});

const btn = document.getElementById("btnSearch");
const input = document.getElementById("locationInput");
const cards = document.querySelectorAll(".card");

// Search only when button clicked
btn.addEventListener("click", () => {
    const value = input.value.toLowerCase().trim();

    cards.forEach(card => {
        const location = card.querySelector(".price")?.innerText.toLowerCase() || "";

        if (location.includes(value)) {
            card.style.display = "block";  // show card
        } else {
            card.style.display = "none";   // hide card
        }
    });
});
