document.addEventListener('DOMContentLoaded', function () {
  const sidebar = document.querySelector('.sidebar');
  const toggleBtn = document.getElementById('sidebarToggle');
  const icon = toggleBtn.querySelector('i');
  const isMobile = window.matchMedia('(max-width: 768px)').matches;

  // Check localStorage for saved state (only for desktop)
  if (!isMobile) {
    const isSidebarOpen = localStorage.getItem('sidebarOpen') !== 'false';
    if (!isSidebarOpen) {
      sidebar.classList.add('collapsed');
      icon.classList.replace('fa-bars', 'fa-chevron-right');
    }
  }

  // Toggle functionality
  toggleBtn.addEventListener('click', function () {
    if (isMobile) {
      sidebar.classList.toggle('open');
    } else {
      sidebar.classList.toggle('collapsed');

      if (sidebar.classList.contains('collapsed')) {
        icon.classList.replace('fa-bars', 'fa-chevron-right');
        localStorage.setItem('sidebarOpen', 'false');
      } else {
        icon.classList.replace('fa-chevron-right', 'fa-bars');
        localStorage.setItem('sidebarOpen', 'true');
      }
    }
  });

  // Close sidebar when clicking outside on mobile
  document.addEventListener('click', function (e) {
    if (isMobile && sidebar.classList.contains('open') &&
      !sidebar.contains(e.target) &&
      e.target !== toggleBtn &&
      !toggleBtn.contains(e.target)) {
      sidebar.classList.remove('open');
    }
  });

  // Handle window resize
  window.addEventListener('resize', function () {
    const isNowMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isNowMobile !== isMobile) {
      location.reload(); // Simple solution to handle layout changes
    }
  });
});
