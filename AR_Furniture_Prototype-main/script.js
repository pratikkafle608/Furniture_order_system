document.addEventListener('DOMContentLoaded', () => {

  // ----------- Navigation smooth scroll (FIXED) -----------
  document.querySelectorAll('.main-nav .nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      // Only prevent default for internal navigation (data-target links)
      if (this.hasAttribute('data-target') || this.getAttribute('href') === '#') {
        e.preventDefault();
        
        let targetId;
        
        // Check if it's a data-target link (your current structure)
        if (this.hasAttribute('data-target')) {
          targetId = this.getAttribute('data-target');
        } 
        // Check if it's an href link that starts with #
        else if (this.getAttribute('href').startsWith('#')) {
          targetId = this.getAttribute('href').substring(1);
        }
        
        if (targetId) {
          const targetEl = document.getElementById(targetId);
          if (targetEl) {
            targetEl.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          } else {
            console.warn('Target element not found:', targetId);
          }
        }
      }
      // For external links like visualizer.html, let them work normally
    });
  });

  // ----------- Input validation highlight -----------
  document.querySelectorAll('input[required]').forEach(input => {
    input.addEventListener('input', () => {
      input.style.border = input.validity.valid ? '2px solid green' : '2px solid red';
    });
  });

  // ----------- Browse more button -----------
  const browseMoreBtn = document.getElementById('browseMoreBtn');
  if (browseMoreBtn) {
    browseMoreBtn.addEventListener('click', () => {
      document.getElementById('inventory').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ----------- Cart -----------
  let cart = [];

  function addToCart(name, price) {
    cart.push({ name, price });
    updateCartUI();
  }

  function updateCartUI() {
    const listEl = document.getElementById('cartItemsList');
    const subtotalEl = document.getElementById('subtotal');
    const taxEl = document.getElementById('tax');
    const totalEl = document.getElementById('grandTotal');

    if (cart.length === 0) {
      listEl.textContent = 'Your cart is empty';
    } else {
      listEl.innerHTML = '';
      cart.forEach(item => {
        const div = document.createElement('div');
        div.textContent = `${item.name} — $${Number(item.price).toFixed(2)}`;
        listEl.appendChild(div);
      });
    }

    const subtotal = cart.reduce((s, i) => s + Number(i.price), 0);
    const tax = +(subtotal * 0.086).toFixed(2);
    const total = +(subtotal + tax).toFixed(2);

    subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    taxEl.textContent = `$${tax.toFixed(2)}`;
    totalEl.textContent = `$${total.toFixed(2)}`;
  }

  // Add-to-cart buttons
  document.querySelectorAll('.addInventory').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.name || 'Item';
      const price = parseFloat(btn.dataset.price || '0');
      addToCart(name, price);

      btn.textContent = 'Added';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = 'Add to cart';
        btn.disabled = false;
      }, 900);
    });
  });

  // Cart icon scroll
  const cartIcon = document.getElementById('cartIcon');
  if (cartIcon) {
    cartIcon.addEventListener('click', () => {
      document.getElementById('cartSummary').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ----------- Forms -----------
  const joinForm = document.getElementById('joinForm');
  const loginForm = document.getElementById('loginForm');
  const signupBtn = document.getElementById('signupBtn');

  if (joinForm) {
    joinForm.addEventListener('submit', e => {
      e.preventDefault();
      alert('Thanks for joining! (prototype)');
      e.target.reset();
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', e => {
      e.preventDefault();
      alert('Logged in (prototype)');
      e.target.reset();
    });
  }

  if (signupBtn) {
    signupBtn.addEventListener('click', () => {
      document.getElementById('joinForm').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ----------- Category filter -----------
  const categoryFilter = document.getElementById('categoryFilter');
  const items = document.querySelectorAll('.inventory-item');
  
  if (categoryFilter) {
    categoryFilter.addEventListener('change', (e) => {
      const value = e.target.value;
      items.forEach(item => {
        const name = item.querySelector('h4').textContent.toLowerCase();
        item.style.display = (value === 'all' || name.includes(value)) ? 'block' : 'none';
      });
    });
  }

  // ----------- Progress bar -----------
  function updateProgress(percent) {
    const progressBar = document.querySelector('.progress');
    if (progressBar) {
      progressBar.style.width = percent + '%';
    }
  }

  // ----------- Language system -----------
  const translations = { 
    // Your translation object here
  };
  
  const langSelect = document.getElementById('languageSelect');
  function applyLanguage(lang) { 
    // Your applyLanguage function here
  }

  if (langSelect) {
    langSelect.addEventListener('change', () => {
      const selectedLang = langSelect.value;
      localStorage.setItem('lang', selectedLang);
      applyLanguage(selectedLang);
    });
    
    const savedLang = localStorage.getItem('lang') || 'en';
    langSelect.value = savedLang;
    applyLanguage(savedLang);
  }

  // ----------- Voice recognition -----------
  const startVoice = document.getElementById('startVoice');
  if (startVoice) {
    startVoice.addEventListener('click', () => {
      // Add your voice recognition logic here
      alert('Voice recognition would start here');
    });
  }

  // ----------- Initial cart render -----------
  updateCartUI();

  // ----------- Canvas / Visualizer -----------
  const canvas = document.getElementById('roomCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let currentItem = new Image();
    currentItem.src = 'chair.png';
    let x = 300, y = 200, scale = 1;
    let dragging = false;

    canvas.addEventListener('mousedown', e => { dragging = true; });
    canvas.addEventListener('mouseup', e => { dragging = false; });
    canvas.addEventListener('mousemove', e => {
      if (dragging) { x = e.offsetX; y = e.offsetY; drawItem(); }
    });

    function drawItem() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(currentItem, x - 50, y - 50, 100 * scale, 100 * scale);
    }

    const rotateBtn = document.getElementById('rotateBtn');
    const scaleBtn = document.getElementById('scaleBtn');
    const resetBtn = document.getElementById('resetBtn');
    
    if (rotateBtn) rotateBtn.onclick = () => { /* rotation logic */ };
    if (scaleBtn) scaleBtn.onclick = () => { scale += 0.1; drawItem(); };
    if (resetBtn) resetBtn.onclick = () => { scale = 1; drawItem(); };
    
    drawItem();
  }

});