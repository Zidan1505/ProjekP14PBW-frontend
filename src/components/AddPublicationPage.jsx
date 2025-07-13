import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePublications } from '../hooks/usePublications'; // Pastikan path ini benar

export default function AddPublicationPage() {
    // State untuk setiap input form
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [coverFile, setCoverFile] = useState(null);
    
    // State untuk loading dan error
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const navigate = useNavigate();
    const { addPublication } = usePublications();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !releaseDate || !description || !coverFile) {
            alert('Semua field termasuk file sampul harus diisi!');
            return;
        }

        setIsLoading(true);
        setError(null);

        // Gunakan FormData untuk mengirim data dan file
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('release_date', releaseDate); // Nama kolom ini harus cocok dengan yang diharapkan backend
        formData.append('cover_file', coverFile);     // Nama field ini juga harus cocok

        try {
            await addPublication(formData);
            navigate('/publications'); // Arahkan kembali ke daftar setelah sukses
        } catch (err) {
            setError(err.message || 'Terjadi kesalahan saat menambahkan publikasi.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Form Tambah Publikasi Baru</h1>
            
            {/* Tampilkan pesan error jika ada */}
            {error && <div className="p-3 mb-4 bg-red-100 text-red-700 rounded-md">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* 1. Input Judul */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Judul Publikasi</label>
                    <input 
                        type="text" 
                        id="title" 
                        value={title} 
                        onChange={e => setTitle(e.target.value)} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
                        required
                    />
                </div>
                
                {/* 2. Input Tanggal Rilis */}
                <div>
                    <label htmlFor="releaseDate" className="block text-sm font-medium text-gray-700 mb-1">Tanggal Rilis</label>
                    <input 
                        type="date" 
                        id="releaseDate" 
                        value={releaseDate} 
                        onChange={e => setReleaseDate(e.target.value)} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
                        required
                    />
                </div>

                {/* 3. Input Deskripsi */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                    <textarea 
                        id="description" 
                        rows="5"
                        value={description} 
                        onChange={e => setDescription(e.target.value)} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
                        required
                    ></textarea>
                </div>

                {/* 4. Input File Sampul (Cover) */}
                <div>
                    <label htmlFor="coverFile" className="block text-sm font-medium text-gray-700 mb-1">File Sampul</label>
                    <input 
                        type="file" 
                        id="coverFile" 
                        onChange={e => setCoverFile(e.target.files[0])} 
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100"
                        accept="image/png, image/jpeg, image/webp" // Batasi hanya untuk file gambar
                        required
                    />
                </div>
                
                {/* Tombol Aksi */}
                <div className="flex justify-end gap-4 pt-4">
                    <button type="button" onClick={() => navigate('/publications')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-lg transition-colors">
                        Batal
                    </button>
                    <button type="submit" disabled={isLoading} className={`font-bold py-2 px-6 rounded-lg text-white transition-colors ${isLoading ? 'bg-sky-400 cursor-not-allowed' : 'bg-sky-700 hover:bg-sky-800'}`}>
                        {isLoading ? 'Menyimpan...' : 'Tambah Publikasi'}
                    </button>
                </div>
            </form>
        </div>
    );
}