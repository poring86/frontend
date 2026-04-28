import Image from "next/image";
import { getRestaurants } from "@/data/get-restaurants";
import RestaurantCard from "./components/restaurant-card";

export const dynamic = "force-dynamic";

const HomePage = async () => {
  const restaurants = await getRestaurants();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* HERO SECTION */}
      <header className="relative w-full h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-black z-10"></div>
        <Image
          src="https://images.unsplash.com/photo-1543353071-087092ec393a?q=80&w=1920&auto=format&fit=crop"
          alt="Delicious food background"
          fill
          className="object-cover opacity-60"
        />
        <div className="relative z-20 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-black text-white drop-shadow-lg tracking-tight">
            Descubra <span className="text-primary italic">Novos Sabores</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/90 font-medium max-w-[600px] mx-auto">
            Explore os melhores cardápios e faça seu pedido direto na mesa ou para levar. Praticidade e sabor em um só lugar.
          </p>
        </div>
      </header>

      {/* RESTAURANTS SECTION */}
      <main className="flex-auto max-w-[1200px] mx-auto px-6 py-12 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Nossos Estabelecimentos</h2>
            <div className="h-1 w-20 bg-primary mt-1 rounded-full"></div>
          </div>
          <p className="text-muted-foreground text-sm max-w-[300px]">
            Escolha um de nossos parceiros selecionados para começar sua experiência.
          </p>
        </div>

        {restaurants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-dashed">
            <p className="text-muted-foreground">Nenhum restaurante encontrado no momento. Volte em breve!</p>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t py-8 mt-12">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; 2026 Code Burguer. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
