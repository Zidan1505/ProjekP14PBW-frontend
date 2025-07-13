"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { usePublications } from "../hooks/UsePublications"
import editIcon from "../assets/edit.png"
import removeIcon from "../assets/remove.png"
import descriptionIcon from "../assets/description.png"

const ActionButton = ({ icon, title, onClick }) => (
  <button title={title} onClick={onClick} className="focus:outline-none">
    <img src={icon || "/placeholder.svg"} alt={title} className="w-8 h-8 hover:scale-110 transition-transform" />
  </button>
)

// Modal dengan background blur yang menampilkan halaman publikasi di belakang
const DescriptionModal = ({ publication, onClose }) => (
  <div
    className="fixed inset-0 flex justify-center items-center p-6 z-50
             backdrop-blur-md"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
    onClick={onClose}
  >
    <div
      className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-2xl 
             border border-gray-200 max-w-lg w-full
             animate-fade-in-scale p-8 flex flex-col relative"
      style={{ maxHeight: "80vh", overflowY: "auto" }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header dengan gradient */}
      <div className="flex justify-between items-center mb-6 border-b border-sky-200 pb-4">
        <h3 id="modal-title" className="text-2xl font-bold text-sky-900 tracking-wide pr-4">
          {publication.title}
        </h3>
        <button
          onClick={onClose}
          className="text-sky-600 hover:text-sky-800 text-3xl font-bold 
                     transition-colors hover:bg-sky-100 rounded-full w-10 h-10 
                     flex items-center justify-center flex-shrink-0"
          aria-label="Close modal"
        >
          &times;
        </button>
      </div>

      {/* Content area dengan scrollable */}
      <div className="flex-grow overflow-y-auto mb-6">
        <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">{publication.description}</div>
      </div>

      {/* Footer button */}
      <div className="border-t border-sky-200 pt-4">
        <button
          onClick={onClose}
          className="w-full bg-sky-700 text-white py-3 rounded-lg font-semibold
                     hover:bg-sky-800 transition-colors shadow-md
                     focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
        >
          Tutup
        </button>
      </div>
    </div>
  </div>
)

export default function PublicationListPage() {
  const { publications, deletePublication, isLoading, error } = usePublications()
  const navigate = useNavigate()
  const [selectedPub, setSelectedPub] = useState(null)

  useEffect(() => {
    if (
      (typeof error === "string" && error.toLowerCase().includes("unauthorized")) ||
      error?.toString().toLowerCase().includes("unauthorized")
    ) {
      navigate("/login")
    }
  }, [error, navigate])

  const handleViewDescription = (publication) => setSelectedPub(publication)
  const closeModal = () => setSelectedPub(null)

  const handleDeleteConfirmation = (id, title) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus publikasi "${title}"?`)) {
      deletePublication(id)
    }
  }

  if (isLoading) return <div className="text-center py-20 text-gray-500">Memuat data publikasi...</div>

  if (error && !error.toString().toLowerCase().includes("unauthorized")) {
    return (
      <div className="text-center py-20 bg-red-100 text-red-700 border border-red-400 p-4 rounded-md">
        Gagal memuat data: {error.toString()}
      </div>
    )
  }

  if (!Array.isArray(publications)) return null

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6 relative">
        <h1 className="text-3xl font-bold text-gray-800 text-center w-full">Daftar Publikasi</h1>
        <button
          onClick={() => navigate("/add")}
          className="bg-sky-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-sky-800 transition-colors absolute right-6"
        >
          Tambah Publikasi
        </button>
      </div>

      {publications.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700">Belum Ada Publikasi</h3>
          <p className="text-gray-500 mt-2">Silakan tambahkan publikasi baru dengan mengklik tombol di atas.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md border border-gray-600">
          <table className="min-w-full divide-y divide-gray-600 bg-white rounded-lg shadow-md overflow-hidden border border-gray-600">
            <thead className="bg-sky-700 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-center text-xs font-extrabold text-white uppercase tracking-wider w-16 border-r border-gray-600">
                  No.
                </th>
                <th className="px-6 py-3 text-left text-xs font-extrabold text-white uppercase tracking-wider border-r border-gray-600">
                  <span className="whitespace-normal">Judul</span>
                </th>
                <th className="px-6 py-3 text-left text-xs font-extrabold text-white uppercase tracking-wider whitespace-nowrap border-r border-gray-600">
                  Tanggal Rilis
                </th>
                <th className="px-6 py-3 text-center text-xs font-extrabold text-white uppercase tracking-wider w-36 border-r border-gray-600">
                  Sampul
                </th>
                <th className="px-6 py-3 text-center text-xs font-extrabold text-white uppercase tracking-wider w-48">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {publications.map((pub, idx) => (
                <tr
                  key={pub.id}
                  className={`cursor-pointer transition-colors ${
                    idx % 2 === 0 ? "bg-white" : "bg-sky-50"
                  } hover:bg-sky-100 border-b border-gray-600`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-semibold text-gray-900 border-r border-gray-600">
                    {idx + 1}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900 border-r border-gray-600 whitespace-normal break-words max-w-[30rem]">
                    {pub.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 border-r border-gray-600">
                    {new Date(pub.release_date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-center border-r border-gray-600">
                    <img
                      src={`http://localhost:8000/storage/${pub.cover_url}`}
                      alt={`Sampul ${pub.title}`}
                      className="h-20 w-auto rounded-lg shadow-md mx-auto"
                    />
                  </td>
                  <td className="px-6 py-4 text-center space-x-4">
                    <ActionButton
                      icon={descriptionIcon}
                      title="Lihat Deskripsi"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleViewDescription(pub)
                      }}
                    />
                    <ActionButton
                      icon={editIcon}
                      title="Edit"
                      onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/edit/${pub.id}`)
                      }}
                    />
                    <ActionButton
                      icon={removeIcon}
                      title="Hapus"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteConfirmation(pub.id, pub.title)
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedPub && <DescriptionModal publication={selectedPub} onClose={closeModal} />}
    </div>
  )
}
