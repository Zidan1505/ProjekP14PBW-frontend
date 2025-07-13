import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePublications } from '../hooks/UsePublications';

export default function EditPublicationPage() {
  const { publicationId } = useParams();
  const navigate = useNavigate();
  const { getPublicationById, updatePublication, fetchPublications } = usePublications();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [oldCoverUrl, setOldCoverUrl] = useState('');
  const [newCoverFile, setNewCoverFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPublication = async () => {
      try {
        const pub = await getPublicationById(publicationId);
        setTitle(pub.title);
        setDescription(pub.description);
        setReleaseDate(pub.release_date);
        setOldCoverUrl(pub.cover_url);
      } catch (err) {
        setError(err.message || 'Gagal memuat data.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchPublication();
  }, [publicationId, getPublicationById]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('release_date', releaseDate);
      formData.append('_method', 'PUT'); // Laravel expects this for method spoofing

      if (newCoverFile) {
        formData.append('cover_file', newCoverFile);
      }

      await updatePublication(publicationId, formData);
      await fetchPublications(); // Refresh daftar publikasi agar sinkron
      navigate('/publications');
    } catch (err) {
      setError(err.message || 'Gagal menyimpan perubahan.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div className="text-center mt-10">Memuat data publikasi...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Form Edit Publikasi</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="title" className="block mb-1 font-medium text-gray-700">Judul</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            required
          />
        </div>

        <div>
          <label htmlFor="releaseDate" className="block mb-1 font-medium text-gray-700">Tanggal Rilis</label>
          <input
            type="date"
            id="releaseDate"
            value={releaseDate}
            onChange={e => setReleaseDate(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block mb-1 font-medium text-gray-700">Deskripsi</label>
          <textarea
            id="description"
            rows="4"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            required
          />
        </div>

        {/* Tampilkan sampul lama */}
        {oldCoverUrl && (
          <div>
            <p className="font-medium text-gray-700 mb-1">Sampul Saat Ini:</p>
            <img
              src={`http://localhost:8000/storage/${oldCoverUrl}`}
              alt="Sampul Publikasi"
              className="h-40 rounded shadow-md mb-3"
            />
          </div>
        )}

        {/* Input file untuk sampul baru */}
        <div>
          <label htmlFor="newCoverFile" className="block mb-1 font-medium text-gray-700">Ganti Sampul (Opsional)</label>
          <input
            type="file"
            id="newCoverFile"
            onChange={e => setNewCoverFile(e.target.files[0])}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100"
            accept="image/png, image/jpeg, image/webp"
          />
        </div>

        {/* Tombol Aksi */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate('/publications')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-lg"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className={`font-bold py-2 px-6 rounded-lg text-white ${isLoading ? 'bg-sky-400 cursor-not-allowed' : 'bg-sky-700 hover:bg-sky-800'}`}
          >
            {isLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </div>
      </form>
    </div>
  );
}
