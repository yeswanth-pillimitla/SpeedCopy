import { FaClock, FaCoffee, FaPen, FaIdCard, FaImage, FaFileAlt, FaBookOpen } from "react-icons/fa";

const PRODUCTS = [
  {
    id: "clock",
    name: "Wall Clock",
    description: "Create a custom ticking wall clock with your photo and style choices.",
    icon: FaClock,
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    id: "mug",
    name: "Photo Mug",
    description: "Personalize a standard ceramic coffee mug with your favorite memory.",
    icon: FaCoffee,
    color: "text-amber-600",
    bgColor: "bg-amber-50"
  },
  {
    id: "pen",
    name: "Metal Pen",
    description: "Engrave your name or corporate brand on a sleek metallic pen.",
    icon: FaPen,
    color: "text-slate-700",
    bgColor: "bg-slate-100"
  },
  {
    id: "plate",
    name: "Door Name Plate",
    description: "Design a professional crystal acrylic name plate for offices or desks.",
    icon: FaIdCard,
    color: "text-teal-600",
    bgColor: "bg-teal-50"
  },
  {
    id: "frame",
    name: "Multi-Image Collage Frame",
    description: "Organize multiple photos in a wooden wall collage grid frame.",
    icon: FaImage,
    color: "text-rose-600",
    bgColor: "bg-rose-50"
  },
  {
    id: "letterhead",
    name: "Letterhead",
    description: "Create branded company letterheads for business communications.",
    icon: FaFileAlt,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50"
  },
];

export default function CatalogView({ onSelectProduct }) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-slate-900">Personalized Print Studio</h1>
        <p className="text-sm text-slate-500 mt-2">Select a product from our catalog to start customizing your print design.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {PRODUCTS.map((prod) => {
          const Icon = prod.icon;
          return (
            <div 
              key={prod.id} 
              className="border border-slate-200 bg-white rounded-2xl p-5 flex flex-col justify-between hover:border-blue-400 transition-colors shadow-xs"
            >
              <div>
                <div className={`w-12 h-12 rounded-xl ${prod.bgColor} ${prod.color} flex items-center justify-center mb-4`}>
                  <Icon className="text-2xl" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">{prod.name}</h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{prod.description}</p>
              </div>

              <button
                type="button"
                onClick={() => onSelectProduct(prod.id)}
                className="mt-6 w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer text-center"
              >
                Customize Design
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
