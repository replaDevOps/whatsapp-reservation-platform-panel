import { useMemo } from "react";

const getItem = (label, key, icon) => ({
    key,
    icon,
    label,
});

const MenuItems = ({ currentTab }) => {
    const menuItems = useMemo(
    () => [
        { type: "group", label: "DASHBOARD", key: "header", className: "heading-menu" },
        getItem(
            "Dashboard Overview",
            "1",
            currentTab === "1" ? (
                <img src="/assets/icons/side-icon/dashboard-a.webp" width="20px" alt="dashboard icon" fetchPriority="high" />
            ) : (
                <img
                    src="/assets/icons/side-icon/dashboard.webp"
                    width="20px"
                    alt="dashboard gray icon"
                    fetchPriority="high"
                />
            )
        ),

        { type: "divider", key: "divider-1", className: "bg-divider my-3" },
        { type: "group", label: "BUSINESS MANAGEMENT", key: "header-1", className: "heading-menu" },
        getItem(
            "All Businesses",
            "2",
            currentTab === "2" ? (
                <img src="/assets/icons/side-icon/business-a.webp" width="20px" alt="business icon" fetchPriority="high" />
            ) : (
                <img
                    src="/assets/icons/side-icon/business.webp"
                    width="20px"
                    alt="business gray icon"
                    fetchPriority="high"
                />
            )
        ),
        getItem(
            "Customers",
            "3",
            currentTab === "3" ? (
                <img src="/assets/icons/side-icon/customer-a.webp" width="20px" alt="customer icon" fetchPriority="high" />
            ) : (
                <img
                    src="/assets/icons/side-icon/customer.webp"
                    width="20px"
                    alt="dashboard gray icon"
                    fetchPriority="high"
                />
            )
        ),
        getItem(
            "Bookings",
            "4",
            currentTab === "4" ? (
                <img src="/assets/icons/side-icon/booking-a.webp" width="20px" alt="booking icon" fetchPriority="high" />
            ) : (
                <img
                    src="/assets/icons/side-icon/booking.webp"
                    width="20px"
                    alt="dashboard gray icon"
                    fetchPriority="high"
                />
            )
        ),
        getItem(
            "Revenue",
            "5",
            currentTab === "5" ? (
                <img src="/assets/icons/side-icon/revenue-a.webp" width="20px" alt="revenue icon" fetchPriority="high" />
            ) : (
                <img
                    src="/assets/icons/side-icon/revenue.webp"
                    width="20px"
                    alt="dashboard gray icon"
                    fetchPriority="high"
                />
            )
        ),
        getItem(
            "Demo Requests",
            "6",
            currentTab === "6" ? (
                <img src="/assets/icons/side-icon/request-a.webp" width="20px" alt="request icon" fetchPriority="high" />
            ) : (
                <img
                    src="/assets/icons/side-icon/request.webp"
                    width="20px"
                    alt="dashboard gray icon"
                    fetchPriority="high"
                />
            )
        ),
        getItem(
            "Staffs",
            "7",
            currentTab === "7" ? (
                <img src="/assets/icons/side-icon/staff-a.webp" width="20px" alt="staff icon" fetchPriority="high" />
            ) : (
                <img
                    src="/assets/icons/side-icon/staff.webp"
                    width="20px"
                    alt="dashboard gray icon"
                    fetchPriority="high"
                />
            )
        ),

        { type: "divider", key: "divider-2", className: "bg-divider my-3" },
        { type: "group", label: "SUBSCRIPTION", key: "header-2", className: "heading-menu" },
        getItem(
            "Subscription Plan",
            "8",
            currentTab === "8" ? (
                <img src="/assets/icons/side-icon/subplan-a.webp" width="20px" alt="subscription plan icon" fetchPriority="high" />
            ) : (
                <img
                    src="/assets/icons/side-icon/subplan.webp"
                    width="20px"
                    alt="dashboard gray icon"
                    fetchPriority="high"
                />
            )
        ),
        getItem(
            "Subscription Management",
            "9",
            currentTab === "9" ? (
                <img src="/assets/icons/side-icon/submanage-a.webp" width="20px" alt="subscription management icon" fetchPriority="high" />
            ) : (
                <img
                    src="/assets/icons/side-icon/submanage.webp"
                    width="20px"
                    alt="dashboard gray icon"
                    fetchPriority="high"
                />
            )
        ),
        getItem(
            "Discounts",
            "10",
            currentTab === "10" ? (
                <img src="/assets/icons/side-icon/discount-a.webp" width="20px" alt="discount icon" fetchPriority="high" />
            ) : (
                <img
                    src="/assets/icons/side-icon/discount.webp"
                    width="20px"
                    alt="dashboard gray icon"
                    fetchPriority="high"
                />
            )
        ),

        { type: "divider", key: "divider-3", className: "bg-divider my-3" },
        { type: "group", label: "WEBSITE PAGES", key: "header-3", className: "heading-menu" },
        getItem(
            "Terms & Condition",
            "11",
            currentTab === "11" ? (
                <img src="/assets/icons/side-icon/terms-a.webp" width="20px" alt="terms and condition icon" fetchPriority="high" />
            ) : (
                <img
                    src="/assets/icons/side-icon/terms.webp"
                    width="20px"
                    alt="dashboard gray icon"
                    fetchPriority="high"
                />
            )
        ),
        getItem(
            "FAQs",
            "12",
            currentTab === "12" ? (
                <img src="/assets/icons/side-icon/faqs-a.webp" width="20px" alt="faqs icon" fetchPriority="high" />
            ) : (
                <img
                    src="/assets/icons/side-icon/faqs.webp"
                    width="20px"
                    alt="dashboard gray icon"
                    fetchPriority="high"
                />
            )
        ),
        getItem(
            "Privacy Policy",
            "13",
            currentTab === "13" ? (
                <img src="/assets/icons/side-icon/privacy-a.webp" width="20px" alt="privacy policy icon" fetchPriority="high" />
            ) : (
                <img
                    src="/assets/icons/side-icon/privacy.webp"
                    width="20px"
                    alt="dashboard gray icon"
                    fetchPriority="high"
                />
            )
        ),

        { type: "divider", key: "divider-4", className: "bg-divider my-3" },
        { type: "group", label: "ADMIN SETTING", key: "header-4", className: "heading-menu" },
        getItem(
            "Setting",
            "14",
            currentTab === "14" ? (
                <img src="/assets/icons/side-icon/setting-a.webp" width="20px" alt="setting icon" fetchPriority="high" />
            ) : (
                <img
                    src="/assets/icons/side-icon/setting.webp"
                    width="20px"
                    alt="dashboard gray icon"
                    fetchPriority="high"
                />
            )
        ),
        getItem(
            "Activity Log",
            "15",
            currentTab === "15" ? (
                <img src="/assets/icons/side-icon/activitylog-a.webp" width="20px" alt="activity icon" fetchPriority="high" />
            ) : (
                <img
                    src="/assets/icons/side-icon/activitylog.webp"
                    width="20px"
                    alt="dashboard gray icon"
                    fetchPriority="high"
                />
            )
        ),
    ],
    [currentTab]
  );
    return menuItems;
};

export { MenuItems };
