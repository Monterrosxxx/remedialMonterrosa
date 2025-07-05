import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import "../styles/Clients.css"; // Asegúrate de tener este archivo CSS

const Clients = ({ currentPage, setCurrentPage }) => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCountry, setFilterCountry] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    countryOfResidence: ''
  });

  const API_URL = 'https://remedialmonterrosa-2.onrender.com/api/clients'; // Cambia el puerto según tu backend

  const countries = [
    'Argentina', 'Brasil', 'Chile', 'Colombia', 'Costa Rica', 'Ecuador', 
    'El Salvador', 'Guatemala', 'Honduras', 'México', 'Nicaragua', 
    'Panamá', 'Paraguay', 'Perú', 'República Dominicana', 'Uruguay', 'Venezuela',
    'España', 'Estados Unidos', 'Canadá', 'Otro'
  ];

  // Obtener clientes
  const getClients = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch clients');
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error('Error fetching clients:', error);
      toast.error('Error al cargar los clientes');
    } finally {
      setLoading(false);
    }
  };

  // Guardar nuevo cliente
  const saveClient = async (clientData) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clientData)
      });
      
      if (!response.ok) throw new Error('Failed to save client');
      
      toast.success('Cliente agregado exitosamente');
      getClients();
      return true;
    } catch (error) {
      console.error('Error saving client:', error);
      toast.error('Error al guardar el cliente');
      return false;
    }
  };

  // Actualizar cliente
  const updateClient = async (id, clientData) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clientData)
      });
      
      if (!response.ok) throw new Error('Failed to update client');
      
      toast.success('Cliente actualizado exitosamente');
      getClients();
      return true;
    } catch (error) {
      console.error('Error updating client:', error);
      toast.error('Error al actualizar el cliente');
      return false;
    }
  };

  // Eliminar cliente
  const deleteClient = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { 
        method: 'DELETE' 
      });
      
      if (!response.ok) throw new Error('Failed to delete client');
      
      toast.success('Cliente eliminado exitosamente');
      getClients();
      return true;
    } catch (error) {
      console.error('Error deleting client:', error);
      toast.error('Error al eliminar el cliente');
      return false;
    }
  };

  useEffect(() => {
    getClients();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password || !formData.age || !formData.countryOfResidence) {
      toast.error('Todos los campos son obligatorios');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error('Ingresa un email válido');
      return;
    }

    if (parseInt(formData.age) < 18) {
      toast.error('El cliente debe ser mayor de edad (18+ años)');
      return;
    }

    const success = editingClient 
      ? await updateClient(editingClient._id, formData)
      : await saveClient(formData);

    if (success) {
      setFormData({ name: '', email: '', password: '', age: '', countryOfResidence: '' });
      setShowModal(false);
      setEditingClient(null);
    }
  };

  const handleEdit = (client) => {
    setEditingClient(client);
    setFormData({
      name: client.name,
      email: client.email,
      password: client.password,
      age: client.age,
      countryOfResidence: client.countryOfResidence
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
      await deleteClient(id);
    }
  };

  const openModal = () => {
    setFormData({ name: '', email: '', password: '', age: '', countryOfResidence: '' });
    setEditingClient(null);
    setShowModal(true);
  };

  // Filtrar clientes
  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = filterCountry === '' || client.countryOfResidence === filterCountry;
    return matchesSearch && matchesCountry;
  });

  const getAgeGroup = (age) => {
    const numAge = parseInt(age);
    if (numAge < 25) return '18-24';
    if (numAge < 35) return '25-34';
    if (numAge < 45) return '35-44';
    if (numAge < 55) return '45-54';
    return '55+';
  };

  const getCountryFlag = (country) => {
    const flags = {
      'Argentina': '🇦🇷', 'Brasil': '🇧🇷', 'Chile': '🇨🇱', 'Colombia': '🇨🇴',
      'Costa Rica': '🇨🇷', 'Ecuador': '🇪🇨', 'El Salvador': '🇸🇻', 'Guatemala': '🇬🇹',
      'Honduras': '🇭🇳', 'México': '🇲🇽', 'Nicaragua': '🇳🇮', 'Panamá': '🇵🇦',
      'Paraguay': '🇵🇾', 'Perú': '🇵🇪', 'República Dominicana': '🇩🇴',
      'Uruguay': '🇺🇾', 'Venezuela': '🇻🇪', 'España': '🇪🇸',
      'Estados Unidos': '🇺🇸', 'Canadá': '🇨🇦'
    };
    return flags[country] || '🌍';
  };

  return (
    <div className="clients-container">
      {/* Navigation */}
      <nav className="main-nav">
        <div className="nav-content">
          <div className="logo">
            <span className="logo-icon">🎰</span>
            <span className="logo-text">Casino Colonial</span>
          </div>
          <div className="nav-links">
            <button 
              className={`nav-btn ${currentPage === 'home' ? 'active' : ''}`}
              onClick={() => setCurrentPage('home')}
            >
              🏠 Inicio
            </button>
            <button 
              className={`nav-btn ${currentPage === 'clients' ? 'active' : ''}`}
              onClick={() => setCurrentPage('clients')}
            >
              👥 Clientes
            </button>
            <button 
              className={`nav-btn ${currentPage === 'games' ? 'active' : ''}`}
              onClick={() => setCurrentPage('games')}
            >
              🎮 Juegos
            </button>
          </div>
        </div>
      </nav>

      <div className="casino-bg"></div>
      
      <header className="clients-header">
        <div className="header-content">
          <h1 className="casino-title">
            <span className="diamond">💎</span>
            Casino Colonial - Gestión de Clientes
            <span className="diamond">💎</span>
          </h1>
          <p className="subtitle">Administra tu base de clientes VIP</p>
        </div>
      </header>

      <div className="main-content">
        <div className="controls-section">
          <button className="add-client-btn" onClick={openModal}>
            <span className="btn-icon">👤</span>
            Agregar Nuevo Cliente
          </button>
          
          <div className="search-filters">
            <div className="search-box">
              <input
                type="text"
                placeholder="Buscar por nombre o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <span className="search-icon">🔍</span>
            </div>
            
            <select 
              value={filterCountry}
              onChange={(e) => setFilterCountry(e.target.value)}
              className="country-filter"
            >
              <option value="">Todos los países</option>
              {countries.map(country => (
                <option key={country} value={country}>
                  {getCountryFlag(country)} {country}
                </option>
              ))}
            </select>
          </div>

          <div className="clients-stats">
            <div className="stat-item">
              <span className="stat-number">{filteredClients.length}</span>
              <span className="stat-label">Clientes</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{new Set(clients.map(c => c.countryOfResidence)).size}</span>
              <span className="stat-label">Países</span>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="casino-loader">
              <div className="poker-chips">
                <div className="chip red"></div>
                <div className="chip blue"></div>
                <div className="chip green"></div>
              </div>
              <p>Cargando clientes...</p>
            </div>
          </div>
        ) : (
          <div className="clients-grid">
            {filteredClients.map((client) => (
              <div key={client._id} className="client-card">
                <div className="card-header">
                  <div className="client-avatar">
                    <span className="avatar-icon">👤</span>
                    <div className="status-indicator"></div>
                  </div>
                  <div className="client-info">
                    <h3 className="client-name">{client.name}</h3>
                    <p className="client-email">{client.email}</p>
                  </div>
                </div>
                
                <div className="card-body">
                  <div className="client-details">
                    <div className="detail-item">
                      <span className="detail-icon">🎂</span>
                      <div className="detail-content">
                        <span className="detail-label">Edad</span>
                        <span className="detail-value">{client.age} años</span>
                        <span className="age-group">{getAgeGroup(client.age)}</span>
                      </div>
                    </div>
                    
                    <div className="detail-item">
                      <span className="detail-icon">{getCountryFlag(client.countryOfResidence)}</span>
                      <div className="detail-content">
                        <span className="detail-label">País</span>
                        <span className="detail-value">{client.countryOfResidence}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card-actions">
                  <button 
                    className="edit-btn"
                    onClick={() => handleEdit(client)}
                  >
                    ✏️ Editar
                  </button>
                  <button 
                    className="delete-btn"
                    onClick={() => handleDelete(client._id)}
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredClients.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">🎰</div>
            <h3>No se encontraron clientes</h3>
            <p>Intenta ajustar tus filtros de búsqueda</p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingClient ? 'Editar Cliente' : 'Nuevo Cliente'}</h2>
              <button 
                className="close-btn"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="client-form">
              <div className="form-group">
                <label htmlFor="name">Nombre Completo</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Ej: Juan Carlos Pérez"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Correo Electrónico</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="cliente@ejemplo.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Contraseña segura"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="age">Edad</label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="25"
                    min="18"
                    max="100"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="countryOfResidence">País de Residencia</label>
                  <select
                    id="countryOfResidence"
                    name="countryOfResidence"
                    value={formData.countryOfResidence}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Seleccionar país</option>
                    {countries.map(country => (
                      <option key={country} value={country}>
                        {getCountryFlag(country)} {country}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="submit-btn">
                  {editingClient ? 'Actualizar' : 'Agregar'} Cliente
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clients;