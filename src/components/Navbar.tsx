import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingBag, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

const navLinks = ['Home', 'Products', 'About', 'Contact'];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <button onClick={() => scrollTo('home')} className="flex items-center gap-2">
          <ShoppingBag className="h-6 w-6 text-primary" />
          <span className="font-display text-xl font-bold text-foreground tracking-wide">
            Neeraja Collections
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link.toLowerCase())}
              className="font-body text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {link}
            </button>
          ))}
          {currentUser && (
            <div className="flex items-center gap-3 border-l pl-8 border-border">
              <span className="text-sm text-muted-foreground">{currentUser}</span>
              <Button
                size="sm"
                variant="outline"
                onClick={handleLogout}
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-b border-border px-4 pb-4">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link.toLowerCase())}
              className="block w-full text-left py-3 font-body text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {link}
            </button>
          ))}
          {currentUser && (
            <div className="pt-3 border-t border-border mt-3 space-y-2">
              <p className="text-sm text-muted-foreground">Logged in as: {currentUser}</p>
              <Button
                size="sm"
                variant="outline"
                onClick={handleLogout}
                className="w-full gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
