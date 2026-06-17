import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiDownload,
  FiRefreshCw,
  FiFilter,
  FiChevronDown,
  FiEye,
  FiDollarSign,
  FiShoppingCart,
  FiUsers,
  FiTrendingUp,
  FiStar,
  FiClock,
  FiBox,
  FiAlertTriangle,
  FiArrowUpRight,
  FiMapPin,
} from "react-icons/fi";
import { LuStore } from "react-icons/lu";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

const pageVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

/* ═══════════ DATA ═══════════ */

// Sales Overview
const revenueData = [
  { day: "Jun 1", revenue: 180000 },
  { day: "Jun 2", revenue: 150000 },
  { day: "Jun 3", revenue: 200000 },
  { day: "Jun 4", revenue: 170000 },
  { day: "Jun 5", revenue: 250000 },
  { day: "Jun 6", revenue: 220000 },
  { day: "Jun 7", revenue: 280000 },
];

const platformHealthData = [
  { metric: "Revenue", value: 85 },
  { metric: "Orders", value: 78 },
  { metric: "Retention", value: 72 },
  { metric: "Vendor NPS", value: 65 },
  { metric: "CSAT", value: 90 },
  { metric: "AOV", value: 70 },
];

const revenueByCategoryData = [
  {
    category: "Printing",
    revenue: "₹8.4L",
    orders: "2,140 orders",
    growth: "+12.4%",
    width: 45,
  },
  {
    category: "Gifting",
    revenue: "₹6.2L",
    orders: "1,580 orders",
    growth: "+8.1%",
    width: 55,
  },
  {
    category: "Shopping",
    revenue: "₹12.4L",
    orders: "4,820 orders",
    growth: "+21.3%",
    width: 85,
  },
];

const dailyOrderData = [
  { day: "Jun 1", orders: 100 },
  { day: "Jun 2", orders: 85 },
  { day: "Jun 3", orders: 120 },
  { day: "Jun 4", orders: 95 },
  { day: "Jun 5", orders: 140 },
  { day: "Jun 6", orders: 160 },
  { day: "Jun 7", orders: 180 },
];

// Customer Analytics
const newVsReturningData = [
  { week: "Jun 1", count: 95 },
  { week: "Jun 2", count: 110 },
  { week: "Jun 3", count: 80 },
  { week: "Jun 4", count: 130 },
  { week: "Jun 5", count: 145 },
  { week: "Jun 6", count: 120 },
  { week: "Jun 7", count: 160 },
];

const customerSegmentsData = [
  { name: "One-time", value: 35, color: "#475569" },
  { name: "Occasional", value: 29, color: "#C2410C" },
  { name: "Regular", value: 22, color: "#7C3AED" },
  { name: "Loyal", value: 14, color: "#8C7D70" },
];

// Vendor Performance
const vendorsData = [
  {
    rank: 1,
    name: "GadgetWorld",
    revenue: "₹3,12,400",
    orders: 284,
    rating: 4.8,
    growth: "+22%",
  },
  {
    rank: 2,
    name: "PrintMaster",
    revenue: "₹2,48,100",
    orders: 841,
    rating: 4.7,
    growth: "+14%",
  },
  {
    rank: 3,
    name: "TechStore",
    revenue: "₹1,94,500",
    orders: 196,
    rating: 4.6,
    growth: "+9%",
  },
  {
    rank: 4,
    name: "GiftBox Studio",
    revenue: "₹1,68,000",
    orders: 412,
    rating: 4.9,
    growth: "+31%",
  },
  {
    rank: 5,
    name: "StyleMart",
    revenue: "₹1,24,800",
    orders: 320,
    rating: 4.5,
    growth: "+7%",
  },
];

