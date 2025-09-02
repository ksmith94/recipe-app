import { ChefHat, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { JSX } from 'react';
import styled from 'styled-components';

export function Footer(): JSX.Element {
  return (
    <FooterContainer className="bg-gray-900 text-gray-300">
      {/* Logo and description */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <ChefHat className="h-8 w-8 text-orange-500" />
          <h3 className="text-2xl font-bold text-white">FlavorHub</h3>
        </div>
        <p className="text-gray-400 mb-4">
          Your ultimate destination for delicious recipes and culinary
          inspiration.
        </p>
        <div className="flex space-x-4">
          <Facebook className="h-5 w-5 hover:text-orange-500 cursor-pointer transition-colors" />
          <Twitter className="h-5 w-5 hover:text-orange-500 cursor-pointer transition-colors" />
          <Instagram className="h-5 w-5 hover:text-orange-500 cursor-pointer transition-colors" />
          <Youtube className="h-5 w-5 hover:text-orange-500 cursor-pointer transition-colors" />
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h4 className="font-semibold text-white mb-4">Quick Links</h4>
        <ul className="space-y-2">
          <li>
            <a
              href="/recipes"
              className="hover:text-orange-500 transition-colors"
            >
              All Recipes
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-orange-500 transition-colors">
              Categories
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-orange-500 transition-colors">
              Meal Plans
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-orange-500 transition-colors">
              Kitchen Tips
            </a>
          </li>
        </ul>
      </div>

      {/* Categories */}
      <div>
        <h4 className="font-semibold text-white mb-4">Popular Categories</h4>
        <ul className="space-y-2">
          <li>
            <a href="#" className="hover:text-orange-500 transition-colors">
              Quick & Easy
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-orange-500 transition-colors">
              Vegetarian
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-orange-500 transition-colors">
              Desserts
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-orange-500 transition-colors">
              Italian
            </a>
          </li>
        </ul>
      </div>

      {/* Support */}
      <div>
        <h4 className="font-semibold text-white mb-4">Support</h4>
        <ul className="space-y-2">
          <li>
            <a href="#" className="hover:text-orange-500 transition-colors">
              Help Center
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-orange-500 transition-colors">
              Contact Us
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-orange-500 transition-colors">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-orange-500 transition-colors">
              Terms of Service
            </a>
          </li>
        </ul>
      </div>

      <div className="border-t border-gray-800 mt-8 pt-8 text-center">
        <p>&copy; 2024 FlavorHub. All rights reserved.</p>
      </div>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  display: flex;
  background-color: ${({ theme }) => theme.colors.primary.green200};
  padding: 1rem;
  margin-top: 1rem;
`;
