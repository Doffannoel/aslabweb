import React, { useState, useEffect } from "react";
import BookForm from "./components/BookForm";
import BookCard from "./components/BookCard";
import {
  getAllBooks,
  createBook,
  updateBook,
  deleteBook,
} from "./services/bookService";

function App() {
  const [books, setBooks] = useState([]);
  const [bookToEdit, setBookToEdit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fungsi untuk load semua buku dari API
  const loadBooks = async () => {
    try {
      setLoading(true);
      const data = await getAllBooks();
      setBooks(data);
      setError(null);
    } catch (err) {
      setError("Gagal memuat data buku. Pastikan server Django berjalan!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Load buku pertama kali saat aplikasi dibuka
  useEffect(() => {
    loadBooks();
  }, []);

  // Fungsi untuk tambah atau update buku
  const handleSubmit = async (formData) => {
    try {
      if (bookToEdit) {
        // Mode Edit
        await updateBook(bookToEdit.id, formData);
        alert("Buku berhasil diupdate! ✅");
        setBookToEdit(null);
      } else {
        // Mode Tambah Baru
        await createBook(formData);
        alert("Buku berhasil ditambahkan! ✅");
      }
      loadBooks(); // Refresh daftar buku
    } catch (err) {
      alert("Gagal menyimpan buku! ❌");
      console.error(err);
    }
  };

  // Fungsi untuk mulai edit buku
  const handleEdit = (book) => {
    setBookToEdit(book);
    // Scroll ke atas untuk lihat form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Fungsi untuk batal edit
  const handleCancelEdit = () => {
    setBookToEdit(null);
  };

  // Fungsi untuk hapus buku
  const handleDelete = async (id) => {
    // Konfirmasi dulu sebelum hapus
    if (window.confirm("Yakin ingin menghapus buku ini?")) {
      try {
        await deleteBook(id);
        alert("Buku berhasil dihapus! ✅");
        loadBooks(); // Refresh daftar buku
      } catch (err) {
        alert("Gagal menghapus buku! ❌");
        console.error(err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            📚 Perpustakaan Digital
          </h1>
          <p className="text-gray-600">
            Kelola koleksi buku favoritmu dengan mudah!
          </p>
        </div>

        {/* Form Tambah/Edit Buku */}
        <BookForm
          onSubmit={handleSubmit}
          bookToEdit={bookToEdit}
          onCancel={handleCancelEdit}
        />

        {/* Tampilkan Loading */}
        {loading && (
          <div className="text-center py-8">
            <p className="text-xl text-gray-600">⏳ Memuat data...</p>
          </div>
        )}

        {/* Tampilkan Error */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p>{error}</p>
          </div>
        )}

        {/* Daftar Buku */}
        {!loading && !error && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Daftar Buku ({books.length})
            </h2>

            {books.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <p className="text-xl text-gray-500">
                  📭 Belum ada buku. Yuk tambah buku pertamamu!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
