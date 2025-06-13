import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import "../styles/Games.css"

const Games = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingGame, setEditingGame] = useState(null);
  const [formData, setFormData] = useState({
    gameName: '',
    category: '',
    minimumBet: '',
    maximumBet: ''
  });

  const API_URL = "http://localhost:4000/api/games";

  // Obtener juegos
  const getGames = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch games');
      const data = await response.json();
      setGames(data);
    } catch (error) {
      console.error('Error fetching games:', error);
      toast.error('Error al cargar los juegos');
    } finally {
      setLoading(false);
    }
  };

  // Guardar nuevo juego
  const saveGame = async (gameData) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gameData)
      });
      
      if (!response.ok) throw new Error('Failed to save game');
      
      toast.success('Juego agregado exitosamente');
      getGames();
      return true;
    } catch (error) {
      console.error('Error saving game:', error);
      toast.error('Error al guardar el juego');
      return false;
    }
  };

  // Actualizar juego
  const updateGame = async (id, gameData) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gameData)
      });
      
      if (!response.ok) throw new Error('Failed to update game');
      
      toast.success('Juego actualizado exitosamente');
      getGames();
      return true;
    } catch (error) {
      console.error('Error updating game:', error);
      toast.error('Error al actualizar el juego');
      return false;
    }
  };

  // Eliminar juego
  const deleteGame = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { 
        method: 'DELETE' 
      });
      
      if (!response.ok) throw new Error('Failed to delete game');
      
      toast.success('Juego eliminado exitosamente');
      getGames();
      return true;
    } catch (error) {
      console.error('Error deleting game:', error);
      toast.error('Error al eliminar el juego');
      return false;
    }
  };

  useEffect(() => {
    getGames();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.gameName || !formData.category || !formData.minimumBet || !formData.maximumBet) {
      toast.error('Todos los campos son obligatorios');
      return;
    }

    const success = editingGame 
      ? await updateGame(editingGame._id, formData)
      : await saveGame(formData);

    if (success) {
      setFormData({ gameName: '', category: '', minimumBet: '', maximumBet: '' });
      setShowModal(false);
      setEditingGame(null);
    }
  };

  const handleEdit = (game) => {
    setEditingGame(game);
    setFormData({
      gameName: game.gameName,
      category: game.category,
      minimumBet: game.minimumBet,
      maximumBet: game.maximumBet
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este juego?')) {
      await deleteGame(id);
    }
  };

  const openModal = () => {
    setFormData({ gameName: '', category: '', minimumBet: '', maximumBet: '' });
    setEditingGame(null);
    setShowModal(true);
  };

  const categories = ['Slots', 'Blackjack', 'Poker', 'Roulette', 'Baccarat', 'Craps', 'Keno'];

  return (
    <div className="games-container">
      <div className="casino-bg"></div>
      
      <header className="games-header">
        <div className="header-content">
          <h1 className="casino-title">
            <span className="crown">👑</span>
            Casino Colonial - Gestión de Juegos
            <span className="crown">👑</span>
          </h1>
          <p className="subtitle">Administra la experiencia de juego de tus clientes</p>
        </div>
      </header>

      <div className="main-content">
        <div className="controls-section">
          <button className="add-game-btn" onClick={openModal}>
            <span className="btn-icon">🎰</span>
            Agregar Nuevo Juego
          </button>
          <div className="games-count">
            <span className="count-number">{games.length}</span>
            <span className="count-label">Juegos Activos</span>
          </div>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="casino-loader">
              <div className="slot-machine">
                <div className="reel"></div>
                <div className="reel"></div>
                <div className="reel"></div>
              </div>
              <p>Cargando juegos...</p>
            </div>
          </div>
        ) : (
          <div className="games-grid">
            {games.map((game) => (
              <div key={game._id} className="game-card">
                <div className="card-header">
                  <h3 className="game-name">{game.gameName}</h3>
                  <span className="game-category">{game.category}</span>
                </div>
                
                <div className="card-body">
                  <div className="bet-info">
                    <div className="bet-item">
                      <span className="bet-label">Apuesta Mínima</span>
                      <span className="bet-value">${game.minimumBet}</span>
                    </div>
                    <div className="bet-item">
                      <span className="bet-label">Apuesta Máxima</span>
                      <span className="bet-value">${game.maximumBet}</span>
                    </div>
                  </div>
                </div>

                <div className="card-actions">
                  <button 
                    className="edit-btn"
                    onClick={() => handleEdit(game)}
                  >
                    ✏️ Editar
                  </button>
                  <button 
                    className="delete-btn"
                    onClick={() => handleDelete(game._id)}
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingGame ? 'Editar Juego' : 'Nuevo Juego'}</h2>
              <button 
                className="close-btn"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="game-form">
              <div className="form-group">
                <label htmlFor="gameName">Nombre del Juego</label>
                <input
                  type="text"
                  id="gameName"
                  name="gameName"
                  value={formData.gameName}
                  onChange={handleInputChange}
                  placeholder="Ej: Ruleta Europea"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Categoría</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Seleccionar categoría</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="minimumBet">Apuesta Mínima ($)</label>
                  <input
                    type="number"
                    id="minimumBet"
                    name="minimumBet"
                    value={formData.minimumBet}
                    onChange={handleInputChange}
                    placeholder="10"
                    min="1"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="maximumBet">Apuesta Máxima ($)</label>
                  <input
                    type="number"
                    id="maximumBet"
                    name="maximumBet"
                    value={formData.maximumBet}
                    onChange={handleInputChange}
                    placeholder="10000"
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="submit-btn">
                  {editingGame ? 'Actualizar' : 'Agregar'} Juego
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Games;