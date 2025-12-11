import React, { useState } from "react";
import { BadModal } from "./BadModal";

export const BadModalExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Modal Component Example</h1>

      <div className="space-y-4">
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Open Modal
        </button>
      </div>

      <BadModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="مودال به درد نخور"
        size="md"
        showCloseButton={true}
        closeOnOverlayClick={true}
        closeOnEsc={true}
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            این یک مودال نمونه است که با امکانات زیر ساخته شده:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>بستن با کلیک روی overlay</li>
            <li>بستن با دکمه ESC</li>
            <li>انیمیشن ورود و خروج</li>
            <li>سایزهای مختلف (sm, md, lg, xl, full)</li>
            <li>قابل شخصی‌سازی</li>
          </ul>

          <div className="flex gap-3 mt-6">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              انصراف
            </button>
            <button
              onClick={() => {
                alert("تایید شد!");
                setIsOpen(false);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              تایید
            </button>
          </div>
        </div>
      </BadModal>
    </div>
  );
};
