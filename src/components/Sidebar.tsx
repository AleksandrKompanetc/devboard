const navigation = [
  {label: 'Dashboard', icon: '◫'},
  {label: 'Projects', icon: '▦'},
  {label: 'Tasks', icon: '✓'},
  {label: 'Team', icon: '♧'},
]

export default function Sidebar() {
  return (
    <aside className='sidebar'>
      <div className='sidebar__logo'>
        <div className='sidebar__logo-icon'>D</div>
        <span>DevBoard</span>
      </div>

      <p className='sidebar__section-title'>WORKSPACE</p>

      <nav className='sidebar__navigation'>
        {navigation.map((item) => (
          <button 
            key={item.label} 
            className={`sidebar__link ${
              item.label === 'Dashboard' ? 'sidebar__link--active' : ''
            }`}>
              <span className='sidebar__icon'>{item.icon}</span>
              <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className='sidebar__bottom'>
        <div className='sidebar__avatar'>JD</div>
        <div>
          <p className='sidebar__user-name'>John Doe</p>
          <p className='sidebar__user-role'>Developer</p>
        </div>
      </div>
    </aside>
  )
}