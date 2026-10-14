export default function Header() {
  return (
    <header className='header'>
      <div>
        <p className='header__eyebrow'>WORKSPACE / OVERVIEW</p>
        <h1 className='header__title'>Dashboard</h1>
        <p className='header__subtitle'>Welcome Back!</p>
      </div>

      <div className='header__actions'>
        <button 
          className='header__icon-button'
          aria-label='Notifications'  
        >
          ♧
        </button>

        <button className='header__new-button'>
          <span>+</span>
          New Project
        </button>
      </div>
    </header>
  )
}