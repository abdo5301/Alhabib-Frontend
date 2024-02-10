export function useAccount() {
  const activeSection = useState('account_active_section', () => 'account')
  const sideBarKey = useState('account_sidebar_key', () => 1374)
  const setActiveSection = data => {
    activeSection.value = data
    sideBarKey.value += 3
  }
  return { activeSection, sideBarKey, setActiveSection }
}
