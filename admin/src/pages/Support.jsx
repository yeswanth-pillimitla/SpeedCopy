import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiDownload,
  FiRefreshCw,
  FiMail,
  FiClock,
  FiCheckCircle,
  FiAlertTriangle,
  FiSearch,
  FiPlus,
  FiEye,
  FiChevronDown,
  FiArrowLeft,
  FiPaperclip,
  FiLink,
  FiBold,
  FiItalic,
  FiUnderline,
  FiList,
  FiFile,
  FiStar,
  FiCheck,
  FiX
} from 'react-icons/fi';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const pageVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } }
};

const initialTickets = [
  {
    id: 'TKT-1041',
    desc: 'Order not delivered after 5 days',
    user: 'Riya Sharma',
    userType: 'Customer',
    category: 'Delivery',
    priority: 'High',
    status: 'Open',
    assignedTo: 'David C.',
    sla: '2h left',
    slaOverdue: false,
    messages: [
      {
        id: 'msg-1',
        sender: 'Riya Sharma',
        role: 'Customer',
        text: 'Hi Support,\n\nI placed my order 5 days ago and it still has not arrived. The tracking number shows "In Transit" but has not updated for 3 days. Please help, this was a birthday gift!',
        time: 'Today, 09:41 AM',
        isInternal: false,
        attachment: 'error_logs_20231024.txt'
      }
    ]
  },
  {
    id: 'TKT-1040',
    desc: 'Payment deducted but order not confirmed',
    user: 'Amit Patel',
    userType: 'Vendor',
    category: 'Payment',
    priority: 'Urgent',
    status: 'In Progress',
    assignedTo: 'Emily R.',
    sla: 'Overdue',
    slaOverdue: true,
    messages: [
      {
        id: 'msg-1',
        sender: 'Amit Patel',
        role: 'Vendor',
        text: 'Hi Support Team,\n\nMy client tried to check out and the amount of ₹4,500 was deducted from their bank account, but the app shows "Payment Failed". Please check the payment gateway status and confirm the order.',
        time: 'Today, 09:12 AM',
        isInternal: false,
        attachment: 'screenshot_failed_payment.png'
      }
    ]
  },
  {
    id: 'TKT-1039',
    desc: 'Wrong product received in gifting order',
    user: 'Priya Nair',
    userType: 'Customer',
    category: 'Product',
    priority: 'Medium',
    status: 'In Progress',
    assignedTo: 'Sarah J.',
    sla: '18h left',
    slaOverdue: false,
    messages: [
      {
        id: 'msg-1',
        sender: 'Priya Nair',
        role: 'Customer',
        text: 'Hello,\n\nI received a completely different coffee mug set than the one I ordered. I ordered the "Golden Edge Premium Mug Set" but received a standard white ceramic mug. Please replace it.',
        time: 'Yesterday, 04:30 PM',
        isInternal: false,
        attachment: 'unboxing_photo.jpg'
      }
    ]
  },
  {
    id: 'TKT-1038',
    desc: 'Refund not received after 10 days',
    user: 'Karan Mehta',
    userType: 'Customer',
    category: 'Refund',
    priority: 'High',
    status: 'Escalated',
    assignedTo: 'Emily R.',
    sla: 'Overdue',
    slaOverdue: true,
    messages: [
      {
        id: 'msg-1',
        sender: 'Karan Mehta',
        role: 'Customer',
        text: "I cancelled order #ORD-9842 on Oct 14th and was told the refund would be processed in 5-7 business days. It has been 10 days and I still haven't received the credit. Please initiate the transfer immediately.",
        time: 'Oct 23, 2023 • 11:20 AM',
        isInternal: false
      }
    ]
  },
  {
    id: 'TKT-1037',
    desc: 'Coupon code not applying at checkout',
    user: 'Sunita Rao',
    userType: 'Customer',
    category: 'Offers',
    priority: 'Low',
    status: 'Resolved',
    assignedTo: 'Marcus J.',
    sla: 'Done',
    slaOverdue: false,
    messages: [
      {
        id: 'msg-1',
        sender: 'Sunita Rao',
        role: 'Customer',
        text: 'The promo code "SPEEDWELCOME" is giving an error "Invalid Promo Code" even though the banner says it is active for new users. I am a new user and my cart value is above ₹500.',
        time: 'Oct 22, 2023 • 02:15 PM',
        isInternal: false
      },
      {
        id: 'msg-2',
        sender: 'Marcus J.',
        role: 'Support Agent',
        text: 'Hello Sunita,\n\nI checked the settings for SPEEDWELCOME. It was temporarily inactive due to a date config. I have enabled it now. Please try checking out again. Let us know if you face any issues!',
        time: 'Oct 22, 2023 • 03:00 PM',
        isInternal: false
      },
      {
        id: 'msg-3',
        sender: 'Sunita Rao',
        role: 'Customer',
        text: 'It worked! Thank you so much for the quick help.',
        time: 'Oct 22, 2023 • 03:10 PM',
        isInternal: false
      }
    ]
  }
];

const slaData = [
  { day: 'Mon', met: 42, breached: 3 },
  { day: 'Tue', met: 38, breached: 2 },
  { day: 'Wed', met: 50, breached: 8 },
  { day: 'Thu', met: 45, breached: 4 },
  { day: 'Fri', met: 58, breached: 5 },
  { day: 'Sat', met: 28, breached: 3 },
  { day: 'Sun', met: 18, breached: 2 }
];

const initialAgents = [
  { name: 'Sarah J.', initials: 'SJ', status: 'Online', chats: 2 },
  { name: 'David C.', initials: 'DC', status: 'Online', chats: 3 },
  { name: 'Emily R.', initials: 'ER', status: 'Busy', chats: 5 },
  { name: 'Marcus J.', initials: 'MJ', status: 'Offline', chats: 0 }
];

const dateRangeOptions = [
  { value: '7days', label: 'Last 7 days' },
  { value: '30days', label: 'Last 30 days' },
  { value: '90days', label: 'Last 90 days' },
  { value: '12months', label: 'Last 12 months' }
];

function getPriorityStyle(priority) {
  switch (priority) {
    case 'High': return { pill: 'bg-[#FFF7ED] text-[#C2410C] border border-[#FFEDD5]', dot: 'bg-[#F97316]' };
    case 'Urgent': return { pill: 'bg-[#FEF2F2] text-[#B91C1C] border border-[#FEE2E2]', dot: 'bg-[#EF4444]' };
    case 'Medium': return { pill: 'bg-[#EFF6FF] text-[#1D4ED8] border border-[#DBEAFE]', dot: 'bg-[#3B82F6]' };
    case 'Low': return { pill: 'bg-[#F8FAFC] text-[#475569] border border-[#E2E8F0]', dot: 'bg-[#64748B]' };
    default: return { pill: 'bg-[#F8FAFC] text-[#475569] border border-[#E2E8F0]', dot: 'bg-[#64748B]' };
  }
}

