import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import CatalogView from "./components/CatalogView";
import ProductCustomizer from "./components/ProductCustomizer";

export default function App() {
  const [currentView, setCurrentView] = useState("catalog");

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {currentView !== "catalog" && (
        <header className="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <button
              onClick={() => setCurrentView("catalog")}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors font-bold text-sm cursor-pointer"
            >
              <FaArrowLeft />
              <span>Back to Products</span>
            </button>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              {currentView === "clock" && "Wall Clock"}
              {currentView === "mug" && "Photo Mug"}
              {currentView === "pen" && " Pen"}
              {currentView === "plate" && "Name Plate"}
              {currentView === "frame" && "Collage Frame"}
              {currentView === "letterhead" && "Letterhead"}
            </span>
          </div>
        </header>
      )}

      <main className="flex-1 p-4">
        {currentView === "catalog" && (
          <CatalogView onSelectProduct={(id) => setCurrentView(id)} />
        )}
        {currentView !== "catalog" && (
          <ProductCustomizer productId={currentView} />
        )}
      </main>
    </div>
  );
}