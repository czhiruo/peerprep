import { useState } from "react";
import {
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/solid";

export const ExitButton = ({ navigate }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
    <div>
      {/* Button to open the modal */}
      <div className="flex text-white items-center h-12">
        <div
          className="flex items-center gap-2 px-2 py-2 bg-red-500 text-white rounded cursor-pointer hover:bg-red-600 my-2"
          onClick={() => setIsOpen(true)}
        >
          <ArrowLeftStartOnRectangleIcon className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
          <span className="text-sm pr-2">Leave</span>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4 text-black">Are you sure?</h3>
            <p className="mb-4 text-black">Leaving will remove the other user from the room. Your progress will be saved.</p>
            
            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>

              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => navigate("/")}
              >
                Leave
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};