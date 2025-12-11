import React, { useRef } from "react";
import { GoodModal, GoodModalRef } from "./GoodModal";

export const GoodModalExample = () => {
  const modalRef = useRef<GoodModalRef>(null);
  const confirmModalRef = useRef<GoodModalRef>(null);

  const handleOpenModal = () => {
    modalRef.current?.open();
  };

  const handleCloseModal = () => {
    modalRef.current?.close();
  };

  const handleDelete = () => {
    confirmModalRef.current?.open();
  };

  const handleConfirmDelete = () => {
    console.log("Item deleted!");
    confirmModalRef.current?.close();
  };

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold mb-4">
        Good Modal Example - با useImperativeHandle
      </h1>

      <div className="space-x-4">
        <button
          onClick={handleOpenModal}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Open Modal
        </button>
        <button
          onClick={handleCloseModal}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Close Modal
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          Delete (Confirm Modal)
        </button>
      </div>

      {/* Simple Modal */}
      <GoodModal
        ref={modalRef}
        title="مودال با useImperativeHandle"
        size="md"
        onOpen={() => console.log("Modal opened")}
        onClose={() => console.log("Modal closed")}
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            این یک مودال است که با استفاده از پترن useImperativeHandle
            پیاده‌سازی شده است.
          </p>
          <p className="text-gray-700">
            شما می‌توانید از طریق ref به متدهای open، close و toggle دسترسی
            داشته باشید.
          </p>
          <div className="bg-blue-50 p-4 rounded">
            <h3 className="font-semibold mb-2">مزایای این پترن:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>کنترل کامل از بیرون کامپوننت</li>
              <li>نیازی به state در parent نیست</li>
              <li>API تمیز و قابل استفاده مجدد</li>
              <li>امکان دسترسی به وضعیت modal از طریق ref</li>
            </ul>
          </div>
          <button
            onClick={() => modalRef.current?.close()}
            className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Close from Inside
          </button>
        </div>
      </GoodModal>

      {/* Confirmation Modal */}
      <GoodModal
        ref={confirmModalRef}
        title="تایید حذف"
        size="sm"
        closeOnOverlayClick={false}
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            آیا مطمئن هستید که می‌خواهید این آیتم را حذف کنید؟
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleConfirmDelete}
              className="flex-1 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              حذف
            </button>
            <button
              onClick={() => confirmModalRef.current?.close()}
              className="flex-1 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              انصراف
            </button>
          </div>
        </div>
      </GoodModal>
    </div>
  );
};
