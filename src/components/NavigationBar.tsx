import { useState, useRef, useEffect } from "react";
import { User, ChevronDown, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImage from "@/assets/iaccessible-logo.png";

interface NavigationBarProps {
  userEmail?: string;
  onLogout: () => void;
}

export function NavigationBar({ userEmail = "user@example.com", onLogout }: NavigationBarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close dropdown on outside click or Esc
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
        buttonRef.current?.focus();
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isDropdownOpen]);

  const handleLogoClick = () => {
    window.location.reload();
  };

  const handleDropdownKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  const handleMenuItemKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      action();
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-nav-background border-b border-nav-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and Title */}
          <div className="flex items-center">
            <button
              onClick={handleLogoClick}
              className="flex items-center space-x-3 text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md p-1"
              aria-label="iAccessible Command Center - Return to homepage"
            >
              {/* Logo */}
              <img 
                src={logoImage} 
                alt="iAccessible logo" 
                className="w-8 h-8 object-contain"
              />
              <span className="text-xl font-semibold">iAccessible Command Center</span>
            </button>
          </div>

          {/* Right side - Profile Menu */}
          <div className="relative">
            <Button
              ref={buttonRef}
              variant="ghost"
              size="sm"
              className="flex items-center space-x-2 text-foreground hover:text-primary hover:bg-secondary"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              onKeyDown={handleDropdownKeyDown}
              aria-haspopup="menu"
              aria-expanded={isDropdownOpen}
              aria-label="User profile menu"
            >
              <User className="w-4 h-4" />
              <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </Button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-2 w-64 bg-popover border border-border rounded-md shadow-lg py-1 z-50"
                role="menu"
                aria-orientation="vertical"
              >
                {/* User Email */}
                <div className="px-4 py-2 text-sm text-muted-foreground border-b border-border">
                  {userEmail}
                </div>

                {/* Profile */}
                <button
                  className="w-full text-left px-4 py-2 text-sm text-popover-foreground hover:bg-secondary focus:bg-secondary focus:outline-none"
                  role="menuitem"
                  tabIndex={0}
                  onKeyDown={(e) => handleMenuItemKeyDown(e, () => {
                    console.log("Navigate to profile");
                    setIsDropdownOpen(false);
                  })}
                  onClick={() => {
                    console.log("Navigate to profile");
                    setIsDropdownOpen(false);
                  }}
                >
                  Profile
                </button>

                {/* Settings */}
                <button
                  className="w-full text-left px-4 py-2 text-sm text-popover-foreground hover:bg-secondary focus:bg-secondary focus:outline-none flex items-center space-x-2"
                  role="menuitem"
                  tabIndex={0}
                  onKeyDown={(e) => handleMenuItemKeyDown(e, () => {
                    window.location.href = "/settings";
                    setIsDropdownOpen(false);
                  })}
                  onClick={() => {
                    window.location.href = "/settings";
                    setIsDropdownOpen(false);
                  }}
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </button>

                {/* Divider */}
                <div className="border-t border-border my-1"></div>

                {/* Logout */}
                <button
                  className="w-full text-left px-4 py-2 text-sm text-destructive hover:bg-destructive/10 focus:bg-destructive/10 focus:outline-none flex items-center space-x-2"
                  role="menuitem"
                  tabIndex={0}
                  onKeyDown={(e) => handleMenuItemKeyDown(e, () => {
                    onLogout();
                    setIsDropdownOpen(false);
                  })}
                  onClick={() => {
                    onLogout();
                    setIsDropdownOpen(false);
                  }}
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}