function getStatusStyle(status) {
  switch (status) {
    case 'Open': return 'bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]';
    case 'In Progress': return 'bg-[#E0E7FF] text-[#4F46E5] border border-[#C7D2FE]';
    case 'Escalated': return 'bg-[#FDE8E8] text-[#9B1C1C] border border-[#FBD5D5]';
    case 'Resolved': return 'bg-[#DEF7EC] text-[#03543F] border border-[#BCF0DA]';
    default: return 'bg-gray-100 text-gray-650 border border-gray-200';
  }
}

function getAgentStatusStyle(status) {
  switch (status) {
    case 'Online': return 'text-[11px] font-bold text-emerald-600';
    case 'Busy': return 'text-[11px] font-bold text-amber-600';
    case 'Offline': return 'text-[11px] font-bold text-slate-400';
    default: return 'text-[11px] font-bold text-slate-400';
  }
}

/* ─── Toggle Switch ─── */
function ToggleSwitch({ enabled, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`w-[44px] h-[24px] rounded-full p-[2px] transition-colors duration-305 cursor-pointer relative flex items-center ${enabled ? 'bg-black' : 'bg-slate-205'}`}
    >
      <span
        className={`bg-white w-[20px] h-[20px] rounded-full shadow-sm transform transition-transform duration-300 ${enabled ? 'translate-x-[20px]' : 'translate-x-0'}`}
      />
    </button>
  );
}

