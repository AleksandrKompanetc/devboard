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
          <button></button>
        ))}
      </nav>
    </aside>
  )
}