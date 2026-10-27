
const monthlyData = [
    { month: "Jan", revenue: 1250, units: 3400 },
    { month: "Feb", revenue: 1180, units: 3150 },
    { month: "Mar", revenue: 1420, units: 3900 },
    { month: "Apr", revenue: 1610, units: 4300 },
    { month: "May", revenue: 1550, units: 4050 },
    { month: "Jun", revenue: 1780, units: 4700 }
];
const branchData = [
    { branch: "Colombo", revenue: 2450 },
    { branch: "Kandy", revenue: 1320 },
    { branch: "Galle", revenue: 1170 }
];
const totalRevenue = monthlyData.reduce(
    (total, item) => total + item.revenue,
    0
);
const totalUnits = monthlyData.reduce(
    (total, item) => total + item.units,
    0
);
const bestMonth = monthlyData.reduce(
    (best, item) =>
        item.revenue > best.revenue ? item : best
);
const bestBranch = branchData.reduce(
    (best, item) =>
        item.revenue > best.revenue ? item : best
);
function formatNumber(number) {
    return number.toLocaleString("en-US");
}
document.getElementById("totalRevenue").textContent =
    "LKR " + formatNumber(totalRevenue) + "K";

document.getElementById("totalUnits").textContent =
    formatNumber(totalUnits);

document.getElementById("bestMonth").textContent =
    bestMonth.month;

document.getElementById("bestMonthNote").textContent =
    "LKR " + formatNumber(bestMonth.revenue) + "K revenue";

document.getElementById("bestBranch").textContent =
    bestBranch.branch;

document.getElementById("bestBranchNote").textContent =
    "LKR " + formatNumber(bestBranch.revenue) + "K in Q2";

const salesTableBody =
    document.getElementById("salesTableBody");

monthlyData.forEach(function (item) {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${item.month}</td>
        <td>LKR ${formatNumber(item.revenue)},000</td>
        <td>${formatNumber(item.units)}</td>
    `;

    salesTableBody.appendChild(row);
});
const branchList = document.getElementById("branchList");
const maximumBranchRevenue = Math.max(
    ...branchData.map(item => item.revenue)
);

branchData.forEach(function (item) {
    const card = document.createElement("article");

    card.className = "branch-card";
    const percentage =
        (item.revenue / maximumBranchRevenue) * 100;
    const badge = item.branch === bestBranch.branch
        ? '<span class="best-badge">TOP BRANCH</span>'
        : "";

    card.innerHTML = `
        <div class="branch-top">
            <h3>${item.branch}</h3>
            ${badge}
        </div>

        <p class="branch-amount">
            LKR ${formatNumber(item.revenue)}K
        </p>

        <p class="branch-caption">
            Q2 revenue
        </p>

        <div class="progress-track">
            <div class="progress-fill"
                 style="width: ${percentage}%">
            </div>
        </div>
    `;

    branchList.appendChild(card);
});
const revenueCanvas =
    document.getElementById("revenueChart");

if (typeof Chart !== "undefined" && revenueCanvas) {

    new Chart(revenueCanvas, {
        type: "line",

        data: {
            labels: monthlyData.map(item => item.month),

            datasets: [{
                label: "Revenue (LKR '000)",

                data: monthlyData.map(item => item.revenue),

                borderColor: "#6558e8",
                backgroundColor: "rgba(101, 88, 232, 0.12)",

                borderWidth: 3,
                fill: true,
                tension: 0.35,

                pointRadius: 4,
                pointHoverRadius: 7,
                pointBackgroundColor: "#6558e8"
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: {
                    display: false
                },

                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return "LKR " +
                                formatNumber(context.parsed.y) +
                                ",000";
                        }
                    }
                }
            },

            scales: {
                y: {
                    beginAtZero: true,

                    title: {
                        display: true,
                        text: "Revenue (LKR '000)"
                    },

                    ticks: {
                        callback: function (value) {
                            return formatNumber(value);
                        }
                    },

                    grid: {
                        color: "#eef0f7"
                    }
                },

                x: {
                    title: {
                        display: true,
                        text: "Month"
                    },

                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}
const branchCanvas =
    document.getElementById("branchChart");

if (typeof Chart !== "undefined" && branchCanvas) {

    new Chart(branchCanvas, {
        type: "bar",

        data: {
            labels: branchData.map(item => item.branch),

            datasets: [{
                label: "Q2 Revenue (LKR '000)",

                data: branchData.map(item => item.revenue),

                backgroundColor: [
                    "#6558e8",
                    "#3985e8",
                    "#18a875"
                ],

                borderRadius: 7,
                borderSkipped: false,
                maxBarThickness: 55
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: {
                    display: false
                },

                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return "LKR " +
                                formatNumber(context.parsed.y) +
                                ",000";
                        }
                    }
                }
            },

            scales: {
                y: {
                    beginAtZero: true,

                    title: {
                        display: true,
                        text: "Revenue (LKR '000)"
                    },

                    ticks: {
                        callback: function (value) {
                            return formatNumber(value);
                        }
                    },

                    grid: {
                        color: "#eef0f7"
                    }
                },

                x: {
                    title: {
                        display: true,
                        text: "Branch"
                    },

                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}


const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

menuToggle.addEventListener("click", function () {

    const isOpen = navbar.classList.toggle("open");

    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";
});

document.querySelectorAll(".nav-link").forEach(function (link) {

    link.addEventListener("click", function () {

        navbar.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";

        // Highlight the selected navigation link
        document.querySelectorAll(".nav-link").forEach(
            function (navLink) {
                navLink.classList.remove("active");
            }
        );

        link.classList.add("active");
    });
});
window.addEventListener("resize", function () {

    if (typeof Chart !== "undefined") {
        Chart.instances.forEach(function (chart) {
            chart.resize();
        });
    }

});