// Product Insights
const productsData = [
  {
    rank: 1,
    name: "Business Card – Matte 500",
    category: "Printing",
    unitsSold: "1,240",
    revenue: "₹1,24,000",
    stock: 420,
    stockMax: 500,
  },
  {
    rank: 2,
    name: "Customized Gift Box",
    category: "Gifting",
    unitsSold: "892",
    revenue: "₹89,200",
    stock: 89,
    stockMax: 500,
  },
  {
    rank: 3,
    name: "iPhone 15 Case Custo",
    category: "Shopping",
    unitsSold: "742",
    revenue: "₹3,71,000",
    stock: 212,
    stockMax: 500,
  },
  {
    rank: 4,
    name: "A4 Flyers – Glossy 1000",
    category: "Printing",
    unitsSold: "684",
    revenue: "₹61,560",
    stock: 600,
    stockMax: 700,
  },
  {
    rank: 5,
    name: "Personalized Mug",
    category: "Gifting",
    unitsSold: "612",
    revenue: "₹55,080",
    stock: 54,
    stockMax: 500,
  },
];

// Geo & Cohort
const cityData = [
  { city: "Mumbai", percent: 31, revenue: "₹48.2L", orders: "3,840 orders" },
  { city: "Delhi NCR", percent: 24, revenue: "₹37.1L", orders: "2,960 orders" },
  { city: "Bangalore", percent: 19, revenue: "₹29.3L", orders: "2,340 orders" },
  { city: "Hyderabad", percent: 12, revenue: "₹18.5L", orders: "1,480 orders" },
  { city: "Chennai", percent: 9, revenue: "₹14.0L", orders: "1,120 orders" },
  { city: "Others", percent: 5, revenue: "₹7.8L", orders: "620 orders" },
];

const cohortData = [
  { cohort: "Jan 2026", weeks: [100, 72, 58, 49, 44] },
  { cohort: "Feb 2026", weeks: [100, 68, 54, 46, 41] },
  { cohort: "Mar 2026", weeks: [100, 75, 61, 53, 48] },
  { cohort: "Apr 2026", weeks: [100, 71, 57, 50, null] },
  { cohort: "May 2026", weeks: [100, 74, 60, null, null] },
  { cohort: "Jun 2026", weeks: [100, 76, null, null, null] },
];

const dateRangeOptions = [
  { value: "7days", label: "Last 7 days" },
  { value: "30days", label: "Last 30 days" },
  { value: "90days", label: "Last 90 days" },
  { value: "12months", label: "Last 12 months" },
];

/* ═══════════ HELPERS ═══════════ */

function getCohortColor(val) {
  if (val === null) return "bg-transparent text-transparent";
  if (val >= 70) return "bg-[#000000] text-white";
  if (val >= 55) return "bg-[#334155] text-white";
  if (val >= 45) return "bg-[#94A3B8] text-white";
  return "bg-[#CBD5E1] text-white";
}

function getStockBarColor(stock, max) {
  const ratio = stock / max;
  if (ratio > 0.5) return "bg-emerald-500";
  if (ratio > 0.2) return "bg-amber-500";
  return "bg-red-500";
}

function getCategoryBadgeClass(category) {
  if (category === "Printing")
    return "bg-[#F1F5F9] text-[#475569] font-medium text-[12px] px-2.5 py-0.5 rounded-md";
  if (category === "Gifting")
    return "bg-[#EFF6FF] text-[#1E40AF] font-medium text-[12px] px-2.5 py-0.5 rounded-md";
  return "bg-[#F5F3FF] text-[#5B21B6] font-medium text-[12px] px-2.5 py-0.5 rounded-md";
}

/* ═══════════ MAIN COMPONENT ═══════════ */

