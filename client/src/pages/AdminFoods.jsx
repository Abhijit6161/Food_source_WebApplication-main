import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import { CartContext } from '../context/CartContext';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { Plus, Edit2, Trash2, ArrowLeft, Check, X } from 'lucide-react';

const AdminFoods = () => {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFood, setEditingFood] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Pizza',
    image: '/img/food/p1.jpg',
    available: true
  });

  const { showToast } = useContext(CartContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [foodRes, catRes] = await Promise.all([
        API.get('/foods'),
        API.get('/categories')
      ]);
      setFoods(foodRes.data);
      setCategories(catRes.data);
    } catch (err) {
      setError('Failed to fetch food items');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (food = null) => {
    if (food) {
      setEditingFood(food);
      setFormData({
        name: food.name,
        description: food.description,
        price: food.price,
        category: food.category,
        image: food.image,
        available: food.available
      });
    } else {
      setEditingFood(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        category: categories.length > 0 ? categories[0].name : 'Pizza',
        image: '/img/food/p1.jpg',
        available: true
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingFood(null);
  };

  const handleSaveFood = async (e) => {
    e.preventDefault();
    try {
      if (editingFood) {
        await API.put(`/foods/${editingFood._id}`, formData);
        showToast(`Updated ${formData.name}`);
      } else {
        await API.post('/foods', formData);
        showToast(`Added ${formData.name} to menu`);
      }
      handleCloseModal();
      fetchData();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to save food item', 'error');
    }
  };

  const handleDeleteFood = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await API.delete(`/foods/${id}`);
        showToast(`Deleted ${name}`);
        fetchData();
      } catch (err) {
        showToast('Failed to delete food item', 'error');
      }
    }
  };

  const handleToggleAvailability = async (food) => {
    try {
      await API.put(`/foods/${food._id}`, { available: !food.available });
      showToast(`Updated ${food.name} availability`);
      fetchData();
    } catch (err) {
      showToast('Failed to update availability', 'error');
    }
  };

  if (loading) return <LoadingSpinner message="Loading food menu..." />;

  return (
    <div style={{ padding: '40px 0' }}>
      <div className="container">
        <Link to="/admin" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '20px' }}>
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
          <h2>Manage Food Catalog</h2>
          <button onClick={() => handleOpenModal()} className="btn-primary">
            <Plus size={18} /> Add New Food Item
          </button>
        </div>

        {error && <ErrorMessage message={error} />}

        <table className="custom-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Available</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food) => (
              <tr key={food._id}>
                <td>
                  <img
                    src={food.image || '/img/food/p1.jpg'}
                    alt={food.name}
                    className="table-img"
                    onError={(e) => { e.target.src = '/img/food/p1.jpg'; }}
                  />
                </td>
                <td>
                  <strong>{food.name}</strong>
                  <p style={{ fontSize: '12px', color: '#777', margin: 0 }}>
                    {food.description.substring(0, 45)}...
                  </p>
                </td>
                <td>
                  <span style={{ background: '#f1f2f6', padding: '2px 8px', borderRadius: '10px', fontSize: '12px' }}>
                    {food.category}
                  </span>
                </td>
                <td style={{ fontWeight: '600', color: '#e24a4a' }}>${food.price.toFixed(2)}</td>
                <td>
                  <button
                    onClick={() => handleToggleAvailability(food)}
                    style={{
                      border: 'none',
                      background: food.available ? '#d4edda' : '#f8d7da',
                      color: food.available ? '#155724' : '#721c24',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    {food.available ? <Check size={14} /> : <X size={14} />}
                    {food.available ? 'In Stock' : 'Out of Stock'}
                  </button>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleOpenModal(food)}
                      className="btn-outline"
                      style={{ padding: '6px 10px' }}
                      title="Edit Item"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDeleteFood(food._id, food.name)}
                      className="btn-delete"
                      title="Delete Item"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add/Edit Modal */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h3>{editingFood ? 'Edit Food Item' : 'Add New Food Item'}</h3>
                <button onClick={handleCloseModal} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveFood}>
                <div className="form-group">
                  <label>Food Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    required
                    rows="3"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="form-control"
                  ></textarea>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div className="form-group">
                    <label>Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label>Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="form-control"
                    >
                      {categories.map((cat) => (
                        <option key={cat._id} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Image URL / Path</label>
                  <input
                    type="text"
                    required
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="form-control"
                  />
                </div>

                <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="checkbox"
                    id="avail"
                    checked={formData.available}
                    onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                  />
                  <label htmlFor="avail" style={{ margin: 0, cursor: 'pointer' }}>Available in stock</label>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                  <button type="button" onClick={handleCloseModal} className="btn-outline">
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Save Food Item
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminFoods;
