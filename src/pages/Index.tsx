
import TodoList from "@/components/TodoList";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-12 pb-20">
      <div className="container max-w-md mx-auto px-4">
        <header className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">Minimalist Todo</h1>
          <p className="text-center text-gray-500 mt-2">Focus on what matters most</p>
        </header>
        <main>
          <TodoList />
        </main>
      </div>
    </div>
  );
};

export default Index;
