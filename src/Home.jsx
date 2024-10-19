import { faBell, faHeart, faSearch, faShoppingCart, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import images from './utils/loadImages';

 

export default function  Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState('home')
  const [cartItems, setCartItems] = useState([])
  const [wishlistItems, setWishlistItems] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [sortBy, setSortBy] = useState('')
  const [notifications, setNotifications] = useState([])
  const [trackingId, setTrackingId] = useState('')

  const devicess = [
    { id: 1, name: 'iPhone 14', category: 'Smartphones', price: 999.99, image: images['iphone14.png'],  brand: 'Apple', color: 'Midnight' },
    { id: 2, name: 'Samsung Galaxy S23', category: 'Smartphones', price: 799.99, image: images['galaxy-s23.png'],  brand: 'Samsung', color: 'Phantom Black' },
    { id: 3, name: 'Google Pixel 7', category: 'Smartphones', price: 599.99, image: images['pixel7.png'], brand: 'Google', color: 'Obsidian' },
    { id: 4, name: 'Apple Watch Series 8', category: 'Smartwatches', price: 399.99, image: images['apple-watch-8.png'],   brand: 'Apple', color: 'Midnight' },
    { id: 5, name: 'Samsung Galaxy Watch 5', category: 'Smartwatches', price: 329.99, image: images['galaxy-watch5.jpeg'],  brand: 'Samsung', color: 'Graphite' },
    { id: 6, name: 'Fitbit Versa 3', category: 'Smartwatches', price: 229.99, image: images['fitbit-versa3.jpeg'],  brand: 'Fitbit', color: 'Black/Carbon' },
    { id: 7, name: 'OnePlus Nord 2', category: 'Smartphones', price: 499.99, image: images['oneplus-nord2.jpeg'],  brand: 'OnePlus', color: 'Gray Sierra' },
    { id: 8, name: 'Xiaomi Redmi Note 11', category: 'Smartphones', price: 249.99, image: images['redmi-note11.jpeg'],  brand: 'Xiaomi', color: 'Starry Blue' },
    { id: 9, name: 'Garmin Forerunner 245', category: 'Smartwatches', price: 349.99, image: images['garmin-forerunner245.jpeg'] , brand: 'Garmin', color: 'Black' },
    { id: 10, name: 'Oppo Find X5', category: 'Smartphones', price: 999.99, image: images['oppo-find-x5.jpeg'],  brand: 'Oppo', color: 'Glaze Black' }
  ];

  useEffect(() => {
    setNotifications([
      { id: 1, message: 'Your order has been shipped!', details: 'Order #12345 is on its way. Estimated delivery: 3-5 business days.' },
      { id: 2, message: 'New arrivals in your favorite category!', details: 'Check out the latest additions to our Soft devicess collection.' },
    ])
  }, [])

  const addToCart = (devices) => {
    setCartItems([...cartItems, devices])
  }

  const addToWishlist = (devices) => {
    setWishlistItems([...wishlistItems, devices])
  }

  const removeFromCart = (devicesId) => {
    setCartItems(cartItems.filter(item => item.id !== devicesId))
  }

  const removeFromWishlist = (devicesId) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== devicesId))
  }

  const handleSearch = () => {
    console.log('Searching for:', searchQuery)
    
  }

  const handleTrackOrder = () => {
    console.log('Tracking order:', trackingId)
  }

  const filtereddevicess = devicess
    .filter(devices => devices.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(devices => filterCategory === 'all' ? true : devices.category === filterCategory)
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price
      if (sortBy === 'price-high') return b.price - a.price
      return 0
    })

  return (
    <div className="container-fluid">
      <header className="row py-3 mb-4 border-bottom">
        <div className="col-md-3 mb-2 mb-md-0">
          <a href="/" className="d-inline-flex link-body-emphasis text-decoration-none">
            <h1 className="fs-4">devicesStation</h1>
          </a>
        </div>

        <nav className="col-md-9 d-flex justify-content-end align-items-center">
          <ul className="nav">
          <li className="nav-item">
  <a href="#"  className="nav-link px-2 text-dark" onClick={() => setActiveTab('home')}>Home</a>
</li>
<li className="nav-item">
  <a href="#" className="nav-link px-2 text-dark" onClick={() => setActiveTab('search')}>
    <FontAwesomeIcon icon={faSearch} /> Search
  </a>
</li>
<li className="nav-item">
  <a href="#" className="nav-link px-2 text-dark" onClick={() => setActiveTab('cart')}>
    <FontAwesomeIcon icon={faShoppingCart} /> Cart ({cartItems.length})
  </a>
</li>
<li className="nav-item">
  <a href="#" className="nav-link px-2 text-dark" onClick={() => setActiveTab('wishlist')}>
    <FontAwesomeIcon icon={faHeart} /> Wishlist
  </a>
</li>
<li className="nav-item">
  <a href="#" className="nav-link px-2 text-dark" onClick={() => setActiveTab('notifications')}>
    <FontAwesomeIcon icon={faBell} /> Notifications
  </a>
</li>

            {isLoggedIn ? (
              <li className="nav-item"><a href="#" className="nav-link px-2 text-dark" onClick={() => setIsLoggedIn(false)}><FontAwesomeIcon icon={faSignOutAlt} /> Logout</a></li>
            ) : (
              <li className="nav-item"><a href="#" className="nav-link px-2 text-dark" onClick={() => setActiveTab('account')}><FontAwesomeIcon icon={faUser} /> Account</a></li>
            )}
          </ul>
        </nav>
      </header>

      <main>
        {activeTab === 'home' && (
          <div>
            <h2 className="mb-4">Featured devicess</h2>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
              {devicess.map(devices => (
                <div key={devices.id} className="col">
                  <div className="card h-100">
                    <img src={devices.image} className="card-img-top" alt={devices.name} />
                    <div className="card-body">
                      <h5 className="card-title">{devices.name}</h5>
                      <p className="card-text">{devices.category}</p>
                      <p className="card-text"><strong>${devices.price.toFixed(2)}</strong></p>
 
                      <p className="card-text">Brand: {devices.brand}</p>
                      <p className="card-text">Color: {devices.color}</p>
                    </div>
                    <div className="card-footer">
                      <button className="btn btn-secondary  me-2" onClick={() => addToCart(devices)}>Add to Cart</button>
                      <button className="btn btn-outline-secondary" onClick={() => addToWishlist(devices)}><FontAwesomeIcon icon={faHeart} /> Wishlist</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'search' && (
          <div>
            <h2 className="mb-4">Search Products</h2>
            <div className="row mb-3">
              <div className="col-md-8 mb-2 mb-md-0">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Search for devicess..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="col-md-4">
                <button className="btn btn-primary w-100" onClick={handleSearch}>Search</button>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6 mb-2 mb-md-0">
                <select className="form-select" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                  <option value="all">All categories</option>
                  <option value="Soft devicess">Soft devicess</option>
                  <option value="Remote controlled devicess">Remote controlled devicess</option>
                  <option value="Puzzles">Puzzles</option>
                  <option value="Baby devicess">Baby devicess</option>
                </select>
              </div>
              <div className="col-md-6">
                <select className="form-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="">Sort by</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
              {filtereddevicess.map(devices => (
                <div key={devices.id} className="col">
                  <div className="card h-100">
                    <img src={devices.image} className="card-img-top" alt={devices.name} />
                    <div className="card-body">
                      <h5 className="card-title">{devices.name}</h5>
                      <p className="card-text">{devices.category}</p>
                      <p className="card-text"><strong>${devices.price.toFixed(2)}</strong></p>
                      <p className="card-text">Age: {devices.age}</p>
                      <p className="card-text">Brand: {devices.brand}</p>
                      <p className="card-text">Color: {devices.color}</p>
                    </div>
                    <div className="card-footer">
                      <button className="btn btn-primary me-2" onClick={() => addToCart(devices)}>Add to Cart</button>
                      <button className="btn btn-outline-secondary" onClick={() => addToWishlist(devices)}><FontAwesomeIcon icon={faHeart} /> Wishlist</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'cart' && (
          <div>
            <h2 className="mb-4">Shopping Cart</h2>
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <>
                {cartItems.map(item => (
                  <div key={item.id} className="card mb-3">
                    <div className="row g-0">
                      <div className="col-md-2">
                        <img src={item.image} className="img-fluid rounded-start" alt={item.name} />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">{item.name}</h5>
                          <p className="card-text">${item.price.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="col-md-2 d-flex align-items-center justify-content-center">
                        <button className="btn btn-danger" onClick={() => removeFromCart(item.id)}>Remove</button>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="mt-4">
                  <p className="fs-4 fw-bold">Total: ${cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</p>
                  <button className="btn btn-success" onClick={() => setActiveTab('checkout')}>Proceed to Checkout</button>
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === 'wishlist' && (
          <div>
            <h2 className="mb-4">Wishlist</h2>
            {wishlistItems.length === 0 ? (
              <p>Your wishlist is empty.</p>
            ) : (
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                {wishlistItems.map(item => (
                  <div key={item.id} className="col">
                    <div className="card h-100">
                      <img src={item.image} className="card-img-top" alt={item.name} />
                      <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <p className="card-text">{item.category}</p>
                        <p className="card-text"><strong>${item.price.toFixed(2)}</strong></p>
                      </div>
                      <div className="card-footer">
                        <button className="btn btn-primary me-2" onClick={() => addToCart(item)}>Add to Cart</button>
                        <button className="btn btn-danger" onClick={() => removeFromWishlist(item.id)}>Remove</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'notifications' && (
          <div>
            <h2 className="mb-4">Notifications</h2>
            {notifications.map(notification => (
              <div key={notification.id} className="alert alert-info" role="alert">
                <h4 className="alert-heading">{notification.message}</h4>
                <p>{notification.details}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'account' && (
          <div>
            <h2 className="mb-4">Account</h2>
            {isLoggedIn ? (
              <div>
                <p>Welcome back, User!</p>
                <button className="btn btn-outline-primary" onClick={() => setIsLoggedIn(false)}>Logout</button>
              </div>
            ) : (
              <div className="row">
                <div className="col-md-6">
                  <h3>Login</h3>
                  <form>
                    <div className="mb-3">
                      <label htmlFor="login-email" className="form-label">Email</label>
                      <input type="email" className="form-control" id="login-email" placeholder="xyz@gmail.com" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="login-password" className="form-label">Password</label>
                      <input type="password" className="form-control" id="login-password" placeholder="abcd12@" />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={() => setIsLoggedIn(true)}>Login</button>
                  </form>
                </div>
                <div className="col-md-6">
                  <h3>Sign Up</h3>
                  <form>
                    
                    <div className="mb-3">
                      <label htmlFor="full-name" className="form-label">Full Name</label>
                      <input type="text" className="form-control" id="full-name" placeholder="John Doe" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input type="email" className="form-control" id="email" placeholder="xyz@gmail.com" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">Phone Number</label>
                      <input type="tel" className="form-control" id="phone" placeholder="123-456-7890" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Password</label>
                      <input type="password" className="form-control" id="password" placeholder="abcd12@" />
                    </div>
                    <div className="mb-3 form-check">
                      <input type="checkbox" className="form-check-input" id="terms" />
                      <label className="form-check-label" htmlFor="terms">I agree to the terms and conditions</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'checkout' && (
          <div>
            <h2 className="mb-4">Checkout</h2>
            <div className="row">
              <div className="col-md-6 mb-4">
                <h3>Shipping Address</h3>
                <form>
                  <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Full Name" />
                  </div>
                  <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Address Line 1" />
                  </div>
                  <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Address Line 2" />
                  </div>
                  <div className="row mb-3">
                    <div className="col">
                      <input type="text" className="form-control" placeholder="City" />
                    </div>
                    <div className="col">
                      <input type="text" className="form-control" placeholder="State" />
                    </div>
                  </div>
                  <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Zip Code" />
                  </div>
                  <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Country" />
                  </div>
                </form>
              </div>
              <div className="col-md-6 mb-4">
                <h3>Payment Method</h3>
                <form>
                  <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Card Number" />
                  </div>
                  <div className="row mb-3">
                    <div className="col">
                      <input type="text" className="form-control" placeholder="MM" />
                    </div>
                    <div className="col">
                      <input type="text" className="form-control" placeholder="YY" />
                    </div>
                    <div className="col">
                      <input type="text" className="form-control" placeholder="CVV" />
                    </div>
                  </div>
                </form>
                <h3 className="mt-4">Delivery Instructions</h3>
                <textarea className="form-control" rows="3" placeholder="Any special instructions for delivery?"></textarea>
              </div>
            </div>
            <div className="mt-4">
              <h3>Order Summary</h3>
              {cartItems.map(item => (
                <div key={item.id} className="d-flex justify-content-between">
                  <span>{item.name}</span>
                  <span>${item.price.toFixed(2)}</span>
                </div>
              ))}
              <hr />
              <div className="d-flex justify-content-between fw-bold">
                <span>Total:</span>
                <span>${cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</span>
              </div>
            </div>
            <button className="btn btn-success mt-4 w-100">Place Order</button>
          </div>
        )}
      </main>

      <footer className="mt-5 pt-5 border-top">
        <div className="row">
          <div className="col-md-6 mb-3 mb-md-0">
            <h3 className="mb-2">Customer Support</h3>
            <button className="btn btn-outline-primary">Chat with Us</button>
          </div>
          <div className="col-md-6">
            <h3 className="mb-2">Track Your Order</h3>
            <div className="input-group mb-3">
              <input 
                type="text" 
                className="form-control" 
                placeholder="Enter Tracking ID" 
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
              />
              <button className="btn btn-outline-secondary" type="button" onClick={handleTrackOrder}>Track</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}