import React, { useState, useEffect } from "react";

function BookForm({ onSubmit, bookToEdit, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    author: "",
    rating: "average",
  });

  // Jika ada buku yang diedit, isi form dengan data buku tersebut
  useEffect(() => {
    if (bookToEdit) {
      setFormData({
        name: bookToEdit.name,
        author: bookToEdit.author,
        rating: bookToEdit.rating,
      });
    }
  }, [bookToEdit]);

  // Fungsi ketika input berubah
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Fungsi ketika form di-submit
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    // Reset form
    setFormData({
      name: "",
      author: "",
      rating: "average",
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        {bookToEdit ? "Edit Buku" : "Tambah Buku Baru"}
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Input Judul Buku */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Judul Buku
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Masukkan judul buku"
            required
          />
        </div>

        {/* Input Penulis */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Penulis
          </label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Masukkan nama penulis"
            required
          />
        </div>

        {/* Pilih Rating */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Rating
          </label>
          <select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="excellent">Sangat Bagus ⭐⭐⭐</option>
            <option value="average">Biasa ⭐⭐</option>
            <option value="bad">Kurang Bagus ⭐</option>
          </select>
        </div>

        {/* Tombol Submit dan Cancel */}
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            {bookToEdit ? "Update Buku" : "Tambah Buku"}
          </button>

          {bookToEdit && (
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition duration-200"
            >
              Batal
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default BookForm;
