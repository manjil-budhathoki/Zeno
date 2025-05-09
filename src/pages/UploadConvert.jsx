import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import DragDropUpload from '../components/DragDropUpload';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({ opacity: 1, y: 0, transition: { delay, duration: 0.4, ease: [0.42, 0, 0.2, 1] } })
};

export default function UploadConvert() {
  const [file, setFile] = useState(null);
  const [fontSize, setFontSize] = useState(24);
  const [fontWeight, setFontWeight] = useState('bold');
  const [fontFamily, setFontFamily] = useState('Inter');
  const [color, setColor] = useState('#ffffff');
  const [textAlign, setTextAlign] = useState('left');
  const [margins, setMargins] = useState({ top: '0px', bottom: '0px', left: '0px', right: '0px' });
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    if (!file) return toast.error('Please upload a file.');
    if (!file.name.endsWith('.ipynb')) return toast.error('Only .ipynb files are supported.');

    setLoading(true);
    setPdfUrl(null);

    const formData = new FormData();
    formData.append('notebook', file);
    formData.append('font_family', fontFamily);
    formData.append('font_size', `${fontSize}px`);
    formData.append('font_weight', fontWeight);
    formData.append('color', color);
    formData.append('text_align', textAlign);
    formData.append('margin_top', margins.top);
    formData.append('margin_bottom', margins.bottom);
    formData.append('margin_left', margins.left);
    formData.append('margin_right', margins.right);

    try {
      const res = await fetch('https://zeno-backend-zbr4.onrender.com/convert/', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Failed to convert');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
      toast.success('Converted successfully!');
    } catch (err) {
      toast.error('Conversion failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="min-h-screen px-4 py-16 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white pb-24 relative"
    >
      <motion.div className="max-w-2xl mx-auto space-y-10" variants={fadeIn} custom={0.1}>
        <motion.div className="text-center space-y-2" variants={fadeIn} custom={0.2}>
          <h1 className="text-3xl md:text-4xl font-bold">Convert Your IPYNB File</h1>
          <p className="text-white/60 text-sm">Drag and drop your file, style your headings, and generate a PDF</p>
        </motion.div>

        <motion.div variants={fadeIn} custom={0.3}>
          <DragDropUpload
            onFileSelect={(f) => {
              if (f && f.name.endsWith('.ipynb')) {
                setFile(f);
                toast.success('Notebook uploaded!');
              } else {
                setFile(null);
                toast.error('Only .ipynb files are supported.');
              }
            }}
          />
        </motion.div>

        <motion.div variants={fadeIn} custom={0.4} className="bg-white/5 p-6 rounded-xl border border-white/10 space-y-4 shadow-inner">
          <h2 className="text-lg font-semibold text-white mb-2">Customize PDF Style</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm text-white/70">Font Family</label>
              <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)} className="w-full p-2 rounded-md bg-[#1e1e2f] text-white border border-white/10">
                <option value="Inter">Inter</option>
                <option value="Roboto">Roboto</option>
                <option value="Playfair Display">Playfair Display</option>
                <option value="JetBrains Mono">JetBrains Mono</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-sm text-white/70">Font Weight</label>
              <select value={fontWeight} onChange={(e) => setFontWeight(e.target.value)} className="w-full p-2 rounded-md bg-[#1e1e2f] text-white border border-white/10">
                <option value="normal">Normal</option>
                <option value="bold">Bold</option>
                <option value="lighter">Lighter</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-sm text-white/70">Font Size ({fontSize}px)</label>
              <input type="range" min="12" max="48" value={fontSize} onChange={(e) => setFontSize(e.target.value)} className="w-full accent-purple-400" />
            </div>
            <div>
              <label className="block mb-1 text-sm text-white/70">Text Color</label>
              <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-10 w-full rounded-md p-1 bg-white/10 border border-white/10" />
            </div>
            <div>
              <label className="block mb-1 text-sm text-white/70">Text Align</label>
              <select value={textAlign} onChange={(e) => setTextAlign(e.target.value)} className="w-full p-2 rounded-md bg-[#1e1e2f] text-white border border-white/10">
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-sm text-white/70">Margins (px)</label>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <input placeholder="Top" value={margins.top} onChange={(e) => setMargins({ ...margins, top: e.target.value })} className="p-2 rounded bg-[#1e1e2f] text-white border border-white/10" />
                <input placeholder="Bottom" value={margins.bottom} onChange={(e) => setMargins({ ...margins, bottom: e.target.value })} className="p-2 rounded bg-[#1e1e2f] text-white border border-white/10" />
                <input placeholder="Left" value={margins.left} onChange={(e) => setMargins({ ...margins, left: e.target.value })} className="p-2 rounded bg-[#1e1e2f] text-white border border-white/10" />
                <input placeholder="Right" value={margins.right} onChange={(e) => setMargins({ ...margins, right: e.target.value })} className="p-2 rounded bg-[#1e1e2f] text-white border border-white/10" />
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            key={`${fontSize}-${fontFamily}-${fontWeight}-${color}-${textAlign}`}
            className="mt-6 p-4 bg-white/5 border border-white/10 rounded-xl text-center"
          >
            <p style={{ fontSize: `${fontSize}px`, fontWeight, color, fontFamily, textAlign, marginTop: margins.top, marginBottom: margins.bottom, marginLeft: margins.left, marginRight: margins.right }} className="transition-all duration-300">
              This is a live heading preview
            </p>
          </motion.div>
        </motion.div>

        <motion.div variants={fadeIn} custom={0.5} className="flex justify-center">
          <motion.button
            onClick={handleConvert}
            disabled={!file || loading}
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.03 }}
            className={`bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 active:scale-95 transition-all text-white py-3 px-6 rounded-xl font-semibold shadow-md ${!file ? 'opacity-40 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Converting...' : 'Convert'}
          </motion.button>
        </motion.div>
      </motion.div>

      {pdfUrl && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4" onClick={() => setPdfUrl(null)}>
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-[#1e1e2f] rounded-xl p-4 max-w-5xl w-full max-h-[90vh] h-[90vh] shadow-xl border border-white/10 flex flex-col"
          >
            <h3 className="text-lg font-semibold text-white mb-3">PDF Preview</h3>
            <div className="flex-grow overflow-auto rounded">
              <iframe src={pdfUrl} title="Converted PDF" className="w-full h-full border rounded" />
            </div>
            <div className="mt-4 text-right">
              <a href={pdfUrl} download="converted.pdf" className="text-sm text-green-300 underline hover:text-green-400 transition">
                Download PDF
              </a>
            </div>
          </motion.div>
        </div>
      )}

      <Toaster position="top-center" toastOptions={{ style: { background: '#2e2e4f', color: '#fff', border: '1px solid #5a4be7', padding: '12px 16px', fontSize: '0.9rem' } }} />
    </motion.div>
  );
}
