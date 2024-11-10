import { useState } from 'react';
import { LightBulbIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { LightBulbIcon as LightBulbIconOutline} from '@heroicons/react/24/outline'

function TestingConnectionBtn() {

    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    
    const closeModal = () => setIsOpen(false);

    const handleClick = async () => {
        setLoading(true);
        setIsOpen(true);
        try {
          const response = await fetch('http://localhost:5000/get-message');
          const data = await response.json();
          setMessage(data.message);
          console.log('Received message:', data.message);
        } catch (error) {
          console.error('Error:', error);
          setMessage('Failed to get message from server');
        } finally {
          setLoading(false);
        }
      };
    
    return(
        <div>
            {/* Button to open the modal */}
            <div className="flex gap-1 py-2 bg-white text-gray-700 text-xs font-semibold rounded cursor-pointer w-fit hover:bg-blue-600"
                onClick={handleClick}
            >
                <LightBulbIconOutline className='ml-2 w-4 h-4'/>
                <span className='pr-3'>Test Connection</span>
            </div>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="bg-gray-700 p-8 rounded-lg w-[40rem] max-h-[80vh] flex flex-col">
                        <div className='flex justify-between align-middle'> 
                            <div className='flex gap-2 align-middle'>
                                <LightBulbIcon className="w-6 h-6 " />
                                <h3 className="font-bold text-xl leading-6">Testing connection to Flask</h3>
                            </div>
                            <div class="text-gray-500 hover:text-gray-800"
                                onClick={closeModal}>
                                <XMarkIcon className='w-7 h-7'/>
                            </div>
                        </div>
                        <div className='flex justify-end mt-4'>
                            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                onClick={closeModal}
                            >Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TestingConnectionBtn;