export default function Reports() {
  const [activeTab, setActiveTab] = useState("sales");
  const [selectedRange, setSelectedRange] = useState("7days");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    document.title = "Reports & Analytics - SpeedCopy";
  }, []);

  const currentLabel =
    dateRangeOptions.find((o) => o.value === selectedRange)?.label ||
    "Last 7 days";

  const tabs = [
    { key: "sales", label: "Sales Overview" },
    { key: "customers", label: "Customer Analytics" },
    { key: "vendors", label: "Vendor Performance" },
    { key: "products", label: "Product Insights" },
    { key: "geo", label: "Geo & Cohort" },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="w-full flex flex-col gap-6"
    >
      {/* ─── HEADER ─── */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-[24px] font-black text-gray-900 tracking-tight font-sans">
              Reports & Analytics
            </h1>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="text-[12px] font-semibold text-gray-700 border border-gray-300 rounded-full px-3 py-1 bg-white shadow-xs flex items-center gap-1 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                {currentLabel}
                <FiChevronDown size={12} />
              </button>
              {isDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsDropdownOpen(false)}
                  />
                  <div className="absolute top-full mt-1 left-0 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-[160px] py-1">
                    {dateRangeOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => {
                          setSelectedRange(opt.value);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-[12px] font-medium hover:bg-slate-50 transition-colors ${selectedRange === opt.value ? "text-[#0F172A] font-bold" : "text-slate-500"}`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
          <p className="text-[12.5px] text-slate-400 font-semibold mt-2">
            Platform-wide performance metrics, trends and insights.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="h-9 px-3.5 rounded-lg border border-[#E2E8F0] bg-white text-[12px] font-bold text-slate-650 hover:bg-slate-50 flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer">
            <FiFilter size={14} />
            Filter
          </button>
          <button className="h-9 px-3.5 rounded-lg border border-[#E2E8F0] bg-white text-[12px] font-bold text-slate-650 hover:bg-slate-50 flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer">
            <FiDownload size={14} />
            Export
          </button>
          <button className="h-9 w-9 rounded-lg border border-[#E2E8F0] bg-white hover:bg-slate-50 flex items-center justify-center shadow-xs transition-colors cursor-pointer">
            <FiRefreshCw size={14} className="text-slate-500" />
          </button>
        </div>
      </div>

      {/* ─── STAT CARDS ─── */}
      <div className="grid grid-cols-4 gap-4">
        {/* Total Revenue - dark card */}
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-[#0F172A] border border-[#1E293B] rounded-[14px] p-5 flex flex-col justify-between shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] min-h-[120px]"
        >
          <div className="flex items-start justify-between">
            <span className="text-[12px] font-semibold text-slate-400">
              Total Revenue
            </span>
            <div className="w-9 h-9 bg-[#334155] rounded-full flex items-center justify-center">
              <FiDollarSign size={16} className="text-white" />
            </div>
          </div>
          <div>
            <p className="text-[28px] font-black text-white">₹27.8L</p>
            <p className="text-[11px] text-emerald-400 font-semibold flex items-center gap-0.5">
              <FiArrowUpRight size={10} /> +15.4% vs last period
            </p>
          </div>
        </motion.div>

        {/* Total Orders */}
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white border border-[#E2E8F0] rounded-[14px] p-5 flex flex-col justify-between shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] min-h-[120px]"
        >
          <div className="flex items-start justify-between">
            <span className="text-[12px] font-semibold text-gray-400">
              Total Orders
            </span>
            <div className="w-9 h-9 bg-[#F1F5F9] border border-[#E2E8F0] rounded-full flex items-center justify-center">
              <FiShoppingCart size={16} className="text-slate-500" />
            </div>
          </div>
          <div>
            <p className="text-[28px] font-black text-gray-900">10,010</p>
            <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-0.5">
              <FiArrowUpRight size={10} /> +21.2% vs last period
            </p>
          </div>
        </motion.div>

        {/* Active Customers */}
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white border border-[#E2E8F0] rounded-[14px] p-5 flex flex-col justify-between shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] min-h-[120px]"
        >
          <div className="flex items-start justify-between">
            <span className="text-[12px] font-semibold text-gray-400">
              Active Customers
            </span>
            <div className="w-9 h-9 bg-[#F1F5F9] border border-[#E2E8F0] rounded-full flex items-center justify-center">
              <FiUsers size={16} className="text-slate-500" />
            </div>
          </div>
          <div>
            <p className="text-[28px] font-black text-gray-900">33,493</p>
            <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-0.5">
              <FiArrowUpRight size={10} /> +5.4% vs last period
            </p>
          </div>
        </motion.div>

        {/* Avg. Order Value */}
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white border border-[#E2E8F0] rounded-[14px] p-5 flex flex-col justify-between shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] min-h-[120px]"
        >
          <div className="flex items-start justify-between">
            <span className="text-[12px] font-semibold text-gray-400">
              Avg. Order Value
            </span>
            <div className="w-9 h-9 bg-[#F1F5F9] border border-[#E2E8F0] rounded-full flex items-center justify-center">
              <FiTrendingUp size={16} className="text-slate-500" />
            </div>
          </div>
          <div>
            <p className="text-[28px] font-black text-gray-900">₹2,778</p>
            <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-0.5">
              <FiArrowUpRight size={10} /> +8.1% vs last period
            </p>
          </div>
        </motion.div>
      </div>

      {/* ─── TAB NAVIGATION ─── */}
      <div className="bg-white border border-[#E2E8F0] rounded-[14px] shadow-xs overflow-hidden">
        <div className="border-b border-[#E2E8F0] px-6 flex items-center gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`py-3.5 transition-colors text-[13px] cursor-pointer ${
                activeTab === tab.key
                  ? "font-bold text-[#0F172A] border-b-2 border-[#0F172A]"
                  : "font-medium text-slate-400 hover:text-slate-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ─── TAB CONTENT ─── */}
        <div className="p-6">
          {activeTab === "sales" && <SalesOverviewTab />}
          {activeTab === "customers" && <CustomerAnalyticsTab />}
          {activeTab === "vendors" && <VendorPerformanceTab />}
          {activeTab === "products" && <ProductInsightsTab />}
          {activeTab === "geo" && <GeoCohortTab />}
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   SALES OVERVIEW TAB
   ═══════════════════════════════════════════════ */
function SalesOverviewTab() {
  return (
    <div className="flex flex-col gap-6">
      {/* Row 1: Revenue Trend + Platform Health */}
      <div className="grid grid-cols-2 gap-6">
        {/* Daily Revenue Trend */}
        <div className="bg-white border border-[#E2E8F0] rounded-[14px] p-5 shadow-xs">
          <h3 className="text-[15px] font-bold text-[#0F172A]">
            Daily Revenue Trend
          </h3>
          <p className="text-[11px] text-slate-400 font-medium mt-0.5">
            Orders, revenue and new customers — last 7 days
          </p>
          <div className="mt-4" style={{ height: 250 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={revenueData}
                margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0F172A" stopOpacity={0.08} />
                    <stop offset="95%" stopColor="#0F172A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#F1F5F9"
                  vertical={false}
                />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 11, fill: "#94A3B8" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#94A3B8" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid #E2E8F0",
                    fontSize: 12,
                  }}
                  formatter={(v) => [`₹${v.toLocaleString()}`, "Revenue"]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#0F172A"
                  strokeWidth={2}
                  fill="url(#revGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Platform Health Score */}
        <div className="bg-white border border-[#E2E8F0] rounded-[14px] p-5 shadow-xs">
          <h3 className="text-[15px] font-bold text-[#0F172A]">
            Platform Health Score
          </h3>
          <p className="text-[11px] text-slate-400 font-medium mt-0.5">
            Composite across 6 KPIs
          </p>
          <div
            className="mt-4 flex items-center justify-center"
            style={{ height: 250 }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart
                data={platformHealthData}
                cx="50%"
                cy="50%"
                outerRadius="70%"
              >
                <PolarGrid stroke="#E2E8F0" />
                <PolarAngleAxis
                  dataKey="metric"
                  tick={{ fontSize: 11, fill: "#64748B" }}
                />
                <PolarRadiusAxis tick={false} axisLine={false} />
                <Radar
                  dataKey="value"
                  stroke="#0F172A"
                  fill="#0F172A"
                  fillOpacity={0.08}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 2: Revenue by Category */}
      <div className="bg-white border border-[#E2E8F0] rounded-[14px] p-5 shadow-xs">
        <h3 className="text-[15px] font-bold text-[#0F172A]">
          Revenue by Category
        </h3>
        <p className="text-[11px] text-slate-400 font-medium mt-0.5">
          Contribution and growth per product category
        </p>
        <div className="flex flex-col gap-6 mt-5">
          {revenueByCategoryData.map((item) => (
            <div key={item.category} className="flex items-center gap-4">
              <span className="text-[14px] font-bold text-gray-900 w-[90px] shrink-0">
                {item.category}
              </span>
              <div className="flex-1 bg-[#F1F5F9] rounded-full h-9 relative overflow-hidden">
                <div
                  className="bg-black h-full rounded-full flex items-center justify-end pr-4"
                  style={{ width: `${item.width}%` }}
                >
                  <span className="text-[12px] font-bold text-white">
                    {item.revenue}
                  </span>
                </div>
              </div>
              <span className="text-[13px] text-slate-400 font-medium w-[100px] text-right shrink-0">
                {item.orders}
              </span>
              <span className="text-[13px] font-bold text-[#10B981] w-[60px] text-right shrink-0">
                {item.growth}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 3: Daily Order Volume */}
      <div className="bg-white border border-[#E2E8F0] rounded-[14px] p-5 shadow-xs">
        <h3 className="text-[15px] font-bold text-[#0F172A]">
          Daily Order Volume
        </h3>
        <p className="text-[11px] text-slate-400 font-medium mt-0.5">
          Orders placed per day this week
        </p>
        <div className="mt-4" style={{ height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={dailyOrderData}
              margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#F1F5F9"
                vertical={false}
              />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 11, fill: "#94A3B8" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#94A3B8" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 8,
                  border: "1px solid #E2E8F0",
                  fontSize: 12,
                }}
              />
              <Bar
                dataKey="orders"
                fill="#0F172A"
                radius={[4, 4, 0, 0]}
                barSize={36}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   CUSTOMER ANALYTICS TAB
   ═══════════════════════════════════════════════ */
function CustomerAnalyticsTab() {
  const statsCards = [
    { title: "Total Customers", value: "33,493", change: "+5.4%" },
    { title: "New This Month", value: "1,840", change: "+18.2%" },
    { title: "Repeat Rate", value: "64.2%", change: "+2.1%" },
    { title: "Avg. LTV", value: "₹8,420", change: "+11.4%" },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-4">
        {statsCards.map((card, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -2 }}
            className="bg-white border border-[#E2E8F0] rounded-[14px] p-5 shadow-xs flex flex-col justify-between min-h-[120px]"
          >
            <div>
              <span className="text-[13px] font-medium text-slate-400">
                {card.title}
              </span>
              <p className="text-[28px] font-black text-slate-900 mt-1">
                {card.value}
              </p>
            </div>
            <p className="text-[12px] text-[#10B981] font-bold mt-2 flex items-center gap-1">
              <span className="text-[14px]">↗</span> {card.change}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-6">
        {/* New vs Returning */}
        <div className="bg-white border border-[#E2E8F0] rounded-[14px] p-5 shadow-xs">
          <h3 className="text-[15px] font-bold text-[#0F172A]">
            New vs Returning Customers
          </h3>
          <p className="text-[11px] text-slate-400 font-medium mt-0.5">
            Weekly acquisition breakdown
          </p>
          <div className="mt-4" style={{ height: 250 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={newVsReturningData}
                margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#F1F5F9"
                  vertical={false}
                />
                <XAxis
                  dataKey="week"
                  tick={{ fontSize: 11, fill: "#94A3B8" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#94A3B8" }}
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 200]}
                  ticks={[0, 50, 100, 150, 200]}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid #E2E8F0",
                    fontSize: 12,
                  }}
                />
                <Bar
                  dataKey="count"
                  fill="#E2E8F0"
                  radius={[4, 4, 0, 0]}
                  barSize={24}
                  name="Customers"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Customer Segments */}
        <div className="bg-white border border-[#E2E8F0] rounded-[14px] p-5 shadow-xs">
          <h3 className="text-[15px] font-bold text-[#0F172A]">
            Customer Segments
          </h3>
          <p className="text-[11px] text-slate-400 font-medium mt-0.5">
            By order frequency
          </p>
          <div
            className="mt-4 flex flex-col items-center"
            style={{ height: 250 }}
          >
            <ResponsiveContainer width="100%" height="75%">
              <PieChart>
                <Pie
                  data={customerSegmentsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {customerSegmentsData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid #E2E8F0",
                    fontSize: 12,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Legend */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-4 max-w-[90%]">
              {customerSegmentsData.map((seg) => (
                <div
                  key={seg.name}
                  className="flex items-center gap-1.5 text-[13px]"
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: seg.color }}
                  />
                  <span className="text-slate-500 font-medium">{seg.name}</span>
                  <span className="text-slate-900 font-bold">{seg.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   VENDOR PERFORMANCE TAB
   ═══════════════════════════════════════════════ */
function VendorPerformanceTab() {
  return (
    <div className="flex flex-col gap-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-3 gap-4">
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white border border-[#E2E8F0] rounded-[14px] p-5 shadow-xs flex items-center gap-4"
        >
          <div className="w-11 h-11 bg-[#F1F5F9] border border-[#E2E8F0] rounded-full flex items-center justify-center">
            <LuStore size={18} className="text-slate-500" />
          </div>
          <div>
            <span className="text-[12px] font-semibold text-gray-400">
              Active Vendors
            </span>
            <p className="text-[26px] font-black text-gray-900">1,204</p>
          </div>
        </motion.div>
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white border border-[#E2E8F0] rounded-[14px] p-5 shadow-xs flex items-center gap-4"
        >
          <div className="w-11 h-11 bg-[#F1F5F9] border border-[#E2E8F0] rounded-full flex items-center justify-center">
            <FiStar size={18} className="text-slate-500" />
          </div>
          <div>
            <span className="text-[12px] font-semibold text-gray-400">
              Avg. Vendor Rating
            </span>
            <p className="text-[26px] font-black text-gray-900">4.6 / 5</p>
          </div>
        </motion.div>
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white border border-[#E2E8F0] rounded-[14px] p-5 shadow-xs flex items-center gap-4"
        >
          <div className="w-11 h-11 bg-[#F1F5F9] border border-[#E2E8F0] rounded-full flex items-center justify-center">
            <FiClock size={18} className="text-slate-500" />
          </div>
          <div>
            <span className="text-[12px] font-semibold text-gray-400">
              Avg. Fulfillment Time
            </span>
            <p className="text-[26px] font-black text-gray-900">2.4 days</p>
          </div>
        </motion.div>
      </div>

      {/* Vendors Table */}
      <div className="bg-white border border-[#E2E8F0] rounded-[14px] shadow-xs overflow-hidden">
        <div className="p-5 bg-[#F8FAFC99] flex items-center justify-between border-b border-[#E2E8F0]">
          <h3 className="text-[15px] font-bold text-[#0F172A]">
            Top Performing Vendors
          </h3>
          <button className="text-[12px] font-bold text-slate-500 flex items-center gap-1.5 hover:text-[#0F172A] transition-colors cursor-pointer">
            <FiDownload size={14} /> Export
          </button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-[#F8FAFC] h-10 border-b border-[#E2E8F0]">
              <th className="px-6 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                Rank
              </th>
              <th className="px-6 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                Vendor
              </th>
              <th className="px-6 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                Revenue
              </th>
              <th className="px-6 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                Orders
              </th>
              <th className="px-6 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                Rating
              </th>
              <th className="px-6 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                Growth
              </th>
              <th className="px-6 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0]">
            {vendorsData.map((v) => (
              <tr
                key={v.rank}
                className="hover:bg-slate-50/50 transition-colors"
              >
                <td className="px-6 py-3.5">
                  {v.rank === 1 ? (
                    <span className="w-7 h-7 rounded-full inline-flex items-center justify-center text-[12px] font-bold bg-black text-white">
                      {v.rank}
                    </span>
                  ) : (
                    <span className="w-7 h-7 rounded-full inline-flex items-center justify-center text-[12px] font-bold bg-[#F1F5F9] text-[#475569]">
                      {v.rank}
                    </span>
                  )}
                </td>
                <td className="px-6 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-[#EFF6FF] rounded-lg flex items-center justify-center shrink-0">
                      <LuStore size={16} className="text-[#2563EB]" />
                    </div>
                    <span className="text-[14px] font-bold text-gray-900">
                      {v.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-3.5 text-[14px] font-bold text-gray-900">
                  {v.revenue}
                </td>
                <td className="px-6 py-3.5 text-[13px] font-medium text-slate-500">
                  {v.orders}
                </td>
                <td className="px-6 py-3.5">
                  <span className="flex items-center gap-1 text-[13px] font-bold text-gray-900">
                    <FiStar
                      size={13}
                      className="text-amber-500 fill-amber-500"
                    />{" "}
                    {v.rating}
                  </span>
                </td>
                <td className="px-6 py-3.5 text-[13px] font-bold text-[#10B981]">
                  {v.growth}
                </td>
                <td className="px-6 py-3.5">
                  <button className="text-slate-400 hover:text-black transition-colors p-0.5 cursor-pointer">
                    <FiEye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   PRODUCT INSIGHTS TAB
   ═══════════════════════════════════════════════ */
function ProductInsightsTab() {
  return (
    <div className="flex flex-col gap-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white border border-[#E2E8F0] rounded-[14px] p-5 shadow-xs flex items-center gap-4"
        >
          <div className="w-11 h-11 bg-[#F1F5F9] border border-[#E2E8F0] rounded-full flex items-center justify-center">
            <FiBox size={18} className="text-slate-500" />
          </div>
          <div>
            <span className="text-[12px] font-semibold text-gray-400">
              Active Products
            </span>
            <p className="text-[26px] font-black text-gray-900">45,294</p>
          </div>
        </motion.div>
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white border border-[#E2E8F0] rounded-[14px] p-5 shadow-xs flex items-center gap-4"
        >
          <div className="w-11 h-11 bg-[#F1F5F9] border border-[#E2E8F0] rounded-full flex items-center justify-center">
            <FiAlertTriangle size={18} className="text-slate-500" />
          </div>
          <div>
            <span className="text-[12px] font-semibold text-gray-400">
              Out of Stock
            </span>
            <p className="text-[26px] font-black text-gray-900">312</p>
          </div>
        </motion.div>
      </div>

      {/* Products Table */}
      <div className="bg-white border border-[#E2E8F0] rounded-[14px] shadow-xs overflow-hidden">
        <div
          className="px-5 py-4 flex items-center justify-between"
          style={{
            background: "#F8FAFC99",
            borderBottom: "0.8px solid #F1F5F9",
          }}
        >
          <h3 className="text-[15px] font-bold text-[#0F172A]">
            Top Selling Products
          </h3>

          <div className="w-[108px] h-[61.6px] rounded-[12px] border border-[#E2E8F0] bg-white" />
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-[#F8FAFC] h-10 border-b border-[#E2E8F0]">
              <th className="px-6 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                Product
              </th>
              <th className="px-6 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                Category
              </th>
              <th className="px-6 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                Units Sold
              </th>
              <th className="px-6 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                Revenue
              </th>
              <th className="px-6 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                Stock
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0]">
            {productsData.map((p) => {
              const maxStock = Math.max(
                ...productsData.map((product) => product.stock),
              );

              const stockPercent = (p.stock / maxStock) * 100;

              return (
                <tr
                  key={p.rank}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-7 h-7 rounded-full inline-flex items-center justify-center text-[12px] font-bold shrink-0 ${
                          p.rank === 1
                            ? "bg-black text-white"
                            : "bg-[#F1F5F9] text-[#475569]"
                        }`}
                      >
                        {p.rank}
                      </span>

                      <span className="text-[14px] font-bold text-gray-900">
                        {p.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-3.5">
                    <span className={getCategoryBadgeClass(p.category)}>
                      {p.category}
                    </span>
                  </td>

                  <td className="px-6 py-3.5 text-[14px] font-bold text-gray-900">
                    {p.unitsSold}
                  </td>

                  <td className="px-6 py-3.5 text-[14px] font-bold text-gray-900">
                    {p.revenue}
                  </td>

                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-[90px] h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            p.stock <= 100
                              ? "bg-[#EF4444]"
                              : p.stock <= 250
                                ? "bg-[#F59E0B]"
                                : "bg-[#10B981]"
                          }`}
                          style={{
                            width: `${stockPercent}%`,
                          }}
                        />
                      </div>

                      <span
                        className={`text-[12px] font-bold ${
                          p.stock <= 100
                            ? "text-[#EF4444]"
                            : p.stock <= 250
                              ? "text-[#F59E0B]"
                              : "text-[#10B981]"
                        }`}
                      >
                        {p.stock}
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   GEO & COHORT TAB
   ═══════════════════════════════════════════════ */
function GeoCohortTab() {
  return (
    <div className="flex flex-col gap-6">
      {/* Revenue by City */}
      <div className="bg-white border border-[#E2E8F0] rounded-[14px] p-5 shadow-xs">
        <h3 className="text-[15px] font-bold text-[#0F172A]">
          Revenue by City
        </h3>
        <p className="text-[11px] text-slate-400 font-medium mt-0.5">
          Geographic breakdown of orders and revenue
        </p>
        <div className="flex flex-col gap-6 mt-5">
          {cityData.map((city) => (
            <div key={city.city} className="flex items-center gap-4">
              <div className="flex items-center gap-2 w-[120px] shrink-0">
                <FiMapPin size={16} className="text-[#94A3B8] shrink-0" />
                <span className="text-[14px] font-bold text-gray-900">
                  {city.city}
                </span>
              </div>
              <div className="flex-1 bg-[#F1F5F9] rounded-full h-9 relative overflow-hidden">
                <div
                  className="bg-black h-full rounded-full flex items-center justify-end pr-4"
                  style={{ width: `${city.percent}%` }}
                >
                  <span className="text-[12px] font-bold text-white">
                    {city.percent}%
                  </span>
                </div>
              </div>
              <div className="text-right w-[120px] shrink-0 flex flex-col justify-center">
                <p className="text-[14px] font-bold text-gray-900 leading-tight">
                  {city.revenue}
                </p>
                <p className="text-[12px] text-slate-400 font-medium mt-0.5">
                  {city.orders}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Retention Cohort */}
      <div className="bg-white border border-[#E2E8F0] rounded-[14px] p-5 shadow-xs">
        <h3 className="text-[15px] font-bold text-[#0F172A]">
          Customer Retention Cohort
        </h3>
        <p className="text-[11px] text-slate-400 font-medium mt-0.5">
          Week-over-week retention by acquisition month (%)
        </p>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E2E8F0]">
                <th className="px-4 py-3 text-left text-[12px] font-bold text-[#64748B]">
                  Cohort
                </th>
                {["Week 0", "Week 1", "Week 2", "Week 3", "Week 4"].map((w) => (
                  <th
                    key={w}
                    className="px-4 py-3 text-center text-[12px] font-bold text-[#64748B]"
                  >
                    {w}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cohortData.map((row) => (
                <tr key={row.cohort} className="border-b border-[#F1F5F9]">
                  <td className="px-4 py-3 text-[14px] font-bold text-gray-900">
                    {row.cohort}
                  </td>
                  {row.weeks.map((val, i) => (
                    <td key={i} className="px-4 py-3 text-center">
                      {val !== null ? (
                        <span
                          className={`inline-flex items-center justify-center w-14 h-[30px] rounded-full text-[12px] font-bold ${getCohortColor(val)}`}
                        >
                          {val}%
                        </span>
                      ) : (
                        <span className="text-[12px] text-slate-300 font-bold">
                          —
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Legend */}
        <div className="flex items-center gap-4 mt-4 text-[11px] text-slate-400 font-medium">
          <span>Retention scale:</span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-[#0F172A]" /> ≥ 70%
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-[#334155]" /> 55–70%
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-[#94A3B8]" /> 45–55%
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-[#CBD5E1]" /> &lt; 45%
          </span>
        </div>
      </div>
    </div>
  );
}
