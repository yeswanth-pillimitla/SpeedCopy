import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiRefreshCw,
  FiUpload,
  FiPlus,
  FiCheckCircle,
  FiAlertTriangle,
  FiClock,
  FiStar,
  FiSettings,
  FiX,
  FiChevronDown
} from 'react-icons/fi';
import CanvasPreviewRender from '../components/previews/CanvasPreviewRender.jsx';

// Page animations
const pageVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

export default function Settings() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const activeTab = searchParams.get('tab') || 'cms';

  useEffect(() => {
    document.title = 'Settings - SpeedCopy';
  }, []);

  // Toast System
  const [toasts, setToasts] = useState([]);
  const showToast = (message, type = 'success', title = '') => {
    const id = Date.now();
    const defaultTitle = type === 'success' ? 'Success' : type === 'error' ? 'Alert' : 'Info';
    setToasts(prev => [...prev, { id, message, type, title: title || defaultTitle }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  // ==========================================
  // --- CMS SETTINGS STATE ---
  // ==========================================
  const [cmsTab, setCmsTab] = useState('Homepage'); // 'Homepage', 'Static Pages', 'Contact Info', 'Social Media'

  // Homepage: Banners
  const [banners, setBanners] = useState([
    { id: 1, name: 'Summer Sale Banner', size: '1920×1080px', active: true }
  ]);
  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);

  // Homepage: Sections
  const [homepageSections, setHomepageSections] = useState({
    featuredCategories: true,
    promotionalBanners: true,
    featuredProducts: true,
    testimonials: false
  });

  // Static Pages
  const [staticPages, setStaticPages] = useState([
    { id: 'about', title: 'About Us', lastUpdated: '2 days ago', content: 'About us page content...' },
    { id: 'terms', title: 'Terms & Conditions', lastUpdated: '2 days ago', content: 'Terms and conditions content...' },
    { id: 'privacy', title: 'Privacy policy', lastUpdated: '2 days ago', content: 'Privacy policy content...' },
    { id: 'contact', title: 'Contact US', lastUpdated: '2 days ago', content: 'Contact us page content...' }
  ]);
  const [isPageModalOpen, setIsPageModalOpen] = useState(false);
  const [editingPage, setEditingPage] = useState(null);

  // Contact Info
  const [contactInfo, setContactInfo] = useState({
    companyName: 'Speedcopy Multi Vendor Aggregator',
    supportEmail: 'support@speedcopy.com',
    contactPrimary: '+1 (555) 123-4567',
    contactSecondary: '+1 (555) 123-4567',
    address: '123 Commerce Street, Suite 400\nTech District, CA 94103'
  });

  // Social Media
  const [socialMedia, setSocialMedia] = useState({
    facebook: 'Speedcopy Multi Vendor Aggregator',
    instagram: 'support@speedcopy.com',
    twitter: '+1 (555) 123-4567',
    linkedin: '+1 (555) 123-4567',
    youtube: '123 Commerce Street, Suite 400\nTech District, CA 94103'
  });

  // ==========================================
  // --- PRODUCT SETTINGS STATE ---
  // ==========================================
  const [productTab, setProductTab] = useState('Categories'); // 'Categories', 'Canvas', 'Delivery', 'Vendor Rules'

  // Categories list
  const [categories, setCategories] = useState([
    { id: 1, name: 'Printing', count: 12, status: 'Active' },
    { id: 2, name: 'Gifting', count: 8, status: 'Active' },
    { id: 3, name: 'Shopping', count: 24, status: 'Active' }
  ]);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null); // null = adding new, object = editing existing
  const [newCategory, setNewCategory] = useState({
    name: '',
    parent: 'None',
    desc: '',
    thumbnail: null
  });

  // Canvas Settings (placeholder values)
  const [canvasSettings, setCanvasSettings] = useState({
    width: '800',
    height: '600',
    gridSnap: true,
    showGrid: true
  });
  // Which canvas card is selected (null = modal closed)
  const [selectedCanvasName, setSelectedCanvasName] = useState(null);
  const [modalShape, setModalShape] = useState('circle');
  const [modalProductName, setModalProductName] = useState('');
  const [modalUploadImage, setModalUploadImage] = useState(true);
  const [modalUploadCanvas, setModalUploadCanvas] = useState(false);
  const [modalClockDialType, setModalClockDialType] = useState('numbers');
  const [modalClockHandMovement, setModalClockHandMovement] = useState('sweep');

  useEffect(() => {
    if (selectedCanvasName) {
      let defaultShape = 'circle';
      let defaultName = '';
      if (selectedCanvasName === 'Clock') {
        defaultShape = 'circle';
        defaultName = 'Clock - Circle';
      } else if (selectedCanvasName === 'Frame') {
        defaultShape = 'oak';
        defaultName = 'Frame - Oak Wood';
      } else if (selectedCanvasName === 'Letterhead') {
        defaultShape = 'modern';
        defaultName = 'Letterhead - Modern Line';
      } else if (selectedCanvasName === 'Mug') {
        defaultShape = 'standard';
        defaultName = 'Mug - Standard White';
      } else if (selectedCanvasName === 'Pen') {
        defaultShape = 'classic';
        defaultName = 'Pen - Classic Gold';
      } else if (selectedCanvasName === 'Plate') {
        defaultShape = 'rectangle';
        defaultName = 'Plate - Rectangle Border';
      }
      setModalShape(defaultShape);
      setModalProductName(defaultName);
      setModalUploadImage(true);
      setModalUploadCanvas(false);
      setModalClockDialType('numbers');
      setModalClockHandMovement('sweep');
    }
  }, [selectedCanvasName]);

  // Delivery settings
  const [deliverySettings, setDeliverySettings] = useState({
    radius: '25',
    baseCharges: '10.00',
    freeThreshold: '50.00',
    sameDay: true,
    storePickup: true
  });

  // Vendor Rules settings
  const [vendorRules, setVendorRules] = useState({
    approvalRequired: true,
    autoPublish: true,
    strictInventory: true
  });

  // ==========================================
  // --- VENDOR SETTINGS STATE ---
  // ==========================================
  const [vendorTab, setVendorTab] = useState('Onboarding Flow');

  // Onboarding flow steps
  const [onboardingSteps, setOnboardingSteps] = useState([
    { id: 1, label: 'Business Details', enabled: true },
    { id: 2, label: 'Owner Details', enabled: true },
    { id: 3, label: 'Store Information', enabled: true }
  ]);

  // Documents & Rules
  const [requiredDocs, setRequiredDocs] = useState([
    { id: 'gst', label: 'GST Certificate', enabled: true },
    { id: 'pan', label: 'PAN Card', enabled: true },
    { id: 'aadhaar1', label: 'Aadhaar Card', enabled: true },
    { id: 'aadhaar2', label: 'Aadhaar Card', enabled: true },
    { id: 'business', label: 'Business Registration', enabled: true },
    { id: 'bank', label: 'Bank Proof', enabled: true },
    { id: 'cheque', label: 'Cancelled Cheque', enabled: true }
  ]);
  const [verificationMode, setVerificationMode] = useState('manual'); // 'manual' | 'automated'

  // Payment Terms
  const [commissionPct, setCommissionPct] = useState('15');
  const [paymentRules, setPaymentRules] = useState({
    releaseAfterDelivery: true,
    holdOnDispute: true,
    vendorApprovalRefund: true,
    autoApproveRefund: true
  });

  // Delivery Terms
  const [deliveryResponsibility, setDeliveryResponsibility] = useState('platform'); // 'platform' | 'vendor' | 'shared'
  const [deliverySLA, setDeliverySLA] = useState('48');

  // Gen. Settings
  const [vendorGenSettings, setVendorGenSettings] = useState({
    registrationEnabled: true,
    strictApproval: true
  });

  // ==========================================
  // --- SECURITY SETTINGS STATE ---
  // ==========================================
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    otpOnLogin: true,
    otpExpiry: '30',
    otpCooldown: '30',
    pwdOtpExpiry: '30',
    pwdOtpCooldown: '30',
    requireUppercase: true,
    requireNumber: true,
    requireSpecial: true,
    preventReuse: true,
    whitelistedIps: '',
    geoblocking: true
  });

  // ==========================================
  // --- STAFF SETTINGS STATE ---
  // ==========================================
  const [staffSubTab, setStaffSubTab] = useState('Roles & Access'); // 'Roles & Access', 'Session Policies', 'Login Management'
  const [staffRoles, setStaffRoles] = useState([
    { id: 'super_admin', name: 'Super Admin', permissions: { dashboard: true, products: true, customers: true, vendors: true, reports: true, settings: true } },
    { id: 'admin_staff', name: 'Admin Staff', permissions: { dashboard: false, products: false, customers: false, vendors: false, reports: false, settings: false } },
    { id: 'vendor_staff', name: 'Vendor Staff', permissions: { dashboard: false, products: false, customers: false, vendors: false, reports: false, settings: false } },
    { id: 'access_manager', name: 'Access Manager', permissions: { dashboard: false, products: false, customers: false, vendors: false, reports: false, settings: false } }
  ]);
  const [isAddRoleModalOpen, setIsAddRoleModalOpen] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');

  const [sessionPolicies, setSessionPolicies] = useState({
    autoLogoutTime: '30',
    sessionExpiry: '24',
    concurrentLogins: true,
    forceReauth: true
  });

  const [loginManagement, setLoginManagement] = useState({
    maxFailedAttempts: '30',
    lockoutDuration: '24',
    loginTracking: true,
    deviceRestrictions: true
  });

  // ==========================================
  // --- REFERRAL SETTINGS STATE ---
  // ==========================================
  const [referralSubTab, setReferralSubTab] = useState('Tracking URL'); // 'Tracking URL', 'Discount & Rewards', 'Coupon Rules'
  const [referralURLSettings, setReferralURLSettings] = useState({
    referralBaseURL: '15',
    trackingParamName: '50.00',
    utmForwarding: true
  });
  const [discountRewardSettings, setDiscountRewardSettings] = useState({
    rewardAmount: '15',
    commissionPct: '15',
    maxDiscountAllowed: '50.00'
  });
  const [couponUsageRules, setCouponUsageRules] = useState({
    expiryDays: '15',
    maxUsageLimits: '15',
    maxDiscount: '50.00',
    oneTimeUsage: true
  });

  // ==========================================
  // --- NOTIFICATION SETTINGS STATE ---
  // ==========================================
  const [notificationSubTab, setNotificationSubTab] = useState('Channels'); // 'Channels', 'Customer Notifications', 'Vendor Alerts', 'Admin Alerts'
  const [notificationChannels, setNotificationChannels] = useState({
    email: true,
    sms: true,
    push: false
  });
  const [customerTriggers, setCustomerTriggers] = useState({
    orderPlaced: { email: true, sms: true },
    orderShipped: { email: true, sms: true },
    orderDelivered: { email: true, sms: true },
    orderCancelled: { email: true, sms: true },
    abandonedCart: { email: true, sms: true }
  });
  const [vendorTriggers, setVendorTriggers] = useState({
    newOrder: { email: true },
    lowStock: { email: true },
    payoutProcessed: { email: true },
    accountVerification: { email: true }
  });
  const [lowStockThreshold, setLowStockThreshold] = useState('15');
  const [adminAlertEmails, setAdminAlertEmails] = useState("admin@speedcopy.com\nsupport@speedcopy.com");
  const [adminTriggers, setAdminTriggers] = useState({
    newVendor: true,
    highValueOrder: true,
    disputeOpened: true,
    systemErrors: true
  });

  // ==========================================
  // --- HANDLER FUNCTIONS ---
  // ==========================================
  const handleSaveContact = (e) => {
    e.preventDefault();
    showToast('Company information updated successfully!', 'success');
  };

  const handleSaveSocial = (e) => {
    e.preventDefault();
    showToast('Social media links updated successfully!', 'success');
  };

  const handleSaveDelivery = (e) => {
    e.preventDefault();
    showToast('Delivery settings saved successfully!', 'success');
  };

  const handlePublish = () => {
    showToast('Publishing configuration changes to live storefront...', 'info');
    setTimeout(() => {
      showToast('Configuration published successfully!', 'success');
    }, 1000);
  };

  const handleRefresh = () => {
    showToast('Syncing config with server...', 'info');
    setTimeout(() => {
      showToast('Configuration refreshed!', 'success');
    }, 800);
  };

  const handleAddCategorySubmit = (e) => {
    e.preventDefault();
    if (editingCategory) {
      // Update existing category
      setCategories(prev => prev.map(c =>
        c.id === editingCategory.id ? { ...c, name: newCategory.name, parent: newCategory.parent, desc: newCategory.desc } : c
      ));
      showToast(`Category "${newCategory.name}" updated successfully!`, 'success');
    } else {
      if (!newCategory.name.trim()) return;
      const newId = Date.now();
      setCategories(prev => [...prev, { id: newId, name: newCategory.name, count: 0, status: 'Active' }]);
      showToast(`Category "${newCategory.name}" created successfully!`, 'success');
    }
    setNewCategory({ name: '', parent: 'None', desc: '', thumbnail: null });
    setEditingCategory(null);
    setIsCategoryModalOpen(false);
  };

  // ==========================================
  // --- CMS SETTINGS VIEW ---
  // ==========================================
  const renderCMSContent = () => {
    return (
      <div className="flex flex-col gap-6">
        {/* Tab selection header bar */}
        <div className="w-full bg-[#F1F5F9] p-1 rounded-xl flex gap-1 overflow-x-auto shrink-0 shadow-2xs">
          {['Homepage', 'Static Pages', 'Contact Info', 'Social Media'].map(t => {
            const isSelected = cmsTab === t;
            return (
              <button
                key={t}
                onClick={() => setCmsTab(t)}
                className={`flex-1 min-w-[120px] py-2 px-3 text-[13px] font-semibold rounded-lg transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white text-[#0F172A] shadow-xs font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>

        {/* Tab content panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={cmsTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            {cmsTab === 'Homepage' && (
              <div className="flex flex-col gap-6">
                {/* Hero Banner Slider */}
                <div className="bg-white border border-[#E2E8F0] rounded-[16px] p-6 shadow-2xs flex flex-col gap-4">
                  <div>
                    <h3 className="text-[16px] font-bold text-[#0F172A] font-sans">Hero Banner Slider</h3>
                    <p className="text-[13px] text-slate-450 font-semibold mt-1">Manage the main rotating banners on the homepage.</p>
                  </div>

                  <div className="flex flex-col gap-3">
                    {banners.map(b => (
                      <div key={b.id} className="border border-[#E2E8F0] bg-white rounded-xl p-4 flex items-center justify-between shadow-3xs">
                        <div className="flex items-center gap-3">
                          {/* Plain gray rectangle thumbnail (no inner icon to match mockup) */}
                          <div className="w-14 h-10 bg-slate-200 rounded-lg shrink-0 border border-slate-200" />
                          <div className="flex flex-col">
                            <span className="text-[14px] font-bold text-[#0F172A]">{b.name}</span>
                            <span className="text-[12px] text-slate-455 font-semibold mt-0.5">Active • {b.size}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          {/* Switch toggle */}
                          <button
                            onClick={() => {
                              setBanners(prev => prev.map(item => item.id === b.id ? { ...item, active: !item.active } : item));
                              showToast(`${b.name} ${!b.active ? 'activated' : 'deactivated'}`, 'info');
                            }}
                            className={`w-[44px] h-[24px] rounded-full p-[2px] transition-colors duration-300 focus:outline-none cursor-pointer relative flex items-center ${
                              b.active ? 'bg-blue-600' : 'bg-slate-200'
                            }`}
                          >
                            <div className={`bg-white w-[20px] h-[20px] rounded-full shadow-sm transform transition-transform duration-300 ${
                              b.active ? 'translate-x-[20px]' : 'translate-x-0'
                            }`} />
                          </button>
                          <button
                            onClick={() => {
                              setEditingBanner(b);
                              setIsBannerModalOpen(true);
                            }}
                            className="text-[13px] font-bold text-blue-600 hover:underline cursor-pointer"
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    ))}

                    <button
                      onClick={() => {
                        setEditingBanner({ id: null, name: '', size: '1920×1080px', active: true });
                        setIsBannerModalOpen(true);
                      }}
                      className="w-full border border-dashed border-[#E2E8F0] hover:border-slate-400 hover:bg-slate-50 transition-colors p-4 rounded-xl flex items-center justify-center gap-2 text-[13px] font-bold text-[#0F172A] cursor-pointer"
                    >
                      <FiPlus size={16} /> Add New Banner
                    </button>
                  </div>
                </div>

                {/* Homepage Sections */}
                <div className="bg-white border border-[#E2E8F0] rounded-[16px] p-6 shadow-2xs flex flex-col gap-4">
                  <div>
                    <h3 className="text-[16px] font-bold text-[#0F172A] font-sans">Homepage Sections</h3>
                    <p className="text-[13px] text-slate-455 font-semibold mt-1">Toggle and reorder sections on the homepage.</p>
                  </div>

                  <div className="flex flex-col gap-3">
                    {/* Featured Categories (Static / no switch) */}
                    <div className="border border-[#E2E8F0] bg-white rounded-xl p-4 flex items-center justify-between shadow-3xs h-[52px]">
                      <span className="text-[14px] font-bold text-[#0F172A]">Featured Categories</span>
                    </div>

                    {[
                      { key: 'promotionalBanners', label: 'Promotional Banners' },
                      { key: 'featuredProducts', label: 'Featured Products' },
                      { key: 'testimonials', label: 'Testimonials' }
                    ].map(sect => (
                      <div key={sect.key} className="border border-[#E2E8F0] bg-white rounded-xl p-4 flex items-center justify-between shadow-3xs">
                        <span className="text-[14px] font-bold text-[#0F172A]">{sect.label}</span>
                        <button
                          onClick={() => {
                            setHomepageSections(prev => {
                              const nextState = { ...prev, [sect.key]: !prev[sect.key] };
                              showToast(`${sect.label} ${nextState[sect.key] ? 'enabled' : 'disabled'}`, 'info');
                              return nextState;
                            });
                          }}
                          className={`w-[44px] h-[24px] rounded-full p-[2px] transition-colors duration-300 focus:outline-none cursor-pointer relative flex items-center ${
                            homepageSections[sect.key] ? 'bg-blue-600' : 'bg-slate-200'
                          }`}
                        >
                          <div className={`bg-white w-[20px] h-[20px] rounded-full shadow-sm transform transition-transform duration-300 ${
                            homepageSections[sect.key] ? 'translate-x-[20px]' : 'translate-x-0'
                          }`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {cmsTab === 'Static Pages' && (
              <div className="bg-white border border-[#E2E8F0] rounded-[16px] p-6 shadow-2xs flex flex-col gap-4">
                <div>
                  <h3 className="text-[16px] font-bold text-[#0F172A] font-sans">Legal & Information Pages</h3>
                  <p className="text-[13px] text-slate-455 font-semibold mt-1">Edit content for standard static pages.</p>
                </div>

                <div className="flex flex-col gap-3">
                  {staticPages.map(page => (
                    <div key={page.id} className="border border-[#E2E8F0] bg-white rounded-xl p-4 flex items-center justify-between shadow-3xs">
                      <div className="flex items-center gap-3">
                        {/* Plain gray thumbnail (no inner icon to match mockup) */}
                        <div className="w-12 h-12 bg-slate-200 rounded-lg shrink-0 border border-slate-200" />
                        <div className="flex flex-col">
                          <span className="text-[14px] font-bold text-[#0F172A]">{page.title}</span>
                          <span className="text-[12px] text-slate-455 font-semibold mt-0.5">Last updated: {page.lastUpdated}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setEditingPage(page);
                          setIsPageModalOpen(true);
                        }}
                        className="h-9 px-4 bg-white border border-[#E2E8F0] hover:bg-slate-50 rounded-lg text-[13px] font-bold text-[#0F172A] transition-colors cursor-pointer"
                      >
                        Edit Content
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {cmsTab === 'Contact Info' && (
              <form onSubmit={handleSaveContact} className="bg-white border border-[#E2E8F0] rounded-[16px] p-6 shadow-2xs flex flex-col gap-6">
                <div>
                  <h3 className="text-[16px] font-bold text-[#0F172A] font-sans">Company information</h3>
                  <p className="text-[13px] text-slate-455 font-semibold mt-1">Manage the contact details of the storefront.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-5">
                    {/* Company Name */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[13px] font-semibold text-[#0F172A]">Company Name</label>
                      <input
                        type="text"
                        value={contactInfo.companyName}
                        onChange={e => setContactInfo({ ...contactInfo, companyName: e.target.value })}
                        className="h-10 px-3.5 rounded-lg border border-[#E2E8F0] bg-white text-[13px] text-[#0F172A] font-semibold focus:outline-none focus:ring-1 focus:ring-black"
                      />
                    </div>
                    {/* Contact Number (Primary) */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[13px] font-semibold text-[#0F172A]">Contact Number (Primary)</label>
                      <input
                        type="text"
                        value={contactInfo.contactPrimary}
                        onChange={e => setContactInfo({ ...contactInfo, contactPrimary: e.target.value })}
                        className="h-10 px-3.5 rounded-lg border border-[#E2E8F0] bg-white text-[13px] text-[#0F172A] font-semibold focus:outline-none focus:ring-1 focus:ring-black"
                      />
                    </div>
                    {/* Address */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[13px] font-semibold text-[#0F172A]">Headquarters Address</label>
                      <textarea
                        value={contactInfo.address}
                        onChange={e => setContactInfo({ ...contactInfo, address: e.target.value })}
                        rows={4}
                        className="p-3.5 rounded-lg border border-[#E2E8F0] bg-white text-[13px] text-[#0F172A] font-semibold focus:outline-none focus:ring-1 focus:ring-black resize-none"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-5">
                    {/* Support Email */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[13px] font-semibold text-[#0F172A]">Support Email</label>
                      <input
                        type="email"
                        value={contactInfo.supportEmail}
                        onChange={e => setContactInfo({ ...contactInfo, supportEmail: e.target.value })}
                        className="h-10 px-3.5 rounded-lg border border-[#E2E8F0] bg-white text-[13px] text-[#0F172A] font-semibold focus:outline-none focus:ring-1 focus:ring-black"
                      />
                    </div>
                    {/* Contact Number (Secondary) */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[13px] font-semibold text-[#0F172A]">Contact Number (Secondary)</label>
                      <input
                        type="text"
                        value={contactInfo.contactSecondary}
                        onChange={e => setContactInfo({ ...contactInfo, contactSecondary: e.target.value })}
                        className="h-10 px-3.5 rounded-lg border border-[#E2E8F0] bg-white text-[13px] text-[#0F172A] font-semibold focus:outline-none focus:ring-1 focus:ring-black"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end border-t border-slate-100 pt-4">
                  <button
                    type="submit"
                    className="h-10 px-5 rounded-lg bg-black text-white text-[13px] font-bold hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            )}

            {cmsTab === 'Social Media' && (
              <form onSubmit={handleSaveSocial} className="bg-white border border-[#E2E8F0] rounded-[16px] p-6 shadow-2xs flex flex-col gap-6">
                <div>
                  <h3 className="text-[16px] font-bold text-[#0F172A] font-sans">Social Media Links</h3>
                  <p className="text-[13px] text-slate-455 font-semibold mt-1">Connect your social profiles to the storefront.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-5">
                    {/* Facebook */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[13px] font-semibold text-[#0F172A]">Facebook URL</label>
                      <input
                        type="text"
                        value={socialMedia.facebook}
                        onChange={e => setSocialMedia({ ...socialMedia, facebook: e.target.value })}
                        className="h-10 px-3.5 rounded-lg border border-[#E2E8F0] bg-white text-[13px] text-[#0F172A] font-semibold focus:outline-none focus:ring-1 focus:ring-black"
                      />
                    </div>
                    {/* Twitter */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[13px] font-semibold text-[#0F172A]">Twitter / X URL</label>
                      <input
                        type="text"
                        value={socialMedia.twitter}
                        onChange={e => setSocialMedia({ ...socialMedia, twitter: e.target.value })}
                        className="h-10 px-3.5 rounded-lg border border-[#E2E8F0] bg-white text-[13px] text-[#0F172A] font-semibold focus:outline-none focus:ring-1 focus:ring-black"
                      />
                    </div>
                    {/* YouTube */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[13px] font-semibold text-[#0F172A]">YouTube URL</label>
                      <textarea
                        value={socialMedia.youtube}
                        onChange={e => setSocialMedia({ ...socialMedia, youtube: e.target.value })}
                        rows={3}
                        className="p-3.5 rounded-lg border border-[#E2E8F0] bg-white text-[13px] text-[#0F172A] font-semibold focus:outline-none focus:ring-1 focus:ring-black resize-none"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-5">
                    {/* Instagram */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[13px] font-semibold text-[#0F172A]">Instagram URL</label>
                      <input
                        type="text"
                        value={socialMedia.instagram}
                        onChange={e => setSocialMedia({ ...socialMedia, instagram: e.target.value })}
                        className="h-10 px-3.5 rounded-lg border border-[#E2E8F0] bg-white text-[13px] text-[#0F172A] font-semibold focus:outline-none focus:ring-1 focus:ring-black"
                      />
                    </div>
                    {/* LinkedIn */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[13px] font-semibold text-[#0F172A]">LinkedIn URL</label>
                      <input
                        type="text"
                        value={socialMedia.linkedin}
                        onChange={e => setSocialMedia({ ...socialMedia, linkedin: e.target.value })}
                        className="h-10 px-3.5 rounded-lg border border-[#E2E8F0] bg-white text-[13px] text-[#0F172A] font-semibold focus:outline-none focus:ring-1 focus:ring-black"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end border-t border-slate-100 pt-4">
                  <button
                    type="submit"
                    className="h-10 px-5 rounded-lg bg-black text-white text-[13px] font-bold hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  };

  // ==========================================
  // --- PRODUCT SETTINGS VIEW ---
  // ==========================================
  const renderProductContent = () => {
    return (
      <div className="flex flex-col gap-6">
        {/* Tab selection header bar */}
        <div className="w-full bg-[#F1F5F9] p-1 rounded-xl flex gap-1 overflow-x-auto shrink-0 shadow-2xs">
          {['Categories', 'Canvas', 'Delivery', 'Vendor Rules'].map(t => {
            const isSelected = productTab === t;
            return (
              <button
                key={t}
                onClick={() => setProductTab(t)}
                className={`flex-1 min-w-[100px] py-2 px-3 text-[13px] font-semibold rounded-lg transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white text-[#0F172A] shadow-xs font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>

        {/* Tab content panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={productTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            {productTab === 'Categories' && (
              <div className="bg-white border border-[#E2E8F0] rounded-[16px] p-6 shadow-2xs flex flex-col gap-4">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <h3 className="text-[16px] font-bold text-[#0F172A] font-sans">Category Management</h3>
                    <p className="text-[13px] text-slate-455 font-semibold mt-1">Configure primary predefined categories and their subcategories.</p>
                  </div>
                  <button
                    onClick={() => {
                      setNewCategory({ name: '', parent: 'None', desc: '', thumbnail: null });
                      setIsCategoryModalOpen(true);
                    }}
                    className="h-10 px-4 bg-black text-white text-[13px] font-bold rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <FiPlus size={15} /> Add Category
                  </button>
                </div>

                <div className="w-full border border-[#E2E8F0] rounded-xl overflow-x-auto shadow-3xs mt-2">
                  <table className="w-full text-left border-collapse min-w-[480px]">
                    <thead>
                      <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[13px] font-bold text-slate-500">
                        <th className="py-3.5 px-5 font-semibold">Category Name</th>
                        <th className="py-3.5 px-5 font-semibold">Subcategories</th>
                        <th className="py-3.5 px-5 font-semibold">Status</th>
                        <th className="py-3.5 px-5 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F1F5F9]">
                      {categories.map(c => (
                        <tr key={c.id} className="text-[13px] text-[#0F172A] hover:bg-slate-50/50 transition-colors">
                          <td className="py-4 px-5 font-bold">{c.name}</td>
                          <td className="py-4 px-5 text-slate-455 font-semibold">{c.count} Items</td>
                          <td className="py-4 px-5">
                            <span className="bg-[#ECFDF5] text-[#10B981] text-[11px] font-semibold px-2.5 py-0.5 rounded-full inline-flex items-center">
                              {c.status}
                            </span>
                          </td>
                          <td className="py-4 px-5 text-right">
                            <button
                              onClick={() => {
                                setEditingCategory(c);
                                setNewCategory({ name: c.name, parent: c.parent || 'None', desc: c.desc || '', thumbnail: c.thumbnail || null });
                                setIsCategoryModalOpen(true);
                              }}
                              className="text-[13px] font-bold text-blue-600 hover:underline cursor-pointer"
                            >
                              Manage
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {productTab === 'Canvas' && (
              <div className="bg-white border border-[#E2E8F0] rounded-[16px] p-6 shadow-2xs flex flex-col gap-6">
                <div>
                  <h3 className="text-[16px] font-bold text-[#0F172A] font-sans">Canvas Dimensions</h3>
                  <p className="text-[13px] text-slate-455 font-semibold mt-1">Configure default operational settings and canvas rendering bounds.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-xl">
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-semibold text-[#0F172A]">Default Width (px)</label>
                    <input
                      type="text"
                      value={canvasSettings.width}
                      onChange={e => setCanvasSettings({ ...canvasSettings, width: e.target.value })}
                      className="h-10 px-3.5 rounded-lg border border-[#E2E8F0] bg-white text-[13px] font-semibold text-[#0F172A] focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-semibold text-[#0F172A]">Default Height (px)</label>
                    <input
                      type="text"
                      value={canvasSettings.height}
                      onChange={e => setCanvasSettings({ ...canvasSettings, height: e.target.value })}
                      className="h-10 px-3.5 rounded-lg border border-[#E2E8F0] bg-white text-[13px] font-semibold text-[#0F172A] focus:outline-none"
                    />
                  </div>
                </div>

                {/* ── Pre-built Product Canvases ── */}
                <div className="pt-2">
                  <h4 className="text-[15px] font-bold text-[#0F172A] mb-1">Pre-built Product Canvases</h4>
                  <p className="text-[13px] text-slate-500 font-semibold mb-4">Click a canvas to open its full preview.</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                    {[
                      { name: 'Clock',       icon: '🕐', desc: 'Circular & square clocks' },
                      { name: 'Frame',       icon: '🖼️', desc: 'Photo frames & borders' },
                      { name: 'Letterhead',  icon: '📄', desc: 'Office letterheads' },
                      { name: 'Mug',         icon: '☕', desc: 'Custom printed mugs' },
                      { name: 'Pen',         icon: '✒️', desc: 'Engraved pens' },
                      { name: 'Plate',       icon: '🪪', desc: 'Name & decorative plates' }
                    ].map(({ name, icon, desc }) => (
                      <button
                        key={name}
                        onClick={() => setSelectedCanvasName(name)}
                        className="flex flex-col items-center gap-2 p-4 border border-[#E2E8F0] rounded-xl bg-[#F8FAFC] hover:bg-white hover:shadow-md hover:border-black transition-all cursor-pointer text-center"
                      >
                        <span className="text-3xl">{icon}</span>
                        <span className="text-[13px] font-bold text-[#0F172A]">{name}</span>
                        <span className="text-[11px] text-slate-400 font-medium leading-tight">{desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end border-t border-slate-100 pt-4">
                  <button
                    onClick={() => showToast('Canvas bounds updated successfully!', 'success')}
                    className="h-10 px-5 rounded-lg bg-black text-white text-[13px] font-bold hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Save Bounds
                  </button>
                </div>
              </div>
            )}

            {productTab === 'Delivery' && (
              <form onSubmit={handleSaveDelivery} className="bg-white border border-[#E2E8F0] rounded-[16px] p-6 shadow-2xs flex flex-col gap-6">
                <div>
                  <h3 className="text-[16px] font-bold text-[#0F172A] font-sans">Delivery Settings</h3>
                  <p className="text-[13px] text-slate-455 font-semibold mt-1">Configure platform-wide delivery metrics and fees.</p>
                </div>

                {/* Top row: Delivery Radius + Base Delivery Charges side by side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-semibold text-[#0F172A]">Delivery Radius (in km)</label>
                    <input
                      type="text"
                      value={deliverySettings.radius}
                      onChange={e => setDeliverySettings({ ...deliverySettings, radius: e.target.value })}
                      placeholder="25"
                      className="h-10 px-3.5 rounded-lg border border-[#E2E8F0] bg-white text-[13px] text-[#0F172A] font-semibold focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-semibold text-[#0F172A]">Base Delivery Charges ($)</label>
                    <input
                      type="text"
                      value={deliverySettings.baseCharges}
                      onChange={e => setDeliverySettings({ ...deliverySettings, baseCharges: e.target.value })}
                      placeholder="10.00"
                      className="h-10 px-3.5 rounded-lg border border-[#E2E8F0] bg-white text-[13px] text-[#0F172A] font-semibold focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>
                </div>

                {/* Free Delivery Threshold — full width row */}
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-semibold text-[#0F172A]">Free Delivery Threshold ($)</label>
                  <input
                    type="text"
                    value={deliverySettings.freeThreshold}
                    onChange={e => setDeliverySettings({ ...deliverySettings, freeThreshold: e.target.value })}
                    placeholder="50.00"
                    className="h-10 px-3.5 rounded-lg border border-[#E2E8F0] bg-white text-[13px] text-[#0F172A] font-semibold focus:outline-none focus:ring-1 focus:ring-black w-full"
                  />
                </div>

                {/* Same Day Delivery toggle row */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-[#0F172A]">Same Day Delivery</span>
                    <span className="text-[12px] text-slate-455 font-semibold mt-0.5">Allow customers to choose same day delivery</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setDeliverySettings(prev => ({ ...prev, sameDay: !prev.sameDay }));
                      showToast(`Same Day Delivery ${!deliverySettings.sameDay ? 'enabled' : 'disabled'}`, 'info');
                    }}
                    className={`w-[44px] h-[24px] rounded-full p-[2px] transition-colors duration-300 focus:outline-none cursor-pointer relative flex items-center shrink-0 ${
                      deliverySettings.sameDay ? 'bg-blue-600' : 'bg-slate-200'
                    }`}
                  >
                    <div className={`bg-white w-[20px] h-[20px] rounded-full shadow-sm transform transition-transform duration-300 ${
                      deliverySettings.sameDay ? 'translate-x-[20px]' : 'translate-x-0'
                    }`} />
                  </button>
                </div>

                {/* Store Pickup toggle row */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-[#0F172A]">Store Pickup</span>
                    <span className="text-[12px] text-slate-455 font-semibold mt-0.5">Allow customers to pick up from vendor location</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setDeliverySettings(prev => ({ ...prev, storePickup: !prev.storePickup }));
                      showToast(`Store Pickup ${!deliverySettings.storePickup ? 'enabled' : 'disabled'}`, 'info');
                    }}
                    className={`w-[44px] h-[24px] rounded-full p-[2px] transition-colors duration-300 focus:outline-none cursor-pointer relative flex items-center shrink-0 ${
                      deliverySettings.storePickup ? 'bg-blue-600' : 'bg-slate-200'
                    }`}
                  >
                    <div className={`bg-white w-[20px] h-[20px] rounded-full shadow-sm transform transition-transform duration-300 ${
                      deliverySettings.storePickup ? 'translate-x-[20px]' : 'translate-x-0'
                    }`} />
                  </button>
                </div>

                <div className="flex justify-end border-t border-slate-100 pt-4">
                  <button
                    type="submit"
                    className="h-10 px-5 rounded-lg bg-black text-white text-[13px] font-bold hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Save Settings
                  </button>
                </div>
              </form>
            )}

            {productTab === 'Vendor Rules' && (
              <div className="bg-white border border-[#E2E8F0] rounded-[16px] p-6 shadow-2xs flex flex-col gap-4">
                <div className="mb-2">
                  <h3 className="text-[16px] font-bold text-[#0F172A] font-sans">Vendor Product Rules</h3>
                  <p className="text-[13px] text-slate-455 font-semibold mt-1">Define how vendor products are published and managed.</p>
                </div>

                {/* Product Approval Required — individual card */}
                <div className="flex items-center justify-between border border-[#E2E8F0] rounded-xl p-4">
                  <div className="flex flex-col pr-8">
                    <span className="text-[14px] font-bold text-[#0F172A]">Product Approval Required</span>
                    <span className="text-[12px] text-slate-455 font-semibold mt-1 leading-relaxed">
                      All new products added by vendors must be manually approved by admin before they appear on the storefront.
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setVendorRules(prev => ({ ...prev, approvalRequired: !prev.approvalRequired }));
                      showToast(`Product Approval Required ${!vendorRules.approvalRequired ? 'enabled' : 'disabled'}`, 'info');
                    }}
                    className={`w-[44px] h-[24px] rounded-full p-[2px] transition-colors duration-300 focus:outline-none cursor-pointer relative flex items-center shrink-0 ${
                      vendorRules.approvalRequired ? 'bg-blue-600' : 'bg-slate-200'
                    }`}
                  >
                    <div className={`bg-white w-[20px] h-[20px] rounded-full shadow-sm transform transition-transform duration-300 ${
                      vendorRules.approvalRequired ? 'translate-x-[20px]' : 'translate-x-0'
                    }`} />
                  </button>
                </div>

                {/* Auto Publish Products — individual card */}
                <div className="flex items-center justify-between border border-[#E2E8F0] rounded-xl p-4">
                  <div className="flex flex-col pr-8">
                    <span className="text-[14px] font-bold text-[#0F172A]">Auto Publish Products</span>
                    <span className="text-[12px] text-slate-455 font-semibold mt-1 leading-relaxed">
                      Automatically publish products when they are added or updated by trusted vendors.
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setVendorRules(prev => ({ ...prev, autoPublish: !prev.autoPublish }));
                      showToast(`Auto Publish Products ${!vendorRules.autoPublish ? 'enabled' : 'disabled'}`, 'info');
                    }}
                    className={`w-[44px] h-[24px] rounded-full p-[2px] transition-colors duration-300 focus:outline-none cursor-pointer relative flex items-center shrink-0 ${
                      vendorRules.autoPublish ? 'bg-blue-600' : 'bg-slate-200'
                    }`}
                  >
                    <div className={`bg-white w-[20px] h-[20px] rounded-full shadow-sm transform transition-transform duration-300 ${
                      vendorRules.autoPublish ? 'translate-x-[20px]' : 'translate-x-0'
                    }`} />
                  </button>
                </div>

                {/* Strict Inventory Validation — individual card */}
                <div className="flex items-center justify-between border border-[#E2E8F0] rounded-xl p-4">
                  <div className="flex flex-col pr-8">
                    <span className="text-[14px] font-bold text-[#0F172A]">Strict Inventory Validation</span>
                    <span className="text-[12px] text-slate-455 font-semibold mt-1 leading-relaxed">
                      Prevent vendors from listing products with zero inventory. Auto-hide out of stock products
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setVendorRules(prev => ({ ...prev, strictInventory: !prev.strictInventory }));
                      showToast(`Strict Inventory Validation ${!vendorRules.strictInventory ? 'enabled' : 'disabled'}`, 'info');
                    }}
                    className={`w-[44px] h-[24px] rounded-full p-[2px] transition-colors duration-300 focus:outline-none cursor-pointer relative flex items-center shrink-0 ${
                      vendorRules.strictInventory ? 'bg-blue-600' : 'bg-slate-200'
                    }`}
                  >
                    <div className={`bg-white w-[20px] h-[20px] rounded-full shadow-sm transform transition-transform duration-300 ${
                      vendorRules.strictInventory ? 'translate-x-[20px]' : 'translate-x-0'
                    }`} />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  };

  // ==========================================
  // --- VENDOR SETTINGS VIEW ---
  // ==========================================
  const renderVendorContent = () => {
    const VENDOR_TABS = ['Onboarding Flow', 'Documents & Rules', 'Payment Terms', 'Delivery Terms', 'Gen. Settings'];

    // Reusable toggle
    const Toggle = ({ value, onToggle }) => (
      <button
        type="button"
        onClick={onToggle}
        className={`w-[44px] h-[24px] rounded-full p-[2px] transition-colors duration-300 focus:outline-none cursor-pointer relative flex items-center shrink-0 ${
          value ? 'bg-blue-600' : 'bg-slate-200'
        }`}
      >
        <div className={`bg-white w-[20px] h-[20px] rounded-full shadow-sm transform transition-transform duration-300 ${
          value ? 'translate-x-[20px]' : 'translate-x-0'
        }`} />
      </button>
    );

    return (
      <div className="flex flex-col gap-6">
        {/* Tab bar */}
        <div className="w-full bg-[#F1F5F9] p-1 rounded-xl flex gap-1 overflow-x-auto shrink-0 shadow-2xs">
          {VENDOR_TABS.map(t => {
            const isSelected = vendorTab === t;
            return (
              <button
                key={t}
                onClick={() => setVendorTab(t)}
                className={`flex-1 min-w-[120px] py-2 px-3 text-[13px] font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  isSelected ? 'bg-white text-[#0F172A] shadow-xs font-bold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={vendorTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {/* ---- ONBOARDING FLOW ---- */}
            {vendorTab === 'Onboarding Flow' && (
              <div className="bg-white border border-[#E2E8F0] rounded-[16px] p-6 shadow-2xs flex flex-col gap-6">
                <div>
                  <h3 className="text-[16px] font-bold text-[#0F172A]">Vendor Onboarding Flow</h3>
                  <p className="text-[13px] text-slate-500 font-semibold mt-1">Reorder or toggle steps in the vendor registration process.</p>
                </div>

                <div className="flex flex-col gap-0">
                  {onboardingSteps.map((step, idx) => (
                    <div key={step.id} className="flex items-stretch gap-4">
                      {/* Timeline stem + circle */}
                      <div className="flex flex-col items-center">
                        <div className="w-9 h-9 rounded-full bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE] flex items-center justify-center text-[14px] font-bold shrink-0">
                          {step.id}
                        </div>
                        {idx < onboardingSteps.length - 1 && (
                          <div className="w-[2px] flex-1 bg-[#BFDBFE] my-1" />
                        )}
                      </div>

                      {/* Step card */}
                      <div className={`flex-1 border border-[#E2E8F0] rounded-xl p-4 flex items-center justify-between ${idx < onboardingSteps.length - 1 ? 'mb-3' : ''}`}>
                        <div className="flex flex-col">
                          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">STEP {step.id}</span>
                          <span className="text-[14px] font-bold text-[#0F172A] mt-0.5">{step.label}</span>
                        </div>
                        <Toggle
                          value={step.enabled}
                          onToggle={() => {
                            setOnboardingSteps(prev => prev.map(s => s.id === step.id ? { ...s, enabled: !s.enabled } : s));
                            showToast(`${step.label} ${!step.enabled ? 'enabled' : 'disabled'}`, 'info');
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ---- DOCUMENTS & RULES ---- */}
            {vendorTab === 'Documents & Rules' && (
              <div className="flex flex-col lg:flex-row gap-5">
                {/* Left: Required Documents */}
                <div className="flex-1 bg-white border border-[#E2E8F0] rounded-[16px] p-6 shadow-2xs flex flex-col gap-5">
                  <div>
                    <h3 className="text-[16px] font-bold text-[#0F172A]">Required Documents</h3>
                    <p className="text-[13px] text-slate-500 font-semibold mt-1">Select documents vendors must upload.</p>
                  </div>
                  <div className="flex flex-col divide-y divide-[#F1F5F9]">
                    {requiredDocs.map(doc => (
                      <div key={doc.id} className="flex items-center justify-between py-3.5">
                        <span className="text-[14px] font-bold text-[#0F172A]">{doc.label}</span>
                        <Toggle
                          value={doc.enabled}
                          onToggle={() => {
                            setRequiredDocs(prev => prev.map(d => d.id === doc.id ? { ...d, enabled: !d.enabled } : d));
                            showToast(`${doc.label} ${!doc.enabled ? 'required' : 'optional'}`, 'info');
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Verification Rules */}
                <div className="lg:w-[340px] bg-white border border-[#E2E8F0] rounded-[16px] p-6 shadow-2xs flex flex-col gap-5">
                  <div>
                    <h3 className="text-[16px] font-bold text-[#0F172A]">Verification Rules</h3>
                    <p className="text-[13px] text-slate-500 font-semibold mt-1">Configure how documents are verified.</p>
                  </div>
                  <div className="flex flex-col gap-3">
                    {[
                      { id: 'manual', label: 'Manual Verification', desc: 'Admin reviews each document manually.' },
                      { id: 'automated', label: 'Automated Verification', desc: 'Use OCR & third-party APIs to auto-verify.' }
                    ].map(opt => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setVerificationMode(opt.id)}
                        className={`w-full text-left border rounded-xl p-4 flex items-start gap-3 transition-colors cursor-pointer ${
                          verificationMode === opt.id ? 'border-[#1E293B] bg-white' : 'border-[#E2E8F0] bg-white hover:bg-slate-50'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                          verificationMode === opt.id ? 'border-[#1E293B]' : 'border-slate-300'
                        }`}>
                          {verificationMode === opt.id && (
                            <div className="w-2.5 h-2.5 rounded-full bg-[#1E293B]" />
                          )}
                        </div>
                        <div>
                          <p className="text-[14px] font-bold text-[#0F172A]">{opt.label}</p>
                          <p className="text-[12px] text-slate-500 font-semibold mt-0.5">{opt.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ---- PAYMENT TERMS ---- */}
            {vendorTab === 'Payment Terms' && (
              <div className="bg-white border border-[#E2E8F0] rounded-[16px] p-6 shadow-2xs flex flex-col gap-6">
                <div>
                  <h3 className="text-[16px] font-bold text-[#0F172A]">Payment & Refund Terms</h3>
                  <p className="text-[13px] text-slate-500 font-semibold mt-1">Set commission rates and payout cycles.</p>
                </div>

                {/* Commission input */}
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-semibold text-[#0F172A]">Default Commission Percentage (%)</label>
                  <input
                    type="text"
                    value={commissionPct}
                    onChange={e => setCommissionPct(e.target.value)}
                    className="h-10 px-3.5 rounded-lg border border-[#E2E8F0] bg-white text-[13px] font-semibold text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-black w-full md:max-w-sm"
                  />
                </div>

                {/* Payment Release Rules */}
                <div className="flex flex-col gap-3">
                  <h4 className="text-[14px] font-bold text-[#0F172A]">Payment Release Rules</h4>
                  {[
                    { key: 'releaseAfterDelivery', label: 'Release payment only after delivery confirmation' },
                    { key: 'holdOnDispute', label: 'Hold funds if active dispute exists' }
                  ].map(rule => (
                    <div key={rule.key} className="flex items-center justify-between">
                      <span className="text-[13px] font-semibold text-slate-600">{rule.label}</span>
                      <Toggle
                        value={paymentRules[rule.key]}
                        onToggle={() => {
                          setPaymentRules(prev => ({ ...prev, [rule.key]: !prev[rule.key] }));
                          showToast(`Setting updated`, 'info');
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* Refund Rules */}
                <div className="flex flex-col gap-3">
                  <h4 className="text-[14px] font-bold text-[#0F172A]">Refund Rules</h4>
                  {[
                    { key: 'vendorApprovalRefund', label: 'Vendor approval required for refunds' },
                    { key: 'autoApproveRefund', label: 'Auto-approve refunds under specified amount' }
                  ].map(rule => (
                    <div key={rule.key} className="flex items-center justify-between">
                      <span className="text-[13px] font-semibold text-slate-600">{rule.label}</span>
                      <Toggle
                        value={paymentRules[rule.key]}
                        onToggle={() => {
                          setPaymentRules(prev => ({ ...prev, [rule.key]: !prev[rule.key] }));
                          showToast(`Setting updated`, 'info');
                        }}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-end border-t border-slate-100 pt-4">
                  <button
                    onClick={() => showToast('Payment terms saved successfully!', 'success')}
                    className="h-10 px-5 rounded-lg bg-black text-white text-[13px] font-bold hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* ---- DELIVERY TERMS ---- */}
            {vendorTab === 'Delivery Terms' && (
              <div className="bg-white border border-[#E2E8F0] rounded-[16px] p-6 shadow-2xs flex flex-col gap-6">
                <div>
                  <h3 className="text-[16px] font-bold text-[#0F172A]">Delivery Term Settings</h3>
                  <p className="text-[13px] text-slate-500 font-semibold mt-1">Define who handles delivery and the SLA rules.</p>
                </div>

                {/* Delivery Responsibility radio cards */}
                <div className="flex flex-col gap-3">
                  <label className="text-[13px] font-semibold text-[#0F172A]">Delivery Responsibility</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'platform', label: 'Platform Admin', desc: 'Platform arranges delivery via 3rd party integrations' },
                      { id: 'vendor', label: 'Platform Admin', desc: 'Platform arranges delivery via 3rd party integrations' },
                      { id: 'shared', label: 'Platform Admin', desc: 'Platform arranges delivery via 3rd party integrations' }
                    ].map(opt => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setDeliveryResponsibility(opt.id)}
                        className={`text-left border rounded-xl p-4 flex items-start gap-3 transition-colors cursor-pointer ${
                          deliveryResponsibility === opt.id ? 'border-[#1E293B]' : 'border-[#E2E8F0] hover:bg-slate-50'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                          deliveryResponsibility === opt.id ? 'border-[#1E293B]' : 'border-slate-300'
                        }`}>
                          {deliveryResponsibility === opt.id && (
                            <div className="w-2.5 h-2.5 rounded-full bg-[#1E293B]" />
                          )}
                        </div>
                        <div>
                          <p className="text-[14px] font-bold text-[#0F172A]">{opt.label}</p>
                          <p className="text-[12px] text-slate-500 font-semibold mt-0.5 leading-relaxed">{opt.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* SLA input */}
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-semibold text-[#0F172A]">Delivery SLA (Hours to dispatch)</label>
                  <input
                    type="text"
                    value={deliverySLA}
                    onChange={e => setDeliverySLA(e.target.value)}
                    className="h-10 px-3.5 rounded-lg border border-[#E2E8F0] bg-white text-[13px] font-semibold text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-black w-full md:max-w-sm"
                  />
                  <p className="text-[12px] text-slate-500 font-semibold">Orders not dispatched within this SLA may incur penalties.</p>
                </div>

                <div className="flex justify-end border-t border-slate-100 pt-4">
                  <button
                    onClick={() => showToast('Delivery terms saved successfully!', 'success')}
                    className="h-10 px-5 rounded-lg bg-black text-white text-[13px] font-bold hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* ---- GEN. SETTINGS ---- */}
            {vendorTab === 'Gen. Settings' && (
              <div className="bg-white border border-[#E2E8F0] rounded-[16px] p-6 shadow-2xs flex flex-col gap-5">
                <div>
                  <h3 className="text-[16px] font-bold text-[#0F172A]">General Vendor Settings</h3>
                </div>

                {/* Vendor Registration Enable */}
                <div className="flex items-start justify-between border-t border-slate-100 pt-5">
                  <div className="flex flex-col pr-8">
                    <span className="text-[14px] font-bold text-[#0F172A]">Vendor Registration Enable</span>
                    <span className="text-[12px] text-slate-500 font-semibold mt-0.5">Allow new vendors to sign up on the platform.</span>
                  </div>
                  <Toggle
                    value={vendorGenSettings.registrationEnabled}
                    onToggle={() => {
                      setVendorGenSettings(prev => ({ ...prev, registrationEnabled: !prev.registrationEnabled }));
                      showToast(`Vendor registration ${!vendorGenSettings.registrationEnabled ? 'enabled' : 'disabled'}`, 'info');
                    }}
                  />
                </div>

                {/* Strict Approval Workflow */}
                <div className="flex items-start justify-between border-t border-slate-100 pt-5">
                  <div className="flex flex-col pr-8">
                    <span className="text-[14px] font-bold text-[#0F172A]">Strict Approval Workflow</span>
                    <span className="text-[12px] text-slate-500 font-semibold mt-0.5">Require multiple admin approvals before vendor activation.</span>
                  </div>
                  <Toggle
                    value={vendorGenSettings.strictApproval}
                    onToggle={() => {
                      setVendorGenSettings(prev => ({ ...prev, strictApproval: !prev.strictApproval }));
                      showToast(`Strict Approval Workflow ${!vendorGenSettings.strictApproval ? 'enabled' : 'disabled'}`, 'info');
                    }}
                  />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  };

  // ==========================================
  // --- SECURITY SETTINGS VIEW ---
  // ==========================================
  const renderSecurityContent = () => {
    // Reusable Toggle switch matching existing design
    const Toggle = ({ value, onToggle }) => (
      <button
        type="button"
        onClick={onToggle}
        className={`w-[44px] h-[24px] rounded-full p-[2px] transition-colors duration-300 focus:outline-none cursor-pointer relative flex items-center shrink-0 ${
          value ? 'bg-blue-600' : 'bg-slate-200'
        }`}
      >
        <div className={`bg-white w-[20px] h-[20px] rounded-full shadow-sm transform transition-transform duration-300 ${
          value ? 'translate-x-[20px]' : 'translate-x-0'
        }`} />
      </button>
    );

    return (
      <div className="flex flex-col gap-6">
        {/* Authentication & OTP Settings Card */}
        <div className="bg-white border border-[#E2E8F0] rounded-[16px] p-6 shadow-2xs flex flex-col gap-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-[16px] font-bold text-[#0F172A] font-sans">Authentication & OTP Settings</h3>
            <p className="text-[13px] text-slate-500 font-semibold mt-1">Configure how users authenticate and verify identities.</p>
          </div>

          <div className="flex flex-col gap-5">
            {/* Two-Factor Authentication (2FA) */}
            <div className="flex items-center justify-between py-1">
              <div className="flex flex-col gap-0.5 max-w-[80%]">
                <span className="text-[14px] font-bold text-[#0F172A]">Two-Factor Authentication (2FA)</span>
                <span className="text-[12px] text-slate-455 font-semibold leading-normal">Require all staff and vendors to set up 2FA via authenticator app.</span>
              </div>
              <Toggle
                value={securitySettings.twoFactorAuth}
                onToggle={() => {
                  setSecuritySettings(prev => ({ ...prev, twoFactorAuth: !prev.twoFactorAuth }));
                  showToast(`Two-Factor Authentication ${!securitySettings.twoFactorAuth ? 'enabled' : 'disabled'}`, 'info');
                }}
              />
            </div>

            {/* OTP on Login */}
            <div className="flex items-center justify-between py-1">
              <div className="flex flex-col gap-0.5 max-w-[80%]">
                <span className="text-[14px] font-bold text-[#0F172A]">OTP on Login</span>
                <span className="text-[12px] text-slate-455 font-semibold leading-normal">Send an OTP to the registered mobile number on every login attempt.</span>
              </div>
              <Toggle
                value={securitySettings.otpOnLogin}
                onToggle={() => {
                  setSecuritySettings(prev => ({ ...prev, otpOnLogin: !prev.otpOnLogin }));
                  showToast(`OTP on Login ${!securitySettings.otpOnLogin ? 'enabled' : 'disabled'}`, 'info');
                }}
              />
            </div>

            {/* Inline Fields: OTP Expiry & OTP Resend Cooldown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-2">
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-bold text-[#0F172A]">OTP Expiry (Minutes)</label>
                <input
                  type="text"
                  value={securitySettings.otpExpiry}
                  onChange={e => setSecuritySettings(prev => ({ ...prev, otpExpiry: e.target.value }))}
                  className="h-10 px-3.5 rounded-lg border border-[#E2E8F0] bg-white text-[13px] text-[#0F172A] font-semibold focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-bold text-[#0F172A]">OTP Resend Cooldown (Seconds)</label>
                <input
                  type="text"
                  value={securitySettings.otpCooldown}
                  onChange={e => setSecuritySettings(prev => ({ ...prev, otpCooldown: e.target.value }))}
                  className="h-10 px-3.5 rounded-lg border border-[#E2E8F0] bg-white text-[13px] text-[#0F172A] font-semibold focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Password Policies Card */}
        <div className="bg-white border border-[#E2E8F0] rounded-[16px] p-6 shadow-2xs flex flex-col gap-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-[16px] font-bold text-[#0F172A] font-sans">Password Policies</h3>
            <p className="text-[13px] text-slate-500 font-semibold mt-1">Enforce strict password requirements for all platform users.</p>
          </div>

          <div className="flex flex-col gap-5">
            {/* Inline Fields: OTP Expiry & OTP Resend Cooldown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-bold text-[#0F172A]">OTP Expiry (Minutes)</label>
                <input
                  type="text"
                  value={securitySettings.pwdOtpExpiry}
                  onChange={e => setSecuritySettings(prev => ({ ...prev, pwdOtpExpiry: e.target.value }))}
                  className="h-10 px-3.5 rounded-lg border border-[#E2E8F0] bg-white text-[13px] text-[#0F172A] font-semibold focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-bold text-[#0F172A]">OTP Resend Cooldown (Seconds)</label>
                <input
                  type="text"
                  value={securitySettings.pwdOtpCooldown}
                  onChange={e => setSecuritySettings(prev => ({ ...prev, pwdOtpCooldown: e.target.value }))}
                  className="h-10 px-3.5 rounded-lg border border-[#E2E8F0] bg-white text-[13px] text-[#0F172A] font-semibold focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>
            </div>

            {/* Password Policy Toggles */}
            <div className="flex flex-col gap-4 mt-2">
              {/* Require at least one uppercase letter */}
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-bold text-[#0F172A]">Require at least one uppercase letter</span>
                <Toggle
                  value={securitySettings.requireUppercase}
                  onToggle={() => {
                    setSecuritySettings(prev => ({ ...prev, requireUppercase: !prev.requireUppercase }));
                    showToast(`Uppercase requirement ${!securitySettings.requireUppercase ? 'enabled' : 'disabled'}`, 'info');
                  }}
                />
              </div>

              {/* Require at least one number */}
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-bold text-[#0F172A]">Require at least one number</span>
                <Toggle
                  value={securitySettings.requireNumber}
                  onToggle={() => {
                    setSecuritySettings(prev => ({ ...prev, requireNumber: !prev.requireNumber }));
                    showToast(`Number requirement ${!securitySettings.requireNumber ? 'enabled' : 'disabled'}`, 'info');
                  }}
                />
              </div>

              {/* Require at least one special character */}
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-bold text-[#0F172A]">Require at least one special character</span>
                <Toggle
                  value={securitySettings.requireSpecial}
                  onToggle={() => {
                    setSecuritySettings(prev => ({ ...prev, requireSpecial: !prev.requireSpecial }));
                    showToast(`Special character requirement ${!securitySettings.requireSpecial ? 'enabled' : 'disabled'}`, 'info');
                  }}
                />
              </div>

              {/* Prevent reusing previous passwords */}
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-bold text-[#0F172A]">Prevent reusing previous passwords</span>
                <Toggle
                  value={securitySettings.preventReuse}
                  onToggle={() => {
                    setSecuritySettings(prev => ({ ...prev, preventReuse: !prev.preventReuse }));
                    showToast(`Password reuse prevention ${!securitySettings.preventReuse ? 'enabled' : 'disabled'}`, 'info');
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* IP & Access Restrictions Card */}
        <div className="bg-white border border-[#E2E8F0] rounded-[16px] p-6 shadow-2xs flex flex-col gap-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-[16px] font-bold text-[#0F172A] font-sans">IP & Access Restrictions</h3>
            <p className="text-[13px] text-slate-500 font-semibold mt-1">Restrict access to the platform based on network rules.</p>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-bold text-[#0F172A]">Whitelisted Admin IPs (One per line)</label>
              <textarea
                value={securitySettings.whitelistedIps}
                onChange={e => setSecuritySettings(prev => ({ ...prev, whitelistedIps: e.target.value }))}
                placeholder="e.g. 192.168.1.1"
                className="w-full min-h-[120px] p-4 rounded-xl border border-[#E2E8F0] bg-white text-[13px] text-[#0F172A] font-semibold focus:outline-none focus:ring-1 focus:ring-black resize-none"
              />
            </div>

            {/* Geoblocking */}
            <div className="flex items-center justify-between py-1">
              <div className="flex flex-col gap-0.5 max-w-[80%]">
                <span className="text-[14px] font-bold text-[#0F172A]">Geoblocking</span>
                <span className="text-[12px] text-slate-455 font-semibold leading-normal">Block logins from foreign countries.</span>
              </div>
              <Toggle
                value={securitySettings.geoblocking}
                onToggle={() => {
                  setSecuritySettings(prev => ({ ...prev, geoblocking: !prev.geoblocking }));
                  showToast(`Geoblocking ${!securitySettings.geoblocking ? 'enabled' : 'disabled'}`, 'info');
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ==========================================
  // --- STAFF SETTINGS VIEW ---
  // ==========================================
  const renderStaffContent = () => {
    const STAFF_TABS = ['Roles & Access', 'Session Policies', 'Login Management'];

    // Reusable Toggle switch matching existing design
    const Toggle = ({ value, onToggle }) => (
      <button
        type="button"
        onClick={onToggle}
        className={`w-[44px] h-[24px] rounded-full p-[2px] transition-colors duration-300 focus:outline-none cursor-pointer relative flex items-center shrink-0 ${
          value ? 'bg-blue-600' : 'bg-slate-200'
        }`}
      >
        <div className={`bg-white w-[20px] h-[20px] rounded-full shadow-sm transform transition-transform duration-300 ${
          value ? 'translate-x-[20px]' : 'translate-x-0'
        }`} />
      </button>
    );

    return (
      <div className="flex flex-col gap-6">
        {/* Tab selection header bar */}
        <div className="w-full bg-[#F1F5F9] p-1 rounded-xl flex gap-1 overflow-x-auto shrink-0 shadow-2xs">
          {STAFF_TABS.map(t => {
            const isSelected = staffSubTab === t;
            return (
              <button
                key={t}
                onClick={() => setStaffSubTab(t)}
                className={`flex-1 min-w-[120px] py-2 px-3 text-[13px] font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-white text-[#0F172A] shadow-xs font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>

        {/* Tab content panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={staffSubTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            {/* ---- ROLES & ACCESS ---- */}
            {staffSubTab === 'Roles & Access' && (
              <div className="bg-white border border-[#E2E8F0] rounded-[16px] p-6 shadow-2xs flex flex-col gap-6">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <h3 className="text-[16px] font-bold text-[#0F172A] font-sans">Role Permissions</h3>
                    <p className="text-[13px] text-slate-500 font-semibold mt-1">Configure access control for different staff roles.</p>
                  </div>
                  <button
                    onClick={() => {
                      setNewRoleName('');
                      setIsAddRoleModalOpen(true);
                    }}
                    className="h-10 px-4 bg-black text-white text-[13px] font-bold rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    + Add Role
                  </button>
                </div>

                <div className="w-full border border-[#E2E8F0] rounded-xl overflow-x-auto shadow-3xs">
                  <table className="w-full text-left border-collapse min-w-[640px]">
                    <thead>
                      <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[13px] font-bold text-slate-500">
                        <th className="py-3.5 px-5 font-bold text-[#0F172A]">Role Name</th>
                        <th className="py-3.5 px-5 font-semibold text-center">Dashboard</th>
                        <th className="py-3.5 px-5 font-semibold text-center">Products</th>
                        <th className="py-3.5 px-5 font-semibold text-center">Customers</th>
                        <th className="py-3.5 px-5 font-semibold text-center">Vendors</th>
                        <th className="py-3.5 px-5 font-semibold text-center">Reports</th>
                        <th className="py-3.5 px-5 font-semibold text-center">Settings</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F1F5F9]">
                      {staffRoles.map(role => (
                        <tr key={role.id} className="text-[13px] text-[#0F172A] hover:bg-slate-50/50 transition-colors">
                          <td className="py-4 px-5 font-bold">{role.name}</td>
                          {['dashboard', 'products', 'customers', 'vendors', 'reports', 'settings'].map(perm => (
                            <td key={perm} className="py-4 px-5 text-center">
                              <input
                                type="checkbox"
                                checked={role.permissions[perm]}
                                onChange={() => {
                                  setStaffRoles(prev => prev.map(r => {
                                    if (r.id === role.id) {
                                      const updatedPerms = {
                                        ...r.permissions,
                                        [perm]: !r.permissions[perm]
                                      };
                                      return { ...r, permissions: updatedPerms };
                                    }
                                    return r;
                                  }));
                                  showToast(`Updated ${role.name} permission for ${perm}`, 'info');
                                }}
                                className="w-4 h-4 border border-[#E2E8F0] rounded-sm bg-white accent-black cursor-pointer"
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ---- SESSION POLICIES ---- */}
            {staffSubTab === 'Session Policies' && (
              <div className="bg-white border border-[#E2E8F0] rounded-[16px] p-6 shadow-2xs flex flex-col gap-6">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-[16px] font-bold text-[#0F172A] font-sans">Session & Logout Policies</h3>
                  <p className="text-[13px] text-slate-500 font-semibold mt-1">Control how staff sessions are handled.</p>
                </div>

                <div className="flex flex-col gap-5">
                  {/* Inline Fields: Auto Logout Time & Session Expiry */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-[13px] font-bold text-[#0F172A]">Auto Logout Time (Minutes of inactivity)</label>
                      <input
                        type="text"
                        value={sessionPolicies.autoLogoutTime}
                        onChange={e => setSessionPolicies(prev => ({ ...prev, autoLogoutTime: e.target.value }))}
                        className="h-10 px-3.5 rounded-lg border border-[#E2E8F0] bg-white text-[13px] text-[#0F172A] font-semibold focus:outline-none focus:ring-1 focus:ring-black"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[13px] font-bold text-[#0F172A]">Session Expiry (Hours)</label>
                      <input
                        type="text"
                        value={sessionPolicies.sessionExpiry}
                        onChange={e => setSessionPolicies(prev => ({ ...prev, sessionExpiry: e.target.value }))}
                        className="h-10 px-3.5 rounded-lg border border-[#E2E8F0] bg-white text-[13px] text-[#0F172A] font-semibold focus:outline-none focus:ring-1 focus:ring-black"
                      />
                    </div>
                  </div>

                  {/* Session Policy Toggles */}
                  <div className="flex flex-col gap-4 mt-2">
                    {/* Concurrent Login Rules */}
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-0.5 max-w-[80%]">
                        <span className="text-[14px] font-bold text-[#0F172A]">Concurrent Login Rules</span>
                        <span className="text-[12px] text-slate-455 font-semibold leading-normal">Allow users to log in from multiple devices simultaneously.</span>
                      </div>
                      <Toggle
                        value={sessionPolicies.concurrentLogins}
                        onToggle={() => {
                          setSessionPolicies(prev => ({ ...prev, concurrentLogins: !prev.concurrentLogins }));
                          showToast(`Concurrent logins ${!sessionPolicies.concurrentLogins ? 'enabled' : 'disabled'}`, 'info');
                        }}
                      />
                    </div>

                    {/* Force Re-authentication */}
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-0.5 max-w-[80%]">
                        <span className="text-[14px] font-bold text-[#0F172A]">Force Re-authentication</span>
                        <span className="text-[12px] text-slate-455 font-semibold leading-normal">Require password entry for sensitive actions.</span>
                      </div>
                      <Toggle
                        value={sessionPolicies.forceReauth}
                        onToggle={() => {
                          setSessionPolicies(prev => ({ ...prev, forceReauth: !prev.forceReauth }));
                          showToast(`Force re-authentication ${!sessionPolicies.forceReauth ? 'enabled' : 'disabled'}`, 'info');
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ---- LOGIN MANAGEMENT ---- */}
            {staffSubTab === 'Login Management' && (
              <div className="bg-white border border-[#E2E8F0] rounded-[16px] p-6 shadow-2xs flex flex-col gap-6">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-[16px] font-bold text-[#0F172A] font-sans">Login Management</h3>
                  <p className="text-[13px] text-slate-500 font-semibold mt-1">Monitor and restrict login behavior.</p>
                </div>

                <div className="flex flex-col gap-5">
                  {/* Inline Fields: Max Failed Attempts & Lockout Duration */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-[13px] font-bold text-[#0F172A]">Max Failed Login Attempts</label>
                      <input
                        type="text"
                        value={loginManagement.maxFailedAttempts}
                        onChange={e => setLoginManagement(prev => ({ ...prev, maxFailedAttempts: e.target.value }))}
                        className="h-10 px-3.5 rounded-lg border border-[#E2E8F0] bg-white text-[13px] text-[#0F172A] font-semibold focus:outline-none focus:ring-1 focus:ring-black"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[13px] font-bold text-[#0F172A]">Account Lockout Duration (Minutes)</label>
                      <input
                        type="text"
                        value={loginManagement.lockoutDuration}
                        onChange={e => setLoginManagement(prev => ({ ...prev, lockoutDuration: e.target.value }))}
                        className="h-10 px-3.5 rounded-lg border border-[#E2E8F0] bg-white text-[13px] text-[#0F172A] font-semibold focus:outline-none focus:ring-1 focus:ring-black"
                      />
                    </div>
                  </div>

                  {/* Login Management Toggles */}
                  <div className="flex flex-col gap-4 mt-2">
                    {/* Login Tracking */}
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-0.5 max-w-[80%]">
                        <span className="text-[14px] font-bold text-[#0F172A]">Login Tracking</span>
                        <span className="text-[12px] text-slate-455 font-semibold leading-normal">Log IP addresses and device information for every login.</span>
                      </div>
                      <Toggle
                        value={loginManagement.loginTracking}
                        onToggle={() => {
                          setLoginManagement(prev => ({ ...prev, loginTracking: !prev.loginTracking }));
                          showToast(`Login tracking ${!loginManagement.loginTracking ? 'enabled' : 'disabled'}`, 'info');
                        }}
                      />
                    </div>

                    {/* Device Restrictions */}
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-0.5 max-w-[80%]">
                        <span className="text-[14px] font-bold text-[#0F172A]">Device Restrictions</span>
                        <span className="text-[12px] text-slate-455 font-semibold leading-normal">Only allow logins from recognized/registered devices.</span>
                      </div>
                      <Toggle
                        value={loginManagement.deviceRestrictions}
                        onToggle={() => {
                          setLoginManagement(prev => ({ ...prev, deviceRestrictions: !prev.deviceRestrictions }));
                          showToast(`Device restrictions ${!loginManagement.deviceRestrictions ? 'enabled' : 'disabled'}`, 'info');
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  };

  // ==========================================
  // --- REFERRAL SETTINGS VIEW ---
  // ==========================================
  const renderReferralContent = () => {
    const REFERRAL_TABS = ['Tracking URL', 'Discount & Rewards', 'Coupon Rules'];

    const Toggle = ({ value, onToggle }) => (
      <button
        type="button"
        onClick={onToggle}
        className={`w-[44px] h-[24px] rounded-full p-[2px] transition-colors duration-300 focus:outline-none cursor-pointer relative flex items-center shrink-0 ${
          value ? 'bg-blue-600' : 'bg-slate-200'
        }`}
      >
        <div className={`bg-white w-[20px] h-[20px] rounded-full shadow-sm transform transition-transform duration-300 ${
          value ? 'translate-x-[20px]' : 'translate-x-0'
        }`} />
      </button>
    );

    return (
      <div className="flex flex-col gap-6">
        {/* Sub-Tab Selection Bar */}
        <div className="w-full bg-[#F1F5F9] p-1 rounded-xl flex gap-1 overflow-x-auto shrink-0 shadow-2xs">
          {REFERRAL_TABS.map(t => {
            const isSelected = referralSubTab === t;
            return (
              <button
                key={t}
                onClick={() => setReferralSubTab(t)}
                className={`flex-1 min-w-[120px] py-2 px-3 text-[13px] font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-white text-[#0F172A] shadow-xs font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={referralSubTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full flex flex-col gap-5"
          >
            {/* ---- TRACKING URL ---- */}
            {referralSubTab === 'Tracking URL' && (
              <>
                <div className="bg-white border border-[#E2E8F0] rounded-[16px] p-6 shadow-2xs flex flex-col gap-5">
                  <div className="border-b border-slate-100 pb-4">
                    <h3 className="text-[16px] font-bold text-[#0F172A] font-sans">Referral URL Tracking</h3>
                    <p className="text-[13px] text-slate-500 font-semibold mt-1">Configure how referral links are generated and tracked.</p>
                  </div>
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-[13px] font-bold text-[#0F172A]">Referral Base URL</label>
                      <input
                        type="text"
                        value={referralURLSettings.referralBaseURL}
                        onChange={e => setReferralURLSettings(prev => ({ ...prev, referralBaseURL: e.target.value }))}
                        placeholder="e.g. https://speedcopy.com/ref"
                        className="h-10 px-3.5 rounded-lg border border-[#E2E8F0] bg-white text-[13px] text-[#0F172A] font-semibold focus:outline-none focus:ring-1 focus:ring-black max-w-xl"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[13px] font-bold text-[#0F172A]">Tracking Parameter Name</label>
                      <input
                        type="text"
                        value={referralURLSettings.trackingParamName}
                        onChange={e => setReferralURLSettings(prev => ({ ...prev, trackingParamName: e.target.value }))}
                        placeholder="e.g. ref_code"
                        className="h-10 px-3.5 rounded-lg border border-[#E2E8F0] bg-white text-[13px] text-[#0F172A] font-semibold focus:outline-none focus:ring-1 focus:ring-black max-w-xl"
                      />
                    </div>
                  </div>
                </div>

                {/* UTM Forwarding toggle row — outside card, matching mockup */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-0.5 max-w-[80%]">
                    <span className="text-[14px] font-bold text-[#0F172A]">UTM Forwarding</span>
                    <span className="text-[12px] text-slate-455 font-semibold leading-normal">Automatically attach UTM tags to referral links for GA tracking.</span>
                  </div>
                  <Toggle
                    value={referralURLSettings.utmForwarding}
                    onToggle={() => {
                      setReferralURLSettings(prev => ({ ...prev, utmForwarding: !prev.utmForwarding }));
                      showToast(`UTM Forwarding ${!referralURLSettings.utmForwarding ? 'enabled' : 'disabled'}`, 'info');
                    }}
                  />
                </div>
              </>
            )}

            {/* ---- DISCOUNT & REWARDS ---- */}
            {referralSubTab === 'Discount & Rewards' && (
              <div className="bg-white border border-[#E2E8F0] rounded-[16px] p-6 shadow-2xs flex flex-col gap-5">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-[16px] font-bold text-[#0F172A] font-sans">Discount & Reward Settings</h3>
                  <p className="text-[13px] text-slate-500 font-semibold mt-1">Set the financial incentives for referrals.</p>
                </div>
                <div className="flex flex-col gap-5">
                  {/* Two-col grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-[13px] font-bold text-[#0F172A]">Referral Reward Amount ($)</label>
                      <input
                        type="text"
                        value={discountRewardSettings.rewardAmount}
                        onChange={e => setDiscountRewardSettings(prev => ({ ...prev, rewardAmount: e.target.value }))}
                        className="h-10 px-3.5 rounded-lg border border-[#E2E8F0] bg-white text-[13px] text-[#0F172A] font-semibold focus:outline-none focus:ring-1 focus:ring-black"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[13px] font-bold text-[#0F172A]">Referral Commission (%)</label>
                      <input
                        type="text"
                        value={discountRewardSettings.commissionPct}
                        onChange={e => setDiscountRewardSettings(prev => ({ ...prev, commissionPct: e.target.value }))}
                        className="h-10 px-3.5 rounded-lg border border-[#E2E8F0] bg-white text-[13px] text-[#0F172A] font-semibold focus:outline-none focus:ring-1 focus:ring-black"
                      />
                    </div>
                  </div>
                  {/* Full-width max discount */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-bold text-[#0F172A]">Maximum Discount Allowed ($)</label>
                    <input
                      type="text"
                      value={discountRewardSettings.maxDiscountAllowed}
                      onChange={e => setDiscountRewardSettings(prev => ({ ...prev, maxDiscountAllowed: e.target.value }))}
                      className="h-10 px-3.5 rounded-lg border border-[#E2E8F0] bg-white text-[13px] text-[#0F172A] font-semibold focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ---- COUPON RULES ---- */}
            {referralSubTab === 'Coupon Rules' && (
              <>
                <div className="bg-white border border-[#E2E8F0] rounded-[16px] p-6 shadow-2xs flex flex-col gap-5">
                  <div className="border-b border-slate-100 pb-4">
                    <h3 className="text-[16px] font-bold text-[#0F172A] font-sans">Coupon & Usage Rules</h3>
                    <p className="text-[13px] text-slate-500 font-semibold mt-1">Define restrictions on referral rewards.</p>
                  </div>
                  <div className="flex flex-col gap-5">
                    {/* Two-col grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-2">
                        <label className="text-[13px] font-bold text-[#0F172A]">Expiry Rules (Days)</label>
                        <input
                          type="text"
                          value={couponUsageRules.expiryDays}
                          onChange={e => setCouponUsageRules(prev => ({ ...prev, expiryDays: e.target.value }))}
                          className="h-10 px-3.5 rounded-lg border border-[#E2E8F0] bg-white text-[13px] text-[#0F172A] font-semibold focus:outline-none focus:ring-1 focus:ring-black"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[13px] font-bold text-[#0F172A]">Maximum Usage Limits</label>
                        <input
                          type="text"
                          value={couponUsageRules.maxUsageLimits}
                          onChange={e => setCouponUsageRules(prev => ({ ...prev, maxUsageLimits: e.target.value }))}
                          className="h-10 px-3.5 rounded-lg border border-[#E2E8F0] bg-white text-[13px] text-[#0F172A] font-semibold focus:outline-none focus:ring-1 focus:ring-black"
                        />
                      </div>
                    </div>
                    {/* Full-width max discount */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[13px] font-bold text-[#0F172A]">Maximum Discount Allowed ($)</label>
                      <input
                        type="text"
                        value={couponUsageRules.maxDiscount}
                        onChange={e => setCouponUsageRules(prev => ({ ...prev, maxDiscount: e.target.value }))}
                        className="h-10 px-3.5 rounded-lg border border-[#E2E8F0] bg-white text-[13px] text-[#0F172A] font-semibold focus:outline-none focus:ring-1 focus:ring-black"
                      />
                    </div>
                  </div>
                </div>

                {/* One Time Usage toggle row — outside card, matching mockup */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-0.5 max-w-[80%]">
                    <span className="text-[14px] font-bold text-[#0F172A]">One Time Usage</span>
                    <span className="text-[12px] text-slate-455 font-semibold leading-normal">Referred user can only use the discount on their first order.</span>
                  </div>
                  <Toggle
                    value={couponUsageRules.oneTimeUsage}
                    onToggle={() => {
                      setCouponUsageRules(prev => ({ ...prev, oneTimeUsage: !prev.oneTimeUsage }));
                      showToast(`One Time Usage ${!couponUsageRules.oneTimeUsage ? 'enabled' : 'disabled'}`, 'info');
                    }}
                  />
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  };

  // ==========================================
  // --- AUDIT LOGS STATE ---
  // ==========================================
  const [auditLogs, setAuditLogs] = useState([
    { id: 1, event: 'CONFIG_CHANGE', actor: 'admin_sarah', initials: 'SJ', details: 'Updated Meta API rate limits', ip: '192.168.1.101', timestamp: 'Jun 1, 2026\n14:21' },
    { id: 2, event: 'USER_SUSPENDED', actor: 'admin_sarah', initials: 'SJ', details: 'Suspended user account: bot_492', ip: '192.168.1.102', timestamp: 'Jun 1, 2026\n14:22' },
    { id: 3, event: 'SECURITY_ALERT', actor: 'admin_sarah', initials: 'SJ', details: 'Multiple failed login attempts detected', ip: '192.168.1.103', timestamp: 'Jun 1, 2026\n14:23' },
    { id: 4, event: 'USER_SUSPENDED', actor: 'admin_sarah', initials: 'SJ', details: 'Suspended user account: bot_492', ip: '192.168.1.104', timestamp: 'Jun 1, 2026\n14:24' },
    { id: 5, event: 'CONFIG_CHANGE', actor: 'admin_sarah', initials: 'SJ', details: 'Updated Meta API rate limits', ip: '192.168.1.105', timestamp: 'Jun 1, 2026\n14:25' },
    { id: 6, event: 'SECURITY_ALERT', actor: 'admin_sarah', initials: 'SJ', details: 'Multiple failed login attempts detected', ip: '192.168.1.106', timestamp: 'Jun 1, 2026\n14:26' },
    { id: 7, event: 'CONFIG_CHANGE', actor: 'admin_sarah', initials: 'SJ', details: 'Updated Meta API rate limits', ip: '192.168.1.107', timestamp: 'Jun 1, 2026\n14:27' },
    { id: 8, event: 'USER_SUSPENDED', actor: 'admin_sarah', initials: 'SJ', details: 'Suspended user account: bot_492', ip: '192.168.1.108', timestamp: 'Jun 1, 2026\n14:28' }
  ]);
  const [auditPage, setAuditPage] = useState(1);

  // ==========================================
  // --- AUDIT LOGS VIEW ---
  // ==========================================
  const renderAuditContent = () => {
    const EVENT_STYLES = {
      CONFIG_CHANGE: {
        bg: 'bg-[#EFF6FF]',
        text: 'text-[#3B82F6]',
        border: 'border border-[#BFDBFE]'
      },
      USER_SUSPENDED: {
        bg: 'bg-[#FFF7ED]',
        text: 'text-[#F97316]',
        border: 'border border-[#FED7AA]'
      },
      SECURITY_ALERT: {
        bg: 'bg-[#FFF1F2]',
        text: 'text-[#F43F5E]',
        border: 'border border-[#FECDD3]'
      }
    };

    const visibleLogs = auditLogs.slice(0, auditPage * 8);
    const hasMore = visibleLogs.length < auditLogs.length || auditLogs.length >= auditPage * 8;

    return (
      <div className="flex flex-col gap-0">
        <div className="bg-white border border-[#E2E8F0] rounded-[16px] shadow-2xs overflow-hidden">
          {/* Table */}
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                  <th className="py-3.5 px-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Event</th>
                  <th className="py-3.5 px-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Actor</th>
                  <th className="py-3.5 px-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Details</th>
                  <th className="py-3.5 px-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">IP Address</th>
                  <th className="py-3.5 px-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {visibleLogs.map(log => {
                  const style = EVENT_STYLES[log.event] || EVENT_STYLES.CONFIG_CHANGE;
                  return (
                    <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                      {/* Event Badge */}
                      <td className="py-4 px-5">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide whitespace-nowrap ${style.bg} ${style.text} ${style.border}`}>
                          {log.event}
                        </span>
                      </td>
                      {/* Actor */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-[#6366F1] text-white flex items-center justify-center text-[11px] font-bold shrink-0">
                            {log.initials}
                          </div>
                          <span className="text-[13px] font-bold text-[#0F172A] whitespace-nowrap">{log.actor}</span>
                        </div>
                      </td>
                      {/* Details */}
                      <td className="py-4 px-5">
                        <span className="text-[13px] font-semibold text-[#475569]">{log.details}</span>
                      </td>
                      {/* IP Address */}
                      <td className="py-4 px-5">
                        <span className="text-[13px] font-semibold text-[#6366F1]">{log.ip}</span>
                      </td>
                      {/* Timestamp */}
                      <td className="py-4 px-5">
                        <span className="text-[12px] font-semibold text-slate-500 whitespace-pre-line">{log.timestamp}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Load More */}
          <div className="flex items-center justify-center py-4 border-t border-[#F1F5F9]">
            <button
              onClick={() => {
                setAuditPage(prev => prev + 1);
                showToast('Loading more audit logs...', 'info');
              }}
              className="flex items-center gap-2 text-[13px] font-bold text-[#475569] hover:text-[#0F172A] transition-colors cursor-pointer py-2 px-4 rounded-lg hover:bg-slate-50"
            >
              <FiClock size={15} className="text-slate-400" />
              Load more logs
            </button>
          </div>
        </div>
      </div>
    );
  };


  // ==========================================
  // --- NOTIFICATION SETTINGS VIEW ---
  // ==========================================
  const renderNotificationContent = () => {
    const NOTIFICATION_TABS = ['Channels', 'Customer Notifications', 'Vendor Alerts', 'Admin Alerts'];

    const Toggle = ({ value, onToggle }) => (
      <button
        type="button"
        onClick={onToggle}
        className={`w-[44px] h-[24px] rounded-full p-[2px] transition-colors duration-300 focus:outline-none cursor-pointer relative flex items-center shrink-0 ${
          value ? 'bg-blue-600' : 'bg-slate-200'
        }`}
      >
        <div className={`bg-white w-[20px] h-[20px] rounded-full shadow-sm transform transition-transform duration-300 ${
          value ? 'translate-x-[20px]' : 'translate-x-0'
        }`} />
      </button>
    );

    return (
      <div className="flex flex-col gap-6">
        {/* Sub-Tab Selection Bar */}
        <div className="w-full bg-[#F1F5F9] p-1 rounded-xl flex gap-1 overflow-x-auto shrink-0 shadow-2xs">
          {NOTIFICATION_TABS.map(t => {
            const isSelected = notificationSubTab === t;
            return (
              <button
                key={t}
                onClick={() => setNotificationSubTab(t)}
                className={`flex-1 min-w-[140px] py-2 px-3 text-[13px] font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-white text-[#0F172A] shadow-xs font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={notificationSubTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full flex flex-col gap-5"
          >
            {/* ---- CHANNELS ---- */}
            {notificationSubTab === 'Channels' && (
              <div className="bg-white border border-[#E2E8F0] rounded-[16px] p-6 shadow-2xs flex flex-col gap-5">
                <div className="border-b border-[#F1F5F9] pb-4">
                  <h3 className="text-[16px] font-bold text-[#0F172A] font-sans">Notification Channels</h3>
                  <p className="text-[13px] text-slate-500 font-semibold mt-1">Enable or disable global notification delivery methods.</p>
                </div>
                <div className="flex flex-col gap-3">
                  {/* Email Notifications */}
                  <div className="border border-[#E2E8F0] rounded-xl p-4 flex items-center justify-between bg-[#F8FAFC]/50 hover:bg-[#F8FAFC] transition-colors">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[14px] font-bold text-[#0F172A]">Email Notifications</span>
                      <span className="text-[12px] text-slate-455 font-semibold leading-normal">Send transactional emails to users.</span>
                    </div>
                    <Toggle
                      value={notificationChannels.email}
                      onToggle={() => {
                        setNotificationChannels(prev => ({ ...prev, email: !prev.email }));
                        showToast(`Email Notifications ${!notificationChannels.email ? 'enabled' : 'disabled'}`, 'info');
                      }}
                    />
                  </div>

                  {/* SMS Notifications */}
                  <div className="border border-[#E2E8F0] rounded-xl p-4 flex items-center justify-between bg-[#F8FAFC]/50 hover:bg-[#F8FAFC] transition-colors">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[14px] font-bold text-[#0F172A]">SMS Notifications</span>
                      <span className="text-[12px] text-slate-455 font-semibold leading-normal">Send text messages for critical updates like OTPs and delivery.</span>
                    </div>
                    <Toggle
                      value={notificationChannels.sms}
                      onToggle={() => {
                        setNotificationChannels(prev => ({ ...prev, sms: !prev.sms }));
                        showToast(`SMS Notifications ${!notificationChannels.sms ? 'enabled' : 'disabled'}`, 'info');
                      }}
                    />
                  </div>

                  {/* Push Notifications */}
                  <div className="border border-[#E2E8F0] rounded-xl p-4 flex items-center justify-between bg-[#F8FAFC]/50 hover:bg-[#F8FAFC] transition-colors">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[14px] font-bold text-[#0F172A]">Push Notifications</span>
                      <span className="text-[12px] text-slate-455 font-semibold leading-normal">In-app or browser push notifications.</span>
                    </div>
                    <Toggle
                      value={notificationChannels.push}
                      onToggle={() => {
                        setNotificationChannels(prev => ({ ...prev, push: !prev.push }));
                        showToast(`Push Notifications ${!notificationChannels.push ? 'enabled' : 'disabled'}`, 'info');
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ---- CUSTOMER EVENT TRIGGERS ---- */}
            {notificationSubTab === 'Customer Notifications' && (
              <div className="bg-white border border-[#E2E8F0] rounded-[16px] p-6 shadow-2xs flex flex-col gap-5">
                <div className="border-b border-[#F1F5F9] pb-4">
                  <h3 className="text-[16px] font-bold text-[#0F172A] font-sans">Customer Event Triggers</h3>
                  <p className="text-[13px] text-slate-500 font-semibold mt-1">Configure which events notify the customer.</p>
                </div>
                <div className="flex flex-col gap-3">
                  {[
                    { key: 'orderPlaced', label: 'Order Placed', desc: 'When a customer successfully places an order' },
                    { key: 'orderShipped', label: 'Order Shipped', desc: 'When an order is handed to delivery partner' },
                    { key: 'orderDelivered', label: 'Order Delivered', desc: 'When an order reaches the customer' },
                    { key: 'orderCancelled', label: 'Order Cancelled', desc: 'When an order is cancelled or refunded' },
                    { key: 'abandonedCart', label: 'Abandoned Cart', desc: 'Reminder for items left in cart' }
                  ].map(item => (
                    <div key={item.key} className="border border-[#E2E8F0] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[#F8FAFC]/50 hover:bg-[#F8FAFC] transition-colors">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[14px] font-bold text-[#0F172A]">{item.label}</span>
                        <span className="text-[12px] text-slate-455 font-semibold leading-normal">{item.desc}</span>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <span className="text-[13px] font-bold text-[#0F172A]">Email</span>
                          <Toggle
                            value={customerTriggers[item.key].email}
                            onToggle={() => {
                              setCustomerTriggers(prev => ({
                                ...prev,
                                [item.key]: { ...prev[item.key], email: !prev[item.key].email }
                              }));
                            }}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[13px] font-bold text-[#0F172A]">SMS</span>
                          <Toggle
                            value={customerTriggers[item.key].sms}
                            onToggle={() => {
                              setCustomerTriggers(prev => ({
                                ...prev,
                                [item.key]: { ...prev[item.key], sms: !prev[item.key].sms }
                              }));
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ---- VENDOR ALERTS ---- */}
            {notificationSubTab === 'Vendor Alerts' && (
              <div className="bg-white border border-[#E2E8F0] rounded-[16px] p-6 shadow-2xs flex flex-col gap-5">
                <div className="border-b border-[#F1F5F9] pb-4">
                  <h3 className="text-[16px] font-bold text-[#0F172A] font-sans">Vendor Event Triggers</h3>
                  <p className="text-[13px] text-slate-500 font-semibold mt-1">Configure alerts sent to vendors regarding their store.</p>
                </div>
                <div className="flex flex-col gap-3">
                  {[
                    { key: 'newOrder', label: 'New Order Received', desc: "When a customer orders a vendor's product" },
                    { key: 'lowStock', label: 'Low Stock Alert', desc: 'When a product inventory drops below threshold' },
                    { key: 'payoutProcessed', label: 'Payout Processed', desc: 'When a settlement is transferred to vendor bank' },
                    { key: 'accountVerification', label: 'Account Verification', desc: 'Status updates regarding document approval' }
                  ].map(item => (
                    <div key={item.key} className="border border-[#E2E8F0] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[#F8FAFC]/50 hover:bg-[#F8FAFC] transition-colors">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[14px] font-bold text-[#0F172A]">{item.label}</span>
                        <span className="text-[12px] text-slate-455 font-semibold leading-normal">{item.desc}</span>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <span className="text-[13px] font-bold text-[#0F172A]">Email</span>
                          <Toggle
                            value={vendorTriggers[item.key].email}
                            onToggle={() => {
                              setVendorTriggers(prev => ({
                                ...prev,
                                [item.key]: { ...prev[item.key], email: !prev[item.key].email }
                              }));
                            }}
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => showToast(`Edit template for: ${item.label}`, 'info')}
                          className="text-[13px] font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Threshold Settings */}
                  <div className="mt-4 pt-4 border-t border-[#F1F5F9] flex flex-col gap-4">
                    <h4 className="text-[14px] font-bold text-[#0F172A]">Threshold Settings</h4>
                    <div className="flex flex-col gap-2">
                      <label className="text-[13px] font-bold text-[#0F172A]">Low Stock Warning Threshold</label>
                      <input
                        type="text"
                        value={lowStockThreshold}
                        onChange={e => setLowStockThreshold(e.target.value)}
                        className="h-10 px-3.5 rounded-lg border border-[#E2E8F0] bg-white text-[13px] text-[#0F172A] font-semibold focus:outline-none focus:ring-1 focus:ring-black max-w-xs"
                      />
                      <p className="text-[11px] text-slate-500 font-semibold">Alert vendor when inventory drops to this amount.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ---- ADMIN ALERTS ---- */}
            {notificationSubTab === 'Admin Alerts' && (
              <div className="bg-white border border-[#E2E8F0] rounded-[16px] p-6 shadow-2xs flex flex-col gap-5">
                <div className="border-b border-[#F1F5F9] pb-4">
                  <h3 className="text-[16px] font-bold text-[#0F172A] font-sans">Admin Alerts</h3>
                  <p className="text-[13px] text-slate-500 font-semibold mt-1">Manage email, SMS, and push notification triggers and templates</p>
                </div>
                <div className="flex flex-col gap-5">
                  {/* Email addresses textarea */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-bold text-[#0F172A]">Admin Alert Email Addresses</label>
                    <textarea
                      rows={3}
                      value={adminAlertEmails}
                      onChange={e => setAdminAlertEmails(e.target.value)}
                      className="p-3.5 rounded-lg border border-[#E2E8F0] bg-white text-[13px] text-[#0F172A] font-semibold focus:outline-none focus:ring-1 focus:ring-black max-w-xl font-sans"
                    />
                  </div>

                  {/* Alert Triggers */}
                  <div className="flex flex-col gap-3 pt-2">
                    <h4 className="text-[14px] font-bold text-[#0F172A] mb-1">Alert Triggers</h4>
                    {[
                      { key: 'newVendor', label: 'New Vendor Registration', desc: 'Requires admin review and approval' },
                      { key: 'highValueOrder', label: 'High Value Order', desc: 'Orders exceeding platform threshold' },
                      { key: 'disputeOpened', label: 'Dispute Opened', desc: 'Customer opened a dispute against a vendor' },
                      { key: 'systemErrors', label: 'System Error Logs', desc: 'Critical integration or API failures' }
                    ].map(item => (
                      <div key={item.key} className="border border-[#E2E8F0] rounded-xl p-4 flex items-center justify-between bg-[#F8FAFC]/50 hover:bg-[#F8FAFC] transition-colors">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[14px] font-bold text-[#0F172A]">{item.label}</span>
                          <span className="text-[12px] text-slate-455 font-semibold leading-normal">{item.desc}</span>
                        </div>
                        <Toggle
                          value={adminTriggers[item.key]}
                          onToggle={() => {
                            setAdminTriggers(prev => ({
                              ...prev,
                              [item.key]: !prev[item.key]
                            }));
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  };

  // Render method for active Settings Tab
  const renderSettingsBody = () => {
    switch (activeTab) {
      case 'cms':
        return renderCMSContent();
      case 'product':
        return renderProductContent();
      case 'vendor':
        return renderVendorContent();
      case 'security':
        return renderSecurityContent();
      case 'staff':
        return renderStaffContent();
      case 'referral':
        return renderReferralContent();
      case 'audit':
        return renderAuditContent();
      case 'notification':
        return renderNotificationContent();
      default:
        // Render simple placeholder page matching mockup layout
        return (
          <div className="bg-white border border-[#E2E8F0] rounded-[16px] p-8 shadow-2xs flex flex-col items-center justify-center text-center min-h-[300px]">
            <div className="w-14 h-14 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center border border-slate-150 mb-4 shadow-3xs">
              <FiSettings size={22} />
            </div>
            <h3 className="text-[16px] font-bold text-[#0F172A] capitalize">
              {activeTab.replace(/([A-Z])/g, ' $1').trim()} Settings
            </h3>
            <p className="text-[13px] text-slate-455 font-semibold mt-2 max-w-[320px]">
              This settings view is currently under development. Additional configurations will be available shortly.
            </p>
          </div>
        );
    }
  };

  // Header Title & Subtitle helper
  const getHeaderInfo = () => {
    switch (activeTab) {
      case 'cms':
        return {
          title: 'CMS Settings',
          desc: 'Manage all frontend website content, layouts, and static pages.'
        };
      case 'product':
        return {
          title: 'Product Settings',
          desc: 'Manage categories, subcategories, attributes and operational settings.'
        };
      case 'vendor':
        return {
          title: 'Vendor Settings',
          desc: 'Configure complete vendor onboarding and operational workflow.'
        };
      case 'staff':
        return {
          title: 'Staff Settings',
          desc: 'Manage all staff roles, permissions, and security policies.'
        };
      case 'security':
        return {
          title: 'Security Settings',
          desc: 'Manage platform-wide security protocols and authentication requirements.'
        };
      case 'referral':
        return {
          title: 'Referral Management',
          desc: 'Configure the customer referral program, discounts, and tracking.'
        };
      case 'audit':
        return {
          title: 'Audit Logs',
          desc: 'Track every system activity, configuration change, and user action.'
        };
      case 'notification':
        return {
          title: 'Notification Settings',
          desc: 'Manage email alerts, push templates, and customer messaging triggers.'
        };
      default:
        return {
          title: 'System Settings',
          desc: 'Configure core aggregator properties and storefront logic.'
        };
    }
  };

  const headerInfo = getHeaderInfo();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="w-full flex flex-col gap-6"
    >
      {/* Title Header Block */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col">
          <h1 className="text-[26px] font-bold text-[#0F172A] tracking-[-0.02em] leading-tight flex items-center gap-3">
            {headerInfo.title}
            {activeTab === 'audit' && (
              <span className="text-[12px] font-semibold text-[#475569] bg-[#F1F5F9] border border-[#E2E8F0] px-2.5 py-1 rounded-md tracking-normal">
                Last 7 days
              </span>
            )}
          </h1>
          <p className="text-[13px] text-slate-455 font-semibold mt-1 leading-normal">
            {headerInfo.desc}
          </p>
        </div>
        {(activeTab === 'cms' || activeTab === 'product' || activeTab === 'vendor' || activeTab === 'security' || activeTab === 'staff' || activeTab === 'referral' || activeTab === 'audit' || activeTab === 'notification') && (
          <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
            <button
              onClick={handleRefresh}
              className="h-10 px-4 rounded-[10px] border border-[#E2E8F0] bg-white text-[13px] font-semibold text-[#0F172A] hover:bg-slate-50 transition-colors cursor-pointer flex items-center gap-2"
            >
              <FiRefreshCw size={14} className="text-slate-500" />
              Refresh
            </button>
            {activeTab === 'audit' ? (
              <button
                onClick={() => showToast('Exporting audit logs...', 'info')}
                className="h-10 px-4 rounded-[10px] border border-black bg-black text-white text-[13px] font-semibold hover:bg-slate-800 transition-colors cursor-pointer flex items-center gap-2"
              >
                <FiUpload size={14} className="text-white" />
                Export
              </button>
            ) : (
              <button
                onClick={handlePublish}
                className="h-10 px-4 rounded-[10px] border border-black bg-black text-white text-[13px] font-semibold hover:bg-slate-800 transition-colors cursor-pointer flex items-center gap-2"
              >
                <FiUpload size={14} className="text-white" />
                Publish
              </button>
            )}
          </div>
        )}
      </div>

      {/* Main content split */}
      <div className="w-full flex flex-col lg:flex-row gap-8">
        {/* Right side settings page content */}
        <div className="flex-1">
          {renderSettingsBody()}
        </div>
      </div>

      {/* TOAST SYSTEM */}
      <ToastContainer toasts={toasts} />

      {/* MODAL: HERO BANNER EDIT */}
      {isBannerModalOpen && editingBanner && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white border border-[#E2E8F0] rounded-2xl w-full max-w-md p-6 flex flex-col gap-4 shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-[15px] font-bold text-[#0F172A]">
                {editingBanner.id ? 'Edit Banner' : 'Add Banner'}
              </h3>
              <button onClick={() => setIsBannerModalOpen(false)} className="text-slate-400 hover:text-black">
                <FiX size={18} />
              </button>
            </div>
            <div className="flex flex-col gap-4 py-2">
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-semibold text-[#0F172A]">Banner Name</label>
                <input
                  type="text"
                  value={editingBanner.name}
                  onChange={e => setEditingBanner({ ...editingBanner, name: e.target.value })}
                  placeholder="e.g., Summer Sale Banner"
                  className="h-10 px-3.5 rounded-lg border border-[#E2E8F0] text-[13px] focus:outline-none focus:ring-1 focus:ring-black font-semibold text-[#0F172A]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-semibold text-[#0F172A]">Dimensions / Resolution</label>
                <input
                  type="text"
                  value={editingBanner.size}
                  onChange={e => setEditingBanner({ ...editingBanner, size: e.target.value })}
                  placeholder="e.g., 1920×1080px"
                  className="h-10 px-3.5 rounded-lg border border-[#E2E8F0] text-[13px] focus:outline-none focus:ring-1 focus:ring-black font-semibold text-[#0F172A]"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
              <button
                onClick={() => setIsBannerModalOpen(false)}
                className="h-9 px-4 rounded-lg border border-[#E2E8F0] text-[13px] font-bold hover:bg-slate-50 transition-colors text-[#0F172A]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!editingBanner.name.trim()) return;
                  if (editingBanner.id) {
                    setBanners(prev => prev.map(item => item.id === editingBanner.id ? editingBanner : item));
                    showToast('Banner details updated successfully!', 'success');
                  } else {
                    const newBanner = { ...editingBanner, id: Date.now() };
                    setBanners(prev => [...prev, newBanner]);
                    showToast('New banner added successfully!', 'success');
                  }
                  setIsBannerModalOpen(false);
                }}
                className="h-9 px-4 rounded-lg bg-black text-white text-[13px] font-bold hover:bg-slate-800 transition-colors"
              >
                Save
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* MODAL: STATIC PAGE EDIT */}
      {isPageModalOpen && editingPage && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white border border-[#E2E8F0] rounded-2xl w-full max-w-2xl p-6 flex flex-col gap-4 shadow-xl h-[85vh]"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex flex-col">
                <h3 className="text-[15px] font-bold text-[#0F172A]">Edit Page: {editingPage.title}</h3>
                <span className="text-[11px] text-slate-455 font-semibold mt-0.5">Last updated: {editingPage.lastUpdated}</span>
              </div>
              <button onClick={() => setIsPageModalOpen(false)} className="text-slate-400 hover:text-black">
                <FiX size={18} />
              </button>
            </div>
            <div className="flex-1 flex flex-col gap-4 py-2 overflow-y-auto min-h-0">
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-semibold text-[#0F172A]">Page Title</label>
                <input
                  type="text"
                  value={editingPage.title}
                  onChange={e => setEditingPage({ ...editingPage, title: e.target.value })}
                  className="h-10 px-3.5 rounded-lg border border-[#E2E8F0] text-[13px] focus:outline-none focus:ring-1 focus:ring-black font-semibold text-[#0F172A]"
                />
              </div>
              <div className="flex-1 flex flex-col gap-2 min-h-[200px]">
                <label className="text-[13px] font-semibold text-[#0F172A]">Page Content (HTML/Markdown)</label>
                <textarea
                  value={editingPage.content}
                  onChange={e => setEditingPage({ ...editingPage, content: e.target.value })}
                  className="flex-1 w-full p-4 rounded-lg border border-[#E2E8F0] text-[13px] focus:outline-none focus:ring-1 focus:ring-black font-semibold text-[#0F172A] resize-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
              <button
                onClick={() => setIsPageModalOpen(false)}
                className="h-9 px-4 rounded-lg border border-[#E2E8F0] text-[13px] font-bold hover:bg-slate-50 transition-colors text-[#0F172A]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setStaticPages(prev => prev.map(p => p.id === editingPage.id ? { ...editingPage, lastUpdated: 'Just now' } : p));
                  showToast('Page content saved successfully!', 'success');
                  setIsPageModalOpen(false);
                }}
                className="h-9 px-4 rounded-lg bg-black text-white text-[13px] font-bold hover:bg-slate-800 transition-colors"
              >
                Save Content
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* MODAL: ADD CATEGORY */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white border border-[#E2E8F0] rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Modal Header */}
            <div className="px-6 pt-6 pb-5 border-b border-[#E2E8F0] relative">
              <h3 className="text-[18px] font-bold text-[#0F172A] font-sans">
                {editingCategory ? `Manage: ${editingCategory.name}` : 'Add Category'}
              </h3>
              <p className="text-[13px] text-slate-500 font-semibold mt-1">
                {editingCategory ? 'View and edit the details of this product category.' : "Create a new product grouping for your store's inventory."}
              </p>
              <button
                onClick={() => { setIsCategoryModalOpen(false); setEditingCategory(null); setNewCategory({ name: '', parent: 'None', desc: '', thumbnail: null }); }}
                className="absolute top-5 right-5 text-slate-400 hover:text-black cursor-pointer p-1"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleAddCategorySubmit} className="flex flex-col">
              <div className="flex flex-col gap-4 px-6 py-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Category Name */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-semibold text-[#0F172A]">Category Name</label>
                    <input
                      type="text"
                      value={newCategory.name}
                      onChange={e => !editingCategory && setNewCategory({ ...newCategory, name: e.target.value })}
                      placeholder="e.g. Smartphones"
                      required
                      readOnly={!!editingCategory}
                      className={`h-10 px-3.5 rounded-lg border border-[#E2E8F0] text-[13px] focus:outline-none focus:ring-1 focus:ring-black font-semibold text-[#0F172A] ${editingCategory ? 'bg-slate-50 cursor-default' : ''}`}
                    />
                  </div>
                  {/* Parent Category */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-semibold text-[#0F172A]">Parent Category</label>
                    <div className="relative">
                      <select
                        value={newCategory.parent}
                        onChange={e => !editingCategory && setNewCategory({ ...newCategory, parent: e.target.value })}
                        disabled={!!editingCategory}
                        className={`w-full h-10 pl-3.5 pr-8 rounded-lg border border-[#E2E8F0] text-[13px] focus:outline-none focus:ring-1 focus:ring-black font-semibold text-[#0F172A] bg-white appearance-none ${editingCategory ? 'cursor-default bg-slate-50' : 'cursor-pointer'}`}
                      >
                        <option value="None">None</option>
                        <option value="Printing">Printing</option>
                        <option value="Gifting">Gifting</option>
                        <option value="Shopping">Shopping</option>
                      </select>
                      <FiChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-455 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-semibold text-[#0F172A]">Description</label>
                  <textarea
                    value={newCategory.desc}
                    onChange={e => !editingCategory && setNewCategory({ ...newCategory, desc: e.target.value })}
                    placeholder="Briefly describe the contents of this category..."
                    rows={3}
                    readOnly={!!editingCategory}
                    className={`p-3.5 rounded-lg border border-[#E2E8F0] text-[13px] focus:outline-none focus:ring-1 focus:ring-black font-semibold text-[#0F172A] resize-none w-full ${editingCategory ? 'bg-slate-50 cursor-default' : ''}`}
                  />
                </div>

                {/* Category Thumbnail Upload Area */}
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-semibold text-[#0F172A]">Category Thumbnail</label>
                  <div className="border border-dashed border-[#C7D2FE] bg-[#F8FAFC] rounded-xl py-8 px-4 flex flex-col items-center justify-center text-center gap-3 cursor-pointer hover:bg-[#EEF2FF] transition-colors">
                    <div className="w-11 h-11 rounded-full bg-[#E0E7FF] text-[#6366F1] flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10 9 9 9 8 9" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-[#0f172a]">Click to upload or drag and drop</p>
                      <p className="text-[12px] text-slate-500 font-semibold mt-1">PNG, JPG or SVG (max. 800×400px)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer — gray bar matching design */}
              <div className="flex items-center justify-end gap-3 px-6 py-4 bg-[#F8FAFC] border-t border-[#E2E8F0]">
                <button
                  type="button"
                  onClick={() => { setIsCategoryModalOpen(false); setEditingCategory(null); setNewCategory({ name: '', parent: 'None', desc: '', thumbnail: null }); }}
                  className="px-5 py-2.5 rounded-xl text-[13px] font-semibold text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-10 px-6 rounded-xl bg-black text-white text-[13px] font-bold hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  {editingCategory ? 'Save Changes' : 'Add Category'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* MODAL: ADD ROLE */}
      {isAddRoleModalOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white border border-[#E2E8F0] rounded-3xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Modal Header */}
            <div className="px-6 pt-6 pb-5 border-b border-[#E2E8F0] relative">
              <h3 className="text-[18px] font-bold text-[#0F172A] font-sans">Add Staff Role</h3>
              <p className="text-[13px] text-slate-500 font-semibold mt-1">Define a new staff level and customize access permissions.</p>
              <button
                onClick={() => setIsAddRoleModalOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-black cursor-pointer p-1"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newRoleName.trim()) return;
                const newId = newRoleName.trim().toLowerCase().replace(/\s+/g, '_');
                setStaffRoles(prev => [
                  ...prev,
                  {
                    id: newId,
                    name: newRoleName.trim(),
                    permissions: {
                      dashboard: false,
                      products: false,
                      customers: false,
                      vendors: false,
                      reports: false,
                      settings: false
                    }
                  }
                ]);
                showToast(`Role "${newRoleName.trim()}" created successfully!`, 'success');
                setIsAddRoleModalOpen(false);
                setNewRoleName('');
              }}
              className="flex flex-col"
            >
              <div className="flex flex-col gap-4 px-6 py-5">
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-semibold text-[#0F172A]">Role Name</label>
                  <input
                    type="text"
                    value={newRoleName}
                    onChange={e => setNewRoleName(e.target.value)}
                    placeholder="e.g. Content Moderator"
                    required
                    className="h-10 px-3.5 rounded-lg border border-[#E2E8F0] text-[13px] focus:outline-none focus:ring-1 focus:ring-black font-semibold text-[#0F172A]"
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 px-6 py-4 bg-[#F8FAFC] border-t border-[#E2E8F0]">
                <button
                  type="button"
                  onClick={() => setIsAddRoleModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-[13px] font-semibold text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-10 px-6 rounded-xl bg-black text-white text-[13px] font-bold hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Add Role
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* ── MODAL: CANVAS PREVIEW ── */}
      {/* ── MODAL: CANVAS PREVIEW ── */}
      {selectedCanvasName && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-3xl w-full max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-[800px] shadow-2xl overflow-hidden flex flex-col my-4 md:my-8 max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 md:px-8 py-4 border-b border-[#E2E8F0] bg-slate-50/50">
              <div>
                <h3 className="text-[18px] md:text-[20px] font-bold text-[#0F172A]">{selectedCanvasName} Settings</h3>
                <p className="text-[12px] md:text-[13px] text-slate-500 font-semibold mt-0.5">Customize properties and see live canvas previews.</p>
              </div>
              <button
                onClick={() => setSelectedCanvasName(null)}
                className="text-slate-400 hover:text-black cursor-pointer p-1.5 hover:bg-slate-100 rounded-full transition-colors"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              {/* Left Column: Canvas Preview (dashed border) */}
              <div className="md:col-span-6 flex flex-col justify-center items-center border-3 border-dashed border-[#CBD5E1] rounded-3xl p-4 bg-white relative min-h-[260px] md:min-h-[320px]">
                <CanvasPreviewRender
                  canvasName={selectedCanvasName}
                  shape={modalShape}
                  dialType={modalClockDialType}
                  handMovement={modalClockHandMovement}
                  design={modalShape} // reuse modalShape as design or grid
                  grid={modalShape === 'circle' ? 'single' : modalShape === 'square' ? '2x2' : '3x2'} // for Frame grid selection
                  text={selectedCanvasName === 'Pen' ? 'Premium Pen' : 'Acme Corporation'}
                  title="Olivia Bennett"
                  subtitle="123 Business St, Innovation Center"
                />
              </div>

              {/* Right Column: Settings Panel */}
              <div className="md:col-span-6 flex flex-col gap-4">
                {/* Sub Category */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-[12px] font-bold text-[#0F172A] uppercase tracking-wide">Sub Category *</label>
                    <button className="text-[10px] font-bold text-[#2563EB] hover:underline cursor-pointer">+Add input</button>
                  </div>
                  <input
                    type="text"
                    value={selectedCanvasName}
                    readOnly
                    className="h-10 px-3.5 rounded-xl border border-[#E2E8F0] bg-slate-50 text-[13px] font-semibold text-slate-500 focus:outline-none cursor-not-allowed"
                  />
                </div>

                {/* Product Name */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-[12px] font-bold text-[#0F172A] uppercase tracking-wide">Product Name</label>
                    <button className="text-[10px] font-bold text-[#2563EB] hover:underline cursor-pointer">+Add Attributes</button>
                  </div>
                  <input
                    type="text"
                    value={modalProductName}
                    onChange={(e) => setModalProductName(e.target.value)}
                    className="h-10 px-3.5 rounded-xl border border-[#E2E8F0] bg-white text-[13px] font-semibold text-[#0F172A] focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                {/* Shapes */}
                <div className="flex flex-col gap-2.5 p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl">
                  <label className="text-[12px] font-bold text-[#0F172A] uppercase tracking-wide">Shapes</label>
                  
                  <div className="flex flex-wrap gap-3 items-center">
                    {/* Render dynamically depending on selected canvas */}
                    {selectedCanvasName === 'Clock' && [
                      { id: 'square', label: 'Square', shapeClass: 'rounded-md w-11 h-11' },
                      { id: 'curved-edges', label: 'Curved edges', shapeClass: 'rounded-xl w-11 h-11' },
                      { id: 'circle', label: 'Circle', shapeClass: 'rounded-full w-11 h-11' }
                    ].map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => {
                          setModalShape(opt.id);
                          setModalProductName(`Clock - ${opt.label}`);
                        }}
                        className={`flex flex-col items-center gap-1 p-2 rounded-xl border transition-all cursor-pointer ${
                          modalShape === opt.id
                            ? 'border-black bg-white shadow-xs scale-102 font-bold'
                            : 'border-transparent hover:border-slate-300'
                        }`}
                      >
                        <div className={`bg-slate-200 border border-slate-300 ${opt.shapeClass}`} />
                        <span className="text-[10px] text-[#0F172A] font-semibold mt-1">{opt.label}</span>
                      </button>
                    ))}

                    {selectedCanvasName === 'Frame' && [
                      { id: 'oak', label: 'Oak Wood', color: '#854D0E' },
                      { id: 'ebony', label: 'Ebony Wood', color: '#1E293B' },
                      { id: 'mahogany', label: 'Mahogany', color: '#7C2D12' }
                    ].map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => {
                          setModalShape(opt.id);
                          setModalProductName(`Frame - ${opt.label}`);
                        }}
                        className={`flex flex-col items-center gap-1 p-2 rounded-xl border transition-all cursor-pointer ${
                          modalShape === opt.id
                            ? 'border-black bg-white shadow-xs scale-102 font-bold'
                            : 'border-transparent hover:border-slate-300'
                        }`}
                      >
                        <div className="w-11 h-11 rounded-lg border border-slate-300 shadow-inner" style={{ backgroundColor: opt.color }} />
                        <span className="text-[10px] text-[#0F172A] font-semibold mt-1">{opt.label}</span>
                      </button>
                    ))}

                    {selectedCanvasName === 'Letterhead' && [
                      { id: 'modern', label: 'Modern', styleClass: 'border-t-3 border-[#0F172A]' },
                      { id: 'corporate', label: 'Corporate', styleClass: 'border-t-3 border-[#B45309]' },
                      { id: 'sidebar', label: 'Sidebar', styleClass: 'border-l-3 border-[#2563EB]' }
                    ].map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => {
                          setModalShape(opt.id);
                          setModalProductName(`Letterhead - ${opt.label}`);
                        }}
                        className={`flex flex-col items-center gap-1 p-2 rounded-xl border transition-all cursor-pointer ${
                          modalShape === opt.id
                            ? 'border-black bg-white shadow-xs scale-102 font-bold'
                            : 'border-transparent hover:border-slate-300'
                        }`}
                      >
                        <div className={`w-11 h-11 bg-slate-100 border border-slate-300 shadow-inner rounded-sm ${opt.styleClass}`} />
                        <span className="text-[10px] text-[#0F172A] font-semibold mt-1">{opt.label}</span>
                      </button>
                    ))}

                    {selectedCanvasName === 'Mug' && [
                      { id: 'standard', label: 'Standard', color: '#F1F5F9' },
                      { id: 'inner-pink', label: 'Pink Inner', color: '#F472B6' },
                      { id: 'black-mug', label: 'Black Gold', color: '#1E293B' },
                      { id: 'valentine', label: 'Valentine', color: '#F43F5E' }
                    ].map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => {
                          setModalShape(opt.id);
                          setModalProductName(`Mug - ${opt.label}`);
                        }}
                        className={`flex flex-col items-center gap-1 p-2 rounded-xl border transition-all cursor-pointer ${
                          modalShape === opt.id
                            ? 'border-black bg-white shadow-xs scale-102 font-bold'
                            : 'border-transparent hover:border-slate-300'
                        }`}
                      >
                        <div className="w-11 h-11 rounded-full border border-slate-300 shadow-inner" style={{ backgroundColor: opt.color }} />
                        <span className="text-[10px] text-[#0F172A] font-semibold mt-1">{opt.label}</span>
                      </button>
                    ))}

                    {selectedCanvasName === 'Pen' && [
                      { id: 'classic', label: 'Classic', color: '#0F172A' },
                      { id: 'executive', label: 'Executive', color: '#94A3B8' },
                      { id: 'fountain', label: 'Fountain', color: '#D4AF37' }
                    ].map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => {
                          setModalShape(opt.id);
                          setModalProductName(`Pen - ${opt.label}`);
                        }}
                        className={`flex flex-col items-center gap-1 p-2 rounded-xl border transition-all cursor-pointer ${
                          modalShape === opt.id
                            ? 'border-black bg-white shadow-xs scale-102 font-bold'
                            : 'border-transparent hover:border-slate-300'
                        }`}
                      >
                        <div className="w-11 h-5 rounded-full border border-slate-300 shadow-inner mt-3" style={{ backgroundColor: opt.color }} />
                        <span className="text-[10px] text-[#0F172A] font-semibold mt-1">{opt.label}</span>
                      </button>
                    ))}

                    {selectedCanvasName === 'Plate' && [
                      { id: 'rectangle', label: 'Rectangle', rx: 'rounded-sm' },
                      { id: 'oval', label: 'Oval', rx: 'rounded-full h-7 w-11 my-2.5' },
                      { id: 'bevel', label: 'Beveled', rx: 'rounded-md' }
                    ].map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => {
                          setModalShape(opt.id);
                          setModalProductName(`Plate - ${opt.label}`);
                        }}
                        className={`flex flex-col items-center gap-1 p-2 rounded-xl border transition-all cursor-pointer ${
                          modalShape === opt.id
                            ? 'border-black bg-white shadow-xs scale-102 font-bold'
                            : 'border-transparent hover:border-slate-300'
                        }`}
                      >
                        <div className={`bg-slate-100 border border-slate-300 shadow-inner w-11 h-11 ${opt.rx}`} />
                        <span className="text-[10px] text-[#0F172A] font-semibold mt-1">{opt.label}</span>
                      </button>
                    ))}

                    {/* Add Shape Button */}
                    <button className="flex flex-col items-center justify-center p-2 rounded-xl border border-dashed border-slate-300 w-20 h-20 hover:border-black transition-colors cursor-pointer group">
                      <span className="text-md text-slate-400 group-hover:text-black transition-colors font-bold">+</span>
                      <span className="text-[9px] text-slate-400 font-extrabold group-hover:text-black transition-colors mt-0.5">Add Shape</span>
                    </button>
                  </div>
                </div>

                {/* Extra Options for Clock if Clock selected */}
                {selectedCanvasName === 'Clock' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Dial Style</label>
                      <select
                        value={modalClockDialType}
                        onChange={(e) => setModalClockDialType(e.target.value)}
                        className="h-9 px-2 rounded-lg border border-[#E2E8F0] bg-white text-[12px] font-semibold text-[#0F172A] focus:outline-none"
                      >
                        <option value="numbers">Numbers</option>
                        <option value="roman">Roman Numerals</option>
                        <option value="ticks">Tick Marks</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hands Movement</label>
                      <select
                        value={modalClockHandMovement}
                        onChange={(e) => setModalClockHandMovement(e.target.value)}
                        className="h-9 px-2 rounded-lg border border-[#E2E8F0] bg-white text-[12px] font-semibold text-[#0F172A] focus:outline-none"
                      >
                        <option value="sweep">Sweep (Smooth)</option>
                        <option value="tick">Tick (1s step)</option>
                        <option value="static">Static</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Toggles */}
                <div className="flex flex-col sm:flex-row gap-5 mt-1">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[12px] font-bold text-[#0F172A]">Upload image</span>
                    <button
                      type="button"
                      onClick={() => setModalUploadImage(!modalUploadImage)}
                      className={`w-9 h-5.5 rounded-full p-0.5 transition-colors duration-200 focus:outline-none cursor-pointer ${
                        modalUploadImage ? 'bg-[#3b82f6]' : 'bg-slate-200'
                      }`}
                    >
                      <div
                        className={`w-4.5 h-4.5 rounded-full bg-white shadow-md transform transition-transform duration-200 ${
                          modalUploadImage ? 'translate-x-3.5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <span className="text-[12px] font-bold text-[#0F172A]">Upload Canvas</span>
                    <button
                      type="button"
                      onClick={() => setModalUploadCanvas(!modalUploadCanvas)}
                      className={`w-9 h-5.5 rounded-full p-0.5 transition-colors duration-200 focus:outline-none cursor-pointer ${
                        modalUploadCanvas ? 'bg-[#3b82f6]' : 'bg-slate-200'
                      }`}
                    >
                      <div
                        className={`w-4.5 h-4.5 rounded-full bg-white shadow-md transform transition-transform duration-200 ${
                          modalUploadCanvas ? 'translate-x-3.5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 md:px-8 py-4 bg-slate-50 border-t border-[#E2E8F0]">
              <div className="text-[11px] text-slate-400 font-semibold text-center sm:text-left">
                Canvas preview engine: <span className="font-mono">CanvasPreviewRender.jsx</span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => setSelectedCanvasName(null)}
                  className="px-4 py-2 rounded-xl text-[13px] font-semibold text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    showToast(`${selectedCanvasName} Attributes saved successfully!`, 'success');
                    setSelectedCanvasName(null);
                  }}
                  className="h-10 px-4 rounded-xl bg-white border border-[#E2E8F0] text-[#0F172A] text-[13px] font-bold hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Save Attributes
                </button>
                <button
                  onClick={() => {
                    showToast(`${selectedCanvasName} Canvas published successfully!`, 'success');
                    setSelectedCanvasName(null);
                  }}
                  className="h-10 px-5 rounded-xl bg-black text-white text-[13px] font-bold hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Publish
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}

// ToastContainer inner component
function ToastContainer({ toasts }) {
  return (
    <div className="fixed bottom-5 right-5 z-[999] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9, transition: { duration: 0.2 } }}
            className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg bg-white border border-[#E2E8F0] min-w-[280px]"
          >
            <span className="shrink-0">
              {toast.type === 'success' && <FiCheckCircle className="text-emerald-500 w-5 h-5" />}
              {toast.type === 'error' && <FiAlertTriangle className="text-red-500 w-5 h-5" />}
              {toast.type === 'info' && <FiClock className="text-blue-500 w-5 h-5" />}
            </span>
            <div className="flex flex-col">
              <p className="text-[12.5px] font-bold text-[#0F172A]">{toast.title}</p>
              <p className="text-[11px] text-slate-400 font-semibold">{toast.message}</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