/* ─── TICKET DETAIL VIEW ─── */
function TicketDetailView({ ticket, onBack, onUpdateTicket, agents, showToast }) {
  const [replyText, setReplyText] = useState('');
  const [replyType, setReplyType] = useState('Public Reply'); // 'Public Reply' or 'Internal Note'
  const [isAssigneeDropdownOpen, setIsAssigneeDropdownOpen] = useState(false);
  const [isTemplatesDropdownOpen, setIsTemplatesDropdownOpen] = useState(false);

  const canvaTemplates = [
    {
      name: "🕐 Clock Customizer Guide",
      text: "Hi! Regarding the Clock Canvas customizer: it supports shape settings (Circle, Square, Curved Edges), dial layouts (numbers, roman numerals, ticks), and hands movement (sweep, tick, or static). Let us know if you need assistance!"
    },
    {
      name: "🖼️ Photo Frame Layouts",
      text: "Hi! Regarding the Photo Frame Canvas customizer: you can select from Oak Wood, Ebony Wood, or Mahogany wood finishes, and customize the grids to Single, 2x2, or 3x2 layouts. Let us know if you need assistance!"
    },
    {
      name: "📄 Letterhead Layouts",
      text: "Hi! Regarding the Letterhead Canvas: you can choose Modern, Corporate, or Sidebar layouts, insert your company name/address, and upload your custom logo. Let us know if you need assistance!"
    },
    {
      name: "☕ Custom Mug Presets",
      text: "Hi! Regarding the Custom Mug Canvas: we support Standard White, Pink Inner, Black Gold, Valentine, and Birthday presets with high-resolution photo slots. Let us know if you need assistance!"
    },
    {
      name: "✒️ Premium Pen Engraving",
      text: "Hi! Regarding the Premium Pen Canvas: we offer Classic, Executive, and Fountain designs with golden/chrome trims and customizable text engraving. Let us know if you need assistance!"
    },
    {
      name: "🪪 Name Plate Options",
      text: "Hi! Regarding the Name Plate Canvas: you can select Rectangle, Oval, or Bevel designs with solid brass mountings and custom titles. Let us know if you need assistance!"
    }
  ];

  const handleSendReply = () => {
    if (!replyText.trim()) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: replyType === 'Internal Note' ? 'Support Admin' : 'Sarah J.',
      role: replyType === 'Internal Note' ? 'Support Admin' : 'Agent',
      text: replyText,
      time: 'Just now',
      isInternal: replyType === 'Internal Note'
    };

    const updatedMessages = [...(ticket.messages || []), newMsg];
    const updatedTicket = {
      ...ticket,
      messages: updatedMessages,
      // Mark as In Progress automatically if it was Open
      status: ticket.status === 'Open' ? 'In Progress' : ticket.status
    };

    onUpdateTicket(updatedTicket);
    setReplyText('');
    showToast(
      replyType === 'Internal Note' ? 'Internal note added' : 'Reply sent to customer',
      'success'
    );
  };

  const handleToolbarAction = (action) => {
    if (action === 'bold') setReplyText(prev => prev + '**bold text**');
    if (action === 'italic') setReplyText(prev => prev + '*italic text*');
    if (action === 'underline') setReplyText(prev => prev + '<u>underlined text</u>');
    if (action === 'list') setReplyText(prev => prev + '\n- Item ');
    if (action === 'link') setReplyText(prev => prev + '[Link text](https://)');
    if (action === 'attachment') {
      showToast('Attachment uploaded: error_screenshot.png', 'info');
    }
  };

  const customerInitials = ticket.user.split(' ').map(n => n[0]).join('');
  const customerEmail = `${ticket.user.toLowerCase().replace(/\s+/g, '')}@techcorp.com`;

  return (
    <motion.div initial="hidden" animate="visible" variants={pageVariants} className="w-full">
      {/* Two-column layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column – Header, Title, and Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div className="flex items-center gap-2 flex-wrap">
              <button onClick={onBack} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-500 hover:text-[#0F172A] cursor-pointer shrink-0">
                <FiArrowLeft size={20} />
              </button>
              <h1 className="text-[20px] font-bold text-[#475569]">{ticket.id}</h1>
              <span className="bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE] text-[12px] font-medium px-3 py-0.5 rounded-full inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5]" />
                {ticket.status}
              </span>
              <span className="bg-[#FEF2F2] text-[#EF4444] border border-[#FEE2E2] text-[12px] font-medium px-3 py-0.5 rounded-full inline-flex items-center gap-1.5">
                <FiAlertTriangle size={12} className="text-[#EF4444]" />
                {ticket.priority}
              </span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {ticket.status !== 'Escalated' && (
                <button
                  onClick={() => {
                    onUpdateTicket({ ...ticket, status: 'Escalated', priority: 'Urgent' });
                    showToast(`Ticket ${ticket.id} escalated to Urgent!`, 'error');
                  }}
                  className="h-10 px-5 rounded-[10px] border border-[#0F172A] bg-white text-[13px] font-semibold text-[#0F172A] hover:bg-slate-50 transition-colors cursor-pointer flex items-center justify-center shrink-0"
                >
                  Escalate
                </button>
              )}
              <button
                onClick={() => {
                  const targetStatus = ticket.status === 'Resolved' ? 'Open' : 'Resolved';
                  onUpdateTicket({ ...ticket, status: targetStatus });
                  showToast(`Ticket ${ticket.id} marked as ${targetStatus}!`, 'success');
                }}
                className={`h-10 px-5 rounded-[10px] text-[13px] font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shrink-0 ${
                  ticket.status === 'Resolved'
                    ? 'border border-[#E2E8F0] bg-white text-[#0F172A] hover:bg-slate-50'
                    : 'border border-[#0F172A] bg-black text-white hover:bg-slate-800'
                }`}
              >
                {ticket.status === 'Resolved' ? (
                  <>
                    <FiRefreshCw size={14} />
                    Reopen Ticket
                  </>
                ) : (
                  <>
                    <FiCheckCircle size={14} className="text-white" />
                    Close Ticket
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-[24px] font-bold text-[#0F172A] mt-2 mb-4">{ticket.desc}</h2>
          
          {/* Divider */}
          <div className="border-b border-[#E2E8F0] mb-6" />

          {/* Conversation Thread & Editor Container */}
          <div className="flex flex-col gap-6">
            {/* Conversation Thread */}
            <div className="flex flex-col gap-6 max-h-[450px] overflow-y-auto pr-2">
              {ticket.messages && ticket.messages.map((msg, index) => {
                const isAgent = msg.role === 'Agent' || msg.role === 'Support Agent' || msg.role === 'Support Admin';
                const initials = msg.sender.split(' ').map(n => n[0]).join('');
                return (
                  <div key={index} className="flex gap-4 items-start">
                    {/* Avatar on the far left */}
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-[14px] font-bold shrink-0 ${
                      isAgent 
                        ? 'bg-[#4F46E5] text-white' 
                        : 'bg-[#EFF6FF] text-[#2563EB]'
                    }`}>
                      {initials}
                    </div>

                    {/* Message Bubble on the right */}
                    <div className={`flex-1 border rounded-xl p-5 bg-white border-[#E2E8F0] ${msg.isInternal ? 'bg-amber-50/50 border-amber-200' : ''}`}>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[14px] font-bold text-[#0F172A]">{msg.sender}</span>
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                          msg.isInternal 
                            ? 'bg-amber-100 text-amber-800' 
                            : 'bg-slate-100 text-slate-500'
                        }`}>
                          {msg.isInternal ? 'Internal Note' : msg.role}
                        </span>
                        <span className="ml-auto text-[12px] text-slate-400">{msg.time}</span>
                      </div>

                      <p className="text-[13px] text-[#0F172A] leading-relaxed whitespace-pre-line">
                        {msg.text}
                      </p>

                      {msg.attachment && (
                        <>
                          <div className="border-t border-[#E2E8F0] my-4" />
                          <div className="border border-[#E2E8F0] rounded-lg px-3 py-2 inline-flex items-center gap-2 text-[12px] font-semibold text-[#0F172A] bg-[#F8FAFC] w-fit shadow-2xs">
                            <FiFile size={14} className="text-slate-400" />
                            {msg.attachment}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Reply Tabs */}
            <div className="flex gap-4 items-center">
              {/* Agent Avatar */}
              <div className="w-10 h-10 bg-[#4F46E5] rounded-lg flex items-center justify-center text-white text-[14px] font-bold shrink-0">
                A
              </div>
              {/* Active Editor Banner */}
              <div className="flex-1 bg-[#EEF2FF] border border-[#E0E7FF] rounded-lg flex items-center justify-end px-3 h-10">
                <span className="bg-[#4F46E5] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-2xs">
                  {replyType}
                </span>
              </div>
            </div>

            {/* Reply Editor */}
            <div className="border border-[#E2E8F0] rounded-xl bg-white shadow-2xs flex flex-col relative">
              {/* Toolbar */}
              <div className="flex items-center gap-3 bg-[#F8FAFC] px-4 py-3 border-b border-[#E2E8F0] rounded-t-xl">
                <button onClick={() => handleToolbarAction('bold')} className="p-1 text-slate-500 hover:text-[#0F172A] transition-colors cursor-pointer"><FiBold size={14} /></button>
                <button onClick={() => handleToolbarAction('italic')} className="p-1 text-slate-500 hover:text-[#0F172A] transition-colors cursor-pointer"><FiItalic size={14} /></button>
                <button onClick={() => handleToolbarAction('underline')} className="p-1 text-slate-500 hover:text-[#0F172A] transition-colors cursor-pointer"><FiUnderline size={14} /></button>
                <div className="w-px h-4 bg-[#E2E8F0]" />
                <button onClick={() => handleToolbarAction('list')} className="p-1 text-slate-500 hover:text-[#0F172A] transition-colors cursor-pointer"><FiList size={14} /></button>
                <div className="w-px h-4 bg-[#E2E8F0]" />
                <button onClick={() => handleToolbarAction('link')} className="p-1 text-slate-500 hover:text-[#0F172A] transition-colors cursor-pointer"><FiLink size={14} /></button>
                <button onClick={() => handleToolbarAction('attachment')} className="p-1 text-slate-500 hover:text-[#0F172A] transition-colors cursor-pointer"><FiPaperclip size={14} /></button>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsTemplatesDropdownOpen(!isTemplatesDropdownOpen)}
                    className="text-[12px] font-semibold text-slate-500 hover:text-[#0F172A] flex items-center gap-1 transition-colors cursor-pointer p-1"
                  >
                    Templates <FiChevronDown size={12} className={`transform transition-transform ${isTemplatesDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isTemplatesDropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setIsTemplatesDropdownOpen(false)} />
                      <div className="absolute right-0 mt-1.5 w-64 bg-white border border-[#E2E8F0] shadow-lg rounded-xl py-2 z-20 text-[13px] font-medium animate-in fade-in slide-in-from-top-1 duration-150">
                        <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1.5">
                          Canva Templates
                        </div>
                        <div className="max-h-48 overflow-y-auto flex flex-col">
                          {canvaTemplates.map((tpl, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => {
                                setReplyText(prev => prev ? `${prev}\n\n${tpl.text}` : tpl.text);
                                setIsTemplatesDropdownOpen(false);
                              }}
                              className="w-full text-left px-3 py-2 text-[#0F172A] hover:bg-slate-50 transition-colors flex flex-col gap-0.5 cursor-pointer"
                            >
                              <span className="font-bold text-[12.5px]">{tpl.name}</span>
                              <span className="text-[10.5px] text-slate-400 truncate w-full">{tpl.text}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              {/* Textarea */}
              <textarea
                className="w-full p-4 min-h-[140px] text-[13px] text-[#0F172A] resize-none focus:outline-none placeholder-slate-400 bg-white"
                placeholder="Type your reply here..."
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
              />
              {/* Bottom bar */}
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between px-4 py-3 border-t border-[#E2E8F0] bg-white rounded-b-xl">
                <div className="flex items-center gap-4 flex-wrap">
                  <button
                    type="button"
                    onClick={() => setReplyType('Public Reply')}
                    className="flex items-center gap-2 text-[13px] font-semibold cursor-pointer text-[#0F172A]"
                  >
                    <span className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                      replyType === 'Public Reply' 
                        ? 'border-[#4F46E5] bg-white' 
                        : 'border-slate-300 bg-white'
                    }`}>
                      {replyType === 'Public Reply' && <span className="w-2.5 h-2.5 rounded-full bg-[#4F46E5]" />}
                    </span>
                    Public Reply
                  </button>
                  <button
                    type="button"
                    onClick={() => setReplyType('Internal Note')}
                    className="flex items-center gap-2 text-[13px] font-semibold cursor-pointer text-[#0F172A]"
                  >
                    <span className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                      replyType === 'Internal Note' 
                        ? 'border-[#4F46E5] bg-white' 
                        : 'border-slate-300 bg-white'
                    }`}>
                      {replyType === 'Internal Note' && <span className="w-2.5 h-2.5 rounded-full bg-[#4F46E5]" />}
                    </span>
                    Internal Note
                  </button>
                </div>
                <button
                  onClick={handleSendReply}
                  disabled={!replyText.trim()}
                  className={`h-10 px-5 rounded-lg text-white text-[13px] font-bold transition-all ${
                    replyText.trim() 
                      ? 'bg-black hover:bg-slate-800 cursor-pointer shadow-sm active:scale-98' 
                      : 'bg-slate-300 cursor-not-allowed'
                  }`}
                >
                  Send Reply
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-[320px] shrink-0 border-t lg:border-t-0 lg:border-l border-[#E2E8F0] pt-6 lg:pt-0 lg:pl-8 flex flex-col gap-8">
          {/* Customer Details */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[13px] font-semibold text-[#64748B] mb-2">Customer Details</h3>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center text-[16px] font-bold shrink-0">
                {customerInitials}
              </div>
              <div className="flex flex-col">
                <span className="text-[15px] font-bold text-[#0F172A]">{ticket.user}</span>
                <span className="text-[13px] text-[#2563EB] font-semibold">{customerEmail}</span>
              </div>
            </div>

            <div className="flex flex-col text-[13px]">
              <div className="flex justify-between border-b border-[#F1F5F9] py-3">
                <span className="text-[#64748B] font-medium">Company</span>
                <span className="font-semibold text-[#0F172A]">{ticket.userType === 'Vendor' ? 'Independent Vendor' : 'TechCorp Inc.'}</span>
              </div>
              <div className="flex justify-between border-b border-[#F1F5F9] py-3">
                <span className="text-[#64748B] font-medium">Account Tier</span>
                <span className="font-semibold text-[#4F46E5] flex items-center gap-1.5">
                  <FiStar size={12} className="text-[#4F46E5]" /> {ticket.userType === 'Vendor' ? 'Gold Merchant' : 'Premium'}
                </span>
              </div>
              <div className="flex justify-between border-b border-[#F1F5F9] py-3">
                <span className="text-[#64748B] font-medium">Timezone</span>
                <span className="font-semibold text-[#0F172A]">EST (UTC-5)</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-[#64748B] font-medium">Total Tickets</span>
                <span className="font-semibold text-[#0F172A]">14</span>
              </div>
            </div>

            <button
              onClick={() => showToast(`Opening CRM details for ${ticket.user}`, 'info')}
              className="w-full h-9 border border-[#E2E8F0] rounded-lg text-[12px] font-bold text-[#0F172A] hover:bg-slate-50 transition-colors cursor-pointer bg-white"
            >
              View CRM Profile
            </button>
          </div>

          {/* Ticket Info */}
          <div className="flex flex-col gap-4 mt-2">
            <h3 className="text-[13px] font-semibold text-[#64748B] mb-2">Ticket Info</h3>
            
            <div className="flex flex-col gap-4 text-[13px]">
              <div>
                <span className="text-[#64748B] font-medium text-[12px] block mb-1">Created</span>
                <span className="font-bold text-[#0F172A] block">Oct 24, 2023 • 09:41 AM</span>
              </div>
              <div>
                <span className="text-[#64748B] font-medium text-[12px] block mb-1">Last Updated</span>
                <span className="font-bold text-[#0F172A] block">Oct 24, 2023 • 10:12 AM</span>
              </div>
              <div>
                <span className="text-[#64748B] font-medium text-[12px] block mb-2">Category</span>
                <div className="flex gap-1.5">
                  <span className="bg-[#F1F5F9] text-[#475569] text-[12px] font-bold px-3 py-1 rounded">{ticket.category}</span>
                  <span className="bg-[#F1F5F9] text-[#475569] text-[12px] font-bold px-3 py-1 rounded">API</span>
                </div>
              </div>
              <div>
                <span className="text-[#64748B] font-medium text-[12px] block mb-2">Assignee</span>
                <div className="relative">
                  <div
                    onClick={() => setIsAssigneeDropdownOpen(!isAssigneeDropdownOpen)}
                    className="border border-[#E2E8F0] rounded-lg px-3 py-2 flex items-center gap-2.5 text-[13px] font-medium cursor-pointer hover:bg-slate-50 bg-white"
                  >
                    <div className="w-6 h-6 rounded bg-[#4F46E5] flex items-center justify-center text-white text-[11px] font-bold shrink-0">
                      A
                    </div>
                    <span className="text-[#0F172A] font-semibold">{ticket.assignedTo}</span>
                    <FiChevronDown size={14} className="ml-auto text-slate-400" />
                  </div>
                  {isAssigneeDropdownOpen && (
                    <div className="absolute top-full mt-1 left-0 right-0 bg-white border border-[#E2E8F0] rounded-lg shadow-lg z-30 py-1 max-h-[160px] overflow-y-auto">
                      {agents.map(ag => (
                        <button
                          key={ag.name}
                          onClick={() => {
                            onUpdateTicket({ ...ticket, assignedTo: ag.name });
                            setIsAssigneeDropdownOpen(false);
                            showToast(`Assigned ticket to ${ag.name}`, 'info');
                          }}
                          className="w-full text-left px-3 py-1.5 text-[12px] font-semibold text-[#0F172A] hover:bg-slate-50 cursor-pointer"
                        >
                          {ag.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN SUPPORT COMPONENT
   ═══════════════════════════════════════════════ */
export default function Support() {
  const [activeTab, setActiveTab] = useState('ticket');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [priorityFilter, setPriorityFilter] = useState('All Priority');
  const [selectedRange, setSelectedRange] = useState('7days');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Live Chat States
  const [liveChatEnabled, setLiveChatEnabled] = useState(true);
  const [businessHoursOnly, setBusinessHoursOnly] = useState(true);
  const [chatbotFirst, setChatbotFirst] = useState(true);
  const [chatTranscript, setChatTranscript] = useState(false);
  const [liveChatConfig, setLiveChatConfig] = useState({
    greeting: 'Hi! 👋 Welcome to Speedcopy support. How can we help you today?',
    offlineMessage: "We're currently offline. Leave a message and we'll get back to you within 4 hours.",
    businessHoursStart: '9:00AM',
    businessHoursEnd: '9:00PM'
  });

  // Data States
  const [tickets, setTickets] = useState(initialTickets);
  const [agents, setAgents] = useState(initialAgents);
  const [toasts, setToasts] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // New Ticket Modal State
  const [isNewTicketModalOpen, setIsNewTicketModalOpen] = useState(false);
  const [newTicketForm, setNewTicketForm] = useState({
    user: '',
    userType: 'Customer',
    category: 'Delivery',
    priority: 'High',
    assignedTo: 'Sarah J.',
    desc: ''
  });

  useEffect(() => {
    document.title = 'Support - SpeedCopy';
  }, []);

  // Toast System
  const showToast = (message, type = 'success', title = '') => {
    const id = Date.now();
    const defaultTitle = type === 'success' ? 'Success' : type === 'error' ? 'Alert' : 'Info';
    setToasts(prev => [...prev, { id, message, type, title: title || defaultTitle }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const handleUpdateTicket = (updatedTicket) => {
    setTickets(prev => prev.map(t => t.id === updatedTicket.id ? updatedTicket : t));
    if (selectedTicket && selectedTicket.id === updatedTicket.id) {
      setSelectedTicket(updatedTicket);
    }
  };

  // Statistic Calculations from Live State
  const openTicketsList = tickets.filter(t => t.status !== 'Resolved');
  const openCount = openTicketsList.length;
  const urgentCount = openTicketsList.filter(t => t.priority === 'Urgent' || t.priority === 'High').length;
  const escalatedCount = tickets.filter(t => t.status === 'Escalated').length;

  const currentLabel = dateRangeOptions.find(o => o.value === selectedRange)?.label || 'Last 7 days';

  // Search and Filters
  const filteredTickets = tickets.filter(ticket => {
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch = !query ||
      ticket.id.toLowerCase().includes(query) ||
      ticket.desc.toLowerCase().includes(query) ||
      ticket.user.toLowerCase().includes(query) ||
      ticket.category.toLowerCase().includes(query) ||
      ticket.assignedTo.toLowerCase().includes(query);

    const matchesStatus = statusFilter === 'All Status' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'All Priority' || ticket.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    showToast('Syncing with database...', 'info');
    setTimeout(() => {
      setIsRefreshing(false);
      showToast('Support system up-to-date!', 'success');
    }, 1000);
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ['Ticket ID', 'Description', 'Customer', 'User Type', 'Category', 'Priority', 'Status', 'Assigned To', 'SLA'];
    const rows = tickets.map(t => [
      t.id,
      `"${t.desc.replace(/"/g, '""')}"`,
      `"${t.user}"`,
      t.userType,
      t.category,
      t.priority,
      t.status,
      `"${t.assignedTo}"`,
      t.sla
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map(r => r.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `speedcopy_tickets_${selectedRange}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Database exported to CSV file', 'success');
  };

  // Handle Create Ticket
  const handleCreateTicketSubmit = (e) => {
    e.preventDefault();
    if (!newTicketForm.user.trim() || !newTicketForm.desc.trim()) return;

    const lastId = tickets.reduce((max, t) => {
      const num = parseInt(t.id.split('-')[1]);
      return num > max ? num : max;
    }, 1000);

    const nextId = `TKT-${lastId + 1}`;
    const newTktObj = {
      id: nextId,
      desc: newTicketForm.desc,
      user: newTicketForm.user,
      userType: newTicketForm.userType,
      category: newTicketForm.category,
      priority: newTicketForm.priority,
      status: 'Open',
      assignedTo: newTicketForm.assignedTo,
      sla: '24h left',
      slaOverdue: false,
      messages: [
        {
          id: `msg-${Date.now()}`,
          sender: newTicketForm.user,
          role: newTicketForm.userType,
          text: newTicketForm.desc,
          time: 'Just now',
          isInternal: false
        }
      ]
    };

    setTickets([newTktObj, ...tickets]);
    setIsNewTicketModalOpen(false);
    setNewTicketForm({
      user: '',
      userType: 'Customer',
      category: 'Delivery',
      priority: 'High',
      assignedTo: 'Sarah J.',
      desc: ''
    });
    showToast(`Ticket ${nextId} created!`, 'success');
  };

  const handleToggleAgentStatus = (agentName) => {
    const statuses = ['Online', 'Busy', 'Offline'];
    setAgents(prev => prev.map(ag => {
      if (ag.name === agentName) {
        const nextIdx = (statuses.indexOf(ag.status) + 1) % statuses.length;
        const nextStatus = statuses[nextIdx];
        showToast(`${agentName} is now ${nextStatus}`, 'info');
        return { ...ag, status: nextStatus };
      }
      return ag;
    }));
  };

  /* ── If a ticket is selected, show the detail view ── */
  if (selectedTicket) {
    return (
      <div className="relative">
        <TicketDetailView
          ticket={selectedTicket}
          onBack={() => setSelectedTicket(null)}
          onUpdateTicket={handleUpdateTicket}
          agents={agents}
          showToast={showToast}
        />
        {/* Toast stack inside Detail View */}
        <ToastContainer toasts={toasts} />
      </div>
    );
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={pageVariants} className="w-full flex flex-col gap-6 relative">
      {/* ─── HEADER ─── */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-[24px] font-black text-gray-900 tracking-tight font-sans">Support</h1>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="text-[12px] font-semibold text-gray-700 border border-gray-300 rounded-full px-3 py-1 bg-white shadow-xs flex items-center gap-1 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                {currentLabel}
                <FiChevronDown size={12} />
              </button>
              {isDropdownOpen && (
                <div className="absolute top-full mt-1 left-0 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-[140px] py-1">
                  {dateRangeOptions.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => { setSelectedRange(opt.value); setIsDropdownOpen(false); }}
                      className={`w-full text-left px-3 py-1.5 text-[12px] font-medium hover:bg-slate-50 transition-colors ${selectedRange === opt.value ? 'text-[#0F172A] font-bold' : 'text-slate-500'}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <p className="text-[12.5px] text-slate-400 font-semibold mt-2">Manage customer support from one place.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="h-9 px-3.5 rounded-lg border border-[#E2E8F0] bg-white text-[12px] font-bold text-slate-650 hover:bg-slate-50 flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <FiDownload size={14} />
            Export
          </button>
          <button
            onClick={handleRefresh}
            className="h-9 px-3.5 rounded-lg border border-[#E2E8F0] bg-white text-[12px] font-bold text-slate-650 hover:bg-slate-50 flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <FiRefreshCw size={14} className={isRefreshing ? 'animate-spin text-[#4F46E5]' : ''} />
            Refresh
          </button>
        </div>
      </div>

      {/* ─── STAT CARDS ─── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Open Tickets */}
        <motion.div whileHover={{ y: -2 }} className="bg-white border border-[#E2E8F0] rounded-[14px] p-5 flex flex-col justify-between shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] min-h-[120px]">
          <div className="flex items-start justify-between">
            <span className="text-[12px] font-semibold text-gray-400">Open Tickets</span>
            <div className="w-9 h-9 bg-black rounded-md flex items-center justify-center">
              <FiMail size={16} className="text-white" />
            </div>
          </div>
          <div>
            <p className="text-[28px] font-black text-gray-900">{openCount}</p>
            <p className="text-[11px] text-orange-500 font-semibold">{urgentCount} urgent</p>
          </div>
        </motion.div>

        {/* Avg. Resolution */}
        <motion.div whileHover={{ y: -2 }} className="bg-white border border-[#E2E8F0] rounded-[14px] p-5 flex flex-col justify-between shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] min-h-[120px]">
          <div className="flex items-start justify-between">
            <span className="text-[12px] font-semibold text-gray-400">Avg. Resolution</span>
            <div className="w-9 h-9 bg-[#F1F5F9] border border-[#E2E8F0] rounded-full flex items-center justify-center">
              <FiClock size={16} className="text-slate-500" />
            </div>
          </div>
          <div>
            <p className="text-[28px] font-black text-gray-900">4.2h</p>
            <p className="text-[11px] text-slate-400 font-medium">SLA target: 6h</p>
          </div>
        </motion.div>

        {/* CSAT Score */}
        <motion.div whileHover={{ y: -2 }} className="bg-white border border-[#E2E8F0] rounded-[14px] p-5 flex flex-col justify-between shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] min-h-[120px]">
          <div className="flex items-start justify-between">
            <span className="text-[12px] font-semibold text-gray-400">CSAT Score</span>
            <div className="w-9 h-9 bg-[#F1F5F9] border border-[#E2E8F0] rounded-full flex items-center justify-center">
              <FiCheckCircle size={16} className="text-slate-500" />
            </div>
          </div>
          <div>
            <p className="text-[28px] font-black text-gray-900">94%</p>
            <p className="text-[11px] text-emerald-600 font-semibold">↑ 2% this week</p>
          </div>
        </motion.div>

        {/* Escalated */}
        <motion.div whileHover={{ y: -2 }} className="bg-white border border-[#E2E8F0] rounded-[14px] p-5 flex flex-col justify-between shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] min-h-[120px]">
          <div className="flex items-start justify-between">
            <span className="text-[12px] font-semibold text-gray-400">Escalated</span>
            <div className="w-9 h-9 bg-[#F1F5F9] border border-[#E2E8F0] rounded-full flex items-center justify-center text-slate-500">
              <FiAlertTriangle size={16} />
            </div>
          </div>
          <div>
            <p className="text-[28px] font-black text-gray-900">{escalatedCount}</p>
            <p className="text-[11px] text-slate-450 font-medium">Needs attention</p>
          </div>
        </motion.div>
      </div>

      {/* ─── TAB NAVIGATION ─── */}
      <div className="border-b border-[#E2E8F0] flex items-center gap-6 overflow-x-auto">
        {[
          { key: 'ticket', label: 'Ticket Management' },
          { key: 'livechat', label: 'Live Chat' },
          { key: 'sla', label: 'SLA Tracking' }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-3 transition-colors ${activeTab === tab.key
              ? 'text-[13px] font-bold text-[#0F172A] border-b-2 border-[#0F172A]'
              : 'text-[13px] font-medium text-slate-400 hover:text-slate-650 cursor-pointer'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ─── TAB CONTENT ─── */}
      <AnimatePresence mode="wait">
        {activeTab === 'ticket' && (
          <motion.div key="ticket" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            <TicketManagementTab
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              priorityFilter={priorityFilter}
              setPriorityFilter={setPriorityFilter}
              onViewTicket={setSelectedTicket}
              ticketsList={filteredTickets}
              onExport={handleExportCSV}
              onNewTicketClick={() => setIsNewTicketModalOpen(true)}
            />
          </motion.div>
        )}
        {activeTab === 'sla' && (
          <motion.div key="sla" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            <SLATrackingTab />
          </motion.div>
        )}
        {activeTab === 'livechat' && (
          <motion.div key="livechat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            <LiveChatTab
              liveChatEnabled={liveChatEnabled}
              setLiveChatEnabled={setLiveChatEnabled}
              businessHoursOnly={businessHoursOnly}
              setBusinessHoursOnly={setBusinessHoursOnly}
              chatbotFirst={chatbotFirst}
              setChatbotFirst={setChatbotFirst}
              chatTranscript={chatTranscript}
              setChatTranscript={setChatTranscript}
              agents={agents}
              onToggleAgentStatus={handleToggleAgentStatus}
              liveChatConfig={liveChatConfig}
              setLiveChatConfig={setLiveChatConfig}
              showToast={showToast}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── CREATE NEW TICKET MODAL ─── */}
      <AnimatePresence>
        {isNewTicketModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsNewTicketModalOpen(false)}
              className="absolute inset-0 bg-[#0F172A]/40 backdrop-blur-[2px]"
            />
            {/* Modal Body */}
             <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-2xl border border-[#E2E8F0] shadow-2xl w-full max-w-[500px] p-6 overflow-y-auto max-h-[calc(100vh-2rem)] z-10"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[18px] font-bold text-[#0F172A]">Create New Ticket</h3>
                <button
                  type="button"
                  onClick={() => setIsNewTicketModalOpen(false)}
                  className="p-1 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-[#0F172A] cursor-pointer"
                >
                  <FiX size={18} />
                </button>
              </div>

              <form onSubmit={handleCreateTicketSubmit} className="flex flex-col gap-4 text-[13px]">
                <div>
                  <label className="block font-bold text-slate-500 mb-1.5 uppercase tracking-wider text-[10px]">User Name</label>
                  <input
                    type="text"
                    required
                    value={newTicketForm.user}
                    onChange={e => setNewTicketForm({ ...newTicketForm, user: e.target.value })}
                    placeholder="e.g. Riya Sharma"
                    className="w-full h-10 border border-[#E2E8F0] rounded-lg px-3 focus:outline-none focus:ring-1 focus:ring-[#0F172A] font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-500 mb-1.5 uppercase tracking-wider text-[10px]">User Type</label>
                    <select
                      value={newTicketForm.userType}
                      onChange={e => setNewTicketForm({ ...newTicketForm, userType: e.target.value })}
                      className="w-full h-10 border border-[#E2E8F0] bg-white rounded-lg px-3 focus:outline-none focus:ring-1 focus:ring-[#0F172A] font-semibold"
                    >
                      <option value="Customer">Customer</option>
                      <option value="Vendor">Vendor</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-500 mb-1.5 uppercase tracking-wider text-[10px]">Category</label>
                    <select
                      value={newTicketForm.category}
                      onChange={e => setNewTicketForm({ ...newTicketForm, category: e.target.value })}
                      className="w-full h-10 border border-[#E2E8F0] bg-white rounded-lg px-3 focus:outline-none focus:ring-1 focus:ring-[#0F172A] font-semibold"
                    >
                      <option value="Delivery">Delivery</option>
                      <option value="Payment">Payment</option>
                      <option value="Product">Product</option>
                      <option value="Refund">Refund</option>
                      <option value="Offers">Offers</option>
                      <option value="Integrations">Integrations</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-500 mb-1.5 uppercase tracking-wider text-[10px]">Priority</label>
                    <select
                      value={newTicketForm.priority}
                      onChange={e => setNewTicketForm({ ...newTicketForm, priority: e.target.value })}
                      className="w-full h-10 border border-[#E2E8F0] bg-white rounded-lg px-3 focus:outline-none focus:ring-1 focus:ring-[#0F172A] font-semibold"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Urgent">Urgent</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-500 mb-1.5 uppercase tracking-wider text-[10px]">Assign To</label>
                    <select
                      value={newTicketForm.assignedTo}
                      onChange={e => setNewTicketForm({ ...newTicketForm, assignedTo: e.target.value })}
                      className="w-full h-10 border border-[#E2E8F0] bg-white rounded-lg px-3 focus:outline-none focus:ring-1 focus:ring-[#0F172A] font-semibold"
                    >
                      {agents.map(ag => (
                        <option key={ag.name} value={ag.name}>{ag.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-500 mb-1.5 uppercase tracking-wider text-[10px]">Ticket Description</label>
                  <textarea
                    required
                    rows={3}
                    value={newTicketForm.desc}
                    onChange={e => setNewTicketForm({ ...newTicketForm, desc: e.target.value })}
                    placeholder="Describe the issue details..."
                    className="w-full border border-[#E2E8F0] rounded-lg p-3 resize-none focus:outline-none focus:ring-1 focus:ring-[#0F172A] font-medium"
                  />
                </div>

                <div className="flex justify-end gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => setIsNewTicketModalOpen(false)}
                    className="h-10 px-4 border border-[#E2E8F0] bg-white rounded-lg font-bold text-[#0F172A] hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="h-10 px-5 bg-black text-white rounded-lg font-bold hover:bg-[#1E293B] cursor-pointer"
                  >
                    Create Ticket
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Global Toast Stack */}
      <ToastContainer toasts={toasts} />
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   TOAST CONTAINER COMPONENT
   ═══════════════════════════════════════════════ */
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

/* ═══════════════════════════════════════════════
   TICKET MANAGEMENT TAB
   ═══════════════════════════════════════════════ */
function TicketManagementTab({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  onViewTicket,
  ticketsList,
  onExport,
  onNewTicketClick
}) {
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isPriorityOpen, setIsPriorityOpen] = useState(false);

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-[14px] overflow-hidden shadow-xs">
      {/* Filter bar */}
      <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-3">
          <div className="relative">
            <FiSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-450" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search tickets..."
              className="w-[220px] h-9 pl-9 pr-3 rounded-lg border border-[#E2E8F0] text-[12px] text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#0F172A] font-medium"
            />
          </div>

          {/* Status Dropdown */}
          <div className="relative">
            <button
              onClick={() => { setIsStatusOpen(!isStatusOpen); setIsPriorityOpen(false); }}
              className="h-9 px-3.5 rounded-lg border border-[#E2E8F0] bg-white text-[12px] font-semibold text-slate-500 flex items-center gap-1.5 cursor-pointer hover:bg-slate-50"
            >
              {statusFilter}
              <FiChevronDown size={12} />
            </button>
            {isStatusOpen && (
              <div className="absolute top-full mt-1 left-0 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-[140px] py-1">
                {['All Status', 'Open', 'In Progress', 'Escalated', 'Resolved'].map(st => (
                  <button
                    key={st}
                    onClick={() => { setStatusFilter(st); setIsStatusOpen(false); }}
                    className={`w-full text-left px-3 py-1.5 text-[12px] font-medium hover:bg-slate-50 transition-colors ${statusFilter === st ? 'text-[#0F172A] font-bold' : 'text-slate-500'}`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Priority Dropdown */}
          <div className="relative">
            <button
              onClick={() => { setIsPriorityOpen(!isPriorityOpen); setIsStatusOpen(false); }}
              className="h-9 px-3.5 rounded-lg border border-[#E2E8F0] bg-white text-[12px] font-semibold text-slate-500 flex items-center gap-1.5 cursor-pointer hover:bg-slate-50"
            >
              {priorityFilter}
              <FiChevronDown size={12} />
            </button>
            {isPriorityOpen && (
              <div className="absolute top-full mt-1 left-0 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-[140px] py-1">
                {['All Priority', 'Low', 'Medium', 'High', 'Urgent'].map(pr => (
                  <button
                    key={pr}
                    onClick={() => { setPriorityFilter(pr); setIsPriorityOpen(false); }}
                    className={`w-full text-left px-3 py-1.5 text-[12px] font-medium hover:bg-slate-50 transition-colors ${priorityFilter === pr ? 'text-[#0F172A] font-bold' : 'text-slate-500'}`}
                  >
                    {pr}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onExport}
            className="h-9 px-3.5 rounded-lg border border-[#E2E8F0] bg-white text-[12px] font-bold text-slate-650 hover:bg-slate-50 flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <FiDownload size={14} />
            Export
          </button>
          <button
            onClick={onNewTicketClick}
            className="h-9 px-3.5 rounded-lg bg-black text-white text-[12px] font-bold flex items-center gap-1.5 hover:bg-[#1E293B] transition-colors cursor-pointer"
          >
            <FiPlus size={14} />
            New Ticket
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px]">
          <thead>
            <tr className="bg-[#F8FAFC] h-10 border-b border-[#E2E8F0]">
              <th className="px-6 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-[#64748B]">Ticket</th>
              <th className="px-6 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-[#64748B]">User</th>
              <th className="px-6 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-[#64748B]">Category</th>
              <th className="px-6 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-[#64748B]">Priority</th>
              <th className="px-6 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-[#64748B]">Status</th>
              <th className="px-6 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-[#64748B]">Assigned To</th>
              <th className="px-6 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-[#64748B]">SLA</th>
              <th className="px-6 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-[#64748B]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0]">
            {ticketsList.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-10 text-[13px] font-semibold text-slate-400 bg-white">
                  No tickets found matching the filter criteria.
                </td>
              </tr>
            ) : (
              ticketsList.map(ticket => {
                const pStyle = getPriorityStyle(ticket.priority);
                return (
                  <tr key={ticket.id} className="hover:bg-slate-50/50 transition-colors bg-white">
                    <td className="px-6 py-3.5">
                      <div className="text-[13px] font-bold text-[#0F172A]">{ticket.id}</div>
                      <div className="text-[11px] text-slate-400 font-medium">{ticket.desc}</div>
                    </td>
                    <td className="px-6 py-3.5">
                      <div className="text-[13px] font-semibold text-[#0F172A]">{ticket.user}</div>
                      <div className="text-[11px] text-slate-400 font-medium">({ticket.userType})</div>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className="text-[13px] font-semibold text-[#64748B]">{ticket.category}</span>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${pStyle.pill}`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${pStyle.dot}`} />
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap ${getStatusStyle(ticket.status)}`}>
                        {ticket.status}
                      </span>
                    </td>
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-white border border-[#E2E8F0] shrink-0" />
                        <span className="text-[13px] font-medium text-[#0F172A]">{ticket.assignedTo}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className={`text-[12px] font-semibold ${ticket.slaOverdue ? 'text-red-500' : ticket.sla === 'Done' ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {ticket.sla}
                      </span>
                    </td>
                    <td className="px-6 py-3.5">
                      <button
                        onClick={() => onViewTicket(ticket)}
                        className="text-slate-400 hover:text-black transition-colors p-0.5 cursor-pointer"
                      >
                        <FiEye size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   SLA TRACKING TAB
   ═══════════════════════════════════════════════ */
function SLATrackingTab() {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-[14px] overflow-hidden shadow-xs p-6">
      <h2 className="text-[16px] font-bold text-[#0F172A]">SLA Performance</h2>
      <p className="text-[13px] text-slate-400 font-medium mt-1 mb-6">
        Monitor service level agreement compliance across all ticket categories.
      </p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={slaData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
          <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '12px' }}
          />
          <Bar dataKey="met" fill="#0F172A" radius={[4, 4, 0, 0]} barSize={24} name="SLA Met" />
          <Bar dataKey="breached" fill="#FCA5A5" radius={[4, 4, 0, 0]} barSize={24} name="Breached" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   LIVE CHAT TAB
   ═══════════════════════════════════════════════ */
function LiveChatTab({
  liveChatEnabled, setLiveChatEnabled,
  businessHoursOnly, setBusinessHoursOnly,
  chatbotFirst, setChatbotFirst,
  chatTranscript, setChatTranscript,
  agents,
  onToggleAgentStatus,
  liveChatConfig,
  setLiveChatConfig,
  showToast
}) {
  const handleSaveSettings = () => {
    showToast('Live chat greeting and schedules updated successfully!', 'success');
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-[14px] overflow-hidden shadow-xs p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-[16px] font-bold text-[#0F172A]">Live Chat Configuration</h2>
          <p className="text-[13px] text-slate-400 font-medium mt-1">
            Manage chat availability, routing, and bot settings.
          </p>
        </div>
        <button
          onClick={handleSaveSettings}
          className="h-9 px-4 bg-black text-white text-[12px] font-bold rounded-lg hover:bg-[#1E293B] cursor-pointer"
        >
          Save Configuration
        </button>
      </div>

      {/* Two-column settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Toggles */}
        <div className="flex flex-col gap-8">
          {/* Toggle 1 */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-[14px] font-bold text-[#0F172A]">Enable Live Chat Widget</h4>
              <p className="text-[12px] text-slate-400 font-medium">Show chat bubble on customer-facing site</p>
            </div>
            <ToggleSwitch enabled={liveChatEnabled} onToggle={() => setLiveChatEnabled(!liveChatEnabled)} />
          </div>
          {/* Toggle 2 */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-[14px] font-bold text-[#0F172A]">Business Hours Only</h4>
              <p className="text-[12px] text-slate-400 font-medium">Only show chat during working hours</p>
            </div>
            <ToggleSwitch enabled={businessHoursOnly} onToggle={() => setBusinessHoursOnly(!businessHoursOnly)} />
          </div>
          {/* Toggle 3 */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-[14px] font-bold text-[#0F172A]">Chatbot First Response</h4>
              <p className="text-[12px] text-slate-400 font-medium">Route through AI bot before human handoff</p>
            </div>
            <ToggleSwitch enabled={chatbotFirst} onToggle={() => setChatbotFirst(!chatbotFirst)} />
          </div>
          {/* Toggle 4 */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-[14px] font-bold text-[#0F172A]">Chat Transcript Email</h4>
              <p className="text-[12px] text-slate-400 font-medium">Auto-send transcript to customer after chat</p>
            </div>
            <ToggleSwitch enabled={chatTranscript} onToggle={() => setChatTranscript(!chatTranscript)} />
          </div>
        </div>

        {/* Right: Messages & Hours */}
        <div className="flex flex-col gap-5">
          <div>
            <label className="text-[13px] font-bold text-[#0F172A] mb-2 block">Widget Greeting Message</label>
            <textarea
              className="w-full h-[80px] border border-[#E2E8F0] rounded-lg p-3 text-[13px] text-[#0F172A] resize-none focus:outline-none focus:ring-1 focus:ring-[#0F172A] font-medium"
              value={liveChatConfig.greeting}
              onChange={e => setLiveChatConfig({ ...liveChatConfig, greeting: e.target.value })}
            />
          </div>
          <div>
            <label className="text-[13px] font-bold text-[#0F172A] mb-2 block">Offline Message</label>
            <textarea
              className="w-full h-[80px] border border-[#E2E8F0] rounded-lg p-3 text-[13px] text-[#0F172A] resize-none focus:outline-none focus:ring-1 focus:ring-[#0F172A] font-medium"
              value={liveChatConfig.offlineMessage}
              onChange={e => setLiveChatConfig({ ...liveChatConfig, offlineMessage: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[13px] font-bold text-[#0F172A] mb-2 block">Business Hours Start</label>
              <input
                type="text"
                value={liveChatConfig.businessHoursStart}
                onChange={e => setLiveChatConfig({ ...liveChatConfig, businessHoursStart: e.target.value })}
                className="w-full h-10 border border-[#E2E8F0] rounded-lg px-3 text-[13px] font-medium text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#0F172A]"
              />
            </div>
            <div>
              <label className="text-[13px] font-bold text-[#0F172A] mb-2 block">Business Hours End</label>
              <input
                type="text"
                value={liveChatConfig.businessHoursEnd}
                onChange={e => setLiveChatConfig({ ...liveChatConfig, businessHoursEnd: e.target.value })}
                className="w-full h-10 border border-[#E2E8F0] rounded-lg px-3 text-[13px] font-medium text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#0F172A]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Agent Status */}
      <div className="border border-[#E2E8F0] rounded-2xl bg-[#F8FAFC] mt-8 p-6 shadow-2xs">
        <h3 className="text-[14px] font-bold text-[#0F172A] mb-1">Current Agent Status</h3>
        <p className="text-[12px] text-slate-400 font-semibold mb-4">Click agent card to cycle status (Online ➔ Busy ➔ Offline).</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {agents.map(agent => (
            <div
              key={agent.name}
              onClick={() => onToggleAgentStatus(agent.name)}
              className="bg-white border border-[#E2E8F0] rounded-xl p-4 flex flex-col items-center gap-2 cursor-pointer hover:bg-slate-50 hover:border-[#CBD5E1] transition-all shadow-2xs"
            >
              <div className="w-12 h-12 rounded-full bg-white border border-[#E2E8F0] shrink-0" />
              <span className="text-[13px] font-bold text-[#0F172A]">{agent.name}</span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                agent.status === 'Online' ? 'bg-[#DEF7EC] text-[#03543F]' :
                agent.status === 'Busy' ? 'bg-[#FEF3C7] text-[#92400E]' :
                'bg-[#F1F5F9] text-[#64748B]'
              }`}>
                {agent.status}
              </span>
              <span className="text-[11px] text-slate-400 font-semibold">{agent.chats} chats</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
