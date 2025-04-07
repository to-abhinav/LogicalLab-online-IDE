import React, { useState } from 'react'
import { api } from '../../../../convex/_generated/api';
import { useMutation } from 'convex/react';
import { useCodeEditorStore } from '@/store/useCodeEditorStore';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

function ShareSnippetDialog({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState('');
  const [isSharing, setIsSharing] = useState(false);
  const { language, getCode } = useCodeEditorStore();

  const createSnippet = useMutation(api.snippets.createSnippet);

  const handleShare = async (e:React.FormEvent) => {
    e.preventDefault();
    setIsSharing(true);

    try {
      const code = getCode();
      await createSnippet({
        title,
        code,
        language,
      });
      onClose();
      setTitle('');
      toast.success('Snippet shared successfully!');
    } catch (error) {
      toast.error('Failed to share snippet. Please try again.');
      console.error('Error sharing snippet:', error);
    } finally {
      setIsSharing(false);
    }


   };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50">
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ duration: 0.2 }}
    className="relative p-4 w-full max-w-md h-full md:h-auto"
  >
    <div className="relative p-4 text-center bg-[#1e1e2e] rounded-lg shadow sm:p-5">
      <button
        type="button"
        onClick={onClose}
        className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
      >
        <X className="w-5 h-5" />
      </button>
      <h2 className="text-xl font-semibold text-white mb-4">Share Snippet</h2>
      <form onSubmit={handleShare}>
        <div className="mb-4 text-left">
          <label htmlFor="title" className="block text-sm font-medium text-gray-400 mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 bg-[#181825] border border-[#313244] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter snippet title"
            required
          />
        </div>
        <div className="flex justify-end items-center space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSharing}
            className="py-2 px-3 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-900 disabled:opacity-50"
          >
            {isSharing ? "Sharing..." : "Share"}
          </button>
        </div>
      </form>
    </div>
  </motion.div>
</div>
  )
}

export default ShareSnippetDialog