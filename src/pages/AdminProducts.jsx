import { useEffect, useMemo, useState } from 'react';
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from '../services/productService.js';

const initialForm = {
  name: '',
  price: '',
  category: '',
  image: '',
  description: '',
};

function sortProductsById(items) {
  return [...items].sort((a, b) => a.id - b.id);
}

function upsertProduct(items, nextProduct) {
  const existingIndex = items.findIndex((item) => item.id === nextProduct.id);

  if (existingIndex === -1) {
    return sortProductsById([...items, nextProduct]);
  }

  const updated = [...items];
  updated[existingIndex] = nextProduct;
  return sortProductsById(updated);
}

function isValidImageUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingProductId, setEditingProductId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const nextProductId = useMemo(() => {
    if (products.length === 0) return 1;
    return Math.max(...products.map((product) => Number(product.id) || 0)) + 1;
  }, [products]);

  async function loadProducts() {
    setLoading(true);
    setError('');

    try {
      const data = await getProducts();
      setProducts(sortProductsById(data.products || []));
      if (data.error) {
        setError(data.error);
      }
    } catch (loadError) {
      setProducts([]);
      setError(loadError.message || 'Error loading products.');
    } finally {
      setLoading(false);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function resetForm() {
    setForm(initialForm);
    setEditingProductId(null);
  }

  function handleEdit(product) {
    setForm({
      name: product.name || '',
      price: String(product.price ?? ''),
      category: product.category || '',
      image: product.image || '',
      description: product.description || '',
    });
    setEditingProductId(product.id);
    setError('');
    setSuccess('');
  }

  function validateForm() {
    const trimmedName = form.name.trim();
    const trimmedCategory = form.category.trim().toLowerCase();
    const trimmedImage = form.image.trim();
    const trimmedDescription = form.description.trim();
    const price = Number(form.price);

    if (!trimmedName || !trimmedCategory || !trimmedImage || !trimmedDescription) {
      return { error: 'All fields are required.' };
    }

    if (!Number.isFinite(price) || price <= 0) {
      return { error: 'Price must be greater than 0.' };
    }

    if (!isValidImageUrl(trimmedImage)) {
      return { error: 'Please enter a valid image URL.' };
    }

    return {
      payload: {
        name: trimmedName,
        price,
        category: trimmedCategory,
        image: trimmedImage,
        description: trimmedDescription,
      },
    };
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setSuccess('');

    const validation = validateForm();
    if (validation.error) {
      setError(validation.error);
      return;
    }

    const existingProduct = editingProductId
      ? products.find((product) => product.id === editingProductId)
      : null;

    const payload = {
      id: editingProductId ?? nextProductId,
      ...validation.payload,
      rating: existingProduct?.rating ?? 0,
      reviewCount: existingProduct?.reviewCount ?? 0,
      isNew: existingProduct?.isNew ?? false,
      isSale: existingProduct?.isSale ?? false,
    };

    setSubmitting(true);

    try {
      if (editingProductId) {
        const data = await updateProduct(editingProductId, payload);
        setProducts((current) => upsertProduct(current, data.product));
        setSuccess('Product updated successfully.');
      } else {
        const data = await createProduct(payload);
        setProducts((current) => upsertProduct(current, data.product));
        setSuccess('Product added successfully.');
      }

      resetForm();
    } catch (submitError) {
      setError(submitError.message || 'Unable to save product.');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(productId) {
    const confirmed = window.confirm('Delete this product permanently?');
    if (!confirmed) {
      return;
    }

    setError('');
    setSuccess('');

    try {
      await deleteProduct(productId);
      setProducts((current) => current.filter((product) => product.id !== productId));
      if (editingProductId === productId) {
        resetForm();
      }
      setSuccess('Product deleted successfully.');
    } catch (deleteError) {
      setError(deleteError.message || 'Unable to delete product.');
    }
  }

  return (
    <div className="page-shell">
      <div className="page-container">
        <div className="page-header">
          <div>
            <h1 className="page-title">Admin Products</h1>
            <p className="page-subtitle">
              Add, edit, and delete products from a simple admin panel.
            </p>
          </div>
        </div>

        {(error || success) && (
          <div className="mb-6 space-y-3">
            {error && <div className="status-banner status-banner-error">{error}</div>}
            {success && <div className="status-banner">{success}</div>}
          </div>
        )}

        <section className="surface-card mb-8 p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-slate-900">
              {editingProductId ? 'Edit product' : 'Add product'}
            </h2>
            {editingProductId && (
              <button type="button" onClick={resetForm} className="btn-secondary">
                Cancel edit
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="field-label" htmlFor="name">Name</label>
              <input id="name" name="name" value={form.name} onChange={handleChange} className="input-base" required />
            </div>
            <div>
              <label className="field-label" htmlFor="price">Price</label>
              <input id="price" name="price" type="number" min="0.01" step="0.01" value={form.price} onChange={handleChange} className="input-base" required />
            </div>
            <div>
              <label className="field-label" htmlFor="category">Category</label>
              <input id="category" name="category" value={form.category} onChange={handleChange} className="input-base" required />
            </div>
            <div>
              <label className="field-label" htmlFor="image">Image URL</label>
              <input id="image" name="image" type="url" value={form.image} onChange={handleChange} className="input-base" required />
            </div>
            <div className="md:col-span-2">
              <label className="field-label" htmlFor="description">Description</label>
              <textarea id="description" name="description" value={form.description} onChange={handleChange} rows="4" className="input-base" required />
            </div>
            <div className="md:col-span-2 flex gap-3">
              <button type="submit" className="btn-primary" disabled={submitting}>
                {submitting ? 'Saving...' : editingProductId ? 'Update product' : 'Add product'}
              </button>
              <button type="button" onClick={resetForm} className="btn-secondary" disabled={submitting}>
                Reset
              </button>
            </div>
          </form>
        </section>

        <section className="surface-card p-5 sm:p-6">
          <h2 className="text-xl font-semibold text-slate-900">Product list</h2>

          {loading ? (
            <p className="mt-4 text-sm text-slate-600">Loading products...</p>
          ) : products.length === 0 ? (
            <p className="mt-4 text-sm text-slate-600">No products found.</p>
          ) : (
            <div className="mt-6 space-y-4">
              {products.map((product) => (
                <article key={product.id} className="rounded-2xl border border-slate-200 p-4 sm:p-5">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex gap-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-24 w-24 rounded-2xl object-cover"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">{product.name}</h3>
                        <p className="mt-1 text-sm text-slate-500">{product.category}</p>
                        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{product.description}</p>
                        <p className="mt-3 text-sm font-semibold text-slate-900">${Number(product.price).toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button type="button" onClick={() => handleEdit(product)} className="btn-secondary">
                        Edit
                      </button>
                      <button type="button" onClick={() => handleDelete(product.id)} className="btn-primary bg-rose-600 hover:bg-rose-700">
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminProducts;
