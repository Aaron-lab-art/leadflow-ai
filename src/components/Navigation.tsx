import { Link } from 'react-router-dom'

export default function Navigation() {
  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-gray-900">
              Dashboard
            </Link>
            <Link to="/templates" className="text-gray-700 hover:text-gray-900">
              Templates
            </Link>
            <Link to="/settings" className="text-gray-700 hover:text-gray-900">
              Settings
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
