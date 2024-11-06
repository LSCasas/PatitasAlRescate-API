import { useState, useEffect } from 'react';
import Title from '../components/Title';
import LefthDashboard from '../components/LefthDashboard'; 
import { Montserrat, Source_Sans_3 } from 'next/font/google';
import { getUsers, getAllDonations } from '../api/api';

const montserrat = Montserrat({ subsets: ['latin'] });
const sourceSans3 = Source_Sans_3({ subsets: ['latin'] });

const Donaciones = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const fetchUser = async () => {
    try {
      const users = await getUsers();
      const currentUserEmail = window.localStorage.getItem('email');
      const currentUser = users.find((user) => user.email === currentUserEmail);
      setUser(currentUser);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchDonations = async () => {
    try {
      const donationsData = await getAllDonations();
      setDonations(donationsData);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (window.localStorage.getItem('token')) {
      fetchUser();
    } else {
      setLoading(false);
    }
    fetchDonations();  // Llamar a la función para obtener todas las donaciones
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className={`min-h-screen bg-white flex relative ${montserrat.className}`}>
      <div
        className={`${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transform transition-transform duration-300 ease-in-out bg-gradient-to-b from-[#31416d] to-[#232c48] md:w-[30%] lg:w-[15%] w-[50%] h-full fixed lg:static z-40`}
      >
        <LefthDashboard />
      </div>

      <main className="flex-1 ml-3 flex flex-col items-center">
        <div className="flex-1 flex flex-col items-center">
          <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between mt-2">
            <div className="lg:hidden top-4 left-4 z-50">
              <button
                onClick={toggleMenu}
                className="text-white bg-[#f7e736f3] p-2 rounded-md focus:outline-none"
              >
                {isMenuOpen ? '✖' : '☰'}
              </button>
            </div>
          </div>

          {/* Título */}
          <Title className="text-base">Donaciones</Title>
        </div>

        {/* Contenedor de las tarjetas con altura y scroll */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 overflow-y-scroll max-h-[50vh] w-full">
          {donations.length > 0 ? (
            donations.map((donation) => (
              <div key={donation._id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md">
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800">{donation.food}</h3>
                  <p className="text-sm text-gray-600">Cantidad: {donation.quantity}</p>
                  <p className="text-sm text-gray-600">Tipo: {donation.type}</p>
                  <p className="text-sm text-gray-600">Fecha de expiración: {new Date(donation.expirationDate).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-600">Donante: {donation.donorName}</p>
                  <p className="text-sm text-gray-600">Contacto: {donation.donorContact}</p>
                  <p className="text-sm text-gray-600">Dirección de entrega: {donation.deliveryAddress}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No hay donaciones disponibles.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Donaciones;
